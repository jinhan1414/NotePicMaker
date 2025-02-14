export const UIManager = {
    elements: {},
    
    init() {
        this.elements = {
            textInput: document.getElementById('textInput'),
            insightInput: document.getElementById('insightInput'),
            poetryInsightWrapper: document.querySelector('.poetry-insight-wrapper'),
            textPreview: document.getElementById('textPreview'),
            exportBtn: document.getElementById('exportBtn'),
            styleButtons: document.querySelectorAll('.style-btn')
        };
        
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
    }
}; 