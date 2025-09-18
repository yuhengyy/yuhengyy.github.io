@echo off
chcp 65001 > nul
title Git一键上传工具
echo ========================================
echo            Git 一键上传工具
echo ========================================
echo.

REM 切换到项目目录
cd /d "E:\_Project\yuhengyyKnowledge"

REM 检查是否有更改
git status
echo.
echo 请确认以上更改是否正确...
echo.

REM 输入提交信息
set /p commit_msg=请输入提交说明: 
if "%commit_msg%"=="" (
    echo 提交信息不能为空！
    pause
    exit /b 1
)

echo.
echo 正在执行Git操作...
echo.

REM 执行Git操作
git add .
git commit -m "%commit_msg%"
git push origin main

echo.
if %errorlevel% equ 0 (
    echo ✅ 上传成功！更改已推送到GitHub。
) else (
    echo ❌ 上传失败，请检查错误信息。
)

echo.
echo 操作完成！
pause