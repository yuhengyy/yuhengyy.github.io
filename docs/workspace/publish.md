# 预览与发布

博客使用自己的 Python 环境和依赖清单，可以独立完成以下操作。在博客目录打开 PowerShell 后执行。

## 安装依赖

```powershell
.\scripts\Setup-Blog.cmd
```

依赖版本来自 `requirements.txt`，安装到本项目 `.venv/`。换电脑或移动整个项目后，先将旧 `.venv` 改名留作备份，再运行安装入口重建环境。脚本不需要激活虚拟环境。

## 构建与预览

```powershell
.\.venv\Scripts\python.exe -B scripts/blog.py build
.\.venv\Scripts\python.exe -B scripts/blog.py serve
```

预览默认地址为 `http://127.0.0.1:8000/`。端口被占用时，可添加 `--port 8002`。按 Ctrl+C 停止本次预览。根目录保留双击启动入口，执行同一套项目脚本。

构建产物位于 `site/`，不进入源码提交。预览和构建不会提交、推送或部署。

## 发布

人工发布可运行 `.venv/Scripts/python.exe -B scripts/blog.py publish` 或双击 `构建并上传Git.bat`。入口会先构建、显示本仓全部改动，再明确确认提交、推送和部署。确认前应检查改动范围；不需要发布时直接退出。

| 分支 | 内容 |
|---|---|
| `main` | 文章、配置、脚本等源码 |
| `gh-pages` | MkDocs 生成的静态站点，供 GitHub Pages 使用 |

仅推送 `main` 不会更新线上页面。发布入口先推送源码，成功后才运行 MkDocs 部署；任何步骤失败即停止。

Agent 仅在用户明确授权后执行相应的提交、推送或部署。协作方法见本仓 `.agents/skills/blog-workspace/SKILL.md`。

---

[博客与代码](index.md) · [返回首页](../index.md)
