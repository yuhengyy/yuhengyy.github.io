# BlogProject 博客协作约定

本项目负责公开文章、Fuwari / Astro 导航与站点资源。博客任务使用 [.agents/skills/blog-workspace/SKILL.md](.agents/skills/blog-workspace/SKILL.md)。

- 业务源码留在对应代码项目；本机学习代码可相对定位到 `../StudyProject/CSharp/`、`../StudyProject/Unity/baselearning/`。
- 私人材料属于独立 NotesProject，不进入 `src/content/`、`public/` 或站点配置；公开内容须先脱敏。
- 文章放 `src/content/posts/`，分类、标签和归档从元数据自动生成；无需手写目录索引。slug 变化须兼容旧链接。
- 文章代码来源使用真实公开 GitHub 链接；不消费外部工作台的登记表，不复制其配置。
- 依赖和运行入口由本项目自己的 `package.json`、`pnpm-lock.yaml`、`scripts/` 管理；不依赖 StudyProject 的规则、登记表或运行配置。
- 修改导航或运行入口后执行 `npx --yes pnpm@9.14.4 check` 与 `npx --yes pnpm@9.14.4 build`，布局改动检查电脑和手机预览。不要提交 `dist/`、`node_modules/`、`.local/`、旧 `site/`、`.venv/` 或检查日志。
- Git 核查/提交使用个人 verified-commit Skill。用户未明确要求时不提交、不推送、不部署；提交说明用中文，作者参数沿用本仓约定，不修改全局 Git 配置。
