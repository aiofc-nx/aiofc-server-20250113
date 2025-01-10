import { defineConfig } from 'drizzle-kit';
import env from './env';

export default defineConfig({
  schema: 'packages/drizzle-schema/src/schemas/aiofc.schema.ts',
  out: 'packages/drizzle-schema/src/migrations/aiofc',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
