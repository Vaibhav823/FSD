import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const linkClass = (to) =>
    `px-4 py-2 rounded font-semibold transition ${
      pathname === to
        ? "bg-white text-purple-700 shadow"
        : "text-white hover:bg-white/30"
    }`;

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-700 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="text-2xl font-black text-white tracking-wider">
          PrepGenius
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/questions" className={linkClass("/questions")}>Questions</Link>
          <Link to="/profile" className={linkClass("/profile")}>Profile</Link>
          <Link to="/contact" className={linkClass("/contact")}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}