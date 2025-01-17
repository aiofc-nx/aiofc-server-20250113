import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TenantEvent, TenantEventType } from './tenant.events';

@Injectable()
export class TenantEventService {
  private readonly logger = new Logger(TenantEventService.name);

  constructor(private eventEmitter: EventEmitter2) {}

  emit(type: TenantEventType, tenantId: string, payload: any) {
    const event = new TenantEvent(type, tenantId, payload);
    this.logger.log(`Emitting event: ${type} for tenant: ${tenantId}`);
    this.eventEmitter.emit(type, event);
  }

  async notifyResourceWarning(tenantId: string, metrics: any) {
    this.emit(TenantEventType.RESOURCE_WARNING, tenantId, {
      metrics,
      timestamp: new Date(),
    });
  }
}
