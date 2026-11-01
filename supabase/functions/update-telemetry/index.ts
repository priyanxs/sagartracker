// =========================================================================
// Supabase Edge Function: update-telemetry
// High-frequency telemetry ingestion for CampusMove Driver App & OBD-II GPS
// =========================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface TelemetryPayload {
  bus_id: string;
  latitude: number;
  longitude: number;
  speed_kmh?: number;
  heading?: number;
  accuracy_meters?: number;
  occupancy?: number;
  battery_percentage?: number;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: TelemetryPayload = await req.json();

    if (!body.bus_id || body.latitude === undefined || body.longitude === undefined) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: bus_id, latitude, longitude" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call atomic PostgreSQL RPC function
    const { data, error } = await supabase.rpc("update_bus_telemetry", {
      p_bus_id: body.bus_id,
      p_latitude: body.latitude,
      p_longitude: body.longitude,
      p_speed_kmh: body.speed_kmh ?? 0,
      p_heading: body.heading ?? 0,
      p_accuracy: body.accuracy_meters ?? 3.0,
      p_occupancy: body.occupancy,
      p_battery_percentage: body.battery_percentage,
    });

    if (error) {
      console.error("Telemetry update error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, result: data }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
