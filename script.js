document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const textPreview = document.getElementById('textPreview');
    const exportBtn = document.getElementById('exportBtn');

    // 实时预览功能
    textInput.addEventListener('input', updatePreview);

    // 导出图片功能
    exportBtn.addEventListener('click', async () => {
        const previewArea = document.getElementById('textPreview');
        
        try {
            // 添加加载状态
            exportBtn.textContent = '导出中...';
            exportBtn.disabled = true;
            
            // 使用html2canvas将预览区域转换为canvas
            const canvas = await html2canvas(previewArea, {
                backgroundColor: '#f4f1e8',
                scale: 2, // 提高导出图片质量
                useCORS: true // 允许加载跨域图片
            });

            // 将canvas转换为图片并下载
            const link = document.createElement('a');
            link.download = '阅读笔记.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('导出图片失败:', error);
            alert('导出图片失败，请重试');
        } finally {
            // 恢复按钮状态
            exportBtn.textContent = '导出图片';
            exportBtn.disabled = false;
        }
    });

    function createHeader() {
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

    function updatePreview() {
        const text = textInput.value;
        const paragraphs = text.split('\n').filter(p => p.trim());
        
        // 清空预览区域并添加页眉
        textPreview.innerHTML = '';
        textPreview.appendChild(createHeader());

        // 只有在有输入内容时才添加标题和段落
        if (text.trim()) {
            // 第一行作为标题
            if (paragraphs.length > 0) {
                const title = document.createElement('div');
                title.className = 'content-title';
                title.textContent = paragraphs[0];
                textPreview.appendChild(title);

                // 剩余行作为编号段落
                paragraphs.slice(1).forEach((paragraph, index) => {
                    if (paragraph.trim()) {
                        const p = document.createElement('div');
                        p.className = 'paragraph';
                        
                        // 添加编号
                        const number = document.createElement('span');
                        number.className = 'paragraph-number';
                        number.textContent = `${index + 1}.`;
                        
                        const content = document.createElement('span');
                        content.textContent = paragraph;
                        
                        p.appendChild(number);
                        p.appendChild(content);
                        textPreview.appendChild(p);
                    }
                });
            }
        }
    }

    // 初始化预览
    updatePreview();
}); 