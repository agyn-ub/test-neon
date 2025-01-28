'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Results() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const score = searchParams.get('score');
  const correct = searchParams.get('correct');
  const total = searchParams.get('total');

  if (!score || !correct || !total) {
    router.push('/');
    return null;
  }

  const percentage = Math.round((Number(correct) / Number(total)) * 100);
  const getMessage = () => {
    if (percentage >= 80) return 'Отлично! Вы настоящий знаток Реал Мадрида!';
    if (percentage >= 60) return 'Хороший результат! Вы хорошо знаете историю клуба!';
    if (percentage >= 40) return 'Неплохо! Есть куда расти!';
    return 'Попробуйте еще раз, чтобы улучшить свой результат!';
  };

  return (
    <div className="min-h-[100dvh] bg-gray-800 px-3 py-4 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-xl p-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Результаты квиза
        </h1>

        <div className="space-y-4 mb-8">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-lg sm:text-xl font-semibold text-blue-900">
              Итоговый счет: {score}
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-lg sm:text-xl font-semibold text-green-900">
              Правильных ответов: {correct} из {total}
            </p>
            <p className="text-base sm:text-lg font-medium text-green-800 mt-1">
              ({percentage}%)
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-base sm:text-lg text-gray-800">
              {getMessage()}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Link 
            href="/game"
            className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg text-center transition-colors"
          >
            Играть снова
          </Link>
          
          <Link 
            href="/"
            className="block w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white font-semibold rounded-lg text-center transition-colors"
          >
            В главное меню
          </Link>
        </div>
      </div>
    </div>
  );
} 