// =========================================================================
// Supabase Edge Function: pilot-request
// Handles prospective college demo & 14-day pilot onboarding requests
// =========================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface PilotRequestBody {
  college_name: string;
  contact_name: string;
  email: string;
  fleet_size?: string;
  role?: string;
  notes?: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: PilotRequestBody = await req.json();

    if (!body.college_name || !body.contact_name || !body.email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: college_name, contact_name, email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert into pilot_requests table
    const { data, error } = await supabase
      .from("pilot_requests")
      .insert({
        college_name: body.college_name.trim(),
        contact_name: body.contact_name.trim(),
        email: body.email.toLowerCase().trim(),
        fleet_size: body.fleet_size ?? "5-12",
        role: body.role ?? "Transit Director",
        notes: body.notes ?? "Requested 14-day free trial via web modal",
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to insert pilot request:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[NEW PILOT REQUEST] College: ${body.college_name}, Contact: ${body.contact_name}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Pilot request registered successfully! Welcome kit will be emailed.",
        pilot_id: data.id,
      }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
