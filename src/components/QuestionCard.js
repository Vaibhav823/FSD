import React from "react";

export default function QuestionCard({ question, showAnswer, toggleAnswer }) {
  return (
    <div className="bg-white rounded-lg shadow p-5 transition hover:shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded mr-2">
            {question.category}
          </span>
          <span className={`inline-block text-xs px-2 py-1 rounded ${question.difficulty === "Easy" ? "bg-green-100 text-green-700" : question.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
            {question.difficulty}
          </span>
        </div>
        <button
          onClick={toggleAnswer}
          className="text-sm text-purple-700 hover:underline focus:outline-none"
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
      </div>
      <div className="mt-3">
        <p className="text-lg font-medium">{question.question}</p>
        {showAnswer && (
          <p className="mt-2 bg-purple-50 border-l-4 border-purple-400 p-2 rounded text-purple-800">
            {question.answer}
          </p>
        )}
      </div>
    </div>
  );
}