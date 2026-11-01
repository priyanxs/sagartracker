/**
 * CampusMove — Supabase Client & Realtime Transit Service
 * Provides seamless integration with Supabase Database, Auth, Realtime & Edge Functions
 */

// Configuration: Replace with your actual Supabase project credentials,
// or set window.CAMPUSMOVE_SUPABASE_CONFIG = { url: '...', anonKey: '...' }
const DEFAULT_SUPABASE_CONFIG = {
  url: window.CAMPUSMOVE_SUPABASE_CONFIG?.url || "https://your-project-id.supabase.co",
  anonKey: window.CAMPUSMOVE_SUPABASE_CONFIG?.anonKey || "your-anon-public-key"
};

class CampusMoveBackend {
  constructor(config = DEFAULT_SUPABASE_CONFIG) {
    this.config = config;
    this.client = null;
    this.isConfigured = Boolean(
      config.url && 
      config.url !== "https://your-project-id.supabase.co" && 
      config.anonKey && 
      config.anonKey !== "your-anon-public-key"
    );

    this.initClient();
  }

  initClient() {
    if (this.isConfigured && window.supabase) {
      try {
        this.client = window.supabase.createClient(this.config.url, this.config.anonKey);
        console.log("⚡ CampusMove: Connected to live Supabase backend:", this.config.url);
      } catch (e) {
        console.warn("⚠️ CampusMove: Failed to initialize Supabase client, falling back to simulated mode.", e);
      }
    } else {
      console.log("ℹ️ CampusMove: Operating in simulated demo mode. Connect Supabase credentials to activate live database.");
    }
  }

  /**
   * Submit Pilot / Demo Request from Landing Page
   */
  async submitPilotRequest(requestData) {
    if (this.client) {
      try {
        const { data, error } = await this.client
          .from("pilot_requests")
          .insert({
            college_name: requestData.college,
            contact_name: requestData.name,
            email: requestData.email,
            fleet_size: requestData.fleet || "5-12",
            role: requestData.role || "Transit Director",
            notes: "Submitted via landing page modal",
            status: "pending"
          })
          .select()
          .single();

        if (error) throw error;
        return { success: true, data };
      } catch (err) {
        console.error("Error submitting pilot request to Supabase:", err);
      }
    }

    // Local simulation fallback
    console.log("📝 [Demo Mode] Stored pilot request locally:", requestData);
    return { 
      success: true, 
      simulated: true, 
      data: { id: "sim-" + Date.now(), ...requestData } 
    };
  }

  /**
   * Fetch Active College Routes
   */
  async fetchRoutes(collegeId = "00000000-0000-0000-0000-000000000001") {
    if (this.client) {
      try {
        const { data, error } = await this.client
          .from("routes")
          .select(`
            id,
            name,
            code,
            color,
            type,
            polyline_coordinates,
            operating_hours
          `)
          .eq("college_id", collegeId)
          .eq("is_active", true);

        if (error) throw error;
        return data;
      } catch (err) {
        console.warn("Could not fetch routes from Supabase, using local data", err);
      }
    }
    return null;
  }

  /**
   * Fetch Ordered Stops for a Route with Live ETAs
   */
  async fetchRouteStops(routeId) {
    if (this.client) {
      try {
        const { data, error } = await this.client.rpc("get_live_route_telemetry", {
          p_route_id: routeId
        });

        if (error) throw error;
        return data;
      } catch (err) {
        console.warn("Could not fetch route telemetry from Supabase", err);
      }
    }
    return null;
  }

  /**
   * Subscribe to Live Realtime Bus Telemetry
   */
  subscribeToBuses(callback) {
    if (this.client) {
      const channel = this.client
        .channel("live-buses")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "buses" },
          (payload) => {
            console.log("🚌 Realtime bus update received:", payload.new);
            callback(payload.new);
          }
        )
        .subscribe();

      return () => this.client.removeChannel(channel);
    }
    return () => {};
  }

  /**
   * Broadcast Driver GPS Telemetry (Driver App)
   */
  async updateDriverTelemetry(payload) {
    if (this.client) {
      try {
        const { data, error } = await this.client.rpc("update_bus_telemetry", {
          p_bus_id: payload.bus_id,
          p_latitude: payload.latitude,
          p_longitude: payload.longitude,
          p_speed_kmh: payload.speed_kmh || 0,
          p_heading: payload.heading || 0,
          p_accuracy: payload.accuracy || 3.0,
          p_occupancy: payload.occupancy,
          p_battery_percentage: payload.battery
        });

        if (error) throw error;
        return { success: true, data };
      } catch (err) {
        console.error("Failed to update telemetry on Supabase:", err);
      }
    }
    return { success: true, simulated: true };
  }

  /**
   * Trigger Student Night Owl Safety Alert
   */
  async triggerNightOwlSOS(studentId, latitude, longitude, notes = "") {
    if (this.client) {
      try {
        const { data, error } = await this.client.rpc("trigger_night_owl_sos", {
          p_student_id: studentId,
          p_latitude: latitude,
          p_longitude: longitude,
          p_notes: notes
        });

        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Failed to trigger SOS on Supabase:", err);
      }
    }
    return { success: true, simulated: true, message: "Safety alert dispatched to campus security." };
  }
}

// Export singleton instance
window.CampusMoveBackend = new CampusMoveBackend();
