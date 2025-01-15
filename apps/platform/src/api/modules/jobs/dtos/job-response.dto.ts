import { z } from 'zod';
import { BaseDto } from '../../../../core/common/base/base.dto';
import { JobEntity } from '../../../../core/common/database/entities/job/job.entity';

const jobResponseSchema = z.object({
  name: z
    .string()
    .min(10, '任务名称不能为空,长度至少为10个字符')
    .max(256, '任务名称不能超过256个字符'),
  tenantId: z.string(),
});

export class JobResponseDto
  extends BaseDto
  implements Pick<JobEntity, 'name' | 'tenantId'>
{
  name!: string;
  tenantId!: string;
  public static override schema = jobResponseSchema;
}
