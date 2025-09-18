@echo off
chcp 65001 > nul
title MkDocs服务器
echo ========================================
echo           启动 MkDocs 服务器
echo ========================================
echo.

cd /d "E:\_Project\yuhengyyKnowledge"

echo 正在启动本地服务器...
echo 本地访问: http://127.0.0.1:8000
echo 按 Ctrl+C 停止服务器
echo.
echo ====================== 服务器日志 ======================
echo.

mkdocs serve