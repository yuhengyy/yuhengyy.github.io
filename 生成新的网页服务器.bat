@echo off
chcp 65001 > nul
REM 切换到你的项目目录
cd /d "E:\_Project\yuhengyyKnowledge"

echo 正在生成静态网站...
mkdocs build

if %errorlevel% equ 0 (
    echo.
    echo 成功！静态网站已生成到 "site" 文件夹。
) else (
    echo.
    echo 生成失败，请检查 mkdocs.yml 配置或 Markdown 文件语法。
)

echo.
pause