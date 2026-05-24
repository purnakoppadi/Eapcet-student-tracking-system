# 📊 EAPCET Student Tracking System (STS)

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-13AA52?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**A professional admission reporting and workflow management dashboard for real-world college counselling operations during EAPCET admission season.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Reference](#-api-endpoints) • [Demo](#-demo)

</div>

---

## 🎯 Problem Statement

During EAPCET (Engineering Agriculture and Pharmacy Common Entrance Test) admission season, colleges face significant operational challenges:

- ❌ **Scattered Student Data**: Student reporting status tracked manually across multiple platforms
- ❌ **Communication Gaps**: HOD and counselling staff unable to see real-time workflow status
- ❌ **Delayed Follow-ups**: Pending students not tracked systematically, causing missed admissions
- ❌ **No Analytics**: Unable to monitor branch-wise reporting progress or daily throughput
- ❌ **Manual Processing**: CSV uploads require manual processing without validation feedback
- ❌ **Low Visibility**: Counsellors work without centralized dashboard visibility

## ✨ Solution

**EAPCET Student Tracking System** provides a centralized, real-time dashboard that:

✅ Tracks student workflow through 4-step verification process  
✅ Provides real-time analytics and progress monitoring  
✅ Enables bulk CSV uploads with validation  
✅ Supports instant search and filtering capabilities  
✅ Generates actionable insights for HODs and staff  
✅ Maintains complete audit trail with timestamps  

---

## 🚀 Key Features

### 📈 Dashboard Analytics
- **Real-time Metrics**: Total, Pending, In Progress, and Completed student counts
- **Branch-wise Analytics**: CSE, AIML, CIC distribution and status breakdown
- **Daily Progress**: Track reporting desk throughput by step (Reported → Phone → Scan → Final)
- **Recent Activity**: Latest student workflow updates with timestamps
- **Hourly Chart**: Visual representation of admission workflow hourly progress

### 👥 Student Management
- **Comprehensive Table**: View all students with rank, name, branch, and workflow status
- **Real-time Search**: Filter students by rank number instantly
- **Branch Filtering**: View students by specific branch (CSE/AIML/CIC)
- **Workflow Status**: Clear visual indicators for each workflow step completion
- **Phone Details**: Display student and parent phone numbers with timestamps

### 🔄 Workflow Tracking
- **Step 1: Mark Arrived** - Student reported at help desk
- **Step 2: Phone Verification** - Capture student and parent phone numbers
- **Step 3: Document Scanning** - Documents scanned and verified
- **Step 4: Final Verification** - Complete workflow and mark as done
- **Status Auto-update**: Automatic status calculation (Pending → In Progress → Completed)

### 📤 CSV Upload System
- **Bulk Import**: Upload student records via CSV file
- **Format Validation**: Automatic validation of rank, name, and branch
- **Duplicate Detection**: Prevent duplicate student entries
- **Preview Before Import**: Review 5 sample rows before confirmation
- **Error Reporting**: Detailed rejection reasons for invalid records
- **Instant Refresh**: Dashboard updates immediately after successful upload

### 🎨 User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Theme toggle for comfortable viewing
- **Dark Theme**: Reduce eye strain during extended sessions
- **Accessible**: WCAG compliant with proper color contrast
- **Fast Loading**: Optimized performance with Vite build system

### 🔐 Data Management
- **MongoDB Integration**: Secure cloud-based database
- **Real-time Sync**: Instant updates across all user sessions
- **Timestamp Audit Trail**: Complete tracking of all workflow state changes
- **Data Persistence**: No data loss with proper error handling

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React.js** | 18.3.1 | UI component library |
| **Vite** | 6.0.3 | Fast build tool and dev server |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework |
| **Axios** | 1.7.9 | HTTP client for API requests |
| **React Router** | 7.1.1 | Client-side routing |
| **Lucide React** | 0.468.0 | Icon library |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | LTS | JavaScript runtime |
| **Express.js** | 5.1.0 | Web framework |
| **MongoDB Atlas** | Cloud | NoSQL database |
| **Mongoose** | 8.15.1 | MongoDB ODM |
| **Multer** | 1.4.5+ | File upload handling |
| **CORS** | Latest | Cross-origin support |

---

## 📁 Folder Structure

```
MERN Stack Project/
├── src/                           # Frontend source
│   ├── components/               # Reusable React components
│   │   ├── StudentTable.jsx      # Student list table
│   │   ├── Modal.jsx             # Reusable modal component
│   │   ├── PhoneDisplay.jsx      # Phone numbers display
│   │   ├── WorkflowBadge.jsx     # Workflow status badge
│   │   ├── StatusBadge.jsx       # Status indicator
│   │   ├── BranchBadge.jsx       # Branch label
│   │   ├── AnalyticsCard.jsx     # Analytics card component
│   │   ├── StatCard.jsx          # Statistics card
│   │   ├── SectionHeader.jsx     # Section title
│   │   └── ...                    # Other components
│   ├── pages/                    # Page components
│   │   ├── Dashboard.jsx         # Main dashboard
│   │   ├── Students.jsx          # Student management
│   │   ├── Analytics.jsx         # Analytics page
│   │   ├── Upload.jsx            # CSV upload page
│   │   └── Settings.jsx          # Settings page
│   ├── services/                 # API services
│   │   ├── api.js                # Axios configuration
│   │   ├── studentService.js     # Student API calls
│   │   ├── analyticsService.js   # Analytics API calls
│   │   └── uploadService.js      # Upload API calls
│   ├── context/                  # React Context
│   │   └── StudentContext.jsx    # Global student state
│   ├── layouts/                  # Layout components
│   │   └── DashboardLayout.jsx   # Main layout
│   ├── assets/                   # Static assets
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles
├── server/                        # Backend source
│   ├── models/                   # Database schemas
│   │   └── Student.js            # Student schema
│   ├── routes/                   # API routes
│   │   ├── studentRoutes.js      # Student endpoints
│   │   ├── analyticsRoutes.js    # Analytics endpoints
│   │   └── uploadRoutes.js       # Upload endpoints
│   ├── controllers/              # Business logic
│   │   ├── studentController.js  # Student logic
│   │   ├── analyticsController.js# Analytics logic
│   │   └── uploadController.js   # Upload logic
│   ├── middleware/               # Express middleware
│   │   ├── asyncHandler.js       # Async error handling
│   │   ├── errorMiddleware.js    # Global error handler
│   │   └── uploadMiddleware.js   # File upload middleware
│   ├── config/                   # Configuration
│   │   └── db.js                 # MongoDB connection
│   ├── utils/                    # Utility functions
│   │   └── AppError.js           # Custom error class
│   ├── app.js                    # Express app
│   ├── index.js                  # Server entry point
│   ├── .env                      # Environment variables
│   └── package.json              # Dependencies
├── .env                          # Frontend env variables
├── .env.example                  # Example env file
├── package.json                  # Frontend dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind configuration
└── README.md                     # This file
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** 16.0.0 or higher
- **npm** 8.0.0 or higher
- **MongoDB Atlas Account** (or local MongoDB)
- **Git** 2.0.0 or higher

### Clone Repository

```bash
git clone https://github.com/yourusername/eapcet-sts.git
cd eapcet-sts
```

### Frontend Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Create Environment File**
```bash
cp .env.example .env
```

3. **Configure `.env` File**
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Start Development Server**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to Server Directory**
```bash
cd server
```

2. **Install Dependencies**
```bash
npm install
```

3. **Create Environment File**
```bash
cp .env.example .env
```

4. **Configure `.env` File**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/studenttracker
PORT=5000
CLIENT_URL=http://localhost:5173
REPORTING_TIMEZONE=Asia/Kolkata
```

5. **Start Backend Server**
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

### MongoDB Setup

#### Option 1: MongoDB Atlas (Cloud)

1. **Create Cluster**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free account
   - Create new project
   - Create M0 (free) cluster
   - Wait 5-10 minutes for cluster to initialize

2. **Configure Network Access**
   - Go to Network Access
   - Click "Add IP Address"
   - Select "Allow from anywhere" (for development only)
   - Confirm

3. **Create Database User**
   - Go to Database Access
   - Click "Add New User"
   - Username: `your_db_user`
   - Password: `your_secure_password`
   - Click "Add User"

4. **Get Connection String**
   - Go to Databases → Cluster
   - Click "Connect"
   - Select "Drivers"
   - Copy connection string
   - Replace `<username>`, `<password>`, and `<cluster>`

5. **Update `.env`**
```env
MONGO_URI=mongodb+srv://your_db_user:your_secure_password@cluster0.xxx.mongodb.net/studenttracker?retryWrites=true&w=majority
```

#### Option 2: Local MongoDB

1. **Install MongoDB Community Edition**
   - macOS: `brew tap mongodb/brew && brew install mongodb-community`
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Linux: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB Service**
```bash
# macOS/Linux
brew services start mongodb-community

# Windows
mongod
```

3. **Update `.env`**
```env
MONGO_URI=mongodb://localhost:27017/studenttracker
```

---

## 📋 Environment Variables

### Frontend (`.env`)
```env
# API Base URL
VITE_API_URL=http://localhost:5000/api
```

### Backend (`.env`)
```env
# Database Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/studenttracker

# Server Configuration
PORT=5000

# CORS Settings
CLIENT_URL=http://localhost:5173

# Timezone for Analytics
REPORTING_TIMEZONE=Asia/Kolkata
```

---

## 📤 CSV Upload Format

### File Requirements
- **Format**: CSV (Comma-Separated Values)
- **Encoding**: UTF-8
- **Max Size**: 10 MB
- **Max Records**: 10,000 per file

### CSV Template

```csv
Rank,Name,Branch
1001,Rajesh Kumar,CSE
1002,Priya Singh,AIML
1003,Amit Patel,CIC
1004,Deepika Sharma,CSE
1005,Arjun Verma,AIML
```

### Column Requirements
| Column | Type | Rules | Example |
|--------|------|-------|---------|
| **Rank** | Number | 1-999999, unique | 1001 |
| **Name** | String | 1-100 characters | Rajesh Kumar |
| **Branch** | String | CSE, AIML, or CIC | CSE |

### Validation Rules
- ✅ Rank must be unique (no duplicates)
- ✅ Rank must be positive integer
- ✅ Name must not be empty
- ✅ Branch must be exactly CSE, AIML, or CIC
- ❌ Duplicate ranks are rejected
- ❌ Invalid branches are rejected
- ❌ Empty fields cause row rejection

### Sample CSV Download
A template file is available in the Upload page of the application.

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /health
```
**Response**: `200 OK`
```json
{
  "success": true,
  "message": "Student Tracking API is healthy."
}
```

### Student Endpoints

#### Get All Students
```
GET /students?limit=100&rank=1001&branch=CSE
```
**Query Parameters**:
- `limit`: Number of records (1-100, default: 10)
- `rank`: Filter by rank number (optional)
- `branch`: Filter by branch CSE/AIML/CIC (optional)
- `page`: Page number (optional)

**Response**: `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "rank": 1001,
      "name": "Rajesh Kumar",
      "branch": "CSE",
      "reported": true,
      "reportedTime": "2026-05-24T10:05:00Z",
      "studentPhone": "9876543210",
      "parentPhone": "9123456780",
      "phoneStep": true,
      "phoneStepTime": "2026-05-24T10:15:00Z",
      "scanningStep": false,
      "scanningStepTime": null,
      "finalVerification": false,
      "finalVerificationTime": null,
      "status": "In Progress",
      "createdAt": "2026-05-24T10:05:00Z",
      "updatedAt": "2026-05-24T10:15:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 100,
    "pages": 2
  }
}
```

#### Mark Student Reported
```
PATCH /students/:id/reported
```
**Response**: `200 OK` - Updated student object

#### Phone Verification Step
```
PATCH /students/:id/phone
```
**Body**:
```json
{
  "studentPhone": "9876543210",
  "parentPhone": "9123456780"
}
```
**Response**: `200 OK` - Updated student object

#### Scanning Step
```
PATCH /students/:id/scanning
```
**Response**: `200 OK` - Updated student object

#### Final Verification
```
PATCH /students/:id/final
```
**Response**: `200 OK` - Updated student object

### Analytics Endpoints

#### Dashboard Metrics
```
GET /analytics/dashboard
```
**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "total": 150,
    "pending": 45,
    "inProgress": 60,
    "completed": 45
  }
}
```

#### Branch Analytics
```
GET /analytics/branches
```
**Response**: `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "branch": "CSE",
      "total": 50,
      "pending": 15,
      "inProgress": 20,
      "completed": 15
    },
    {
      "branch": "AIML",
      "total": 50,
      "pending": 15,
      "inProgress": 20,
      "completed": 15
    },
    {
      "branch": "CIC",
      "total": 50,
      "pending": 15,
      "inProgress": 20,
      "completed": 15
    }
  ]
}
```

#### Progress Analytics
```
GET /analytics/progress
```
**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "daily": {
      "reported": 15,
      "phone": 12,
      "scan": 8,
      "final": 5
    },
    "hourlyProgress": [
      { "hour": 10, "reported": 3, "completed": 1 },
      { "hour": 11, "reported": 5, "completed": 2 }
    ],
    "recentStudents": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Rajesh Kumar",
        "branch": "CSE",
        "updatedAt": "2026-05-24T10:15:00Z"
      }
    ]
  }
}
```

### Upload Endpoint

#### Upload CSV
```
POST /upload
```
**Content-Type**: `multipart/form-data`

**Body**: Form data with file field
```
file: <CSV file>
```

**Response**: `201 Created`
```json
{
  "success": true,
  "message": "CSV processing completed.",
  "data": {
    "rowsReceived": 10,
    "inserted": 10,
    "rejected": 0,
    "errors": []
  }
}
```

**Error Response**: `400 Bad Request`
```json
{
  "success": false,
  "message": "Student phone and parent phone are required.",
  "errors": [
    { "row": 5, "reason": "Rank already exists." }
  ]
}
```

---

## 📊 Database Schema

### Student Model

```javascript
{
  // Student Information
  rank: Number (required, unique),              // 1-999999
  name: String (required),                      // Student name
  branch: String (required, enum),              // CSE, AIML, CIC
  
  // Workflow Steps
  reported: Boolean (default: false),           // Step 1 complete
  reportedTime: Date (default: null),          // When reported
  
  studentPhone: String (default: ''),           // Step 2 data
  parentPhone: String (default: ''),            // Step 2 data
  phoneStep: Boolean (default: false),          // Step 2 complete
  phoneStepTime: Date (default: null),         // When completed
  
  scanningStep: Boolean (default: false),       // Step 3 complete
  scanningStepTime: Date (default: null),      // When completed
  
  finalVerification: Boolean (default: false),  // Step 4 complete
  finalVerificationTime: Date (default: null), // When completed
  
  // Status
  status: String (enum),                        // Pending, In Progress, Completed
  
  // Audit Trail
  createdAt: Date (auto),                       // Record creation time
  updatedAt: Date (auto)                        // Last modification time
}
```

### Status Auto-Calculation

| Condition | Status |
|-----------|--------|
| No steps complete | Pending |
| Any step complete (not final) | In Progress |
| Final verification complete | Completed |

---

## 📱 Pages Overview

### 🏠 Dashboard
**Purpose**: Real-time overview of admission workflow  
**Components**:
- Status cards (Total, Pending, In Progress, Completed)
- Branch analytics with completion percentages
- Daily progress showing throughput by step
- Recent activity feed with latest updates

**Use Case**: HOD monitoring daily progress and identifying bottlenecks

### 👥 Students
**Purpose**: Manage individual student workflows  
**Features**:
- Complete student table with all workflow info
- Real-time search by rank
- Branch filtering
- One-click workflow step buttons
- Phone verification modal
- Instant table refresh after updates

**Use Case**: Counselling staff processing students through workflow steps

### 📈 Analytics
**Purpose**: Detailed analysis of workflow metrics  
**Components**:
- Overall statistics (Allotted, Pending, Completed)
- Branch-wise performance cards
- Hourly progress visualization
- Daily milestone summary

**Use Case**: Management reviewing admission performance and trends

### 📤 Upload
**Purpose**: Bulk import student records  
**Features**:
- Drag-and-drop file upload
- CSV validation and preview
- Duplicate detection
- Error reporting
- Immediate dashboard refresh

**Use Case**: Initial student record batch import at admission season start

### ⚙️ Settings
**Purpose**: Application configuration  
**Features**:
- Theme toggle (Dark/Light mode)
- Timezone settings
- Preferences storage

**Use Case**: User comfort and preference management

---

## 🔄 Workflow Explanation

### 4-Step Verification Process

#### Step 1️⃣: Mark Reported
**Action**: Student arrives at help desk
- Click "Mark Arrived" button
- System records `reported: true` and current timestamp
- Status changes from **Pending** to **In Progress**

#### Step 2️⃣: Phone Verification
**Action**: Capture contact details
- Click "Phone Step" button
- Modal opens for phone number entry
- Enter student phone and parent phone
- System records both numbers and timestamp
- Enables "Scan Complete" button

#### Step 3️⃣: Document Scanning
**Action**: Student documents are scanned
- Click "Scan Complete" button
- System records scanning completion time
- Prepares for final verification

#### Step 4️⃣: Final Verification
**Action**: Complete admission process
- Click "Final Verify" button
- System records final verification time
- Status changes to **Completed**
- Student removed from pending queue

### Status Tracking

```
┌─────────────┐
│   PENDING   │  Initial state, no workflow steps
└──────┬──────┘
       │ Mark Arrived
       ↓
┌──────────────────┐
│   IN PROGRESS    │  Any step started
└──────┬───────────┘
       │ Phone Step → Scan → Final Verify
       ↓
┌──────────────────┐
│   COMPLETED      │  All steps finished
└──────────────────┘
```

---

## 🎨 Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)
*Real-time metrics, branch analytics, daily progress, and recent activity*

### Student Management
![Students](./screenshots/students.png)
*Complete student table with workflow tracking and bulk actions*

### Phone Verification Modal
![Phone Modal](./screenshots/phone-modal.png)
*Easy-to-use form for capturing contact details*

### CSV Upload
![Upload](./screenshots/upload.png)
*Drag-and-drop upload with preview and validation*

### Analytics
![Analytics](./screenshots/analytics.png)
*Hourly progress visualization and performance metrics*

### Dark Mode
![Dark Mode](./screenshots/dark-mode.png)
*Eye-friendly dark theme for extended usage*

---

## 🎯 Performance Optimization

### Frontend
- **Lazy Loading**: Components load on-demand
- **Code Splitting**: Vite handles automatic chunking
- **CSS Optimization**: Tailwind purges unused styles
- **Image Optimization**: Minimal assets, SVG icons
- **Debouncing**: Search and filter operations debounced (250ms)

### Backend
- **Database Indexing**: Rank field indexed for fast searches
- **Aggregation Pipeline**: Analytics use MongoDB aggregation for efficiency
- **Connection Pooling**: MongoDB maintains connection pool
- **Async Processing**: Non-blocking operations throughout
- **Error Handling**: Graceful error recovery

### Caching Strategy
- Client-side state management with React Context
- Automatic refresh after mutations
- No unnecessary API calls

---

## 🔒 Security Features

- ✅ **CORS Configuration**: Restricted to frontend origin only
- ✅ **Input Validation**: All inputs validated server-side
- ✅ **Error Handling**: Generic error messages (no info leakage)
- ✅ **Database Security**: MongoDB Atlas with network restrictions
- ✅ **Environment Variables**: Sensitive data never in code
- ✅ **SQL Injection Safe**: Using Mongoose ODM prevents injection

---

## 🚀 Deployment

### Deployment Checklist

- [ ] Review `.env` variables (use production values)
- [ ] Test all features in staging environment
- [ ] Run performance tests
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry recommended)
- [ ] Set up automated backups for MongoDB
- [ ] Test disaster recovery procedures

### Frontend Deployment (Vercel)

1. **Build Optimized Version**
```bash
npm run build
```

2. **Deploy to Vercel**
```bash
npm install -g vercel
vercel --prod
```

3. **Configure Environment**
   - Set `VITE_API_URL` in Vercel project settings
   - Point to production backend API

### Backend Deployment (Heroku/Railway)

1. **Build Production Package**
```bash
cd server
npm install --production
```

2. **Deploy**
```bash
# Using Heroku
heroku create your-app-name
git push heroku main

# Using Railway
railway link
railway up
```

3. **Set Environment Variables**
   - `MONGO_URI`: Production MongoDB connection
   - `PORT`: Assigned by platform
   - `CLIENT_URL`: Production frontend URL
   - `REPORTING_TIMEZONE`: Keep as Asia/Kolkata

### Alternative: Docker Deployment

**Dockerfile** (Backend)
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

**docker-compose.yml**
```yaml
version: '3.8'

services:
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=${MONGO_URI}
      - PORT=5000
      - CLIENT_URL=${CLIENT_URL}
    
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=${VITE_API_URL}
```

---

## 📚 Future Improvements

### Planned Features
- 🔐 **User Authentication**: Login/signup for staff members
- 👥 **Role-Based Access**: Admin, HOD, Counsellor roles
- 📧 **Email Notifications**: Automated follow-up emails
- 📱 **SMS Alerts**: Send SMS to pending students
- 📊 **Advanced Reports**: PDF export of analytics
- 🔍 **Advanced Search**: Multi-field search and filters
- ⏰ **Task Reminders**: Automated reminders for pending tasks
- 🌐 **Multi-branch Support**: Manage multiple colleges
- 📞 **Call Log Integration**: Link phone calls to students
- 🔔 **Push Notifications**: In-app notifications for updates
- 📧 **Bulk Email**: Send emails to filtered student groups
- 🎓 **Student Portal**: Self-service status check for students

### Tech Improvements
- Unit and integration testing (Jest, Supertest)
- E2E testing (Playwright)
- CI/CD pipeline (GitHub Actions)
- Performance monitoring (New Relic)
- Error tracking (Sentry)
- Real-time updates (WebSockets)
- Service worker for offline capability

---

## 🐛 Troubleshooting

### Frontend Issues

**Issue**: `VITE_API_URL is undefined`
- **Solution**: Ensure `.env` file exists in project root with `VITE_API_URL=http://localhost:5000/api`

**Issue**: API calls returning 404
- **Solution**: Verify backend is running on `localhost:5000` and MongoDB is connected

**Issue**: CORS error
- **Solution**: Check `CLIENT_URL` in backend `.env` matches your frontend URL

### Backend Issues

**Issue**: `Cannot connect to MongoDB`
- **Solution**: Verify `MONGO_URI` in `.env` and check MongoDB Atlas IP whitelist

**Issue**: File upload failing
- **Solution**: Ensure `/server/uploads` directory exists or is created by Multer

**Issue**: Port 5000 already in use
- **Solution**: Change PORT in `.env` or kill existing process: `lsof -i :5000` (Mac/Linux)

---

## 📖 Learning Resources

### Frontend Learning
- [React Official Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

### Backend Learning
- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Guide](https://mongoosejs.com)
- [Node.js Best Practices](https://nodejs.org/en/docs/)

### Project Concepts
- [REST API Design](https://restfulapi.net)
- [MERN Stack Tutorial](https://www.mongodb.com/developer/languages/javascript/mern-stack-tutorial/)
- [Web Application Architecture](https://en.wikipedia.org/wiki/Web_application_architecture)

---

## 👨‍💻 Author

**Your Name**  
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- Portfolio: [your-portfolio.com](https://your-portfolio.com)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
✅ **Permissions**: Commercial use, distribution, modification, private use  
❌ **Limitations**: Liability, warranty  
📌 **Conditions**: License and copyright notice required  

---

## 🙏 Acknowledgments

- **MongoDB** for reliable cloud database
- **Vite** for lightning-fast development experience
- **Tailwind CSS** for beautiful styling
- **React** community for amazing tools and libraries
- **Express.js** for robust backend framework

---

## 📞 Support

### Getting Help
- 📧 Email: support@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/eapcet-sts/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/eapcet-sts/discussions)
- 📖 Documentation: [Full Docs](./docs/)

### Quick Links
- [Installation Guide](#-installation)
- [API Reference](#-api-endpoints)
- [CSV Format](## -csv-upload-format)
- [Troubleshooting](#-troubleshooting)

---

<div align="center">

### ⭐ If this project helped you, please consider giving it a star! ⭐

**[View on GitHub](https://github.com/yourusername/eapcet-sts)** • **[Live Demo](https://eapcet-sts.vercel.app)**

</div>

---

**Last Updated**: May 24, 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
