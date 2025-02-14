import { StorageManager } from '../managers/StorageManager.js';
import { UIManager } from '../managers/UIManager.js';
import { ExportManager } from '../managers/ExportManager.js';
import { RendererFactory } from './RendererFactory.js';
import { NoteRenderer } from '../renderers/NoteRenderer.js';
import { PoetryRenderer } from '../renderers/PoetryRenderer.js';

export class App {
    constructor() {
        this.ui = UIManager.init();
        this.currentStyle = StorageManager.get(StorageManager.keys.STYLE) || 'note';
        
        // 注册渲染器
        RendererFactory.register('note', new NoteRenderer(this.ui.elements.textPreview));
        RendererFactory.register('poetry', new PoetryRenderer(this.ui.elements.textPreview));
        
        this.initializeState();
        this.bindEvents();
    }
    
    initializeState() {
        // 恢复保存的数据
        this.ui.elements.textInput.value = StorageManager.get(StorageManager.keys.TEXT) || '';
        if (this.ui.elements.insightInput) {
            this.ui.elements.insightInput.value = StorageManager.get(StorageManager.keys.INSIGHT) || '';
        }
        
        // 恢复样式选择
        this.ui.updateStyleButtons(this.currentStyle);
        this.ui.toggleInsightInput(this.currentStyle === 'poetry');
        
        this.updatePreview();
    }
    
    bindEvents() {
        // 样式切换
        this.ui.elements.styleButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleStyleChange(btn.dataset.style));
        });
        
        // 文本输入
        this.ui.elements.textInput.addEventListener('input', () => this.handleTextInput());
        if (this.ui.elements.insightInput) {
            this.ui.elements.insightInput.addEventListener('input', () => this.handleInsightInput());
        }
        
        // 导出功能
        this.ui.elements.exportBtn.addEventListener('click', () => this.handleExport());
    }
    
    handleStyleChange(newStyle) {
        this.currentStyle = newStyle;
        StorageManager.set(StorageManager.keys.STYLE, newStyle);
        
        this.ui.updateStyleButtons(newStyle);
        this.ui.toggleInsightInput(newStyle === 'poetry');
        
        this.updatePreview();
    }
    
    handleTextInput() {
        StorageManager.set(StorageManager.keys.TEXT, this.ui.elements.textInput.value);
        this.updatePreview();
    }
    
    handleInsightInput() {
        StorageManager.set(StorageManager.keys.INSIGHT, this.ui.elements.insightInput.value);
        this.updatePreview();
    }
    
    async handleExport() {
        const exportBtn = this.ui.elements.exportBtn;
        exportBtn.textContent = '导出中...';
        exportBtn.disabled = true;
        
        const success = await ExportManager.exportToImage(this.ui.elements.textPreview);
        if (!success) {
            alert('导出图片失败，请重试');
        }
        
        exportBtn.textContent = '导出图片';
        exportBtn.disabled = false;
    }
    
    updatePreview() {
        const text = this.ui.elements.textInput.value;
        const paragraphs = text.split('\n').filter(p => p.trim());
        const renderer = RendererFactory.getRenderer(this.currentStyle);
        
        if (this.currentStyle === 'poetry') {
            const insight = this.ui.elements.insightInput?.value || '';
            renderer.render(paragraphs, insight);
        } else {
            renderer.render(paragraphs);
        }
    }
} 