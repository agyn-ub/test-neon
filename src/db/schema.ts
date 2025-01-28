import { pgTable, serial, varchar, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table (with Telegram info)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  telegramId: varchar('telegram_id', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 255 }),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  photoUrl: varchar('photo_url', { length: 1000 }),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Questions table
export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  questionText: text('question_text').notNull(),
  options: text('options').array().notNull(),
  correctAnswer: text('correct_answer').notNull(),
  points: integer('points').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Scores table
export const scores = pgTable('scores', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  score: integer('score').notNull(),
  achievedAt: timestamp('achieved_at').defaultNow().notNull(),
});

// Define relationships
export const userRelations = relations(users, ({ many }) => ({
  scores: many(scores),
}));

export const scoreRelations = relations(scores, ({ one }) => ({
  user: one(users, {
    fields: [scores.userId],
    references: [users.id],
  }),
})); 