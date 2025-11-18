# Unity 网络开发基础

## 基础网络知识学习

依据学完的 C#知识，去学习网络相关内容，虽然曾经也了解过，也使用 TCP 制作过相关的聊天功能并整合到游戏，但是这次还是系统学习了一下

先是了解基本的 IP 和端口，声明 TCP 或者 UDP，然后传递字符串

```
string ip = "127.0.0.1";
int port = 8888;
IPEndPoint pt = new(IPAddress.Parse(ip), port);
Socket tcpSkt = new Socket(pt.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
Socket udpSkt = new Socket(pt.AddressFamily, SocketType.Dgram, ProtocolType.Udp);
```

然后了解其不同协议之间的通信原理和知识点，差别等

最后则是手写了一个阻塞的 While 循环的控制台控制程序，传递字符串对话，这些都是简单的

### 手写 TCP 通信程序

重点和难点是通过 BitConvert 和 Encoding.UTF8 去自己手写序列化和反序列化工具，并且了解 TCP 通信存在分包粘包，在教导下增加消息头，用自己的序列化和反序列化工具去实现消息体的拆分

最终通过其异步+监听，实现了一个可以服务器一对多，客户端一对一的通信消息

## 项目实战,异步网络通信+Unity 整合

网络通信原理与实战应用，整合之前的知识点复习，并制作 Unity 之间进行互相对话的 TCP 通信项目

> 虽然很早之前，实习前（目前约 2 年前）就做过一模一样功能，课程还是大学生项目，但是当时完全不懂，但这一次是系统性学习，不是盲敲，知道原理和原由

## Protobuf 序列化

最后就是利用曾经知识，开启了 Protobuf 序列化课程，跟着巩固了自己的知识，主要是完善自己对 NetMsg 类和 CMD 消息结构的理解
之后

## 开发帧同步网络库

用 UDP 通信实现 KCP 逻辑原理

> 但是这里就不懂了，除了心跳消息和重新分发，很多逻辑又看不懂，无法理解基于 UDP 实现 KCP 的结构，但是因为我后面跟随的课程是《状态同步 MMO 案例课程》所以看完课程加以实现后完并，而是搁置自己的不懂

---

🔙 [回到上一级（首页）](../index.md)  
🏠 [返回首页](../index.md)
