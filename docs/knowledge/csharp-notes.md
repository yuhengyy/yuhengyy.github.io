# C#笔记（核心知识点）

## 1. 基础语法
- 变量声明：`int age = 18; string name = "张三";`（注意变量命名规范：小驼峰）
- 方法定义：`public void Add(int a, int b) { return a + b; }`
- 条件判断：if-else、switch（switch支持int、string、enum类型）
- 循环：for（固定次数）、while（条件满足时循环）、foreach（遍历集合）

## 2. 高级特性
- 泛型：`List<T>`（避免装箱拆箱，提高性能），如`List<int> numbers = new List<int>();`
- 委托：`public delegate void MyDelegate(string msg);`（将方法作为参数传递）
- 事件：基于委托的观察者模式，如`public event MyDelegate OnMessageSend;`
- 异步：async/await，如`public async Task GetData() { await Http.GetAsync(url); }`（避免阻塞主线程）

## 3. 关键字
- static：静态成员，属于类而非实例，如`public static int Count = 0;`
- const：编译时常量，必须初始化且不可修改
- readonly：运行时常量，只能在构造函数或初始化时赋值
- virtual/override：虚方法与重写，实现多态

---
🔙 [回到上一级（知识库索引）](index.md)  
🏠 [返回首页../../index.md)
