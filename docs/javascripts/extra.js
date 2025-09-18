// ���Թ��� - ��������Ч��˵��extra.js�ڹ���
/*
document.addEventListener('DOMContentLoaded', function() {
    console.log('? EXTRA.JS ���ڹ�����');
    alert('extra.js ���سɹ���'); // ҳ�����ʱ������ʾ
});
*/

// ���ŵĵ��Ч��
document.addEventListener('DOMContentLoaded', function() {
    console.log('? ��������JS���سɹ���');
    
    const cards = document.querySelectorAll('.grid.cards .card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // ���ŵ�Ч��
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