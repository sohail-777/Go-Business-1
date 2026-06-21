import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { signIn } from "../api/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const responseJson = await signIn(email, password);
      const token = responseJson.data.token;
      Cookies.set("jwt_token", token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="brand-title">Go Business</h1>
        <p className="login-tagline">Sign in to open your referral dashboard.</p>

        {error && <p className="login-error" role="alert">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder=".........."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
