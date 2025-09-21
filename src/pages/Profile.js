import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProfile, updateProfile, clearProfile } from "../slices/profileSlice";

export default function Profile() {
  const currentUserId = useSelector(state => state.auth.currentUserId);
  const user = useSelector(state => state.profile.user);
  const [mode, setMode] = useState("show");
  const [form, setForm] = useState({ name: "", email: "", bio: "", avatar: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserId) {
      dispatch(loadProfile(currentUserId));
    } else {
      dispatch(clearProfile());
    }
  }, [currentUserId, dispatch]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  function handleEdit(e) {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: form.name,
      email: form.email,
      bio: form.bio,
      avatar:
        form.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=8b5cf6&color=fff&size=128`,
    };
    dispatch(updateProfile(updatedUser));
    setMode("show");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white/80 p-8 rounded-xl shadow text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-6">Profile</h2>
        <div>No profile logged in.</div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white/80 p-8 rounded-xl shadow text-center">
      {mode === "show" && (
        <>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Profile</h2>
          <div className="flex items-center gap-6 mb-6 justify-center">
            <img
              src={user.avatar}
              className="w-20 h-20 rounded-full ring-2 ring-purple-400"
              alt="avatar"
            />
            <div className="font-bold text-xl">{user.name}</div>
          </div>
          <div className="mb-2">
            <span className="font-bold">Email:</span> {user.email}
          </div>
          <div className="mb-4">
            <span className="font-bold">Bio:</span> {user.bio}
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setMode("edit")}
              className="bg-indigo-500 text-white px-4 py-2 rounded font-bold hover:bg-indigo-600 transition"
            >
              Edit Profile
            </button>
          </div>
          <div className="mt-4 text-green-700 font-semibold">
            Profile is logged in
          </div>
        </>
      )}

      {mode === "edit" && (
        <>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Edit Profile</h2>
          <form onSubmit={handleEdit} className="space-y-4 text-left">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                className="w-full px-3 py-2 border rounded"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
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
              <label className="block font-semibold mb-1">Bio</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                name="bio"
                value={form.bio}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Avatar URL (optional)</label>
              <input
                className="w-full px-3 py-2 border rounded"
                name="avatar"
                value={form.avatar}
                onChange={handleChange}
                placeholder="Leave blank for auto-generated avatar"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded font-bold hover:bg-purple-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="ml-4 underline text-gray-500"
              onClick={() => setMode("show")}
            >
              Cancel
            </button>
          </form>
        </>
      )}
    </div>
  );
}