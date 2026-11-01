#!/usr/bin/env python3
"""Main Entry Point for the Sagar Attendance & Bunk Advisor Telegram Bot."""

import sys
import logging
from telegram.ext import ApplicationBuilder
from bot.config import TELEGRAM_BOT_TOKEN, LOG_LEVEL
from bot.handlers import register_handlers

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=getattr(logging, LOG_LEVEL, logging.INFO),
)
logger = logging.getLogger("SagarAttendanceBot")


def main():
    if not TELEGRAM_BOT_TOKEN or TELEGRAM_BOT_TOKEN == "YOUR_TELEGRAM_BOT_TOKEN_HERE":
        print("\n" + "=" * 65)
        print("🤖 SAGAR ATTENDANCE & BUNK ADVISOR TELEGRAM BOT SETUP")
        print("=" * 65)
        print("❌ TELEGRAM_BOT_TOKEN is missing or not configured!\n")
        print("Follow these 3 quick steps to activate your bot:")
        print("1. Open Telegram and search for '@BotFather'")
        print("2. Send '/newbot' and follow the prompts to choose a bot name & username")
        print("3. Copy your HTTP API token and set it in your .env file:")
        print("   TELEGRAM_BOT_TOKEN=123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ\n")
        print("Then run: python3 run_bot.py")
        print("=" * 65 + "\n")
        sys.exit(1)

    logger.info("Initializing Telegram Bot Application...")
    app = ApplicationBuilder().token(TELEGRAM_BOT_TOKEN).build()

    register_handlers(app)

    logger.info("Bot successfully initialized and listening for messages.")
    print("\n🚀 Bot is now live! Open Telegram and send /start to your bot.")
    print("Press Ctrl+C to stop.\n")

    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
