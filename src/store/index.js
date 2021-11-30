import { configureStore, createSlice } from "@reduxjs/toolkit";

const DUMMY_QUESTIONS = [
  {
    id: "q1",
    question: "How many computer languages are in use?",
    options: [
      { answer: "2000", isRight: true },
      { answer: "5000", isRight: false },
      { answer: "50", isRight: false },
      { answer: "20", isRight: false },
    ],
  },
  {
    id: "q2",
    question: "Which of these is not an early computer?",
    options: [
      { answer: "ENIAC", isRight: false },
      { answer: "UNIVAC", isRight: false },
      { answer: "NASA", isRight: true },
      { answer: "SAGE", isRight: false },
    ],
  },
  {
    id: "q3",
    question: "Who founded Apple Computer?",
    options: [
      { answer: "Stephen Fry", isRight: false },
      { answer: "Bill Gates", isRight: false },
      { answer: "Steve Jobs", isRight: true },
      { answer: "Stephen Hawking", isRight: false },
    ],
  },
  {
    id: "q4",
    question: "Which of these is not a peripheral, in computer terms?",
    options: [
      { answer: "Keyboard", isRight: false },
      { answer: "Monitor", isRight: false },
      { answer: "Mouse", isRight: false },
      { answer: "MotherBoard", isRight: true },
    ],
  },
  {
    id: "q5",
    question: "What does the Internet prefix WWW stand for?",
    options: [
      { answer: "Wide Width Wickets", isRight: false },
      { answer: " World Wide Web", isRight: true },
      { answer: "Worldwide Weather", isRight: false },
      { answer: "Western Washington World", isRight: false },
    ],
  },
];

const initialState = {
  questions: DUMMY_QUESTIONS,
  current: 0,
  currentQuestion: null,
  score: 0,
  showScore: false,
  startQuiz: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    start(state) {
      state.score = 0;
      state.startQuiz = !state.startQuiz;
      state.currentQuestion = state.questions[state.current];
      state.current++;
    },
    showScore(state) {
      state.showScore = !state.showScore;
    },
    changeQuestion(state) {
      state.currentQuestion = state.questions[state.current++];
    },
    increase(state) {
      state.score++;
    },
  },
});

export const quizActions = quizSlice.actions;

const store = configureStore({
  reducer: quizSlice.reducer,
});

export default store;
