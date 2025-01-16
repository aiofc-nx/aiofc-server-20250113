[**AIOFC API 文档 v1.0.0**](../README.md)

***

[AIOFC API 文档](../modules.md) / tsdoc

# TSDoc 教程

[TSDoc 官网](https://tsdoc.org/)

TSDoc 是一个用于编写 TypeScript 注释的标准。它提供了一种统一的方式来编写 TypeScript 代码的文档注释。

具体来说，TSDoc 是 Microsoft 的 TypeScript 团队 主导开发的一个项目，旨在为 TypeScript 代码提供一种标准化的注释格式。

## TSDoc 的背景

目标：TSDoc 的目标是为 TypeScript 代码提供一种清晰、一致的注释格式，便于工具（如 TypeDoc）解析和生成文档。

动机：TypeScript 社区需要一个标准化的注释格式，以解决 JSDoc 在 TypeScript 中的一些局限性（例如对 TypeScript 类型系统的支持不足）。

## 基本语法

TSDoc 注释以 `/**` 开始,以 `*/` 结束。

一个基本的 TSDoc 注释示例:

```ts
/**
 * 这是一个简单的函数,用于计算两个数的和。
 * @param a - 第一个数
 * @param b - 第二个数
 * @returns 两个数的和
 */
function add(a: number, b: number): number {
  return a + b;
}
```

## TSDoc 标签分类

TSDoc 标签（Tag）分为以下三类：

- 块标签（Block Tag）
- 修饰标签（Modifier Tag）
- 内联标签（Inline Tag）

标签名称以 at 符号 （@） 开头，后跟使用“驼峰式大小写”的 ASCII 字母。

每一标签都被定义为其中的一种，分类明确，互不重叠。例如：@link不能是Block Tag，也不能是Modifier Tag，因为它是一个内联标签。

### 块标签

```ts
/**
 * 摘要部分应简洁明了。在文档网站上，它将显示在列出多个API项摘要的页面上。在单个项目的详细页面中，摘要会显示在备注部分之前（如果有的话）。
 *
 * @remarks
 *
 * API项的主要文档分为两个部分：* "摘要"部分是简要介绍，后面可选地跟随一个@remarks块，其中包含* 额外的详细信息。
 *
 * @privateRemarks
 *
 * 这个@privateRemarks 标签用于开始一段额外的注释，这些内容并不 intended 提供给外部观众。文档工具必须从 API 参考网站中省略这些内容。在生成规范的 *.d.ts 文件时也应省略这些内容
 */
```

示例：

```ts
/**
 * 这是特别总结部分
 *
 * @remarks
 * 这是一个独立的块
 *
 * @example 记录警告
 * ```ts
 * logger.warn('Something happened');
 * ```
 *
 * @example 记录错误
 * ```ts
 * logger.error('Something happened');
 * ```
 */
```

修饰符标签表示 API 的特殊品质。modifier 标签的解析方式通常与 block 标签相同， 预期其标记内容为空。如果在 modifier 标签后找到标签内容，则解析器 可以选择丢弃它，或者（在提高兼容性的情况下）将其与之前的 block 标签。

### 修饰标签

在规范化形式中，modifier 标签显示在文档注释底部的单行上。示例：

```ts
/**
 * This is the special summary section.
 *
 * @remarks
 * This is a standalone block.
 *
 * @public @sealed
 * 这两个标签是修饰标签，用于修饰 API 的公共性和密封性。
 */
```

### 内联标签

内联标签总是被圆括号`{ }`包围。例如：

```ts
{@link http://example.com/ | Example Book Interchange Format}
```

## 标签的种类

[TSDoc 标签](https://tsdoc.org/pages/tags/alpha/)
