# Unity 笔记

> 路径 API、特殊文件夹与常见选型。相关：[数据持久化](data-Persistence.md) · [网络基础](net-notes.md)

## 概览

Unity 有多个**命名特殊的文件夹**，它们有特定的行为和用途。按重要性排序：

| 文件夹 | 运行时存在 | 编辑器专用 | 主要用途 | 打包后可读 |
|--------|:---------:|:---------:|----------|:---------:|
| Resources | ✅ | — | 动态加载资源 | ✅（在dataPath内） |
| StreamingAssets | ✅ | — | 原始大文件 | ✅ |
| Editor | ❌ | ✅ | 编辑器扩展脚本 | ❌ |
| Plugins | ✅ | — | 原生插件(.dll/.so) | ✅ |
| Editor Default Resources | ❌ | ✅ | 编辑器资源 | ❌ |
| Gizmos | — | ✅ | Scene视图图标 | ❌ |
| StreamingAssets | ✅ | — | 流式资源 | ✅ |
| LocalizedStrings | — | ✅ | 本地化字符串 | — |

---

## 一、Application 路径 API（运行时路径）

### Application.dataPath（只读）

**含义**：指向游戏安装目录的数据文件夹。

- **编辑器模式**：指向 `Assets/` 目录
- **打包后**：指向 `_Data/` 文件夹（Windows）或 `.app/Contents/`（Mac）
- **权限**：只读
- **用途**：访问项目内嵌的初始资源

```
Windows: C:/MyGame/MyGame_Data
Mac:     /Applications/MyGame.app/Contents
Android: APK包内部（需要UnityWebRequest读取）
iOS:     应用沙盒只读区
```

> 找"游戏安装包"里的东西用它，但不能修改。

---

### Application.persistentDataPath（可读写）★最重要

**含义**：操作系统为应用分配的持久化数据存储目录。

- **权限**：可读可写 → 唯一能放心写入的地方
- **用途**：
  - 游戏存档（PlayerPrefs 底层也用这个）
  - 配置文件（图形设置、音效设置）
  - 从服务器下载的资源
  - 日志文件

```
Windows:   C:\Users\[用户名]\AppData\LocalLow\[公司名]\[产品名]
Android:   /storage/emulated/0/Android/data/[包名]/files
iOS:       沙盒 Documents 目录（会被iCloud备份）
Mac:       ~/Library/Application Support/[公司名]/[产品名]
```

> 存"玩家生成的数据"和"需要保留的设置"就用它，这是你的存档柜。

---

### Application.streamingAssetsPath（通常只读）

**含义**：构建时原封不动从 `StreamingAssets/` 复制到程序包中。

- **权限**：通常只读
- **用途**：存放不需要常规管线处理的大文件
  - 视频文件 (.mp4, .webm)
  - 原始音频 (.wav)
  - 大型配置文件 (.xml, .json, .bin)
  - AssetBundle 初始包

- **平台差异** ⚠️：
  - **Windows/Mac/Linux**：普通文件系统路径，直接 `File.ReadAllText()` 即可
  - **Android/WebGL**：不是标准文件系统路径！必须用 `UnityWebRequest` 异步读取

```csharp
// Windows/Mac —— 直接读
string json = File.ReadAllText(
    Path.Combine(Application.streamingAssetsPath, "config.json"));

// Android/WebGL —— 必须异步
using (UnityWebRequest req = UnityWebRequest.Get(
    Path.Combine(Application.streamingAssetsPath, "video.mp4")))
{
    yield return req.SendWebRequest();
    byte[] data = req.downloadHandler.data;
}
```

> 放"只读的大文件"就用它，Android平台需特殊处理。

---

### Application.temporaryCachePath（临时缓存）

**含义**：临时文件存储目录，系统可在空间不足时清理。

- **权限**：可读可写
- **用途**：临时下载的图片、缓存数据、中间计算结果
- **注意**：不要放重要数据，可能被清理

```
Windows: C:\Users\[用户名]\AppData\Local\Temp\[公司名]\[产品名]
Android: /storage/emulated/0/Android/data/[包名]/cache
iOS:     沙盒 tmp 目录
```

---

### 其他路径 API

| API | 说明 | 典型值(编辑器) |
|-----|------|---------------|
| `Application.consoleLogPath` | 日志文件路径 | 项目/Library/Player.log |
| `Application.streamingAssetsPath` | 同上 | 项目/StreamingAssets |

---

## 二、特殊文件夹详解

### 📁 Resources（动态加载）

**特点**：
- 内容会被打包进游戏中
- 运行时通过 `Resources.Load<T>()` 加载
- 支持**子文件夹**（最多一级深度建议）

```csharp
// 加载 Prefab
GameObject prefab = Resources.Load<GameObject>("Prefabs/Enemy");
Instantiate(prefab);

// 加载所有同类型资源
TextAsset[] allConfigs = Resources.LoadAll<TextAsset>("Configs");

// 异步加载
ResourceRequest req = Resources.LoadAsync<Texture>("Backgrounds/Level1");
yield return req;
Texture tex = req.asset as Texture;
```

**⚠️ 注意事项**：
1. **增加包体大小**—— Resources 里所有东西都会打进包，即使没用
2. **加载速度慢**—— 包体越大越慢
3. **官方不推荐大量使用**—— 建议 AssetBundle 或 Addressables 替代
4. **不能在 Resources 内再套 Resources**

**适用场景**：
- 少量配置文件
- 首屏必需的资源（如 Logo）
- 快速原型开发阶段

---

### 📁 Editor（编辑器脚本）

**特点**：
- 此文件夹内的脚本**不会被打包进游戏**
- 只在 Unity 编辑器内生效
- 可以嵌套：任何层级叫 `Editor` 都行

```csharp
// Assets/Editor/MyWindow.cs
using UnityEditor;
using UnityEngine;

public class MyWindow : EditorWindow
{
    [MenuItem("Tools/My Custom Window")]
    public static void ShowWindow()
    {
        GetWindow<MyWindow>("我的工具");
    }

    void OnGUI()
    {
        GUILayout.Label("这是一个自定义编辑器窗口");
        if (GUILayout.Button("点击"))
            Debug.Log("Hello!");
    }
}
```

**常用功能**：
- 自定义编辑器窗口 (`EditorWindow`)
- 自定义 Inspector 绘制 (`[CustomEditor]`)
- 菜单项 (`[MenuItem]`)
- 构建后处理 (`IPostprocessBuild`)
- Asset 导入处理器 (`AssetPostprocessor`)

**子文件夹变体**：
- `Editor Default Resources` —— 存放编辑器脚本用的资源（图标等），用 `EditorGUIUtility.Load()` 加载

---

### 📁 Plugins（原生插件）

**特点**：
- 放置第三方 SDK / 原生库
- 支持按平台分子目录：

```
Plugins/
├── Android/          # .jar, .aar
├── iOS/              # .framework, .a, .m
├── Win/              # .dll, .lib
├── Win64/
├── Mac/
├── x86_64/
└── (根目录)           # 所有平台通用
```

**常见内容**：
- 第三方 SDK（声网SDK、友盟、Bugly等）
- C/C++ 编译的原生库（.so / .dll / .dylib）
- C# DLL（纯C#库也常放这里）

**加载顺序**：`Plugins/` 下的脚本比普通 `Assets/` **先编译**

---

### 📁 Gizmos（Scene 视图辅助绘制）

**特点**：
- 存放 `Gizmo` 图标（.png/.gif）
- 在 Scene 视图中用 `DrawGizmo` 绘制可视化调试信息

```csharp
// 在任意 MonoBehaviour 中
void OnDrawGizmos()
{
    Gizmos.color = Color.red;
    Gizmos.DrawWireSphere(transform.position, attackRange);
}

// 如果有自定义图标，放在 Gizmos/ 下，同名即可自动关联
```

---

### 📁 StreamingAssets（流式资源）

> 见上方 Application.streamingAssetsPath 部分

---

### 📁 Standard Assets / Packages

- `Standard Assets/` —— Unity 标准资源（旧版导入方式）
- 现代项目使用 **Package Manager** 管理（`Packages/manifest.json`）

---

## 三、路径选择决策树

```
需要存放什么？
│
├─ 编辑器扩展代码？
│   └→ Editor/
│
├─ 原生 SDK / 第三方库？
│   └→ Plugins/ （或对应平台子目录）
│
├─ 需要运行时动态加载的资源？
│   ├─ 少量且简单？
│   │   └→ Resources/ （注意包体）
│   └─ 大量或需要热更新？
│       └→ Addressables / AssetBundle（推荐）
│
├─ 只读的大文件（视频/配置）？
│   └→ StreamingAssets/
│
├─ 需要保存的玩家数据？
│   └→ Application.persistentDataPath（代码中用，非物理文件夹）
│
└─ 临时缓存？
    └→ Application.temporaryCachePath
```

---

## 四、面试高频问题

**Q: Resources.Load 为什么不建议用？**
A: ① 增加包体大小（所有内容都打包）② 加载时扫描整个 Resources 文件夹③ 无法做增量更新④ 无法做分包加载。推荐用 Addressables 替代。

**Q: StreamingAssets 在 Android 上为什么不能直接 File.ReadAllText？**
A: 因为 Android 打包后 StreamingAssets 在 APK 内部，不是真实文件系统路径。必须通过 UnityWebRequest 访问。

**Q: Editor 文件夹里的脚本会打包到游戏中吗？**
A: 不会。Editor 文件夹下的脚本只在编辑器环境下编译和运行，不会包含在最终 build 中。

**Q: 如何区分 dataPath 和 persistentDataPath？**
A: dataPath 是安装目录（只读），persistentDataPath 是用户数据目录（可读写）。类比：dataPath 是光盘/ROM，persistentDataPath 是硬盘/存档卡。

---

🔙 [回到上一级（知识库索引）](index.md)  
🏠 [返回首页](../index.md)
