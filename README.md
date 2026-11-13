# 羽痕的小站

[访问博客](https://yuhengyy.github.io/) · 基于 [Fuwari](https://github.com/saicaca/fuwari) / Astro 的个人博客。

首页呈现文章卡片，文章页支持分类、标签和时间归档；搜索在本地索引中完成。保留 Fuwari 原生的电脑侧栏、手机布局、明暗主题和宽屏文章目录。

## 本地使用

需要 Node.js 22 或更新版本，包管理器固定为 pnpm 9.14.4。

```powershell
.\scripts\Setup-Blog.cmd
npx --yes pnpm@9.14.4 dev
npx --yes pnpm@9.14.4 check
npx --yes pnpm@9.14.4 build
npx --yes pnpm@9.14.4 preview
```

开发与成品预览默认地址为 `http://localhost:4321/`。搜索依赖构建后的 Pagefind 索引，请在 build 后的 preview 中验证。

## 写文章

```powershell
npx --yes pnpm@9.14.4 new-post my-first-post --title "文章标题"
```

正文放在 `src/content/posts/`。脚本会创建草稿并填写日期；完成摘要、分类、标签及正文后，将 `draft` 改为 `false`。分类与归档自动生成，无需再手工编写索引。全站设置在 `src/config.ts`，关于页在 `src/content/spec/about.md`。

## 发布

先审核并提交源文件，再运行：

```powershell
npx --yes pnpm@9.14.4 publish:site
```

发布入口会检查分支、工作区和远端，构建并检查站内链接，再依次推送 `main` 和 `gh-pages`。它会要求输入 `publish` 确认；Agent 仅在用户已授权发布时使用 `--yes`。不强推、不自动提交文件。GitHub Pages 构建成功才算上线。

Windows 的四个原有批处理入口已切换到 Fuwari。公开博客独立于学习工程，构建不读取兄弟项目。

更多说明见 [维护与写作](maintenance/README.md)、[迁移记录](maintenance/MIGRATION.md)。Fuwari 源码遵循根目录的 MIT LICENSE；文章不自动套用该开源许可。
