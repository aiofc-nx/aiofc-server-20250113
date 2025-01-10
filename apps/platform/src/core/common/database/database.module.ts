import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { JobDao } from './entities/job/job.dao';
import { EntitiesSchema } from './entities/entities.schema';
import { DatabaseConfig } from './config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DrizzleModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        postgres: {
          url: `postgres://${configService.get('DB_USER')}:${configService.get('DB_PASSWORD')}@${configService.get('DB_HOST_NAME')}:${configService.get('DB_PORT')}/${configService.get('DB_NAME')}`,
          config: {
            max: 1,
          },
        },
        schema: EntitiesSchema,
      }),
    }),
  ],
  providers: [JobDao, DatabaseConfig],
  exports: [JobDao],
})
export class DatabaseModule {}
