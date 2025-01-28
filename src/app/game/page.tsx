'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  questionText: string;
  options: string[];
  points: number;
}

export default function Game() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20); // 20 seconds per question
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Fetch questions when component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleNextQuestion();
    }
  }, [timeLeft, isAnswered]);

  const handleAnswerClick = async (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    // Send answer to API
    try {
      const response = await fetch('/api/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: questions[currentQuestionIndex].id,
          answer: questions[currentQuestionIndex].options[answerIndex],
        }),
      });

      const data = await response.json();
      if (data.correct) {
        setScore(score + questions[currentQuestionIndex].points);
        setCorrectAnswers(prev => prev + 1);
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }

    // Wait 2 seconds before moving to next question
    setTimeout(handleNextQuestion, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(20);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // Game over - save score and redirect with both score and correct answers
      router.push(`/results?score=${score}&correct=${correctAnswers}&total=${questions.length}`);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl font-bold text-gray-600">Loading...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-[100dvh] bg-gray-800 px-3 py-2">
      <div className="max-w-lg mx-auto">
        {/* Progress, Timer, and Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
          <div className="text-base sm:text-lg font-semibold text-white">
            Вопрос {currentQuestionIndex + 1} из {questions.length}
          </div>
          <div className="flex gap-3 items-center">
            <div className="text-sm sm:text-base text-green-400 font-semibold">
              Правильных: {correctAnswers}
            </div>
            <div className="text-base sm:text-lg font-bold text-blue-400">
              {timeLeft} сек
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-2xl font-bold mb-3 text-gray-900">
            {currentQuestion.questionText}
          </h2>
          <div className="text-sm sm:text-base text-gray-800">
            {currentQuestion.points} очков
          </div>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={isAnswered}
              className={`
                p-4 sm:p-6 rounded-lg text-white font-bold text-base sm:text-lg transition-all shadow-lg
                ${isAnswered 
                  ? index === selectedAnswer
                    ? isCorrect 
                      ? 'bg-green-500 scale-95'
                      : 'bg-red-500 scale-95'
                    : 'bg-gray-600'
                  : `${
                      index === 0 ? 'bg-red-500 active:bg-red-400' :
                      index === 1 ? 'bg-blue-500 active:bg-blue-400' :
                      index === 2 ? 'bg-yellow-500 active:bg-yellow-400' :
                      'bg-green-500 active:bg-green-400'
                    } active:scale-95`
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Score and Correct Answers */}
        <div className="mt-4 text-center space-y-1">
          <div className="text-base sm:text-xl font-bold text-white">
            Текущий счет: {score}
          </div>
          <div className="text-sm sm:text-lg text-green-400 font-semibold">
            Правильных ответов: {correctAnswers} из {currentQuestionIndex + 1}
          </div>
        </div>
      </div>
    </div>
  );
} 