import { defineConfig } from 'drizzle-kit';
import env from './src/env';

export default defineConfig({
  schema: 'apps/drizzle/src/db/aiofc/schema.ts',
  out: 'apps/drizzle/src/db/aiofc/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
