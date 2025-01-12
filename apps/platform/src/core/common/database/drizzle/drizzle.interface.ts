import { DrizzleConfig } from 'drizzle-orm';
import { Options, PostgresType } from 'postgres';

export interface DrizzleModuleConfig {
  postgres: {
    url: string;
    config?: Options<Record<string, PostgresType<any>>>;
  };
  schema?: any;
  config?: DrizzleConfig<any>;
  tag?: string;
}
