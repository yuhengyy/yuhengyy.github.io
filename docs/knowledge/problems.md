# 问题记录（解决方案汇总）

## 1. Unity问题
### 问题1：物体移动时卡顿
- 现象：角色移动时画面断断续续
- 原因：在Update中用Transform.Translate，受帧率影响（帧率低时移动慢）
- 解决方案：用Time.deltaTime适配帧率，代码：
  ```csharp
  void Update() {
      transform.Translate(Vector3.forward * speed * Time.deltaTime);
  }
  ```

### 问题2：UI按钮点击无响应
- 现象：按钮点击后不触发事件
- 原因1：按钮没有挂载Button组件；原因2：有其他UI遮挡（如Panel层级高于按钮）
- 解决方案：检查Button组件是否存在，调整UI的Sorting Order或Rect Transform的层级

## 2. C#问题
### 问题1：List遍历中删除元素报错
- 现象：`foreach (var item in list) { if (item == 0) list.Remove(item); }` 报错
- 原因：foreach遍历中不能修改集合长度
- 解决方案：用for循环倒序删除，代码：
  ```csharp
  for (int i = list.Count - 1; i >= 0; i--) {
      if (list[i] == 0) list.RemoveAt(i);
  }
  ```

### 问题2：TCP客户端连接超时
- 现象：客户端连接服务器时提示“连接超时”
- 原因1：服务器未启动或端口错误；原因2：防火墙阻止了端口访问
- 解决方案：检查服务器是否启动、端口是否匹配，关闭防火墙或开放对应端口

---
🔙 [回到上一级（知识库索引）](index.md)  
🏠 [返回首页../../index.md)
