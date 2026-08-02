# 工作区概览

本博客是 **StudyProject 学习工作区** 的对外叙述层，与代码仓库分离。

## 三层结构

```
StudyProject/                 ← 元仓库（策略、索引、工作台）
├── learning/                 ← 学习代码（各独立 Git 仓）
│   └── src/Study/            ← C# 主学习仓
├── tools/                    ← 工作台 GUI
├── publish/
│   └── yuhengyy.github.io/   ← 本博客（你正在阅读）
└── docs/                     ← 元仓库内部文档（不公开）
```

| 层级 | 放什么 | Git |
|------|--------|-----|
| **代码仓** | `.cs`、Unity 工程、工具源码 | 各子仓库独立提交 |
| **本博客** | 学习笔记、项目心得、架构说明 | `yuhengyy.github.io` |
| **元仓库** | 多仓策略、Cursor 规则、仓库索引 | `StudyProject` |

## 快速入口

| 链接 | 说明 |
|------|------|
| [仓库索引](repos.md) | 所有 Git 仓库与路径对照 |
| [发布与提交](publish.md) | 如何用工作台发布博客 |
| [Study C# 学习](../projects/csharp/study-csharp.md) | 当前主学习代码仓 |
| [学习笔记](../knowledge/index.md) | 专题知识沉淀 |
| [Unity 项目](../projects/unity/index.md) | Unity 课程项目归档 |

## 边界原则

1. **代码只在源仓维护一份**（如 Study、未来 MMO Unity 仓）
2. **博客只写理解、架构、踩坑与链接**，不拷贝大段源码
3. **每篇项目文应能追溯到对应 GitHub 仓库**（见 [仓库索引](repos.md)）

---

🏠 [返回首页](../index.md)
