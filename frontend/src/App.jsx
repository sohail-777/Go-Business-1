import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ReferralDetail from "./pages/ReferralDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

function ProtectedRoute({ children }) {
  const token = Cookies.get("jwt_token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicOnlyRoute({ children }) {
  const token = Cookies.get("jwt_token");
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/referrals"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/referral/:id"
          element={
            <ProtectedRoute>
              <ReferralDetail />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
