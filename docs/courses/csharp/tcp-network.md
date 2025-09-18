# TCP网络通信（C#实现）

## 项目介绍
基于C# Socket类实现的TCP客户端与服务器通信案例，支持：
1. 服务器：监听指定端口，接收客户端连接，处理客户端发送的消息
2. 客户端：连接服务器，发送文本消息，接收服务器的响应
3. 双向通信：客户端与服务器可互相发送消息，支持多客户端同时连接（服务器用多线程处理）
4. 异常处理：处理连接断开、网络异常等情况，避免程序崩溃

## 关键技术
- Socket编程：创建Socket、绑定端口、监听连接、发送/接收数据
- 多线程：服务器用Thread处理每个客户端的消息，避免阻塞主线程
- 编码转换：将字符串转换为字节数组（UTF-8编码）进行传输

## 代码示例（服务器核心逻辑）// 创建服务器Socket
Socket serverSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
// 绑定端口
serverSocket.Bind(new IPEndPoint(IPAddress.Any, 8888));
// 监听连接（最多同时处理10个等待连接）
serverSocket.Listen(10);
Console.WriteLine("服务器已启动，等待客户端连接...");
// 接收客户端连接（用线程避免阻塞）
new Thread(() => {
    Socket clientSocket = serverSocket.Accept();
    Console.WriteLine("客户端已连接：" + clientSocket.RemoteEndPoint);
    // 后续处理消息接收...
}).Start();
## 测试方式
1. 先运行服务器程序，再运行多个客户端程序
2. 客户端输入消息，服务器会显示消息并回复「已收到：XXX」

---
🔙 [回到上一级（C#项目索引）](index.md)  
🏠 [返回首页](../../../../index.md)
