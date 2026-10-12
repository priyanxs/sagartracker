import os
import sys
import math
import subprocess
import time
from PIL import Image, ImageDraw, ImageFont

FFMPEG = './local_lib/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1'
BUILD_DIR = 'video_build'
os.makedirs(f'{BUILD_DIR}/scenes', exist_ok=True)
os.makedirs(f'{BUILD_DIR}/audio', exist_ok=True)

W, H = 1920, 1080
FPS = 24

# Load system font helper
def get_font(size, bold=False):
    font_paths = [
        '/System/Library/Fonts/SFPro-Bold.otf' if bold else '/System/Library/Fonts/SFPro-Regular.otf',
        '/System/Library/Fonts/HelveticaNeue.ttc',
        '/System/Library/Fonts/Supplemental/Arial Bold.ttf' if bold else '/System/Library/Fonts/Supplemental/Arial.ttf'
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

font_title = get_font(60, bold=True)
font_subtitle = get_font(30, bold=True)
font_heading = get_font(38, bold=True)
font_body = get_font(22, bold=False)
font_body_bold = get_font(22, bold=True)
font_badge = get_font(18, bold=True)
font_sub = get_font(24, bold=True)
font_small = get_font(16, bold=False)

# Load Logo
logo_img = None
if os.path.exists('logo.png'):
    logo_img = Image.open('logo.png').convert('RGBA')

# Helper to draw bottom subtitle bar
def draw_subtitle_bar(draw, text, progress=0.0):
    draw.rounded_rectangle([80, H - 130, W - 80, H - 35], radius=16, fill=(5, 12, 26), outline=(212, 175, 55), width=2)
    # Animated sound wave / progress indicator on left
    draw.rounded_rectangle([95, H - 110, 155, H - 55], radius=8, fill=(15, 28, 55))
    for i in range(5):
        h_bar = int(10 + 18 * math.sin(progress * 15 + i * 1.2))
        h_bar = max(6, abs(h_bar))
        draw.rounded_rectangle([105 + i * 10, H - 85 - h_bar//2, 111 + i * 10, H - 85 + h_bar//2], radius=2, fill=(212, 175, 55))
    
    draw.text((175, H - 82), text, font=font_sub, fill=(255, 255, 255), anchor='lm')
    # Progress line at very bottom
    draw.line([(80, H - 37), (80 + int((W - 160) * progress), H - 37)], fill=(212, 175, 55), width=3)

# Helper to get audio duration in seconds
def get_audio_duration(wav_path):
    cmd = [FFMPEG, '-i', wav_path]
    res = subprocess.run(cmd, stderr=subprocess.PIPE, text=True)
    for line in res.stderr.splitlines():
        if 'Duration:' in line:
            parts = line.split('Duration:')[1].split(',')[0].strip().split(':')
            hours, mins, secs = float(parts[0]), float(parts[1]), float(parts[2])
            return hours * 3600 + mins * 60 + secs
    return 10.0

def make_proc(duration, out_mp4, wav_path):
    cmd = [
        FFMPEG, '-y',
        '-f', 'rawvideo', '-vcodec', 'rawvideo',
        '-s', f'{W}x{H}', '-pix_fmt', 'rgb24', '-r', str(FPS),
        '-i', '-',
        '-i', wav_path,
        '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast',
        '-c:a', 'aac', '-b:a', '192k',
        '-t', f'{duration:.3f}',
        out_mp4
    ]
    return subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def write_frame(proc, img):
    try:
        proc.stdin.write(img.tobytes())
        return True
    except (BrokenPipeError, IOError):
        return False

def finish_proc(proc):
    try:
        proc.stdin.close()
    except Exception:
        pass
    proc.wait()

# -------------------------------------------------------------
# SCENE 1: Introduction & Brand Architecture
# -------------------------------------------------------------
def render_scene1(duration, out_mp4, wav_path):
    total_frames = int(duration * FPS)
    sub_text = "Namaste dosto! Swagat hai SagarTracker ke official walkthrough mein — SISTec Bhopal College Transit System."
    proc = make_proc(duration, out_mp4, wav_path)
    logo_base = logo_img.resize((190, 190)) if logo_img else None
    
    for f in range(total_frames):
        prog = f / total_frames
        img = Image.new('RGB', (W, H), (8, 18, 38))
        draw = ImageDraw.Draw(img)
        
        # Grid lines
        for x in range(0, W, 100):
            draw.line([(x, 0), (x, H)], fill=(14, 28, 56), width=1)
        for y in range(0, H, 100):
            draw.line([(0, y), (W, y)], fill=(14, 28, 56), width=1)
            
        # Top banner
        draw.rectangle([0, 0, W, 70], fill=(6, 14, 30))
        draw.text((60, 22), 'SAGAR INSTITUTE OF SCIENCE AND TECHNOLOGY (SISTEC), BHOPAL', font=font_body_bold, fill=(212, 175, 55))
        draw.text((W - 380, 22), 'OFFICIAL FLEET COMMAND CENTER', font=font_badge, fill=(148, 163, 184))
        
        # Center Logo with pulsing golden rings
        pulse = 10 + 8 * math.sin(f * 0.15)
        draw.ellipse([W//2 - 110 - pulse, 150 - pulse, W//2 + 110 + pulse, 370 + pulse], outline=(212, 175, 55), width=2)
        draw.ellipse([W//2 - 100 - pulse*0.5, 160 - pulse*0.5, W//2 + 100 + pulse*0.5, 360 + pulse*0.5], outline=(56, 189, 248), width=1)
        if logo_base:
            img.paste(logo_base, (W//2 - 95, 165), logo_base)
            
        # Titles
        draw.text((W//2, 430), 'SAGARTRACKER', font=font_title, fill=(212, 175, 55), anchor='mm')
        draw.text((W//2, 500), 'Comprehensive College Bus Transit & Fleet Tracking System', font=font_subtitle, fill=(241, 245, 249), anchor='mm')
        draw.text((W//2, 550), 'विद्या ददाति विनयम्   •   Knowledge Imparts Humility', font=font_body_bold, fill=(180, 195, 215), anchor='mm')
        
        # 4 Feature Badges
        badges = [
            ('30 Official Routes', (16, 34, 72)),
            ('18,691 Road Coordinates', (20, 45, 90)),
            ('W.E.F 10.08.2026 Timetable', (16, 34, 72)),
            ('ESRI Satellite HD View', (20, 45, 90))
        ]
        start_x = 240
        for idx, (b_txt, b_bg) in enumerate(badges):
            bx = start_x + idx * 370
            draw.rounded_rectangle([bx, 620, bx + 340, 680], radius=14, fill=b_bg, outline=(212, 175, 55), width=2)
            draw.text((bx + 170, 650), b_txt, font=font_badge, fill=(255, 255, 255), anchor='mm')
            
        # Additional live metrics card
        draw.rounded_rectangle([400, 720, W - 400, 830], radius=14, fill=(12, 24, 48), outline=(51, 65, 85), width=1)
        draw.text((W//2, 755), '● LIVE FLEET TELEMETRY ENGINE CONNECTED', font=font_badge, fill=(16, 185, 129), anchor='mm')
        draw.text((W//2, 795), 'Bhopal Transit Coverage: Gandhinagar Campus Terminus (09:15 AM)', font=font_body, fill=(203, 213, 225), anchor='mm')
        
        draw_subtitle_bar(draw, sub_text, prog)
        if not write_frame(proc, img):
            break
            
    finish_proc(proc)
    print('Scene 1 finished.')

# -------------------------------------------------------------
# SCENE 2: Official 30-Route Schedule & Bhopal Coverage
# -------------------------------------------------------------
def render_scene2(duration, out_mp4, wav_path):
    total_frames = int(duration * FPS)
    sub_text = "Official bus schedule W.E.F 10 August 2026 — 30 routes aur 255 unique Bhopal stops integrated hain."
    proc = make_proc(duration, out_mp4, wav_path)
    
    routes_sample = [
        ("Route 1", "Bairagarh / Lalghati Square", "MP-04-HE-2140", "08:15 AM", "09:15 AM"),
        ("Route 5", "MP Nagar / Board Office / 7 No.", "MP-04-HE-2144", "08:05 AM", "09:15 AM"),
        ("Route 12", "Ayodhya Bypass / Karond Mandi", "MP-04-HE-2151", "08:10 AM", "09:15 AM"),
        ("Route 18", "Kolar Road / Sarvdharm / Nayapura", "MP-04-HE-2157", "08:00 AM", "09:15 AM"),
        ("Route 24", "BHEL / Indrapuri / Piplani", "MP-04-HE-2163", "08:10 AM", "09:15 AM"),
        ("Route 30", "Mandideep / Hoshangabad Road", "MP-04-HE-2169", "07:50 AM", "09:15 AM"),
    ]
    
    for f in range(total_frames):
        prog = f / total_frames
        img = Image.new('RGB', (W, H), (10, 16, 32))
        draw = ImageDraw.Draw(img)
        
        # Header
        draw.rectangle([0, 0, W, 70], fill=(6, 14, 30))
        draw.text((60, 22), 'OFFICIAL SCHEDULE: SISTEC GN BUS ROUTE W.E.F 10.08.2026', font=font_body_bold, fill=(212, 175, 55))
        draw.text((W - 350, 22), '30 ROUTES • 255 UNIQUE STOPS', font=font_badge, fill=(56, 189, 248))
        
        # Left Panel: Official PDF Document Showcase Card
        draw.rounded_rectangle([80, 100, 700, 880], radius=18, fill=(16, 26, 50), outline=(212, 175, 55), width=2)
        draw.text((120, 140), 'SISTEC TRANSPORT POLICY', font=font_badge, fill=(212, 175, 55))
        draw.text((120, 175), 'Official Route Master PDF', font=font_heading, fill=(255, 255, 255))
        draw.text((120, 225), 'Extracted from official SISTec administrative schedule', font=font_body, fill=(156, 163, 175))
        
        # Document Stats
        doc_stats = [
            ('Document Source', 'SISTEC GN BUS ROUTE W.E.F 10.08.2026.pdf'),
            ('Effective Date', '10 August 2026 Onwards'),
            ('Total Bus Lines', '30 Distinct Transit Routes'),
            ('Unique Boarding Stops', '255 Bhopal Arterial Stops'),
            ('Terminus Location', 'SISTec Gandhinagar Campus'),
            ('Terminus Arrival', '09:15 AM (All Routes)'),
            ('Transport Supervisor', 'Afzal Alam (9893837199)'),
            ('Supervisor Phone', 'Taranjeet Singh (7987760314)')
        ]
        sy = 280
        for label, val in doc_stats:
            draw.text((120, sy), label, font=font_body_bold, fill=(148, 163, 184))
            draw.text((400, sy), val, font=font_body, fill=(241, 245, 249))
            draw.line([(120, sy + 32), (660, sy + 32)], fill=(30, 45, 75), width=1)
            sy += 48
            
        # Official Stamp badge
        draw.rounded_rectangle([120, 730, 660, 830], radius=12, fill=(20, 35, 70), outline=(16, 185, 129), width=2)
        draw.text((150, 755), '✓ 100% PARSED & SYNCHRONIZED', font=font_badge, fill=(16, 185, 129))
        draw.text((150, 785), 'Live database & route directory updated with zero missing stops', font=font_small, fill=(203, 213, 225))
        
        # Right Panel: Active Routes List (Simulated scroll)
        draw.rounded_rectangle([740, 100, W - 80, 880], radius=18, fill=(14, 22, 42), outline=(51, 65, 85), width=2)
        draw.text((780, 135), 'BHOPAL ARTERIAL TRANSIT LINES DIRECTORY', font=font_heading, fill=(255, 255, 255))
        draw.text((780, 180), 'Searchable route timetable with stop timelines & arrival countdowns', font=font_body, fill=(156, 163, 175))
        
        ry = 230
        for r_name, r_coverage, r_plate, r_start, r_end in routes_sample:
            draw.rounded_rectangle([780, ry, W - 120, ry + 90], radius=12, fill=(20, 32, 60), outline=(40, 60, 100), width=1)
            # Route badge
            draw.rounded_rectangle([800, ry + 15, 920, ry + 55], radius=6, fill=(212, 175, 55))
            draw.text((860, ry + 35), r_name, font=font_badge, fill=(10, 16, 32), anchor='mm')
            
            # Coverage & plate
            draw.text((945, ry + 22), r_coverage, font=font_body_bold, fill=(255, 255, 255))
            draw.text((945, ry + 54), f'Bus Plate: {r_plate}  •  First Stop: {r_start}', font=font_small, fill=(156, 163, 175))
            
            # Terminus Pill
            draw.rounded_rectangle([W - 320, ry + 25, W - 140, ry + 65], radius=20, fill=(16, 185, 129))
            draw.text((W - 230, ry + 45), f'Terminus: {r_end}', font=font_badge, fill=(255, 255, 255), anchor='mm')
            ry += 105
            
        draw_subtitle_bar(draw, sub_text, prog)
        if not write_frame(proc, img):
            break
            
    finish_proc(proc)
    print('Scene 2 finished.')

# -------------------------------------------------------------
# SCENE 3: Real Road Navigation & Satellite HD View
# -------------------------------------------------------------
def render_scene3(duration, out_mp4, wav_path):
    total_frames = int(duration * FPS)
    sub_text = "Bhopal ke actual roads aur highways par real OSRM coordinates ko follow karta hai, saath mein ESRI Satellite HD view."
    proc = make_proc(duration, out_mp4, wav_path)
    
    base_points = [
        (150, 750), (280, 700), (420, 620), (560, 580), (700, 550),
        (850, 510), (1000, 440), (1150, 380), (1300, 340), (1450, 280),
        (1600, 240), (1750, 200)
    ]
    
    stops = [
        (280, 700, "Halalpura Stand", "08:15 AM"),
        (560, 580, "Lalghati Square", "08:28 AM"),
        (1000, 440, "VIP Road Flyover", "08:42 AM"),
        (1450, 280, "Airport T-Point", "08:58 AM"),
        (1750, 200, "SISTec Terminus", "09:15 AM")
    ]
    
    for f in range(total_frames):
        prog = f / total_frames
        img = Image.new('RGB', (W, H), (12, 18, 28))
        draw = ImageDraw.Draw(img)
        
        # Satellite grid
        for x in range(0, W, 120):
            draw.line([(x, 0), (x, H)], fill=(20, 30, 45), width=1)
        for y in range(0, H, 120):
            draw.line([(0, y), (W, y)], fill=(20, 30, 45), width=1)
            
        # Top banner
        draw.rectangle([0, 0, W, 70], fill=(6, 14, 30))
        draw.text((60, 22), 'LIVE NAVIGATION: ESRI WORLD IMAGERY HD • 18,691 ROAD WAYPOINTS', font=font_body_bold, fill=(212, 175, 55))
        draw.text((W - 380, 22), 'OSRM ROAD-FOLLOWING PRECISION', font=font_badge, fill=(56, 189, 248))
        
        # Draw Highway Curve
        for i in range(len(base_points) - 1):
            draw.line([base_points[i], base_points[i+1]], fill=(14, 165, 233), width=14)
            draw.line([base_points[i], base_points[i+1]], fill=(56, 189, 248), width=6)
            draw.line([base_points[i], base_points[i+1]], fill=(255, 255, 255), width=2)
            
        # Stop Pins
        for sx, sy, sname, stime in stops:
            draw.ellipse([sx - 12, sy - 12, sx + 12, sy + 12], fill=(212, 175, 55), outline=(255, 255, 255), width=2)
            draw.rounded_rectangle([sx - 80, sy - 55, sx + 80, sy - 20], radius=8, fill=(15, 25, 45), outline=(212, 175, 55), width=1)
            draw.text((sx, sy - 45), sname, font=font_small, fill=(255, 255, 255), anchor='mm')
            draw.text((sx, sy - 30), stime, font=get_font(12, bold=True), fill=(212, 175, 55), anchor='mm')
            
        # Moving bus
        bus_idx_float = (prog * (len(base_points) - 1))
        b_i = int(bus_idx_float)
        b_rem = bus_idx_float - b_i
        if b_i < len(base_points) - 1:
            bx = base_points[b_i][0] + (base_points[b_i+1][0] - base_points[b_i][0]) * b_rem
            by = base_points[b_i][1] + (base_points[b_i+1][1] - base_points[b_i][1]) * b_rem
        else:
            bx, by = base_points[-1]
            
        p_r = 15 + (f % 24) * 2.5
        draw.ellipse([bx - p_r, by - p_r, bx + p_r, by + p_r], outline=(239, 68, 68), width=2)
        draw.ellipse([bx - 26, by - 26, bx + 26, by + 26], fill=(239, 68, 68), outline=(255, 255, 255), width=3)
        draw.text((bx, by), '🚌', font=get_font(22), anchor='mm')
        
        # Floating HUD Switcher on Top Right
        draw.rounded_rectangle([W - 420, 100, W - 80, 310], radius=14, fill=(15, 23, 42), outline=(51, 65, 85), width=2)
        draw.text((W - 400, 120), 'MAP LAYER CONTROLS', font=font_badge, fill=(148, 163, 184))
        layers = [
            ('●  🛰️ ESRI Satellite HD (Active)', (212, 175, 55)),
            ('○  🌙 Dark Matter Canvas', (203, 213, 225)),
            ('○  ☀️ Daylight Minimal', (203, 213, 225)),
            ('○  🗺️ OpenStreetMap Standard', (203, 213, 225))
        ]
        ly = 160
        for lyr_text, lyr_color in layers:
            draw.text((W - 400, ly), lyr_text, font=font_body, fill=lyr_color)
            ly += 35
            
        # Floating Next Stop Card on Top Left
        draw.rounded_rectangle([80, 100, 600, 290], radius=16, fill=(11, 27, 61), outline=(212, 175, 55), width=2)
        draw.text((110, 125), 'NEXT APPROACHING STOP', font=font_badge, fill=(212, 175, 55))
        draw.text((110, 160), 'VIP Road Overbridge / Lalghati', font=font_heading, fill=(255, 255, 255))
        draw.text((110, 210), 'ETA: 4 Mins  •  Distance: 1.8 km  •  Speed: 42 km/h', font=font_body, fill=(203, 213, 225))
        draw.rounded_rectangle([110, 245, 270, 275], radius=6, fill=(16, 185, 129))
        draw.text((190, 260), 'ON TIME (08:32 AM)', font=font_small, fill=(255, 255, 255), anchor='mm')
        
        draw_subtitle_bar(draw, sub_text, prog)
        if not write_frame(proc, img):
            break
            
    finish_proc(proc)
    print('Scene 3 finished.')

# -------------------------------------------------------------
# SCENE 4: Dark & Light Theme Modes
# -------------------------------------------------------------
def render_scene4(duration, out_mp4, wav_path):
    total_frames = int(duration * FPS)
    sub_text = "Evening travel ke liye SISTec Navy Dark Mode, aur direct sunlight outdoor viewing ke liye High-Contrast Daylight Mode."
    proc = make_proc(duration, out_mp4, wav_path)
    
    for f in range(total_frames):
        prog = f / total_frames
        img = Image.new('RGB', (W, H))
        draw = ImageDraw.Draw(img)
        
        # Split screen
        draw.rectangle([0, 0, W//2, H], fill=(11, 27, 61))
        draw.rectangle([W//2, 0, W, H], fill=(248, 250, 252))
        
        beam_pulse = int(5 * math.sin(f * 0.2))
        draw.line([(W//2, 0), (W//2, H)], fill=(212, 175, 55), width=6 + abs(beam_pulse))
        
        # Left Side: Dark Mode
        draw.text((80, 60), '🌙 DARK THEME (NOCTURNAL COCKPIT)', font=font_heading, fill=(212, 175, 55))
        draw.text((80, 110), 'Official SISTec Navy (#0B1B3D) & Royal Gold palette', font=font_body, fill=(203, 213, 225))
        draw.text((80, 140), 'Optimized for evening transit, low light & OLED battery conservation', font=font_small, fill=(148, 163, 184))
        
        draw.rounded_rectangle([80, 180, W//2 - 60, 840], radius=16, fill=(15, 23, 42), outline=(30, 41, 59), width=2)
        draw.text((120, 220), 'Fleet Telematics (Dark Canvas)', font=font_subtitle, fill=(255, 255, 255))
        draw.rounded_rectangle([120, 270, W//2 - 100, 420], radius=12, fill=(30, 41, 59))
        draw.text((150, 305), 'Bus: MP-04-HE-2140 • Speed: 42 km/h', font=font_body_bold, fill=(56, 189, 248))
        draw.text((150, 345), 'Heading: N-NE 45° • Route 1 Bairagarh Express', font=font_body, fill=(203, 213, 225))
        draw.text((150, 385), 'GPS Status: 12 Satellites Locked (High Precision)', font=font_small, fill=(16, 185, 129))
        
        # Right Side: Light Mode
        draw.text((W//2 + 60, 60), '☀️ LIGHT THEME (HIGH-CONTRAST DAYLIGHT)', font=font_heading, fill=(11, 27, 61))
        draw.text((W//2 + 60, 110), 'Engineered for direct sun exposure & outdoor bus stop viewing', font=font_body, fill=(51, 65, 85))
        draw.text((W//2 + 60, 140), 'Maximum contrast typography readable even under intense sunlight', font=font_small, fill=(100, 116, 139))
        
        draw.rounded_rectangle([W//2 + 60, 180, W - 80, 840], radius=16, fill=(255, 255, 255), outline=(226, 232, 240), width=2)
        draw.text((W//2 + 100, 220), 'Fleet Telematics (Daylight Canvas)', font=font_subtitle, fill=(15, 23, 42))
        draw.rounded_rectangle([W//2 + 100, 270, W - 120, 420], radius=12, fill=(241, 245, 249))
        draw.text((W//2 + 130, 305), 'Bus: MP-04-HE-2140 • Speed: 42 km/h', font=font_body_bold, fill=(2, 132, 199))
        draw.text((W//2 + 130, 345), 'Heading: N-NE 45° • Route 1 Bairagarh Express', font=font_body, fill=(71, 85, 105))
        draw.text((W//2 + 130, 385), 'GPS Status: 12 Satellites Locked (High Precision)', font=font_small, fill=(5, 150, 105))
        
        draw_subtitle_bar(draw, sub_text, prog)
        if not write_frame(proc, img):
            break
            
    finish_proc(proc)
    print('Scene 4 finished.')

# -------------------------------------------------------------
# SCENE 5: Telemetry, Next Stop & Crew Safety Desk
# -------------------------------------------------------------
def render_scene5(duration, out_mp4, wav_path):
    total_frames = int(duration * FPS)
    sub_text = "Live speed, next stop ETA countdown, Near Me stop finder aur 1-tap conductor call button."
    proc = make_proc(duration, out_mp4, wav_path)
    
    for f in range(total_frames):
        prog = f / total_frames
        img = Image.new('RGB', (W, H), (10, 18, 36))
        draw = ImageDraw.Draw(img)
        
        # Header
        draw.rectangle([0, 0, W, 70], fill=(6, 14, 30))
        draw.text((60, 22), 'TELEMATICS & SAFETY DESK: REAL-TIME PASSENGER FEATURES', font=font_body_bold, fill=(212, 175, 55))
        draw.text((W - 380, 22), '24/7 FLEET ASSISTANCE ACTIVE', font=font_badge, fill=(16, 185, 129))
        
        # Panel 1: Live Speedometer
        draw.rounded_rectangle([80, 100, 930, 480], radius=16, fill=(16, 26, 52), outline=(51, 65, 85), width=2)
        draw.text((115, 130), 'SPEED & MOTION SENSORS', font=font_badge, fill=(56, 189, 248))
        draw.text((115, 165), 'Real-Time Telemetry Cockpit', font=font_heading, fill=(255, 255, 255))
        
        speed_val = int(38 + 5 * math.sin(f * 0.1))
        draw.text((115, 240), f'{speed_val}', font=get_font(72, bold=True), fill=(16, 185, 129))
        draw.text((225, 275), 'KM/H', font=font_subtitle, fill=(148, 163, 184))
        draw.text((115, 340), '• GPS Heading: 45° N-NE (Airport Road)', font=font_body, fill=(203, 213, 225))
        draw.text((115, 380), '• Signal Accuracy: ±2.4 meters (12 Sats)', font=font_body, fill=(203, 213, 225))
        draw.text((115, 420), '• Congestion Status: Smooth Traffic Flow', font=font_body, fill=(16, 185, 129))
        
        # Panel 2: Next Approaching Stop & Countdown
        draw.rounded_rectangle([970, 100, W - 80, 480], radius=16, fill=(16, 26, 52), outline=(212, 175, 55), width=2)
        draw.text((1005, 130), 'NEXT APPROACHING STOP', font=font_badge, fill=(212, 175, 55))
        draw.text((1005, 165), 'Lalghati Square / VIP Road', font=font_heading, fill=(255, 255, 255))
        
        countdown_secs = max(0, int(240 - prog * 20))
        mins, secs = countdown_secs // 60, countdown_secs % 60
        draw.text((1005, 240), f'0{mins}:{secs:02d}', font=get_font(72, bold=True), fill=(212, 175, 55))
        draw.text((1220, 275), 'ETA COUNTDOWN', font=font_subtitle, fill=(148, 163, 184))
        draw.text((1005, 340), '• Distance Remaining: 1.4 km', font=font_body, fill=(203, 213, 225))
        draw.text((1005, 380), '• Boarding Capacity: 52 Seats (38 Occupied)', font=font_body, fill=(203, 213, 225))
        draw.text((1005, 420), '• Arrival Scheduled: 08:32 AM (ON TIME)', font=font_body, fill=(16, 185, 129))
        
        # Panel 3: Near Me Geolocation
        draw.rounded_rectangle([80, 510, 930, 880], radius=16, fill=(16, 26, 52), outline=(51, 65, 85), width=2)
        draw.text((115, 540), 'HTML5 GEOLOCATION API', font=font_badge, fill=(56, 189, 248))
        draw.text((115, 575), 'Automatic "Near Me" Stop Finder', font=font_heading, fill=(255, 255, 255))
        draw.text((115, 625), 'Sensor locates student GPS & finds nearest SISTec pickup point:', font=font_body, fill=(156, 163, 175))
        
        draw.rounded_rectangle([115, 665, 895, 785], radius=12, fill=(24, 38, 72))
        draw.text((140, 690), '📍 Closest Boarding Stop: Halalpura Bus Stand', font=font_body_bold, fill=(255, 255, 255))
        draw.text((140, 725), 'Walking Distance: 320 meters (approx 4 min walk)', font=font_body, fill=(203, 213, 225))
        draw.text((140, 755), 'Approaching Fleet: Bus 1 (8 min away), Bus 4 (14 min away)', font=font_small, fill=(212, 175, 55))
        
        # Panel 4: Crew & Safety Desk
        draw.rounded_rectangle([970, 510, W - 80, 880], radius=16, fill=(16, 26, 52), outline=(16, 185, 129), width=2)
        draw.text((1005, 540), 'DRIVER & CONDUCTOR VERIFICATION', font=font_badge, fill=(16, 185, 129))
        draw.text((1005, 575), 'Crew Roster & SOS Safety Desk', font=font_heading, fill=(255, 255, 255))
        draw.text((1005, 630), 'Driver: Rajesh Sharma  •  ★★★★★ 4.9 Rating (12 Yrs Exp)', font=font_body_bold, fill=(255, 255, 255))
        draw.text((1005, 665), 'Conductor: Mukesh Kumar', font=font_body, fill=(203, 213, 225))
        
        draw.rounded_rectangle([1005, 705, 1280, 760], radius=10, fill=(16, 185, 129))
        draw.text((1142, 732), '📞 CALL CONDUCTOR', font=font_badge, fill=(255, 255, 255), anchor='mm')
        
        draw.rounded_rectangle([1310, 705, W - 115, 760], radius=10, fill=(220, 38, 38))
        draw.text((1445, 732), '🚨 TRANSPORT SOS', font=font_badge, fill=(255, 255, 255), anchor='mm')
        draw.text((1005, 785), 'Transport Head: Afzal Alam (9893837199) • Taranjeet Singh (7987760314)', font=font_small, fill=(148, 163, 184))
        
        draw_subtitle_bar(draw, sub_text, prog)
        if not write_frame(proc, img):
            break
            
    finish_proc(proc)
    print('Scene 5 finished.')

# -------------------------------------------------------------
# SCENE 6: Live Website & 100/100 Passed Tests
# -------------------------------------------------------------
def render_scene6(duration, out_mp4, wav_path):
    total_frames = int(duration * FPS)
    sub_text = "Pura project live hai priyanxs.github.io/sagartracker par — 100/100 test runs verified with zero bugs. Shukriya!"
    proc = make_proc(duration, out_mp4, wav_path)
    
    for f in range(total_frames):
        prog = f / total_frames
        img = Image.new('RGB', (W, H), (8, 16, 34))
        draw = ImageDraw.Draw(img)
        
        # Header
        draw.rectangle([0, 0, W, 70], fill=(6, 14, 30))
        draw.text((60, 22), 'DEPLOYMENT STATUS: PRODUCTION READY & LIVE ON GITHUB PAGES', font=font_body_bold, fill=(212, 175, 55))
        draw.text((W - 350, 22), 'HTTP 200 OK • HTTPS ENFORCED', font=font_badge, fill=(16, 185, 129))
        
        # Browser Frame
        draw.rounded_rectangle([150, 110, W - 150, 600], radius=16, fill=(15, 23, 42), outline=(212, 175, 55), width=2)
        draw.rounded_rectangle([150, 110, W - 150, 170], radius=16, fill=(30, 41, 59))
        draw.ellipse([175, 135, 191, 151], fill=(239, 68, 68))
        draw.ellipse([200, 135, 216, 151], fill=(234, 179, 8))
        draw.ellipse([225, 135, 241, 151], fill=(34, 197, 94))
        
        draw.rounded_rectangle([270, 125, W - 400, 160], radius=10, fill=(15, 23, 42))
        draw.text((290, 142), '🔒 https://priyanxs.github.io/sagartracker/', font=font_body_bold, fill=(16, 185, 129), anchor='lm')
        
        draw.rounded_rectangle([W - 370, 125, W - 180, 160], radius=10, fill=(16, 185, 129))
        draw.text((W - 275, 142), '● LIVE NOW', font=font_badge, fill=(255, 255, 255), anchor='mm')
        
        draw.text((W//2, 230), 'SAGARTRACKER WEB COMMAND CENTER', font=font_heading, fill=(255, 255, 255), anchor='mm')
        draw.text((W//2, 280), 'Interactive Leaflet GIS + ESRI Satellite HD + 30 Official Routes Live', font=font_subtitle, fill=(212, 175, 55), anchor='mm')
        
        p_badges = [
            ('🌐 GitHub Pages Live', 'priyanxs.github.io/sagartracker', (16, 185, 129)),
            ('📁 GitHub Repository', 'github.com/priyanxs/sagartracker', (56, 189, 248)),
            ('⚙️ Python Flask Backend', 'server.py (REST API + SSE Stream)', (212, 175, 55))
        ]
        bx = 200
        for title_b, sub_b, col in p_badges:
            draw.rounded_rectangle([bx, 340, bx + 470, 440], radius=12, fill=(20, 32, 60), outline=col, width=2)
            draw.text((bx + 30, 370), title_b, font=font_body_bold, fill=(255, 255, 255))
            draw.text((bx + 30, 410), sub_b, font=font_small, fill=(203, 213, 225))
            bx += 510
            
        # Automated Test Card
        draw.rounded_rectangle([150, 630, W - 150, 850], radius=16, fill=(12, 34, 28), outline=(16, 185, 129), width=2)
        draw.text((200, 675), '✅ 100/100 AUTOMATED TEST ITERATIONS PASSED (100% SUCCESS RATE)', font=font_heading, fill=(16, 185, 129))
        draw.text((200, 725), 'Comprehensive test_suite.py execution: 0 bugs found across HTML tags, JS compilation, 30 routes, and road bounds.', font=font_body, fill=(220, 252, 231))
        draw.text((200, 770), 'Sagar Institute of Science and Technology (SISTec), Bhopal  •  विद्या ददाति विनयम्', font=font_body_bold, fill=(212, 175, 55))
        
        draw_subtitle_bar(draw, sub_text, prog)
        if not write_frame(proc, img):
            break
            
    finish_proc(proc)
    print('Scene 6 finished.')

# -------------------------------------------------------------
# MAIN COMPOSITOR
# -------------------------------------------------------------
def main():
    print('Starting video generation pipeline...')
    t_start = time.time()
    
    scenes_meta = [
        ('scene1', render_scene1),
        ('scene2', render_scene2),
        ('scene3', render_scene3),
        ('scene4', render_scene4),
        ('scene5', render_scene5),
        ('scene6', render_scene6)
    ]
    
    mp4_files = []
    for sc_id, sc_render in scenes_meta:
        wav_path = f'{BUILD_DIR}/audio/{sc_id}.wav'
        out_mp4 = f'{BUILD_DIR}/scenes/{sc_id}.mp4'
        dur = get_audio_duration(wav_path)
        print(f'Rendering {sc_id} (Duration: {dur:.2f}s)...')
        sc_render(dur, out_mp4, wav_path)
        mp4_files.append(out_mp4)
        
    concat_list_path = f'{BUILD_DIR}/concat_list.txt'
    with open(concat_list_path, 'w') as f:
        for p in mp4_files:
            f.write(f"file '{os.path.abspath(p)}'\n")
            
    final_output = 'SagarTracker_Demo.mp4'
    print('Concatenating all scenes into final video...')
    concat_cmd = [
        FFMPEG, '-y',
        '-f', 'concat', '-safe', '0',
        '-i', concat_list_path,
        '-c', 'copy',
        final_output
    ]
    subprocess.run(concat_cmd, check=True)
    
    t_end = time.time()
    sz_mb = os.path.getsize(final_output) / (1024 * 1024)
    print(f'Done! Generated {final_output} ({sz_mb:.2f} MB) in {t_end - t_start:.2f}s!')

if __name__ == '__main__':
    main()
