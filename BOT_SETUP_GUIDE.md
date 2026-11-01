# 🎓 Sagar Attendance & Bunk Advisor Telegram Bot

An intelligent, interactive Telegram bot that connects to your college **Student Direct Cloud** (MasterSoft ERP / CIMS) portal to track your attendance, calculate your **saved bunks**, and compute the exact number of consecutive classes required to reach or maintain your **75% attendance quota**.

---

## 🌟 Key Features

1. **📊 Real-Time Attendance Dashboard (`/attendance`)**:
   - Visual colored progress bars (`🟩` $\ge 75\%$, `🟨` $65-74\%$, `🟥` $< 65\%$).
   - Overall attended vs conducted count.
   - Subject-wise breakdown with individual status indicators.

2. **🛡️ Saved Bunks & Quota Intelligence (`/bunks`)**:
   - **Safe Zone**: Exactly how many lectures you can skip right now without falling below 75%.
   - **Danger Zone**: Immediate warnings for subjects falling short of 75%.
   - Overall safe bunks aggregated across your entire timetable.

3. **🎯 75% Recovery Goal Plan (`/recovery`)**:
   - Pinpoints low-attendance courses and calculates the minimum consecutive classes you must attend to cross the 75% threshold.

4. **🔮 "What-If" Predictor & Simulator (`/whatif`)**:
   - Simulate taking a day off or attending upcoming lectures before deciding to bunk.
   - Example: `/whatif Networks 0 2` calculates what missing 2 lectures will do to your percentage.

5. **⚡ Student Direct Cloud / MasterSoft ERP Integration**:
   - Direct API connection via credentials (`/login`).
   - Session/Bearer token support (`/token`).
   - Manual subject editor (`/addsubject`) if your portal requires Captcha.
   - Built-in instant **Demo Mode** (`/demo`) to test all features immediately.

---

## 🧮 Mathematical Engine & Formulas

### 1. Saved Bunks (Safe Skip Allowance)
When your attendance is at or above $75\%$, the maximum number of classes $B$ you can skip while remaining $\ge 75\%$ is:

$$\frac{\text{Attended}}{\text{Total} + B} \ge 0.75 \implies B = \left\lfloor \frac{\text{Attended}}{0.75} - \text{Total} \right\rfloor = \left\lfloor \frac{4 \times \text{Attended} - 3 \times \text{Total}}{3} \right\rfloor$$

*Example*: If you have attended 20 out of 20 classes ($100\%$):
$$B = \left\lfloor \frac{4(20) - 3(20)}{3} \right\rfloor = \left\lfloor \frac{20}{3} \right\rfloor = 6 \text{ bunks}$$
*(After 6 bunks, attendance is $\frac{20}{26} = 76.92\% \ge 75\%$; bunking a 7th drops it to $74.07\%$)*.

### 2. Classes Needed for 75% (Recovery Requirement)
When your attendance is below $75\%$, the minimum consecutive classes $N$ you must attend without missing is:

$$\frac{\text{Attended} + N}{\text{Total} + N} \ge 0.75 \implies N = \left\lceil \frac{0.75 \times \text{Total} - \text{Attended}}{0.25} \right\rceil = \max(0, 3 \times \text{Total} - 4 \times \text{Attended})$$

*Example*: If you have attended 14 out of 20 classes ($70\%$):
$$N = 3(20) - 4(14) = 60 - 56 = 4 \text{ classes}$$
*(Attending 4 classes consecutively yields $\frac{18}{24} = 75.00\%$)*.

---

## 🚀 60-Second Setup Guide

### Step 1: Create Your Bot on Telegram
1. Open Telegram and search for [@BotFather](https://t.me/BotFather).
2. Send `/newbot`.
3. Give your bot a friendly name (e.g., `Sagar Attendance Advisor`) and a unique username ending in `bot` (e.g., `MySagarAttendanceBot`).
4. Copy the **HTTP API Token** provided by @BotFather.

### Step 2: Configure Your Token
Edit the `.env` file in this directory and paste your token:
```ini
TELEGRAM_BOT_TOKEN=123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
DEFAULT_TARGET_QUOTA=75.0
```

### Step 3: Run the Bot
```bash
python3 run_bot.py
```
Open Telegram, search for your bot username, and press **START**!

---

## 📱 Bot Commands & Plain-Text Natural Search

You can access any feature by typing the command with a slash (`/`) OR by **directly typing the plain word** in chat without any slash:

| Feature | Slash Command | Plain Words You Can Type | Description |
| :--- | :--- | :--- | :--- |
| **Attendance Dashboard** | `/attendance` | `attendance`, `att`, `haziri`, `meri attendance` | Overall & subject-wise progress bars |
| **Saved Bunks Advisor** | `/bunks` | `bunks`, `bunk`, `saved bunks`, `safe bunks` | Exactly how many lectures you can skip |
| **75% Recovery Goal** | `/recovery` | `recovery`, `75%`, `quota`, `goal`, `target` | Consecutive classes needed to reach 75% |
| **Class Schedule** | `/schedule`, `/timetable` | `timetable`, `schedule`, `time table`, `routine` | Weekly daily lecture schedule & rooms |
| **Exam Timetable** | `/examtimetable` | `exam timetable`, `exam schedule`, `exam date` | Theory & practical university exam dates |
| **Exam Hall Ticket** | `/hallticket` | `hall ticket`, `admit card`, `hallticket` | Exam clearance & admit card download status |
| **Exam Results** | `/result`, `/results` | `result`, `results`, `grade`, `marksheet` | Semester SGPA/CGPA & grade cards |
| **Internal Marks** | `/internalmarks` | `internal marks`, `internals`, `midsem` | Continuous evaluation & mid-term scores |
| **LMS / ITLE** | `/itle` | `itle`, `lms`, `assignment`, `assignments`, `notes` | MasterSoft ITLE e-learning & study files |
| **Fees Paid & Receipts** | `/fees` | `fees`, `fee`, `fees paid`, `receipt`, `challan` | All 5 fee receipts (Total: ₹1,07,400) |
| **Registered Subjects** | `/subjects` | `subjects`, `registered subjects`, `courses` | All 10 registered courses & faculty in charge |
| **Academic Calendar** | `/calendar` | `calendar`, `academic calendar`, `holidays` | Important college semester dates & breaks |
| **Student Profile** | `/profile` | `profile`, `my info`, `roll no`, `details` | Verified ERP profile (Priyanshu Singh) |
| **All Shortcuts Menu** | `/shortcuts`, `/menu` | `shortcuts`, `menu`, `help` | Interactive 1-tap grid for every feature |
| **What-If Simulator** | `/whatif <sub_name> <att> <bunk>` | `whatif`, `simulate` | Predict percentage before taking a day off |

---

## 🧪 Running the Automated Test Suite

A complete test suite is included to guarantee all math formulas and storage states function as expected:
```bash
python3 test_suite.py
```
Expected output:
```
Ran 8 tests in 0.004s
OK
```
