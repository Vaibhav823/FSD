import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // Here you could send the form data to a backend or email service
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white/80 p-8 rounded-xl shadow">
      <h2 className="text-3xl font-bold text-purple-700 mb-4">Contact Us</h2>
      {submitted && (
        <div className="mb-4 text-green-700 font-semibold">
          Thank you for reaching out! We will contact you soon.
        </div>
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
          <label className="block font-semibold mb-1">Message</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded font-bold hover:bg-indigo-600 transition">
          Send Message
        </button>
      </form>
    </div>
  );
}