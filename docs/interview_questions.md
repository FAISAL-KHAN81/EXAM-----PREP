# 🎓 Interview Preparation Guide: Exam Prep Portal

This guide contains key technical interview questions and answers tailored to the architecture, features, bug fixes, and security implementations of your **Exam Prep Portal**.

---

## 📁 1. Frontend & React Specific Questions

### Q1: In `Getexams.jsx`, there was a bug where the student's exam answers submitted as blank or outdated when a tab-switch or copy-paste violation triggered auto-submission. How did you resolve this React closure issue?
* **Answer**: 
  The issue was caused by a **React State Closure (stale closure)** inside the window event listeners (`blur`, `visibilitychange`). When these event listeners were registered inside `useEffect` during mounting, they captured the initial empty state of the `answers` array. When a violation triggered, the listener executed the submission function using that stale state instead of the current answers.
  
  We resolved this by utilizing a React **`useRef`** hook. Unlike state, a ref container holds a mutable `.current` property that always points to the latest reference. We created a ref (`const answersRef = useRef(answers);`) and updated it on every state change using a `useEffect` hook. In the event listeners, we referenced `answersRef.current` rather than the state variable, ensuring the most up-to-date answers are always submitted.

### Q2: Why did you choose React Router v7 for routing, and how did you implement security guards for unauthorized users trying to access `/admindashboard`?
* **Answer**: 
  React Router v7 was chosen for efficient client-side routing, nested layouts (parent dashboard templates wrapping child modules), and programmatic navigation.
  
  To secure the admin dashboard, we implemented a routing gate inside the parent [AdminDashboard.jsx](file:///C:/Users/faisal/.gemini/antigravity/worktrees/ExamPrep/full-project-audit-stabilization/client/src/pages/admin/AdminDashboard.jsx) component. Before rendering the dashboard layout, we inspect `localStorage` for `adminRole` and `adminId`. If these values are missing or `adminRole !== 'admin'`, we block layout rendering and immediately redirect the user to `/adminlogin` using `useNavigate()`.

### Q3: How did you implement session persistency ("Keep Login") for both Admin and Student logins?
* **Answer**: 
  We utilized `useEffect` hooks in both the student login ([Login.jsx](file:///C:/Users/faisal/.gemini/antigravity/worktrees/ExamPrep/full-project-audit-stabilization/client/src/pages/Login.jsx)) and admin login ([AdminLogin.jsx](file:///C:/Users/faisal/.gemini/antigravity/worktrees/ExamPrep/full-project-audit-stabilization/client/src/pages/admin/AdminLogin.jsx)) screens. Upon mounting, these components check if valid session credentials (`userId` and `userRole` for students, `adminId` and `adminRole` for admins) are present in the browser's `localStorage`. If the keys exist, the login screen automatically redirects the user to their respective dashboard, bypassing the login form.

---

## 🗄️ 2. Backend & Database (Node.js, Express, MongoDB)

### Q4: In Mongoose, what is an "unawaited `.save()` race condition," and what bugs did it cause in the original backend code?
* **Answer**: 
  An unawaited `.save()` happens when a database save operation is triggered without using the `await` keyword in an asynchronous route handler. The JavaScript engine starts the database save operation, but immediately proceeds to send the HTTP response (e.g., `res.status(200).json(...)`) before the database actually finishes writing the record.
  
  In the original codebase, this caused multiple bugs:
  1. **Race Conditions**: Subsequent requests (like fetching the newly created session or subject) would return empty because the database write was still in progress.
  2. **Silenced Errors**: If a database validation failed or unique key constraint was violated (e.g., duplicate examinee email), the backend would still return a successful HTTP status to the client, leading to broken states. We resolved this by placing the `await` keyword before every `.save()` call and wrapping them in robust try-catch blocks.

### Q5: How does the "Declare Result" workflow operate in the database, and why did you modify the student results API query from `findOne()` to `find()`?
* **Answer**: 
  The "Declare Result" workflow changes the visibility of exam attempts. In the database, the `ExamAttempted` schema contains a boolean property (e.g., `status` or `isDeclared`). Clicking "Declare" calls `/api/exams/result/:id` to update this field.
  
  The original student results API `/examinee-result/:id` was using Mongoose's `findOne()`, which only returns a single record (the very first attempt). If a student attempted multiple exams or had historical exam records, they could only view the result of their first attempt. By changing the query to `find()`, the endpoint returns a list of **all attempts** made by the student.

---

## 🛡️ 3. Security & Anti-Cheat System

### Q6: How does the front-end anti-cheat system detect when a student is switching tabs or opening a search browser during an active test?
* **Answer**: 
  The anti-cheat mechanism hooks into browser focus and visibility APIs:
  - **`window.onblur`**: Fires when the browser window loses focus (e.g., clicking another app or opening inspect tools).
  - **`document.onvisibilitychange`**: Fires when the document visibility state changes (e.g., switching browser tabs, minimizing the window).
  
  When either of these events is captured, the app increments a warning counter. If the student violates the limit, the system alerts the student, halts the exam timer, collects the current progress from `answersRef.current`, and immediately invokes the auto-submit API to terminate the exam.

### Q7: How do you prevent students from right-clicking or copying questions from the exam screen to paste them online?
* **Answer**: 
  We register global event listeners inside the exam player component:
  1. **`contextmenu`**: Intercepts the mouse right-click and calls `e.preventDefault()`, which completely disables the browser's context menu.
  2. **`keydown`**: Intercepts specific key combinations like `Ctrl+C`, `Ctrl+V`, `Ctrl+X`, and `Cmd+C`. If detected, it calls `e.preventDefault()`, blocking the copy-paste action.

---

## ⚡ 4. Code Architecture & UX Optimization

### Q8: The original Subject Edit page was returning a 404 Not Found error when updating subjects. What was the root cause, and how was it solved?
* **Answer**: 
  The React frontend in `Subject.jsx` was sending its PUT request to the root API endpoint `http://localhost:5000/api/subject` without attaching the subject's unique identifier. The backend router was configured to expect `PUT /api/subject/:id`.
  
  We resolved this by extracting the subject ID (`id.id` from the editing state) and correcting the Axios call path to:
  ```javascript
  await axios.put(`http://localhost:5000/api/subject/${id.id}`, form);
  ```

### Q9: The student registration page is mapped to specific "Sessions". How did you ensure data integrity so students cannot register for invalid or non-existent sessions?
* **Answer**: 
  Instead of letting students type in arbitrary session text (which could cause typos and prevent exam matching), we modified the registration form to retrieve active sessions directly from the backend database. We populated a `<select>` dropdown menu with database records. This guarantees that every registered student is mapped to a valid, pre-existing session ID in the database.
