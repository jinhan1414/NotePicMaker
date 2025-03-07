export const StorageManager = {
    keys: {
        TEXT: 'note_text',
        RICH_TEXT: 'rich_note_text',
        INSIGHT: 'poetry_insight',
        STYLE: 'current_style',
        THEME: 'current_theme',
        PREVIEW_WIDTH: 'preview_width'
    },
    
    get(key) {
        return localStorage.getItem(key);
    },
    
    set(key, value) {
        localStorage.setItem(key, value);
    }
}; 