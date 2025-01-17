import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Logger,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantConfigDto } from './dto/tenant-config.dto';

@Controller('tenants')
export class TenantController {
  private readonly logger = new Logger(TenantController.name);

  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async createTenant(@Body() createTenantDto: CreateTenantDto) {
    this.logger.log(`Creating tenant: ${createTenantDto.tenantId}`);
    await this.tenantService.initializeTenant(createTenantDto.tenantId);
    return { message: 'Tenant created successfully' };
  }

  @Get(':id')
  async getTenant(@Param('id') id: string) {
    return this.tenantService.getTenantInfo(id);
  }

  @Patch(':id/status')
  async updateTenantStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateTenantDto,
  ) {
    this.logger.log(`Updating tenant status: ${id} to ${updateDto.status}`);
    return this.tenantService.updateTenantStatus(id, updateDto);
  }

  @Get(':id/status')
  async getTenantStatus(@Param('id') id: string) {
    const tenant = await this.tenantService.getTenantInfo(id);
    return { status: tenant.status };
  }

  @Patch(':id/config')
  async updateTenantConfig(
    @Param('id') id: string,
    @Body() config: TenantConfigDto,
  ) {
    this.logger.log(`Updating config for tenant: ${id}`);
    return this.tenantService.updateTenantConfig(id, config);
  }

  @Get(':id/config')
  async getTenantConfig(@Param('id') id: string) {
    return this.tenantService.getTenantConfig(id);
  }

  @Get(':id/usage')
  async getTenantUsage(@Param('id') id: string) {
    const userCount = await this.tenantService.getCurrentUserCount(id);
    const storageUsage = await this.tenantService.getCurrentStorageUsage(id);

    return {
      userCount,
      storageUsage: `${storageUsage}GB`,
      activeConnections: await this.tenantService.checkActiveConnections(id),
    };
  }
}
