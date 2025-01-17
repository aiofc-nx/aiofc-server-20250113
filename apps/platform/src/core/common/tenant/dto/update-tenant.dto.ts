import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum TenantStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  SUSPENDED = 'suspended',
}

export class UpdateTenantDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TenantStatus)
  status?: TenantStatus;
}
