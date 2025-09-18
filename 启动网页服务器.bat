@echo off
chcp 65001 > nul
REM 切换到你的项目目录
cd /d "E:\_Project\yuhengyyKnowledge"

echo 正在启动 MkDocs 开发服务器...
echo 本地访问地址： http://127.0.0.1:8000
echo.
echo [注意] 这是一个实时预览服务器。
echo [注意] 修改并保存 Markdown 文件后，浏览器页面会自动刷新。
echo.
echo 按 Ctrl+C 可以停止服务器。
echo.
echo ====================== 服务器日志开始 ======================
echo.

mkdocs serve