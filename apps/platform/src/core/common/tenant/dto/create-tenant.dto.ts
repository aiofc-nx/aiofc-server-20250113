import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'Tenant ID can only contain letters, numbers, underscores and hyphens',
  })
  tenantId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;
}
