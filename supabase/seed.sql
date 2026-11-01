-- =========================================================================
-- CampusMove — Seed Data for Supabase
-- Populates "Westlake University" with active routes, stops, buses & passes
-- Coordinates match the frontend interactive campus simulator!
-- =========================================================================

-- 1. Insert College
INSERT INTO colleges (
    id,
    name,
    slug,
    domain,
    logo_url,
    primary_color,
    secondary_color,
    center_latitude,
    center_longitude,
    default_zoom,
    timezone
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Westlake University',
    'westlake',
    'westlake.edu',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80',
    '#2563eb',
    '#1e40af',
    37.7749,
    -122.4194,
    15,
    'America/Los_Angeles'
) ON CONFLICT (id) DO NOTHING;

-- 2. Insert Routes
INSERT INTO routes (
    id,
    college_id,
    name,
    code,
    color,
    type,
    description,
    is_active,
    polyline_coordinates,
    operating_hours
) VALUES 
(
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Route 1: Science & Main Academic Loop',
    'R1',
    '#2563eb',
    'academic',
    'Connects Main Gate, Science & Tech Center, Central Library, Student Union, and North Dorms.',
    true,
    '[
      [37.7770, -122.4230],
      [37.7765, -122.4180],
      [37.7745, -122.4160],
      [37.7725, -122.4185],
      [37.7730, -122.4225],
      [37.7755, -122.4245],
      [37.7770, -122.4230]
    ]'::jsonb,
    '{"weekday": "07:00 - 23:00", "weekend": "08:30 - 21:00"}'::jsonb
),
(
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Route 2: Hostels & Sports Complex',
    'R2',
    '#10b981',
    'hostel',
    'Direct connector between North/South Dormitory Villages, Athletics Stadium, and Health Center.',
    true,
    '[
      [37.7730, -122.4225],
      [37.7710, -122.4210],
      [37.7700, -122.4160],
      [37.7720, -122.4130],
      [37.7750, -122.4150],
      [37.7730, -122.4225]
    ]'::jsonb,
    '{"weekday": "06:45 - 22:30", "weekend": "09:00 - 20:00"}'::jsonb
),
(
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    'Route 3: Night Owl Safety Escort',
    'R3',
    '#8b5cf6',
    'night_owl',
    'Safe campus transit operating late evening hours between Central Library, Dorms, and Campus Police Station.',
    true,
    '[
      [37.7745, -122.4160],
      [37.7730, -122.4225],
      [37.7710, -122.4210],
      [37.7770, -122.4230],
      [37.7745, -122.4160]
    ]'::jsonb,
    '{"weekday": "21:00 - 03:30", "weekend": "21:00 - 04:00"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Campus Stops
INSERT INTO stops (
    id,
    college_id,
    name,
    code,
    latitude,
    longitude,
    geofence_radius_meters,
    shelter_available,
    wheelchair_accessible
) VALUES
(
    '20000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Main Campus Entrance (Transit Hub)',
    'ST-01',
    37.7770,
    -122.4230,
    35,
    true,
    true
),
(
    '20000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Science & Engineering Hall',
    'ST-02',
    37.7765,
    -122.4180,
    30,
    true,
    true
),
(
    '20000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    'Central Library Plaza',
    'ST-03',
    37.7745,
    -122.4160,
    30,
    true,
    true
),
(
    '20000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000001',
    'Student Union Dining Hall',
    'ST-04',
    37.7725,
    -122.4185,
    25,
    true,
    true
),
(
    '20000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000001',
    'North Residential Quad B',
    'ST-05',
    37.7730,
    -122.4225,
    30,
    true,
    true
),
(
    '20000000-0000-0000-0000-000000000006',
    '00000000-0000-0000-0000-000000000001',
    'South Dorms Village',
    'ST-06',
    37.7710,
    -122.4210,
    30,
    true,
    true
),
(
    '20000000-0000-0000-0000-000000000007',
    '00000000-0000-0000-0000-000000000001',
    'Varsity Sports Stadium',
    'ST-07',
    37.7700,
    -122.4160,
    40,
    true,
    true
),
(
    '20000000-0000-0000-0000-000000000008',
    '00000000-0000-0000-0000-000000000001',
    'Student Health & Wellness Center',
    'ST-08',
    37.7720,
    -122.4130,
    25,
    true,
    true
)
ON CONFLICT (id) DO NOTHING;

-- 4. Route Stops Junction (Link stops to routes in sequence)
INSERT INTO route_stops (route_id, stop_id, stop_order, typical_duration_minutes) VALUES
-- Route 1
('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 1, 0),
('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 2, 4),
('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003', 3, 5),
('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', 4, 4),
('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000005', 5, 5),

-- Route 2
('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000005', 1, 0),
('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000006', 2, 3),
('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000007', 3, 5),
('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000008', 4, 4),

-- Route 3 (Night Owl)
('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000003', 1, 0),
('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000005', 2, 4),
('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000006', 3, 3),
('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 4, 6)
ON CONFLICT (route_id, stop_order) DO NOTHING;

-- 5. Insert Active Campus Shuttles
INSERT INTO buses (
    id,
    college_id,
    bus_number,
    license_plate,
    capacity,
    current_occupancy,
    occupancy_level,
    current_route_id,
    status,
    is_electric,
    battery_percentage,
    current_latitude,
    current_longitude,
    current_speed_kmh,
    current_heading,
    last_telemetry_at
) VALUES
(
    '30000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Shuttle #02 (Express)',
    'CA-9WLT02',
    32,
    22,
    'seats_available',
    '10000000-0000-0000-0000-000000000001',
    'active',
    true,
    84,
    37.7765,
    -122.4180,
    26.5,
    88.0,
    NOW()
),
(
    '30000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Shuttle #04 (Main Loop)',
    'CA-9WLT04',
    32,
    14,
    'seats_available',
    '10000000-0000-0000-0000-000000000001',
    'active',
    true,
    91,
    37.7730,
    -122.4225,
    22.0,
    145.0,
    NOW()
),
(
    '30000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    'Shuttle #07 (Hostels & Sports)',
    'CA-9WLT07',
    35,
    28,
    'standing_only',
    '10000000-0000-0000-0000-000000000002',
    'active',
    true,
    76,
    37.7710,
    -122.4210,
    24.0,
    62.0,
    NOW()
),
(
    '30000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000001',
    'Night Owl #09',
    'CA-9WLT09',
    25,
    9,
    'seats_available',
    '10000000-0000-0000-0000-000000000003',
    'active',
    true,
    95,
    37.7745,
    -122.4160,
    20.0,
    210.0,
    NOW()
)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Initial Stop ETAs
INSERT INTO stop_etas (
    bus_id,
    route_id,
    stop_id,
    estimated_arrival_at,
    seconds_remaining,
    is_delayed
) VALUES
-- Shuttle 02
('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', NOW() + INTERVAL '1 minute', 60, false),
('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003', NOW() + INTERVAL '5 minutes', 300, false),
('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', NOW() + INTERVAL '9 minutes', 540, false),

-- Shuttle 04
('30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000005', NOW() + INTERVAL '2 minutes', 120, false),
('30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', NOW() + INTERVAL '8 minutes', 480, false)
ON CONFLICT (bus_id, stop_id) DO NOTHING;

-- 7. Insert Initial Pilot Requests
INSERT INTO pilot_requests (
    college_name,
    contact_name,
    email,
    fleet_size,
    role,
    notes,
    status
) VALUES
('Pacific State University', 'Dr. Sarah Jenkins', 'sjenkins@pacificstate.edu', '5-12', 'Director of Campus Operations', 'Interested in Night Owl safety tracking and crowding radar.', 'contacted'),
('Summit Technical Institute', 'Marcus Vance', 'mvance@summittech.edu', '13-25', 'Head of Fleet Operations', 'Current manual schedule has too many student complaints.', 'pilot_active')
ON CONFLICT DO NOTHING;
