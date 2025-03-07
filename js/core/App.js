import { StorageManager } from '../managers/StorageManager.js';
import { UIManager } from '../managers/UIManager.js';
import { ExportManager } from '../managers/ExportManager.js';
import { RendererFactory } from './RendererFactory.js';
import { NoteRenderer } from '../renderers/NoteRenderer.js';
import { MarkedNoteRenderer } from '../renderers/MarkedNoteRenderer.js';
import { PoetryRenderer } from '../renderers/PoetryRenderer.js';
import { RichNoteRenderer } from '../renderers/RichNoteRenderer.js';

export class App {
    constructor() {
        this.ui = UIManager.init();
        this.currentStyle = StorageManager.get(StorageManager.keys.STYLE) || 'note';
        this.currentTheme = StorageManager.get(StorageManager.keys.THEME) || 'elegant';
        
        // 注册渲染器
        RendererFactory.register('note', new NoteRenderer(this.ui.elements.textPreview));
        RendererFactory.register('marked-note', new MarkedNoteRenderer(this.ui.elements.textPreview));
        RendererFactory.register('rich-note', new RichNoteRenderer(this.ui.elements.textPreview));
        RendererFactory.register('poetry', new PoetryRenderer(this.ui.elements.textPreview));
        
        this.initializeState();
        this.bindEvents();
        this.initRichTextEditor();
    }
    
    initRichTextEditor() {
        tinymce.init({
            selector: '#richTextArea',
            language: 'zh_CN',
            language_url: 'https://cdn.tiny.cloud/1/jqt84z5ffzl048t0shtk8n1oz5uqx8lwmetkmtlh8mm0fks4/tinymce/6/langs/zh_CN.js',
            plugins: 'lists link image table code help wordcount',
            toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | indent outdent | bullist numlist | code | table',
            height: 400,
            content_css: false,
            content_style: `
                body { 
                    font-family: "Microsoft YaHei", sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                    margin: 20px;
                }
                p { margin: 0 0 1em; }
                table { border-collapse: collapse; }
                table td, table th { border: 1px solid #ccc; padding: 5px; }
            `,
            skin: 'oxide',
            content_css_cors: true,
            setup: (editor) => {
                editor.on('Change', () => {
                    StorageManager.set(StorageManager.keys.RICH_TEXT, editor.getContent());
                    this.updatePreview();
                });
            }
        });
    }
    
    initializeState() {
        // 恢复保存的数据
        const savedText = StorageManager.get(StorageManager.keys.TEXT) || '';
        const savedRichText = StorageManager.get(StorageManager.keys.RICH_TEXT) || '';
        const savedWidth = StorageManager.get(StorageManager.keys.PREVIEW_WIDTH) || '515';
        
        this.ui.elements.textInput.value = savedText;
        if (this.ui.elements.insightInput) {
            this.ui.elements.insightInput.value = StorageManager.get(StorageManager.keys.INSIGHT) || '';
        }
        
        // 恢复预览区域宽度
        if (this.ui.elements.previewWidth && this.ui.elements.previewArea) {
            this.ui.elements.previewWidth.value = savedWidth;
            this.ui.elements.previewArea.style.width = `${savedWidth}px`;
        }
        
        // 恢复样式选择
        this.ui.updateStyleButtons(this.currentStyle);
        this.ui.toggleInsightInput(this.currentStyle === 'poetry');
        this.ui.toggleEditors(this.currentStyle);
        
        // 恢复主题选择
        this.ui.updateThemeOptions(this.currentTheme);
        this.ui.updatePreviewTheme(this.currentTheme);
        
        // 如果是富文本模式，等待编辑器初始化后设置内容
        if (this.currentStyle === 'rich-note') {
            const checkEditor = setInterval(() => {
                const editor = tinymce.get('richTextArea');
                if (editor) {
                    editor.setContent(savedRichText);
                    clearInterval(checkEditor);
                }
            }, 100);
        }
        
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
        
        // 宽度调整
        if (this.ui.elements.previewWidth) {
            this.ui.elements.previewWidth.addEventListener('input', (e) => {
                const width = parseInt(e.target.value);
                if (width >= 300 && width <= 1000) {
                    this.ui.elements.previewArea.style.width = `${width}px`;
                    StorageManager.set(StorageManager.keys.PREVIEW_WIDTH, width);
                }
            });
        }
        
        // 导出功能
        this.ui.elements.exportBtn.addEventListener('click', () => this.handleExport());
    }
    
    handleStyleChange(newStyle) {
        this.currentStyle = newStyle;
        StorageManager.set(StorageManager.keys.STYLE, newStyle);
        
        this.ui.updateStyleButtons(newStyle);
        this.ui.toggleInsightInput(newStyle === 'poetry');
        this.ui.toggleEditors(newStyle);
        
        // 在样式切换时，使用对应的存储内容
        if (newStyle === 'rich-note') {
            const editor = tinymce.get('richTextArea');
            if (editor) {
                const savedRichText = StorageManager.get(StorageManager.keys.RICH_TEXT) || '';
                editor.setContent(savedRichText);
            }
        } else {
            const editor = tinymce.get('richTextArea');
            if (editor) {
                // 不再需要将富文本内容同步到普通文本框
                this.ui.elements.textInput.value = StorageManager.get(StorageManager.keys.TEXT) || '';
            }
        }
        
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
        let content;
        if (this.currentStyle === 'rich-note') {
            const editor = tinymce.get('richTextArea');
            content = editor ? editor.getContent() : StorageManager.get(StorageManager.keys.RICH_TEXT) || '';
        } else {
            const text = this.ui.elements.textInput.value;
            content = text.split('\n').filter(p => p.trim());
        }
        
        const renderer = RendererFactory.getRenderer(this.currentStyle);
        
        if (this.currentStyle === 'poetry') {
            const insight = this.ui.elements.insightInput?.value || '';
            renderer.render(content, insight);
        } else {
            renderer.render(content);
        }
    }
} 