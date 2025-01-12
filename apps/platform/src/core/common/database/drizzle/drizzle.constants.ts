/**
 * PostgreSQL数据库连接注入令牌
 *
 * 机制说明:
 * 1. 定义一个常量作为依赖注入的标识符
 * 2. 用于在NestJS依赖注入系统中标识PostgreSQL数据库连接
 *
 * 要点:
 * - 使用字符串常量作为注入令牌
 * - 配合@Inject()装饰器使用
 * - 在整个应用中保持唯一性
 *
 * 工作原理:
 * 1. 在提供者中使用此令牌注册数据库连接
 * 2. 在需要使用数据库连接的地方通过@Inject(TENANT_PG_CONNECTION)注入
 * 3. NestJS容器根据此令牌解析并提供正确的数据库连接实例
 */
export const TENANT_PG_CONNECTION = 'TENANT_PG_CONNECTION';
