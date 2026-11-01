-- Migration: 20261017000001_init_campusmove_schema.sql
-- Description: Core Schema, Enums, Extensions, and Tables for CampusMove

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

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

CREATE TABLE IF NOT EXISTS routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    color TEXT DEFAULT '#2563eb',
    type route_type DEFAULT 'academic',
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    polyline_coordinates JSONB NOT NULL DEFAULT '[]'::jsonb,
    operating_hours JSONB DEFAULT '{"weekday": "07:30 - 22:00", "weekend": "09:00 - 18:00"}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE IF NOT EXISTS buses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    bus_number TEXT NOT NULL,
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

CREATE TABLE IF NOT EXISTS boarding_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pass_id UUID REFERENCES transit_passes(id) ON DELETE SET NULL,
    bus_id UUID NOT NULL REFERENCES buses(id) ON DELETE CASCADE,
    stop_id UUID REFERENCES stops(id) ON DELETE SET NULL,
    tapped_at TIMESTAMPTZ DEFAULT NOW()
);

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
