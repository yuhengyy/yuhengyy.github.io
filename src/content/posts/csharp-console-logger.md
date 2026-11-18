---
title: "我给 C# 控制台写了一个小 Logger"
published: 2026-11-19
description: "用一个控制台 Logger 练习彩色输出、扩展方法，以及在 Trace 和 Error 时输出调用堆栈。"
image: ""
tags: ["C#", "日志", "工具"]
category: "C#"
draft: false
---

这是一个小型控制台彩色日志工具，放在 `Tools.Logger` 命名空间。我用它练习**区分输出颜色、用扩展方法简化调用、在需要时打印调用堆栈**。

## 先从几种输出看起

| 调用 | 用途 |
| --- | --- |
| `Log` | 灰色输出，用于一般信息。 |
| `Warn` | 黄色输出，用于提示潜在问题。 |
| `Error` | 红色输出，附带调用堆栈。 |
| `Trace` | 洋红色输出，附带调用堆栈。 |
| `ColorLog` | 由调用者选颜色，用来突出某条信息。 |

核心写法很直接。输出前保存 `Console.ForegroundColor`，设置本条日志的颜色，调用 `Console.WriteLine`，然后恢复原颜色。

## 用扩展方法简化调用

`Logger.cs` 负责输出，`LogExtensions.cs` 提供 `this.Log()` 等扩展方法。扩展方法最后仍调用同一个 `Logger`，所以普通调用和扩展方法用的是同一套输出逻辑。

Sample 用这几行演示不同的日志输出。

```csharp
this.Log("Server application is running.");
this.Warn("Server application warning message.");
this.Error("Server application error message.");
this.Trace("Server application trace message.");
```

也可以直接输出对象，例如 `this.Log(this)`。普通日志根据对象的 `ToString()` 生成文本。带参数的消息则走 `string.Format`，格式化失败时保留原始消息。

## 用堆栈追调用路径

`Trace` 和 `Error` 在消息后用 `new StackTrace(1, true)` 打印调用堆栈。普通 `Log` 和 `Warn` 只输出消息。平时可以先扫一眼颜色，遇到需要定位的调用再看后面的堆栈。

## 运行示例

这个 Sample 的目标框架是 `.NET 10`。在 C# 学习仓库的根目录可以运行这个示例。

```powershell
dotnet run --project Logger.Sample
```

示例会先输出几种颜色，再演示普通、警告、错误和追踪日志。输出完成后，按任意键退出。

[Logger 源码](https://github.com/yuhengyy/StudyProject-learning-src-Study/tree/master/Logger) · [Logger.Sample](https://github.com/yuhengyy/StudyProject-learning-src-Study/tree/master/Logger.Sample)
