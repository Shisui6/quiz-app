// Import necessary dependencies
import { useNavigate } from "react-router-dom";

/**
 * The Home component displays a welcome message and a button to start the quiz.
 * When the button is clicked, the user is navigated to the "/quiz" route.
 *
 * @component
 */
const Home = () => {
 const navigate = useNavigate();

 /**
  * Handles the click event for the "Lets Play" button.
  * Navigates the user to the "/quiz" route when the button is clicked.
  */
 const handleClick = () => {
   navigate("/quiz");
 };

 return (
   <div className="h-screen w-full home flex items-center flex-col pt-40">
     <h1 className="text-5xl font-bold mb-5 text-[#936e8f] text-center">General Knowledge Quiz</h1>
     <p className="text-gray-300 mb-3">Rules</p>
     <ul className="mb-12 px-5">
       <li className="text-gray-500">1. There are 20 multiple choice questions</li>
       <li className="text-gray-500">2. Each question has one answer</li>
       <li className="text-gray-500">3. At the end of the quiz, you'll get your final score</li>
       <li className="text-gray-500">4. Good luck!</li>
     </ul>
     <button
       className="bg-[#e1a7da] hover:bg-[#473545] duration-150 text-white px-10 py-3 rounded-3xl"
       onClick={handleClick}
     >
       Lets Play
     </button>
   </div>
 );
};

export default Home;
