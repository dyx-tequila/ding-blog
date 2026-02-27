# 快速开始

## 🚀 本地开发

### 前置要求

- Node.js 18+
- MySQL 8.0+
- npm 或 yarn

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd blog-project
```

### 2. 安装依赖

```bash
# 前端
cd frontend
npm install

# 后端
cd ../backend
npm install
```

### 3. 配置数据库

```bash
# 创建数据库
mysql -u root -p
CREATE DATABASE blog_db;

# 配置环境变量
cd backend
cp .env.example .env
# 编辑 .env 文件，配置数据库连接

# 运行迁移
npm run prisma:migrate

# 生成 Prisma Client
npm run prisma:generate
```

### 4. 启动开发服务器

```bash
# 后端（终端 1）
cd backend
npm run dev

# 前端（终端 2）
cd frontend
npm run dev
```

### 5. 访问应用

- 前端: http://localhost:3000
- 后端: http://localhost:3001
- API 文档: http://localhost:3001/health

## 📝 项目结构

```
blog-project/
├── frontend/          # Next.js 前端
│   ├── app/          # App Router 页面
│   ├── components/   # React 组件
│   ├── lib/          # 工具函数
│   └── public/       # 静态资源
│
├── backend/          # Node.js 后端
│   ├── src/
│   │   ├── controllers/  # 控制器
│   │   ├── routes/       # 路由
│   │   ├── middleware/   # 中间件
│   │   └── config/       # 配置
│   └── prisma/           # 数据库模型
│
└── docs/            # 文档
```

## 🔧 开发指南

### 添加新页面

1. 在 `frontend/app` 下创建新目录
2. 添加 `page.tsx` 文件
3. 在导航栏中添加链接

### 添加新 API

1. 在 `backend/src/controllers` 添加控制器
2. 在 `backend/src/routes` 添加路由
3. 在 `backend/src/index.ts` 注册路由

### 修改数据库

1. 编辑 `backend/prisma/schema.prisma`
2. 运行 `npm run prisma:migrate`
3. 运行 `npm run prisma:generate`

## 🚀 部署

详细的部署指南请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📚 更多文档

- [API 文档](./API.md)
- [部署指南](./DEPLOYMENT.md)
- [贡献指南](./CONTRIBUTING.md)

---

🫡 跟着将军，冲冲冲！
