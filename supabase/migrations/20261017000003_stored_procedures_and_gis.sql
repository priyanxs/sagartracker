-- Migration: 20261017000003_stored_procedures_and_gis.sql
-- Description: PostGIS Triggers, Automated Distance Calculation, and Stored Procedures

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

DROP TRIGGER IF EXISTS trg_colleges_updated_at ON colleges;
CREATE TRIGGER trg_colleges_updated_at BEFORE UPDATE ON colleges FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON profiles;
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_routes_updated_at ON routes;
CREATE TRIGGER trg_routes_updated_at BEFORE UPDATE ON routes FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_stops_updated_at ON stops;
CREATE TRIGGER trg_stops_updated_at BEFORE UPDATE ON stops FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_buses_updated_at ON buses;
CREATE TRIGGER trg_buses_updated_at BEFORE UPDATE ON buses FOR EACH ROW EXECUTE FUNCTION set_updated_at();

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
    SELECT * INTO v_bus FROM buses WHERE id = p_bus_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Bus not found');
    END IF;

    v_capacity := COALESCE(v_bus.capacity, 32);
    v_current_occ := COALESCE(p_occupancy, v_bus.current_occupancy, 0);

    IF v_current_occ = 0 THEN
        v_occupancy_level := 'empty';
    ELSIF v_current_occ <= (v_capacity * 0.75) THEN
        v_occupancy_level := 'seats_available';
    ELSIF v_current_occ < v_capacity THEN
        v_occupancy_level := 'standing_only';
    ELSE
        v_occupancy_level := 'full';
    END IF;

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
    SELECT * INTO v_pass FROM transit_passes 
    WHERE pass_code = p_pass_code AND is_active = true AND valid_until >= CURRENT_DATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('valid', false, 'error', 'Invalid or expired pass');
    END IF;

    SELECT * INTO v_bus FROM buses WHERE id = p_bus_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('valid', false, 'error', 'Bus not found');
    END IF;

    INSERT INTO boarding_logs (pass_id, bus_id, stop_id, tapped_at)
    VALUES (v_pass.id, p_bus_id, p_stop_id, NOW());

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
