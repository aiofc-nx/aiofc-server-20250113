import { IsNumber, IsOptional, Min, Max } from 'class-validator';

export class TenantConfigDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(1000)
  maxUsers?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  maxConcurrentConnections?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  storageLimit?: number; // in GB
}
