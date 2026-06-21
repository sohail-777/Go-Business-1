import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span className="footer-brand">Go Business</span>
      <nav aria-label="Footer" className="footer-nav">
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
      </nav>
      <p>
        &copy; 2024 Go Business. Inc
      </p>
    </footer>
  );
}
