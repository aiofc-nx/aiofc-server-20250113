import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { JobDao } from '../../../core/common/database/entities/job/job.dao';
import { Job, NewJob } from '@aiofc/drizzle-schema';

/**
 * Jobs服务层
 *
 * 主要机制:
 * 1. 依赖注入
 * - 使用@Injectable()装饰器标记为可注入的服务
 * - 通过构造函数注入JobDao数据访问对象
 *
 * 2. 数据库操作封装
 * - 所有方法都是异步的,返回Promise
 * - 通过JobDao封装具体的数据库操作
 * - 使用TypeScript类型确保类型安全
 *
 * 3. CRUD操作实现
 * - 实现标准的增删改查功能
 * - 支持单条和批量操作
 *
 * 要点:
 * - 业务逻辑与数据访问分离，我们可以通过注入不同的Dao来实现不同的数据库操作（甚至实现使用不同的orm和数据库）
 * - 统一的错误处理
 * - 类型安全的数据传输
 */
@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  // 这里注入了数据访问层的DAO (Data Access Object)，用于与数据库进行交互，相当于typeorm的Repository
  constructor(private readonly jobDao: JobDao) {}

  /**
   * 添加新工作
   *
   * 要点:
   * - 接收工作名称作为参数
   * - 返回插入的记录信息
   */
  async addJob(jobName: string, tenantId: string): Promise<NewJob> {
    return await this.jobDao.insertNewRecord({
      name: jobName,
      tenantId: tenantId,
    } as NewJob);
  }

  /**
   * 根据ID获取工作
   *
   * 要点:
   * - 指定返回的字段列表
   * - 类型转换确保返回正确的实体类型
   */
  async getById(id: string): Promise<Job> {
    if (!id) {
      throw new BadRequestException('Job ID is required');
    }

    this.logger.log(`Getting job by ID: ${id}`);
    return (await this.jobDao.getOneById(id, [
      'id',
      'createdAt',
      'updatedAt',
      'name',
    ])) as Job;
  }

  /**
   * 更新工作信息
   *
   * 要点:
   * - 支持部分字段更新
   * - 返回更新后的记录数组
   */
  async updateJob(id: string, newName: string): Promise<NewJob[]> {
    if (!id) {
      throw new BadRequestException('Job ID is required');
    }
    return this.jobDao.updateById(id, { name: newName });
  }

  /**
   * 获取所有工作
   *
   * 要点:
   * - 返回完整的实体数组
   */
  async getAllJobs(): Promise<Job[]> {
    this.logger.log('获得所有工作事项');
    return this.jobDao.getAll();
  }

  /**
   * 删除指定工作
   *
   * 要点:
   * - 根据ID删除单条记录
   * - 返回受影响的记录数组
   */
  async deleteJob(id: string): Promise<NewJob[]> {
    if (!id) {
      throw new BadRequestException('Job ID is required');
    }
    return await this.jobDao.deleteById(id);
  }

  /**
   * 删除所有工作
   *
   * 要点:
   * - 批量删除操作
   * - 返回受影响的记录数组
   */
  async deleteJobs(): Promise<NewJob[]> {
    return await this.jobDao.deleteAll();
  }
}
