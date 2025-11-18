# TCP网络通信（C#实现）

## 项目介绍
基于C# Socket类实现的TCP客户端与服务器通信案例，支持：
1. 服务器：监听指定端口，接收客户端连接，处理客户端发送的消息

## 关键技术
- Socket编程：创建Socket、绑定端口、监听连接、发送/接收数据

## 代码示例（服务器核心逻辑）// 创建服务器Socket

// 绑定端口
serverSocket.Bind(new IPEndPoint(IPAddress.Any, 8888));

## 测试方式
1. 先运行服务器程序，再运行多个客户端程序

---
🔙 [回到上一级（Unity项目索引）](index.md)  
🔙 [回到上一级（C#项目索引）](../CSharp/index.md)  
🏠 [返回首页](../../../../index.md)
