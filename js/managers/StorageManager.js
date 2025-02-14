export const StorageManager = {
    keys: {
        STYLE: 'currentStyle',
        TEXT: 'textContent',
        INSIGHT: 'insightContent'
    },
    
    get(key) {
        return localStorage.getItem(key);
    },
    
    set(key, value) {
        localStorage.setItem(key, value);
    }
}; 