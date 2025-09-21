import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const techCards = [
    {
      name: "MongoDB",
      color: "border-green-400 shadow-green-200/60",
      icon: "🌳",
      desc: "NoSQL Database: Store and query data efficiently.",
      bg: "bg-gradient-to-br from-green-50/70 to-green-100/60",
      path: "/questions/mongodb",
    },
    {
      name: "Express.js",
      color: "border-gray-400 shadow-gray-200/60",
      icon: "🚂",
      desc: "Node.js web framework: APIs, routing, and middleware.",
      bg: "bg-gradient-to-br from-gray-100/70 to-gray-200/60",
      path: "/questions/express",
    },
    {
      name: "React",
      color: "border-blue-400 shadow-blue-200/60",
      icon: "⚛️",
      desc: "Frontend library: Build dynamic user interfaces.",
      bg: "bg-gradient-to-br from-blue-50/70 to-blue-100/60",
      path: "/questions/react",
    },
    {
      name: "Node.js",
      color: "border-lime-400 shadow-lime-200/60",
      icon: "🟢",
      desc: "JavaScript runtime: Server-side logic and APIs.",
      bg: "bg-gradient-to-br from-lime-50/70 to-lime-100/60",
      path: "/questions/node",
    },
  ];

  return (
    <div className="min-h-[92vh] w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 px-2">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-purple-700 mb-4 drop-shadow-lg">
          PrepGenius
        </h1>
        <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Technical Interview Preparation <span className="text-indigo-500">&mdash; Focused on MERN Stack</span>
        </div>
        <div className="mb-8 text-lg md:text-xl text-gray-700">
          Practice real-world <span className="font-bold text-purple-600">MERN Stack</span> interview questions and expert answers.<br />
          <span className="text-indigo-600 font-semibold">MongoDB, Express.js, React, Node.js</span> &mdash; All in one place!
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl mb-12">
        {techCards.map(card => (
          <div
            key={card.name}
            className={`relative cursor-pointer rounded-2xl border-2 ${card.color} ${card.bg} shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-150 backdrop-blur-sm bg-opacity-70`}
            onClick={() => navigate(card.path)}
            tabIndex={0}
            role="button"
            aria-label={`View ${card.name} questions`}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl drop-shadow">{card.icon}</div>
            <div className="py-8 px-6 flex flex-col items-center justify-center">
              <div className="text-2xl font-extrabold text-purple-700 mb-2 tracking-wide">{card.name}</div>
              <div className="text-gray-700 font-medium text-center">{card.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Removed the Start Practicing MERN Questions button */}
    </div>
  );
}