import json

with open('routes_normalized.json', 'r', encoding='utf-8') as f:
    routes_data = json.load(f)

# Compact JSON string of routes
routes_json_str = json.dumps(routes_data)

html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Sagar College Bus Tracker</title>
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="./assets/logo.png">

  <!-- Tailwind CSS & Lucide Icons -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>

  <!-- Leaflet GIS Map CSS & JS for Street Map Mode -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    body {{
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }}
    .custom-scrollbar::-webkit-scrollbar {{
      display: none;
    }}
    @keyframes pulseHalo {{
      0% {{ transform: scale(0.95); opacity: 0.8; }}
      50% {{ transform: scale(1.3); opacity: 0.3; }}
      100% {{ transform: scale(0.95); opacity: 0.8; }}
    }}
    .animate-halo {{
      animation: pulseHalo 2s infinite ease-in-out;
    }}
    /* Responsive Mobile Frame */
    @media (max-width: 640px) {{
      .phone-frame {{
        max-width: 100% !important;
        height: 100dvh !important;
        border-radius: 0 !important;
        border: none !important;
      }}
    }}
  </style>
</head>
<body class="bg-slate-950 flex justify-center items-center min-h-screen p-0 md:p-6">

  <!-- Mobile Frame Container (Matching WhatsApp Video) -->
  <div class="phone-frame relative w-full max-w-[425px] h-[100vh] md:h-[860px] bg-slate-900 md:rounded-[44px] overflow-hidden shadow-2xl flex flex-col border-0 md:border-[8px] md:border-slate-800">
    
    <!-- Top System Bar Mock -->
    <div class="bg-slate-950 px-6 pt-3 pb-1 flex justify-between items-center text-white text-xs z-50">
      <span class="font-bold text-[13px]" id="clockTime">08:15 AM</span>
      <div class="flex items-center space-x-2">
        <span class="text-[10px] bg-emerald-600 px-1.5 py-0.5 rounded font-black tracking-wider">5G</span>
        <i data-lucide="wifi" class="w-3.5 h-3.5"></i>
        <i data-lucide="battery-charging" class="w-4 h-4 text-emerald-400"></i>
      </div>
    </div>

    <!-- App Header -->
    <header class="bg-slate-900 px-4 pt-2 pb-3 border-b border-slate-800 z-40">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2.5">
          <div class="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center border border-blue-400 shadow-md">
            <i data-lucide="bus" class="w-5 h-5 text-white stroke-[2.5]"></i>
          </div>
          <div>
            <h1 class="text-white text-base font-black leading-tight tracking-tight">Sagar Bus Tracker</h1>
            <p class="text-slate-400 text-[11px] font-semibold">Campus Transit • Live GPS</p>
          </div>
        </div>
        <div class="flex items-center bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full">
          <span class="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-ping"></span>
          <span class="text-slate-200 text-[10px] font-black uppercase tracking-wider">LIVE</span>
        </div>
      </div>

      <!-- Quick Route Switcher Bar (Visible on Live Track Tab) -->
      <div id="routeChipsBar" class="flex space-x-2 mt-2.5 overflow-x-auto custom-scrollbar pb-0.5">
        <!-- Rendered via JS -->
      </div>
    </header>

    <!-- Main Screens Content Container -->
    <main class="flex-1 relative overflow-hidden bg-slate-100">

      <!-- ================= SCREEN 1: LIVE TRACKING ================= -->
      <section id="screen-live" class="absolute inset-0 flex flex-col">
        <!-- Simulation Control Overlay Bar -->
        <div class="absolute top-3 left-3 right-3 z-30 bg-slate-900/90 backdrop-blur-md rounded-2xl px-3.5 py-2 flex items-center justify-between border border-slate-700 shadow-xl">
          <div class="flex items-center">
            <span id="simLed" class="w-2.5 h-2.5 rounded-full bg-emerald-400 mr-2"></span>
            <span id="simStatusText" class="text-white text-xs font-black tracking-wide">SIMULATION ACTIVE</span>
          </div>
          <div class="flex items-center space-x-1.5">
            <button id="togglePlayBtn" class="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 text-white hover:bg-slate-700 transition" title="Play/Pause">
              <i data-lucide="pause" class="w-3.5 h-3.5" id="playIcon"></i>
            </button>
            <button id="speedMultiplierBtn" class="bg-blue-600 px-2 py-1 rounded-lg flex items-center text-white text-xs font-black hover:bg-blue-500 transition" title="Speed">
              <i data-lucide="zap" class="w-3 h-3 mr-0.5"></i>
              <span id="speedMultiplierText">1x</span>
            </button>
            <button id="resetSimBtn" class="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-300 hover:bg-slate-700 transition" title="Reset">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <!-- Map Layer Toggle & Controls (Top Right) -->
        <div class="absolute top-16 right-3 z-30 flex flex-col space-y-2">
          <!-- Compass Widget -->
          <div class="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center">
            <i data-lucide="compass" class="w-4 h-4 text-slate-800"></i>
            <span class="text-[9px] font-black text-slate-700 mt-0.5">NORTH</span>
          </div>

          <!-- Map View Mode Toggle (Vector / Street) -->
          <button id="mapModeToggleBtn" class="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center hover:bg-slate-50 transition" title="Toggle Map Style">
            <i data-lucide="layers" class="w-4 h-4 text-blue-600"></i>
            <span id="mapModeLabel" class="text-[9px] font-black text-slate-800 mt-0.5">STREET</span>
          </button>
        </div>

        <!-- Interactive Map Canvas Container -->
        <div class="flex-1 relative w-full h-full bg-[#f1f5f9] overflow-hidden" id="mapContainer">
          
          <!-- Leaflet Container (Hidden by default, shown when street mode is active) -->
          <div id="leafletMap" class="absolute inset-0 w-full h-full hidden z-10"></div>

          <!-- Clean Daylight Vector SVG Map (Default, from WhatsApp Video) -->
          <svg id="mapSvg" class="w-full h-full relative z-10" xmlns="http://www.w3.org/2000/svg">
            <!-- Road Grid Background -->
            <defs>
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="2,2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridPattern)" />

            <!-- Route Polyline Shadows & Strokes -->
            <path id="routePathCasing" fill="none" stroke="#1E3A8A" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="routePathLine" fill="none" stroke="#3B82F6" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>

            <!-- Stops rendered dynamically in JS -->
            <g id="stopsGroup"></g>

            <!-- Animated Bus Node Marker -->
            <g id="busMarkerGroup" class="cursor-pointer">
              <circle id="busHalo" cx="0" cy="0" r="24" fill="#E11D48" fill-opacity="0.25" class="animate-halo"/>
              <circle cx="0" cy="0" r="18" fill="#E11D48" stroke="#FFFFFF" stroke-width="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"/>
              <g id="busIconRotator">
                <!-- Bus Symbol -->
                <rect x="-8" y="-10" width="16" height="20" rx="3" fill="#FFFFFF" />
                <rect x="-6" y="-8" width="12" height="5" rx="1" fill="#E11D48" />
                <circle cx="-5" cy="6" r="2" fill="#0F172A" />
                <circle cx="5" cy="6" r="2" fill="#0F172A" />
              </g>
            </g>
          </svg>

          <!-- Floating Bus Tag Badge -->
          <div id="busFloatingBadge" class="absolute pointer-events-none transform -translate-x-1/2 -translate-y-12 bg-slate-950 px-2.5 py-0.5 rounded-md border border-slate-700 shadow-xl flex items-center space-x-1 z-20">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span id="mapBusPlateText" class="text-white text-[10px] font-black tracking-wider">MP-04-HE-2001</span>
          </div>
        </div>

        <!-- Floating "Next Stop" Card Overlay (From WhatsApp Video) -->
        <div class="absolute bottom-4 left-3 right-3 z-40 bg-white rounded-3xl p-4 shadow-2xl border-2 border-slate-200">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <div class="flex items-center space-x-2">
              <span class="bg-blue-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md">NEXT STOP</span>
              <span id="nextStopStatusPill" class="text-emerald-900 bg-emerald-100 border border-emerald-400 text-[11px] font-black px-2 py-0.5 rounded-full">
                ON TIME
              </span>
            </div>
            <div class="flex items-center bg-slate-100 px-2 py-0.5 rounded-md text-slate-700 text-xs font-bold">
              <i data-lucide="gauge" class="w-3.5 h-3.5 mr-1 text-slate-500"></i>
              <span id="cardSpeedText">36 km/h</span>
            </div>
          </div>

          <div class="py-2.5 flex items-start justify-between">
            <div class="flex-1 pr-2">
              <h3 id="nextStopNameText" class="text-slate-950 text-lg font-black tracking-tight leading-tight">
                NIZAMUDDIN
              </h3>
              <div class="flex items-center text-slate-500 text-xs font-medium mt-1">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 mr-1 text-slate-400"></i>
                <span id="nextStopLandmarkText" class="truncate">Designated Boarding Stop</span>
              </div>
            </div>

            <div class="bg-slate-950 text-white rounded-2xl px-3 py-2 text-center min-w-[70px] shadow-sm">
              <div id="cardEtaText" class="text-yellow-400 text-xl font-black leading-none">8m</div>
              <div class="text-slate-300 text-[9px] font-black tracking-wider mt-1 uppercase">Arriving</div>
            </div>
          </div>

          <div class="flex justify-between items-center bg-slate-50 p-2 rounded-xl mb-2.5 border border-slate-100 text-xs">
            <div class="flex items-center font-bold text-slate-800">
              <i data-lucide="navigation" class="w-3.5 h-3.5 mr-1.5 text-blue-600"></i>
              <span id="cardDistanceText">2.4 km away</span>
            </div>
            <div class="flex items-center font-semibold text-slate-600">
              <i data-lucide="users" class="w-3.5 h-3.5 mr-1 text-slate-500"></i>
              <span>Seats: <b id="cardSeatsLeft" class="text-slate-950 font-black">14 free</b></span>
            </div>
          </div>

          <div class="flex space-x-2">
            <button id="openCrewModalBtn" class="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-2xl flex items-center justify-center transition shadow-md">
              <span>Bus & Crew Info</span>
              <i data-lucide="chevron-right" class="w-4 h-4 ml-1"></i>
            </button>
            <button id="switchToRoutesBtn" class="bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 font-bold text-xs px-3 py-3 rounded-2xl transition">
              All Stops
            </button>
          </div>
        </div>
      </section>

      <!-- ================= SCREEN 2: ROUTES DIRECTORY ================= -->
      <section id="screen-routes" class="absolute inset-0 flex flex-col hidden bg-slate-100">
        <div class="p-3.5 pb-2">
          <!-- Search Input -->
          <div class="flex items-center bg-white rounded-2xl px-3.5 py-2.5 border-2 border-slate-300 shadow-sm">
            <i data-lucide="search" class="w-4 h-4 text-slate-500 mr-2"></i>
            <input id="routeSearchInput" type="text" placeholder="Search route, stop or area (e.g. Piplani, Karond)..."
              class="w-full text-xs font-bold text-slate-900 bg-transparent outline-none">
            <button id="clearSearchBtn" class="hidden text-slate-400 hover:text-slate-600">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <!-- Filter Pills -->
          <div class="flex space-x-1.5 mt-2.5">
            <button class="filter-chip active bg-slate-900 text-white text-[11px] font-black px-3 py-1 rounded-full border border-slate-900" data-filter="ALL">
              All Routes (<span id="routesCountBadge">30</span>)
            </button>
            <button class="filter-chip bg-white text-slate-700 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-300" data-filter="MORNING">
              Morning Pickup
            </button>
            <button class="filter-chip bg-white text-slate-700 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-300" data-filter="DELAYED">
              Delayed
            </button>
          </div>
        </div>

        <!-- Routes List -->
        <div id="routesListContainer" class="flex-1 overflow-y-auto px-3.5 pb-24 space-y-3">
          <!-- Dynamically populated via JS -->
        </div>
      </section>

      <!-- ================= SCREEN 3: ALERTS & STUDENT COMMUTE ================= -->
      <section id="screen-alerts" class="absolute inset-0 flex flex-col hidden overflow-y-auto p-4 pb-24 bg-slate-100">
        <!-- Student Pass Card -->
        <div class="bg-slate-900 rounded-3xl p-4 text-white border border-slate-800 shadow-md mb-4">
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center text-blue-400 text-xs font-black uppercase tracking-wider">
              <i data-lucide="shield" class="w-4 h-4 mr-1"></i>
              Digital Bus Pass
            </div>
            <span class="bg-emerald-500/20 text-emerald-300 border border-emerald-500 text-[9px] font-black px-2 py-0.5 rounded-full">
              VALID 2026-27
            </span>
          </div>
          <h2 class="font-black text-base">Sagar Group of Institutions (SISTec)</h2>
          <p class="text-slate-400 text-xs mt-0.5" id="alertsAssignedRoute">Assigned: Route 1 (PIPLANI NIZAMUDDIN)</p>
          <div class="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-800 text-xs">
            <span class="text-slate-400">Pass: SISTEC-BUS-88219</span>
            <span class="text-blue-400 font-bold">Boarding: Nizamuddin</span>
          </div>
        </div>

        <h3 class="text-slate-900 text-xs font-black uppercase tracking-wider mb-2">Live Transport Advisories</h3>

        <div class="bg-white rounded-2xl p-3.5 border-2 border-slate-200 shadow-sm mb-2.5">
          <div class="flex justify-between items-center mb-1">
            <div class="flex items-center text-rose-600 font-bold text-xs">
              <i data-lucide="alert-triangle" class="w-3.5 h-3.5 mr-1"></i>
              Route 2 (Karond) Traffic Advisory
            </div>
            <span class="text-slate-400 text-[10px]">10m ago</span>
          </div>
          <p class="text-slate-600 text-xs leading-relaxed">
            Congestion near Karond Square due to flyover construction. Bus running 5 minutes behind schedule.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-3.5 border-2 border-slate-200 shadow-sm mb-4">
          <div class="flex justify-between items-center mb-1">
            <div class="flex items-center text-blue-600 font-bold text-xs">
              <i data-lucide="info" class="w-3.5 h-3.5 mr-1"></i>
              Semester Exam Special Transit
            </div>
            <span class="text-slate-400 text-[10px]">1h ago</span>
          </div>
          <p class="text-slate-600 text-xs leading-relaxed">
            All morning buses will arrive 15 minutes before exam schedule. Return buses leave at 1:45 PM and 5:15 PM.
          </p>
        </div>

        <a href="tel:+917880131501" class="bg-rose-600 hover:bg-rose-700 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-md">
          <div class="flex items-center">
            <i data-lucide="phone-call" class="w-5 h-5 mr-2.5"></i>
            <div>
              <div class="text-xs font-black">Transport Emergency Hotline</div>
              <div class="text-[11px] text-rose-100 font-medium">+91 78801 31501 (24x7 Fleet Control Desk)</div>
            </div>
          </div>
          <i data-lucide="chevron-right" class="w-4 h-4"></i>
        </a>
      </section>

    </main>

    <!-- ================= BOTTOM TAB NAVIGATOR ================= -->
    <nav class="bg-white border-t-2 border-slate-200 px-3 py-2 flex justify-around items-center z-50">
      <button class="nav-tab active flex flex-col items-center py-1 px-4 rounded-xl text-blue-600" data-screen="screen-live">
        <i data-lucide="navigation" class="w-5 h-5 stroke-[2.5]"></i>
        <span class="text-[11px] font-black mt-1">Live Track</span>
      </button>

      <button class="nav-tab flex flex-col items-center py-1 px-4 rounded-xl text-slate-500" data-screen="screen-routes">
        <i data-lucide="route" class="w-5 h-5 stroke-[2]"></i>
        <span class="text-[11px] font-black mt-1">All Routes</span>
      </button>

      <button class="nav-tab flex flex-col items-center py-1 px-4 rounded-xl text-slate-500" data-screen="screen-alerts">
        <i data-lucide="bell" class="w-5 h-5 stroke-[2]"></i>
        <span class="text-[11px] font-black mt-1">Alerts</span>
      </button>
    </nav>

    <!-- ================= BUS & CREW BOTTOM SHEET MODAL (From WhatsApp Video) ================= -->
    <div id="crewModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden flex flex-col justify-end">
      <!-- Backdrop tap target -->
      <div id="modalBackdropDismiss" class="flex-1"></div>

      <div class="bg-white rounded-t-[36px] max-h-[85vh] overflow-y-auto border-t-2 border-slate-200 shadow-2xl p-6">
        <!-- Notch -->
        <div class="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3"></div>

        <div class="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <h2 class="text-slate-900 text-xl font-black">Bus & Crew Details</h2>
            <p class="text-slate-400 text-xs font-semibold">Live College Fleet Verification</p>
          </div>
          <button id="closeCrewModalBtn" class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 hover:bg-slate-200">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- 1. BUS PLATE & CAPACITY -->
        <div class="bg-slate-900 rounded-3xl p-4 text-white mt-4 border border-slate-800">
          <!-- License Plate -->
          <div class="bg-yellow-400 text-slate-950 rounded-xl px-3 py-1.5 flex justify-between items-center mb-3">
            <div class="flex items-center">
              <span class="bg-blue-900 text-white text-[8px] font-black px-1 rounded mr-2">IND</span>
              <span id="modalPlateNumber" class="font-black text-lg tracking-widest">MP-04-HE-2001</span>
            </div>
            <span class="text-[9px] font-black bg-slate-950 text-yellow-400 px-2 py-0.5 rounded">COLLEGE FLEET</span>
          </div>

          <div class="flex justify-between items-center mb-3">
            <span id="modalStatusBadge" class="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-400">
              ON TIME
            </span>
            <span class="text-xs text-slate-300 font-bold">Speed: <b id="modalSpeed" class="text-white">36 km/h</b></span>
          </div>

          <!-- Capacity Bar -->
          <div class="pt-2 border-t border-slate-800">
            <div class="flex justify-between text-xs mb-1.5 font-bold">
              <span class="text-slate-300 flex items-center">
                <i data-lucide="users" class="w-3.5 h-3.5 mr-1 text-slate-400"></i>
                Seating Capacity
              </span>
              <span id="modalCapacityText" class="text-white">39 / 52 seats (75% full)</span>
            </div>
            <div class="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div id="modalCapacityBar" class="h-full bg-emerald-500 rounded-full" style="width: 75%"></div>
            </div>
          </div>
        </div>

        <!-- 2. DRIVER CARD -->
        <div class="bg-white rounded-3xl p-4 border-2 border-slate-200 mt-4 shadow-sm">
          <div class="flex justify-between items-center mb-2">
            <span class="text-slate-400 text-[11px] font-black uppercase tracking-wider">Assigned Driver</span>
            <span class="flex items-center text-blue-700 bg-blue-50 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
              <i data-lucide="shield-check" class="w-3 h-3 mr-1"></i> Verified
            </span>
          </div>
          <div class="flex items-center">
            <img id="modalDriverPhoto" src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80" class="w-14 h-14 rounded-2xl object-cover bg-slate-200 border-2 border-slate-300" alt="Driver">
            <div class="ml-3.5 flex-1">
              <h4 id="modalDriverName" class="text-slate-950 font-black text-base">Pawan</h4>
              <p id="modalDriverBadge" class="text-slate-500 text-xs">Badge: DRV-101</p>
              <div class="flex space-x-2 mt-1">
                <span class="flex items-center text-amber-900 bg-amber-50 border border-amber-200 text-xs font-black px-1.5 py-0.5 rounded-md">
                  ★ <span id="modalDriverRating" class="ml-1">4.9</span>
                </span>
                <span id="modalDriverExp" class="text-slate-700 bg-slate-100 text-xs font-bold px-2 py-0.5 rounded-md">
                  10 yrs exp
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. CONDUCTOR CARD & CALL ACTION -->
        <div class="bg-white rounded-3xl p-4 border-2 border-slate-200 mt-4 shadow-sm">
          <div class="flex justify-between items-center mb-2">
            <span class="text-slate-400 text-[11px] font-black uppercase tracking-wider">Assigned Conductor</span>
            <span id="modalConductorId" class="text-slate-500 text-xs font-semibold">ID: CND-301</span>
          </div>
          <div class="flex items-center mb-3">
            <img id="modalConductorPhoto" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" class="w-14 h-14 rounded-2xl object-cover bg-slate-200 border-2 border-slate-300" alt="Conductor">
            <div class="ml-3.5 flex-1">
              <h4 id="modalConductorName" class="text-slate-950 font-black text-base">Afzal Alam</h4>
              <p id="modalConductorPhoneText" class="text-slate-500 text-xs">Contact: +91 98938 37199</p>
              <span class="text-emerald-700 text-[11px] font-bold">• Active On Duty</span>
            </div>
          </div>

          <!-- PROMINENT CALL CONDUCTOR BUTTON -->
          <a id="modalCallConductorLink" href="tel:+919893837199" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3.5 rounded-2xl flex items-center justify-center shadow-lg transition border-2 border-emerald-500">
            <div class="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center mr-2">
              <i data-lucide="phone" class="w-4 h-4 text-white stroke-[2.5]"></i>
            </div>
            <span id="modalCallButtonText">Call Conductor (Afzal Alam)</span>
          </a>
        </div>
      </div>
    </div>

  </div>

  <script>
    // Robust Mock & Official 30 Routes Dataset Embedded
    let MOCK_ROUTES = {routes_json_str};

    // State Variables
    let currentRouteId = MOCK_ROUTES[0]?.id || 'route-1';
    let isSimulating = true;
    let simSpeedMultiplier = 1;
    let expandedRouteId = currentRouteId;
    let simulationTimer = null;
    let currentMapMode = 'vector'; // 'vector' or 'street'
    let leafletMapInstance = null;
    let leafletPolyline = null;
    let leafletBusMarker = null;
    let leafletStopMarkers = [];

    function getSelectedRoute() {{
      return MOCK_ROUTES.find(r => r.id === currentRouteId) || MOCK_ROUTES[0];
    }}

    // Real-time Clock
    function updateClock() {{
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      document.getElementById('clockTime').innerText = `${{String(hours).padStart(2, '0')}}:${{minutes}} ${{ampm}}`;
    }}
    setInterval(updateClock, 10000);
    updateClock();

    // Initialize UI
    function init() {{
      lucide.createIcons();
      renderRouteChips();
      renderMap();
      updateNextStopCard();
      renderRoutesDirectory();
      startSimulation();
      setupEventListeners();
    }}

    // Render Route Switcher Chips at the Top
    function renderRouteChips() {{
      const container = document.getElementById('routeChipsBar');
      container.innerHTML = MOCK_ROUTES.map(r => {{
        const isSel = r.id === currentRouteId;
        const color = r.themeColor || r.color || '#2563EB';
        return `
          <button onclick="selectRoute('${{r.id}}')" class="flex-shrink-0 px-3 py-1 rounded-xl text-xs font-black flex items-center transition ${{
            isSel ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }}">
            <span class="w-2 h-2 rounded-full mr-1.5" style="background-color: ${{isSel ? '#FFFFFF' : color}}"></span>
            ${{r.routeNumber}}
          </button>
        `;
      }}).join('');

      // Auto-scroll selected chip into view
      const selectedBtn = container.querySelector('.bg-blue-600');
      if (selectedBtn) {{
        selectedBtn.scrollIntoView({{ behavior: 'smooth', inline: 'center', block: 'nearest' }});
      }}
    }}

    window.selectRoute = function(routeId) {{
      currentRouteId = routeId;
      expandedRouteId = routeId;
      renderRouteChips();
      renderMap();
      updateNextStopCard();
      renderRoutesDirectory();

      const route = getSelectedRoute();
      const assignedText = document.getElementById('alertsAssignedRoute');
      if (assignedText) {{
        assignedText.innerText = `Assigned: ${{route.routeNumber}} (${{route.title}})`;
      }}
    }};

    // Calculate Bounding Box of Route Waypoints for projection
    function getBoundingBox(waypoints) {{
      let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
      for (const p of waypoints) {{
        const lat = p.lat !== undefined ? p.lat : p.y;
        const lng = p.lng !== undefined ? p.lng : p.x;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
        if (lng < minLng) minLng = lng;
        if (lng > maxLng) maxLng = lng;
      }}
      const dLat = Math.max(0.005, (maxLat - minLat) * 0.15);
      const dLng = Math.max(0.005, (maxLng - minLng) * 0.15);
      return {{
        minLat: minLat - dLat,
        maxLat: maxLat + dLat,
        minLng: minLng - dLng,
        maxLng: maxLng + dLng
      }};
    }}

    // Project geographic coordinates into SVG canvas
    function projectCoord(lat, lng, bbox, mapW, mapH) {{
      const x = ((lng - bbox.minLng) / (bbox.maxLng - bbox.minLng)) * (mapW - 70) + 35;
      const y = ((bbox.maxLat - lat) / (bbox.maxLat - bbox.minLat)) * (mapH - 250) + 75;
      return {{ x, y }};
    }}

    // Render Clean Vector SVG Map (Matching WhatsApp Video)
    function renderMap() {{
      const route = getSelectedRoute();
      const bus = route.activeBus;
      const waypoints = route.waypoints;

      const mapContainer = document.getElementById('mapContainer');
      const mapW = mapContainer.clientWidth || 400;
      const mapH = mapContainer.clientHeight || 700;

      const bbox = getBoundingBox(waypoints);

      // Downsample waypoints if very dense (for ultra-smooth SVG rendering)
      const step = waypoints.length > 200 ? Math.ceil(waypoints.length / 150) : 1;
      const filteredWp = waypoints.filter((_, idx) => idx % step === 0 || idx === waypoints.length - 1);

      // Build SVG Path
      const pathD = filteredWp.reduce((acc, pt, idx) => {{
        const lat = pt.lat !== undefined ? pt.lat : pt.y;
        const lng = pt.lng !== undefined ? pt.lng : pt.x;
        const p = projectCoord(lat, lng, bbox, mapW, mapH);
        return idx === 0 ? `M ${{p.x}} ${{p.y}}` : `${{acc}} L ${{p.x}} ${{p.y}}`;
      }}, '');

      const casing = document.getElementById('routePathCasing');
      const line = document.getElementById('routePathLine');
      casing.setAttribute('d', pathD);
      line.setAttribute('d', pathD);
      line.setAttribute('stroke', route.themeColor || route.color || '#3B82F6');

      // Render Stops
      const stopsGroup = document.getElementById('stopsGroup');
      stopsGroup.innerHTML = '';

      route.stops.forEach((stop, idx) => {{
        const lat = stop.lat !== undefined ? stop.lat : stop.y;
        const lng = stop.lng !== undefined ? stop.lng : stop.x;
        let pt = projectCoord(lat, lng, bbox, mapW, mapH);

        // Fallback if stop lat/lng is missing
        if (isNaN(pt.x) || isNaN(pt.y)) {{
          const wpIdx = Math.floor((idx / (route.stops.length - 1)) * (waypoints.length - 1));
          const w = waypoints[wpIdx] || waypoints[0];
          pt = projectCoord(w.lat, w.lng, bbox, mapW, mapH);
        }}

        const nodeColor = stop.isPassed ? '#10B981' : stop.isNext ? '#2563EB' : '#1E293B';

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'cursor-pointer');
        g.onclick = () => {{
          openCrewModal();
        }};

        let halo = '';
        if (stop.isNext) {{
          halo = `<circle cx="${{pt.x}}" cy="${{pt.y}}" r="16" fill="#3B82F6" fill-opacity="0.3" class="animate-ping" />`;
        }}

        const stopLabel = stop.name.length > 16 ? stop.name.slice(0, 14) + '..' : stop.name;
        const labelW = Math.min(130, stopLabel.length * 6.5 + 14);

        g.innerHTML = `
          ${{halo}}
          <circle cx="${{pt.x}}" cy="${{pt.y}}" r="10" fill="${{nodeColor}}" stroke="#FFFFFF" stroke-width="2.5" />
          <text x="${{pt.x}}" y="${{pt.y + 3.5}}" fill="#FFFFFF" font-size="10" font-weight="900" text-anchor="middle">${{idx + 1}}</text>
          <rect x="${{pt.x + 12}}" y="${{pt.y - 10}}" width="${{labelW}}" height="18" rx="4" fill="#0F172A" fill-opacity="0.88"/>
          <text x="${{pt.x + 16}}" y="${{pt.y + 2.5}}" fill="#FFFFFF" font-size="9" font-weight="700">${{stopLabel}}</text>
        `;
        stopsGroup.appendChild(g);
      }});

      updateBusPosition();

      // If Leaflet Street mode is active, sync it as well
      if (currentMapMode === 'street' && leafletMapInstance) {{
        syncLeafletMap();
      }}
    }}

    function updateBusPosition() {{
      const route = getSelectedRoute();
      const bus = route.activeBus;
      const waypoints = route.waypoints;
      const currentPt = waypoints[bus.currentWpIndex || 0] || waypoints[0];

      const mapContainer = document.getElementById('mapContainer');
      const mapW = mapContainer.clientWidth || 400;
      const mapH = mapContainer.clientHeight || 700;
      const bbox = getBoundingBox(waypoints);

      const lat = currentPt.lat !== undefined ? currentPt.lat : currentPt.y;
      const lng = currentPt.lng !== undefined ? currentPt.lng : currentPt.x;
      const pos = projectCoord(lat, lng, bbox, mapW, mapH);

      const marker = document.getElementById('busMarkerGroup');
      marker.setAttribute('transform', `translate(${{pos.x}}, ${{pos.y}})`);

      const rotator = document.getElementById('busIconRotator');
      rotator.setAttribute('transform', `rotate(${{bus.heading || 0}})`);

      const badge = document.getElementById('busFloatingBadge');
      badge.style.left = `${{pos.x}}px`;
      badge.style.top = `${{pos.y - 12}}px`;
      document.getElementById('mapBusPlateText').innerText = bus.plateNumber;
    }}

    // Update Floating Next Stop Card (From WhatsApp Video)
    function updateNextStopCard() {{
      const route = getSelectedRoute();
      const bus = route.activeBus;
      const nextStop = route.stops.find(s => s.isNext) || route.stops[0];

      document.getElementById('nextStopNameText').innerText = nextStop.name;
      document.getElementById('nextStopLandmarkText').innerText = nextStop.landmark || 'Designated College Bus Stop';
      document.getElementById('cardSpeedText').innerText = `${{bus.speed || 36}} km/h`;
      
      const seatsLeft = (bus.capacity || 52) - (bus.occupiedSeats || 38);
      document.getElementById('cardSeatsLeft').innerText = `${{seatsLeft}} free`;

      const statusPill = document.getElementById('nextStopStatusPill');
      if (bus.status === 'DELAYED') {{
        statusPill.className = 'text-rose-900 bg-rose-100 border border-rose-400 text-[11px] font-black px-2 py-0.5 rounded-full';
        statusPill.innerText = 'DELAYED';
      }} else {{
        statusPill.className = 'text-emerald-900 bg-emerald-100 border border-emerald-400 text-[11px] font-black px-2 py-0.5 rounded-full';
        statusPill.innerText = 'ON TIME';
      }}

      // Calculate Remaining Distance and ETA
      const waypoints = route.waypoints;
      const currIdx = bus.currentWpIndex || 0;
      const remainingWp = waypoints.length - currIdx;
      const pseudoDistKm = Math.max(0.4, (remainingWp * 0.05)).toFixed(1);
      const pseudoEta = Math.max(2, Math.round(parseFloat(pseudoDistKm) / ((bus.speed || 36) / 60)));

      document.getElementById('cardDistanceText').innerText = `${{pseudoDistKm}} km away`;
      document.getElementById('cardEtaText').innerText = `${{pseudoEta}}m`;
    }}

    // Simulation Loop with setInterval (Matching React Native code)
    function startSimulation() {{
      if (simulationTimer) clearInterval(simulationTimer);
      const interval = Math.max(300, 1500 / simSpeedMultiplier);

      simulationTimer = setInterval(() => {{
        if (!isSimulating) return;

        const route = getSelectedRoute();
        const bus = route.activeBus;
        const waypoints = route.waypoints;

        const currIdx = bus.currentWpIndex || 0;
        const nextIdx = (currIdx + 1) % waypoints.length;

        const currPt = waypoints[currIdx];
        const nextPt = waypoints[nextIdx];

        // Heading calculation
        const dx = (nextPt.lng || nextPt.x) - (currPt.lng || currPt.x);
        const dy = (nextPt.lat || nextPt.y) - (currPt.lat || currPt.y);
        const headingDeg = (Math.atan2(dx, dy) * 180) / Math.PI;

        bus.currentWpIndex = nextIdx;
        bus.heading = (headingDeg + 360) % 360;

        // Dynamic speed fluctuation for realism
        const baseSpeed = bus.status === 'DELAYED' ? 22 : 36;
        bus.speed = Math.max(16, baseSpeed + Math.floor(Math.random() * 5) - 2);

        // Update stop status if reached
        const stopProgressIdx = Math.floor((nextIdx / waypoints.length) * route.stops.length);
        route.stops.forEach((s, idx) => {{
          if (idx < stopProgressIdx) {{
            s.isPassed = true;
            s.isNext = false;
          }} else if (idx === stopProgressIdx) {{
            s.isPassed = false;
            s.isNext = true;
          }} else {{
            s.isPassed = false;
            s.isNext = false;
          }}
        }});

        updateBusPosition();
        updateNextStopCard();
      }}, interval);
    }}

    // Render Routes Directory Screen (Matching WhatsApp Video)
    function renderRoutesDirectory() {{
      const container = document.getElementById('routesListContainer');
      const searchVal = document.getElementById('routeSearchInput').value.toLowerCase();
      const activeFilter = document.querySelector('.filter-chip.active')?.dataset.filter || 'ALL';

      const filtered = MOCK_ROUTES.filter(r => {{
        const matchesSearch = r.routeNumber.toLowerCase().includes(searchVal) ||
          r.title.toLowerCase().includes(searchVal) ||
          r.origin.toLowerCase().includes(searchVal) ||
          r.destination.toLowerCase().includes(searchVal) ||
          r.stops.some(s => s.name.toLowerCase().includes(searchVal) || (s.landmark && s.landmark.toLowerCase().includes(searchVal)));

        if (!matchesSearch) return false;
        if (activeFilter === 'MORNING') return true;
        if (activeFilter === 'DELAYED') return r.activeBus.status === 'DELAYED';
        return true;
      }});

      document.getElementById('routesCountBadge').innerText = MOCK_ROUTES.length;

      if (filtered.length === 0) {{
        container.innerHTML = `
          <div class="bg-white rounded-3xl p-8 text-center border border-slate-200 mt-4">
            <i data-lucide="bus" class="w-10 h-10 text-slate-400 mx-auto mb-2"></i>
            <h4 class="font-black text-slate-800 text-sm">No routes matched</h4>
            <p class="text-slate-500 text-xs mt-1">Try another keyword or filter.</p>
          </div>
        `;
        lucide.createIcons();
        return;
      }}

      container.innerHTML = filtered.map(r => {{
        const isExp = expandedRouteId === r.id;
        const isDelayed = r.activeBus.status === 'DELAYED';
        const color = r.themeColor || r.color || '#2563EB';

        return `
          <div class="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm">
            <div onclick="toggleExpandRoute('${{r.id}}')" class="p-4 cursor-pointer">
              <div class="flex justify-between items-center mb-1.5">
                <div class="flex items-center space-x-2">
                  <span class="px-2.5 py-0.5 rounded-lg text-white text-[11px] font-black uppercase" style="background-color: ${{color}}">
                    ${{r.routeNumber}}
                  </span>
                  <span class="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Morning Pickup</span>
                </div>
                <span class="${{isDelayed ? 'bg-rose-100 text-rose-950 border-rose-400' : 'bg-emerald-100 text-emerald-950 border-emerald-400'}} border text-[10px] font-black px-2 py-0.5 rounded-full">
                  ${{isDelayed ? 'DELAYED' : 'ON TIME'}}
                </span>
              </div>

              <h3 class="text-slate-950 font-black text-base leading-tight">${{r.title}}</h3>
              <div class="flex items-center text-slate-500 text-xs font-semibold mt-1">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 mr-1 text-slate-400"></i>
                <span class="truncate">${{r.origin}} → ${{r.destination}}</span>
              </div>

              <div class="flex justify-between items-center mt-2.5 pt-2 border-t border-slate-100 text-xs">
                <div class="flex items-center space-x-3 text-slate-700 font-bold">
                  <span>${{r.timing || r.departureTime || '08:00 AM'}}</span>
                  <span>•</span>
                  <span>${{r.stops.length}} stops</span>
                </div>
                <span class="text-slate-500 font-bold flex items-center text-xs">
                  ${{isExp ? 'Hide stops' : 'View stops'}}
                  <i data-lucide="${{isExp ? 'chevron-up' : 'chevron-down'}}" class="w-3.5 h-3.5 ml-1"></i>
                </span>
              </div>
            </div>

            ${{isExp ? `
              <div class="px-4 pb-4 pt-2 bg-slate-50 border-t border-slate-200">
                <div class="bg-white p-2.5 rounded-2xl border border-slate-200 mb-3 flex justify-between items-center">
                  <div class="flex items-center">
                    <div class="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mr-2">
                      <i data-lucide="bus" class="w-4 h-4 text-blue-600"></i>
                    </div>
                    <div>
                      <div class="text-slate-950 font-black text-xs">${{r.activeBus.plateNumber}}</div>
                      <div class="text-slate-500 text-[10px]">${{r.activeBus.statusNote || 'On Schedule'}}</div>
                    </div>
                  </div>
                  <button onclick="openCrewModalForRoute('${{r.id}}')" class="bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl">
                    Crew Info
                  </button>
                </div>

                <!-- Vertical Stops Timeline -->
                <h4 class="text-slate-900 text-xs font-black uppercase tracking-wider mb-2">Scheduled Stops Timeline</h4>
                <div class="py-1">
                  ${{r.stops.map((s, sIdx) => {{
                    const isLast = sIdx === r.stops.length - 1;
                    return `
                      <div class="flex">
                        <div class="flex flex-col items-center w-8">
                          <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 ${{
                            s.isPassed ? 'bg-emerald-600 border-emerald-200 text-white' :
                            s.isNext ? 'bg-blue-600 border-white ring-2 ring-blue-300 text-white' :
                            'bg-white border-slate-400 text-slate-700'
                          }}">
                            ${{s.isPassed ? '✓' : sIdx + 1}}
                          </div>
                          ${{!isLast ? `<div class="w-0.5 flex-1 ${{s.isPassed ? 'bg-emerald-500' : 'bg-slate-300'}} my-1"></div>` : ''}}
                        </div>
                        <div class="flex-1 pl-2.5 pb-4">
                          <div class="flex justify-between items-center">
                            <span class="text-xs font-extrabold ${{s.isNext ? 'text-blue-900' : s.isPassed ? 'text-slate-400 line-through' : 'text-slate-900'}}">
                              ${{s.name}} ${{s.isNext ? '<span class="bg-blue-600 text-white text-[9px] px-1 py-0.5 rounded ml-1 font-black uppercase">Next</span>' : ''}}
                            </span>
                            <span class="text-[11px] font-black text-slate-900">${{s.scheduledTime || s.time || ''}}</span>
                          </div>
                          <div class="text-[10px] text-slate-500 mt-0.5">${{s.landmark || 'Boarding Point'}}</div>
                        </div>
                      </div>
                    `;
                  }}).join('')}}
                </div>

                <button onclick="trackThisRouteOnMap('${{r.id}}')" class="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black py-3 rounded-2xl flex items-center justify-center shadow-md transition">
                  <i data-lucide="navigation" class="w-4 h-4 mr-1.5 stroke-[2.5]"></i>
                  Track ${{r.routeNumber}} Live on Map
                </button>
              </div>
            ` : ''}}
          </div>
        `;
      }}).join('');

      lucide.createIcons();
    }}

    window.toggleExpandRoute = function(routeId) {{
      expandedRouteId = expandedRouteId === routeId ? null : routeId;
      renderRoutesDirectory();
    }};

    window.trackThisRouteOnMap = function(routeId) {{
      selectRoute(routeId);
      switchScreen('screen-live');
    }};

    window.openCrewModalForRoute = function(routeId) {{
      selectRoute(routeId);
      openCrewModal();
    }};

    // Open & Close Bottom Sheet Modal (From WhatsApp Video)
    window.openCrewModal = function() {{
      const route = getSelectedRoute();
      const bus = route.activeBus;

      document.getElementById('modalPlateNumber').innerText = bus.plateNumber;
      document.getElementById('modalSpeed').innerText = `${{bus.speed || 36}} km/h`;

      const cap = bus.capacity || 52;
      const occ = bus.occupiedSeats || 38;
      const pct = Math.round((occ / cap) * 100);
      document.getElementById('modalCapacityText').innerText = `${{occ}} / ${{cap}} seats (${{pct}}% full)`;
      document.getElementById('modalCapacityBar').style.width = `${{pct}}%`;
      document.getElementById('modalCapacityBar').className = `h-full rounded-full ${{pct > 85 ? 'bg-rose-500' : 'bg-emerald-500'}}`;

      const statusBadge = document.getElementById('modalStatusBadge');
      if (bus.status === 'DELAYED') {{
        statusBadge.className = 'text-xs font-black px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-950 border border-rose-400';
        statusBadge.innerText = 'DELAYED';
      }} else {{
        statusBadge.className = 'text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-400';
        statusBadge.innerText = 'ON TIME';
      }}

      // Driver
      const driver = bus.driver || {{ name: 'Pawan', phone: '+91 7880131501', badge: 'DRV-101' }};
      document.getElementById('modalDriverPhoto').src = driver.photoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80';
      document.getElementById('modalDriverName').innerText = driver.name;
      document.getElementById('modalDriverBadge').innerText = `Badge: ${{driver.badgeNumber || driver.badge || 'DRV-101'}}`;
      document.getElementById('modalDriverRating').innerText = (driver.rating || 4.9).toFixed(1);
      document.getElementById('modalDriverExp').innerText = `${{driver.experienceYears || 10}} yrs exp`;

      // Conductor
      const conductor = bus.conductor || {{ name: 'Afzal Alam', phone: '+91 9893837199', employeeId: 'CND-301' }};
      document.getElementById('modalConductorPhoto').src = conductor.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80';
      document.getElementById('modalConductorName').innerText = conductor.name;
      document.getElementById('modalConductorId').innerText = `ID: ${{conductor.employeeId || 'CND-301'}}`;
      document.getElementById('modalConductorPhoneText').innerText = `Contact: ${{conductor.phone}}`;
      document.getElementById('modalCallConductorLink').href = `tel:${{conductor.phone}}`;
      document.getElementById('modalCallButtonText').innerText = `Call Conductor (${{conductor.name}})`;

      document.getElementById('crewModal').classList.remove('hidden');
      lucide.createIcons();
    }};

    function closeCrewModal() {{
      document.getElementById('crewModal').classList.add('hidden');
    }}

    // Leaflet Integration for Street Map Mode
    function initLeafletMap() {{
      if (leafletMapInstance) return;
      leafletMapInstance = L.map('leafletMap', {{
        zoomControl: false,
        attributionControl: false
      }}).setView([23.25, 77.4], 13);

      L.tileLayer('https://{{s}}.tile.openstreetmap.org/{{z}}/{{x}}/{{y}}.png', {{
        maxZoom: 19
      }}).addTo(leafletMapInstance);

      syncLeafletMap();
    }}

    function syncLeafletMap() {{
      if (!leafletMapInstance) return;
      const route = getSelectedRoute();
      const bus = route.activeBus;
      const waypoints = route.waypoints;

      // Clear previous layers
      if (leafletPolyline) leafletMapInstance.removeLayer(leafletPolyline);
      leafletStopMarkers.forEach(m => leafletMapInstance.removeLayer(m));
      leafletStopMarkers = [];
      if (leafletBusMarker) leafletMapInstance.removeLayer(leafletBusMarker);

      // LatLngs
      const latlngs = waypoints.map(w => [w.lat, w.lng]);
      leafletPolyline = L.polyline(latlngs, {{
        color: route.themeColor || '#2563EB',
        weight: 6,
        opacity: 0.9
      }}).addTo(leafletMapInstance);

      // Stops markers
      route.stops.forEach((s, idx) => {{
        if (s.lat && s.lng) {{
          const stopIcon = L.divIcon({{
            className: 'custom-stop-icon',
            html: `<div style="background:${{s.isPassed ? '#10B981' : s.isNext ? '#2563EB' : '#1E293B'}}; width:22px; height:22px; border-radius:50%; border:2px solid #FFF; color:#FFF; font-size:10px; font-weight:bold; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 4px rgba(0,0,0,0.3);">${{s.isPassed ? '✓' : idx + 1}}</div>`,
            iconSize: [22, 22],
            iconAnchor: [11, 11]
          }});
          const m = L.marker([s.lat, s.lng], {{ icon: stopIcon }}).addTo(leafletMapInstance);
          leafletStopMarkers.push(m);
        }}
      }});

      // Bus marker
      const currPt = waypoints[bus.currentWpIndex || 0] || waypoints[0];
      const busIcon = L.divIcon({{
        className: 'custom-bus-icon',
        html: `<div style="background:#E11D48; width:34px; height:34px; border-radius:50%; border:3px solid #FFF; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.4);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 10h10"/><circle cx="7" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/></svg></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      }});
      leafletBusMarker = L.marker([currPt.lat, currPt.lng], {{ icon: busIcon }}).addTo(leafletMapInstance);
      leafletBusMarker.on('click', openCrewModal);

      leafletMapInstance.fitBounds(leafletPolyline.getBounds(), {{ padding: [60, 60] }});
    }}

    // Toggle between Clean Vector (From Video) and Street Map
    function toggleMapMode() {{
      const svgMap = document.getElementById('mapSvg');
      const leafletContainer = document.getElementById('leafletMap');
      const label = document.getElementById('mapModeLabel');

      if (currentMapMode === 'vector') {{
        currentMapMode = 'street';
        svgMap.classList.add('hidden');
        leafletContainer.classList.remove('hidden');
        label.innerText = 'VECTOR';
        initLeafletMap();
        syncLeafletMap();
      }} else {{
        currentMapMode = 'vector';
        leafletContainer.classList.add('hidden');
        svgMap.classList.remove('hidden');
        label.innerText = 'STREET';
        renderMap();
      }}
    }}

    // Tab Screen Switcher
    function switchScreen(screenId) {{
      document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'));
      document.getElementById(screenId).classList.remove('hidden');

      // Update Tab bar styles
      document.querySelectorAll('.nav-tab').forEach(tab => {{
        if (tab.dataset.screen === screenId) {{
          tab.className = 'nav-tab active flex flex-col items-center py-1 px-4 rounded-xl text-blue-600';
        }} else {{
          tab.className = 'nav-tab flex flex-col items-center py-1 px-4 rounded-xl text-slate-500';
        }}
      }});

      // Show/hide top route chips bar
      const chipsBar = document.getElementById('routeChipsBar');
      if (screenId === 'screen-live') {{
        chipsBar.classList.remove('hidden');
      }} else {{
        chipsBar.classList.add('hidden');
      }}

      if (screenId === 'screen-routes') {{
        renderRoutesDirectory();
      }}
    }}

    function setupEventListeners() {{
      // Tab Navigation
      document.querySelectorAll('.nav-tab').forEach(tab => {{
        tab.addEventListener('click', () => switchScreen(tab.dataset.screen));
      }});

      // Map Mode Toggle
      document.getElementById('mapModeToggleBtn').addEventListener('click', toggleMapMode);

      // Simulation Controls
      const toggleBtn = document.getElementById('togglePlayBtn');
      toggleBtn.addEventListener('click', () => {{
        isSimulating = !isSimulating;
        const simLed = document.getElementById('simLed');
        const simText = document.getElementById('simStatusText');
        if (isSimulating) {{
          simLed.className = 'w-2.5 h-2.5 rounded-full bg-emerald-400 mr-2';
          simText.innerText = 'SIMULATION ACTIVE';
          toggleBtn.innerHTML = `<i data-lucide="pause" class="w-3.5 h-3.5"></i>`;
        }} else {{
          simLed.className = 'w-2.5 h-2.5 rounded-full bg-amber-400 mr-2';
          simText.innerText = 'SIMULATION PAUSED';
          toggleBtn.innerHTML = `<i data-lucide="play" class="w-3.5 h-3.5"></i>`;
        }}
        lucide.createIcons();
      }});

      // Speed Multiplier
      const speedBtn = document.getElementById('speedMultiplierBtn');
      const speeds = [1, 2, 5];
      speedBtn.addEventListener('click', () => {{
        const nextIdx = (speeds.indexOf(simSpeedMultiplier) + 1) % speeds.length;
        simSpeedMultiplier = speeds[nextIdx];
        document.getElementById('speedMultiplierText').innerText = `${{simSpeedMultiplier}}x`;
        startSimulation();
      }});

      // Reset Simulation
      document.getElementById('resetSimBtn').addEventListener('click', () => {{
        const route = getSelectedRoute();
        route.activeBus.currentWpIndex = 0;
        route.stops.forEach((s, idx) => {{
          s.isPassed = idx === 0;
          s.isNext = idx === 1;
        }});
        updateBusPosition();
        updateNextStopCard();
      }});

      // Bus marker tap
      document.getElementById('busMarkerGroup').addEventListener('click', openCrewModal);
      document.getElementById('openCrewModalBtn').addEventListener('click', openCrewModal);
      document.getElementById('switchToRoutesBtn').addEventListener('click', () => switchScreen('screen-routes'));
      document.getElementById('closeCrewModalBtn').addEventListener('click', closeCrewModal);
      document.getElementById('modalBackdropDismiss').addEventListener('click', closeCrewModal);

      // Search & Filters in Routes Directory
      const searchInput = document.getElementById('routeSearchInput');
      const clearBtn = document.getElementById('clearSearchBtn');
      searchInput.addEventListener('input', (e) => {{
        if (e.target.value.length > 0) {{
          clearBtn.classList.remove('hidden');
        }} else {{
          clearBtn.classList.add('hidden');
        }}
        renderRoutesDirectory();
      }});

      clearBtn.addEventListener('click', () => {{
        searchInput.value = '';
        clearBtn.classList.add('hidden');
        renderRoutesDirectory();
      }});

      document.querySelectorAll('.filter-chip').forEach(btn => {{
        btn.addEventListener('click', () => {{
          document.querySelectorAll('.filter-chip').forEach(b => {{
            b.className = 'filter-chip bg-white text-slate-700 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-300';
          }});
          btn.className = 'filter-chip active bg-slate-900 text-white text-[11px] font-black px-3 py-1 rounded-full border border-slate-900';
          renderRoutesDirectory();
        }});
      }});
    }}

    window.onload = init;
  </script>
</body>
</html>
'''

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

with open('preview.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Generated index.html and preview.html successfully!")
