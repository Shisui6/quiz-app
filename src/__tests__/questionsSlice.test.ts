// Import necessary libraries and components
import store from "../redux/configureStore";
import {
  nextQuestion,
  setCurrentQuestion,
  selectCurrentQuestion,
  selectQuestions,
  fetchQuestions,
  previousQuestion,
} from "../redux/questions/questions";

// Start of test suite for the questions reducer
describe("questions reducer", () => {
    // Test that the questions reducer handles the initial state correctly
  it("should handle initial state", () => {
    // Get the current state of the questions slice
    const actual = store.getState().questions;
    // Expect that the currentQuestion object in the state matches the initial state
    expect(actual.currentQuestion).toEqual({
      id: 0,
      text: '',
      options: [],
      answer: '',
      score: 0,
      answered: false,
      choice: '',
      correct: false,
      number: 0,
    });
    // Expect that the questions array in the state is empty
    expect(actual.questions).toEqual([]);
     // Expect that the isLoading and error booleans in the state are false
    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBe(false);
  });

  // Test that the questions reducer handles the setCurrentQuestion action correctly
  it("should handle setCurrentQuestion", () => {
    // Dispatch the setCurrentQuestion action
    store.dispatch(setCurrentQuestion({
      id: 1,
      text: 'test',
      options: ['test'],
      answer: 'test',
      score: 1,
      answered: false,
      choice: '',
      correct: false,
      number: 1,
    }));
    // Get the current state of the questions slice
    const actual = store.getState().questions.currentQuestion;
    // Expect that the currentQuestion object in the state has been set
    expect(actual).toEqual({
      id: 1,
      text: 'test',
      options: ['test'],
      answer: 'test',
      score: 1,
      answered: false,
      choice: '',
      correct: false,
      number: 1,
    });
  });

  // Test that the questions reducer handles the nextQuestion action correctly
  it("should handle nextQuestion", () => {
    // Dispatch the nextQuestion action
    store.dispatch(nextQuestion({
      id: 1,
      text: 'test',
      options: ['test'],
      answer: 'test',
      score: 1,
      answered: false,
      choice: '',
      correct: false,
      number: 1,
    }));
    // Get the current state of the questions slice
    const actual = store.getState().questions;
    // Expect that the answered questions array has increased in length
    expect(actual.answeredQuestions.length).toEqual(1);
  });

    // Test that the questions reducer handles the previousQuestion action correctly
  it("should handle previousQuestion", () => {
    // Dispatch the nextQuestion action multiple times
    store.dispatch(nextQuestion({
      id: 1,
      text: 'test',
      options: ['test'],
      answer: 'test',
      score: 1,
      answered: false,
      choice: '',
      correct: false,
      number: 1,
    }));
    store.dispatch(nextQuestion({
      id: 1,
      text: 'test',
      options: ['test'],
      answer: 'test',
      score: 1,
      answered: false,
      choice: '',
      correct: false,
      number: 1,
    }));

    // Dispatch the previousQuestion action
    store.dispatch(previousQuestion());

    const actual = store.getState().questions;
    // Expect that the answered questions array has decreased in length
    expect(actual.answeredQuestions.length).toEqual(2);
  });

  // Test that the questions reducer handles the selectQuestions selector correctly
  it("should handle selectQuestions", () => {
    // Use the selectQuestions selector to get the questions array from the state
    const questions = selectQuestions(store.getState());
    // Expect that the questions array is empty
    expect(questions).toEqual([]);
  });

  // Test that the questions reducer handles the selectCurrentQuestion selector correctly
  it("should handle selectCurrentQuestion", () => {
    // Use the selectCurrentQuestion selector to get the current question from the state
    const currentQuestion = selectCurrentQuestion(store.getState());
    // Expect the state of the current question
    expect(currentQuestion).toEqual({
      id: 1,
      text: 'test',
      options: ['test'],
      answer: 'test',
      score: 1,
      answered: false,
      choice: '',
      correct: false,
      number: 1,
    });
  });

  // Test that the questions reducer handles the fetchQuestions pending action
  it('should handle fetchQuestions pending', () => {
    // Dispatch the fetchQuestions pending action
    store.dispatch(fetchQuestions.pending('questions/fetchQuestions'));
    // Get the current state of the questions slice
    const actual = store.getState().questions;
    // Expect that the isLoading boolean in the state is true
    expect(actual.isLoading).toEqual(true);
  });
});
  