import { db } from '@/db';
import { questions } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allQuestions = await db.select().from(questions);
    
    // Shuffle questions and take 10
    const shuffledQuestions = allQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    return NextResponse.json(shuffledQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
} 