import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { DatabaseModule } from '../../../core/common/database/database.module';

/**
 * Jobs 模块配置
 *
 * 主要机制:
 * 1. 模块依赖
 * - 导入 DatabaseModule 以支持数据库操作
 * - 通过依赖注入实现模块间通信
 *
 * 2. 控制器与服务层
 * - JobsController 处理 HTTP 请求路由
 * - JobsService 实现业务逻辑
 *
 * 3. 依赖注入配置
 * - 使用 @Module 装饰器声明模块结构
 * - providers 注册服务实例
 * - controllers 配置路由控制器
 *
 * 要点:
 * - 遵循 NestJS 模块化设计
 * - 清晰的职责分离
 * - 可扩展的模块结构
 */
@Module({
  imports: [DatabaseModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
