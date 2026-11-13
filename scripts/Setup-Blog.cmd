@echo off
chcp 65001 > nul
cd /d "%~dp0.."
where node >nul 2>&1
if errorlevel 1 (
    echo Install Node.js 22 or later first.
    exit /b 1
)
call npx --yes pnpm@9.14.4 install --frozen-lockfile --store-dir .local/pnpm-store
exit /b %errorlevel%
