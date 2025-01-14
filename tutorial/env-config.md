# 环境变量

**环境变量** 是在操作系统中用于存储配置信息的键值对。它们可以影响程序的运行行为，并且可以在不修改代码的情况下更改应用程序的配置。所以，环境变量事宜往往伴随着应用程序的配置问题，贯穿着应用程序的整个生命周期。

## 环境变量的主要用途

- 存储敏感信息(如API密钥、数据库密码等)
- 配置应用程序的运行环境(如开发环境、生产环境)
- 设置系统路径和依赖项位置
- 控制应用程序的行为和功能开关

在Node.js项目中，我们通常使用`.env`文件来管理环境变量。这些变量可以通过`process.env`对象在代码中访问。

## process对象

`process` 是 Node.js 内置的一个全局对象,它会在Node.js启动时自动创建,并提供了当前 Node.js 进程的信息和控制能力。这个对象在所有的 Node.js 应用程序中都可以直接使用,不需要通过 require 引入。

process对象的主要功能包括:

- 提供进程信息(如进程ID、运行环境等)
- 控制进程行为(如退出进程、处理信号等)
- 处理标准输入输出
- 管理环境变量
- 处理命令行参数

社区提供了一个库 `dotenv` 来帮助我们管理环境变量。所以，在 Node.js 应用程序中，通常使用 .env 文件 +  dotenv 实现配置管理。

## 环境变量文件

在项目根目录下创建 `.env` 文件，并添加相应的环境变量。
示例 `.env` 文件:

```env
NODE_ENV=development
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=aiofc_db
DB_PORT=5438
DB_SCHEMA=tenant_default
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
MIGRATIONS_FOLDER=packages/drizzle-schema/src/migrations/aiofc
```

## 在代码中使用环境变量

在代码中使用 `process.env` 对象来访问环境变量。

```javascript
console.log(process.env.NODE_ENV);
```

## Nest 环境变量管理

Nest 官方提供了`@nestjs/config`，实际上就是对上述方法的一个模块化封装。

```bash
npm i --save @nestjs/config
```

这个库提供了`ConfigModule`和`ConfigService`两个核心功能。

- `ConfigModule`：用于加载和解析环境变量文件，并将其暴露为Nest应用程序中的全局配置对象。
- `ConfigService`：用于在应用程序中访问和获取环境变量。

Nest的封装只是提供了容器化的管理便利，本质上还是使用 `dotenv` 来管理环境变量。所以，使用上跟常见的Node.js项目环境变量管理没有太大区别。

## 环境变量的最佳实践

- 使用 `.env` 文件来存储环境变量
- 使用 `dotenv` 库来加载环境变量
- 使用 `@nestjs/config` 库来管理环境变量
- 在代码中使用 `ConfigService` 来访问环境变量
- 在生产环境中，使用环境变量来配置应用程序

同时，我们还需要考虑以下几点：

- 环境变量的安全性：不要在代码中直接暴露敏感信息，如API密钥、数据库密码等。
- 环境变量的可移植性：确保环境变量在不同的开发和生产环境中一致。
- 环境变量的可维护性：将环境变量集中管理，便于维护和修改。

## 环境变量的集中管理

你可以在开发过程中，使用 `dotenv-vault` 来验证环境变量的正确性。dotenv-vault 是一个 CLI，用于跨计算机、环境和团队成员同步 .env 文件。
官网地址：[dotenv-vault](https://www.dotenv.org/)

```bash
npx dotenv-vault@latest validate
```

这个命令会检查`.env`文件中的所有变量，并确保它们在系统中正确设置。

```bash
npx dotenv-vault@latest login
```

这个命令会生成一个`.env.vault`文件，并将其推送到远程仓库。

```bash
npx dotenv-vault@latest push
```

这个命令会将`.env.vault`文件推送到远程仓库。
