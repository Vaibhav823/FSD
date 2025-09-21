import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../slices/authSlice";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password, confirmPassword } = form;
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email === email)) {
      setError("User with this email already exists.");
      return;
    }
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      bio: "",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8b5cf6&color=fff&size=128`
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    dispatch(signIn(newUser.id));
    navigate("/profile");
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white/80 p-8 rounded-xl shadow">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Create Profile</h2>
      {error && (
        <div className="mb-4 text-red-600 font-semibold">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            className="w-full px-3 py-2 border rounded"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            className="w-full px-3 py-2 border rounded"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
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
        <div>
          <label className="block font-semibold mb-1">Confirm Password</label>
          <input
            className="w-full px-3 py-2 border rounded"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded font-bold hover:bg-purple-700 transition"
        >
          Create Profile
        </button>
      </form>
      <div className="mt-6 text-center">
        Already have an account?{" "}
        <button
          className="underline text-indigo-500"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}