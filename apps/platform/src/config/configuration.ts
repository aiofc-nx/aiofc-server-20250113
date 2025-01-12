import { readFileSync, existsSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { envValidate } from './env-validate';

/**
 * 配置加载函数
 *
 * 机制说明:
 * 1. 根据当前环境(NODE_ENV)加载对应的yaml配置文件
 * 2. 配置文件位于assets目录下,命名格式为config.{env}.yaml
 * 3. 使用js-yaml解析yaml文件内容为JavaScript对象
 * 4. 通过envValidate进行配置验证
 *
 * 错误处理:
 * - 如果配置文件不存在,抛出错误并退出进程
 * - 如果配置加载/解析失败,记录错误日志并退出进程
 *
 * 日志类型:
 * - error: 记录配置加载失败的错误信息,包含具体错误详情
 *
 * @returns {Record<string, unknown>} 验证后的配置对象
 */
const configOptions = (): Record<string, unknown> => {
  try {
    const env = process.env.NODE_ENV || 'development';
    const YAML_CONFIG_FILENAME = `config.${env}.yaml`;
    const configPath = join(__dirname, 'assets', YAML_CONFIG_FILENAME);

    if (!existsSync(configPath)) {
      throw new Error(`配置文件不存在: ${configPath}`);
    }

    // 加载YAML配置文件
    const config = yaml.load(readFileSync(configPath, 'utf8')) as Record<
      string,
      unknown
    >;
    // 验证配置
    const validatedConfig = envValidate(config);
    return validatedConfig;
  } catch (error) {
    console.error('配置加载失败:', error);
    process.exit(1);
  }
};

export default configOptions;

/**
 configOptions()函数返回的结果是个对象：
 {
  database: {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5438,
    name: 'aiofc_db',
    schema: 'aiofc',
    pool: { max: 20, min: 2 }
  },
  api: { port: 3000, globalPrefix: 'api' },
  logger: { trackingIdHeader: 'x-tracking-id' }
}
 */
