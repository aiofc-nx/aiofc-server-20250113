# TypeDoc 使用指南

TypeDoc 是一个用于 **TypeScript 项目**的文档生成工具。它能够将 TypeScript 代码中的注释转换为美观的文档网站，类似于 JSDoc 的功能，但专为 TypeScript 设计。TypeDoc 支持 TypeScript 的类型系统，并且能够生成详细的 API 文档。

我们可以从以下几个方面来讨论 TypeDoc：

---

## 1. **TypeDoc 的核心功能**

- **从 TypeScript 代码生成文档**：TypeDoc 会解析 TypeScript 代码，提取类、接口、函数、模块等的注释，并生成 HTML 文档。
- **支持 TypeScript 类型系统**：TypeDoc 能够理解 TypeScript 的类型注解，并将其反映在生成的文档中。
- **Markdown 支持**：注释中可以包含 Markdown 格式的文本，TypeDoc 会将其渲染为 HTML。
- **插件系统**：TypeDoc 支持插件扩展，可以自定义文档生成过程。
- **主题支持**：可以通过主题自定义文档的外观。

---

### 2. **安装 TypeDoc**

TypeDoc 可以通过 npm 或 yarn 安装：

```bash
# 使用 npm
npm install typedoc --save-dev

# 使用 yarn
yarn add typedoc --dev
```

安装完成后，可以通过以下命令检查是否安装成功：

```bash
npx typedoc --version
```

---

### 3. **基本用法**

TypeDoc 的基本用法非常简单。假设你有一个 TypeScript 项目，可以通过以下命令生成文档：

```bash
npx typedoc --out ./docs ./src
```

- `--out ./docs`：指定文档输出的目录（这里是 `./docs`）。
- `./src`：指定 TypeScript 源代码的目录。

运行命令后，TypeDoc 会解析 `./src` 目录下的 TypeScript 文件，并在 `./docs` 目录下生成 HTML 文档。

---

### 4. **注释格式**

TypeDoc 使用 JSDoc 风格的注释来生成文档。以下是一些常见的注释示例：

#### 类和方法

```typescript
/**
 * 这是一个表示用户的类。
 */
class User {
    /**
     * 用户的名字。
     */
    name: string;

    /**
     * 创建一个用户实例。
     * @param name 用户的名字。
     */
    constructor(name: string) {
        this.name = name;
    }

    /**
     * 向用户打招呼。
     * @returns 返回问候语。
     */
    greet(): string {
        return `Hello, ${this.name}!`;
    }
}
```

#### 接口

```typescript
/**
 * 表示一个点的接口。
 */
interface Point {
    /**
     * 点的 X 坐标。
     */
    x: number;

    /**
     * 点的 Y 坐标。
     */
    y: number;
}
```

#### 模块

```typescript
/**
 * 这是一个工具模块，包含一些实用函数。
 */
module Utils {
    /**
     * 计算两个数字的和。
     * @param a 第一个数字。
     * @param b 第二个数字。
     * @returns 两个数字的和。
     */
    export function add(a: number, b: number): number {
        return a + b;
    }
}
```

---

### 5. **配置 TypeDoc**

TypeDoc 支持通过配置文件或命令行参数进行配置。配置文件通常命名为 `typedoc.json`，放置在项目根目录下。

#### 示例配置文件

```json
{
  "entryPoints": ["./src/index.ts"],
  "out": "./docs",
  "theme": "default",
  "includeVersion": true,
  "excludeExternals": true,
  "excludePrivate": true,
  "excludeProtected": true
}
```

- `entryPoints`：指定入口文件（通常是项目的入口文件）。
- `out`：指定文档输出目录。
- `theme`：指定文档主题（默认是 `default`）。
- `includeVersion`：是否在文档中包含项目版本号。
- `excludeExternals`：是否排除外部依赖。
- `excludePrivate`：是否排除私有成员。
- `excludeProtected`：是否排除受保护的成员。

---

### 6. **插件和主题**

TypeDoc 支持插件和主题扩展。以下是一些常用的插件和主题：

- **插件**：
  - `typedoc-plugin-markdown`：生成 Markdown 格式的文档。
  - `typedoc-plugin-external-module-name`：为外部模块添加名称。
- **主题**：
  - `typedoc-default-themes`：默认主题。
  - `typedoc-theme-hierarchy`：支持层次结构的主题。

安装插件和主题后，可以在配置文件中启用它们。

---

### 7. **与 CI/CD 集成**

TypeDoc 可以与 CI/CD 工具（如 GitHub Actions、GitLab CI）集成，自动生成文档并部署到 GitHub Pages 或其他静态网站托管服务。

#### 示例：GitHub Actions 集成

```yaml
name: Generate Documentation

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 16

      - name: Install dependencies
        run: yarn install

      - name: Generate documentation
        run: yarn typedoc --out ./docs ./src

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```

---

### 8. **总结**

TypeDoc 是一个强大的工具，能够为 TypeScript 项目生成高质量的 API 文档。它支持 TypeScript 的类型系统、Markdown 注释、插件扩展和主题自定义，非常适合用于开源项目或团队协作。

如果你有更多关于 TypeDoc 的问题，或者想深入探讨某些功能，欢迎继续讨论！😊
