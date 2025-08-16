import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Save and get users from localStorage
const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");
const saveUsers = users => localStorage.setItem("users", JSON.stringify(users));
const setLoggedIn = id => localStorage.setItem("loggedInUserId", id);

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("All fields are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    const users = getUsers();
    if (users.some(u => u.email === form.email)) {
      setError("Email already in use.");
      return;
    }
    const id = Date.now().toString();
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=8b5cf6&color=fff&size=128`;
    users.push({ id, name: form.name, email: form.email, password: form.password, avatar, bio: "" });
    saveUsers(users);
    setLoggedIn(id);
    navigate("/profile");
  }

  return (
    <div className="min-h-[92vh] w-full flex items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100">
      <form
        className="bg-white/90 p-8 rounded-2xl shadow-xl flex flex-col gap-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-purple-700 mb-2 text-center">Sign Up</h2>
        <input
          className="px-4 py-2 rounded border border-purple-300 focus:ring-2 focus:ring-purple-300"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="px-4 py-2 rounded border border-purple-300 focus:ring-2 focus:ring-purple-300"
          placeholder="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="px-4 py-2 rounded border border-purple-300 focus:ring-2 focus:ring-purple-300"
          placeholder="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          className="px-4 py-2 rounded border border-purple-300 focus:ring-2 focus:ring-purple-300"
          placeholder="Confirm Password"
          type="password"
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
        />
        {error && <div className="text-red-600 text-center">{error}</div>}
        <button
          className="mt-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold shadow hover:scale-105 transition"
          type="submit"
        >
          Create Profile
        </button>
        <div className="text-center mt-2">
          Already have an account?{" "}
          <span
            className="text-indigo-700 cursor-pointer font-bold"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </div>
      </form>
    </div>
  );
}