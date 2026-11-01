"""Local SQLite Storage for Telegram Bot User Profiles and Attendance Data.

Stores:
- User preferences (Target Quota %, notifications).
- Student Direct Cloud credentials (encrypted / obfuscated) or session token.
- Cached attendance state for fast responses, delta tracking, and offline queries.
"""

from __future__ import annotations
import json
import sqlite3
from pathlib import Path
from typing import Optional, Dict, Any, List
from datetime import datetime
from bot.attendance_math import SubjectAttendance, AttendanceSummary

DB_PATH = Path(__file__).resolve().parent.parent / "attendance_bot.db"


class Storage:
    def __init__(self, db_path: Path = DB_PATH):
        self.db_path = db_path
        self._init_db()

    def _get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_db(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    user_id INTEGER PRIMARY KEY,
                    telegram_username TEXT,
                    first_name TEXT,
                    erp_username TEXT,
                    erp_password TEXT,
                    erp_token TEXT,
                    erp_portal_url TEXT DEFAULT 'https://cimsstudentnewui.mastersofterp.in',
                    target_quota REAL DEFAULT 75.0,
                    alert_enabled INTEGER DEFAULT 1,
                    is_demo INTEGER DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS attendance_cache (
                    user_id INTEGER PRIMARY KEY,
                    raw_json TEXT,
                    overall_percentage REAL,
                    total_attended INTEGER,
                    total_conducted INTEGER,
                    safe_bunks INTEGER,
                    classes_needed INTEGER,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
                );
            """)

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS custom_subjects (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    subject_name TEXT,
                    subject_code TEXT,
                    attended INTEGER DEFAULT 0,
                    total INTEGER DEFAULT 0,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(user_id, subject_name),
                    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
                );
            """)
            conn.commit()

    def get_user(self, user_id: int) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
            row = cursor.fetchone()
            if row:
                return dict(row)
            return None

    def upsert_user(
        self,
        user_id: int,
        telegram_username: Optional[str] = None,
        first_name: Optional[str] = None,
        erp_username: Optional[str] = None,
        erp_password: Optional[str] = None,
        erp_token: Optional[str] = None,
        erp_portal_url: Optional[str] = None,
        target_quota: Optional[float] = None,
        alert_enabled: Optional[bool] = None,
        is_demo: Optional[bool] = None,
    ):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT user_id FROM users WHERE user_id = ?", (user_id,))
            exists = cursor.fetchone()

            if not exists:
                cursor.execute(
                    """
                    INSERT INTO users (
                        user_id, telegram_username, first_name, erp_username, erp_password,
                        erp_token, erp_portal_url, target_quota, alert_enabled, is_demo, updated_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                    """,
                    (
                        user_id,
                        telegram_username or "",
                        first_name or "",
                        erp_username or "",
                        erp_password or "",
                        erp_token or "",
                        erp_portal_url or "https://cimsstudentnewui.mastersofterp.in",
                        target_quota if target_quota is not None else 75.0,
                        1 if alert_enabled is None or alert_enabled else 0,
                        1 if is_demo else 0,
                    ),
                )
            else:
                updates = ["updated_at = CURRENT_TIMESTAMP"]
                params: List[Any] = []

                if telegram_username is not None:
                    updates.append("telegram_username = ?")
                    params.append(telegram_username)
                if first_name is not None:
                    updates.append("first_name = ?")
                    params.append(first_name)
                if erp_username is not None:
                    updates.append("erp_username = ?")
                    params.append(erp_username)
                if erp_password is not None:
                    updates.append("erp_password = ?")
                    params.append(erp_password)
                if erp_token is not None:
                    updates.append("erp_token = ?")
                    params.append(erp_token)
                if erp_portal_url is not None:
                    updates.append("erp_portal_url = ?")
                    params.append(erp_portal_url)
                if target_quota is not None:
                    updates.append("target_quota = ?")
                    params.append(target_quota)
                if alert_enabled is not None:
                    updates.append("alert_enabled = ?")
                    params.append(1 if alert_enabled else 0)
                if is_demo is not None:
                    updates.append("is_demo = ?")
                    params.append(1 if is_demo else 0)

                params.append(user_id)
                query = f"UPDATE users SET {', '.join(updates)} WHERE user_id = ?"
                cursor.execute(query, tuple(params))

            conn.commit()

    def set_target_quota(self, user_id: int, quota: float):
        self.upsert_user(user_id=user_id, target_quota=quota)

    def set_demo_mode(self, user_id: int, is_demo: bool):
        self.upsert_user(user_id=user_id, is_demo=is_demo)

    def save_attendance_cache(self, user_id: int, summary: AttendanceSummary):
        raw_list = [s.to_dict() for s in summary.subjects]
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO attendance_cache (
                    user_id, raw_json, overall_percentage, total_attended,
                    total_conducted, safe_bunks, classes_needed, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(user_id) DO UPDATE SET
                    raw_json = excluded.raw_json,
                    overall_percentage = excluded.overall_percentage,
                    total_attended = excluded.total_attended,
                    total_conducted = excluded.total_conducted,
                    safe_bunks = excluded.safe_bunks,
                    classes_needed = excluded.classes_needed,
                    updated_at = CURRENT_TIMESTAMP
                """,
                (
                    user_id,
                    json.dumps(raw_list),
                    summary.overall_percentage,
                    summary.total_attended,
                    summary.total_conducted,
                    summary.overall_safe_bunks,
                    summary.overall_classes_needed,
                ),
            )
            conn.commit()

    def get_attendance_cache(self, user_id: int, quota: float = 75.0) -> Optional[AttendanceSummary]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT raw_json FROM attendance_cache WHERE user_id = ?", (user_id,))
            row = cursor.fetchone()
            if not row or not row["raw_json"]:
                return None
            try:
                data = json.loads(row["raw_json"])
                subjects = []
                for item in data:
                    subjects.append(
                        SubjectAttendance(
                            name=item.get("name", "Unknown"),
                            code=item.get("code", ""),
                            attended=int(item.get("attended", 0)),
                            total=int(item.get("total", 0)),
                            target_quota=quota,
                        )
                    )
                return AttendanceSummary(subjects=subjects, target_quota=quota)
            except Exception:
                return None

    def save_custom_subject(self, user_id: int, name: str, attended: int, total: int, code: str = ""):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO custom_subjects (user_id, subject_name, subject_code, attended, total, updated_at)
                VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(user_id, subject_name) DO UPDATE SET
                    attended = excluded.attended,
                    total = excluded.total,
                    subject_code = excluded.subject_code,
                    updated_at = CURRENT_TIMESTAMP
                """,
                (user_id, name.strip(), code.strip(), attended, total),
            )
            conn.commit()

    def get_custom_subjects(self, user_id: int, quota: float = 75.0) -> List[SubjectAttendance]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM custom_subjects WHERE user_id = ? ORDER BY subject_name ASC", (user_id,))
            rows = cursor.fetchall()
            return [
                SubjectAttendance(
                    name=r["subject_name"],
                    code=r["subject_code"] or "",
                    attended=r["attended"],
                    total=r["total"],
                    target_quota=quota,
                )
                for r in rows
            ]

    def clear_custom_subjects(self, user_id: int):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM custom_subjects WHERE user_id = ?", (user_id,))
            conn.commit()
