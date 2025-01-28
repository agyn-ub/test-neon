import { db } from './index';
import { questions } from './schema';
import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

// Load environment variables from .env file
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create a new pool with SSL config
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Create a new db instance
const database = drizzle(pool);

const questionsData = [
  {
    questionText: 'Кто забил решающий гол за Реал Мадрид в финале Лиги Чемпионов 2014 года против Атлетико Мадрид?',
    difficulty: 'easy',
    options: ['Криштиану Роналду', 'Гарет Бейл', 'Серхио Рамос', 'Карим Бензема'],
    correctAnswer: 'Серхио Рамос',
    points: 1,
  },
  {
    questionText: 'Сколько титулов Лиги Чемпионов выиграл Реал Мадрид с 2014 по 2018 год?',
    difficulty: 'medium',
    options: ['2', '3', '4', '5'],
    correctAnswer: '4',
    points: 3,
  },
  {
    questionText: 'В каком году Реал Мадрид завоевал "Ла Десима" (свой 10-й титул Лиги Чемпионов)?',
    difficulty: 'medium',
    options: ['2012', '2013', '2014', '2015'],
    correctAnswer: '2014',
    points: 3,
  },
  {
    questionText: 'Кто забил гол через себя за Реал Мадрид в финале Лиги Чемпионов 2018 года против Ливерпуля?',
    difficulty: 'easy',
    options: ['Криштиану Роналду', 'Гарет Бейл', 'Карим Бензема', 'Лука Модрич'],
    correctAnswer: 'Гарет Бейл',
    points: 1,
  },
  {
    questionText: 'Какой игрок Реала Мадрид выиграл Золотой Мяч в 2022 году?',
    difficulty: 'easy',
    options: ['Лука Модрич', 'Тибо Куртуа', 'Карим Бензема', 'Винисиус Жуниор'],
    correctAnswer: 'Карим Бензема',
    points: 1,
  },
  {
    questionText: 'Кто был главным тренером Реал Мадрида во время трех последовательных побед в Лиге Чемпионов (2016-2018)?',
    difficulty: 'medium',
    options: ['Жозе Моуринью', 'Карло Анчелотти', 'Зинедин Зидан', 'Рафаэль Бенитес'],
    correctAnswer: 'Зинедин Зидан',
    points: 3,
  },
  {
    questionText: 'Кто был признан лучшим игроком матча в финале Лиги Чемпионов 2022 года между Реал Мадридом и Ливерпулем?',
    difficulty: 'hard',
    options: ['Карим Бензема', 'Лука Модрич', 'Тибо Куртуа', 'Винисиус Жуниор'],
    correctAnswer: 'Тибо Куртуа',
    points: 5,
  },
  {
    questionText: 'Сколько голов забил Криштиану Роналду за Реал Мадрид во всех соревнованиях до своего ухода в 2018 году?',
    difficulty: 'hard',
    options: ['401', '438', '450', '491'],
    correctAnswer: '450',
    points: 5,
  },
  {
    questionText: 'Кто стал лучшим бомбардиром Лиги Чемпионов в сезоне 2021/22, помогая Реал Мадриду выиграть трофей?',
    difficulty: 'medium',
    options: ['Винисиус Жуниор', 'Карим Бензема', 'Лука Модрич', 'Родриго'],
    correctAnswer: 'Карим Бензема',
    points: 3,
  },
  {
    questionText: 'В каком году Лука Модрич выиграл Золотой Мяч, будучи игроком Реал Мадрида?',
    difficulty: 'medium',
    options: ['2016', '2017', '2018', '2019'],
    correctAnswer: '2018',
    points: 3,
  },
  {
    questionText: 'Кто забил победный гол в финале Лиги Чемпионов 2022 года против Ливерпуля?',
    difficulty: 'easy',
    options: ['Карим Бензема', 'Винисиус Жуниор', 'Федерико Вальверде', 'Тони Кроос'],
    correctAnswer: 'Винисиус Жуниор',
    points: 1,
  },
  {
    questionText: 'Сколько Лиг Чемпионов выиграл Карло Анчелотти с Реал Мадридом в качестве тренера?',
    difficulty: 'medium',
    options: ['1', '2', '3', '4'],
    correctAnswer: '3',
    points: 3,
  },
  {
    questionText: 'В каком году Реал Мадрид подписал контракт с Тони Кроосом?',
    difficulty: 'hard',
    options: ['2013', '2014', '2015', '2016'],
    correctAnswer: '2014',
    points: 5,
  },
  {
    questionText: 'Кто был капитаном Реал Мадрида после ухода Серхио Рамоса в 2021 году?',
    difficulty: 'easy',
    options: ['Карим Бензема', 'Лука Модрич', 'Тони Кроос', 'Начо'],
    correctAnswer: 'Карим Бензема',
    points: 1,
  },
  {
    questionText: 'Какой вратарь Реал Мадрида установил рекорд по "сухим" матчам в сезоне 2019/20?',
    difficulty: 'medium',
    options: ['Икер Касильяс', 'Кейлор Навас', 'Тибо Куртуа', 'Андрей Лунин'],
    correctAnswer: 'Тибо Куртуа',
    points: 3,
  },
  {
    questionText: 'Сколько голов забил Карим Бензема в сезоне 2021/22 во всех соревнованиях?',
    difficulty: 'hard',
    options: ['34', '44', '54', '44'],
    correctAnswer: '44',
    points: 5,
  },
  {
    questionText: 'Кто был самым молодым игроком, дебютировавшим за Реал Мадрид в период с 2010 по 2023 год?',
    difficulty: 'hard',
    options: ['Мартин Эдегор', 'Винисиус Жуниор', 'Родриго', 'Эдуардо Камавинга'],
    correctAnswer: 'Мартин Эдегор',
    points: 5,
  },
  {
    questionText: 'В каком году Реал Мадрид выиграл свой последний требл (Ла Лига, Кубок Короля и Лига Чемпионов в одном сезоне)?',
    difficulty: 'hard',
    options: ['2014', '2016', '2017', 'Никогда'],
    correctAnswer: 'Никогда',
    points: 5,
  },
  {
    questionText: 'Кто забил 500-й гол Реал Мадрида в Лиге Чемпионов?',
    difficulty: 'medium',
    options: ['Криштиану Роналду', 'Карим Бензема', 'Серхио Рамос', 'Гарет Бейл'],
    correctAnswer: 'Карим Бензема',
    points: 3,
  },
  {
    questionText: 'Какой игрок провел больше всего матчей за Реал Мадрид в период 2010-2023?',
    difficulty: 'medium',
    options: ['Карим Бензема', 'Серхио Рамос', 'Марсело', 'Лука Модрич'],
    correctAnswer: 'Серхио Рамос',
    points: 3,
  },
  {
    questionText: 'В каком году Реал Мадрид установил рекорд по количеству побед подряд (22 матча)?',
    difficulty: 'hard',
    options: ['2011', '2014', '2017', '2019'],
    correctAnswer: '2014',
    points: 5,
  },
  {
    questionText: 'Кто был первым трансфером Реал Мадрида стоимостью более 100 миллионов евро?',
    difficulty: 'easy',
    options: ['Криштиану Роналду', 'Гарет Бейл', 'Эден Азар', 'Хамес Родригес'],
    correctAnswer: 'Гарет Бейл',
    points: 1,
  },
  {
    questionText: 'Сколько раз Реал Мадрид выигрывал Суперкубок УЕФА с 2010 по 2023 год?',
    difficulty: 'medium',
    options: ['2', '3', '4', '5'],
    correctAnswer: '4',
    points: 3,
  },
  {
    questionText: 'Кто забил решающий пенальти в финале Лиги Чемпионов 2016 года против Атлетико Мадрид?',
    difficulty: 'medium',
    options: ['Криштиану Роналду', 'Серхио Рамос', 'Гарет Бейл', 'Марсело'],
    correctAnswer: 'Криштиану Роналду',
    points: 3,
  },
  {
    questionText: 'В каком сезоне Реал Мадрид набрал рекордные 100 очков в Ла Лиге?',
    difficulty: 'hard',
    options: ['2010/11', '2011/12', '2012/13', '2013/14'],
    correctAnswer: '2011/12',
    points: 5,
  },
  {
    questionText: 'Какой игрок Реал Мадрида получил награду Golden Boy, будучи игроком клуба?',
    difficulty: 'hard',
    options: ['Винисиус Жуниор', 'Родриго', 'Федерико Вальверде', 'Никто'],
    correctAnswer: 'Никто',
    points: 5,
  },
  {
    questionText: 'Кто был автором 1000-го гола Реал Мадрида в Лиге Чемпионов?',
    difficulty: 'medium',
    options: ['Карим Бензема', 'Винисиус Жуниор', 'Родриго', 'Лука Модрич'],
    correctAnswer: 'Родриго',
    points: 3,
  },
  {
    questionText: 'Сколько "Пичичи" (лучший бомбардир Ла Лиги) выиграл Карим Бензема с Реал Мадридом?',
    difficulty: 'easy',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
    points: 1,
  },
].map(q => ({
  ...q,
  points: q.difficulty === 'easy' ? 1 : q.difficulty === 'medium' ? 3 : 5
}));

async function seed() {
  try {
    await database.insert(questions).values(questionsData);
    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seed(); 