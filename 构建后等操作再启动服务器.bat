@echo off
chcp 65001 > nul
if not exist "%~dp0.venv\Scripts\python.exe" (
    echo Run scripts\Setup-Blog.cmd first.
    pause
    exit /b 1
)
"%~dp0.venv\Scripts\python.exe" -B "%~dp0scripts\blog.py" build
if errorlevel 1 (
    pause
    exit /b 1
)
choice /c 12 /n /t 15 /d 2 /m "1: Start preview, 2: Exit [1-2]: "
if errorlevel 2 exit /b 0
"%~dp0.venv\Scripts\python.exe" -B "%~dp0scripts\blog.py" serve
set "BLOG_EXIT=%errorlevel%"
if not "%BLOG_EXIT%"=="0" pause
exit /b %BLOG_EXIT%
