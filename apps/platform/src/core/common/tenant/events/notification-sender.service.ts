import { Injectable, Logger } from '@nestjs/common';
import {
  NotificationConfig,
  NotificationMessage,
} from './notification-config.interface';
import axios from 'axios';
import * as crypto from 'crypto';
import { NotificationTemplateService } from './notification-template.service';

@Injectable()
export class NotificationSenderService {
  private readonly logger = new Logger(NotificationSenderService.name);

  constructor(private readonly templateService: NotificationTemplateService) {}

  async sendNotification(
    message: NotificationMessage,
    config: NotificationConfig,
  ) {
    try {
      const promises: Promise<any>[] = [];

      if (config.email?.enabled) {
        promises.push(this.sendEmailNotification(message, config.email));
      }

      if (config.webhook?.enabled) {
        promises.push(this.sendWebhookNotification(message, config.webhook));
      }

      if (config.slack?.enabled) {
        promises.push(this.sendSlackNotification(message, config.slack));
      }

      await Promise.all(promises);
    } catch (error) {
      this.logger.error(
        `Failed to send notification: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private async sendEmailNotification(
    message: NotificationMessage,
    config: NotificationConfig['email'],
  ) {
    const template = this.templateService.getTemplate(message.type, {
      tenant: {
        id: message.tenant,
        name: message.tenant, // 这里应该从租户服务获取名称
      },
      event: {
        type: message.type,
        timestamp: message.timestamp || new Date(),
      },
      data: message.details,
    });

    const renderedBody = this.templateService.renderTemplate(template);

    this.logger.log(
      `Sending email notification to ${config.recipients.join(', ')}: ${template.subject}\nBody: ${renderedBody}`,
    );
    // TODO: 使用实际的邮件服务发送
    // await emailService.send({
    //   to: config.recipients,
    //   from: config.from,
    //   subject: template.subject,
    //   html: renderedBody,
    // });
  }

  private async sendWebhookNotification(
    message: NotificationMessage,
    config: NotificationConfig['webhook'],
  ) {
    const signature = this.generateWebhookSignature(message, config.secret);

    try {
      await axios.post(config.url, message, {
        headers: {
          'Content-Type': 'application/json',
          'X-Signature': signature,
        },
      });
      this.logger.log(`Webhook notification sent to ${config.url}`);
    } catch (error) {
      this.logger.error(`Webhook notification failed: ${error.message}`);
      throw error;
    }
  }

  private async sendSlackNotification(
    message: NotificationMessage,
    config: NotificationConfig['slack'],
  ) {
    try {
      await axios.post(config.webhookUrl, {
        channel: config.channel,
        text: this.formatSlackMessage(message),
      });
      this.logger.log(`Slack notification sent to ${config.channel}`);
    } catch (error) {
      this.logger.error(`Slack notification failed: ${error.message}`);
      throw error;
    }
  }

  private generateWebhookSignature(message: any, secret: string): string {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(JSON.stringify(message));
    return hmac.digest('hex');
  }

  private formatSlackMessage(message: NotificationMessage): string {
    const emoji = {
      warning: '⚠️',
      info: 'ℹ️',
      alert: '🚨',
    }[message.type];

    return `${emoji} *${message.tenant}*: ${message.message}\n\`\`\`${JSON.stringify(message.details, null, 2)}\`\`\``;
  }
}
