/* eslint-disable no-param-reassign */
// Import necessary dependencies
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../configureStore'
import axios from 'axios';

// Define a type for the slice state
interface UserState {
  questions: Array<{
    id: number;
    text: string;
    options: Array<string>;
    answer: string;
    score: number;
    answered: boolean;
    choice: string;
    correct: boolean;
    number: number;
  }>;
  answeredQuestions: Array<{
    id: number;
    text: string;
    options: Array<string>;
    answer: string;
    score: number;
    answered: boolean;
    choice: string;
    correct: boolean;
    number: number;
  }>;
  currentQuestion: {
    id: number;
    text: string;
    options: Array<string>;
    answer: string;
    score: number;
    answered: boolean;
    choice: string;
    correct: boolean;
    number: number;
  };
  popedQuestion: {
    id: number;
    text: string;
    options: Array<string>;
    answer: string;
    score: number;
    answered: boolean;
    choice: string;
    correct: boolean;
    number: number;
  };
  isLoading: boolean;
  error: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  questions: [],
  answeredQuestions: [],
  currentQuestion: {
    id: 0,
    text: '',
    options: [],
    answer: '',
    score: 0,
    answered: false,
    choice: '',
    correct: false,
    number: 0,
  },
  popedQuestion: {
    id: 0,
    text: '',
    options: [],
    answer: '',
    score: 0,
    answered: false,
    choice: '',
    correct: false,
    number: 0,
  },
  isLoading: false,
  error: false
};

// Define a thunk that dispatches an action for fetching questions
export const fetchQuestions = createAsyncThunk(
  'user/fetchRepos',
  async () => {
    const response = await axios.get(`https://quiz-backend-0viy.onrender.com/api/v1/questions`);
    const questions = response.data;
    questions.forEach((element: {
      choice: string;
      correct: boolean; answered: boolean; 
}) => {
      element.answered = false;
      element.choice = '';
      element.correct = false;
    });
    questions.sort(() => Math.random() - 0.5);
    questions.forEach((element: { options: string[]; }) => {
      element.options.sort(() => Math.random() - 0.5);
    });
    for (let i = 0; i < questions.length; i++) {
      questions[i].number = i + 1;
    }
    return questions;
  },
);

// Create a slice for our questions data
export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    nextQuestion: (state, action) => {
      state.answeredQuestions.push(action.payload);
    },
    previousQuestion: (state) => {
      state.popedQuestion = state.answeredQuestions.pop()!;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.currentQuestion = action.payload[0];
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
  },
});

// Export action creators
export const { setCurrentQuestion, nextQuestion, previousQuestion } = questionsSlice.actions;


// Export selectors
export const selectQuestions = (state: RootState) => state.questions.questions;
export const selectCurrentQuestion = (state: RootState) => state.questions.currentQuestion;
export const selectAnsweredQuestions = (state: RootState) => state.questions.answeredQuestions;
export const selectPopedQuestion = (state: RootState) => state.questions.popedQuestion;
export const selectIsLoading = (state: RootState) => state.questions.isLoading;
export const selectError = (state: RootState) => state.questions.error;

// Export the reducer as a default export
export default questionsSlice.reducer;
