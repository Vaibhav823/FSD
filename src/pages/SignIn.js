import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../slices/authSlice";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );
    if (user) {
      dispatch(signIn(user.id));
      navigate("/profile");
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white/80 p-8 rounded-xl shadow">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Sign In</h2>
      {error && (
        <div className="mb-4 text-red-600 font-semibold">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            className="w-full px-3 py-2 border rounded"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Password</label>
          <input
            className="w-full px-3 py-2 border rounded"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-6 py-2 rounded font-bold hover:bg-indigo-600 transition"
        >
          Sign In
        </button>
      </form>
      <div className="mt-6 text-center">
        Don't have an account?{" "}
        <button
          className="underline text-indigo-500"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}