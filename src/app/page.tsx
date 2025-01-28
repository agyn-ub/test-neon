import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Real Madrid Quiz
        </h1>
        
        <div className="space-y-4">
          <Link 
            href="/game"
            className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-center transition-colors"
          >
            Начать игру
          </Link>

          <Link 
            href="/results"
            className="block w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-center transition-colors"
          >
            Мои результаты
          </Link>

          <Link 
            href="/leaderboard"
            className="block w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg text-center transition-colors"
          >
            Таблица лидеров
          </Link>
        </div>

        <p className="text-sm text-gray-600 text-center mt-8">
          Проверьте свои знания о Реал Мадриде с 2010 года
        </p>
      </div>
    </main>
  );
}
