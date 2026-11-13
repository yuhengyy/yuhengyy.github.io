---
name: blog-workspace
description: >-
  Maintain the independent BlogProject Fuwari / Astro site: articles, navigation,
  local preview, builds and explicitly requested publication.
---

# 博客工作流

本项目是独立的公开博客，先读项目根 [README](../../../README.md) 与 [AGENTS](../../../AGENTS.md)。目录迁移不改变现有 GitHub 远端 `yuhengyy/yuhengyy.github.io`。

## 职责与来源

- `src/content/posts/` 保存公开正文，`src/content/spec/about.md` 保存关于页，`public/` 保存直接发布资源，`src/config.ts` 保存站点设置。
- 文章代码来源使用公开 GitHub 链接；不消费其他项目的登记表。
- 本机 C# 学习源码相对博客根位于 `../StudyProject/CSharp/`，Unity 学习源码位于 `../StudyProject/Unity/baselearning/`。关联仅用于阅读；构建时不读取这些工程。
- 私人原稿不进入公开内容或站点配置。提炼文章时先脱敏，不公开私人目录、机器绝对路径或凭据。
- `StudyProject-learning-src-Study` 等名称是现有远端仓库标识，不能因本机路径调整随意替换。

## 修改与验证

1. 定位文章及其 frontmatter；分类、标签、归档、搜索从文章自动生成，不维护重复索引。
2. 新文使用 `npx --yes pnpm@9.14.4 new-post english-slug --title "标题"`，完成后设 `draft: false`；正文从二级标题开始。
3. 改变 slug 时更新站内链接并在 `maintenance/legacy-routes.json` 保留旧地址。
4. 执行 `npx --yes pnpm@9.14.4 check` 和 `npx --yes pnpm@9.14.4 build`；布局修改打开 `npx --yes pnpm@9.14.4 preview` 检查电脑与手机。

依赖缺失时运行 `scripts/Setup-Blog.cmd`，需要 Node.js 22+；pnpm 固定 9.14.4，依赖以锁文件为准，不借用其他项目环境。开发预览为 `npx --yes pnpm@9.14.4 dev`，默认 4321，可用 `--port` 指定。搜索需在正式构建后的 preview 验证。

日志和一次性检查输出放被忽略的 `.local/`，不进入公开内容。用户已接受原生 Fuwari 的手机导航、侧栏下移和宽屏文章目录，不擅自增加知识库式目录树。

## 导航与文章

全站入口为首页、文章、关于；目前分类 C#、Unity、开发札记。文章应能说明理解、用法或经验，并追溯实际来源；不复制大段业务源码。既有旧链接处理由 `maintenance/legacy-routes.json` 维护。

## 提交与发布

只有用户明确授权才提交、推送或部署。先检查本仓工作区与暂存区变化，使用个人 verified-commit 技能处理提交范围。

- 仅提交源文件；`dist/`、`node_modules/`、`.local/`、旧 `site/`、`.venv/` 不入 Git。
- 中文提交说明，单次作者参数为 `-c user.name=yhyy -c user.email=zhoujiayuan233@gmail.com`，不修改全局 Git 配置。
- GitHub Pages 读取 `gh-pages`；只推送 `main` 不等于完成发布。
- 本项目 `npx --yes pnpm@9.14.4 publish:site` 为手动发布入口，要求干净的 main 和明确确认。Agent 仅在已有发布授权时传 `--yes`，不可绕过授权范围。
- 发布入口重新构建并检查，以继承远端的提交更新 gh-pages，不强推。部署后核对 Pages 状态及线上版本。

工作台可以作为可选入口调用本博客；不在博客中维护工作台的项目目录或镜像。Material 恢复说明位于 `.local/backups/2026-11-13-fuwari/RESTORE.md`。
