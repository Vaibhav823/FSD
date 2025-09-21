import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../slices/authSlice";

export default function Navbar() {
  const isLoggedIn = !!useSelector(state => state.auth.currentUserId);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
    navigate("/profile");
  }

  const navItemClass =
    "transition px-4 py-2 rounded-full font-semibold " +
    "hover:bg-gradient-to-r hover:from-purple-200 hover:to-indigo-200 hover:scale-105";

  return (
    <nav
      className="
        w-full p-4 flex items-center justify-between 
        rounded-b-xl shadow 
        bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100
        bg-opacity-90
        "
      style={{
        background:
          "linear-gradient(120deg, #ede9fe 0%, #e0e7ff 50%, #f3e8ff 100%)",
        backdropFilter: "blur(4px)"
      }}
    >
      <div
        className="text-2xl font-extrabold text-purple-700 cursor-pointer select-none"
        onClick={() => navigate("/")}
        tabIndex={0}
        style={{ outline: "none" }}
        aria-label="Go to home page"
      >
        PrepGenius
      </div>
      <div className="flex items-center gap-2 font-semibold text-lg">
        <Link to="/" className={navItemClass + (location.pathname === "/" ? " bg-indigo-100" : "")}>
          Home
        </Link>
        <Link to="/questions" className={navItemClass + (location.pathname === "/questions" ? " bg-indigo-100" : "")}>
          Questions
        </Link>
        <Link to="/profile" className={navItemClass + (location.pathname === "/profile" ? " bg-indigo-100" : "")}>
          Profile
        </Link>
        {!isLoggedIn && (
          <Link to="/signup" className={navItemClass + (location.pathname === "/signup" ? " bg-indigo-100" : "")}>
            Sign Up
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signin" className={navItemClass + (location.pathname === "/signin" ? " bg-indigo-100" : "")}>
            Sign In
          </Link>
        )}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className={
              navItemClass +
              " bg-indigo-500 text-white font-bold hover:bg-indigo-600 hover:text-white"
            }
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}