-- Migration: 20261017000004_realtime_setup.sql
-- Description: Setup Supabase Realtime publication for live fleet tracking

BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE 
    buses, 
    stop_etas, 
    night_owl_incidents,
    pilot_requests;
COMMIT;
