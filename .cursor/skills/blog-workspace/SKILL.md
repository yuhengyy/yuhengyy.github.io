---
name: blog-workspace
description: >-
  Manages yuhengyy.github.io MkDocs blog in StudyProject multi-repo layout.
  Use when the user asks to update blog, publish site, commit blog, fix nav,
  add project page, or mentions 博客 / mkdocs / github pages / study-csharp page.
---

# 博客仓库（yuhengyy.github.io）

## 角色定位

| 仓库 | 路径 | 放什么 |
|------|------|--------|
| **本博客** | `publish/yuhengyy.github.io/` | Markdown 叙述、MkDocs 配置 |
| **Study 代码** | `learning/src/Study/` | C# 源码，**不在此仓提交** |
| **元仓库** | `StudyProject/` 根 | 策略文档、`.gitmodules` |
| **工具** | `tools/` | 工作台 GUI |

**博客 = 展示层；代码 = 源仓。** 文章链到 GitHub 仓库，不拷贝 `.cs` 文件。

## 主学习仓（工作区核心）

| 概念 | 说明 |
|------|------|
| **博客 nav「Study C# 学习」** | 叙述 `learning/src/Study/` 的唯一官方入口 |
| **代码源仓** | `StudyProject-learning-src-Study`（元仓库子模块） |
| **边界** | 博客可公开；Study 仓跟课代码在此维护，不在博客仓提交 |

元仓库规则：`.cursor/rules/workspace-primary-repo.mdc`

## 磁盘与 Git

```
StudyProject/publish/yuhengyy.github.io/   ← 本仓库（独立 git）
├── docs/                                   ← MkDocs 内容根
│   ├── workspace/                          ← 工作区与多仓说明
│   ├── projects/csharp/                    ← C# 项目叙述
│   ├── projects/unity/                     ← Unity 项目叙述
│   └── knowledge/                          ← 专题笔记
├── mkdocs.yml                              ← 导航与主题
└── .cursor/skills/blog-workspace/          ← 本 Skill
```

GitHub：`https://github.com/yuhengyy/yuhengyy.github.io.git`  
分支：`main` · 部署：GitHub Pages

## 导航层级（mkdocs.yml）

```
首页
工作区          → workspace/（多仓索引、发布说明）
Study C# 学习   → projects/csharp/（主学习仓叙述）
Unity 项目      → projects/unity/（大项目归档）
学习笔记        → knowledge/（跨仓专题）
课程项目        → projects/index.md
进度 / 关于
```

新增页面时：**同时更新 `mkdocs.yml` nav** 和对应 `index.md` 链接。

## 与代码仓对应关系

| 博客页面 | source_repo | 本机代码路径 |
|----------|-------------|--------------|
| `projects/csharp/study-csharp.md` | `StudyProject-learning-src-Study` | `learning/src/Study/` |
| `projects/csharp/priority-queue.md` | 同上（`PriorityQueue`） | 同上 |
| `projects/unity/mmo-game.md` | 未来独立 Unity 仓 | `learning/unity/Projects/...` |
| `knowledge/*.md` | 跨仓或纯笔记 | — |

权威仓库表：`docs/workspace/repos.md`（与 `StudyProject/tools/config/repos.json` 对齐）

## 发布流程（工作台）

用户未明确要求时 **不要** commit / push。

1. 双击 `StudyProject/工作台.cmd`
2. 博客模块 → **启动预览**（http://127.0.0.1:8000/）
3. 确认后 **构建并发布**，填写中文提交说明（推送时自动 `gh-deploy` 到 `gh-pages`）

或在本仓目录：

```powershell
cd publish/yuhengyy.github.io
git add .
git -c user.name=yhyy -c user.email=zhoujiayuan233@gmail.com commit -m "docs: 说明"
git push origin main
python -m mkdocs gh-deploy --force
```

线上站点读 **gh-pages** 分支，不是 `main`。

MkDocs 进程自动设置 `NO_MKDOCS_2_WARNING=1`。

## 提交规范

- **只提交本仓文件**：`docs/`、`mkdocs.yml`、样式脚本
- **不提交**：`site/`（构建产物，应在 `.gitignore`）
- **中文 commit**：`docs: 更新 Study 项目页`、`fix: 修正导航链接`
- 作者：`yhyy <zhoujiayuan233@gmail.com>`，不修改全局 git config

## 新建项目文章模板

在 `docs/projects/<类型>/` 新建 `.md`，页脚加上仓库来源：

```markdown
---
source_repo: StudyProject-learning-src-Study
---

# 标题

> 代码：https://github.com/yuhengyy/StudyProject-learning-src-Study

（正文：理解、架构、踩坑，不贴大段源码）

---
🔙 [回到索引](index.md)
🏠 [返回首页](../../index.md)
```

并在 `mkdocs.yml` 对应分区添加 nav 项。

## 常见修复

| 问题 | 处理 |
|------|------|
| 中文乱码（`???`） | 用 UTF-8 无 BOM 重写，参考 `learning/src/Study/README.md` |
| `not included in nav` | 在 `mkdocs.yml` 添加 nav 条目 |
| 返回首页链接错误 | `docs/projects/*/` 用 `../../index.md`；`docs/knowledge/` 用 `../index.md` |
| 内容与代码不一致 | 改源仓 + 更新博客链接，不要只在博客里改代码描述 |

## 相关 Skill

- StudyProject 元仓库：`.cursor/skills/study-git-repos/SKILL.md`（多仓 / submodule）
- StudyProject 元仓库：`.cursor/skills/blog-publish/SKILL.md`（从根目录发布时的快捷入口）
