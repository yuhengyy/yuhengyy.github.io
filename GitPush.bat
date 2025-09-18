@echo off
chcp 65001 > nul
title MkDocs部署工具
echo ========================================
echo           MkDocs 部署工具
echo ========================================
echo.

REM 切换到项目目录
cd /d "E:\_Project\yuhengyyKnowledge"

echo 1. 只上传源代码
echo 2. 构建并上传网站（gh-pages）
echo.
choice /c 12 /n /m "请选择 [1-2]: "

if %errorlevel% equ 1 goto source_only
if %errorlevel% equ 2 goto deploy_pages

:source_only
set /p commit_msg=请输入提交说明: 
if "%commit_msg%"=="" (
    echo 提交信息不能为空！
    pause
    exit /b 1
)
echo.
echo 正在上传源代码...
git add .
git commit -m "%commit_msg%"
git push origin main
goto done

:deploy_pages
set /p commit_msg=请输入提交说明: 
if "%commit_msg%"=="" (
    echo 提交信息不能为空！
    pause
    exit /b 1
)
echo.
echo 正在构建并部署网站...
git add .
git commit -m "%commit_msg%"
git push origin main
mkdocs gh-deploy --force

:done
echo.
if %errorlevel% equ 0 (
    echo ✅ 操作成功完成！
) else (
    echo ❌ 操作失败！
)
echo.
pause