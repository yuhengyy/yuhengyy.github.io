@echo off
chcp 65001 > nul
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
    echo Install Node.js 22 or later, then run scripts\Setup-Blog.cmd.
    pause
    exit /b 1
)
call npx --yes pnpm@9.14.4 build
if errorlevel 1 goto end
echo Build complete. Press any key to start preview.
pause
call npx --yes pnpm@9.14.4 preview
:end
set "BLOG_EXIT=%errorlevel%"
pause
exit /b %BLOG_EXIT%
