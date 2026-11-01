"""Attendance Math & Bunk Calculator Engine.

Calculates:
- Precise percentage to 2 decimal places.
- 'Saved Bunks' (maximum classes you can skip while remaining at or above target quota, default 75%).
- 'Classes Needed' (minimum consecutive classes you must attend to reach or recover 75%).
- 'What-If' simulations for attending or bunking upcoming lectures.
"""

from __future__ import annotations
import math
from dataclasses import dataclass
from typing import List, Dict, Any, Optional


@dataclass
class SubjectAttendance:
    name: str
    attended: int
    total: int
    code: str = ""
    target_quota: float = 75.0

    @property
    def percentage(self) -> float:
        if self.total <= 0:
            return 0.0
        return round((self.attended / self.total) * 100, 2)

    @property
    def missed(self) -> int:
        return max(0, self.total - self.attended)

    @property
    def is_safe(self) -> bool:
        return self.percentage >= self.target_quota

    @property
    def safe_bunks(self) -> int:
        """Maximum classes you can skip consecutively while maintaining attendance >= target_quota.
        
        Formula:
          attended / (total + b) >= quota
          b <= (attended / quota) - total
        """
        if self.total <= 0 or self.target_quota <= 0:
            return 0
        quota_dec = self.target_quota / 100.0
        if self.percentage < self.target_quota:
            return 0
        bunks = math.floor((self.attended / quota_dec) - self.total)
        return max(0, bunks)

    @property
    def classes_needed(self) -> int:
        """Minimum consecutive classes you must attend to achieve >= target_quota.
        
        Formula:
          (attended + n) / (total + n) >= quota
          n >= (quota * total - attended) / (1 - quota)
        """
        if self.target_quota >= 100.0:
            return 0 if self.attended == self.total and self.total > 0 else 999
        if self.percentage >= self.target_quota:
            return 0
        quota_dec = self.target_quota / 100.0
        numerator = (quota_dec * self.total) - self.attended
        denominator = 1.0 - quota_dec
        if denominator <= 0:
            return 0
        needed = math.ceil(numerator / denominator)
        return max(0, needed)

    @property
    def next_if_attend(self) -> float:
        """Percentage if you attend the next 1 class."""
        new_total = self.total + 1
        new_att = self.attended + 1
        return round((new_att / new_total) * 100, 2)

    @property
    def next_if_bunk(self) -> float:
        """Percentage if you bunk the next 1 class."""
        new_total = self.total + 1
        return round((self.attended / new_total) * 100, 2)

    def simulate(self, attend_count: int, bunk_count: int) -> Dict[str, Any]:
        """Simulate attending X and bunking Y upcoming classes."""
        new_attended = self.attended + max(0, attend_count)
        new_total = self.total + max(0, attend_count) + max(0, bunk_count)
        new_pct = round((new_attended / new_total) * 100, 2) if new_total > 0 else 0.0
        quota_dec = self.target_quota / 100.0

        if new_pct >= self.target_quota:
            sim_bunks = max(0, math.floor((new_attended / quota_dec) - new_total))
            sim_needed = 0
        else:
            sim_bunks = 0
            sim_needed = max(0, math.ceil(((quota_dec * new_total) - new_attended) / (1.0 - quota_dec)))

        return {
            "name": self.name,
            "previous_percentage": self.percentage,
            "new_percentage": new_pct,
            "percentage_diff": round(new_pct - self.percentage, 2),
            "new_attended": new_attended,
            "new_total": new_total,
            "is_safe": new_pct >= self.target_quota,
            "safe_bunks": sim_bunks,
            "classes_needed": sim_needed,
        }

    def to_dict(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "code": self.code,
            "attended": self.attended,
            "total": self.total,
            "missed": self.missed,
            "percentage": self.percentage,
            "is_safe": self.is_safe,
            "safe_bunks": self.safe_bunks,
            "classes_needed": self.classes_needed,
            "next_if_attend": self.next_if_attend,
            "next_if_bunk": self.next_if_bunk,
            "target_quota": self.target_quota,
        }


@dataclass
class AttendanceSummary:
    subjects: List[SubjectAttendance]
    target_quota: float = 75.0

    @property
    def total_attended(self) -> int:
        return sum(s.attended for s in self.subjects)

    @property
    def total_conducted(self) -> int:
        return sum(s.total for s in self.subjects)

    @property
    def total_missed(self) -> int:
        return self.total_conducted - self.total_attended

    @property
    def overall_percentage(self) -> float:
        if self.total_conducted <= 0:
            return 0.0
        return round((self.total_attended / self.total_conducted) * 100, 2)

    @property
    def is_safe(self) -> bool:
        return self.overall_percentage >= self.target_quota

    @property
    def overall_safe_bunks(self) -> int:
        """Aggregated overall bunks allowed across all lectures without dropping below quota."""
        if self.total_conducted <= 0 or self.overall_percentage < self.target_quota:
            return 0
        quota_dec = self.target_quota / 100.0
        bunks = math.floor((self.total_attended / quota_dec) - self.total_conducted)
        return max(0, bunks)

    @property
    def overall_classes_needed(self) -> int:
        """Overall consecutive lectures you must attend across all classes to hit target quota."""
        if self.overall_percentage >= self.target_quota:
            return 0
        quota_dec = self.target_quota / 100.0
        numerator = (quota_dec * self.total_conducted) - self.total_attended
        denominator = 1.0 - quota_dec
        if denominator <= 0:
            return 0
        return max(0, math.ceil(numerator / denominator))

    @property
    def safe_subjects(self) -> List[SubjectAttendance]:
        return [s for s in self.subjects if s.is_safe]

    @property
    def danger_subjects(self) -> List[SubjectAttendance]:
        return [s for s in self.subjects if not s.is_safe]

    @property
    def total_subject_bunks_sum(self) -> int:
        """Sum of safe bunks across individual safe subjects."""
        return sum(s.safe_bunks for s in self.safe_subjects)

    @property
    def total_subject_recovery_sum(self) -> int:
        """Sum of needed classes across individual danger subjects."""
        return sum(s.classes_needed for s in self.danger_subjects)

    def find_subject(self, name_or_code: str) -> Optional[SubjectAttendance]:
        query = name_or_code.strip().lower()
        for s in self.subjects:
            if s.name.lower() == query or s.code.lower() == query:
                return s
        # Fuzzy match
        for s in self.subjects:
            if query in s.name.lower() or (s.code and query in s.code.lower()):
                return s
        return None
