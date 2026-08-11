# 工作区概览

本博客是 **StudyProject 学习工作区** 的对外叙述层，与代码仓库分离。

**完整目录树不在此维护**——以元仓库正式图为准（本地 `docs/workspace-map.md`）；公开仓表见 [仓库索引](repos.md)（由 `repos.json` 生成）。

| 层级 | 放什么 | Git |
|------|--------|-----|
| **代码仓** | `.cs`、Unity、Flutter App、工具源码 | 各子仓库独立提交 |
| **本博客** | 学习笔记、项目心得、架构说明 | `yuhengyy.github.io` |
| **元仓库** | 多仓策略、Cursor 规则、正式图 | `StudyProject` |

## 快速入口

| 链接 | 说明 |
|------|------|
| [仓库索引](repos.md) | Git 仓库与路径（生成镜像） |
| [发布与提交](publish.md) | 如何用工作台发布博客 |
| [Study C# 学习](../projects/csharp/study-csharp.md) | 当前主学习代码仓 |
| [学习笔记](../knowledge/index.md) | 专题知识沉淀 |
| [Unity 项目](../projects/unity/index.md) | Unity 课程项目归档 |

## 边界原则

1. **代码只在源仓维护一份**  
2. **博客只写理解、架构、踩坑与链接**，不拷贝大段源码  
3. **项目文应能追溯到对应 GitHub 仓库**（见 [仓库索引](repos.md)）

---

🏠 [返回首页](../index.md)
