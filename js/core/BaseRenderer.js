export class BaseRenderer {
    constructor(container) {
        this.container = container;
    }
    
    createHeader() {
        const header = document.createElement('div');
        header.className = 'header';

        const headerLeft = document.createElement('div');
        headerLeft.className = 'header-left';

        const logoTextContainer = document.createElement('div');
        const logoText = document.createElement('div');
        logoText.className = 'logo-text';
        logoText.textContent = '再读经典';

        const logoSubtitle = document.createElement('div');
        logoSubtitle.className = 'logo-subtitle';
        logoSubtitle.textContent = '-ZAIJUDIANJING-';

        logoTextContainer.appendChild(logoText);
        logoTextContainer.appendChild(logoSubtitle);

        const seal = document.createElement('img');
        seal.className = 'seal';
        seal.src = 'img/icon.png';
        seal.alt = '静心';

        headerLeft.appendChild(logoTextContainer);
        headerLeft.appendChild(seal);

        const headerRight = document.createElement('div');
        headerRight.className = 'header-right';
        headerRight.textContent = '人性 | 现实';

        header.appendChild(headerLeft);
        header.appendChild(headerRight);

        return header;
    }
} 