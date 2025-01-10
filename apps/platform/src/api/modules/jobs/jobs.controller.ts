import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobResponseDto } from './dtos/job-response.dto';
import { z } from 'zod';

/**
 * Jobs控制器
 *
 * 机制要点:
 * 1. 使用@Controller装饰器定义基础路由'jobs'
 * 2. 通过依赖注入方式注入JobsService服务
 * 3. 所有方法都是异步的,返回Promise
 * 4. 使用DTO(Data Transfer Object)进行数据传输
 */
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  /**
   * 获取所有工作
   *
   * 要点:
   * - 使用@Get()装饰器处理GET请求
   * - 返回工作DTO数组
   */
  @Get()
  async getAllJobs(): Promise<z.infer<typeof JobResponseDto.schema>[]> {
    return this.jobsService.getAllJobs();
  }

  /**
   * 添加新工作
   *
   * 要点:
   * - 使用@Post()装饰器处理POST请求
   * - 使用DTO验证请求数据
   */
  @Post()
  async addJob(
    @Body() jobData: unknown,
  ): Promise<z.infer<typeof JobResponseDto.schema>> {
    const validatedData = JobResponseDto.validate(jobData);
    return this.jobsService.addJob(validatedData.name);
  }

  /**
   * 根据ID获取工作
   *
   * 要点:
   * - 使用@Get(':id')处理带参数的GET请求
   * - @Param()装饰器获取URL参数
   */
  @Get(':id')
  async getById(
    @Param('id') jobId: string,
  ): Promise<z.infer<typeof JobResponseDto.schema>> {
    return this.jobsService.getById(jobId);
  }

  /**
   * 更新工作信息
   *
   * 要点:
   * - 使用@Put(':id')处理PUT请求
   * - 使用DTO验证完整的请求数据
   */
  @Put(':id')
  async updateJob(
    @Param('id') jobId: string,
    @Body() jobData: unknown,
  ): Promise<z.infer<typeof JobResponseDto.schema>[]> {
    const validatedData = JobResponseDto.validate(jobData);
    return this.jobsService.updateJob(jobId, validatedData.name);
  }

  /**
   * 部分更新工作信息
   *
   * 要点:
   * - 使用@Patch(':id')处理PATCH请求
   * - 使用DTO的partial验证进行部分更新
   */
  @Patch(':id')
  async partialUpdateJob(
    @Param('id') jobId: string,
    @Body() jobData: unknown,
  ): Promise<z.infer<typeof JobResponseDto.schema>[]> {
    const validatedData = JobResponseDto.validatePartial(jobData);
    return this.jobsService.updateJob(jobId, validatedData.name ?? '');
  }

  /**
   * 删除指定工作
   *
   * 要点:
   * - 使用@Delete(':id')处理DELETE请求
   * - 返回更新后的工作列表
   */
  @Delete(':id')
  async deleteJob(
    @Param('id') jobId: string,
  ): Promise<z.infer<typeof JobResponseDto.schema>[]> {
    return this.jobsService.deleteJob(jobId);
  }

  /**
   * 删除所有工作
   *
   * 要点:
   * - 不带参数的DELETE请求
   * - 清空整个工作列表
   */
  @Delete()
  async deleteAllJobs(): Promise<z.infer<typeof JobResponseDto.schema>[]> {
    return this.jobsService.deleteJobs();
  }
}
