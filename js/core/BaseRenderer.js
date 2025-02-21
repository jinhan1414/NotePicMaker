export class BaseRenderer {
    constructor(container) {
        this.container = container;
        this.showGuide = false;
        
        // 监听引导开关变化
        const guideToggle = document.getElementById('showGuide');
        if (guideToggle) {
            guideToggle.addEventListener('change', (e) => {
                this.showGuide = e.target.checked;
                this.render(this.lastParagraphs || []);
            });
        }
    }
    
    createHeader() {
        const header = document.createElement('div');
        header.className = 'header';
        
        const headerLeft = document.createElement('div');
        headerLeft.className = 'header-left';
        
        const logoTextContainer = document.createElement('div');
        const logoText = document.createElement('div');
        logoText.className = 'logo-text';
        logoText.textContent = '再读经典';
        
        const logoSubtitle = document.createElement('div');
        logoSubtitle.className = 'logo-subtitle';
        logoSubtitle.textContent = '-ZAIJUDIANJING-';

        logoTextContainer.appendChild(logoText);
        logoTextContainer.appendChild(logoSubtitle);

        const seal = document.createElement('img');
        seal.className = 'seal';
        seal.src = 'img/icon.png';
        seal.alt = '静心';
        
        headerLeft.appendChild(logoTextContainer);
        headerLeft.appendChild(seal);
        
        const headerRight = document.createElement('div');
        headerRight.className = 'header-right';
        headerRight.textContent = '人性 | 现实';
        
        header.appendChild(headerLeft);
        header.appendChild(headerRight);
        
        return header;
    }

    createGuideFooter() {
        const footer = document.createElement('div');
        footer.className = 'guide-footer';
        
        const text = document.createElement('div');
        text.className = 'guide-text';
        text.textContent = '觉得有帮助的话别忘了点赞关注，分享给更多人~';
        footer.appendChild(text);

        // 使用 requestAnimationFrame 确保过渡动画生效
        requestAnimationFrame(() => {
            footer.classList.add('visible');
        });

        return footer;
    }
} 