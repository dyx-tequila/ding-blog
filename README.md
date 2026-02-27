# 🚀 丁宇轩的个人博客

一个基于 Next.js 14 + Node.js + MySQL 的现代化个人博客系统

## 🎯 项目特性

- ✨ 创意风格设计，独特的视觉体验
- 🌓 支持浅色/深色主题切换
- 📱 完全响应式设计
- 🚀 Next.js 14 App Router + SSR/ISR
- 💾 Node.js + MySQL 数据库
- 🔍 全文搜索功能
- 📊 访问统计与分析
- 💬 完整的评论系统
- 🎨 技能可视化展示
- 📈 ECharts 数据图表

## 🛠️ 技术栈

### 前端
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (动画)
- React Markdown + Remark (Markdown 渲染)
- Prism.js (代码高亮)
- Swiper (轮播图)

### 后端
- Node.js
- Express.js
- TypeScript
- MySQL 8.0
- Prisma ORM
- JWT (身份认证)
- Multer (文件上传)

## 📦 功能模块

### 1. 文章管理
- 文章列表（分页、筛选、排序）
- 文章详情（阅读进度、代码高亮）
- 文章分类与标签
- Markdown 编辑器
- 草稿箱功能

### 2. 项目展示
- 项目卡片展示
- 技术栈标签
- GitHub 链接集成
- 项目截图/演示

### 3. 技能展示
- 技能进度条
- 技术栈分类
- 学习路径可视化

### 4. 互动功能
- 评论系统（支持回复）
- 点赞功能
- 留言板
- 邮件订阅

### 5. 其他功能
- 主题切换（浅色/深色）
- 全文搜索
- 访问统计
- RSS 订阅
- SEO 优化
- 站点地图

## 📁 项目结构

```
blog-project/
├── frontend/              # Next.js 前端
│   ├── app/              # App Router 页面
│   ├── components/       # React 组件
│   ├── lib/              # 工具函数
│   ├── public/           # 静态资源
│   └── styles/           # 样式文件
│
├── backend/              # Node.js 后端
│   ├── src/
│   │   ├── controllers/  # 控制器
│   │   ├── models/       # 数据模型
│   │   ├── routes/       # 路由
│   │   ├── middleware/   # 中间件
│   │   └── utils/        # 工具函数
│   └── prisma/           # Prisma 配置
│
└── docs/                 # 文档
```

## 🚀 快速开始

### 前置要求
- Node.js 18+
- MySQL 8.0+
- npm 或 yarn

### 安装依赖

```bash
# 前端
cd frontend
npm install

# 后端
cd backend
npm install
```

### 环境配置

创建 `.env` 文件：

```env
# 数据库
DATABASE_URL="mysql://user:password@localhost:3306/blog"

# JWT
JWT_SECRET="your-secret-key"

# 服务端口
PORT=3001
```

### 运行项目

```bash
# 前端开发服务器
cd frontend
npm run dev

# 后端开发服务器
cd backend
npm run dev
```

## ✨ 功能特性

### 🎨 创意设计
- 渐变色背景 + 浮动形状
- 玻璃态设计（Glassmorphism）
- 流畅动画过渡
- 自定义滚动条

### 🌓 主题切换
- 浅色/深色模式
- 系统主题检测
- 平滑过渡动画

### 📱 响应式设计
- 移动端优先
- 完美适配各种设备

### 🚀 核心功能
- 文章系统（CRUD + 搜索）
- 项目展示
- 技能可视化
- 工作经历时间线
- 评论系统
- 留言板
- 访问统计

## 🚀 快速开始

### 一键初始化

```bash
git clone <your-repo>
cd blog-project
./init.sh
```

### 手动安装

```bash
# 安装依赖
cd frontend && npm install
cd ../backend && npm install

# 配置环境变量
cd backend && cp .env.example .env

# 运行数据库迁移
npm run prisma:migrate
npm run prisma:generate

# 启动服务
npm run dev  # 后端
cd ../frontend && npm run dev  # 前端
```

访问:
- 前端: http://localhost:3000
- 后端: http://localhost:3001

## 📚 文档

- [快速开始](./docs/GETTING_STARTED.md)
- [部署指南](./docs/DEPLOYMENT.md)
- [API 文档](./docs/API.md)
- [项目总结](./PROJECT_SUMMARY.md)

## 📝 开发进度

- [x] 项目初始化
- [x] 前端页面开发
- [x] 后端 API 开发
- [x] 数据库设计
- [x] 核心功能实现
- [x] 文档编写
- [ ] 部署到生产环境

## 🎨 设计理念

采用创意风格，结合：
- 渐变色背景
- 玻璃态设计（Glassmorphism）
- 流畅的动画过渡
- 独特的交互体验
- 个性化视觉效果

## 📄 许可证

MIT License

## 👤 作者

**丁宇轩**
- 前端开发工程师（4年经验）
- 鸿蒙开发工程师高级认证
- 鸿蒙原生开发培训讲师

---

🫡 跟着将军，冲冲冲！
