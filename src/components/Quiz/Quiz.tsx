// Import necessary dependencies
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchQuestions, nextQuestion, previousQuestion, selectCurrentQuestion, selectIsLoading, selectQuestions, setCurrentQuestion } from "../../redux/questions/questions";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Progress } from '@mantine/core';
import * as Yup from 'yup';
import { Loader } from '../Loader/Loader';
import RadioButton from "../RadioButton/RadioButton";
import { useNavigate } from "react-router-dom";


/**
 * The Quiz component displays a quiz with multiple choice questions.
 * It fetches the questions from the server, allows the user to answer the questions,
 * and navigates to the result page when the quiz is finished.
 *
 * @component
 */
const Quiz = () => {
  const load = useAppSelector(selectIsLoading);
  const [loading, setLoading] = useState(true);
  const questions = useAppSelector(selectQuestions);
  const currentQuestion = useAppSelector(selectCurrentQuestion);

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  /**
  * Fetches the questions from the server and sets up a listener to prevent the user from leaving the page during the quiz.
  */
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    dispatch(fetchQuestions());

    const unloadCallback = (event: { preventDefault: () => void; returnValue: string; }) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
  
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [dispatch]);
  
  const validationSchema = Yup.object().shape({
    choice: Yup.string().required('Please select an answer'),
   });

  /**
  * Handles the click event for the "Previous" button.
  * Navigates the user to the previous question when the button is clicked.
  */
  const handlePreviousClick = () => {
    dispatch(previousQuestion());
    dispatch(setCurrentQuestion(questions[currentQuestion.number - 2]))
  }

  // If the questions are still loading, display the Loader component.
  if (load || loading) {
    return <Loader />;
  }

  return ( 
    <div className="h-screen w-full home flex items-center flex-col pt-20 fade-in">
      <div>
        <Progress color="#936e8f" value={currentQuestion.number * 5} striped animated />
        <p className="text-gray-300 mb-9">Question {currentQuestion.number} of 20</p>
      </div>
      <h1 className="text-3xl font-bold mb-14 text-[#936e8f] text-center px-6">{currentQuestion.text}</h1>
      <Formik
        initialValues={{ choice: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (currentQuestion.number !== 20) {
            const question = {
              ...currentQuestion,
              choice: values.choice,
              answered: true,
              correct: values.choice === currentQuestion.answer
            }
            dispatch(nextQuestion(question));
            dispatch(setCurrentQuestion(questions[currentQuestion.number]));
            values.choice = '';
          } else {
            const question = {
              ...currentQuestion,
              choice: values.choice,
              answered: true,
              correct: values.choice === currentQuestion.answer
            }
            dispatch(nextQuestion(question));
            navigate("/result");
            values.choice = '';
          }
        }}
      >
        <Form className="min-w-[260px] w-1/3">
          <Field
            component={RadioButton}
            name="choice"
            id={currentQuestion.options[0]}
            label={currentQuestion.options[0]}
          />
          <Field
            component={RadioButton}
            name="choice"
            id={currentQuestion.options[1]}
            label={currentQuestion.options[1]}
          />
          <Field
            component={RadioButton}
            name="choice"
            id={currentQuestion.options[2]}
            label={currentQuestion.options[2]}
          />
          <Field
            component={RadioButton}
            name="choice"
            id={currentQuestion.options[3]}
            label={currentQuestion.options[3]}
          />
          <ErrorMessage className="text-center text-red-700" name="choice" component="div" />
          <div className="text-center mt-12">
            {currentQuestion.number !== 1 && <button className="bg-[#e1a7da] hover:bg-[#473545] duration-150 text-white px-6 py-3 rounded-3xl mr-5" onClick={handlePreviousClick}>Previous</button>}
            {currentQuestion.number !== 20 ? <button type="submit" className="bg-[#936e8f] hover:bg-[#473545] duration-150 text-white px-10 py-3 rounded-3xl">Next</button>
            : <button type="submit" className="bg-[#936e8f] hover:bg-[#473545] duration-150 text-white px-8 py-3 rounded-3xl">Finish</button>}
          </div>
        </Form>
      </Formik>
    </div>
  );
}
 
export default Quiz;