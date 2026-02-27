# 部署指南

## 🚀 部署方案

本项目采用 **Vercel (前端)** + **Railway (后端+数据库)** 的部署方案，两者都提供免费额度。

## 📋 部署前准备

1. **准备代码仓库**
   - 将项目推送到 GitHub
   - 确保项目结构完整

2. **注册账号**
   - [Vercel](https://vercel.com) - 前端部署
   - [Railway](https://railway.app) - 后端部署
   - [GitHub](https://github.com) - 代码托管

## 🎨 前端部署 (Vercel)

### 步骤 1: 连接 GitHub

1. 登录 [Vercel](https://vercel.com)
2. 点击 "Add New Project"
3. 导入你的 GitHub 仓库
4. 选择 `frontend` 目录作为根目录

### 步骤 2: 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api/v1
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### 步骤 3: 部署

1. 点击 "Deploy"
2. 等待部署完成（约 1-2 分钟）
3. 获得部署 URL：`https://your-project.vercel.app`

### 步骤 4: 配置自定义域名（可选）

1. 在项目设置中点击 "Domains"
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录

## 🔧 后端部署 (Railway)

### 步骤 1: 创建新项目

1. 登录 [Railway](https://railway.app)
2. 点击 "New Project"
3. 选择 "Deploy from GitHub repo"
4. 选择你的仓库

### 步骤 2: 配置项目

1. 设置 Root Directory 为 `backend`
2. 设置 Build Command:
   ```bash
   npm install && npm run build && npx prisma generate
   ```
3. 设置 Start Command:
   ```bash
   npm start
   ```

### 步骤 3: 添加 MySQL 数据库

1. 在 Railway 项目中点击 "New Service"
2. 选择 "Database" → "MySQL"
3. Railway 会自动创建 MySQL 实例

### 步骤 4: 配置环境变量

在 Railway 项目设置中添加以下环境变量：

```env
DATABASE_URL=mysql://mysql://${MYSQLUSER}:${MYSQLPASSWORD}@${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-domain.vercel.app
API_PREFIX=/api/v1
```

Railway 会自动注入 MySQL 相关的环境变量。

### 步骤 5: 运行数据库迁移

1. 在 Railway 项目中打开 "MySQL" 服务
2. 点击 "Console" 进入数据库
3. 或者在本地运行：
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

### 步骤 6: 部署

1. 点击 "Deploy"
2. 等待部署完成
3. 获得后端 URL：`https://your-backend.railway.app`

## 🔄 设置持续部署

### Vercel 自动部署

- 每次推送到 `main` 分支时自动部署
- 支持 Pull Request 预览

### Railway 自动部署

- 每次推送到 `main` 分支时自动部署
- 可以在设置中配置部署分支

## 📊 监控和日志

### Vercel

- 访问项目 Dashboard 查看部署日志
- 使用 Analytics 查看访问统计

### Railway

- 查看实时日志
- 监控资源使用情况
- 设置告警

## 🔐 安全建议

1. **环境变量**
   - 不要在代码中硬编码敏感信息
   - 使用强密码作为 JWT_SECRET
   - 定期轮换密钥

2. **数据库**
   - 定期备份
   - 限制访问 IP
   - 使用强密码

3. **API**
   - 启用 HTTPS
   - 设置速率限制
   - 使用 CORS 白名单

## 🧪 测试部署

### 前端测试

```bash
# 访问前端 URL
https://your-project.vercel.app

# 测试主题切换
# 测试响应式设计
# 检查所有页面
```

### 后端测试

```bash
# 健康检查
curl https://your-backend.railway.app/health

# 测试 API
curl https://your-backend.railway.app/api/v1/posts
```

## 🎉 部署完成后

1. **更新 DNS**
   - 配置自定义域名（如需要）

2. **测试功能**
   - 测试所有页面
   - 测试 API 调用
   - 测试主题切换

3. **监控运行**
   - 设置错误告警
   - 定期检查日志

## 🆘 常见问题

### Vercel 部署失败

- 检查 `next.config.js` 配置
- 查看构建日志
- 确保 Node.js 版本兼容

### Railway 数据库连接失败

- 检查 DATABASE_URL 是否正确
- 确保 MySQL 服务已启动
- 查看连接日志

### API 跨域问题

- 在后端配置 CORS
- 确保 FRONTEND_URL 正确

## 📝 维护

### 更新代码

```bash
# 本地开发
git add .
git commit -m "Update"
git push

# 自动部署到 Vercel 和 Railway
```

### 数据库备份

```bash
# 使用 Railway 的备份功能
# 或定期导出数据
```

---

🫡 部署完成后，你的博客就可以访问了！
