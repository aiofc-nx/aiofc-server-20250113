import { Inject } from '@nestjs/common';
import { TENANT_PG_CONNECTION } from './drizzle.constants';

/**
 * Drizzle注入装饰器
 *
 * 机制:
 * 1. 依赖注入
 * - 基于NestJS的@Inject装饰器封装
 * - 支持自定义注入标识符
 * - 默认使用PG_CONNECTION作为标识
 *
 * 要点:
 * - 简化Drizzle实例的注入过程
 * - 支持多数据库连接场景
 * - 保持与NestJS依赖注入系统的一致性
 *
 * 原理:
 * - 利用装饰器工厂模式实现可配置的依赖注入
 * - 通过闭包保存注入标识符
 * - 复用NestJS原生注入机制
 */
export const InjectDrizzle = (tag = TENANT_PG_CONNECTION) => Inject(tag);
