export const RendererFactory = {
    renderers: {},
    
    register(type, renderer) {
        this.renderers[type] = renderer;
    },
    
    getRenderer(type) {
        return this.renderers[type];
    }
}; 