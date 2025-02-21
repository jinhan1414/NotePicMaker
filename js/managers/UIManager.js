export const UIManager = {
    elements: {},
    
    init() {
        this.elements = {
            textInput: document.getElementById('textInput'),
            insightInput: document.getElementById('insightInput'),
            poetryInsightWrapper: document.querySelector('.poetry-insight-wrapper'),
            textPreview: document.getElementById('textPreview'),
            exportBtn: document.getElementById('exportBtn'),
            styleButtons: document.querySelectorAll('.style-btn'),
            themeOptions: document.querySelectorAll('.theme-option'),
            themeInputs: document.querySelectorAll('input[name="theme"]'),
            markedNoteTools: document.querySelector('.marked-note-tools'),
            helpBtn: document.querySelector('.help-btn'),
            markedNoteGuide: document.getElementById('markedNoteGuide'),
            closeGuideBtn: document.querySelector('.close-guide')
        };
        
        // 添加主题切换事件
        this.elements.themeInputs.forEach(input => {
            input.addEventListener('change', () => {
                const newTheme = input.value;
                this.updateThemeOptions(newTheme);
                this.updatePreviewTheme(newTheme);
            });
        });

        // 添加标记说明弹窗事件
        if (this.elements.helpBtn && this.elements.markedNoteGuide) {
            this.elements.helpBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.elements.markedNoteGuide.style.display = 'block';
            });

            this.elements.closeGuideBtn.addEventListener('click', () => {
                this.elements.markedNoteGuide.style.display = 'none';
            });

            // 点击弹窗外部关闭
            document.addEventListener('click', (e) => {
                if (e.target === this.elements.markedNoteGuide) {
                    this.elements.markedNoteGuide.style.display = 'none';
                }
            });
        }
        
        return this;
    },
    
    toggleInsightInput(show) {
        if (this.elements.poetryInsightWrapper) {
            this.elements.poetryInsightWrapper.style.display = show ? 'block' : 'none';
        }
    },
    
    updateStyleButtons(currentStyle) {
        this.elements.styleButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.style === currentStyle);
        });
        
        // 显示/隐藏标记笔记工具栏
        if (this.elements.markedNoteTools) {
            // 先移除之前的类
            this.elements.markedNoteTools.classList.remove('visible');
            
            // 如果是标记笔记模式，添加visible类
            if (currentStyle === 'marked-note') {
                // 使用 requestAnimationFrame 确保 DOM 更新
                requestAnimationFrame(() => {
                    this.elements.markedNoteTools.classList.add('visible');
                });
            }
        }
    },
    
    updateThemeOptions(currentTheme) {
        this.elements.themeOptions.forEach(option => {
            const input = option.querySelector('input[type="radio"]');
            const isActive = input.value === currentTheme;
            option.classList.toggle('active', isActive);
        });
    },
    
    updatePreviewTheme(theme) {
        if (this.elements.textPreview) {
            this.elements.textPreview.dataset.theme = theme;
        }
    }
}; 