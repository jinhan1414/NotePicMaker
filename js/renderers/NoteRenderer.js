import { BaseRenderer } from '../core/BaseRenderer.js';

export class NoteRenderer extends BaseRenderer {
    render(paragraphs) {
        this.lastParagraphs = paragraphs;
        this.container.innerHTML = '';
        this.container.classList.remove('poetry');
        this.container.appendChild(this.createHeader());

        if (paragraphs.length > 0) {
            const title = document.createElement('div');
            title.className = 'content-title';
            title.textContent = paragraphs[0];
            this.container.appendChild(title);

            paragraphs.slice(1).forEach((paragraph, index) => {
                if (paragraph.trim()) {
                    const p = document.createElement('div');
                    p.className = 'paragraph';
                    
                    const number = document.createElement('span');
                    number.className = 'paragraph-number';
                    number.textContent = `${index + 1}.`;
                    
                    const content = document.createElement('span');
                    content.textContent = paragraph;
                    
                    p.appendChild(number);
                    p.appendChild(content);
                    this.container.appendChild(p);
                }
            });

            // 添加引导关注区域
            if (this.showGuide) {
                this.container.appendChild(this.createGuideFooter());
            }
        }
    }
} 