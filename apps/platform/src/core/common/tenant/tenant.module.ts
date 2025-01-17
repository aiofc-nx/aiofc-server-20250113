import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { SchemaService } from '../database/schema.service';
import { MigrationService } from '../database/migrations/migration.service';
import { DrizzleModule } from '../database/drizzle/drizzle.module';
import { TenantEventService } from './events/tenant-event.service';
import { TenantContextService } from './tenant-context.service';

@Module({
  imports: [DrizzleModule, EventEmitterModule.forRoot()],
  controllers: [TenantController],
  providers: [
    TenantService,
    SchemaService,
    MigrationService,
    TenantEventService,
    TenantContextService,
  ],
  exports: [TenantService, TenantContextService],
})
export class TenantModule {}
