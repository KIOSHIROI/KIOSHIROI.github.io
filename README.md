# hana-blog

面向个人博客站点的 Astro 项目。这个 README 的目标不是介绍博客本身，而是让协作 Agent 在尽量少读文件的前提下，快速知道：

- 这是个什么项目
- 页面和内容分别放在哪
- 改某一类需求时应该先看哪里
- 修改后该怎么校验

更详细的协作说明在 `CLAUDE.md`，但大多数任务先读本文件就够了。

## 1. 项目概览

- 技术栈：Astro 5 + TypeScript + Tailwind CSS + MDX
- 站点形态：双语个人博客，默认中文，英文路由前缀是 `/en`
- 内容类型：
  - 博客文章：`src/content/blog/**`
  - 静态页面：`src/pages/**`
  - 通用组件：`src/components/**`
- 关键特性：
  - 自定义集成入口：`src/axi-integration.ts`
  - 站点总配置：`src/site.config.ts`
  - 内容 schema：`src/content.config.ts`
  - 自定义 remark/rehype/shiki 插件：`src/plugins/**`

## 2. Agent 最小阅读顺序

如果只是接一个普通页面修改任务，建议按这个顺序读：

1. `README.md`
2. `src/site.config.ts`
3. 对应页面文件或组件文件
4. 只有在涉及内容渲染、插件、搜索、构建时，再看 `astro.config.mjs`、`src/axi-integration.ts`、`src/plugins/**`

通常可以直接忽略：

- `.astro/**`
- `node_modules/**`
- 构建产物目录

## 3. 关键入口文件

### 配置

- `src/site.config.ts`
  - 网站标题、作者、描述
  - 顶部导航
  - 评论、搜索、排版等集成开关
- `astro.config.mjs`
  - Astro 主配置
  - i18n 配置
  - 部署平台适配
  - markdown / rehype / shiki 配置
- `src/content.config.ts`
  - 博客内容集合定义
  - frontmatter schema

### 页面

- 首页：`src/pages/index.astro`
- About：`src/pages/about/index.astro`
- Academic：`src/pages/academic/index.astro`
- Projects：`src/pages/projects/index.astro`
- Links：`src/pages/links/index.astro`
- Search：`src/pages/search/index.astro`
- 英文页面镜像：`src/pages/en/**`

### 组件

- `src/components/basic/**`：页头、页脚、主题等基础结构
- `src/components/home/**`：首页模块
- `src/components/about/**`：About 页专用模块
- `src/components/projects/**`：Projects 页模块
- `src/components/pages/**`：分页、TOC、页面通用能力
- `src/components/user/**`：复用型 UI 组件
- `src/components/advanced/**`：评论、链接预览、评分、视频等增强组件

## 4. 路由和内容规则

### 静态页面

静态页面直接在 `src/pages` 下维护。常见需求的落点：

- 改 About 页面内容：`src/pages/about/index.astro`
- 改 Academic 页面内容：`src/pages/academic/index.astro`
- 改英文对应页面：`src/pages/en/...`

### 博客文章

文章目录结构：

```text
src/content/blog/<slug>/
  index.md / index.mdx
  index-en.md / index-en.mdx   # 可选
```

规则：

- 中文文章文件名：`index.md` 或 `index.mdx`
- 英文文章文件名：`index-en.md` 或 `index-en.mdx`
- 默认中文，英文内容单独走 `blogEn` collection

frontmatter 关键字段见 `src/content.config.ts`，最常用的是：

```yaml
title: ""
description: ""
publishDate: 2026-01-01
tags: []
draft: false
comment: true
```

## 5. 常见任务应该先看哪里

### 改站点名称、导航、评论、搜索

先看：`src/site.config.ts`

### 改普通静态页面文案或卡片

先看对应 `src/pages/**/index.astro`

### 改首页模块

先看：

- `src/pages/index.astro`
- `src/components/home/**`

### 改 About 页特殊展示

先看：

- `src/pages/about/index.astro`
- `src/components/about/**`

### 改博客文章渲染、TOC、复制按钮、外链样式、Markdown 行为

先看：

- `astro.config.mjs`
- `src/plugins/**`
- `src/layouts/**`
- `src/components/pages/**`

### 改图标、通用卡片、按钮、时间线等 UI

先看：`src/components/user/**`

### 改搜索、评论、友链、小组件集成

先看：

- `src/site.config.ts`
- `src/axi-integration.ts`
- 相关组件目录

## 6. 常用命令

`package.json` 里定义的是标准 npm scripts，可用 `npm run`、`pnpm` 或 `bun` 触发。最常用的是：

```bash
npm run dev
npm run check
npm run build
npm run lint
npm run format
```

补充：

- 开发预览：`npm run dev`
- 类型/内容检查：`npm run check`
- 生产构建：`npm run build`
- 全量整理：`npm run quality`

## 7. 修改后校验建议

按任务大小选择，不必每次全跑：

- 文案、小型静态页改动：
  - 定位性 grep / diff 即可
- 组件结构、页面引用、类型相关改动：
  - `npm run check`
- 配置、插件、构建链路、路由相关改动：
  - `npm run build`

## 8. 部署和运行方式

- 默认平台分支由 `DEPLOYMENT_PLATFORM` 控制
- 支持：
  - `vercel`
  - `cloudflare`
  - `github`
- i18n：
  - 默认中文不带前缀
  - 英文前缀是 `/en`

## 9. 对 Agent 最有用的几个事实

- 这是一个“配置驱动 + 少量自定义页面 + 一套内容系统”的博客，不是复杂业务系统。
- 很多需求只是改 `src/pages/**` 中的静态数组或 JSX/Astro 模板，不需要追到深层架构。
- 双语页面很多是直接各维护一份，修改时要检查 `src/pages/en/**` 是否需要同步。
- 博客文章 schema 和双语规则在 `src/content.config.ts`，不是散落在各处。
- 搜索、评论、排版增强等功能主要由 `src/site.config.ts`、`src/axi-integration.ts`、`src/plugins/**` 共同控制。

## 10. 建议的快速排查策略

接到需求后，优先用全文搜索定位：

```bash
rg -n "关键词" src
```

然后遵循：

1. 先改最靠近用户界面的页面文件
2. 找不到再追组件
3. 只有行为异常或渲染链路问题时才往 `layout / plugin / integration` 深挖

这样通常最省 token，也最省时间。
