export const ExportManager = {
    async exportToImage(element) {
        try {
            const canvas = await html2canvas(element, {
                backgroundColor: '#f4f1e8',
                scale: 2,
                useCORS: true
            });
            
            const link = document.createElement('a');
            link.download = '阅读笔记.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            return true;
        } catch (error) {
            console.error('导出图片失败:', error);
            return false;
        }
    }
}; 