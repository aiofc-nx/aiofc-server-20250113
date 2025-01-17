export enum TenantEventType {
  CREATED = 'tenant.created',
  UPDATED = 'tenant.updated',
  CONFIG_CHANGED = 'tenant.config_changed',
  STATUS_CHANGED = 'tenant.status_changed',
  RESOURCE_WARNING = 'tenant.resource_warning',
}

export class TenantEvent {
  constructor(
    public readonly type: TenantEventType,
    public readonly tenantId: string,
    public readonly payload: any,
    public readonly timestamp: Date = new Date(),
  ) {}
}
