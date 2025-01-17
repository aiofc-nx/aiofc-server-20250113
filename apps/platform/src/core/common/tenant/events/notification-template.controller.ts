import { Controller, Get, Param, Query } from '@nestjs/common';
import { NotificationTemplateService } from './notification-template.service';

@Controller('notification-templates')
export class NotificationTemplateController {
  constructor(private readonly templateService: NotificationTemplateService) {}

  @Get(':type/preview')
  async previewTemplate(
    @Param('type') type: string,
    @Query('tenantId') tenantId: string,
  ) {
    const mockData = {
      tenant: {
        id: tenantId,
        name: 'Test Tenant',
      },
      event: {
        type: type,
        timestamp: new Date(),
      },
      data: this.getMockDataByType(type),
    };

    const template = this.templateService.getTemplate(type, mockData);
    const html = this.templateService.getHtmlTemplate(
      type,
      mockData,
      this.templateService.defaultTheme,
    );
    const plainText = this.templateService.renderTemplate(template);

    return {
      subject: template.subject,
      html,
      plainText,
    };
  }

  private getMockDataByType(type: string): any {
    switch (type) {
      case 'resource.warning':
        return {
          type: 'storage',
          current: 85,
          limit: 100,
        };
      case 'config.changed':
        return {
          oldConfig: { maxUsers: 10 },
          newConfig: { maxUsers: 20 },
        };
      default:
        return {};
    }
  }
}
