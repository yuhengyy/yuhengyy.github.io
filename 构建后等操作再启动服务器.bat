@echo off
chcp 65001 > nul
title MkDocs智能构建
echo ========================================
echo           MkDocs 智能构建
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

echo ✅ 构建成功！
echo.
echo 请选择操作：
echo 1. 按 Enter 键立即启动服务器
echo 2. 等待15秒自动退出
echo.

:: 使用 choice 命令等待输入
choice /c:12 /n /t 15 /d 2 /m "请选择 [1-2]: "

if %errorlevel% equ 1 (
    echo.
    echo 正在启动本地服务器...
    echo 本地访问: http://127.0.0.1:8000
    echo 按 Ctrl+C 停止服务器
    echo.
    echo ====================== 服务器日志 ======================
    echo.
    mkdocs serve
) else (
    echo.
    echo 操作取消，程序退出。
    timeout /t 2 > nul
)