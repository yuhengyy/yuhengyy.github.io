// 自定义JavaScript文件 
// 自定义JavaScript - yuhengyyKnowledge

document.addEventListener('DOMContentLoaded', function() {
    console.log('yuhengyyKnowledge 自定义JS加载成功！');
    
    // 为所有卡片添加点击动画
    const cards = document.querySelectorAll('.grid.cards .card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 防止重复点击
            if (this.classList.contains('clicking')) return;
            
            this.classList.add('clicking');
            this.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                this.classList.remove('clicking');
                this.style.transform = '';
            }, 300);
        });
    });
    
    // 更新最后修改时间（示例）
    function updateLastModified() {
        const lastModifiedEl = document.querySelector('#last-modified');
        if (lastModifiedEl) {
            lastModifiedEl.textContent = new Date().toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
    
    // 简单的访问计数器（本地存储）
    function updateVisitCount() {
        const countEl = document.getElementById('visit-count');
        if (countEl) {
            let count = localStorage.getItem('siteVisitCount') || 0;
            count = parseInt(count) + 1;
            localStorage.setItem('siteVisitCount', count);
            countEl.textContent = count.toLocaleString() + '次访问';
        }
    }
    
    // 执行函数
    updateLastModified();
    updateVisitCount();
});

// 实用工具函数
const KnowledgeUtils = {
    // 复制代码块文本
    copyCode: function(button) {
        const codeBlock = button.parentElement.querySelector('code');
        navigator.clipboard.writeText(codeBlock.textContent).then(() => {
            const originalText = button.textContent;
            button.textContent = '已复制!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    },
    
    // 切换暗色/亮色模式
    toggleTheme: function() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-md-color-scheme');
        const newTheme = currentTheme === 'default' ? 'slate' : 'default';
        html.setAttribute('data-md-color-scheme', newTheme);
        localStorage.setItem('preferredTheme', newTheme);
    }
};