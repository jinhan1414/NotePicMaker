export class UIManager {
    static init() {
        const instance = new UIManager();
        instance.elements = {
            textInput: document.getElementById('textInput'),
            textPreview: document.getElementById('textPreview'),
            insightInput: document.getElementById('insightInput'),
            exportBtn: document.getElementById('exportBtn'),
            styleButtons: document.querySelectorAll('.style-btn'),
            richTextEditor: document.getElementById('richTextEditor'),
            previewArea: document.getElementById('previewArea'),
            previewWidth: document.getElementById('previewWidth'),
            poetryInsightWrapper: document.querySelector('.poetry-insight-wrapper'),
            themeOptions: document.querySelectorAll('.theme-option'),
            themeInputs: document.querySelectorAll('input[name="theme"]'),
            markedNoteTools: document.querySelector('.marked-note-tools'),
            helpBtn: document.querySelector('.help-btn'),
            markedNoteGuide: document.getElementById('markedNoteGuide'),
            closeGuideBtn: document.querySelector('.close-guide')
        };
        
        // 添加主题切换事件
        instance.elements.themeInputs.forEach(input => {
            input.addEventListener('change', () => {
                const newTheme = input.value;
                instance.updateThemeOptions(newTheme);
                instance.updatePreviewTheme(newTheme);
            });
        });

        // 添加标记说明弹窗事件
        if (instance.elements.helpBtn && instance.elements.markedNoteGuide) {
            instance.elements.helpBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                instance.elements.markedNoteGuide.style.display = 'block';
            });

            instance.elements.closeGuideBtn.addEventListener('click', () => {
                instance.elements.markedNoteGuide.style.display = 'none';
            });

            // 点击弹窗外部关闭
            document.addEventListener('click', (e) => {
                if (e.target === instance.elements.markedNoteGuide) {
                    instance.elements.markedNoteGuide.style.display = 'none';
                }
            });
        }
        
        return instance;
    }

    updateStyleButtons(activeStyle) {
        this.elements.styleButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.style === activeStyle);
        });
        
        // 显示/隐藏标记笔记工具栏
        if (this.elements.markedNoteTools) {
            // 先移除之前的类
            this.elements.markedNoteTools.classList.remove('visible');
            
            // 如果是标记笔记模式，添加visible类
            if (activeStyle === 'marked-note') {
                // 使用 requestAnimationFrame 确保 DOM 更新
                requestAnimationFrame(() => {
                    this.elements.markedNoteTools.classList.add('visible');
                });
            }
        }
    }

    toggleInsightInput(show) {
        const wrapper = document.querySelector('.poetry-insight-wrapper');
        if (wrapper) {
            wrapper.style.display = show ? 'block' : 'none';
        }
    }

    toggleEditors(style) {
        // 切换普通文本输入和富文本编辑器的显示
        this.elements.textInput.style.display = style === 'rich-note' ? 'none' : 'block';
        this.elements.richTextEditor.style.display = style === 'rich-note' ? 'block' : 'none';
    }

    updateThemeOptions(activeTheme) {
        this.elements.themeOptions.forEach(option => {
            const input = option.querySelector('input');
            if (input.value === activeTheme) {
                option.classList.add('active');
                input.checked = true;
            } else {
                option.classList.remove('active');
                input.checked = false;
            }
        });
    }

    updatePreviewTheme(theme) {
        this.elements.textPreview.dataset.theme = theme;
    }
} 