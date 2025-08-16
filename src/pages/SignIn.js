import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");
const setLoggedIn = id => localStorage.setItem("loggedInUserId", id);

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    const users = getUsers();
    const user = users.find(u => u.email === form.email && u.password === form.password);
    if (!user) {
      setError("Invalid email or password.");
      return;
    }
    setLoggedIn(user.id);
    navigate("/profile");
  }

  return (
    <div className="min-h-[92vh] w-full flex items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100">
      <form
        className="bg-white/90 p-8 rounded-2xl shadow-xl flex flex-col gap-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-purple-700 mb-2 text-center">Sign In</h2>
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
        {error && <div className="text-red-600 text-center">{error}</div>}
        <button
          className="mt-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold shadow hover:scale-105 transition"
          type="submit"
        >
          Sign In
        </button>
        <div className="text-center mt-2">
          New here?{" "}
          <span
            className="text-indigo-700 cursor-pointer font-bold"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </span>
        </div>
      </form>
    </div>
  );
}