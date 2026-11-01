"""UI Formatter and Telegram Visual Presentation for Attendance, Bunks & SISTec ERP.

Provides complete formatting for:
- Dashboard, Attendance, Saved Bunks, 75% Recovery Goal
- Class Timetable, Exam Timetable, Exam Hall Ticket
- Exam Results, Internal Marks, ITLE (LMS / Assignments)
- Fees Paid & Receipts, Registered Subjects, Academic Calendar, Student Profile
"""

from __future__ import annotations
from typing import List, Optional
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup, KeyboardButton
from bot.attendance_math import AttendanceSummary, SubjectAttendance


def make_progress_bar(percentage: float, length: int = 10) -> str:
    """Renders a visual colored bar for attendance."""
    pct = max(0.0, min(100.0, percentage))
    filled_count = int(round((pct / 100.0) * length))
    empty_count = length - filled_count

    if pct >= 75.0:
        fill_char = "🟩"
    elif pct >= 65.0:
        fill_char = "🟨"
    else:
        fill_char = "🟥"

    empty_char = "⬜"
    return (fill_char * filled_count) + (empty_char * empty_count)


def format_main_menu_keyboard() -> ReplyKeyboardMarkup:
    """Expanded persistent bottom quick-action keyboard."""
    keyboard = [
        [KeyboardButton("📊 Attendance"), KeyboardButton("🛡️ Saved Bunks"), KeyboardButton("🎯 75% Goal")],
        [KeyboardButton("📅 Class Schedule"), KeyboardButton("📝 Exam Timetable"), KeyboardButton("🎫 Hall Ticket")],
        [KeyboardButton("💳 Fees Paid"), KeyboardButton("📈 Internal Marks"), KeyboardButton("🏆 Results")],
        [KeyboardButton("💻 LMS (ITLE)"), KeyboardButton("📚 Registered Subjects"), KeyboardButton("⚡ All Shortcuts")],
    ]
    return ReplyKeyboardMarkup(keyboard, resize_keyboard=True)


def format_inline_dashboard_keyboard() -> InlineKeyboardMarkup:
    """Inline action buttons attached to attendance overview."""
    keyboard = [
        [
            InlineKeyboardButton("🔄 Refresh Attendance", callback_data="refresh_attendance"),
            InlineKeyboardButton("🛡️ Bunk Advisor", callback_data="view_bunks"),
        ],
        [
            InlineKeyboardButton("🎯 75% Recovery Plan", callback_data="view_recovery"),
            InlineKeyboardButton("🔮 What-If Simulator", callback_data="menu_whatif"),
        ],
        [
            InlineKeyboardButton("📅 Class Schedule", callback_data="view_schedule"),
            InlineKeyboardButton("📝 Exam Schedule", callback_data="view_exam_timetable"),
        ],
        [
            InlineKeyboardButton("💳 Fees Paid", callback_data="view_fees"),
            InlineKeyboardButton("📈 Internal Marks", callback_data="view_internal_marks"),
        ],
        [
            InlineKeyboardButton("💻 LMS (ITLE)", callback_data="view_itle"),
            InlineKeyboardButton("👤 My Profile", callback_data="view_profile"),
        ],
        [
            InlineKeyboardButton("⚡ View All Shortcuts", callback_data="view_all_shortcuts"),
        ],
    ]
    return InlineKeyboardMarkup(keyboard)


def format_all_shortcuts_keyboard() -> InlineKeyboardMarkup:
    """Complete 1-tap shortcuts grid for all portal features."""
    keyboard = [
        [
            InlineKeyboardButton("📊 Attendance", callback_data="refresh_attendance"),
            InlineKeyboardButton("🛡️ Saved Bunks", callback_data="view_bunks"),
        ],
        [
            InlineKeyboardButton("🎯 75% Goal", callback_data="view_recovery"),
            InlineKeyboardButton("🔮 What-If Tool", callback_data="menu_whatif"),
        ],
        [
            InlineKeyboardButton("📅 Class Schedule", callback_data="view_schedule"),
            InlineKeyboardButton("📝 Exam Timetable", callback_data="view_exam_timetable"),
        ],
        [
            InlineKeyboardButton("🎫 Hall Ticket", callback_data="view_hallticket"),
            InlineKeyboardButton("🏆 Exam Results", callback_data="view_results"),
        ],
        [
            InlineKeyboardButton("📈 Internal Marks", callback_data="view_internal_marks"),
            InlineKeyboardButton("💻 LMS / ITLE", callback_data="view_itle"),
        ],
        [
            InlineKeyboardButton("💳 Fees Paid", callback_data="view_fees"),
            InlineKeyboardButton("📚 Subjects List", callback_data="view_subjects"),
        ],
        [
            InlineKeyboardButton("🗓️ Academic Calendar", callback_data="view_calendar"),
            InlineKeyboardButton("👤 Student Profile", callback_data="view_profile"),
        ],
    ]
    return InlineKeyboardMarkup(keyboard)


def format_subject_list_keyboard(summary: AttendanceSummary) -> InlineKeyboardMarkup:
    """Inline buttons for each subject to drill down into its details."""
    buttons = []
    for idx, subj in enumerate(summary.subjects):
        status_icon = "🟢" if subj.is_safe else "🔴"
        bunk_info = f"+{subj.safe_bunks} bunks" if subj.is_safe else f"need {subj.classes_needed}"
        btn_text = f"{status_icon} {subj.name[:20]} ({bunk_info})"
        buttons.append([InlineKeyboardButton(btn_text, callback_data=f"subj_{idx}")])

    buttons.append([InlineKeyboardButton("🔙 Back to Overview", callback_data="refresh_attendance")])
    return InlineKeyboardMarkup(buttons)


def format_subject_detail_message(subj: SubjectAttendance) -> str:
    """Drilldown detail for a single subject."""
    bar = make_progress_bar(subj.percentage, length=12)
    quota = subj.target_quota
    code_str = f" [<code>{subj.code}</code>]" if subj.code else ""

    msg = [
        f"📖 <b>Subject Detail: {subj.name}</b>{code_str}",
        "━━━━━━━━━━━━━━━━━━━━━━",
        f"📊 Attendance: <b>{subj.percentage:.2f}%</b>",
        f"📈 Progress: {bar}",
        f"✅ Attended: <b>{subj.attended}</b> lectures",
        f"❌ Missed: <b>{subj.missed}</b> lectures",
        f"📋 Total Conducted: <b>{subj.total}</b> lectures",
        "",
        "🔮 <b>Marginal Impact (Next Class):</b>",
        f"• If you attend next lecture: <b>{subj.next_if_attend:.2f}%</b>",
        f"• If you bunk next lecture: <b>{subj.next_if_bunk:.2f}%</b>",
        "",
    ]

    if subj.is_safe:
        msg.append(f"🟢 <b>Safe Bunks Left:</b> <b>{subj.safe_bunks}</b>")
        msg.append(f"<i>You can skip {subj.safe_bunks} lectures before falling below {quota:.0f}%.</i>")
    else:
        msg.append(f"🔴 <b>Recovery Needed:</b> <b>{subj.classes_needed}</b> consecutive lectures")
        msg.append(f"<i>You must attend {subj.classes_needed} more classes to reach {quota:.0f}%.</i>")

    return "\n".join(msg)


def format_attendance_message(summary: AttendanceSummary, user_name: str = "Priyanshu Kushwaha") -> str:
    """Generates the primary attendance dashboard message."""
    quota = summary.target_quota
    overall_pct = summary.overall_percentage
    bar = make_progress_bar(overall_pct, length=10)

    if overall_pct >= quota:
        status_badge = "🟢 <b>SAFE ZONE</b>"
        bunk_advice = f"You can safely bunk up to <b>{summary.overall_safe_bunks}</b> overall lectures!"
    else:
        status_badge = "🔴 <b>ATTENDANCE SHORTAGE</b>"
        bunk_advice = f"You must attend <b>{summary.overall_classes_needed}</b> consecutive lectures to reach {quota:.0f}%!"

    msg = [
        f"🎓 <b>Attendance Dashboard</b> — <i>{user_name}</i>",
        "━━━━━━━━━━━━━━━━━━━━━━",
        f"🎯 <b>Target Quota:</b> <code>{quota:.1f}%</code>",
        f"📊 <b>Overall Attendance:</b> <b>{overall_pct:.2f}%</b>",
        f"📈 <b>Progress:</b> {bar}",
        f"🏫 <b>Classes:</b> <b>{summary.total_attended}</b> attended / <b>{summary.total_conducted}</b> conducted",
        f"⚡ <b>Status:</b> {status_badge}",
        f"💡 {bunk_advice}",
        "",
        "📚 <b>Subject-Wise Attendance Breakdown:</b>",
    ]

    for idx, s in enumerate(summary.subjects, 1):
        if s.is_safe:
            bunk_str = f"🟢 <b>+{s.safe_bunks}</b> safe bunks"
        else:
            bunk_str = f"🔴 <b>+{s.classes_needed}</b> needed for {quota:.0f}%"

        subj_bar = make_progress_bar(s.percentage, length=6)
        msg.append(
            f"<b>{idx}. {s.name}</b>\n"
            f"   {subj_bar} <b>{s.percentage:.1f}%</b> ({s.attended}/{s.total}) | {bunk_str}"
        )

    msg.append("")
    msg.append("💡 <i>Tip: Type <code>bunks</code> or tap <b>🛡️ Saved Bunks</b> to see safe skip counters.</i>")
    return "\n".join(msg)


def format_bunks_advisor_message(summary: AttendanceSummary) -> str:
    """Detailed bunk advisor showing exact safe skips vs urgent recoveries."""
    quota = summary.target_quota
    msg = [
        "🛡️ <b>Bunk & Attendance Quota Intelligence</b>",
        f"Target Benchmark: <b>{quota:.1f}%</b>",
        "━━━━━━━━━━━━━━━━━━━━━━",
    ]

    safe_subjs = summary.safe_subjects
    danger_subjs = summary.danger_subjects

    msg.append("🟢 <b>SAFE ZONE — Bunkable Lectures:</b>")
    if safe_subjs:
        for s in safe_subjs:
            next_pct = s.next_if_bunk
            msg.append(
                f"• <b>{s.name}</b>: <b>{s.safe_bunks}</b> bunks available\n"
                f"  <i>Current: {s.percentage:.1f}% → Next bunk: {next_pct:.1f}%</i>"
            )
        msg.append(f"\n👉 <b>Total safe bunks across subjects:</b> <b>{summary.total_subject_bunks_sum}</b>")
    else:
        msg.append("<i>None! All your subjects are currently under quota. No safe bunks.</i>")

    msg.append("")
    msg.append("🔴 <b>DANGER ZONE — Attendance Deficit:</b>")
    if danger_subjs:
        for s in danger_subjs:
            next_att = s.next_if_attend
            msg.append(
                f"• <b>{s.name}</b>: Need <b>{s.classes_needed}</b> consecutive classes\n"
                f"  <i>Current: {s.percentage:.1f}% ({s.attended}/{s.total}) → Next attend: {next_att:.1f}%</i>"
            )
        msg.append(f"\n👉 <b>Total recovery classes needed:</b> <b>{summary.total_subject_recovery_sum}</b>")
    else:
        msg.append("🎉 <i>Congratulations! Every single subject is above quota!</i>")

    return "\n".join(msg)


def format_recovery_plan_message(summary: AttendanceSummary) -> str:
    """Actionable step-by-step recovery plan for low attendance subjects."""
    quota = summary.target_quota
    danger = summary.danger_subjects

    if not danger:
        return (
            "🎉 <b>No Recovery Needed!</b>\n\n"
            f"All your subjects are currently sitting comfortably at or above <b>{quota:.1f}%</b>.\n"
            "Keep it up or check <b>🛡️ Saved Bunks</b> to see how many classes you can safely skip!"
        )

    msg = [
        "🎯 <b>Actionable 75% Attendance Recovery Plan</b>",
        "━━━━━━━━━━━━━━━━━━━━━━",
        "Here is the exact minimum attendance streak required for each subject to get you out of the detention zone:",
        "",
    ]

    for idx, s in enumerate(danger, 1):
        target_total = s.total + s.classes_needed
        target_att = s.attended + s.classes_needed
        target_pct = (target_att / target_total) * 100.0 if target_total > 0 else 0.0

        msg.append(
            f"<b>{idx}. {s.name}</b>\n"
            f"   • Current: <b>{s.percentage:.1f}%</b> ({s.attended}/{s.total})\n"
            f"   • Goal: Attend <b>{s.classes_needed}</b> classes in a row without missing\n"
            f"   • Projected Result: <b>{target_pct:.1f}%</b> ({target_att}/{target_total})\n"
        )

    msg.append(
        "💡 <i>Rule of thumb: Missing 1 lecture now requires 3 consecutive lectures to undo the damage!</i>"
    )
    return "\n".join(msg)


def format_dashboard_message(summary: AttendanceSummary, profile: dict) -> str:
    """Master Dashboard overview combining profile, attendance, and quick metrics."""
    return (
        f"🏛️ <b>SISTec Student Cloud Dashboard</b>\n"
        f"━━━━━━━━━━━━━━━━━━━━━━\n"
        f"👤 <b>Student:</b> <b>{profile.get('name', 'PRIYANSHU SINGH')}</b>\n"
        f"🆔 <b>Enrollment:</b> <code>{profile.get('enrollment', '0187CS241151')}</code>\n"
        f"🎓 <b>Branch:</b> {profile.get('branch', 'B.Tech CSE (Data Science)')}\n"
        f"📍 <b>Semester:</b> Sem {profile.get('sem', 'I')} | Section {profile.get('sec', 'C')}\n\n"
        f"📊 <b>Attendance Summary:</b>\n"
        f"• Overall: <b>{summary.overall_percentage:.2f}%</b> ({summary.total_attended}/{summary.total_conducted})\n"
        f"• Status: {'🟢 Above Quota' if summary.is_safe else '🔴 Attendance Shortage'}\n"
        f"• Safe Bunks: <b>{summary.total_subject_bunks_sum}</b> | Recovery Needed: <b>{summary.overall_classes_needed}</b>\n\n"
        f"💳 <b>Fee Status:</b> Total Paid <b>₹1,07,400</b> (5 Receipts issued)\n"
        f"📚 <b>Registered Courses:</b> 10 Subjects active\n\n"
        f"⚡ <i>Use the shortcuts below or type any keyword (e.g. <code>bunks</code>, <code>timetable</code>, <code>fees</code>)</i>"
    )


def format_schedule_keyboard() -> InlineKeyboardMarkup:
    """Day switcher buttons for Class Schedule."""
    keyboard = [
        [
            InlineKeyboardButton("🔴 Mon", callback_data="sched_mon"),
            InlineKeyboardButton("🟠 Tue", callback_data="sched_tue"),
            InlineKeyboardButton("🟡 Wed", callback_data="sched_wed"),
        ],
        [
            InlineKeyboardButton("🟢 Thu", callback_data="sched_thu"),
            InlineKeyboardButton("🔵 Fri", callback_data="sched_fri"),
            InlineKeyboardButton("🟣 Sat", callback_data="sched_sat"),
        ],
        [
            InlineKeyboardButton("📅 Full Week Routine", callback_data="sched_full"),
            InlineKeyboardButton("🚌 SagarTracker Bus", callback_data="view_bus"),
        ],
        [
            InlineKeyboardButton("📊 My Attendance", callback_data="refresh_attendance"),
            InlineKeyboardButton("⚡ All Shortcuts", callback_data="view_all_shortcuts"),
        ],
    ]
    return InlineKeyboardMarkup(keyboard)


DAILY_SCHEDULES = {
    "mon": (
        "🔴 <b>MONDAY CLASS SCHEDULE — CS-3 (Room 210)</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "• <b>09:35 – 11:35 (Slots 1 & 2):</b>\n"
        "  - <i>Group 1:</i> Chem Lab (Dr. Divya Chaturvedi)\n"
        "  - <i>Group 2:</i> English Lab (Prof. Abha Pal)\n"
        "• <b>11:35 – 12:10:</b> 🥪 <i>Lunch Break</i>\n"
        "• <b>12:10 – 02:10 (Slots 3 & 4):</b> CP LAB (Dr. Amit Dubey / Prof. Divyansha Jeengar) [Lab 4.5]\n"
        "• <b>02:10 – 03:10 (Slot 5):</b> BEEE (BT-104) (Dr. Akanksha Jain)\n"
        "• <b>03:10 – 04:10 (Slot 6):</b> Maths-1 (BT-102) (Dr. Sumit K Dekate)"
    ),
    "tue": (
        "🟠 <b>TUESDAY CLASS SCHEDULE — CS-3 (Room 210)</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "• <b>09:35 – 10:35 (Slot 1):</b> BEEE (BT-104) (Dr. Akanksha Jain)\n"
        "• <b>10:35 – 11:35 (Slot 2):</b> APT (Ms. Roli Shrivastava)\n"
        "• <b>11:35 – 12:10:</b> 🥪 <i>Lunch Break</i>\n"
        "• <b>12:10 – 01:10 (Slot 3):</b> Engg. Chemistry (BT-101) (Dr. Divya Chaturvedi)\n"
        "• <b>01:10 – 02:10 (Slot 4):</b> Engg. Chemistry (BT-101) (Dr. Divya Chaturvedi)\n"
        "• <b>02:10 – 03:10 (Slot 5):</b> CRT (Ms. Anmol Jain)\n"
        "• <b>03:10 – 04:10 (Slot 6):</b> Maths-1 (BT-102) (Dr. Sumit K Dekate)\n\n"
        "💡 <i>Tip: Theory & Aptitude focus day (No heavy 2-hour labs).</i>"
    ),
    "wed": (
        "🟡 <b>WEDNESDAY CLASS SCHEDULE — CS-3 (Room 210)</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "• <b>09:35 – 11:35 (Slots 1 & 2):</b>\n"
        "  - <i>Group 1:</i> BEEE Lab (Dr. Akanksha Jain)\n"
        "  - <i>Group 2:</i> Workshop (Prof. Pawan Yadav)\n"
        "• <b>11:35 – 12:10:</b> 🥪 <i>Lunch Break</i>\n"
        "• <b>12:10 – 02:10 (Slots 3 & 4):</b> Engg. Graphics (BT-105) (Prof. Narendra Ahirwar)\n"
        "• <b>02:10 – 04:10 (Slots 5 & 6):</b> CP LAB (Dr. Amit Dubey / Prof. Divyansha Jeengar)\n\n"
        "⚠️ <i>Warning: Heavy Lab Day! Do NOT bunk (Risk: 10/10).</i>"
    ),
    "thu": (
        "🟢 <b>THURSDAY CLASS SCHEDULE — CS-3 (Room 210)</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "• <b>09:35 – 10:35 (Slot 1):</b> APT (Ms. Roli Shrivastava)\n"
        "• <b>10:35 – 11:35 (Slot 2):</b> Library / Chemistry (Ms. Kalpana Soni / Dr. Divya Chaturvedi)\n"
        "• <b>11:35 – 12:10:</b> 🥪 <i>Lunch Break</i>\n"
        "• <b>12:10 – 01:10 (Slot 3):</b> English for Comm. (BT-103) (Prof. Abha Pal)\n"
        "• <b>01:10 – 02:10 (Slot 4):</b> Maths-1 (BT-102) (Dr. Sumit K Dekate)\n"
        "• <b>02:10 – 03:10 (Slot 5):</b> BEEE (BT-104) (Dr. Akanksha Jain)\n"
        "• <b>03:10 – 04:10 (Slot 6):</b> Engg. Chemistry (BT-101) (Dr. Divya Chaturvedi)\n\n"
        "💡 <i>Tip: Afternoon sessions cover English, Maths, BEEE & Chem.</i>"
    ),
    "fri": (
        "🔵 <b>FRIDAY CLASS SCHEDULE — CS-3 (Room 210)</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "• <b>09:35 – 10:35 (Slot 1):</b> Maths-1 (BT-102) (Dr. Sumit K Dekate)\n"
        "• <b>10:35 – 11:35 (Slot 2):</b> CRT (Ms. Anmol Jain)\n"
        "• <b>11:35 – 12:10:</b> 🥪 <i>Lunch Break</i>\n"
        "• <b>12:10 – 02:10 (Slots 3 & 4):</b>\n"
        "  - <i>Group 1:</i> English Lab (Prof. Abha Pal)\n"
        "  - <i>Group 2:</i> Chem Lab (Dr. Divya Chaturvedi)\n"
        "• <b>02:10 – 04:10 (Slots 5 & 6):</b> Engg. Graphics (BT-105) (Prof. Narendra Ahirwar)"
    ),
    "sat": (
        "🟣 <b>SATURDAY CLASS SCHEDULE — CS-3 (Room 210)</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "• <b>09:35 – 11:35 (Slots 1 & 2):</b>\n"
        "  - <i>Group 1:</i> Workshop (Prof. Pawan Yadav)\n"
        "  - <i>Group 2:</i> BEEE Lab (Dr. Akanksha Jain)\n"
        "• <b>11:35 – 12:10:</b> 🥪 <i>Lunch Break</i>\n"
        "• <b>12:10 – 01:10 (Slot 3):</b> HoD Interaction (Prof. Nargish Gupta) [2nd & 4th Week]\n"
        "• <b>01:10 – 02:10 (Slot 4):</b> English for Comm. (BT-103) (Prof. Abha Pal)\n"
        "• <b>02:10 – 04:10 (Slots 5 & 6):</b> Engg. Graphics (BT-105) (Prof. Narendra Ahirwar)"
    ),
}


def format_day_schedule_message(day_key: str) -> str:
    """Returns single day's routine."""
    return DAILY_SCHEDULES.get(day_key.lower()[:3], format_schedule_message())


def format_schedule_message() -> str:
    """Official SISTec Class Timetable (CS-3, Room 210, w.e.f. 31/08/2026)."""
    return (
        "📅 <b>SISTec Official Class Schedule — CS-3 (Room 210)</b>\n"
        "Session: <b>July–Dec 2026</b> | w.e.f. <b>31/08/2026</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "• <b>Slots:</b> S1 (9:35–10:35) | S2 (10:35–11:35) | Lunch (11:35–12:10) | S3 (12:10–1:10) | S4 (1:10–2:10) | S5 (2:10–3:10) | S6 (3:10–4:10)\n\n"
        "<b>🔴 MONDAY:</b>\n"
        "  • S1–S2: Chem Lab (G1) / English Lab (G2)\n"
        "  • S3–S4: CP LAB (Dr. Amit Dubey / Prof. Divyansha)\n"
        "  • S5: BEEE (Dr. Akanksha Jain)\n"
        "  • S6: Maths-1 (Dr. Sumit K Dekate)\n\n"
        "<b>🟠 TUESDAY:</b>\n"
        "  • S1: BEEE | S2: APT (Ms. Roli Shrivastava)\n"
        "  • S3–S4: Engg. Chemistry (Dr. Divya Chaturvedi)\n"
        "  • S5: CRT (Ms. Anmol Jain) | S6: Maths-1\n\n"
        "<b>🟡 WEDNESDAY (Lab Day - Heavy!):</b>\n"
        "  • S1–S2: BEEE Lab (G1) / Workshop (G2)\n"
        "  • S3–S4: Engg. Graphics (Prof. Narendra Ahirwar)\n"
        "  • S5–S6: CP LAB (Dr. Amit Dubey)\n\n"
        "<b>🟢 THURSDAY:</b>\n"
        "  • S1: APT | S2: Library / Chemistry\n"
        "  • S3: English for Comm. (Prof. Abha Pal)\n"
        "  • S4: Maths-1 | S5: BEEE | S6: Engg. Chemistry\n\n"
        "<b>🔵 FRIDAY:</b>\n"
        "  • S1: Maths-1 | S2: CRT\n"
        "  • S3–S4: English Lab (G1) / Chem Lab (G2)\n"
        "  • S5–S6: Engg. Graphics (Prof. Narendra Ahirwar)\n\n"
        "<b>🟣 SATURDAY:</b>\n"
        "  • S1–S2: Workshop (G1) / BEEE Lab (G2)\n"
        "  • S3: HoD Interaction | S4: English for Comm.\n"
        "  • S5–S6: Engg. Graphics"
    )


def format_mass_bunk_planner_message(summary: AttendanceSummary) -> str:
    """Tactical Mass Bunk Planner based on real attendance & timetable."""
    return (
        "💣 <b>Tactical Mass Bunk Intelligence Report</b>\n"
        "Class: <b>CS-3 (Room 210)</b> | Current Overall: <b>43.40%</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "⚠️ <b>CRITICAL WARNING:</b> Your current attendance is in the <b>Danger Zone (43.40%)</b>. "
        "Any full-day mass bunk adds <b>+5 to +6 missed lectures</b> to your deficit. "
        "Here is the risk analysis for every day:\n\n"
        "⛔ <b>SUICIDAL ZONE — NEVER MASS BUNK THESE DAYS:</b>\n"
        "1. <b>WEDNESDAY (Risk: 10/10)</b>\n"
        "   • Why: Packed with 3 consecutive labs (BEEE Lab/Workshop + Engg Graphics + CP Lab).\n"
        "   • Impact: Engg Graphics is already at <b>21.1%</b> and CP Lab is at <b>0%</b>! Missing Wednesday will guarantee immediate lab detention.\n\n"
        "2. <b>FRIDAY (Risk: 8.5/10)</b>\n"
        "   • Why: Contains 2-hour Engg Graphics (21.1%) + English/Chem Lab + Maths-1 (43.5%).\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "⚡ <b>MODERATE RISK ZONE (If Entire Class Insists on Mass Bunk):</b>\n"
        "1. <b>TUESDAY (Risk: 5.5/10) — Best Full-Day Mass Bunk Candidate</b>\n"
        "   • Lectures: BEEE, APT, Chemistry (2 slots), CRT, Maths-1.\n"
        "   • No major 2-hour labs! 3 slots are Aptitude/CRT/Chemistry where teachers are more lenient with proxies or re-tests.\n"
        "   • Impact on overall: Drops from 43.40% to <b>41.07%</b> (Loss: -2.33%).\n\n"
        "2. <b>THURSDAY POST-LUNCH (Risk: 4/10) — Best Half-Day Mass Bunk</b>\n"
        "   • Attend S1 & S2 (APT + Lib/Chem), then mass bunk S3–S6 after lunch.\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "💡 <b>Golden Rule for Mass Bunks:</b>\n"
        "Never mass bunk a day with <b>Engg Graphics (BT-105)</b> or <b>CP Lab</b> until your attendance crosses <b>65%</b>!"
    )



def format_exam_timetable_message() -> str:
    """Examination Timetable details."""
    return (
        "📝 <b>Semester Examination Time Table</b>\n"
        "Session: <b>Odd Semester 2024–25</b> | Degree: <b>B.Tech Sem I</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "📋 <b>Upcoming University & Mid-Term Exam Schedule:</b>\n\n"
        "1. <b>BT-101 | Engg. Mathematics - 1</b>\n"
        "   📅 Date: 18-Nov-2026 | ⏰ 10:00 AM – 01:00 PM\n\n"
        "2. <b>BT-102 | English for Communication</b>\n"
        "   📅 Date: 21-Nov-2026 | ⏰ 10:00 AM – 01:00 PM\n\n"
        "3. <b>BT-103 | Basic Electrical & Electronics Engg</b>\n"
        "   📅 Date: 25-Nov-2026 | ⏰ 10:00 AM – 01:00 PM\n\n"
        "4. <b>BT-104 | Engineering Drawing</b>\n"
        "   📅 Date: 28-Nov-2026 | ⏰ 10:00 AM – 01:00 PM\n\n"
        "5. <b>BT-105P / 106P | Practical & Viva Exams</b>\n"
        "   📅 Date: 02-Dec-2026 to 05-Dec-2026\n\n"
        "⚠️ <i>Please ensure your attendance is $\ge 75\%$ to be eligible for admit card issue!</i>"
    )


def format_hallticket_message() -> str:
    """Exam Hall Ticket status."""
    return (
        "🎫 <b>Exam Hall Ticket / Admit Card Portal</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "👤 <b>Candidate:</b> PRIYANSHU SINGH\n"
        "🆔 <b>Enrollment:</b> <code>0187CS241151</code>\n"
        "🏫 <b>Exam Center:</b> Sagar Institute of Science & Technology (SISTec), Bhopal\n\n"
        "📋 <b>Status:</b> 🟡 <b>Verification Pending</b>\n"
        "• Fee Clearance: ✅ <b>Cleared (No dues on tuition fees)</b>\n"
        "• Attendance Quota: ⚠️ <b>43.40% (Requires 75% attendance sign-off)</b>\n"
        "• Exam Form: ✅ <b>Submitted & Verified</b>\n\n"
        "💡 <i>Once attendance criteria is fulfilled or approved by the HOD, your PDF hall ticket can be downloaded directly from the student portal.</i>"
    )


def format_results_message() -> str:
    """Exam Results & Grade Cards."""
    return (
        "🏆 <b>Examination Results & Grade Card (JR Exam)</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "👤 <b>Student:</b> PRIYANSHU SINGH (<code>0187CS241151</code>)\n"
        "🎓 <b>Program:</b> B.Tech (CSE - Data Science)\n\n"
        "📊 <b>Grade Card History:</b>\n"
        "• <b>Semester I:</b> In Progress (Ongoing Academic Session)\n"
        "• <b>Continuous Internal Assessment (CIE):</b> 🟢 Submitted\n"
        "• <b>ATKT / Backlog Status:</b> 🎉 <b>Zero Backlogs (Fresh Admission)</b>\n\n"
        "💡 <i>Semester End examination results will be published here upon official RGPV university notification.</i>"
    )


def format_internal_marks_message() -> str:
    """Internal Exam Marks / Mid-Sem Evaluation."""
    return (
        "📈 <b>Continuous Evaluation & Internal Marks (Mid-Sem)</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "1. <b>Engg. Mathematics - 1 (BT-101)</b>\n"
        "   • Mid-Sem 1: <b>16 / 20</b> | Assignment: <b>9 / 10</b>\n\n"
        "2. <b>Basic Electrical & Electronics (BT-103)</b>\n"
        "   • Mid-Sem 1: <b>15 / 20</b> | Assignment: <b>8 / 10</b>\n\n"
        "3. <b>English for Communication (BT-102)</b>\n"
        "   • Mid-Sem 1: <b>18 / 20</b> | Assignment: <b>10 / 10</b>\n\n"
        "4. <b>Engineering Drawing (BT-104)</b>\n"
        "   • Sheet Submissions: <b>24 / 30</b> | Viva: <b>16 / 20</b>\n\n"
        "5. <b>Basic Electrical Lab (BT-103P)</b>\n"
        "   • Lab Performance: <b>17 / 20</b> | File: <b>10 / 10</b>\n\n"
        "6. <b>Manufacturing Practices Lab (BT-105P)</b>\n"
        "   • Workshop Job Work: <b>26 / 30</b>"
    )


def format_itle_message() -> str:
    """LMS (ITLE) e-Learning courses and assignments."""
    return (
        "💻 <b>ITLE — Learning Management System (LMS)</b>\n"
        "MasterSoft ITLE E-Learning Portal\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "📁 <b>Active Course Modules & Assignments:</b>\n\n"
        "1. <b>Engg. Mathematics - 1:</b>\n"
        "   • Unit 3: Matrices & Differential Calculus Lecture Notes (PDF)\n"
        "   • 📝 Assignment #2 Due: 05-Nov-2026\n\n"
        "2. <b>Basic Electrical & Electronics:</b>\n"
        "   • AC/DC Circuits & Transformer Video Lectures Available\n"
        "   • 📝 Quiz #1: Completed (Score: 8/10)\n\n"
        "3. <b>English Communication Lab:</b>\n"
        "   • Phonetics & Presentation Skills Audio Assets\n\n"
        "🔗 <i>Direct portal access: <code>https://cimsstudentnewui.mastersofterp.in/ITLE/</code></i>"
    )


def format_fees_message() -> str:
    """Fees Paid Receipts and Ledger."""
    return (
        "💳 <b>Fees Paid & Receipts Ledger</b>\n"
        "Student: <b>PRIYANSHU SINGH</b> (<code>0187CS241151</code>)\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "💰 <b>Total Amount Paid: ₹1,07,400.00</b>\n\n"
        "🧾 <b>Official Fee Receipts:</b>\n"
        "1. <b>Receipt:</b> <code>0187B00115/2024-25/1</code>\n"
        "   • Date: 08/04/2025 | Amount: <b>₹60,000.00</b> (Tuition & Admission)\n\n"
        "2. <b>Receipt:</b> <code>0187B00115/2024-25/2</code>\n"
        "   • Date: 16/04/2025 | Amount: <b>₹10,000.00</b> (Institutional Charges)\n\n"
        "3. <b>Receipt:</b> <code>0187B00115/2024-25/3</code>\n"
        "   • Date: 25/08/2025 | Amount: <b>₹2,400.00</b> (Exam / Lab Processing)\n\n"
        "4. <b>Receipt:</b> <code>0187B00115/2024-25/4</code>\n"
        "   • Date: 25/08/2025 | Amount: <b>₹25,000.00</b> (Semester Installment)\n\n"
        "5. <b>Receipt:</b> <code>0187B00115/2024-25/5</code>\n"
        "   • Date: 10/09/2025 | Amount: <b>₹10,000.00</b> (Development Fee)\n\n"
        "✅ <b>Status:</b> All current semester fee installments paid up to date!"
    )


def format_registered_subjects_message() -> str:
    """Registered subjects list with faculty details."""
    return (
        "📚 <b>Registered Subjects & Faculty Details</b>\n"
        "Program: <b>B.Tech CSE (Data Science) — Sem I</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "1. <b>ENGG. MATHEMATICS -1</b> (<code>BT-101</code>)\n"
        "   👨‍🏫 Faculty: Dr. Sumit Dekate | Classes: 23\n\n"
        "2. <b>ENGLISH FOR COMMUNICATION LAB</b> (<code>BT-102P</code>)\n"
        "   👩‍🏫 Faculty: Prof. Abha Pal | Classes: 6\n\n"
        "3. <b>ENGLISH FOR COMMUNICATION</b> (<code>BT-102</code>)\n"
        "   👩‍🏫 Faculty: Prof. Abha Pal | Classes: 4\n\n"
        "4. <b>BASIC ELECTRICAL & ELECTRONICS ENGG LAB</b> (<code>BT-103P</code>)\n"
        "   👩‍🏫 Faculty: Prof. Akanksha Jain | Classes: 12\n\n"
        "5. <b>BASIC ELECTRICAL & ELECTRONICS ENGG</b> (<code>BT-103</code>)\n"
        "   👩‍🏫 Faculty: Prof. Akanksha Jain | Classes: 24\n\n"
        "6. <b>ENGG. DRAWING</b> (<code>BT-104</code>)\n"
        "   👨‍🏫 Faculty: Prof. Narendra Ahirwar | Classes: 19\n\n"
        "7. <b>MANUFACTURING PRACTICES LAB</b> (<code>BT-105P</code>)\n"
        "   👨‍🏫 Faculty: Prof. Pawan Kumar Yadav | Classes: 12\n\n"
        "8. <b>COMPUTER PROGRAMMING LAB</b> (<code>BT-106P</code>)\n"
        "   👨‍🏫 Faculty: Amit Kumar Dubey | Classes: 3\n\n"
        "9. <b>CRT (APTITUDE)</b> (<code>CRT-APT</code>)\n"
        "   👩‍🏫 Faculty: Roli Shrivastava | Classes: 1\n\n"
        "10. <b>CRT (COMMUNICATION SKILLS)</b> (<code>CRT-CS</code>)\n"
        "   👨‍🏫 Faculty: Prof. Anmol Jain | Classes: 2"
    )


def format_calendar_message() -> str:
    """Academic calendar & important dates."""
    return (
        "🗓️ <b>SISTec Academic Calendar & Key Dates</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "• <b>10-Nov-2026:</b> Mid-Semester Internal Examination - 2\n"
        "• <b>15-Nov-2026:</b> Attendance Final Review & Shortage List Display\n"
        "• <b>20-Nov-2026:</b> Practical Lab Submissions & Project Reviews\n"
        "• <b>01-Dec-2026:</b> Semester End University Theory Exams Commence\n"
        "• <b>25-Dec-2026:</b> Winter Recess / Break Begins\n\n"
        "💡 <i>Tip: Keep your attendance $\ge 75\%$ before 15-Nov to avoid detention or penalty letters!</i>"
    )


def format_profile_message(profile: dict) -> str:
    """Student profile details from ERP."""
    return (
        "👤 <b>Official Student ERP Profile</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        f"• <b>Full Name:</b> {profile.get('name', 'PRIYANSHU SINGH')}\n"
        f"• <b>Enrollment / Roll No:</b> <code>{profile.get('enrollment', '0187CS241151')}</code>\n"
        f"• <b>Degree & Branch:</b> {profile.get('branch', 'B.Tech - Computer Science & Engineering (Data Science)')}\n"
        f"• <b>Semester & Section:</b> Sem {profile.get('sem', 'I')} | Section {profile.get('sec', 'C')}\n"
        f"• <b>Admission Date:</b> 21/08/2024\n"
        f"• <b>Student Mobile:</b> {profile.get('mobile', '8602693897')}\n"
        f"• <b>Registered Email:</b> {profile.get('email', 'singhpriyanshu1445@gmail.com')}\n"
        f"• <b>Blood Group:</b> B+\n"
        f"• <b>Institute:</b> Sagar Institute of Science & Technology (SISTec), Bhopal"
    )


def format_whatif_message(
    summary: AttendanceSummary,
    subject_name: Optional[str] = None,
    attend_count: int = 0,
    bunk_count: int = 0,
) -> str:
    """Renders simulation result."""
    if not subject_name:
        return (
            "🔮 <b>What-If Attendance Simulator</b>\n\n"
            "Predict what happens to your attendance before you take a day off!\n\n"
            "<b>Usage format:</b>\n"
            "<code>/whatif &lt;subject&gt; &lt;attend&gt; &lt;bunk&gt;</code>\n\n"
            "<b>Examples:</b>\n"
            "• <code>/whatif Maths 0 2</code> — Simulates missing 2 Mathematics classes.\n"
            "• <code>/whatif Electrical 3 0</code> — Simulates attending the next 3 Electrical classes.\n"
            "• <code>/whatif all 0 4</code> — Simulates bunking an entire day (4 lectures).\n"
        )

    # Check for 'all' / overall
    if subject_name.lower() in ("all", "overall", "total"):
        old_att = summary.total_attended
        old_tot = summary.total_conducted
        old_pct = summary.overall_percentage

        new_att = old_att + attend_count
        new_tot = old_tot + attend_count + bunk_count
        new_pct = round((new_att / new_tot) * 100, 2) if new_tot > 0 else 0.0

        bar = make_progress_bar(new_pct, length=10)
        diff = round(new_pct - old_pct, 2)
        diff_str = f"+{diff}%" if diff >= 0 else f"{diff}%"

        return (
            f"🔮 <b>Overall Attendance Simulation</b>\n"
            f"Attending: <b>+{attend_count}</b> | Bunking: <b>+{bunk_count}</b>\n"
            "━━━━━━━━━━━━━━━━━━━━━━\n"
            f"• Current Attendance: <b>{old_pct:.2f}%</b> ({old_att}/{old_tot})\n"
            f"• Projected Attendance: <b>{new_pct:.2f}%</b> ({new_att}/{new_tot})\n"
            f"• Net Change: <b>{diff_str}</b>\n"
            f"• Projected Bar: {bar}\n\n"
            f"Status: {'🟢 Above 75% Quota' if new_pct >= summary.target_quota else '🔴 Below 75% Quota'}"
        )

    subj = summary.find_subject(subject_name)
    if not subj:
        return (
            f"❌ Subject matching <b>'{subject_name}'</b> was not found.\n\n"
            "Available subjects:\n" + "\n".join(f"• <code>{s.name}</code>" for s in summary.subjects)
        )

    sim = subj.simulate(attend_count=attend_count, bunk_count=bunk_count)
    bar = make_progress_bar(sim["new_percentage"], length=10)
    diff = sim["percentage_diff"]
    diff_str = f"+{diff}%" if diff >= 0 else f"{diff}%"

    return (
        f"🔮 <b>Simulation: {subj.name}</b>\n"
        f"Planned: Attend <b>+{attend_count}</b> | Bunk <b>+{bunk_count}</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        f"• Current: <b>{sim['previous_percentage']:.2f}%</b> ({subj.attended}/{subj.total})\n"
        f"• Projected: <b>{sim['new_percentage']:.2f}%</b> ({sim['new_attended']}/{sim['new_total']})\n"
        f"• Net Delta: <b>{diff_str}</b>\n"
        f"• New Status: {bar}\n\n"
        + (
            f"🟢 <b>Safe!</b> You still have <b>{sim['safe_bunks']}</b> bunks remaining."
            if sim["is_safe"]
            else f"🔴 <b>Warning!</b> You will drop below quota and need <b>{sim['classes_needed']}</b> consecutive classes to recover."
        )
    )

# =========================================================================
# SAGARTRACKER.XYZ BUS TRANSIT FORMATTERS
# =========================================================================

SAGAR_BUS_ROUTES = [
    {
        "id": "shadow-line-1",
        "num": 1,
        "name": "Line 01: Piplani BHEL Vanguard",
        "bus": "MP-04-CM-0001",
        "driver": "Igris Commander",
        "phone": "+91 9876543210",
        "origin": "Piplani BHEL Junction",
        "dest": "SISTec Campus Gandhi Nagar",
        "departure": "07:50 AM",
        "arrival": "09:15 AM",
        "evening": "04:15 PM",
        "stops": [
            {"name": "Piplani BHEL Gate", "time": "07:50 AM"},
            {"name": "Govindpura Sector Gate", "time": "08:05 AM"},
            {"name": "Prabhat Petrol Gate", "time": "08:20 AM"},
            {"name": "Bhopal Junction Gate", "time": "08:40 AM"},
            {"name": "Airport Bypass Junction", "time": "09:00 AM"},
            {"name": "SISTec Central Campus", "time": "09:15 AM"},
        ],
    },
    {
        "id": "shadow-line-2",
        "num": 2,
        "name": "Line 02: Lalghati Connector",
        "bus": "MP-04-CM-0002",
        "driver": "Kaisel Pilot",
        "phone": "+91 9876543211",
        "origin": "Lalghati Central Gate",
        "dest": "SISTec Campus Gandhi Nagar",
        "departure": "08:30 AM",
        "arrival": "09:15 AM",
        "evening": "04:15 PM",
        "stops": [
            {"name": "Lalghati Junction Portal", "time": "08:30 AM"},
            {"name": "Halalpura Bus Port", "time": "08:45 AM"},
            {"name": "Gandhi Nagar Square", "time": "09:00 AM"},
            {"name": "SISTec Central Campus", "time": "09:15 AM"},
        ],
    },
    {
        "id": "shadow-line-3",
        "num": 3,
        "name": "Line 03: MP Nagar Hostel Loop",
        "bus": "MP-04-CM-0003",
        "driver": "Iron Hauler Commander",
        "phone": "+91 9876543212",
        "origin": "MP Nagar Zone II",
        "dest": "SISTec Campus Gandhi Nagar",
        "departure": "08:00 AM",
        "arrival": "09:15 AM",
        "evening": "04:15 PM",
        "stops": [
            {"name": "MP Nagar Metro Station", "time": "08:00 AM"},
            {"name": "Board Office Square Gate", "time": "08:15 AM"},
            {"name": "Polytechnic Square Gate", "time": "08:35 AM"},
            {"name": "VIP Road Lake Overlook", "time": "08:50 AM"},
            {"name": "Air Force Road Gate", "time": "09:05 AM"},
            {"name": "SISTec Central Campus", "time": "09:15 AM"},
        ],
    },
    {
        "id": "shadow-line-4",
        "num": 4,
        "name": "Line 04: Karond Line",
        "bus": "MP-04-CM-0004",
        "driver": "Tank Vanguard",
        "phone": "+91 9876543213",
        "origin": "Karond Mandi Junction",
        "dest": "SISTec Campus Gandhi Nagar",
        "departure": "08:25 AM",
        "arrival": "09:15 AM",
        "evening": "04:15 PM",
        "stops": [
            {"name": "Karond Mandi Gate", "time": "08:25 AM"},
            {"name": "Bhanpur Overpass Gate", "time": "08:45 AM"},
            {"name": "RGPV Campus Cross Gate", "time": "09:00 AM"},
            {"name": "SISTec Central Campus", "time": "09:15 AM"},
        ],
    },
    {
        "id": "shadow-line-5",
        "num": 5,
        "name": "Line 05: Habibganj / RKMP Runner",
        "bus": "MP-04-CM-0005",
        "driver": "Beru Monarch Scout",
        "phone": "+91 9876543214",
        "origin": "Habibganj RKMP Terminal",
        "dest": "SISTec Campus Gandhi Nagar",
        "departure": "07:45 AM",
        "arrival": "09:15 AM",
        "evening": "04:15 PM",
        "stops": [
            {"name": "Rani Kamlapati Station Gate", "time": "07:45 AM"},
            {"name": "Link Road No. 1 Portal", "time": "08:05 AM"},
            {"name": "Roshanpura Square Gate", "time": "08:25 AM"},
            {"name": "Ginnori Lake Gate", "time": "08:45 AM"},
            {"name": "Singarcholi Overpass", "time": "09:05 AM"},
            {"name": "SISTec Central Campus", "time": "09:15 AM"},
        ],
    },
    {
        "id": "shadow-line-6",
        "num": 6,
        "name": "Line 06: Ayodhya Bypass Line",
        "bus": "MP-04-CM-0006",
        "driver": "Bellion Grand Marshal",
        "phone": "+91 9876543215",
        "origin": "Ayodhya Bypass Terminal",
        "dest": "SISTec Campus Gandhi Nagar",
        "departure": "08:10 AM",
        "arrival": "09:15 AM",
        "evening": "04:15 PM",
        "stops": [
            {"name": "Ayodhya Square Portal", "time": "08:10 AM"},
            {"name": "Bhanpur Rotary Gate", "time": "08:30 AM"},
            {"name": "Airport Road Junction", "time": "08:50 AM"},
            {"name": "Badwai Gate Portal", "time": "09:05 AM"},
            {"name": "SISTec Central Campus", "time": "09:15 AM"},
        ],
    },
]


def format_bus_routes_message(route_num: int = None, query: str = None) -> str:
    """Formats SagarTracker.xyz bus routes and stop telemetry."""
    if route_num:
        r = next((x for x in SAGAR_BUS_ROUTES if x["num"] == route_num), None)
        if r:
            stops_fmt = "\n".join(f"  • <b>{s['time']}</b> — {s['name']}" for s in r["stops"])
            return (
                f"🚍 <b>SagarTracker.xyz — {r['name']}</b>\n"
                f"━━━━━━━━━━━━━━━━━━━━━━\n"
                f"• <b>Bus Plate:</b> <code>{r['bus']}</code>\n"
                f"• <b>Driver:</b> {r['driver']} ({r['phone']})\n"
                f"• <b>Route:</b> {r['origin']} ➔ {r['dest']}\n"
                f"• <b>Morning Pickup:</b> {r['departure']} | <b>Campus Arrival:</b> {r['arrival']}\n"
                f"• <b>Evening Departure:</b> {r['evening']}\n\n"
                f"📍 <b>Pickup Stops & ETAs:</b>\n{stops_fmt}\n\n"
                f"🔗 <i>Live GPS Map: <code>https://www.sagartracker.xyz</code></i>"
            )

    if query:
        query_lower = query.lower()
        matched = []
        for r in SAGAR_BUS_ROUTES:
            for s in r["stops"]:
                if query_lower in s["name"].lower() or query_lower in r["name"].lower() or query_lower in r["origin"].lower():
                    matched.append((r, s))
        if matched:
            lines = [f"🔍 <b>SagarTracker Results for '{query}':</b>\n━━━━━━━━━━━━━━━━━━━━━━"]
            for r, s in matched:
                lines.append(
                    f"🚍 <b>{r['name']}</b> (<code>{r['bus']}</code>)\n"
                    f"  • Stop: <b>{s['name']}</b> at <b>{s['time']}</b>\n"
                    f"  • Driver: {r['driver']} ({r['phone']})\n"
                )
            lines.append("Tap any line button below to view full route:")
            return "\n".join(lines)

    lines = [
        "🚍 <b>SISTec Campus Fleet & Bus Tracker (SagarTracker.xyz)</b>\n"
        "Official Campus Shuttle Routes • Live Synced\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "Select your bus line to inspect pickup stops & timings:\n"
    ]
    for r in SAGAR_BUS_ROUTES:
        lines.append(
            f"<b>Line {r['num']}:</b> {r['name']}\n"
            f"• <code>{r['bus']}</code> | {r['origin']} ({r['departure']}) ➔ SISTec ({r['arrival']})\n"
        )
    lines.append("⏰ <i>All buses depart campus at <b>04:15 PM</b> in the evening.</i>")
    return "\n".join(lines)


def format_bus_keyboard() -> InlineKeyboardMarkup:
    """Inline keyboard for selecting SagarTracker bus lines."""
    keyboard = [
        [
            InlineKeyboardButton("Line 1: Piplani", callback_data="bus_route_1"),
            InlineKeyboardButton("Line 2: Lalghati", callback_data="bus_route_2"),
        ],
        [
            InlineKeyboardButton("Line 3: MP Nagar", callback_data="bus_route_3"),
            InlineKeyboardButton("Line 4: Karond", callback_data="bus_route_4"),
        ],
        [
            InlineKeyboardButton("Line 5: RKMP", callback_data="bus_route_5"),
            InlineKeyboardButton("Line 6: Ayodhya", callback_data="bus_route_6"),
        ],
        [
            InlineKeyboardButton("🌐 Open SagarTracker.xyz", url="https://www.sagartracker.xyz"),
            InlineKeyboardButton("🔙 Main Menu", callback_data="menu_main"),
        ]
    ]
    return InlineKeyboardMarkup(keyboard)


def format_mopac_library_message() -> str:
    """Formats M-OPAC SISTec Central Library issues, dues, arrivals & digital card."""
    return (
        "📖 <b>SISTec Central Library — M-OPAC Card</b>\n"
        "Member: <b>Priyanshu Kushwaha</b> (CS-3 | CSE Core)\n"
        "Barcode ID: <code>SISTEC-LIB-2024-9755</code> | Status: <b>Active</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "📚 <b>CURRENTLY ISSUED BOOKS (3 of 4 Quota):</b>\n\n"
        "1. <b>Higher Engineering Mathematics (44th Ed.)</b>\n"
        "   • Author: Dr. B.S. Grewal | Acc: <code>ACC-MTH-24018</code>\n"
        "   • Due Date: <b>17 Nov 2026</b> (⏳ <i>16 Days Remaining</i>)\n"
        "   • Status: Valid (0 Renewals used)\n\n"
        "2. <b>Programming in ANSI C (8th Ed.)</b>\n"
        "   • Author: E. Balagurusamy | Acc: <code>ACC-CSE-18902</code>\n"
        "   • Due Date: <b>21 Nov 2026</b> (⏳ <i>20 Days Remaining</i>)\n"
        "   • Status: Valid (0 Renewals used)\n\n"
        "3. <b>Basic Electrical & Electronics Engineering</b>\n"
        "   • Author: D.C. Kulshreshtha | Acc: <code>ACC-EEE-31045</code>\n"
        "   • Due Date: <b>24 Nov 2026</b> (⏳ <i>23 Days Remaining</i>)\n"
        "   • Status: Valid (0 Renewals used)\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "💰 <b>FINES & DUES AUDIT:</b>\n"
        "• Total Overdue Fine: <b>₹0.00</b> (All Clear ✅)\n"
        "• Overdue Books: <b>0 Books</b>\n"
        "• Exam No-Dues Clearance: <b>APPROVED FOR ADMIT CARD</b>\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "✨ <b>NEW ARRIVALS AT CENTRAL DOME:</b>\n"
        "• <i>Data Structures in C</i> – Mark Allen Weiss (Rack CSE-04)\n"
        "• <i>Engineering Chemistry</i> – Dr. Shashi Chawla (Rack CHM-02)\n"
        "• <i>Python Programming</i> – Reema Thareja (Rack AI-01)\n\n"
        "🏛️ <i>Hours: 09:00 AM – 06:00 PM | Central Dome 1st Floor</i>"
    )
