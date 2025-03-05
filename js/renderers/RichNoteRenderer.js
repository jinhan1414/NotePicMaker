import { BaseRenderer } from '../core/BaseRenderer.js';

export class RichNoteRenderer extends BaseRenderer {
    constructor(container) {
        super(container);
    }

    render(content) {
        this.container.innerHTML = '';
        this.container.classList.add('rich-note');
        
        // 添加统一的header
        this.container.appendChild(this.createHeader());

        // 添加内容
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'content-wrapper';
        contentWrapper.innerHTML = content;
        this.container.appendChild(contentWrapper);

        // 添加引导关注区域
        if (this.showGuide) {
            this.container.appendChild(this.createGuideFooter());
        }
    }
} 