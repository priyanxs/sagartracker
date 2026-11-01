// =========================================================================
// Supabase Edge Function: send-arrival-alert
// Evaluates active student alert rules and triggers push notifications
// =========================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch active student alerts
    const { data: alerts, error: alertError } = await supabase
      .from("student_alerts")
      .select(`
        id,
        threshold_minutes,
        last_triggered_at,
        stop_id,
        route_id,
        student:profiles (
          id,
          full_name,
          fcm_token
        ),
        stop:stops (
          name
        )
      `)
      .eq("is_active", true);

    if (alertError || !alerts) {
      throw alertError ?? new Error("Failed to fetch alerts");
    }

    const notificationsSent = [];

    for (const alert of alerts) {
      // Find matching live ETAs for this stop and route
      const { data: etas } = await supabase
        .from("stop_etas")
        .select(`
          seconds_remaining,
          bus:buses (
            bus_number,
            occupancy_level
          )
        `)
        .eq("stop_id", alert.stop_id)
        .eq("route_id", alert.route_id);

      if (!etas || etas.length === 0) continue;

      for (const eta of etas) {
        const minutesRemaining = Math.round(eta.seconds_remaining / 60);

        // Check if ETA is within threshold and hasn't been triggered in the last 15 minutes
        const alreadyTriggeredRecently =
          alert.last_triggered_at &&
          Date.now() - new Date(alert.last_triggered_at).getTime() < 15 * 60 * 1000;

        if (minutesRemaining <= alert.threshold_minutes && !alreadyTriggeredRecently) {
          const busInfo = (eta as any).bus;
          const stopName = (alert as any).stop?.name ?? "your stop";
          const message = `🔔 ${busInfo?.bus_number || "Campus Shuttle"} is ${minutesRemaining} min away from ${stopName}!`;

          // In production: dispatch via FCM / WebPush / APNs
          console.log(`[DISPATCH PUSH] To ${(alert as any).student?.full_name}: ${message}`);

          // Update last_triggered_at timestamp
          await supabase
            .from("student_alerts")
            .update({ last_triggered_at: new Date().toISOString() })
            .eq("id", alert.id);

          notificationsSent.push({
            student_id: (alert as any).student?.id,
            message,
            minutesRemaining,
          });
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, dispatched_count: notificationsSent.length, notifications: notificationsSent }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
