# 环境变量的验证

在开发和部署过程中，正确配置环境变量对于应用程序的正常运行至关重要。本文档将介绍如何验证环境变量的配置。

## 为什么需要验证环境变量？

1. **避免运行时错误** - 提前发现环境变量缺失或格式错误的问题，避免应用程序在运行时崩溃
2. **提高开发效率** - 快速定位配置相关的问题，减少调试时间
3. **增强安全性** - 确保敏感配置信息得到正确处理

## 常见的验证方式

### 1. 启动时验证

在应用程序启动时进行环境变量验证是最常见的方式。主要包括以下步骤：

1. **必需变量检查**
   - 检查所有必需的环境变量是否都已设置
   - 如果缺少必需变量，立即终止程序并提供明确的错误信息

2. **格式验证**
   - 验证环境变量的值是否符合预期格式
   - 例如：URL格式、数字范围、布尔值等

3. **类型转换**
   - 将字符串类型的环境变量转换为应用程序中需要的数据类型
   - 确保转换过程不会出现异常

## 使用zod-env库进行环境变量的验证

可以使用zod-env库帮助我们进行环境变量的验证。这是一个基于zod的库，所以需要先安装zod。

```bash
npm install zod
npm install zod-env
```

然后，我们就可以使用zod-env库进行环境变量的验证了。

```bash
npx zod-env@latest
```

### 基本使用方法

```typescript
import { z } from "zod";
import {ZodEnv, booleanAsString} from "zod-env";

const zodEnv = new ZodEnv({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.string().default("development"),
  IS_PRODUCTION: booleanAsString().default(false),
});

zodEnv.get("PORT"); // 3000
zodEnv.get("NODE_ENV"); // "development"
zodEnv.get("IS_PRODUCTION"); // false
```

### 移植zod-env到你的项目

[github](https://github.com/tomslutsky/zod-env)

这个库是开源的，代码很简单，可以移植到你的项目中，你可以继续扩展这个库，比如添加更多的验证规则，或者添加更多的功能。这是我们推荐的做法。

![环境变量验证流程](/docs/drawio_assets/uml.png)
