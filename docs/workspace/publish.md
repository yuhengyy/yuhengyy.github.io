# 发布与提交

本博客由 **StudyProject 工作台** 管理构建与发布。

## 日常流程

1. 在 `StudyProject` 根目录双击 **`工作台.cmd`**
2. 打开 **博客** 模块
3. **启动预览** — 自动打开 http://127.0.0.1:8000/
4. 确认无误后 **构建并发布**（填写提交说明；勾选推送时会同步更新 `main` 与 `gh-pages`）

## 双分支说明

| 分支 | 内容 | 谁在读 |
|------|------|--------|
| `main` | Markdown 源码 | 你 / Git 版本管理 |
| `gh-pages` | `mkdocs build` 静态 HTML | **https://yuhengyy.github.io/** |

仅 push `main` **不会**更新线上网站，必须执行 `mkdocs gh-deploy`（工作台「构建并发布」已自动包含）。

## 提交范围

| 操作 | 在哪个 Git 仓 | 说明 |
|------|---------------|------|
| 改博客 Markdown | `yuhengyy.github.io` | 本仓库 |
| 改 C# 学习代码 | `StudyProject-learning-src-Study` | Study 子模块 |
| 改工作台 | `StudyProject-tools` | tools 仓 |
| 改元仓库文档/索引 | `StudyProject` | 元仓库 |

**不要**在博客仓提交 Study 的 `.cs` 代码；**不要**在 Study 仓提交 `mkdocs.yml`。

## 提交作者

```
user.name  = yhyy
user.email = zhoujiayuan233@gmail.com
```

仅在用户明确要求时 commit / push。

## Cursor Agent

本仓库含 Agent Skill：`.agents/skills/blog-workspace/SKILL.md`。  
从 StudyProject 根目录工作时，使用元仓库 `.agents/skills/blog-publish/SKILL.md`。

---

🔙 [工作区概览](index.md)  
🏠 [返回首页](../index.md)
