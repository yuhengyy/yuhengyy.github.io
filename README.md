# BlogProject · 公开博客

这里维护公开文章、站点导航和 MkDocs 配置。博客可以独立预览、构建和发布，运行不需要学习项目或工作台。

## 常用入口

| 想做什么 | 入口 |
|---|---|
| 写文章 | [docs/](docs/index.md)，导航在 [mkdocs.yml](mkdocs.yml) |
| 写新随记 | [写作指南](docs/workspace/writing.md)，文章、标签与归档自动生成 |
| 本地预览 | 双击 [只启动服务器.bat](只启动服务器.bat) |
| 构建并预览 | 双击 [构建并启动服务器.bat](构建并启动服务器.bat) |
| 查看操作方法 | [预览与发布](docs/workspace/publish.md) |
| Agent 协作 | [AGENTS.md](AGENTS.md) |

首次安装依赖，在本目录的 PowerShell 中执行：

```powershell
.\scripts\Setup-Blog.cmd
```

依赖版本由 [requirements.txt](requirements.txt) 固定，环境位于本项目 `.venv/`。脚本直接使用其中的 Python，无需激活环境。换电脑或移动整个项目后，先将旧 `.venv` 改名留作备份，再运行安装入口重建环境。

```powershell
.\.venv\Scripts\python.exe -B scripts/blog.py build
.\.venv\Scripts\python.exe -B scripts/blog.py serve
```

默认预览地址为 `http://127.0.0.1:8000/`，可用 `--port` 修改。发布入口 [构建并上传Git.bat](构建并上传Git.bat) 会显示本仓改动并确认，再提交、推送和部署；日常预览、构建不会执行这些操作。

## 当前外观与维护

站点使用 Material 的博客与标签插件，首页、卡片和文章索引在 `overrides/`，旧笔记由 `scripts/site_hooks.py` 汇入索引，原 URL 保留。`extra.featured_posts` 控制首页优先展示顺序。新随记使用 `scripts/blog.py new --title "标题" --slug article-slug` 创建草稿；具体用法见[写作指南](docs/workspace/writing.md)。

这轮继续完善 Material；Fuwari 保留为备选路线，尚未迁移。Material 的上游维护期限见[官方说明](https://squidfunk.github.io/mkdocs-material/)，后续再评估框架迁移。

## 内容与代码

文章通过公开仓库链接说明代码来源，不复制业务源码，也不读取兄弟项目参与构建。公开代码索引由博客自己维护：[代码来源](docs/workspace/repos.md)。

本机学习代码可从相对链接进入：[C#](../StudyProject/CSharp/README.md)、[Unity](../StudyProject/Unity/baselearning/README.md)。这些链接是阅读关联，缺少学习工程不影响博客运行。

本仓 Git 历史和远端继续使用 `yuhengyy.github.io`。源码在 `main`，GitHub Pages 读取 `gh-pages`；`site/`、`.venv/` 均不提交。
