-- =========================================================================
-- CampusMove — Complete Supabase PostgreSQL Schema
-- Version: 3.0.0
-- Designed for Higher Education Transit & College Bus Tracking
-- Compatible with Supabase Realtime, PostGIS, Row Level Security (RLS)
-- =========================================================================

-- Enable Required PostgreSQL Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =========================================================================
-- 1. ENUMS & CUSTOM TYPES
-- =========================================================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('student', 'driver', 'admin', 'dispatcher', 'campus_police');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE bus_status AS ENUM ('active', 'idle', 'maintenance', 'offline');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE occupancy_level AS ENUM ('empty', 'seats_available', 'standing_only', 'full');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE route_type AS ENUM ('academic', 'hostel', 'night_owl', 'express');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE incident_status AS ENUM ('pending', 'dispatched', 'en_route', 'resolved', 'dismissed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE pilot_status AS ENUM ('pending', 'contacted', 'pilot_active', 'converted', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =========================================================================
-- 2. CORE TABLES
-- =========================================================================

-- Colleges / Universities (Multi-tenant)
CREATE TABLE IF NOT EXISTS colleges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    domain TEXT,
    logo_url TEXT,
    primary_color TEXT DEFAULT '#2563eb',
    secondary_color TEXT DEFAULT '#1e40af',
    center_latitude DOUBLE PRECISION NOT NULL DEFAULT 37.7749,
    center_longitude DOUBLE PRECISION NOT NULL DEFAULT -122.4194,
    default_zoom INT DEFAULT 15,
    timezone TEXT DEFAULT 'America/Los_Angeles',
    settings JSONB DEFAULT '{"max_speed_kmh": 40, "geofence_strict": true}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    role user_role DEFAULT 'student',
    phone_number TEXT,
    student_id_number TEXT,
    avatar_url TEXT,
    fcm_token TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Routes
CREATE TABLE IF NOT EXISTS routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    color TEXT DEFAULT '#2563eb',
    type route_type DEFAULT 'academic',
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    polyline_coordinates JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of [lat, lng]
    operating_hours JSONB DEFAULT '{"weekday": "07:30 - 22:00", "weekend": "09:00 - 18:00"}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bus Stops (Geofenced locations on campus)
CREATE TABLE IF NOT EXISTS stops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    location GEOMETRY(Point, 4326),
    geofence_radius_meters INT DEFAULT 30,
    photo_url TEXT,
    shelter_available BOOLEAN DEFAULT true,
    wheelchair_accessible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Route Stops (Junction Table with sequence order)
CREATE TABLE IF NOT EXISTS route_stops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    stop_id UUID NOT NULL REFERENCES stops(id) ON DELETE CASCADE,
    stop_order INT NOT NULL,
    typical_duration_minutes INT DEFAULT 4,
    distance_from_prev_meters INT DEFAULT 800,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(route_id, stop_order)
);

-- Buses Fleet
CREATE TABLE IF NOT EXISTS buses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    bus_number TEXT NOT NULL, -- e.g. 'Shuttle 02'
    license_plate TEXT,
    capacity INT DEFAULT 32,
    current_occupancy INT DEFAULT 0,
    occupancy_level occupancy_level DEFAULT 'empty',
    assigned_driver_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    current_route_id UUID REFERENCES routes(id) ON DELETE SET NULL,
    status bus_status DEFAULT 'offline',
    is_electric BOOLEAN DEFAULT true,
    battery_percentage INT DEFAULT 100,
    current_latitude DOUBLE PRECISION,
    current_longitude DOUBLE PRECISION,
    current_speed_kmh NUMERIC(5,2) DEFAULT 0,
    current_heading NUMERIC(5,2) DEFAULT 0,
    last_telemetry_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- High-Frequency Bus Telemetry History (GPS Broadcasts)
CREATE TABLE IF NOT EXISTS bus_telemetry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bus_id UUID NOT NULL REFERENCES buses(id) ON DELETE CASCADE,
    route_id UUID REFERENCES routes(id) ON DELETE SET NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    location GEOMETRY(Point, 4326),
    speed_kmh NUMERIC(5,2) DEFAULT 0,
    heading NUMERIC(5,2) DEFAULT 0,
    accuracy_meters NUMERIC(5,2) DEFAULT 3.0,
    occupancy INT DEFAULT 0,
    battery_percentage INT,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Real-Time Stop ETAs (Calculated for upcoming arrivals)
CREATE TABLE IF NOT EXISTS stop_etas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bus_id UUID NOT NULL REFERENCES buses(id) ON DELETE CASCADE,
    route_id UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    stop_id UUID NOT NULL REFERENCES stops(id) ON DELETE CASCADE,
    estimated_arrival_at TIMESTAMPTZ NOT NULL,
    seconds_remaining INT NOT NULL,
    is_delayed BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(bus_id, stop_id)
);

-- Student Notifications / Arrival Alerts
CREATE TABLE IF NOT EXISTS student_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    route_id UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    stop_id UUID NOT NULL REFERENCES stops(id) ON DELETE CASCADE,
    bus_id UUID REFERENCES buses(id) ON DELETE CASCADE,
    threshold_minutes INT DEFAULT 3,
    is_active BOOLEAN DEFAULT true,
    last_triggered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Digital Student Transit Passes
CREATE TABLE IF NOT EXISTS transit_passes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    pass_code TEXT UNIQUE NOT NULL,
    nfc_uid TEXT,
    semester TEXT NOT NULL DEFAULT 'Fall 2026',
    is_active BOOLEAN DEFAULT true,
    valid_until DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Boarding Tap Logs (NFC / QR / Driver counter)
CREATE TABLE IF NOT EXISTS boarding_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pass_id UUID REFERENCES transit_passes(id) ON DELETE SET NULL,
    bus_id UUID NOT NULL REFERENCES buses(id) ON DELETE CASCADE,
    stop_id UUID REFERENCES stops(id) ON DELETE SET NULL,
    tapped_at TIMESTAMPTZ DEFAULT NOW()
);

-- Night Owl Campus Safety / SOS Incidents
CREATE TABLE IF NOT EXISTS night_owl_incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    assigned_bus_id UUID REFERENCES buses(id) ON DELETE SET NULL,
    status incident_status DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- Prospective University Pilot / Demo Requests (From Landing Page)
CREATE TABLE IF NOT EXISTS pilot_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    fleet_size TEXT,
    role TEXT,
    notes TEXT,
    status pilot_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- 3. AUTOMATIC POSTGIS GEOMETRY TRIGGERS
-- =========================================================================

-- Auto-populate PostGIS Point for Stops
CREATE OR REPLACE FUNCTION sync_stop_geom()
RETURNS TRIGGER AS $$
BEGIN
    NEW.location := ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_stop_geom ON stops;
CREATE TRIGGER trg_sync_stop_geom
BEFORE INSERT OR UPDATE OF latitude, longitude ON stops
FOR EACH ROW EXECUTE FUNCTION sync_stop_geom();

-- Auto-populate PostGIS Point for Bus Telemetry
CREATE OR REPLACE FUNCTION sync_telemetry_geom()
RETURNS TRIGGER AS $$
BEGIN
    NEW.location := ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_telemetry_geom ON bus_telemetry;
CREATE TRIGGER trg_sync_telemetry_geom
BEFORE INSERT ON bus_telemetry
FOR EACH ROW EXECUTE FUNCTION sync_telemetry_geom();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_colleges_updated_at BEFORE UPDATE ON colleges FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_routes_updated_at BEFORE UPDATE ON routes FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_stops_updated_at BEFORE UPDATE ON stops FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_buses_updated_at BEFORE UPDATE ON buses FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =========================================================================
-- 4. BUSINESS LOGIC & STORED PROCEDURES (RPCs)
-- =========================================================================

-- RPC: Atomic Driver / IoT GPS Broadcast Update
CREATE OR REPLACE FUNCTION update_bus_telemetry(
    p_bus_id UUID,
    p_latitude DOUBLE PRECISION,
    p_longitude DOUBLE PRECISION,
    p_speed_kmh NUMERIC DEFAULT 0,
    p_heading NUMERIC DEFAULT 0,
    p_accuracy NUMERIC DEFAULT 3.0,
    p_occupancy INT DEFAULT NULL,
    p_battery_percentage INT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_bus RECORD;
    v_occupancy_level occupancy_level;
    v_current_occ INT;
    v_capacity INT;
BEGIN
    -- Fetch Bus details
    SELECT * INTO v_bus FROM buses WHERE id = p_bus_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Bus not found');
    END IF;

    v_capacity := COALESCE(v_bus.capacity, 32);
    v_current_occ := COALESCE(p_occupancy, v_bus.current_occupancy, 0);

    -- Calculate Crowd Level
    IF v_current_occ = 0 THEN
        v_occupancy_level := 'empty';
    ELSIF v_current_occ <= (v_capacity * 0.75) THEN
        v_occupancy_level := 'seats_available';
    ELSIF v_current_occ < v_capacity THEN
        v_occupancy_level := 'standing_only';
    ELSE
        v_occupancy_level := 'full';
    END IF;

    -- Update Master Bus Record
    UPDATE buses
    SET 
        current_latitude = p_latitude,
        current_longitude = p_longitude,
        current_speed_kmh = p_speed_kmh,
        current_heading = p_heading,
        current_occupancy = v_current_occ,
        occupancy_level = v_occupancy_level,
        battery_percentage = COALESCE(p_battery_percentage, battery_percentage),
        status = 'active',
        last_telemetry_at = NOW(),
        updated_at = NOW()
    WHERE id = p_bus_id;

    -- Insert into Telemetry Log
    INSERT INTO bus_telemetry (
        bus_id,
        route_id,
        latitude,
        longitude,
        speed_kmh,
        heading,
        accuracy_meters,
        occupancy,
        battery_percentage,
        recorded_at
    ) VALUES (
        p_bus_id,
        v_bus.current_route_id,
        p_latitude,
        p_longitude,
        p_speed_kmh,
        p_heading,
        p_accuracy,
        v_current_occ,
        COALESCE(p_battery_percentage, v_bus.battery_percentage),
        NOW()
    );

    RETURN jsonb_build_object(
        'success', true,
        'bus_id', p_bus_id,
        'status', 'active',
        'occupancy_level', v_occupancy_level,
        'recorded_at', NOW()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: Find Nearest Bus Stops using PostGIS Spatial Distance
CREATE OR REPLACE FUNCTION get_nearest_stops(
    p_latitude DOUBLE PRECISION,
    p_longitude DOUBLE PRECISION,
    p_college_id UUID,
    p_max_distance_meters INT DEFAULT 2000,
    p_limit INT DEFAULT 5
)
RETURNS TABLE (
    id UUID,
    name TEXT,
    code TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    distance_meters INT,
    shelter_available BOOLEAN,
    wheelchair_accessible BOOLEAN
) AS $$
DECLARE
    v_user_geom GEOMETRY;
BEGIN
    v_user_geom := ST_SetSRID(ST_MakePoint(p_longitude, p_latitude), 4326);

    RETURN QUERY
    SELECT 
        s.id,
        s.name,
        s.code,
        s.latitude,
        s.longitude,
        ROUND(ST_DistanceSphere(s.location, v_user_geom))::INT AS distance_meters,
        s.shelter_available,
        s.wheelchair_accessible
    FROM stops s
    WHERE s.college_id = p_college_id
      AND ST_DWithin(s.location::geography, v_user_geom::geography, p_max_distance_meters)
    ORDER BY s.location <-> v_user_geom
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql STABLE;

-- RPC: Get Full Live Route Telemetry (Route, Moving Buses & Stop ETAs)
CREATE OR REPLACE FUNCTION get_live_route_telemetry(p_route_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_route RECORD;
    v_buses JSONB;
    v_stops JSONB;
BEGIN
    SELECT * INTO v_route FROM routes WHERE id = p_route_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Route not found');
    END IF;

    -- Get Active Buses on this route
    SELECT COALESCE(jsonb_agg(jsonb_build_object(
        'id', b.id,
        'bus_number', b.bus_number,
        'latitude', b.current_latitude,
        'longitude', b.current_longitude,
        'speed_kmh', b.current_speed_kmh,
        'heading', b.current_heading,
        'occupancy', b.current_occupancy,
        'capacity', b.capacity,
        'occupancy_level', b.occupancy_level,
        'battery_percentage', b.battery_percentage,
        'driver_name', p.full_name,
        'last_updated', b.last_telemetry_at
    )), '[]'::jsonb) INTO v_buses
    FROM buses b
    LEFT JOIN profiles p ON b.assigned_driver_id = p.id
    WHERE b.current_route_id = p_route_id
      AND b.status = 'active';

    -- Get Ordered Stops with Live ETAs
    SELECT COALESCE(jsonb_agg(jsonb_build_object(
        'stop_id', s.id,
        'name', s.name,
        'code', s.code,
        'latitude', s.latitude,
        'longitude', s.longitude,
        'stop_order', rs.stop_order,
        'etas', (
            SELECT COALESCE(jsonb_agg(jsonb_build_object(
                'bus_id', se.bus_id,
                'seconds_remaining', se.seconds_remaining,
                'estimated_arrival', se.estimated_arrival_at,
                'is_delayed', se.is_delayed
            )), '[]'::jsonb)
            FROM stop_etas se
            WHERE se.stop_id = s.id AND se.route_id = p_route_id
        )
    ) ORDER BY rs.stop_order), '[]'::jsonb) INTO v_stops
    FROM route_stops rs
    JOIN stops s ON rs.stop_id = s.id
    WHERE rs.route_id = p_route_id;

    RETURN jsonb_build_object(
        'success', true,
        'route', jsonb_build_object(
            'id', v_route.id,
            'name', v_route.name,
            'code', v_route.code,
            'color', v_route.color,
            'type', v_route.type,
            'polyline', v_route.polyline_coordinates
        ),
        'active_buses', v_buses,
        'stops', v_stops
    );
END;
$$ LANGUAGE plpgsql STABLE;

-- RPC: Record Student Boarding Tap & Adjust Capacity
CREATE OR REPLACE FUNCTION log_passenger_boarding(
    p_pass_code TEXT,
    p_bus_id UUID,
    p_stop_id UUID DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_pass RECORD;
    v_bus RECORD;
BEGIN
    -- Verify Pass
    SELECT * INTO v_pass FROM transit_passes 
    WHERE pass_code = p_pass_code AND is_active = true AND valid_until >= CURRENT_DATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('valid', false, 'error', 'Invalid or expired pass');
    END IF;

    -- Fetch Bus
    SELECT * INTO v_bus FROM buses WHERE id = p_bus_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('valid', false, 'error', 'Bus not found');
    END IF;

    -- Insert Boarding Log
    INSERT INTO boarding_logs (pass_id, bus_id, stop_id, tapped_at)
    VALUES (v_pass.id, p_bus_id, p_stop_id, NOW());

    -- Increment Occupancy
    UPDATE buses
    SET current_occupancy = LEAST(v_bus.capacity, v_bus.current_occupancy + 1),
        updated_at = NOW()
    WHERE id = p_bus_id;

    RETURN jsonb_build_object(
        'valid', true,
        'student_id', v_pass.student_id,
        'semester', v_pass.semester,
        'bus_id', p_bus_id,
        'tapped_at', NOW()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: Trigger Night Owl Safety SOS
CREATE OR REPLACE FUNCTION trigger_night_owl_sos(
    p_student_id UUID,
    p_latitude DOUBLE PRECISION,
    p_longitude DOUBLE PRECISION,
    p_notes TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_profile RECORD;
    v_incident_id UUID;
    v_nearest_bus_id UUID;
BEGIN
    SELECT * INTO v_profile FROM profiles WHERE id = p_student_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Student not registered');
    END IF;

    -- Find nearest active Night Owl shuttle
    SELECT b.id INTO v_nearest_bus_id
    FROM buses b
    JOIN routes r ON b.current_route_id = r.id
    WHERE r.type = 'night_owl' AND b.status = 'active'
    ORDER BY (
        (b.current_latitude - p_latitude)^2 + (b.current_longitude - p_longitude)^2
    ) ASC
    LIMIT 1;

    INSERT INTO night_owl_incidents (
        student_id,
        college_id,
        latitude,
        longitude,
        assigned_bus_id,
        status,
        notes,
        created_at
    ) VALUES (
        p_student_id,
        v_profile.college_id,
        p_latitude,
        p_longitude,
        v_nearest_bus_id,
        'pending',
        p_notes,
        NOW()
    ) RETURNING id INTO v_incident_id;

    RETURN jsonb_build_object(
        'success', true,
        'incident_id', v_incident_id,
        'assigned_bus_id', v_nearest_bus_id,
        'message', 'Campus safety notified. Safe shuttle dispatched.'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =========================================================================
-- 5. PERFORMANCE INDICES
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_stops_location ON stops USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_stops_college ON stops (college_id);
CREATE INDEX IF NOT EXISTS idx_routes_college ON routes (college_id);
CREATE INDEX IF NOT EXISTS idx_buses_college ON buses (college_id);
CREATE INDEX IF NOT EXISTS idx_buses_route ON buses (current_route_id);
CREATE INDEX IF NOT EXISTS idx_buses_status ON buses (status);
CREATE INDEX IF NOT EXISTS idx_telemetry_bus_time ON bus_telemetry (bus_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_telemetry_location ON bus_telemetry USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_stop_etas_bus_stop ON stop_etas (bus_id, stop_id);
CREATE INDEX IF NOT EXISTS idx_route_stops_order ON route_stops (route_id, stop_order);
CREATE INDEX IF NOT EXISTS idx_passes_code ON transit_passes (pass_code);
CREATE INDEX IF NOT EXISTS idx_pilot_status ON pilot_requests (status);

-- =========================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS on all tables
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE route_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE stop_etas ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transit_passes ENABLE ROW LEVEL SECURITY;
ALTER TABLE boarding_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE night_owl_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE pilot_requests ENABLE ROW LEVEL SECURITY;

-- Colleges: Public can view active colleges
CREATE POLICY "Public can view colleges" ON colleges FOR SELECT USING (true);

-- Routes: Public can view active routes
CREATE POLICY "Public can view active routes" ON routes FOR SELECT USING (is_active = true);

-- Stops: Public can view all campus stops
CREATE POLICY "Public can view stops" ON stops FOR SELECT USING (true);

-- Route Stops: Public can view route stop sequences
CREATE POLICY "Public can view route stops" ON route_stops FOR SELECT USING (true);

-- Buses: Public can view active and public buses (telemetry)
CREATE POLICY "Public can view buses" ON buses FOR SELECT USING (true);

-- Bus Telemetry: Public can view recent telemetry
CREATE POLICY "Public can view telemetry" ON bus_telemetry FOR SELECT USING (
    recorded_at >= NOW() - INTERVAL '6 hours'
);

-- Stop ETAs: Public can view live ETAs
CREATE POLICY "Public can view stop ETAs" ON stop_etas FOR SELECT USING (true);

-- Pilot Requests: Public can insert demo requests (Landing page)
CREATE POLICY "Anyone can submit a pilot request" ON pilot_requests 
    FOR INSERT WITH CHECK (true);

-- Profiles: Users can view & update their own profile
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Student Alerts: Students can manage their own alerts
CREATE POLICY "Students manage their own alerts" ON student_alerts
    FOR ALL USING (auth.uid() = student_id);

-- Transit Passes: Students can view their own passes
CREATE POLICY "Students view their own transit pass" ON transit_passes
    FOR SELECT USING (auth.uid() = student_id);

-- Night Owl: Students can view and insert their own incidents
CREATE POLICY "Students manage their safety incidents" ON night_owl_incidents
    FOR ALL USING (auth.uid() = student_id);

-- Drivers: Can update their assigned bus
CREATE POLICY "Drivers can update assigned bus telemetry" ON buses
    FOR UPDATE USING (auth.uid() = assigned_driver_id);

-- Dispatchers & Admins: Full access based on role
CREATE POLICY "Admins have full access to colleges" ON colleges
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'dispatcher'))
    );

CREATE POLICY "Admins have full access to routes" ON routes
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'dispatcher'))
    );

CREATE POLICY "Admins have full access to buses" ON buses
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'dispatcher'))
    );

-- =========================================================================
-- 7. SUPABASE REALTIME CONFIGURATION
-- =========================================================================
-- Enable Supabase Realtime publication on high-priority live tables
BEGIN;
  -- Drop publication if exists or re-create
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE 
    buses, 
    stop_etas, 
    night_owl_incidents,
    pilot_requests;
COMMIT;
