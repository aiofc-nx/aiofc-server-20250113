import { z } from 'zod';
/**
 * 假设我们已经定义了一个 EnvVariables 类型，它是一个包含字符串键和字符串或 undefined 值的记录
 * 它大概是这样子的
 * {
 *  PORT: z.coerce.number().default(3000),
 *  NODE_ENV: z.string().default("development"),
 *  IS_PRODUCTION: booleanAsString().default(false),
 * }
 * 这里我们使用zod对这个对象的值进行验证，确保类型和格式正确
 */
type EnvVariables = Record<string, string | undefined>;
/**
 * 接下来，我们定义一个 ZodEnv 类，这个类有一个泛型参数 Schema，它必须是一个 Zod 对象类型
 * 通过类的泛型参数，我们可以传入一个在类外部定义的对象类型
 * 例如：我们在类的外部定义了一个zod对象，这样我们就可以在类外部定义环境变量的结构和验证规则
 * 这么做的好处是，我们可以将环境变量的结构和验证规则与代码分离，从而使代码更加清晰和易于维护
 *
 */
// 使用 Zod 进行运行时类型验证的环境变量管理类
// Schema 必须是 Zod 对象类型
export class ZodEnv<Schema extends z.AnyZodObject> {
  /**
   * 声明一个变量_envs，用于存储经过 schema 验证后的环境变量
   * z.infer 的作用是根据 Zod 模式自动推断出 TypeScript 类型。
   * 它接受一个 Zod 模式作为泛型参数，并返回该模式对应的 TypeScript 类型。
   * 这里我们使用 z.infer 来获取 Schema 对应的 TypeScript 类型，并将其赋值给 _envs
   */
  _envs: z.infer<Schema>;

  constructor(
    // schema: 定义环境变量的结构和验证规则
    private readonly schema: Schema,
    // envs: 可选的自定义环境变量对象，用于覆盖 process.env
    envs?: EnvVariables,
  ) {
    let _envs: EnvVariables;

    // 环境变量来源优先级处理(优先使用传入的自定义环境变量，回退到 process.env)
    if (envs) {
      // 1. 优先使用传入的自定义环境变量
      _envs = envs;
    } else {
      // 2. 回退到 process.env
      if (typeof process === 'undefined') {
        // 在 process 未定义的环境（如浏览器）中，必须提供 envs 参数
        throw new Error(
          'process is not defined. Please provide envs as second argument',
        );
      }
      _envs = process.env;
    }

    // 使用 schema 验证环境变量，确保类型和格式正确
    this._envs = this.parse(_envs);
  }
  // 使用 Zod schema 定义环境变量的结构和验证规则
  private parse(env: NodeJS.ProcessEnv): z.infer<Schema> {
    // 使用 schema 验证环境变量，确保类型和格式正确
    return this.schema.parse(env);
  }

  // 获取指定环境变量的值
  get<K extends keyof z.infer<Schema>, D extends z.infer<Schema>[K]>(
    key: K,
    defaultValue?: D,
  ): D extends undefined
    ? z.infer<Schema>[K] | undefined
    : NonNullable<z.infer<Schema>[K]> {
    const value = this._envs[key];

    if (typeof value !== 'undefined') {
      return value;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return undefined as any;
  }

  // 获取所有经过 schema 验证的环境变量
  getAll(): z.infer<Schema> {
    return this._envs;
  }

  // 获取 schema 定义
  getSchema(): Schema {
    return this.schema;
  }
}
