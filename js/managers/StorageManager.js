export const StorageManager = {
    keys: {
        TEXT: 'text',
        STYLE: 'style',
        INSIGHT: 'insight',
        THEME: 'theme'
    },
    
    get(key) {
        return localStorage.getItem(key);
    },
    
    set(key, value) {
        localStorage.setItem(key, value);
    }
}; 