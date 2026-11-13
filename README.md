# Yuhengyy 的小站

公开内容位于 `docs/`，当前为精简后的 Material 版本：六篇学习记录，以及首页、文章、标签和关于页。

## 本地使用

```powershell
.\scripts\Setup-Blog.cmd
.\.venv\Scripts\python.exe -B scripts/blog.py build --strict
.\.venv\Scripts\python.exe -B scripts/blog.py serve
```

公开文章独立于学习工程，构建不读取兄弟项目。源码分支为 `main`，线上读取 `gh-pages`。

维护记录见 [maintenance/README.md](maintenance/README.md)。已下线内容、原始协作规则和历史版本均包含在本地迁移备份中。
