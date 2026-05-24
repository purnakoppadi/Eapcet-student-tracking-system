# Student Tracking System API

Express and MongoDB API for EAPCET counselling reporting workflow.

## Setup

1. Set values in `.env`, replacing `YOUR_PASSWORD` in the MongoDB Atlas URI. Keep `REPORTING_TIMEZONE=Asia/Kolkata` for EAPCET daily analytics.
2. Install packages with `npm install`.
3. Start development mode with `npm run dev`.

The API listens on `http://localhost:5000` by default.

The frontend reads `VITE_API_URL` from its root `.env` file. Use `VITE_API_URL=http://localhost:5000/api` for local development.

## Student Endpoints

```text
GET    /api/students?page=1&limit=10&branch=CSE&rank=1234&sortBy=rank&order=asc
GET    /api/students/:id
POST   /api/students
PUT    /api/students/:id
DELETE /api/students/:id

PATCH  /api/students/:id/reported
PATCH  /api/students/:id/phone
PATCH  /api/students/:id/scanning
PATCH  /api/students/:id/final
```

Phone step body:

```json
{
  "studentPhone": "9876543210",
  "parentPhone": "9876543211"
}
```

Workflow transitions must be completed in order. Status is recalculated automatically as `Pending`, `In Progress`, or `Completed`.

## CSV Upload

Send `multipart/form-data` to `POST /api/upload` with a file field named `file`.

```csv
Rank,Name,Branch
1234,Student Name,CSE
```

Only `CSE`, `AIML`, and `CIC` are accepted. Duplicate ranks in MongoDB or within the file are rejected and reported in the response.

## Analytics

```text
GET /api/analytics/dashboard
GET /api/analytics/branches
GET /api/analytics/progress
```
