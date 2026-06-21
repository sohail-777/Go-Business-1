import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    Cookies.remove("jwt_token");
    navigate("/login");
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand" aria-label="Go to dashboard home">
        Go Business
      </Link>
      <nav aria-label="Primary" className="navbar-actions">
        <Link to="/" className="btn-pill">
          Try for free
        </Link>
        <Link to="/" style={{ display: "none" }}>
          Home
        </Link>
        <button onClick={handleLogout} className="btn-logout">
          Log out
        </button>
      </nav>
    </header>
  );
}
