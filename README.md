# 📊 EAPCET Student Tracking System (STS)

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-13AA52?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?logo=vite&logoColor=white)

### Admission Reporting & Workflow Management Dashboard

A MERN Stack application designed to manage and monitor EAPCET admission reporting workflow in colleges.

</div>

---

# 🎯 Problem Statement

During EAPCET admission counselling, colleges often face challenges in managing student reporting workflow manually.

Common problems include:

- Difficulty tracking student reporting status
- No centralized dashboard for staff and HODs
- Delayed follow-up with pending students
- Lack of branch-wise analytics
- Manual handling of student data
- No real-time workflow visibility

---

# ✨ Solution

The **EAPCET Student Tracking System (STS)** provides a centralized dashboard to:

✅ Track student workflow in real-time  
✅ Manage admission reporting process  
✅ Upload students using CSV files  
✅ Monitor analytics and progress  
✅ Search and filter student records  
✅ Store workflow data securely in MongoDB  

---

# 🎓 Real-World Use Case

This project is inspired by real EAPCET admission counselling operations where colleges need a centralized dashboard to monitor student reporting workflow and admission progress.

---

# 🚀 Features

## 📈 Dashboard Analytics
- Total Students Count
- Pending Students
- In Progress Students
- Completed Students
- Branch-wise Analytics
- Daily Progress Tracking

---

## 👥 Student Management
- Student Workflow Table
- Search by Rank
- Branch Filter
- Workflow Status Tracking
- Phone Number Management

---

## 🔄 Workflow Steps

### 1️⃣ Reported
Student arrives at reporting desk.

### 2️⃣ Phone Step
Store student and parent phone numbers.

### 3️⃣ Scanning Step
Documents verified and scanned.

### 4️⃣ Final Verification
Admission workflow completed.

---

## 📤 CSV Upload System
- Bulk Student Upload
- CSV Validation
- Duplicate Detection
- Upload Preview
- Error Handling

---

## 🎨 User Interface
- Responsive Dashboard
- Dark/Light Mode
- Modern UI Design
- Mobile-Friendly Layout

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer
- CSV Parser

---

# 📁 Project Structure

```bash
MERN Stack Project/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── layouts/
│   ├── context/
│   └── assets/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   └── utils/
│
└── README.md
# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/purnakoppadi/eapcet-sts.git
cd eapcet-sts

💻 Frontend Setup
Install Dependencies
npm install
Run Frontend
npm run dev

Frontend runs on:

http://localhost:5173
🖥 Backend Setup
Navigate to Server Folder
cd server
Install Dependencies
npm install
Create .env File
MONGO_URI=your_mongodb_connection_string
PORT=5000
CLIENT_URL=http://localhost:5173
Run Backend
npm run dev

Backend runs on:

http://localhost:5000
🍃 MongoDB Setup
Create MongoDB Atlas account
Create Cluster
Add Network Access IP
Create Database User
Copy Connection String
Add connection string to .env

Example:

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/studenttracker
📤 CSV Upload Format
Rank,Name,Branch
1001,Rajesh,CSE
1002,Priya,AIML
1003,Aman,CIC
🔌 API Endpoints
Student APIs
Method	Endpoint	Description
GET	/api/students	Get all students
POST	/api/students	Add student
PUT	/api/students/:id	Update student
DELETE	/api/students/:id	Delete student
Workflow APIs
Method	Endpoint	Description
PATCH	/api/students/:id/reported	Mark Reported
PATCH	/api/students/:id/phone	Save Phone Details
PATCH	/api/students/:id/scanning	Mark Scan Complete
PATCH	/api/students/:id/final	Final Verification
Analytics APIs
Method	Endpoint	Description
GET	/api/analytics/dashboard	Dashboard Analytics
GET	/api/analytics/branches	Branch Analytics
🗄 Database Schema
{
  rank,
  name,
  branch,

  reported,
  reportedTime,

  studentPhone,
  parentPhone,

  phoneStep,
  phoneStepTime,

  scanningStep,
  scanningStepTime,

  finalVerification,
  finalVerificationTime,

  status
}
🔄 Workflow Logic
Condition	Status
No steps completed	Pending
Partial steps completed	In Progress
All steps completed	Completed
📱 Pages
Dashboard
Analytics Cards
Daily Progress
Recent Activity
Students
Student Table
Search
Filters
Workflow Buttons
Analytics
Branch Analytics
Workflow Statistics
Upload
CSV Upload
Preview Data
Settings
Theme Toggle
Preferences
📸 Screenshots

Add screenshots here:

/screenshots/dashboard.png
/screenshots/students.png
/screenshots/upload.png
/screenshots/analytics.png
🚀 Deployment
Frontend Deployment
Vercel
Backend Deployment
Render
Database
MongoDB Atlas
🔮 Future Improvements
Authentication System
Role-Based Access
SMS Notifications
Email Notifications
PDF Reports
Advanced Analytics
👨‍💻 Author

Purna Koppadi

GitHub:
https://github.com/purnakoppadi

📄 Project Status

✅ Frontend Completed
✅ Backend Completed
✅ MongoDB Integrated
✅ CSV Upload Working
✅ Workflow Tracking Working
✅ Analytics Dashboard Working

📌 Note

This project was developed for internship assessment and educational purposes.

<div align="center">
⭐ If you like this project, consider giving it a star ⭐
</div> ```
