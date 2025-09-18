# Unity笔记（常用知识点）

## 1. 编辑器操作技巧
- 快速对齐：选中多个物体，按Ctrl+Shift+A（对齐到网格）
- 隐藏物体：按H隐藏选中物体，按Alt+H显示所有隐藏物体
- 场景保存：按Ctrl+S保存当前场景，按Ctrl+Shift+S另存为

## 2. 常用API总结
- 场景切换：SceneManager.LoadScene("场景名")（需引入using UnityEngine.SceneManagement;）
- 实例化物体：Instantiate(预制体, 位置, 旋转)
- 销毁物体：Destroy(物体, 延迟时间)
- 协程：StartCoroutine(协程方法名())，协程方法返回IEnumerator

## 3. 常见坑点
- 物体销毁后仍访问：需先判断物体是否为null，或用TryGetComponent避免空引用
- UI适配：Canvas的Render Mode推荐用Screen Space - Camera，避免不同分辨率下UI错位
- 动画状态机：参数修改后需调用SetTrigger/SetBool，直接改参数值不会触发状态切换

---
🔙 [回到上一级（知识库索引）](index.md)  
🏠 [返回首页../../index.md)
