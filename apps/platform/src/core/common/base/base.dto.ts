import { z } from 'zod';

export abstract class BaseDto<T extends z.ZodObject<any>> {
  public static schema: z.ZodObject<any>;

  static validate<U extends BaseDto<any>>(
    this: { schema: z.ZodObject<any>; cleanData: typeof BaseDto.cleanData },
    data: unknown,
  ): z.infer<typeof this.schema> {
    const validated = this.schema.parse(data);
    return this.cleanData(validated);
  }

  static validatePartial<U extends BaseDto<any>>(
    this: { schema: z.ZodObject<any>; cleanData: typeof BaseDto.cleanData },
    data: unknown,
  ): Partial<z.infer<typeof this.schema>> {
    const validated = this.schema.partial().parse(data);
    return this.cleanData(validated);
  }

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
