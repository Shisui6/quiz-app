// Import necessary dependencies
import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './questions/questions';

// Create a Redux store using the configureStore function
// The store has a single reducer, user, which uses the questionReducer
const store = configureStore({
  reducer: {
    questions: questionsReducer,
  },
});

// Define a type RootState that represents the state of the entire Redux store
// It uses the ReturnType utility type to infer the type returned by store.getState
export type RootState = ReturnType<typeof store.getState>

// Define a type AppDispatch that represents the dispatch function of the Redux store
export type AppDispatch = typeof store.dispatch

// Export the store as the default export of this module
export default store;