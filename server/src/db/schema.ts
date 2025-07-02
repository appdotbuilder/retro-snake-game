
import { serial, text, pgTable, timestamp, integer } from 'drizzle-orm/pg-core';

export const gameScoresTable = pgTable('game_scores', {
  id: serial('id').primaryKey(),
  player_name: text('player_name').notNull(),
  score: integer('score').notNull(),
  game_duration: integer('game_duration').notNull(), // Duration in seconds
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type GameScore = typeof gameScoresTable.$inferSelect; // For SELECT operations
export type NewGameScore = typeof gameScoresTable.$inferInsert; // For INSERT operations

// Export all tables for proper query building
export const tables = { gameScores: gameScoresTable };
