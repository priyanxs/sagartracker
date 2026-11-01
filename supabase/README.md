# ⚡ CampusMove — Supabase Backend Architecture & Setup Guide

This directory contains the production-grade **Supabase backend** for **CampusMove** (College Bus Tracking & Transit Intelligence).

It provides:
- **PostgreSQL Database with PostGIS** for geospatial distance calculation and geofencing.
- **Row Level Security (RLS)** ensuring FERPA compliance and role-based permissions (Students, Drivers, Admins, Dispatchers).
- **Atomic Stored Procedures (RPCs)** for sub-second driver GPS telemetry broadcasts and passenger pass validation.
- **Supabase Realtime** publications for live bus tracking and stop arrival countdowns.
- **Supabase Edge Functions** (TypeScript/Deno) for GPS ingestion, ETA calculation, and student push notifications.

---

## 📂 Directory Layout

```
supabase/
├── README.md                      # This comprehensive guide
├── config.toml                    # Supabase CLI project configuration
├── schema.sql                     # Complete PostgreSQL schema (extensions, tables, triggers, RPCs, RLS)
├── seed.sql                       # Seed data for Westlake University (routes, stops, buses, passes)
├── migrations/
│   ├── 20261017000001_init_campusmove_schema.sql         # Core tables & types
│   ├── 20261017000002_rls_and_security.sql              # RLS policies & indices
│   ├── 20261017000003_stored_procedures_and_gis.sql     # PostGIS triggers & RPCs
│   └── 20261017000004_realtime_setup.sql                # Supabase Realtime publication
└── functions/
    ├── update-telemetry/          # GPS ingestion from Driver App / OBD-II
    ├── calculate-eta/             # Live stop arrival estimation
    ├── send-arrival-alert/        # Student push notifications
    └── pilot-request/             # University demo request processing
```

---

## 🚀 Quick Setup (Choose Option A or Option B)

### Option A: Supabase Web Dashboard (Zero Install, ~2 Minutes)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open your project and navigate to the **SQL Editor** on the left sidebar.
3. Click **New Query**, copy the contents of [`supabase/schema.sql`](./schema.sql), paste it, and click **Run**.
   - *This creates all tables, PostGIS triggers, stored procedures, RLS policies, and Realtime publications.*
4. Open a second query, copy the contents of [`supabase/seed.sql`](./seed.sql), paste it, and click **Run**.
   - *This seeds Westlake University with 3 active bus lines, 8 stops, 4 shuttles, and sample ETAs matching the frontend simulator!*
5. Go to **Project Settings -> API** to grab your `Project URL` and `anon public key`.
6. Add them to your frontend in `index.html` or set:
   ```javascript
   window.CAMPUSMOVE_SUPABASE_CONFIG = {
     url: "https://your-project-id.supabase.co",
     anonKey: "your-anon-public-key"
   };
   ```

---

### Option B: Supabase CLI (Local Development)

1. **Install Supabase CLI** (if not installed):
   ```bash
   brew install supabase/tap/supabase
   ```
2. **Start Local Supabase Stack**:
   ```bash
   supabase start
   ```
   *This starts local Postgres (with PostGIS), Studio, Auth, Inbucket, and Storage on localhost.*
3. **Apply Database Migrations & Seed**:
   ```bash
   supabase db reset
   ```
4. **Deploy Edge Functions**:
   ```bash
   supabase functions deploy update-telemetry
   supabase functions deploy calculate-eta
   supabase functions deploy send-arrival-alert
   supabase functions deploy pilot-request
   ```

---

## 🗄️ Database Tables Overview

| Table | Description |
|---|---|
| `colleges` | Multi-tenant university settings, primary campus GPS center, and branding. |
| `profiles` | User profiles linked to `auth.users` with roles: `student`, `driver`, `admin`, `dispatcher`, `campus_police`. |
| `routes` | Campus transit lines with color hex codes, polyline coordinates JSON, and operating hours. |
| `stops` | Campus bus stops with PostGIS spatial geometry point and geofence radii. |
| `route_stops` | Ordered sequence of stops along each route with typical transit duration. |
| `buses` | Fleet vehicles with license plates, capacity, occupancy, battery %, and driver assignments. |
| `bus_telemetry` | High-frequency GPS history (latitude, longitude, speed km/h, heading, accuracy). |
| `stop_etas` | Real-time arrival predictions per bus and stop, synced to Realtime. |
| `student_alerts` | Custom student alert thresholds (e.g. notify when bus is 2 mins away). |
| `transit_passes` | Digital semester NFC / QR bus passes with student IDs. |
| `boarding_logs` | Audit trail of passenger boardings and automatic occupancy increments. |
| `night_owl_incidents` | Campus safety escort requests with instant dispatch to closest evening shuttle. |
| `pilot_requests` | Prospective university pilot submissions captured from the website. |

---

## ⚡ Stored Procedures & RPCs

### 1. `update_bus_telemetry`
Atomic function invoked by the Driver App or an IoT OBD-II GPS dongle.
Updates bus coordinates, heading, speed, computes crowd density (`seats_available`, `standing_only`, `full`), and inserts into `bus_telemetry`.
```sql
SELECT update_bus_telemetry(
  p_bus_id => '30000000-0000-0000-0000-000000000001',
  p_latitude => 37.7765,
  p_longitude => -122.4180,
  p_speed_kmh => 24.5,
  p_heading => 92.0,
  p_occupancy => 18,
  p_battery_percentage => 85
);
```

### 2. `get_nearest_stops`
Calculates distance in meters between student GPS and all campus stops using PostGIS:
```sql
SELECT * FROM get_nearest_stops(
  p_latitude => 37.7750,
  p_longitude => -122.4190,
  p_college_id => '00000000-0000-0000-0000-000000000001',
  p_max_distance_meters => 1500,
  p_limit => 3
);
```

### 3. `get_live_route_telemetry`
Returns the entire route polyline, all moving active buses, driver names, and live upcoming stop ETAs in a single structured JSON response.
```sql
SELECT get_live_route_telemetry('10000000-0000-0000-0000-000000000001');
```

### 4. `log_passenger_boarding`
Validates a student digital pass and automatically increments the bus passenger count.
```sql
SELECT log_passenger_boarding(
  p_pass_code => 'WL-9482014',
  p_bus_id => '30000000-0000-0000-0000-000000000001'
);
```

### 5. `trigger_night_owl_sos`
Registers an emergency / escort incident and dispatches the nearest active Night Owl shuttle.
```sql
SELECT trigger_night_owl_sos(
  p_student_id => '...',
  p_latitude => 37.7735,
  p_longitude => -122.4215,
  p_notes => 'Leaving library study hall'
);
```

---

## 📡 Supabase Realtime Setup

The `supabase_realtime` publication broadcasts database events directly to the frontend WebSocket:
- **`buses`**: Live GPS updates stream to the Leaflet map every 2 seconds without polling.
- **`stop_etas`**: ETA countdowns automatically refresh when a shuttle accelerates or hits traffic.
- **`pilot_requests`**: Instant alert to university sales dispatch when a college requests a demo.

Client example:
```javascript
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Stream live bus position changes
supabase
  .channel('live-buses')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'buses' }, (payload) => {
    updateMarkerPosition(payload.new.id, payload.new.current_latitude, payload.new.current_longitude);
  })
  .subscribe();
```

---

## 🛡️ FERPA & Student Privacy Compliance
- Student personal location is **never** broadcasted to other users.
- Only campus shuttles broadcast telemetry.
- All student tables (`student_alerts`, `transit_passes`, `night_owl_incidents`) are strictly protected by Row Level Security (`auth.uid() = student_id`).
