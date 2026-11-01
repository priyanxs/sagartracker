"""Configuration loader for Sagar Attendance Telegram Bot."""

import os
from pathlib import Path
from dotenv import load_dotenv

# Find .env in project root
ENV_PATH = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=ENV_PATH)

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()
DEFAULT_TARGET_QUOTA = float(os.getenv("DEFAULT_TARGET_QUOTA", "75.0"))
DEFAULT_PORTAL_URL = os.getenv("DEFAULT_PORTAL_URL", "https://cimsstudentnewui.mastersofterp.in").strip()
STUDENT_ERP_USERNAME = os.getenv("STUDENT_ERP_USERNAME", "6523402@sistec.com").strip()
STUDENT_ERP_PASSWORD = os.getenv("STUDENT_ERP_PASSWORD", "student").strip()
COLLEGE_NAME = os.getenv("COLLEGE_NAME", "Sagar Group of Institutions (SISTec)").strip()
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()

# Admin ID for alerts or diagnostics (optional)
ADMIN_USER_ID = int(os.getenv("ADMIN_USER_ID", "0")) if os.getenv("ADMIN_USER_ID", "").isdigit() else None
