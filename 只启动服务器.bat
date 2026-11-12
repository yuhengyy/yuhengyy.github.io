@echo off
chcp 65001 > nul
if not exist "%~dp0.venv\Scripts\python.exe" (
    echo Run scripts\Setup-Blog.cmd first.
    pause
    exit /b 1
)
"%~dp0.venv\Scripts\python.exe" -B "%~dp0scripts\blog.py" serve
set "BLOG_EXIT=%errorlevel%"
if not "%BLOG_EXIT%"=="0" pause
exit /b %BLOG_EXIT%
