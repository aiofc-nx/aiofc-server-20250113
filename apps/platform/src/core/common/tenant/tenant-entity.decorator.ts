export function TenantEntity() {
  return function (constructor: Function) {
    // 标记这个实体需要租户隔离
    Reflect.defineMetadata('isTenantEntity', true, constructor);
  };
}

// 用于检查实体是否需要租户隔离
export function isTenantEntity(target: any): boolean {
  return Reflect.getMetadata('isTenantEntity', target) === true;
}
