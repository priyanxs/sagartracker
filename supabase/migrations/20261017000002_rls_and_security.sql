-- Migration: 20261017000002_rls_and_security.sql
-- Description: Row Level Security Policies, Role Permissions, and Performance Indices

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

-- Enable RLS
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

-- Public Select Policies
CREATE POLICY "Public can view colleges" ON colleges FOR SELECT USING (true);
CREATE POLICY "Public can view active routes" ON routes FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view stops" ON stops FOR SELECT USING (true);
CREATE POLICY "Public can view route stops" ON route_stops FOR SELECT USING (true);
CREATE POLICY "Public can view buses" ON buses FOR SELECT USING (true);
CREATE POLICY "Public can view telemetry" ON bus_telemetry FOR SELECT USING (recorded_at >= NOW() - INTERVAL '6 hours');
CREATE POLICY "Public can view stop ETAs" ON stop_etas FOR SELECT USING (true);

-- Public Pilot Insert Policy (Landing page demo booking)
CREATE POLICY "Anyone can submit a pilot request" ON pilot_requests FOR INSERT WITH CHECK (true);

-- User Profiles
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Student Policies
CREATE POLICY "Students manage their own alerts" ON student_alerts FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Students view their own transit pass" ON transit_passes FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students manage their safety incidents" ON night_owl_incidents FOR ALL USING (auth.uid() = student_id);

-- Driver Policies
CREATE POLICY "Drivers can update assigned bus telemetry" ON buses FOR UPDATE USING (auth.uid() = assigned_driver_id);

-- Admin Policies
CREATE POLICY "Admins have full access to colleges" ON colleges FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'dispatcher'))
);
CREATE POLICY "Admins have full access to routes" ON routes FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'dispatcher'))
);
CREATE POLICY "Admins have full access to buses" ON buses FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'dispatcher'))
);
