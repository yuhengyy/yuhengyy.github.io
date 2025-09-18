@echo off
chcp 65001 > nul
title Git操作菜单

cd /d "E:\_Project\yuhengyyKnowledge"

:menu
cls
echo ========================================
echo           Git 操作菜单
echo ========================================
echo.
echo 1. 查看当前状态
echo 2. 添加所有更改并提交
echo 3. 仅提交已暂存的更改
echo 4. 推送到远程仓库
echo 5. 退出
echo.
set /p "choice=请选择 [1-5]: "

if "%choice%"=="1" goto status
if "%choice%"=="2" goto add_commit
if "%choice%"=="3" goto commit_only
if "%choice%"=="4" goto push_only
if "%choice%"=="5" exit

echo 无效的选择，请重新输入
pause
goto menu

:status
cls
echo ========== Git状态 ==========
git status
echo.
echo ============================
pause
goto menu

:add_commit
cls
echo ========== 添加并提交 ==========
git add .
if errorlevel 1 (
    echo ❌ 添加文件失败！
    pause
    goto menu
)

:get_commit_msg
set /p "commit_msg=请输入提交说明: "
if "%commit_msg%"=="" (
    echo ❌ 提交信息不能为空！
    goto get_commit_msg
)

git commit -m "%commit_msg%"
if errorlevel 1 (
    echo ❌ 提交失败！
) else (
    echo ✅ 提交成功！
)
pause
goto menu

:commit_only
cls
echo ========== 提交更改 ==========
:get_commit_msg2
set /p "commit_msg=请输入提交说明: "
if "%commit_msg%"=="" (
    echo ❌ 提交信息不能为空！
    goto get_commit_msg2
)

git commit -m "%commit_msg%"
if errorlevel 1 (
    echo ❌ 提交失败！
) else (
    echo ✅ 提交成功！
)
pause
goto menu

:push_only
cls
echo ========== 推送到远程 ==========
git push origin main
if errorlevel 1 (
    echo ❌ 推送失败！
) else (
    echo ✅ 推送成功！
)
pause
goto menu