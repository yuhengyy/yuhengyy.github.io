---
source_repo: StudyProject-learning-src-Study
---

# Study C# 学习仓库（2026 主仓）

> **GitHub**：[StudyProject-learning-src-Study](https://github.com/yuhengyy/StudyProject-learning-src-Study)  
> **本机路径**：StudyProject/learning/src/Study/  
> **构建命令**：dotnet build CSharp.slnx（见 [仓库索引](../../workspace/repos.md)）

跟着老师敲课的 **2026 主学习仓**，包含 C# 基础知识导航、可复用工具类库及示例项目。

## 解决方案结构

| 项目 | 类型 | 说明 |
|------|------|------|
| BaseKnowledge | 控制台 | C# 知识点菜单导航与归档 |
| Logger | 类库 | 日志工具 |
| Logger.Sample | 示例 | 日志使用示例 |
| Timer | 类库 | Tick / Frame / Async 定时器 |
| Timer.Sample | 示例 | 定时器使用示例 |
| PriorityQueue | 类库 | 小顶堆优先级队列 |
| PriorityQueue.Sample | 示例 | 队列算法与压测 |

用 Visual Studio 打开 CSharp.slnx，或命令行 dotnet build CSharp.slnx。

## BaseKnowledge 目录层级

| 目录 | 内容 |
|------|------|
| CSharpBeginner | 入门练习、小游戏 |
| CSharpFundamental | 函数、数组、类型、排序等基础 |
| CSharpCore | 类、继承、多态、接口等核心 |
| CSharpAdvanced | 集合、委托事件、泛型、反射、线程等 |
| Algorithm | 算法练习 |
| Projects/ | 综合作业（如学生管理系统） |

运行导航：dotnet run --project BaseKnowledge

## 相关博客文章

| 文章 | 对应项目 |
|------|----------|
| [优先队列](priority-queue.md) | PriorityQueue + PriorityQueue.Sample |
| [唐老狮综合案例](tang-comprehensive.md) | 早期综合练习，部分在 BaseKnowledge |
| [网络编程基础](../../knowledge/net-notes.md) | 早期 Server.Playground / Networking.Playground |

## 与工作区的关系

本仓是 StudyProject 元仓库的 **C# 学习子模块**。  
工作台「总览」模块可查看各仓 Git 状态；代码变更在此仓提交，博客只写叙述与链接。

---

🔙 [C# 项目索引](index.md)  
🏠 [返回首页](../../index.md)
