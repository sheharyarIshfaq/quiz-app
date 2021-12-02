import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  current: 0,
  currentQuestion: null,
  score: 0,
  category: 9,
  difficulty: "easy",
  isLoading: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setDifficulty(state, action) {
      state.difficulty = action.payload;
    },
    start(state) {
      state.current = 0;
      state.score = 0;
      state.currentQuestion = state.questions[state.current];
      state.current++;
      state.category = initialState.category;
      state.difficulty = initialState.difficulty;
      state.isLoading = initialState.isLoading;
    },
    changeQuestion(state) {
      state.currentQuestion = state.questions[state.current++];
    },
    increase(state) {
      state.score++;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const quizActions = quizSlice.actions;

const store = configureStore({
  reducer: quizSlice.reducer,
});

export default store;
