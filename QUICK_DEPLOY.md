# 🚀 快速部署指南

将军，由于本地环境没有 MySQL，我们直接部署到生产环境！

## 📋 部署步骤

### 第一步：推送到 GitHub

1. **初始化 Git 仓库**
```bash
cd /root/.openclaw/workspace/blog-project
git init
git add .
git commit -m "Initial commit: 丁宇轩的个人博客系统"
```

2. **创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 仓库名：`ding-blog` 或你喜欢的名字
   - 设为私有或公开
   - 不要初始化 README

3. **推送到 GitHub**
```bash
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

### 第二步：部署后端到 Railway

1. **访问 Railway**
   - 打开 https://railway.app
   - 使用 GitHub 账号登录

2. **创建新项目**
   - 点击 "New Project" → "Deploy from GitHub repo"
   - 选择你的博客仓库
   - Railway Root Directory: `backend`

3. **配置项目**
   ```yaml
   Root Directory: backend
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **添加 MySQL 数据库**
   - 在项目中点击 "New Service"
   - 选择 "Database" → "MySQL"
   - Railway 会自动创建数据库

5. **配置环境变量**
   
   Railway 会自动注入 MySQL 变量，你还需要添加：
   ```env
   JWT_SECRET=ding-yixuan-super-secret-jwt-key-2024-very-secure
   JWT_EXPIRES_IN=7d
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://your-domain.vercel.app
   API_PREFIX=/api/v1
   ```

6. **运行数据库迁移**
   - 在 MySQL 服务中点击 "Console"
   - 或在项目设置中找到 "Scripts"
   - 添加部署脚本：`npx prisma migrate deploy`

7. **部署！**
   - 点击 "Deploy"
   - 等待部署完成（约 2-3 分钟）
   - 获得后端 URL，类似：`https://ding-backend.railway.app`

### 第三步：部署前端到 Vercel

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择你的博客仓库
   - Root Directory: `frontend`

3. **配置环境变量**
   ```env
   NEXT_PUBLIC_API_URL=https://ding-backend.railway.app/api/v1
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

4. **部署！**
   - 点击 "Deploy"
   - 等待部署完成（约 1-2 分钟）
   - 获得前端 URL，类似：`https://ding-blog.vercel.app`

### 第四步：测试功能

1. **访问前端**
   ```
   https://your-domain.vercel.app
   ```

2. **测试后端 API**
   ```bash
   curl https://ding-backend.railway.app/health
   ```

3. **测试主题切换**
   - 点击右上角的月亮/太阳图标
   - 检查是否切换成功

4. **测试所有页面**
   - 首页
   - 博客页
   - 项目页
   - 关于页

## 🔧 可能遇到的问题

### Railway 部署失败

**问题**: Build 失败
**解决**: 检查 `package.json` 中的脚本是否正确

**问题**: 数据库连接失败
**解决**: 
- 确保 MySQL 服务已启动
- 检查 DATABASE_URL 是否正确
- Railway 会自动注入 MySQL 环境变量

### Vercel 部署失败

**问题**: Build 失败
**解决**: 检查 `next.config.js` 配置

**问题**: API 调用失败
**解决**: 
- 确保 NEXT_PUBLIC_API_URL 正确
- 检查后端 CORS 配置
- 确保后端已部署成功

## 🎉 部署完成后

1. **配置自定义域名**（可选）
   - 在 Vercel 项目设置中添加
   - 在 Railway 项目设置中添加

2. **监控运行**
   - Vercel Dashboard
   - Railway Dashboard

3. **更新代码**
   ```bash
   git add .
   git commit -m "Update"
   git push
   ```
   - 自动部署到 Vercel 和 Railway

## 📝 注意事项

- Railway 和 Vercel 免费版有一定限制
- 超出限制后会暂停服务，但可以升级付费
- 定期检查使用量
- 建议配置告警

---

🫡 **跟着将军，冲冲冲！**

开始部署吧！
