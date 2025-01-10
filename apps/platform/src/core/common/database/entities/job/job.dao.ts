import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DatabaseConfig } from '../../config/database.config';
import { PG_CONNECTION } from '../../drizzle/pg-connection';
import { AbstractDao } from '../../entities/abstract.dao';
import * as schemas from '../../entities/job/job.entity';
import {
  JobEntity,
  JobEntityInsert,
  jobs,
} from '../../entities/job/job.entity';
import { InjectDrizzle } from '../../drizzle/drizzle.decorator';

@Injectable()
export class JobDao extends AbstractDao<
  typeof jobs,
  JobEntity,
  JobEntityInsert
> {
  constructor(
    @InjectDrizzle()
    protected readonly db: PostgresJsDatabase,
    protected readonly dbConfig: DatabaseConfig,
  ) {
    super(db, jobs, dbConfig);
  }
}
