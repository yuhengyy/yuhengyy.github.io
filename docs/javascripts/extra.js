// 测试功能 - 如果这个生效，说明extra.js在工作
/*
document.addEventListener('DOMContentLoaded', function() {
    console.log('? EXTRA.JS 正在工作！');
    alert('extra.js 加载成功！'); // 页面加载时弹出提示
});
*/

// 夸张的点击效果
document.addEventListener('DOMContentLoaded', function() {
    console.log('? 超级测试JS加载成功！');
    
    const cards = document.querySelectorAll('.grid.cards .card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 夸张的效果
            this.style.transform = 'scale(0.8) rotate(-10deg)';
            this.style.background = 'linear-gradient(45deg, #ff0000, #00ff00)';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.background = '';
                this.style.color = '';
            }, 300);
        });
    });
});