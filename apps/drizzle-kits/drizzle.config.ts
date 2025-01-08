import { defineConfig } from 'drizzle-kit';
import env from './src/env';

export default defineConfig({
  schema: 'apps/drizzle/src/db/schema/index.ts',
  out: 'apps/drizzle/src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
