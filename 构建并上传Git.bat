@echo off
chcp 65001 > nul
title Git上传工具
echo ========================================
echo           Git 源代码上传
echo ========================================
echo.

cd /d "E:\_Project\yuhengyyKnowledge"

:menu
cls
echo 请选择Git操作：
echo 1. 查看当前状态
echo 2. 添加所有更改并提交
echo 3. 仅提交已暂存的更改
echo 4. 推送到远程仓库
echo 5. 一键完成（添加+提交+推送）
echo 6. 退出
echo.
choice /c 123456 /n /m "请选择 [1-6]: "

if %errorlevel% equ 1 goto status
if %errorlevel% equ 2 goto add_commit
if %errorlevel% equ 3 goto commit_only
if %errorlevel% equ 4 goto push_only
if %errorlevel% equ 5 goto auto_upload
if %errorlevel% equ 6 exit

:status
git status
echo.
pause
goto menu

:add_commit
git add .
if %errorlevel% neq 0 (
    echo ❌ 添加文件失败！
    pause
    goto menu
)
set /p commit_msg=请输入提交说明: 
if "%commit_msg%"=="" (
    echo ❌ 提交信息不能为空！
    pause
    goto menu
)
git commit -m "%commit_msg%"
if %errorlevel% equ 0 (
    echo ✅ 提交成功！
) else (
    echo ❌ 提交失败！
)
pause
goto menu

:commit_only
set /p commit_msg=请输入提交说明: 
if "%commit_msg%"=="" (
    echo ❌ 提交信息不能为空！
    pause
    goto menu
)
git commit -m "%commit_msg%"
if %errorlevel% equ 0 (
    echo ✅ 提交成功！
) else (
    echo ❌ 提交失败！
)
pause
goto menu

:push_only
git push origin main
if %errorlevel% equ 0 (
    echo ✅ 推送成功！
) else (
    echo ❌ 推送失败！
)
pause
goto menu

:auto_upload
set /p commit_msg=请输入提交说明: 
if "%commit_msg%"=="" (
    echo ❌ 提交信息不能为空！
    pause
    goto menu
)
echo.
echo 正在执行一键上传...
git add .
git commit -m "%commit_msg%"
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ 一键上传完成！
) else (
    echo.
    echo ❌ 上传过程中出现错误！
)
echo.
pause
goto menu