## 🧪 功能测试区

<!-- 测试访问统计 -->
访问次数：<span id="visit-count">0</span>

<!-- 测试时间显示 -->
最后更新：<span id="last-modified">未知</span>

# 🎯 超级明显的功能测试页面

这个页面的每个效果都设计得特别明显，确保你能清楚看到所有功能！

---

## 🎪 1. 卡片点击动画测试 - 超级明显版

点击下面的卡片，会有非常夸张的动画效果：

<div class="grid cards" markdown>

-   [__🔥 点击我！超大动画！__ →](#)
    *点击看我会疯狂跳动！*
    {: .card-content}

-   [__🌈 颜色变幻卡片__ →](#)  
    *点击我会变色和旋转！*
    {: .card-content}

-   [__🎵 跳动音符卡片__ →](#)
    *点击我会有弹跳效果！*
    {: .card-content}

</div>

---

## 🎨 2. 自定义样式测试

如果 `extra.css` 正常工作，下面的文字会有特殊样式：

<p class="super-obvious-test">
这是一个超级明显的测试文字！如果extra.css工作，我会变成红色大字并有黄色背景！
</p>

---

## 📊 3. 访问计数器 - 超大显示

**访问次数统计：**  
<span id="visit-count" style="font-size: 2em; color: red; font-weight: bold;">加载中...</span>

---

## ⏰ 4. 最后修改时间 - 明显显示

**🕒 页面最后更新时间：**  
<span id="last-modified" style="font-size: 1.5em; color: blue; background: yellow; padding: 10px; border-radius: 5px;">加载中...</span>

---

## 🌙 5. 主题切换测试

<button onclick="testSuperObviousTheme()" style="font-size: 1.2em; padding: 15px 30px; background: linear-gradient(45deg, red, orange); color: white; border: none; border-radius: 10px; cursor: pointer; margin: 20px 0;">
🎨 点击我！切换主题（超明显）
</button>

<script>
function testSuperObviousTheme() {
    // 先来个夸张的效果
    document.body.style.transform = 'scale(1.05)';
    document.body.style.transition = 'all 0.5s';
    
    setTimeout(() => {
        document.body.style.transform = '';
        // 切换主题
        KnowledgeUtils.toggleTheme();
        alert('主题已切换！注意页面颜色的变化！');
    }, 500);
}
</script>

---

## 📋 6. 功能状态检查

### 实时状态监控：
- **卡片动画功能**: <span id="card-status" style="color: red;">❌ 未检测</span>
- **访问计数器**: <span id="visit-status" style="color: red;">❌ 未检测</span>  
- **时间显示**: <span id="time-status" style="color: red;">❌ 未检测</span>
- **JS文件加载**: <span id="js-status" style="color: red;">❌ 未检测</span>

---

## 🧪 测试说明

这个页面设计得特别夸张，就是为了让你能：

1. **明显看到卡片点击动画**（如果工作的话）
2. **清楚看到访问次数统计**
3. **明确看到时间显示**
4. **轻松测试主题切换**
5. **实时查看功能状态**

<button onclick="runAllTests()" style="font-size: 1.5em; padding: 20px 40px; background: green; color: white; border: none; border-radius: 15px; cursor: pointer; margin: 30px 0;">
🚀 运行全面测试
</button>

<script>
function runAllTests() {
    // 测试卡片动画
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        document.getElementById('card-status').textContent = '✅ 卡片元素存在';
        document.getElementById('card-status').style.color = 'green';
    }
    
    // 测试访问计数器
    const visitCount = document.getElementById('visit-count');
    if (visitCount.textContent !== '加载中...') {
        document.getElementById('visit-status').textContent = '✅ 访问计数工作';
        document.getElementById('visit-status').style.color = 'green';
    }
    
    // 测试时间显示
    const lastModified = document.getElementById('last-modified');
    if (lastModified.textContent !== '加载中...') {
        document.getElementById('time-status').textContent = '✅ 时间显示工作';
        document.getElementById('time-status').style.color = 'green';
    }
    
    // 测试JS加载
    if (typeof KnowledgeUtils !== 'undefined') {
        document.getElementById('js-status').textContent = '✅ JS文件已加载';
        document.getElementById('js-status').style.color = 'green';
    }
    
    alert('测试完成！查看上面的状态指示器！');
}

// 页面加载时自动检查一些状态
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (typeof KnowledgeUtils !== 'undefined') {
            document.getElementById('js-status').textContent = '✅ JS文件已加载';
            document.getElementById('js-status').style.color = 'green';
        }
    }, 1000);
});
</script>

---

## 📝 预期效果

如果一切正常，你应该能看到：

1. ✅ 点击卡片时有明显的动画效果
2. ✅ 访问次数显示具体数字（不是"加载中..."）
3. ✅ 最后更新时间显示具体时间
4. ✅ 点击按钮可以切换主题
5. ✅ 状态指示器变成绿色✅

如果看不到这些效果，说明相应的功能没有正常工作。

<small>测试页面创建时间: <span id="current-time"></span></small>

<script>
// 显示当前时间
document.getElementById('current-time').textContent = new Date().toLocaleString('zh-CN');
</script>