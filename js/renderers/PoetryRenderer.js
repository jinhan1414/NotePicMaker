import { BaseRenderer } from '../core/BaseRenderer.js';

export class PoetryRenderer extends BaseRenderer {
    render(paragraphs, insightText) {
        this.container.innerHTML = '';
        this.container.classList.add('poetry');
        this.container.appendChild(this.createHeader());

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'poetry-content';
        
        if (paragraphs.length > 0) {
            this.renderTitle(contentWrapper, paragraphs[0]);
            
            if (paragraphs.length > 1) {
                this.renderAuthor(contentWrapper, paragraphs[1]);
                this.renderVerses(contentWrapper, paragraphs.slice(2));
                this.renderInsight(contentWrapper, insightText);
            }
        }
        
        this.container.appendChild(contentWrapper);
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