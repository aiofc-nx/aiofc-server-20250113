import { Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { AbstractDao } from '../../entities/abstract.dao';

import { InjectDrizzle } from '../../drizzle/drizzle.decorator';
import { Job, jobs, NewJob } from '@aiofc/drizzle-schema';

@Injectable()
export class JobDao extends AbstractDao<typeof jobs, Job, NewJob> {
  constructor(
    @InjectDrizzle()
    protected readonly db: PostgresJsDatabase,
  ) {
    super(db, jobs);
  }
}
