#!/usr/bin/env python3
"""
CampusMove — Development & Preview Server
Smart College Bus Tracking & Transit Intelligence for Universities
"""

import http.server
import socketserver
import os
import sys
import json
import urllib.parse

PORT = int(os.environ.get('PORT', 8080))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

# Load SagarTracker live fleet and route telemetry
SAGAR_DATA_PATH = os.path.join(DIRECTORY, 'sagartracker_live_data.json')
SAGAR_GEOM_PATH = os.path.join(DIRECTORY, 'sagartracker_geometries.json')

sagar_live_data = {"allRoutes": [], "fleetTelematicsData": {}, "latestTelematicsData": {}}
if os.path.exists(SAGAR_DATA_PATH):
    try:
        with open(SAGAR_DATA_PATH, 'r') as f:
            sagar_live_data = json.load(f)
    except Exception as e:
        print("Error loading sagar live data:", e)

sagar_geometries = {}
if os.path.exists(SAGAR_GEOM_PATH):
    try:
        with open(SAGAR_GEOM_PATH, 'r') as f:
            sagar_geometries = json.load(f)
    except Exception as e:
        print("Error loading sagar geometries:", e)

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # SagarTracker Live APIs
        if path == '/api/routes':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"routes": sagar_live_data.get("allRoutes", [])}).encode('utf-8'))
            return

        if path == '/api/bus':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            fleet = sagar_live_data.get("fleetTelematicsData", {})
            default_telem = sagar_live_data.get("latestTelematicsData", {})
            self.wfile.write(json.dumps({"fleet": fleet, "default": default_telem}).encode('utf-8'))
            return

        if path == '/api/bus/stream' or path.startswith('/api/bus/stream'):
            self.send_response(200)
            self.send_header('Content-Type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'keep-alive')
            self.end_headers()
            fleet = sagar_live_data.get("fleetTelematicsData", {})
            try:
                self.wfile.write(f"data: {json.dumps(fleet)}\n\n".encode('utf-8'))
                self.wfile.flush()
            except Exception:
                pass
            return

        if path.startswith('/api/route-geometry/'):
            route_id = path.split('/api/route-geometry/')[1].strip('/')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            geom = sagar_geometries.get(route_id, {})
            self.wfile.write(json.dumps(geom).encode('utf-8'))
            return

        # Route clean paths to index.html or sagartracker.html
        if path in ['/', '/apertu', '/app']:
            self.path = '/index.html'
        elif path in ['/sagartracker', '/sagar', '/transit-live']:
            self.path = '/sagartracker.html'

        return super().do_GET()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"""
========================================================================
🚌 [CAMPUSMOVE TECHNOLOGIES — TRANSIT INTELLIGENCE PLATFORM]
========================================================================
✨  Empowering colleges & students with real-time bus tracking
🌐  Local Web App URL: http://localhost:{PORT}
📂  Serving Directory: {DIRECTORY}
========================================================================
Press Ctrl+C to stop the CampusMove server.
            """)
            httpd.serve_forever()
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"Port {PORT} in use, trying 8080...")
            with socketserver.TCPServer(("", 8080), Handler) as httpd:
                print(f"Serving at http://localhost:8080")
                httpd.serve_forever()
        else:
            raise

if __name__ == '__main__':
    run_server()
