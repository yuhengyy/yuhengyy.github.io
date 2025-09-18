@echo off
chcp 65001 > nul
title MkDocs 一键部署工具

echo ========================================
echo         MkDocs 一键部署
echo ========================================
echo.

cd /d "E:\_Project\yuhengyyKnowledge"

:input_message
set /p "commit_msg=请输入提交说明: "
if "%commit_msg%"=="" (
    echo ❌ 提交信息不能为空！
    goto input_message
)

echo.
echo 正在构建静态网站...
mkdocs build
if errorlevel 1 (
    echo ❌ MkDocs 构建失败！
    pause
    exit /b 1
)
echo ✅ 构建成功！

echo.
echo 正在执行Git操作...
echo 添加更改...
git add .
if errorlevel 1 (
    echo ❌ 添加文件失败！
    pause
    exit /b 1
)

echo 提交更改...
git commit -m "%commit_msg%"
if errorlevel 1 (
    echo ❌ 提交失败！
    pause
    exit /b 1
)

echo 检查本地提交状态...
git status
echo.

echo 尝试推送到源代码仓库 (main分支)...
git push origin main
if errorlevel 1 (
    echo ⚠️ 推送到main分支失败，可能是网络问题
    echo.
    echo 当前状态: 本地有未推送的提交
    echo 您可以使用以下命令手动推送:
    echo git push origin main
    echo.
    echo 继续尝试部署网站到GitHub Pages...
)

echo 部署到GitHub Pages (gh-pages分支)...
mkdocs gh-deploy --force
if errorlevel 1 (
    echo ❌ 部署到gh-pages分支失败！
    echo.
    echo 可能的原因:
    echo 1. 网络连接问题
    echo 2. 未安装mkdocs-git-deploy插件
    echo.
    echo 请检查网络连接后重试
    echo 安装插件命令: pip install mkdocs-git-deploy
    pause
    exit /b 1
)

echo.
echo ✅ MkDocs 网站部署完成！
echo 📝 提交信息: %commit_msg%
echo 📁 网站已部署到: gh-pages 分支

REM 检查是否还有未推送的提交
git status | find "Your branch is ahead" > nul
if not errorlevel 1 (
    echo ⚠️ 注意: 本地还有未推送的提交到main分支
    echo 请手动执行: git push origin main
)

pause