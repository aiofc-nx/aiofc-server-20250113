import { Module } from '@nestjs/common';
import { TenantModule } from '../tenant/tenant.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [TenantModule, DrizzleModule],
  exports: [DrizzleModule],
})
export class TenantDatabaseModule {}
