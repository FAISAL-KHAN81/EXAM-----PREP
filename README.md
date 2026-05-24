# 📝 Exam Prep Portal

A modern, highly secure, and feature-rich **Online Examination & Preparation System** built using the MERN stack (MongoDB, Express, React, Node.js). 

This portal provides educational institutions with a comprehensive dashboard to manage sessions, subjects, students, question banks, and examinations. It features an advanced **anti-cheat security mechanism** for students during tests.

---

## 🚀 Key Features

### 👑 Admin Panel
- **Session Management**: Create, view, and organize academic sessions.
- **Subject Management**: Categorize questions and exams by subject dynamically.
- **Student Database**: Manage student enrollment, academic credentials, and session mappings.
- **Question Bank**: Formulate multiple-choice questions (MCQs) with options, correct answers, and subject mappings.
- **Exam Builder**: Set up custom exams with specific durations, total marks, pass marks, and automatic question count distribution.
- **Report & Grading Center**: View student exam attempts, total correct answers, percentage scores, and selectively **Declare Results** to release scores.

### 🎓 Student (Examinee) Portal
- **Dashboard**: Track available exams, completed exams, and grades.
- **Smart Exam Filtering**: Only view exams matching the student's registered session.
- **Security-First Exam Interface**:
  - **Strict Anti-Cheat Gates**: Detects tab-switching, screen minimization, or window defocus. Warns the student and automatically submits the test on violation.
  - **Copy-Paste Block**: Restricts right-clicks, copying questions, and pasting answers.
  - **Auto-Submission Timer**: Dynamic, accurate countdown clock with an automatic submit trigger upon expiration.
- **Grading & Feedback**: Detailed attempt scores and pass/fail indicators released only after admin declaration.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | High-speed, component-driven UI |
| **Backend** | Node.js + Express | RESTful API architecture |
| **Database** | MongoDB + Mongoose | Schema validation and fast data querying |
| **Routing** | React Router v7 | Seamless client-side routing & page guards |
| **HTTP Client** | Axios | Backend endpoint communication |
| **Icons** | Font Awesome 6.5.1 | Premium dashboard icons & visual indicators |

---

## 📁 Directory Structure

```text
ExamPrep/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── assets/         # Images & static assets
│   │   ├── pages/          # Application views & pages
│   │   │   ├── admin/      # Admin modules (Subject, Session, Exam, etc.)
│   │   │   └── user/       # Student dashboard & examination interface
│   │   ├── App.jsx         # Routes definition
│   │   └── main.jsx        # App bootstrapper
│   └── vite.config.js      # Vite compilation configs
│
└── server/                 # Backend Node-Express application
    ├── models/             # Mongoose schemas (Admin, Examinee, Exam, etc.)
    ├── routes/             # REST endpoints (auth, exams, subjects, etc.)
    └── index.js            # Server entry point
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or on MongoDB Atlas

### 1. Database Setup
Ensure MongoDB is running locally at `mongodb://localhost:27017/examprep` or configure your remote URI in the environment variables.

### 2. Backend Setup
1. Open a terminal and navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (optional, fallbacks exist):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/examprep
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at `http://localhost:5173`.

---

## 🔐 Credentials & Testing (Default Seed)
If you are running the project for the first time, you can log in with the default admin account:
- **Admin Login Link**: `http://localhost:5173/adminlogin`
- **Email**: `admin@gmail.com`
- **Password**: `123`

---

## 🛡️ Anti-Cheat & Security Details
- **Focus Events**: The system monitors `window.onblur` and `document.onvisibilitychange`. If a student attempts to open another tab to look up answers, the test shows an immediate warning and auto-submits.
- **Keyboard & Mouse Events**: Right-clicking and shortcuts like `Ctrl+C` / `Ctrl+V` are globally intercepted and disabled inside the test player to maintain exam integrity.
- **Route Protection**: The Admin Panel dashboard is fully guarded. Attempting to bypass login by directly entering admin URLs will redirect unauthorized guests back to `/adminlogin`.
