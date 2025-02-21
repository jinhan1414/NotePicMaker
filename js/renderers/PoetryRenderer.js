import { BaseRenderer } from '../core/BaseRenderer.js';

export class PoetryRenderer extends BaseRenderer {
    render(paragraphs, insight = '') {
        this.lastParagraphs = paragraphs;
        this.lastInsight = insight;
        this.container.innerHTML = '';
        this.container.classList.add('poetry');
        this.container.appendChild(this.createHeader());

        if (paragraphs.length > 0) {
            const content = document.createElement('div');
            content.className = 'poetry-content';

            const title = document.createElement('div');
            title.className = 'content-title';
            title.textContent = paragraphs[0];
            content.appendChild(title);

            if (paragraphs.length > 1) {
                const author = document.createElement('div');
                author.className = 'author';
                author.textContent = paragraphs[1];
                content.appendChild(author);

                let currentGroup = null;
                paragraphs.slice(2).forEach(verse => {
                    if (!verse.trim()) {
                        if (currentGroup) {
                            content.appendChild(currentGroup);
                            currentGroup = null;
                        }
                        return;
                    }

                    if (!currentGroup) {
                        currentGroup = document.createElement('div');
                        currentGroup.className = 'verse-group';
                    }

                    const p = document.createElement('div');
                    p.className = 'verse';
                    p.textContent = verse;
                    currentGroup.appendChild(p);
                });

                if (currentGroup) {
                    content.appendChild(currentGroup);
                }
            }

            this.container.appendChild(content);

            if (insight) {
                const insightDiv = document.createElement('div');
                insightDiv.className = 'insight';
                const insightContent = document.createElement('div');
                insightContent.className = 'insight-content';
                insightContent.textContent = insight;
                insightDiv.appendChild(insightContent);
                this.container.appendChild(insightDiv);
            }

            // 添加引导关注区域
            if (this.showGuide) {
                this.container.appendChild(this.createGuideFooter());
            }
        }
    }

    renderTitle(container, title) {
        const titleElement = document.createElement('div');
        titleElement.className = 'content-title';
        titleElement.textContent = title;
        container.appendChild(titleElement);
    }

    renderAuthor(container, author) {
        const authorElement = document.createElement('div');
        authorElement.className = 'author';
        authorElement.textContent = author.startsWith('【') ? author : `【${author}】`;
        container.appendChild(authorElement);
    }

    renderVerses(container, verses) {
        let currentGroup = [];
        
        verses.forEach(verse => {
            if (verse.startsWith('注：')) {
                this.renderVerseGroup(container, currentGroup);
                currentGroup = [];
                
                const note = document.createElement('div');
                note.className = 'note';
                note.textContent = verse;
                container.appendChild(note);
            } else if (verse.trim()) {
                currentGroup.push(verse);
                
                if (currentGroup.length === 2) {
                    this.renderVerseGroup(container, currentGroup);
                    currentGroup = [];
                }
            }
        });
        
        if (currentGroup.length > 0) {
            this.renderVerseGroup(container, currentGroup);
        }
    }

    renderVerseGroup(container, verses) {
        if (verses.length === 0) return;
        
        const groupDiv = document.createElement('div');
        groupDiv.className = 'verse-group';
        verses.forEach(verse => {
            const p = document.createElement('div');
            p.className = 'verse';
            p.textContent = verse;
            groupDiv.appendChild(p);
        });
        container.appendChild(groupDiv);
    }

    renderInsight(container, insightText) {
        if (!insightText?.trim()) return;
        
        const insightDiv = document.createElement('div');
        insightDiv.className = 'insight';
        const insightContent = document.createElement('div');
        insightContent.className = 'insight-content';
        insightContent.textContent = insightText;
        insightDiv.appendChild(insightContent);
        container.appendChild(insightDiv);
    }
} 