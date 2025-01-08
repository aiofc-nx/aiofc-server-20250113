import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { JobDao } from './entities/job/job.dao';

/**
 * 数据访问对象(DAO)集合
 *
 * 机制说明:
 * 1. 统一管理所有DAO类的注册
 * 2. 通过数组形式集中声明所有DAO
 * 3. 便于在Module装饰器中批量注入
 *
 * 要点:
 * - 集中管理所有数据访问层组件
 * - 便于维护和扩展
 * - 支持通过扩展数组添加新的DAO
 *
 * 原理:
 * - 数组元素会被注册为providers
 * - NestJS依赖注入系统自动实例化每个DAO
 * - 通过Module的exports导出供其他模块使用
 */
const DAOs = [JobDao];

/**
 * 数据库模块
 *
 * 机制说明:
 * 1. 统一管理所有数据访问对象(DAO)和数据库配置
 * 2. 通过依赖注入系统提供数据库访问能力
 * 3. 集成配置验证和Drizzle ORM功能
 *
 * 要点:
 * - 自动注册所有DAO实例
 * - 导出DAO供其他模块使用
 * - 复用DatabaseConfig进行配置管理
 *
 * 原理:
 * - providers数组包含所有DAO和配置类
 * - imports引入配置模块和Drizzle模块
 * - exports确保DAO可被其他模块注入使用
 */
@Module({
  providers: [...DAOs, DatabaseConfig],
  imports: [
    ConfigModule.forRoot({
      validate: DatabaseConfig.validateConfiguration,
    }),
    DrizzleModule,
  ],
  exports: DAOs,
})
export class DatabaseModule {}
