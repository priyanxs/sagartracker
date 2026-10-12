#!/usr/bin/env python3
"""
SagarTracker — Production Backend Server
Official SISTec Gandhinagar Bus Transit & Live Fleet GPS Tracking API
Schedule: W.E.F 10-08-2026
"""

import os
import json
import time
import math
from datetime import datetime
from flask import Flask, jsonify, request, send_from_directory, Response

app = Flask(__name__, static_folder='.', static_url_path='')

# Load routes dataset
ROUTES_FILE = os.path.join(os.path.dirname(__file__), 'routes.json')
ROUTES_DATA = []

if os.path.exists(ROUTES_FILE):
    with open(ROUTES_FILE, 'r', encoding='utf-8') as f:
        ROUTES_DATA = json.load(f)
else:
    print("Warning: routes.json not found, initializing empty fleet.")

SERVER_START_TIME = time.time()

# ----------------- CORS SUPPORT -----------------
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
    return response

# ----------------- STATIC FRONTEND ROUTES -----------------
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/preview')
def serve_preview():
    return send_from_directory('.', 'preview.html')

@app.route('/assets/<path:path>')
def serve_assets(path):
    return send_from_directory('assets', path)

# ----------------- REST API ENDPOINTS -----------------
@app.route('/api/health', methods=['GET'])
def api_health():
    """System health check and uptime stats."""
    uptime_sec = round(time.time() - SERVER_START_TIME, 2)
    return jsonify({
        "status": "online",
        "service": "SagarTracker Fleet Telematics API",
        "campus": "SISTec Gandhinagar, Bhopal",
        "schedule": "W.E.F 10-08-2026",
        "routesCount": len(ROUTES_DATA),
        "activeBusesCount": len(ROUTES_DATA),
        "uptimeSeconds": uptime_sec,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

@app.route('/api/routes', methods=['GET'])
def api_get_routes():
    """Get all official bus routes with stops and driver info."""
    search_q = request.args.get('search', '').lower().strip()
    tag = request.args.get('tag', 'all').lower().strip()

    filtered = ROUTES_DATA

    # Tag filter
    if tag == 'bhopal':
        filtered = [r for r in filtered if r.get('num') in [1, 2, 4, 10, 11, 12, 14, 15, 18, 24, 26, 27, 37, 44, 50]]
    elif tag == 'sehore':
        filtered = [r for r in filtered if r.get('num') in [21, 33, 34, 38, 39, 41]]
    elif tag == 'bhel':
        filtered = [r for r in filtered if r.get('num') in [1, 8, 30, 31, 48, 51]]
    elif tag == 'vidisha':
        filtered = [r for r in filtered if r.get('num') in [9, 16, 32, 46]]

    # Search filter
    if search_q:
        filtered = [
            r for r in filtered
            if search_q in r.get('title', '').lower()
            or search_q in r.get('routeNumber', '').lower()
            or search_q in r.get('origin', '').lower()
            or search_q in r.get('activeBus', {}).get('plateNumber', '').lower()
            or search_q in r.get('activeBus', {}).get('driver', {}).get('name', '').lower()
            or any(search_q in s.get('name', '').lower() for s in r.get('stops', []))
        ]

    return jsonify({
        "count": len(filtered),
        "totalRoutes": len(ROUTES_DATA),
        "routes": filtered
    })

@app.route('/api/routes/<route_id>', methods=['GET'])
def api_get_route_by_id(route_id):
    """Get single route details by route ID (e.g. 'route-1')."""
    route = next((r for r in ROUTES_DATA if r.get('id') == route_id or str(r.get('num')) == route_id), None)
    if not route:
        return jsonify({"error": "Route not found", "routeId": route_id}), 404
    return jsonify(route)

@app.route('/api/buses', methods=['GET'])
def api_get_buses():
    """Get live status and telemetry for all active fleet buses."""
    buses = []
    for r in ROUTES_DATA:
        bus = r.get('activeBus', {}).copy()
        bus['routeId'] = r.get('id')
        bus['routeNumber'] = r.get('routeNumber')
        bus['routeTitle'] = r.get('title')
        bus['destination'] = r.get('destination')
        bus['themeColor'] = r.get('themeColor')
        
        # Calculate dynamic position along waypoints
        wps = r.get('waypoints', [])
        if wps:
            wp_idx = bus.get('currentWpIndex', 0) % len(wps)
            next_idx = (wp_idx + 1) % len(wps)
            p1 = wps[wp_idx]
            p2 = wps[next_idx]
            t = bus.get('subProgress', 0)
            lat = p1['lat'] + (p2['lat'] - p1['lat']) * t
            lng = p1['lng'] + (p2['lng'] - p1['lng']) * t
            bus['currentCoordinates'] = {"latitude": round(lat, 5), "longitude": round(lng, 5)}
        buses.append(bus)

    return jsonify({
        "count": len(buses),
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "buses": buses
    })

@app.route('/api/buses/<bus_id>', methods=['GET'])
def api_get_bus_by_id(bus_id):
    """Get specific bus telemetry by bus ID or registration plate."""
    for r in ROUTES_DATA:
        bus = r.get('activeBus', {})
        if bus.get('plateNumber') == bus_id or r.get('id') == bus_id or f"bus-{r.get('num')}" == bus_id:
            res = bus.copy()
            res['routeId'] = r.get('id')
            res['routeNumber'] = r.get('routeNumber')
            res['routeTitle'] = r.get('title')
            return jsonify(res)
    return jsonify({"error": "Bus not found", "busId": bus_id}), 404

@app.route('/api/stops', methods=['GET'])
def api_get_stops():
    """Get full list of stops across all routes."""
    stops_dict = {}
    for r in ROUTES_DATA:
        for s in r.get('stops', []):
            name = s.get('name', '').strip()
            if not name:
                continue
            if name not in stops_dict:
                stops_dict[name] = {
                    "name": name,
                    "latitude": s.get('lat'),
                    "longitude": s.get('lng'),
                    "routes": []
                }
            stops_dict[name]["routes"].append({
                "routeId": r.get('id'),
                "routeNumber": r.get('routeNumber'),
                "scheduledTime": s.get('scheduledTime') or s.get('eta')
            })

    stops_list = sorted(list(stops_dict.values()), key=lambda x: x['name'])
    return jsonify({
        "count": len(stops_list),
        "stops": stops_list
    })

@app.route('/api/crew', methods=['GET'])
def api_get_crew():
    """Get directory of all drivers, conductors, and transport supervisors."""
    drivers = []
    for r in ROUTES_DATA:
        bus = r.get('activeBus', {})
        driver = bus.get('driver', {})
        conductor = bus.get('conductor', {})
        drivers.append({
            "routeNumber": r.get('routeNumber'),
            "routeTitle": r.get('title'),
            "plateNumber": bus.get('plateNumber'),
            "driver": driver,
            "conductor": conductor
        })

    supervisors = [
        {
            "role": "Transport Manager",
            "name": "Taranjeet Singh",
            "phone": "+91 7987760314",
            "office": "SISTec Gandhinagar Central Transport Cell"
        },
        {
            "role": "Transport Supervisor",
            "name": "Afzal Alam",
            "phone": "+91 9893837199",
            "office": "SISTec Fleet Operations & Dispatch"
        }
    ]

    return jsonify({
        "supervisors": supervisors,
        "fleetCrew": drivers
    })

@app.route('/api/routes', methods=['POST'])
def api_create_route():
    """Create a new custom route."""
    data = request.get_json(force=True, silent=True) or {}
    title = data.get('title', 'Custom Route')
    plate = data.get('plateNumber', 'MP-04-HE-9999')
    origin = data.get('origin', 'Bhopal City')
    destination = data.get('destination', 'SISTec Gandhinagar Campus')
    stops_input = data.get('stops', [])
    driver_name = data.get('driverName', 'Assigned Driver')
    driver_phone = data.get('driverPhone', '+91 91099 75760')
    capacity = int(data.get('capacity', 52))

    new_num = len(ROUTES_DATA) + 1
    new_id = f"route-{new_num}-{int(time.time())}"

    # Build stop objects
    stops_data = []
    waypoints = []
    sistec_lat, sistec_lng = 23.2985, 77.3510

    for idx, s in enumerate(stops_input):
        ratio = idx / max(1, len(stops_input) - 1)
        lat = 23.2500 + (sistec_lat - 23.2500) * ratio
        lng = 77.4000 + (sistec_lng - 77.4000) * ratio
        s_name = s if isinstance(s, str) else s.get('name', f'Stop {idx+1}')
        stops_data.append({
            "name": s_name,
            "lat": round(lat, 4),
            "lng": round(lng, 4),
            "scheduledTime": f"08:{15 + idx*5:02d} AM",
            "eta": f"{3 + idx*4} mins"
        })
        waypoints.append({"lat": round(lat, 4), "lng": round(lng, 4)})

    # Ensure terminus at SISTec
    stops_data.append({
        "name": "SISTec GN Terminus",
        "lat": sistec_lat,
        "lng": sistec_lng,
        "scheduledTime": "09:15 AM",
        "eta": "Terminus"
    })
    waypoints.append({"lat": sistec_lat, "lng": sistec_lng})

    new_route = {
        "id": new_id,
        "routeNumber": f"Route {new_num}",
        "num": new_num,
        "title": title,
        "origin": origin,
        "destination": destination,
        "themeColor": "#4ECCA3",
        "timing": "Arrives 09:15 AM",
        "ratingScore": "98",
        "activeBus": {
            "plateNumber": plate,
            "capacity": capacity,
            "occupiedSeats": int(capacity * 0.7),
            "speed": 38,
            "heading": 45,
            "currentWpIndex": 0,
            "subProgress": 0.0,
            "driver": {"name": driver_name, "badge": f"DRV-{new_num}", "phone": driver_phone},
            "conductor": {"name": "Taranjeet Singh", "phone": "+91 7987760314"}
        },
        "stops": stops_data,
        "waypoints": waypoints
    }

    ROUTES_DATA.append(new_route)

    # Persist
    try:
        with open(ROUTES_FILE, 'w', encoding='utf-8') as f:
            json.dump(ROUTES_DATA, f, separators=(',', ':'))
    except Exception as e:
        print("Warning: could not persist to routes.json:", e)

    return jsonify({"success": True, "route": new_route}), 201

@app.route('/api/routes/<route_id>', methods=['DELETE'])
def api_delete_route(route_id):
    """Delete a custom route."""
    global ROUTES_DATA
    initial_len = len(ROUTES_DATA)
    ROUTES_DATA = [r for r in ROUTES_DATA if r.get('id') != route_id and str(r.get('num')) != route_id]
    if len(ROUTES_DATA) == initial_len:
        return jsonify({"error": "Route not found", "routeId": route_id}), 404

    try:
        with open(ROUTES_FILE, 'w', encoding='utf-8') as f:
            json.dump(ROUTES_DATA, f, separators=(',', ':'))
    except Exception as e:
        pass

    return jsonify({"success": True, "deletedRouteId": route_id, "remainingCount": len(ROUTES_DATA)})

@app.route('/api/telemetry/stream', methods=['GET'])
def api_telemetry_stream():
    """Server-Sent Events (SSE) stream broadcasting live coordinates at 1Hz."""
    def event_generator():
        while True:
            payload = []
            for r in ROUTES_DATA:
                bus = r.get('activeBus', {})
                wps = r.get('waypoints', [])
                if wps:
                    wp_idx = (bus.get('currentWpIndex', 0) + 1) % len(wps)
                    bus['currentWpIndex'] = wp_idx
                    pt = wps[wp_idx]
                    payload.append({
                        "routeId": r.get('id'),
                        "plateNumber": bus.get('plateNumber'),
                        "latitude": pt['lat'],
                        "longitude": pt['lng'],
                        "speed": bus.get('speed', 38),
                        "heading": bus.get('heading', 45)
                    })
            data_json = json.dumps({"timestamp": time.time(), "buses": payload})
            yield f"data: {data_json}\n\n"
            time.sleep(1.0)

    return Response(event_generator(), mimetype='text/event-stream')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5050))
    print(f"🚀 SagarTracker Backend running on http://127.0.0.1:{port}")
    print(f"📡 API Health: http://127.0.0.1:{port}/api/health")
    print(f"🚌 Bus Routes: http://127.0.0.1:{port}/api/routes")
    app.run(host='0.0.0.0', port=port, debug=False)
