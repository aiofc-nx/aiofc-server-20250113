import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobDao } from '../../../core/common/database/entities/job/job.dao';
import { DatabaseConfig } from '../../../core/common/database/config/database.config';

@Module({
  controllers: [JobsController],
  providers: [JobsService, JobDao, DatabaseConfig],
})
export class JobsModule {}
