import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class TenantContextService {
  private tenantId: string;

  setTenantId(tenantId: string) {
    this.tenantId = tenantId;
  }

  getTenantId(): string {
    return this.tenantId;
  }
}
