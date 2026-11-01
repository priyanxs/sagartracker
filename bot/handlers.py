"""Telegram Bot Command, Keyword and Callback Query Handlers.

Supports:
- Direct commands (/attendance, /bunks, /timetable, etc.)
- Direct plain text messages ('attendance', 'bunk', 'schedule', 'fees', 'result', etc.)
- Interactive inline keyboards & buttons
- Automated student portal synchronization
"""

from __future__ import annotations
import logging
from telegram import Update
from telegram.constants import ParseMode
from telegram.ext import (
    ContextTypes,
    CommandHandler,
    MessageHandler,
    CallbackQueryHandler,
    filters,
)

from bot.storage import Storage
from bot.student_cloud import StudentCloudClient
from bot.attendance_math import AttendanceSummary
from bot.config import STUDENT_ERP_USERNAME, STUDENT_ERP_PASSWORD
from bot.ui import (
    format_attendance_message,
    format_bunks_advisor_message,
    format_recovery_plan_message,
    format_dashboard_message,
    format_schedule_message,
    format_day_schedule_message,
    format_schedule_keyboard,
    format_exam_timetable_message,
    format_hallticket_message,
    format_results_message,
    format_internal_marks_message,
    format_itle_message,
    format_fees_message,
    format_registered_subjects_message,
    format_calendar_message,
    format_profile_message,
    format_whatif_message,
    format_main_menu_keyboard,
    format_inline_dashboard_keyboard,
    format_all_shortcuts_keyboard,
    format_subject_list_keyboard,
    format_subject_detail_message,
    format_bus_routes_message,
    format_bus_keyboard,
    format_mopac_library_message,
)

logger = logging.getLogger(__name__)
storage = Storage()
cloud_client = StudentCloudClient()

DEFAULT_PROFILE = {
    "name": "PRIYANSHU SINGH",
    "enrollment": "0187CS241151",
    "branch": "B.Tech - Computer Science & Engineering (Data Science)",
    "sem": "I",
    "sec": "C",
    "mobile": "8602693897",
    "email": "singhpriyanshu1445@gmail.com",
}


def get_user_summary(user_id: int, force_refresh: bool = False) -> AttendanceSummary:
    """Fetch attendance summary from live ERP, custom subjects, or cached SISTec profile."""
    user = storage.get_user(user_id)
    target_quota = user.get("target_quota", 75.0) if user else 75.0

    # 1. Check custom subjects
    custom_subjs = storage.get_custom_subjects(user_id, quota=target_quota)
    if custom_subjs:
        summary = AttendanceSummary(subjects=custom_subjs, target_quota=target_quota)
        storage.save_attendance_cache(user_id, summary)
        return summary

    # 2. If cached data exists and not forcing refresh, return immediately
    if not force_refresh:
        cached = storage.get_attendance_cache(user_id, quota=target_quota)
        if cached and cached.subjects:
            return cached

    # 3. Pull from real SISTec Student Direct Cloud portal
    erp_user = (user.get("erp_username") if user else "") or STUDENT_ERP_USERNAME
    erp_pass = (user.get("erp_password") if user else "") or STUDENT_ERP_PASSWORD

    live_summary, err = cloud_client.fetch_live_playwright(
        username=erp_user,
        password=erp_pass,
        target_quota=target_quota,
    )
    if live_summary:
        storage.save_attendance_cache(user_id, live_summary)
        return live_summary

    # 4. Fallback to verified real SISTec records
    summary = cloud_client.get_real_sistec_summary(target_quota=target_quota)
    storage.save_attendance_cache(user_id, summary)
    return summary


# --- Core Command Handlers ---

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /start command."""
    user = update.effective_user
    if not user:
        return

    storage.upsert_user(
        user_id=user.id,
        telegram_username=user.username,
        first_name=user.first_name,
    )

    summary = get_user_summary(user.id)
    name = DEFAULT_PROFILE["name"]

    welcome_text = (
        f"👋 Welcome, <b>{name}</b>, to your <b>SISTec Student Cloud & Attendance Bot</b>!\n\n"
        "Your live attendance, timetable, fees, internal marks, and exam records are synchronized.\n\n"
        "⚡ <b>How to Use:</b>\n"
        "• You can tap any button on the bottom menu.\n"
        "• Or simply <b>type words directly</b> in this chat: <code>attendance</code>, <code>bunks</code>, <code>schedule</code>, <code>fees</code>, <code>internal marks</code>, etc.!\n"
    )

    await update.message.reply_text(
        welcome_text,
        parse_mode=ParseMode.HTML,
        reply_markup=format_main_menu_keyboard(),
    )

    # Send dashboard overview
    text = format_attendance_message(summary, user_name=name)
    await update.message.reply_text(
        text,
        parse_mode=ParseMode.HTML,
        reply_markup=format_inline_dashboard_keyboard(),
    )


async def dashboard_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /dashboard."""
    user = update.effective_user
    if not user:
        return
    summary = get_user_summary(user.id)
    text = format_dashboard_message(summary, DEFAULT_PROFILE)
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


async def attendance_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /attendance."""
    user = update.effective_user
    if not user:
        return
    summary = get_user_summary(user.id)
    text = format_attendance_message(summary, user_name=DEFAULT_PROFILE["name"])
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


async def bunks_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /bunks."""
    user = update.effective_user
    if not user:
        return
    summary = get_user_summary(user.id)
    text = format_bunks_advisor_message(summary)
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


async def recovery_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /recovery."""
    user = update.effective_user
    if not user:
        return
    summary = get_user_summary(user.id)
    text = format_recovery_plan_message(summary)
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


import datetime

async def schedule_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /schedule, /timetable, and day-specific queries."""
    args = context.args or []
    if args:
        query = args[0].lower()
        if query in ("today", "aaj"):
            # Get current day of week in India timezone
            weekday = datetime.datetime.now().strftime("%a").lower()
            text = format_day_schedule_message(weekday)
        else:
            text = format_day_schedule_message(query)
    else:
        text = format_schedule_message()

    await update.message.reply_text(
        text,
        parse_mode=ParseMode.HTML,
        reply_markup=format_schedule_keyboard(),
    )


async def bus_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /bus, /transit, and /sagartracker queries."""
    args = context.args or []
    route_num = None
    query = None
    if args:
        if args[0].isdigit():
            route_num = int(args[0])
        else:
            query = " ".join(args).strip()
    text = format_bus_routes_message(route_num=route_num, query=query)
    await update.message.reply_text(
        text,
        parse_mode=ParseMode.HTML,
        reply_markup=format_bus_keyboard(),
    )


async def exam_timetable_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /examtimetable."""
    text = format_exam_timetable_message()
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


async def hallticket_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /hallticket."""
    text = format_hallticket_message()
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


async def results_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /result and /results."""
    text = format_results_message()
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


async def internal_marks_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /internalmarks."""
    text = format_internal_marks_message()
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


async def itle_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /itle."""
    text = format_itle_message()
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


async def fees_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /fees."""
    text = format_fees_message()
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


async def subjects_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /subjects."""
    text = format_registered_subjects_message()
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


async def mopac_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /mopac and /library."""
    text = format_mopac_library_message()
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


async def calendar_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /calendar."""
    text = format_calendar_message()
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


async def profile_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /profile."""
    text = format_profile_message(DEFAULT_PROFILE)
    await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())


async def shortcuts_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /shortcuts and /menu."""
    text = (
        "⚡ <b>All Student Direct Cloud Feature Shortcuts</b>\n"
        "Tap any button below to instantly view that section:"
    )
    await update.message.reply_text(
        text,
        parse_mode=ParseMode.HTML,
        reply_markup=format_all_shortcuts_keyboard(),
    )


async def whatif_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /whatif command."""
    user = update.effective_user
    if not user:
        return

    args = context.args or []
    summary = get_user_summary(user.id)

    if len(args) < 3:
        text = format_whatif_message(summary)
        await update.message.reply_text(text, parse_mode=ParseMode.HTML)
        return

    subject_query = args[0]
    try:
        attend_count = int(args[1])
        bunk_count = int(args[2])
    except ValueError:
        await update.message.reply_text(
            "❌ <b>Invalid format!</b> Counts must be numbers.\n\n"
            "Example: <code>/whatif Maths 0 2</code>",
            parse_mode=ParseMode.HTML,
        )
        return

    text = format_whatif_message(
        summary=summary,
        subject_name=subject_query,
        attend_count=attend_count,
        bunk_count=bunk_count,
    )
    await update.message.reply_text(text, parse_mode=ParseMode.HTML)


async def refresh_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles /refresh."""
    user = update.effective_user
    if not user:
        return
    await update.message.reply_text("⏳ Syncing with Student Direct Cloud...")
    summary = get_user_summary(user.id, force_refresh=True)
    text = format_attendance_message(summary, user_name=DEFAULT_PROFILE["name"])
    await update.message.reply_text(
        f"✅ <b>Synced!</b>\n\n{text}",
        parse_mode=ParseMode.HTML,
        reply_markup=format_inline_dashboard_keyboard(),
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Full user guide."""
    help_text = (
        "📖 <b>Student Cloud Shortcuts & Voice/Text Search Guide</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        "You can type commands with a slash <code>/</code> or <b>directly write plain words</b> in chat:\n\n"
        "• <b>attendance</b> / <b>/attendance</b> — Real-time attendance progress\n"
        "• <b>bunks</b> / <b>/bunks</b> — Saved bunks allowed\n"
        "• <b>recovery</b> / <b>/recovery</b> — Classes to complete 75% quota\n"
        "• <b>schedule</b> / <b>timetable</b> — Daily lecture timetable\n"
        "• <b>exam</b> / <b>exam timetable</b> — Semester exam schedule\n"
        "• <b>hall ticket</b> / <b>admit card</b> — Exam Hall Ticket clearance\n"
        "• <b>results</b> / <b>result</b> — Grade cards & marksheet\n"
        "• <b>internal marks</b> / <b>midsem</b> — Continuous evaluation scores\n"
        "• <b>itle</b> / <b>lms</b> — Assignments and study notes\n"
        "• <b>fees</b> / <b>fees paid</b> — Payment receipts (₹1,07,400 paid)\n"
        "• <b>subjects</b> — 10 registered courses & professors\n"
        "• <b>calendar</b> — Academic calendar & deadlines\n"
        "• <b>profile</b> — Student official ERP record\n"
        "• <b>whatif Maths 0 2</b> — Predict percentage before bunking\n"
        "• <b>shortcuts</b> — Open full 1-tap button panel\n"
    )
    await update.message.reply_text(help_text, parse_mode=ParseMode.HTML)


# --- Smart Plain-Text & Keyword Message Router ---

async def handle_text_messages(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Intelligently routes plain text keywords (e.g. 'attendance', 'bunk', 'fees') directly."""
    if not update.message or not update.message.text:
        return

    raw = update.message.text.strip().lower()

    # 1. Attendance & Bunks
    if any(k in raw for k in ["attendance", "haziri", "att", "present", "absent"]):
        await attendance_command(update, context)
        return
    if any(k in raw for k in ["bunk", "bunks", "safe bunk", "saved bunk", "skip"]):
        await bunks_command(update, context)
        return
    if any(k in raw for k in ["recovery", "75%", "quota", "goal", "shortage", "target"]):
        await recovery_command(update, context)
        return

    # 2. Schedule & Exams
    for d in ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]:
        if d in raw and any(w in raw for w in ["schedule", "class", "classes", "routine", "timing"]):
            text = format_day_schedule_message(d[:3])
            await update.message.reply_text(text, parse_mode=ParseMode.HTML, reply_markup=format_schedule_keyboard())
            return

    if any(k in raw for k in [
        "class schedule", "schedule", "timetable", "time table", "my schedule",
        "routine", "classes", "class timing", "class timings", "lecture schedule",
        "today class", "aaj ki class", "classes today"
    ]):
        await schedule_command(update, context)
        return
    if any(k in raw for k in ["exam timetable", "exam schedule", "exam date", "examination"]):
        await exam_timetable_command(update, context)
        return
    if any(k in raw for k in ["hall ticket", "admit card", "hallticket", "seating"]):
        await hallticket_command(update, context)
        return

    # 3. Marks & Academics
    if any(k in raw for k in ["internal marks", "internals", "midsem", "mid sem", "internal"]):
        await internal_marks_command(update, context)
        return
    if any(k in raw for k in ["result", "results", "grade", "marksheet", "cgpa", "sgpa"]):
        await results_command(update, context)
        return
    if any(k in raw for k in ["itle", "lms", "assignment", "assignments", "notes"]):
        await itle_command(update, context)
        return

    # 4. Fees, Subjects, Library & Profile
    if any(k in raw for k in ["library", "mopac", "m-opac", "mopack", "books", "book", "issue", "issues", "borrow", "renew", "librarian"]):
        await mopac_command(update, context)
        return
    if any(k in raw for k in ["bus", "transit", "shuttle", "sagar tracker", "sagartracker", "pickup", "bhel", "piplani", "lalghati", "mp nagar", "karond", "rkmp", "ayodhya"]):
        await bus_command(update, context)
        return
    if any(k in raw for k in ["fee", "fees", "receipt", "challan", "dues", "payment"]):
        await fees_command(update, context)
        return
    if any(k in raw for k in ["subject", "subjects", "course", "courses"]):
        await subjects_command(update, context)
        return
    if any(k in raw for k in ["calendar", "holiday", "holidays", "event", "events"]):
        await calendar_command(update, context)
        return
    if any(k in raw for k in ["profile", "my info", "roll no", "enrollment", "student details"]):
        await profile_command(update, context)
        return
    if any(k in raw for k in ["dashboard", "home", "main"]):
        await dashboard_command(update, context)
        return

    # 5. Shortcuts & Simulator
    if any(k in raw for k in ["shortcut", "shortcuts", "menu", "all features", "options"]):
        await shortcuts_command(update, context)
        return
    if any(k in raw for k in ["whatif", "simulate", "prediction"]):
        await whatif_command(update, context)
        return
    if "refresh" in raw:
        await refresh_command(update, context)
        return

    # Default fallback
    await update.message.reply_text(
        f"🔍 You typed: <b>{update.message.text}</b>\n\n"
        "Try typing keywords like:\n"
        "• <code>attendance</code> — View your attendance\n"
        "• <code>bunks</code> — View safe bunks\n"
        "• <code>timetable</code> — View class schedule\n"
        "• <code>fees</code> — View paid receipts\n"
        "• <code>exam timetable</code> — View exam dates\n"
        "• <code>internal marks</code> — View mid-sem marks\n"
        "• <code>shortcuts</code> — Open 1-tap menu",
        parse_mode=ParseMode.HTML,
        reply_markup=format_main_menu_keyboard(),
    )


# --- Callback Query Router ---

async def callback_query_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles inline buttons."""
    query = update.callback_query
    if not query:
        return

    await query.answer()
    data = query.data
    user = update.effective_user
    if not user:
        return

    summary = get_user_summary(user.id)

    if data == "refresh_attendance":
        text = format_attendance_message(summary, user_name=DEFAULT_PROFILE["name"])
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())

    elif data == "view_bunks":
        text = format_bunks_advisor_message(summary)
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())

    elif data == "view_recovery":
        text = format_recovery_plan_message(summary)
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())

    elif data == "view_schedule":
        text = format_schedule_message()
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_schedule_keyboard())

    elif data.startswith("sched_"):
        day_key = data.split("_")[1]
        if day_key == "full":
            text = format_schedule_message()
        else:
            text = format_day_schedule_message(day_key)
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_schedule_keyboard())

    elif data == "view_exam_timetable":
        text = format_exam_timetable_message()
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())

    elif data == "view_hallticket":
        text = format_hallticket_message()
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())

    elif data == "view_results":
        text = format_results_message()
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())

    elif data == "view_internal_marks":
        text = format_internal_marks_message()
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())

    elif data == "view_itle":
        text = format_itle_message()
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())

    elif data == "view_fees":
        text = format_fees_message()
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())

    elif data == "view_subjects":
        text = format_registered_subjects_message()
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())

    elif data == "view_calendar":
        text = format_calendar_message()
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())

    elif data == "view_profile":
        text = format_profile_message(DEFAULT_PROFILE)
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())

    elif data == "view_all_shortcuts":
        text = "⚡ <b>Select any feature to view immediately:</b>"
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_all_shortcuts_keyboard())

    elif data == "menu_whatif":
        text = format_whatif_message(summary)
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())

    elif data == "menu_bus" or data == "view_bus":
        text = format_bus_routes_message()
        await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_bus_keyboard())

    elif data.startswith("bus_route_"):
        try:
            route_num = int(data.split("_")[2])
            text = format_bus_routes_message(route_num=route_num)
            await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_bus_keyboard())
        except (ValueError, IndexError):
            pass

    elif data.startswith("subj_"):
        try:
            idx = int(data.split("_")[1])
            if 0 <= idx < len(summary.subjects):
                subj = summary.subjects[idx]
                text = format_subject_detail_message(subj)
                await query.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=format_inline_dashboard_keyboard())
        except (ValueError, IndexError):
            pass


def register_handlers(application):
    """Registers all commands and handlers to the Telegram Application."""
    # Core features
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("dashboard", dashboard_command))
    application.add_handler(CommandHandler("attendance", attendance_command))
    application.add_handler(CommandHandler("bunks", bunks_command))
    application.add_handler(CommandHandler("recovery", recovery_command))

    # Academics & Timetables
    application.add_handler(CommandHandler("schedule", schedule_command))
    application.add_handler(CommandHandler("timetable", schedule_command))
    application.add_handler(CommandHandler("classschedule", schedule_command))
    application.add_handler(CommandHandler("classes", schedule_command))
    application.add_handler(CommandHandler("examtimetable", exam_timetable_command))
    application.add_handler(CommandHandler("hallticket", hallticket_command))
    application.add_handler(CommandHandler("result", results_command))
    application.add_handler(CommandHandler("results", results_command))
    application.add_handler(CommandHandler("internalmarks", internal_marks_command))
    application.add_handler(CommandHandler("itle", itle_command))

    # Finances & Details
    application.add_handler(CommandHandler("fees", fees_command))
    application.add_handler(CommandHandler("subjects", subjects_command))
    application.add_handler(CommandHandler("calendar", calendar_command))
    application.add_handler(CommandHandler("library", mopac_command))
    application.add_handler(CommandHandler("mopac", mopac_command))
    application.add_handler(CommandHandler("books", mopac_command))
    application.add_handler(CommandHandler("profile", profile_command))
    application.add_handler(CommandHandler("bus", bus_command))
    application.add_handler(CommandHandler("transit", bus_command))
    application.add_handler(CommandHandler("shuttle", bus_command))
    application.add_handler(CommandHandler("sagartracker", bus_command))
    application.add_handler(CommandHandler("shortcuts", shortcuts_command))
    application.add_handler(CommandHandler("menu", shortcuts_command))
    application.add_handler(CommandHandler("whatif", whatif_command))
    application.add_handler(CommandHandler("refresh", refresh_command))
    application.add_handler(CommandHandler("help", help_command))

    # Interactivity
    application.add_handler(CallbackQueryHandler(callback_query_handler))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_text_messages))
