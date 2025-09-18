# QFramework学习（核心模块笔记）

## 项目介绍
记录QFramework核心模块的学习要点，便于后续开发参考：
1. MVC模块：Model（数据）、View（UI）、Controller（逻辑）的分工与通信
2. 事件中心：全局事件的订阅与发布，解耦模块间依赖
3. 资源管理：ResKit的使用，支持AB包与Resources加载
4. UI管理：UIManager的面板栈管理，支持淡入淡出过渡
5. 配置表：Excel配置表的导入与读取，便于数值调整

## 核心笔记
- MVC通信：View通过事件中心通知Controller，Controller更新Model后反馈View
- 事件中心：用「字符串常量」定义事件名，避免拼写错误
- 资源加载：优先用AB包加载大型资源，Resources加载小型常用资源

## 学习建议
先掌握MVC和事件中心，再学习资源和UI管理，循序渐进。

---
🔙 [回到上一级（Unity项目索引）](index.md)  
🏠 [返回首页](../../../../index.md)
