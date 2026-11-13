# 维护与写作

此目录仅供维护，不进入公开站点。

## 内容层级

- 首页：文章卡片，按日期排列。
- 文章：统一归档，支持分类和标签筛选。
- 关于：个人简介与公开账号。
- 文章正文：标题由模板输出；Markdown 从二级标题开始，按需要使用三级标题。

目前保留六篇有实际学习过程的记录，分类为 C#、Unity、开发札记。不为少量文章制造多层栏目。新文章自动进入分类、标签、搜索、归档和 RSS，不必维护 nav 或索引 Markdown。

## 新增文章

运行 `npx --yes pnpm@9.14.4 new-post english-slug --title "标题"`。生成文件默认 `draft: true`，开发预览可见，正式构建排除。不要改写旧文章 slug，确需变更时补充旧路径映射。

```yaml
title: "文章标题"
published: 2026-11-13
description: "一句明确的摘要"
image: ""
tags: [Unity, 学习复盘]
category: "Unity"
draft: false
```

图片可放 `public/images/` 并以 `/images/文件名` 引用；不要把私人原稿、凭据、机器绝对路径放入公开内容。文章引用代码使用真实公开仓库链接，构建不依赖 StudyProject 或 NotesProject。

旧文的 `imported: true` 让日期显示为“整理于”，避免将整理日说成原始写作日。新文章无需此字段。页内目录来自二、三级标题；原生 Fuwari 在宽屏显示右侧目录，手机采用简洁菜单和底部侧栏，不添加文档式左侧树。

## 检查与发布

`npx --yes pnpm@9.14.4 check` 检查 Astro / TypeScript；`build` 生成站点、旧链接兼容页、Pagefind 搜索索引，并检查站内链接、资源、迁移文章、RSS 与站点地图。`preview` 用于手机、电脑和真实搜索检查。

审核源码并提交后运行 `npx --yes pnpm@9.14.4 publish:site`。脚本只接受干净的 `main` 和本站远端，正常推送源分支后，将 `dist/` 生成一个继承现有 `gh-pages` 的提交并推送；不用强推，也不切换工作区。线上 `build-info.json` 可核对源码版本。还需检查 GitHub Pages 运行结果和线上页面。

原有 Windows 入口：

| 文件 | 行为 |
|---|---|
| `只启动服务器.bat` | 启动开发预览 |
| `构建并启动服务器.bat` | 构建、校验并预览成品 |
| `构建后等操作再启动服务器.bat` | 构建、等待按键后预览成品 |
| `构建并上传Git.bat` | 发布已提交内容，要求确认 |

## 主题升级与备份

使用锁定依赖，不在日常写文时顺手升级所有包。升级 Fuwari 时对照 [MIGRATION.md](MIGRATION.md) 中的定制点，再检查两端与旧链接。保留上游 LICENSE 和页脚署名。

迁移备份位于 `.local/backups/2026-11-13-fuwari/`，其中 `RESTORE.md` 说明恢复方式。`backup/material-cleaned-20261113` 标签指向精简完成、尚未迁移的 Material 版本。恢复旧版本请在独立目录解压或从 bundle 克隆，不覆盖当前工作区。
