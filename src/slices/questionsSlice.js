import { createSlice } from '@reduxjs/toolkit';

const QUESTIONS_KEY = "mern_questions";
const defaultQuestions = [
  {
    id: 1,
    topic: "MongoDB",
    question: "What is a replica set in MongoDB?",
    answer: "A replica set in MongoDB is a group of mongod processes that maintain the same data set, providing redundancy and high availability.",
  },
  {
    id: 2,
    topic: "Express.js",
    question: "What are middleware functions in Express?",
    answer: "Middleware functions are functions that have access to the request object, response object, and the next middleware in the application’s request-response cycle.",
  },
  {
    id: 3,
    topic: "React",
    question: "What is the use of useEffect hook in React?",
    answer: "The useEffect hook lets you perform side effects in function components, such as fetching data, directly interacting with the DOM, and timers.",
  },
  {
    id: 4,
    topic: "Node.js",
    question: "What is the purpose of the package.json file?",
    answer: "The package.json file holds metadata relevant to the project and is used to manage the project’s dependencies, scripts, version, and more.",
  },
];

const initialQuestions = (() => {
  const stored = localStorage.getItem(QUESTIONS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(defaultQuestions));
  return defaultQuestions;
})();

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: initialQuestions,
    showAnswer: {},
    filter: '',
    tech: null,
  },
  reducers: {
    setTech(state, action) {
      state.tech = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    toggleAnswer(state, action) {
      const id = action.payload;
      state.showAnswer[id] = !state.showAnswer[id];
    },
    addQuestion(state, action) {
      state.questions.push(action.payload);
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(state.questions));
    },
  }
});

export const { setTech, setFilter, toggleAnswer, addQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;