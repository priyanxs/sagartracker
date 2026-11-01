// =========================================================================
// Supabase Edge Function: calculate-eta
// Calculates dynamic arrival ETAs for upcoming stops along a campus route
// =========================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

// Haversine formula for distance in meters
function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { route_id } = await req.json();

    if (!route_id) {
      return new Response(
        JSON.stringify({ error: "Missing route_id parameter" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch active buses on this route
    const { data: buses, error: busError } = await supabase
      .from("buses")
      .select("id, bus_number, current_latitude, current_longitude, current_speed_kmh")
      .eq("current_route_id", route_id)
      .eq("status", "active");

    if (busError || !buses) {
      throw busError ?? new Error("Failed to fetch buses");
    }

    // Fetch ordered stops along route
    const { data: routeStops, error: stopsError } = await supabase
      .from("route_stops")
      .select(`
        stop_order,
        typical_duration_minutes,
        stop:stops (
          id,
          name,
          latitude,
          longitude
        )
      `)
      .eq("route_id", route_id)
      .order("stop_order", { ascending: true });

    if (stopsError || !routeStops) {
      throw stopsError ?? new Error("Failed to fetch stops");
    }

    const calculatedETAs = [];

    // For each active bus, calculate distance and ETA to each upcoming stop
    for (const bus of buses) {
      if (!bus.current_latitude || !bus.current_longitude) continue;

      const currentSpeed = Math.max(15, Number(bus.current_speed_kmh) || 20); // Default to 20 km/h on campus
      const speedMetersPerSec = (currentSpeed * 1000) / 3600;

      let accumulatedSeconds = 0;

      for (const rs of routeStops) {
        const stop = (rs as any).stop;
        if (!stop) continue;

        const distanceMeters = haversineMeters(
          bus.current_latitude,
          bus.current_longitude,
          stop.latitude,
          stop.longitude
        );

        // Transit travel time + stop dwell time buffer (45s per stop)
        const travelSeconds = Math.round(distanceMeters / speedMetersPerSec) + 45;
        accumulatedSeconds = travelSeconds;

        const arrivalTime = new Date(Date.now() + accumulatedSeconds * 1000).toISOString();

        calculatedETAs.push({
          bus_id: bus.id,
          route_id: route_id,
          stop_id: stop.id,
          estimated_arrival_at: arrivalTime,
          seconds_remaining: accumulatedSeconds,
          is_delayed: currentSpeed < 10,
        });

        // Upsert into stop_etas table
        await supabase.from("stop_etas").upsert(
          {
            bus_id: bus.id,
            route_id: route_id,
            stop_id: stop.id,
            estimated_arrival_at: arrivalTime,
            seconds_remaining: accumulatedSeconds,
            is_delayed: currentSpeed < 10,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "bus_id,stop_id" }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true, count: calculatedETAs.length, etas: calculatedETAs }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
