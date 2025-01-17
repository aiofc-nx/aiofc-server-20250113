import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobDao } from '../../../core/common/database/entities/job/job.dao';
import { AppConfig } from '../../../config/app-config.service';
import { TenantDatabaseModule } from '../../../core/common/database/tenant-database.module';

@Module({
  imports: [TenantDatabaseModule],
  controllers: [JobsController],
  providers: [JobsService, JobDao, AppConfig],
})
export class JobsModule {}
