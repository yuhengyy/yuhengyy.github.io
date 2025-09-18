// �Զ���JavaScript�ļ� 
// �Զ���JavaScript - yuhengyyKnowledge

document.addEventListener('DOMContentLoaded', function() {
    console.log('yuhengyyKnowledge �Զ���JS���سɹ���');
    
    // Ϊ���п�Ƭ��ӵ������
    const cards = document.querySelectorAll('.grid.cards .card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // ��ֹ�ظ����
            if (this.classList.contains('clicking')) return;
            
            this.classList.add('clicking');
            this.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                this.classList.remove('clicking');
                this.style.transform = '';
            }, 300);
        });
    });
    
    // ��������޸�ʱ�䣨ʾ����
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
    
    // �򵥵ķ��ʼ����������ش洢��
    function updateVisitCount() {
        const countEl = document.getElementById('visit-count');
        if (countEl) {
            let count = localStorage.getItem('siteVisitCount') || 0;
            count = parseInt(count) + 1;
            localStorage.setItem('siteVisitCount', count);
            countEl.textContent = count.toLocaleString() + '�η���';
        }
    }
    
    // ִ�к���
    updateLastModified();
    updateVisitCount();
});

// ʵ�ù��ߺ���
const KnowledgeUtils = {
    // ���ƴ�����ı�
    copyCode: function(button) {
        const codeBlock = button.parentElement.querySelector('code');
        navigator.clipboard.writeText(codeBlock.textContent).then(() => {
            const originalText = button.textContent;
            button.textContent = '�Ѹ���!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    },
    
    // �л���ɫ/��ɫģʽ
    toggleTheme: function() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-md-color-scheme');
        const newTheme = currentTheme === 'default' ? 'slate' : 'default';
        html.setAttribute('data-md-color-scheme', newTheme);
        localStorage.setItem('preferredTheme', newTheme);
    }
};