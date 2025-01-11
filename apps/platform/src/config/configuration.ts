import { readFileSync, existsSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const configuration = () => {
  try {
    // 获取当前环境，默认为 development
    const env = process.env.NODE_ENV || 'development';

    // 构建配置文件名，例如: config.development.yaml, config.production.yaml
    const YAML_CONFIG_FILENAME = `config.${env}.yaml`;
    const configPath = join(__dirname, 'assets', YAML_CONFIG_FILENAME);

    if (!existsSync(configPath)) {
      throw new Error(`配置文件不存在: ${configPath}`);
    }

    return yaml.load(readFileSync(configPath, 'utf8')) as Record<
      string,
      unknown
    >;
  } catch (error) {
    console.error('配置加载失败:', error);
    process.exit(1);
  }
};

export default configuration;
