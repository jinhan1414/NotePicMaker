import { BaseRenderer } from '../core/BaseRenderer.js';

export class MarkedNoteRenderer extends BaseRenderer {
    constructor(container) {
        super(container);
    }

    render(paragraphs) {
        this.lastParagraphs = paragraphs;
        this.container.innerHTML = '';
        this.container.appendChild(this.createHeader());

        if (paragraphs.length > 0) {
            const title = document.createElement('div');
            title.className = 'content-title';
            title.textContent = paragraphs[0];
            this.container.appendChild(title);

            paragraphs.slice(1).forEach(paragraph => {
                const p = document.createElement('div');
                p.className = 'paragraph';
                p.innerHTML = this.parseMarkedText(paragraph);
                this.container.appendChild(p);
            });

            // 使用基类的引导关注区域
            if (this.showGuide) {
                this.container.appendChild(this.createGuideFooter());
            }
        }
    }

    parseMarkedText(text) {
        // 保护空格
        text = text.replace(/\s/g, '&nbsp;');
        
        // 只保留下划线和重点标记
        return text
            // 下划线
            .replace(/<u>(.*?)<\/u>/g, '<span class="marked-underline">$1</span>')
            // 重点
            .replace(/<important>(.*?)<\/important>/g, '<span class="marked-important">$1</span>')
            // 转义 < 和 >
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    }
} 