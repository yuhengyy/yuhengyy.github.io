# 写下一篇文章

新随记只维护一份 Markdown。文章列表、分类、标签和年份归档在构建时自动更新，无需逐页手写链接。

## 创建草稿

在博客根目录执行：

```powershell
.\.venv\Scripts\python.exe -B scripts/blog.py new --title "一次小小的发现" --slug a-small-discovery --category 随记 --tag 灵感
```

文件会生成在 `docs/journal/posts/a-small-discovery.md`。同名文件不会被覆盖。`slug` 使用小写英文字母、数字和短横线，决定文章地址，发布后尽量保持不变。

## 写作与预览

编辑文件顶部的标题、摘要、日期、分类与标签，然后填写正文。`<!-- more -->` 上方是随记列表中的摘要，下方是展开阅读的正文。

新文章默认为 `draft: true`，普通预览和正式构建都不会显示它。准备预览公开效果时，将其改为 `draft: false`，然后启动本地预览。

```powershell
.\.venv\Scripts\python.exe -B scripts/blog.py serve
```

日期填写真实的文章日期。旧笔记没有可靠日期时，保留「学习记录」标记，不补造时间。

## 自动生成哪些入口

- **所有文章**：汇总 `journal/posts/`、`projects/csharp/`、`projects/unity/` 和 `knowledge/` 中的正文页，排除 `index.md` 与草稿。可按主题、标题筛选。
- **随记**：Material 博客插件负责日期排序、分类、分页与年份归档。
- **标签**：文章 `tags` 决定标签。旧笔记未填写时，按现有目录赋予基础标签。
- **首页**：`mkdocs.yml` 的 `extra.featured_posts` 指定优先展示的源文件，其余文章自动补足六张卡片。标题和摘要直接读取文章。

旧的笔记目录和原文章地址继续保留。新增旧式笔记时，仍需同步其所属目录页和导航；日常新文章优先使用上面的随记流程。

## 调整外观

首页与文章卡片位于 `overrides/`，配色和布局位于 `docs/stylesheets/extra.css`，筛选行为位于 `docs/javascripts/extra.js`。封面是本站的本地矢量图形，不依赖外部图库或在线字体。

当前方案继续使用 Material。Fuwari 是后续重构备选，尚未迁移。

[本站说明](index.md) · [预览与发布](publish.md) · [返回首页](../index.md)
