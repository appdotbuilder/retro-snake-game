
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

import { createGameScoreInputSchema, getHighScoresInputSchema } from './schema';
import { createGameScore } from './handlers/create_game_score';
import { getHighScores } from './handlers/get_high_scores';
import { getGameStats } from './handlers/get_game_stats';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  
  // Create a new game score entry
  createGameScore: publicProcedure
    .input(createGameScoreInputSchema)
    .mutation(({ input }) => createGameScore(input)),
  
  // Get high scores with optional limit
  getHighScores: publicProcedure
    .input(getHighScoresInputSchema)
    .query(({ input }) => getHighScores(input)),
  
  // Get overall game statistics
  getGameStats: publicProcedure
    .query(() => getGameStats()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`Snake Game TRPC server listening at port: ${port}`);
}

start();
