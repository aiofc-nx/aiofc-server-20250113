import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { JobDao } from '../../../core/common/database/entities/job/job.dao';
import { DrizzleModule } from '../../../core/common/database/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { TENANT_PG_CONNECTION } from '../../../core/common/database/drizzle/drizzle.constants';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres, { Options } from 'postgres';

describe('JobsService', () => {
  let service: JobsService;
  let jobDao: JobDao;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        DrizzleModule,
      ],
      providers: [
        JobsService,
        JobDao,
        {
          provide: TENANT_PG_CONNECTION,
          useFactory: () => {
            if (!process.env.DATABASE_URL) {
              throw new Error('DATABASE_URL is not defined');
            }
            const client = postgres(process.env.DATABASE_URL, {
              options: ['tenant_default'],
            } as Options<{}>);
            return drizzle(client);
          },
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    jobDao = module.get<JobDao>(JobDao);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jobDao).toBeDefined();
  });

  it('should create job for specific tenant', async () => {
    const tenantId = 'tenant1';
    const jobName = 'test-job';
    const result = await service.addJob(jobName, tenantId);

    expect(result.name).toBe(jobName);
    expect(result.tenantId).toBe(tenantId);
  });
});
