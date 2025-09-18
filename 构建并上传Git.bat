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

echo 推送到源代码仓库 (main分支)...
git push origin main
if errorlevel 1 (
    echo ❌ 推送到main分支失败！
    pause
    exit /b 1
)

echo 部署到GitHub Pages (gh-pages分支)...
mkdocs gh-deploy --force
if errorlevel 1 (
    echo ❌ 部署到gh-pages分支失败！
    echo.
    echo 请检查是否安装了mkdocs-git-deploy插件:
    echo pip install mkdocs-git-deploy
    pause
    exit /b 1
)

echo.
echo ✅ MkDocs 部署完成！
echo 📝 提交信息: %commit_msg%
echo 📁 源代码: main 分支
echo 🌐 网站: gh-pages 分支
echo 🌐 GitHub Pages 会自动从gh-pages分支更新
pause