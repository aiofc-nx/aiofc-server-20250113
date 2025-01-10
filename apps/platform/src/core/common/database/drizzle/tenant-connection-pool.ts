import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DrizzleModuleConfig } from './drizzle.interface';

export class TenantConnectionPool {
  private static pools: Map<
    string,
    {
      db: ReturnType<typeof drizzle>;
      client: ReturnType<typeof postgres>;
    }
  > = new Map();

  static async getPool(tenantId: string, config: DrizzleModuleConfig) {
    const poolKey = `tenant_${tenantId}`;

    if (!this.pools.has(poolKey)) {
      const url = `${config.postgres.url}?options=-c%20search_path=${poolKey}`;
      const client = postgres(url, {
        ...config.postgres.config,
        max: 10,
        idle_timeout: 20,
        connect_timeout: 10,
      });
      const db = drizzle(client);

      this.pools.set(poolKey, { db, client });
      console.log(`Created new connection pool for tenant: ${tenantId}`);
    }

    return this.pools.get(poolKey).db;
  }

  static async closeAll() {
    for (const [tenant, { client }] of this.pools.entries()) {
      await client.end();
      console.log(`Closed connection pool for tenant: ${tenant}`);
    }
    this.pools.clear();
  }
}
