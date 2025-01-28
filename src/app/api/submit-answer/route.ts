import { db } from '@/db';
import { questions } from '@/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { questionId, answer } = await request.json();

    const [question] = await db
      .select()
      .from(questions)
      .where(eq(questions.id, questionId));

    const isCorrect = question.correctAnswer === answer;

    return NextResponse.json({
      correct: isCorrect,
      points: isCorrect ? question.points : 0
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    return NextResponse.json(
      { error: 'Failed to submit answer' },
      { status: 500 }
    );
  }
} 