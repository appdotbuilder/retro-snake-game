
import { z } from 'zod';

// Game score schema
export const gameScoreSchema = z.object({
  id: z.number(),
  player_name: z.string(),
  score: z.number().int(),
  game_duration: z.number().int(), // Duration in seconds
  created_at: z.coerce.date()
});

export type GameScore = z.infer<typeof gameScoreSchema>;

// Input schema for creating a new game score
export const createGameScoreInputSchema = z.object({
  player_name: z.string().min(1).max(50), // Player name with length validation
  score: z.number().int().nonnegative(), // Score must be non-negative integer
  game_duration: z.number().int().nonnegative() // Game duration in seconds
});

export type CreateGameScoreInput = z.infer<typeof createGameScoreInputSchema>;

// Input schema for getting high scores with optional limit
export const getHighScoresInputSchema = z.object({
  limit: z.number().int().positive().optional().default(10) // Default to top 10 scores
});

export type GetHighScoresInput = z.infer<typeof getHighScoresInputSchema>;

// Game statistics schema for potential future use
export const gameStatsSchema = z.object({
  total_games: z.number().int(),
  highest_score: z.number().int(),
  average_score: z.number(),
  total_playtime: z.number().int() // Total playtime in seconds
});

export type GameStats = z.infer<typeof gameStatsSchema>;
