@echo off
chcp 65001 > nul
title MkDocs本地服务器
echo ========================================
echo           MkDocs 本地服务器
echo ========================================
echo.

cd /d "E:\_Project\yuhengyyKnowledge"

echo 正在构建静态网站...
mkdocs build

if %errorlevel% neq 0 (
    echo ❌ 构建失败！
    pause
    exit /b 1
)

echo ✅ 构建成功！正在启动本地服务器...
echo 本地访问: http://127.0.0.1:8000
echo 按 Ctrl+C 停止服务器
echo.
echo ====================== 服务器日志 ======================
echo.

mkdocs serve