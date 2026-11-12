@echo off
setlocal
pushd "%~dp0.."
if errorlevel 1 exit /b 1
set "BLOG_PYTHON=python"
if not "%~1"=="" set "BLOG_PYTHON=%~1"
if not exist ".venv\Scripts\python.exe" (
    "%BLOG_PYTHON%" -m venv ".venv"
    if errorlevel 1 (
        popd
        exit /b 1
    )
)
".venv\Scripts\python.exe" -m pip install --disable-pip-version-check -r "requirements.txt"
if errorlevel 1 (
    popd
    exit /b 1
)
".venv\Scripts\python.exe" -m mkdocs --version
set "BLOG_EXIT=%errorlevel%"
popd
exit /b %BLOG_EXIT%
