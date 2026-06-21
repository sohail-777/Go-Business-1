# Go Business   -1

Full-stack referral dashboard: **React (frontend, port 3005)** + **Node.js / Express (backend, port 5005)**.

frontend
- React application used in production.

backend
- Mock Express API used for local development and testing.
- Replicates the authentication and referrals endpoints provided by the assessment.
- The deployed application uses the assessment-provided AWS APIs.

# Overview

The Go Business Referral Dashboard is a responsive web application designed to help users manage and track referral activity efficiently. The platform provides a centralized dashboard where users can monitor referral performance, earnings, partner activity, and referral statistics in real time.

The application includes secure authentication, referral management features, search and sorting capabilities, client-side pagination, referral sharing functionality, and detailed referral views.

# Features

Authentication
Secure user login using JWT authentication
Protected routes accessible only to authenticated users
Automatic redirection based on authentication status
Secure logout functionality
Dashboard
Overview metrics displaying referral performance
Service summary section with referral statistics
Referral link and referral code sharing
Copy-to-clipboard functionality
Referral Management
Search referrals by partner name or service
Sort referrals by date (Newest First / Oldest First)
Client-side pagination (10 records per page)
Detailed referral information page
Responsive and user-friendly interface
Error Handling
Authentication error handling
API failure handling
Loading states
Custom 404 Not Found page

# Tech Stack

Frontend
React.js
React Router DOM
Axios
React Icons
CSS3
Referrals API

## 1. folder Structure

go-business/
├── backend/              Express API server
│   ├── server.js         Routes: /api/auth/signin, /api/referrals
│   ├── data.js           Mock metrics / serviceSummary / referral / referrals
│   └── package.json
└── frontend/             React app (Vite)
    ├── src/
    │   ├── App.jsx           Routes (wrapped in BrowserRouter)
    │   ├── main.jsx          Renders <App/> only
    │   ├── pages/            Login, Dashboard, ReferralDetail, NotFound
    │   ├── components/       Navbar, Footer
    │   ├── api/client.js     fetch helpers
    │   └── utils/format.js   date/currency formatting
    ├── index.html
    ├── vite.config.js        dev server on port 3005
    └── package.json


## 2. Requirements

 Node.js 18+ and npm installed on your machine.
 A code editor (VS Code recommended).

## 3. Pages

1. Login Page
Secure user authentication interface

2. Dashboard
Referral overview metrics
Service summary
Referral sharing
Search, sorting, and pagination

3. Referral Details
Detailed information for individual referrals

4. Not Found Page
Custom 404 error page

## 4. Run the app


cd backend
npm start

You should see: `Go Business backend running on http://localhost:5005`


cd frontend
npm run dev

Open **http://localhost:3005** .

## 5. Log in

Use the test credentials from the assessment document:

Email: `admin@example.com`
Password: `admin123`

# Author

Shaik Sohail Ahmmad

A Simple project including API integration, routing, authentication, state management, and responsive UI development.