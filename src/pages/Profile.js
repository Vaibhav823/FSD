import React, { useState, useEffect } from "react";

// Helpers for localStorage
const getProfilesFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("profiles")) || [];
  } catch {
    return [];
  }
};

const saveProfilesToStorage = (profiles) => {
  localStorage.setItem("profiles", JSON.stringify(profiles));
};

const getCurrentProfileId = () => localStorage.getItem("currentProfileId");
const setCurrentProfileId = (id) => {
  if (id) localStorage.setItem("currentProfileId", id);
  else localStorage.removeItem("currentProfileId");
};

export default function Profile() {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileId, setCurrentProfileIdState] = useState(getCurrentProfileId());
  const [mode, setMode] = useState("start"); // start, create, select, show, edit
  const [form, setForm] = useState({ name: "", email: "", bio: "", avatar: "" });

  useEffect(() => {
    const storedProfiles = getProfilesFromStorage();
    setProfiles(storedProfiles);
    const currentId = getCurrentProfileId();
    if (storedProfiles.length === 0) {
      setMode("create");
    } else if (currentId && storedProfiles.some(p => p.id === currentId)) {
      setMode("show");
    } else {
      setMode("start");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    saveProfilesToStorage(profiles);
  }, [profiles]);

  useEffect(() => {
    setCurrentProfileId(currentProfileId);
  }, [currentProfileId]);

  const currentProfile = profiles.find(p => p.id === currentProfileId);

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleCreateProfile(e) {
    e.preventDefault();
    if (profiles.some(p => p.email === form.email)) {
      alert("A profile with this email already exists.");
      return;
    }
    const newProfile = {
      ...form,
      id: Date.now().toString(),
      avatar:
        form.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=8b5cf6&color=fff&size=128`,
    };
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    setCurrentProfileIdState(newProfile.id);
    setMode("show");
    setForm({ name: "", email: "", bio: "", avatar: "" });
  }

  function handleEditProfile(e) {
    e.preventDefault();
    if (
      profiles.some(
        p => p.email === form.email && p.id !== currentProfileId
      )
    ) {
      alert("A profile with this email already exists.");
      return;
    }
    const updated = profiles.map(p =>
      p.id === currentProfileId
        ? {
            ...p,
            ...form,
            avatar:
              form.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=8b5cf6&color=fff&size=128`,
          }
        : p
    );
    setProfiles(updated);
    setMode("show");
  }

  function handleLogout() {
    setCurrentProfileIdState(null);
    setCurrentProfileId(null);
    setMode("start");
  }

  function handleSelectProfile(id) {
    setCurrentProfileIdState(id);
    setMode("show");
  }

  function handleNewAccount() {
    setForm({ name: "", email: "", bio: "", avatar: "" });
    setMode("create");
  }

  function handleAlreadyHaveAccount() {
    setMode("select");
  }

  function handleEditClick() {
    setForm({
      name: currentProfile.name,
      email: currentProfile.email,
      bio: currentProfile.bio,
      avatar: currentProfile.avatar,
    });
    setMode("edit");
  }

  // UI rendering
  // Show "Already have an account?" except when logged in (show/edit)
  const showAlreadyHaveAccountButton =
    (mode === "start" || mode === "create" || mode === "select") && profiles.length > 0;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white/80 p-8 rounded-xl shadow text-center">
      {mode === "start" && (
        <>
          <h2 className="text-3xl font-bold text-purple-700 mb-6">Welcome to Your Profile</h2>
          <div className="mb-6 flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={handleNewAccount}
              className="bg-purple-600 text-white px-6 py-3 rounded font-bold hover:bg-purple-700 transition text-lg"
            >
              Create Account
            </button>
          </div>
        </>
      )}

      {mode === "create" && (
        <>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Create New Profile</h2>
          <form onSubmit={handleCreateProfile} className="space-y-4 text-left">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                className="w-full px-3 py-2 border rounded"
                name="name"
                value={form.name}
                onChange={handleFormChange}
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
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Bio</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                name="bio"
                value={form.bio}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Avatar URL (optional)</label>
              <input
                className="w-full px-3 py-2 border rounded"
                name="avatar"
                value={form.avatar}
                onChange={handleFormChange}
                placeholder="Leave blank for auto-generated avatar"
              />
            </div>
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded font-bold hover:bg-purple-700 transition">
              Create Profile
            </button>
          </form>
        </>
      )}

      {mode === "select" && (
        <>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Select Profile</h2>
          <div className="space-y-4">
            {profiles.length === 0 && (
              <div>No profiles found. Please create a new account.</div>
            )}
            {profiles.map(profile => (
              <div key={profile.id} className="flex items-center justify-between bg-indigo-50 px-4 py-2 rounded">
                <div className="flex items-center gap-3">
                  <img src={profile.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                  <div>{profile.name} <span className="text-xs text-gray-500">({profile.email})</span></div>
                </div>
                <button
                  onClick={() => handleSelectProfile(profile.id)}
                  className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
                >
                  Log In
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={handleNewAccount}
              className="underline text-indigo-500"
            >
              Create New Account
            </button>
          </div>
        </>
      )}

      {mode === "edit" && (
        <>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Edit Profile</h2>
          <form onSubmit={handleEditProfile} className="space-y-4 text-left">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                className="w-full px-3 py-2 border rounded"
                name="name"
                value={form.name}
                onChange={handleFormChange}
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
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Bio</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                name="bio"
                value={form.bio}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Avatar URL (optional)</label>
              <input
                className="w-full px-3 py-2 border rounded"
                name="avatar"
                value={form.avatar}
                onChange={handleFormChange}
                placeholder="Leave blank for auto-generated avatar"
              />
            </div>
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded font-bold hover:bg-purple-700 transition">
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

      {mode === "show" && currentProfile && (
        <>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Profile</h2>
          <div className="flex items-center gap-6 mb-6 justify-center">
            <img
              src={currentProfile.avatar}
              className="w-20 h-20 rounded-full ring-2 ring-purple-400"
              alt="avatar"
            />
            <div className="font-bold text-xl">{currentProfile.name}</div>
          </div>
          <div className="mb-2"><span className="font-bold">Email:</span> {currentProfile.email}</div>
          <div className="mb-4"><span className="font-bold">Bio:</span> {currentProfile.bio}</div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleEditClick}
              className="bg-indigo-500 text-white px-4 py-2 rounded font-bold hover:bg-indigo-600 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-300 text-gray-900 px-4 py-2 rounded font-bold hover:bg-gray-400 transition"
            >
              Log Out
            </button>
          </div>
          <div className="mt-4 text-green-700 font-semibold">Profile is logged in</div>
        </>
      )}

      {/* "Already have an account" button is always visible except when logged in (show/edit) */}
      {showAlreadyHaveAccountButton && (
        <div className="mt-8">
          <button
            onClick={handleAlreadyHaveAccount}
            className="underline text-indigo-700 text-lg font-semibold"
          >
            Already have an account?
          </button>
        </div>
      )}
    </div>
  );
}