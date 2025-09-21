import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTech, setFilter, toggleAnswer } from "../slices/questionsSlice";

const techStacks = [
  {
    label: "MongoDB",
    color: "border-green-400 shadow-green-200/60",
    icon: "🌳",
    bg: "bg-gradient-to-br from-green-50/70 to-green-100/60",
    value: "mongodb",
    match: "MongoDB"
  },
  {
    label: "Express.js",
    color: "border-gray-400 shadow-gray-200/60",
    icon: "🚂",
    bg: "bg-gradient-to-br from-gray-100/70 to-gray-200/60",
    value: "express",
    match: "Express.js"
  },
  {
    label: "React",
    color: "border-blue-400 shadow-blue-200/60",
    icon: "⚛️",
    bg: "bg-gradient-to-br from-blue-50/70 to-blue-100/60",
    value: "react",
    match: "React"
  },
  {
    label: "Node.js",
    color: "border-lime-400 shadow-lime-200/60",
    icon: "🟢",
    bg: "bg-gradient-to-br from-lime-50/70 to-lime-100/60",
    value: "node",
    match: "Node.js"
  },
];

export default function Questions() {
  const { tech } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { questions, showAnswer, filter } = useSelector(state => state.questions);

  // Find which tech is chosen
  const selectedTech = techStacks.find(
    t => t.value === (tech ? tech.toLowerCase() : "")
  );

  // If no tech param, show tech stack selection screen
  if (!selectedTech) {
    return (
      <div className="max-w-3xl mx-auto mt-12 p-6 bg-white/80 rounded-xl shadow min-h-[60vh] flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">
          Select a Tech Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 w-full">
          {techStacks.map(card => (
            <div
              key={card.label}
              className={`relative cursor-pointer rounded-2xl border-2 ${card.color} ${card.bg} shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-150 backdrop-blur-sm bg-opacity-70`}
              onClick={() => {
                dispatch(setTech(card.value));
                navigate(`/questions/${card.value}`);
              }}
              tabIndex={0}
              role="button"
              aria-label={`Show ${card.label} questions`}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl drop-shadow">{card.icon}</div>
              <div className="py-8 px-6 flex flex-col items-center justify-center">
                <div className="text-2xl font-extrabold text-purple-700 mb-2 tracking-wide">{card.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Filter questions by tech stack and filter text
  const filteredQuestions = questions.filter(
    q =>
      q.topic.toLowerCase() === selectedTech.match.toLowerCase() &&
      (q.question.toLowerCase().includes(filter.toLowerCase()) ||
        q.answer.toLowerCase().includes(filter.toLowerCase()))
  );

  function handleToggleAnswer(id) {
    dispatch(toggleAnswer(id));
  }

  function handleSearchChange(e) {
    dispatch(setFilter(e.target.value));
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white/80 rounded-xl shadow min-h-[70vh]">
      <div className="flex items-center gap-3 mb-6">
        <button
          className="
            px-4 py-2 rounded-full font-semibold
            bg-gradient-to-r from-purple-100 via-indigo-100 to-pink-100
            text-indigo-700 shadow
            hover:from-indigo-200 hover:to-purple-200
            hover:scale-105 transition-all
            border border-indigo-200
          "
          onClick={() => navigate("/questions")}
        >
          &larr; Back to Tech Stack
        </button>
        <h2 className="text-3xl font-extrabold text-purple-700 ml-2">
          {selectedTech.label} Interview Questions
        </h2>
      </div>
      <div className="mb-6">
        <input
          type="text"
          value={filter}
          onChange={handleSearchChange}
          placeholder={`Search ${selectedTech.label} questions...`}
          className="border rounded px-3 py-2 w-full md:w-72"
        />
      </div>
      {filteredQuestions.length === 0 ? (
        <div className="text-gray-600 text-center py-12">
          No questions found for your criteria.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQuestions.map(q => (
            <div
              key={q.id}
              className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-5 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-purple-600">{q.topic}</span>
                <button
                  className="text-indigo-600 underline font-medium"
                  onClick={() => handleToggleAnswer(q.id)}
                >
                  {showAnswer[q.id] ? "Hide Answer" : "Show Answer"}
                </button>
              </div>
              <div className="font-bold text-lg mb-2">{q.question}</div>
              {showAnswer[q.id] && (
                <div className="text-gray-700">{q.answer}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}