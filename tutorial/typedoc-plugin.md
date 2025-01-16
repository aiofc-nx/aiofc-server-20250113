# TypeDoc 插件指南

1. **文档组织插件**:

- `typedoc-plugin-merge-modules` - 合并模块，优化文档结构

## 文档格式插件

- `typedoc-plugin-markdown` - 生成 Markdown 格式文档
- `typedoc-plugin-html-themes` - 提供额外的 HTML 主题
- `typedoc-plugin-mdn-links` - 为内置类型添加 MDN 文档链接

## 文档组织插件

- `typedoc-plugin-merge-modules` - 合并模块，优化文档结构
- `typedoc-plugin-categories` - 添加自定义分类功能
- `typedoc-plugin-hierarchical-categories` - 支持层级分类
- `typedoc-plugin-resolve-crossmodule-references` - 改善跨模块引用

## 内容增强插件

- `typedoc-plugin-example-tag` - 支持 `@example` 标签
- `typedoc-plugin-external-module-map` - 自定义模块映射
- `typedoc-plugin-sourcefile-url` - 添加源文件链接
- `typedoc-plugin-code-blocks` - 增强代码块展示

## 特殊用途插件

- `typedoc-plugin-localization` - 支持多语言
- `typedoc-plugin-versions` - 版本管理支持
- `typedoc-plugin-coverage` - 文档覆盖率统计

要添加这些插件，您需要：

- 先通过 npm 安装

```bash
npm install --save-dev 插件名称
```

- 然后在 typedoc.json 中配置：

```json:typedoc.json
{
  "plugin": [
    "typedoc-plugin-markdown",
    "typedoc-plugin-merge-modules",
    // 添加其他需要的插件
  ]
}
```

根据您的项目需求，您可以选择合适的插件组合。需要了解某个具体插件的详细信息吗？
