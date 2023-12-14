// Import necessary dependencies
import { RingProgress, Text, Progress, List, ThemeIcon, rem } from '@mantine/core';
import { IconXboxX } from '@tabler/icons-react';
import { useAppSelector } from '../../redux/hooks';
import { selectAnsweredQuestions } from '../../redux/questions/questions';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalculateLoader } from '../Loader/Loader';


/**
 * The Result component displays the results of the quiz.
 * It calculates the total score, the number of correct and incorrect answers,
 * and the percentage of correct answers.
 * It also displays the wrong answers.
 *
 * @component
 */
const Result = () => {
  const [loading, setLoading] = useState(true);
  const questions = useAppSelector(selectAnsweredQuestions);
  let score = 0;
  questions.forEach((question) => {
    if (question.correct) {
      score += question.score;
    }
  });
  const failed = questions.filter((question) => question.correct === false);
  const correct = questions.filter((question) => question.correct).length;
  
  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length === 0) {
      navigate('/');
    }
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  } , [navigate, questions.length])

  
  if (loading) {
    return <CalculateLoader />;
  }

  return ( 
    <div className="h-screen w-full home flex items-center flex-col py-12 fade-in">
      <h1 className="text-5xl font-bold mb-5 text-[#936e8f]">Quiz Results</h1>
      <Progress color="cyan" value={50} />
      <div className="text-center">
        <RingProgress
          size={170}
          thickness={15}
          roundCaps
          label={
            <Text c="#936e8f" fw={700} ta="center" size="xl">
              {score}
            </Text>
          }
          sections={[
            { value: score / 10, color: '#e1a7da' },
          ]}
        />
        <p>Total Score</p>
      </div>
      {score > 600 ? <h2 className="mb-10 text-[#12b886] font-bold">You passed. Well done</h2>
      : <h2 className="mb-10 text-[#f03e3e] font-bold">Almost there. Better luck next time</h2>}
      <div className="flex gap-4 md:gap-24 mb-20">
        <div className="text-center">
          <RingProgress
            size={120}
            thickness={9}
            roundCaps
            label={
              <Text c="#936e8f" fw={700} ta="center">
                {correct}
              </Text>
            }
            sections={[
              { value: (correct / 2) * 10, color: '#e1a7da' },
            ]}
          />
          <p>Correct answers</p>
        </div>
        <div className="text-center">
          <RingProgress
            size={120}
            thickness={9}
            roundCaps
            label={
              <Text c="#936e8f" fw={700} ta="center">
                {questions.length - correct}
              </Text>
            }
            sections={[
              { value: ((questions.length - correct) / 2) * 10, color: '#e1a7da' },
            ]}
          />
          <p>Wrong answers</p>
        </div>
        <div className="text-center">
          <RingProgress
            size={120}
            thickness={9}
            roundCaps
            label={
              <Text c="#936e8f" fw={700} ta="center">
                {correct / 2 * 10}%
              </Text>
            }
            sections={[
              { value: correct / 2 * 10, color: '#e1a7da' },
            ]}
          />
          <p>Percentage correct</p>
        </div>
      </div>
      <div className="px-8 pb-20">
        <h2 className="mb-10 text-[#936e8f] font-bold text-center text-xl">Wrong Answers</h2>
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="red" size={24} radius="xl">
              <IconXboxX style={{ width: rem(16), height: rem(16) }} />
            </ThemeIcon>
          }
        >
          {failed.map((question) => (
            <List.Item>Question {question.number}: {question.text} - Correct answer: {question.answer}</List.Item>
          )
          )}
        </List>
      </div>
    </div>
   );
}
 
export default Result;