import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  current: 0,
  currentQuestion: null,
  score: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    start(state) {
      state.current = 0;
      state.score = 0;
      state.currentQuestion = state.questions[state.current];
      state.current++;
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
