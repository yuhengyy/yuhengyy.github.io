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

echo 推送到远程仓库...
git push github-pages
if errorlevel 1 (
    echo ❌ 推送失败！
    pause
    exit /b 1
)

echo.
echo ✅ MkDocs 部署完成！
echo 📝 提交信息: %commit_msg%
echo 🌐 GitHub Pages 会自动更新
pause