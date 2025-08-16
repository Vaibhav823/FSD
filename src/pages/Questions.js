import React, { useState } from "react";

const QUESTIONS = [
  // ...20 questions as in the previous answer
  { id: 1, tags: ["MongoDB", "Easy"], question: "What is MongoDB and why is it used?", answer: "MongoDB is a NoSQL, document-oriented database..." },
  { id: 2, tags: ["MongoDB", "Medium"], question: "How do you perform a text search in MongoDB?", answer: "By creating a text index..." },
  { id: 3, tags: ["MongoDB", "Medium"], question: "Explain the difference between findOne() and find() in MongoDB.", answer: "findOne() returns a single document..." },
  { id: 4, tags: ["Express", "Easy"], question: "What is Express.js?", answer: "Express.js is a minimal and flexible Node.js web app framework..." },
  { id: 5, tags: ["Express", "Medium"], question: "How do you handle errors in Express?", answer: "By using error-handling middleware..." },
  { id: 6, tags: ["Express", "Easy"], question: "How can you create a REST API with Express.js?", answer: "By defining routes and using HTTP methods..." },
  { id: 7, tags: ["React", "Easy"], question: "What is JSX?", answer: "JSX stands for JavaScript XML..." },
  { id: 8, tags: ["React", "Medium"], question: "Explain the useState hook in React.", answer: "useState is a React hook that lets you add state..." },
  { id: 9, tags: ["React", "Medium"], question: "What are props in React?", answer: "Props are arguments passed into React components..." },
  { id: 10, tags: ["React", "Medium"], question: "How do you fetch data from an API in React?", answer: "You can use the useEffect hook with fetch or axios..." },
  { id: 11, tags: ["Node.js", "Easy"], question: "What is Node.js?", answer: "Node.js is a runtime environment that allows you to run JavaScript on the server-side." },
  { id: 12, tags: ["Node.js", "Medium"], question: "How do you handle asynchronous code in Node.js?", answer: "By using callbacks, promises, or async/await." },
  { id: 13, tags: ["Node.js", "Medium"], question: "What is middleware in Node.js?", answer: "Middleware functions are functions that have access to the request and response objects..." },
  { id: 14, tags: ["Full Stack", "Easy"], question: "What does MERN stand for?", answer: "MERN stands for MongoDB, Express, React, and Node.js." },
  { id: 15, tags: ["Full Stack", "Medium"], question: "How does data flow from frontend to backend in MERN?", answer: "The frontend (React) makes API requests to the backend..." },
  { id: 16, tags: ["Full Stack", "Medium"], question: "Explain CORS and how to handle it in Express.", answer: "CORS is Cross-Origin Resource Sharing. In Express, you can handle it by using the cors middleware package." },
  { id: 17, tags: ["React", "Easy"], question: "What are React hooks?", answer: "Hooks are special functions that let you use state and other React features in functional components." },
  { id: 18, tags: ["Node.js", "Easy"], question: "How do you initialize a new Node.js project?", answer: "Run npm init or npm init -y in your project folder." },
  { id: 19, tags: ["MongoDB", "Medium"], question: "How do you connect MongoDB with Node.js?", answer: "By using the official MongoDB Node.js driver or libraries like mongoose." },
  { id: 20, tags: ["Full Stack", "Medium"], question: "How do you deploy a MERN application?", answer: "Backend on Heroku/AWS, frontend on Netlify/Vercel, MongoDB on Atlas/cloud." },
];

export default function Questions() {
  const [search, setSearch] = useState("");
  const [showAnswers, setShowAnswers] = useState({});

  const filteredQuestions = QUESTIONS.filter(q =>
    q.question.toLowerCase().includes(search.toLowerCase()) ||
    q.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleAnswer = (id) => {
    setShowAnswers((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Practice Questions</h2>
      <input
        type="text"
        placeholder="Search by keyword or tag (e.g. React, Easy)..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
      <div className="space-y-6">
        {filteredQuestions.length === 0 && (
          <div className="text-gray-500 text-center">No questions found.</div>
        )}
        {filteredQuestions.map((q) => (
          <div key={q.id} className="bg-white/90 rounded-lg shadow p-4 hover:shadow-xl transition">
            <div className="flex flex-wrap gap-2 mb-2">
              {q.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-xs font-bold rounded bg-purple-100 text-purple-700">{tag}</span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="font-semibold text-lg">{q.question}</div>
              <button
                onClick={() => toggleAnswer(q.id)}
                className="text-indigo-500 hover:underline ml-4 font-bold"
              >
                {showAnswers[q.id] ? "Hide Answer" : "Show Answer"}
              </button>
            </div>
            {showAnswers[q.id] && (
              <div className="mt-2 px-4 py-2 bg-indigo-50 rounded text-gray-800">
                {q.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}