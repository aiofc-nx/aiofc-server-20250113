import { Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { AbstractDao } from '../../entities/abstract.dao';
import { jobs, NewJob } from '@aiofc/drizzle-schema';
import { TENANT_PG_CONNECTION } from '../../drizzle/drizzle.constants';
import { Inject } from '@nestjs/common';

@Injectable()
export class JobDao extends AbstractDao<typeof jobs, NewJob> {
  constructor(
    @Inject(TENANT_PG_CONNECTION)
    protected readonly db: PostgresJsDatabase,
  ) {
    super(db, jobs);
  }
}
