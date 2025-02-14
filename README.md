# NotePicMaker - 文字转图片工具

一个优雅的文字转图片工具，专注于将读书笔记和古诗词转换为精美的图片。

## 功能特点

- 📝 支持多种文本样式
  - 读书笔记模式
  - 古诗词模式（支持感悟记录）
- 🎨 精心设计的排版样式
- 💾 自动保存编辑内容
- 📸 一键导出高清图片
- 🖼 统一的页眉设计

## 项目结构

```
NotePicMaker/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── lib/               # 第三方库
│   └── html2canvas.min.js
└── js/                # JavaScript模块
    ├── main.js        # 主入口
    ├── core/          # 核心模块
    │   ├── App.js            # 应用主类
    │   ├── BaseRenderer.js   # 基础渲染器
    │   └── RendererFactory.js # 渲染器工厂
    ├── managers/      # 管理器模块
    │   ├── StorageManager.js  # 存储管理
    │   ├── UIManager.js       # UI管理
    │   └── ExportManager.js   # 导出管理
    └── renderers/     # 渲染器模块
        ├── NoteRenderer.js    # 读书笔记渲染器
        └── PoetryRenderer.js  # 古诗词渲染器
```

## 技术特点

- 📦 模块化设计
  - 使用ES6模块系统
  - 清晰的代码组织结构
  - 高内聚低耦合的设计
- 🎯 单一职责原则
  - 每个模块专注于单一功能
  - 便于维护和扩展
- 🏭 工厂模式
  - 统一的渲染器创建
  - 方便添加新的渲染样式
- 💾 本地存储
  - 自动保存用户输入
  - 保存样式选择
- 🎨 样式设计
  - 响应式布局
  - 优雅的视觉效果
  - 细致的排版处理

## 使用方法

1. 选择样式模式
   - 读书笔记：适合记录读书心得
   - 古诗词：适合记录诗词和感悟

2. 输入文本
   - 读书笔记模式：第一行为标题，后续为正文
   - 古诗词模式：第一行为标题，第二行为作者，后续为诗句

3. 添加感悟（古诗词模式）
   - 在感悟输入框中记录对诗词的理解和感悟

4. 导出图片
   - 点击"导出图片"按钮
   - 自动生成高清图片并下载

## 扩展开发

### 添加新的渲染模式

1. 创建新的渲染器类
```javascript
// js/renderers/NewRenderer.js
import { BaseRenderer } from '../core/BaseRenderer.js';

export class NewRenderer extends BaseRenderer {
    render(paragraphs) {
        // 实现渲染逻辑
    }
}
```

2. 注册渲染器
```javascript
// js/core/App.js
import { NewRenderer } from '../renderers/NewRenderer.js';

// 在constructor中注册
RendererFactory.register('newStyle', new NewRenderer(this.ui.elements.textPreview));
```

3. 添加样式按钮
```html
<button class="style-btn" data-style="newStyle">新样式</button>
```

### 自定义样式

在 `styles.css` 中添加新的样式规则：
```css
.text-preview.newStyle {
    /* 添加样式规则 */
}
```

## 开发环境设置

1. 克隆项目
```bash
git clone [项目地址]
```

2. 安装依赖
```bash
# 如果有依赖需要安装
npm install
```

3. 运行项目
```bash
# 使用任意HTTP服务器运行
# 例如：Python的HTTP服务器
python -m http.server 8000
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 注意事项

- 使用模块化JavaScript需要通过HTTP服务器运行项目
- 导出图片时需要等待图片加载完成
- 建议使用现代浏览器以获得最佳体验

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License 