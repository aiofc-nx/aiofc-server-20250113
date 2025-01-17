import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TenantEvent, TenantEventType } from './tenant.events';
import { NotificationSenderService } from './notification-sender.service';
import {
  NotificationConfig,
  NotificationMessage,
} from './notification-config.interface';

@Injectable()
export class TenantNotificationService {
  private readonly logger = new Logger(TenantNotificationService.name);

  constructor(private readonly notificationSender: NotificationSenderService) {}

  @OnEvent(TenantEventType.RESOURCE_WARNING)
  async handleResourceWarning(event: TenantEvent) {
    this.logger.warn(
      `Resource warning for tenant ${event.tenantId}: ${JSON.stringify(event.payload)}`,
    );
    await this.sendNotification({
      type: 'warning',
      tenant: event.tenantId,
      message: `Resource warning: ${event.payload.type}`,
      details: event.payload,
    });
  }

  @OnEvent(TenantEventType.CONFIG_CHANGED)
  async handleConfigChange(event: TenantEvent) {
    this.logger.log(`Config changed for tenant ${event.tenantId}`);
    await this.sendNotification({
      type: 'info',
      tenant: event.tenantId,
      message: 'Configuration updated',
      details: {
        oldConfig: event.payload.oldConfig,
        newConfig: event.payload.newConfig,
      },
    });
  }

  @OnEvent(TenantEventType.STATUS_CHANGED)
  async handleStatusChange(event: TenantEvent) {
    this.logger.log(
      `Status changed for tenant ${event.tenantId} to ${event.payload.status}`,
    );
    await this.sendNotification({
      type: 'alert',
      tenant: event.tenantId,
      message: `Tenant status changed to ${event.payload.status}`,
      details: event.payload,
    });
  }

  private async sendNotification(notification: NotificationMessage) {
    // 获取租户的通知配置
    const config: NotificationConfig = {
      email: {
        enabled: true,
        recipients: ['admin@example.com'],
        from: 'noreply@example.com',
      },
      webhook: {
        enabled: true,
        url: process.env.WEBHOOK_URL,
        secret: process.env.WEBHOOK_SECRET,
      },
      slack: {
        enabled: true,
        webhookUrl: process.env.SLACK_WEBHOOK_URL,
        channel: '#tenant-notifications',
      },
    };

    await this.notificationSender.sendNotification(notification, config);
  }
}
