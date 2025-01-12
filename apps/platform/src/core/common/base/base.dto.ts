import { z } from 'zod';

/**
 * 基础数据传输对象(DTO)抽象类
 * 定义这个抽象类是为了统一DTO的验证和清理方法
 *
 * 机制说明:
 * 1. 使用Zod进行数据验证和类型推断
 * 2. 提供统一的数据验证和清理方法
 * 3. 所有DTO类都继承自此基类
 *
 * 主要功能:
 * - 定义统一的schema验证规则
 * - 提供完整和部分数据的验证方法
 * - 清理多余的数据字段
 */
export abstract class BaseDto {
  /**
   * Zod验证模式
   * 每个继承的子类都需要定义自己的schema
   */
  public static schema: z.ZodObject<any>;

  /**
   * 验证完整数据
   *
   * @param data - 待验证的未知数据
   * @returns 验证并清理后的数据
   *
   * 工作流程:
   * 1. 使用schema验证数据
   * 2. 清理验证后的数据
   */
  static validate<S extends z.ZodObject<any>>(
    this: { schema: S; cleanData: typeof BaseDto.cleanData },
    data: unknown,
  ): z.infer<S> {
    const validated = this.schema.parse(data);
    return this.cleanData(validated);
  }

  /**
   * 验证部分数据
   *
   * @param data - 待验证的未知数据
   * @returns 验证并清理后的部分数据
   *
   * 工作流程:
   * 1. 将schema转换为部分验证模式
   * 2. 验证数据
   * 3. 清理验证后的数据
   */
  static validatePartial<S extends z.ZodObject<any>>(
    this: { schema: S; cleanData: typeof BaseDto.cleanData },
    data: unknown,
  ): Partial<z.infer<S>> {
    const validated = this.schema.partial().parse(data);
    return this.cleanData(validated);
  }

  /**
   * 清理数据
   *
   * @param data - 需要清理的数据对象
   * @returns 只保留schema中定义的字段的数据
   *
   * 工作流程:
   * 1. 获取schema中定义的所有字段
   * 2. 仅保留schema中存在的字段
   * 3. 返回清理后的数据
   */
  public static cleanData<T extends Record<string, any>>(data: T): T {
    const schemaKeys = Object.keys((this.schema as any).shape);
    const cleaned = {} as Record<string, any>;

    for (const key of schemaKeys) {
      if (key in data) {
        cleaned[key] = data[key as keyof T];
      }
    }

    return cleaned as T;
  }
}
