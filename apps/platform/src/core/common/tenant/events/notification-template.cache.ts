import { Injectable } from '@nestjs/common';
import {
  NotificationTemplate,
  TemplateData,
} from './notification-template.interface';

@Injectable()
export class NotificationTemplateCache {
  private cache: Map<
    string,
    {
      template: NotificationTemplate;
      timestamp: number;
    }
  > = new Map();

  private readonly TTL = 5 * 60 * 1000; // 5分钟缓存

  set(key: string, template: NotificationTemplate): void {
    this.cache.set(key, {
      template,
      timestamp: Date.now(),
    });
  }

  get(key: string): NotificationTemplate | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return cached.template;
  }

  generateKey(type: string, data: TemplateData): string {
    return `${type}:${data.tenant.id}:${data.event.type}`;
  }

  clear(): void {
    this.cache.clear();
  }
}
