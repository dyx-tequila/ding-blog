# 🚀 部署指南 - 第一步：Railway 后端

## 目标
将后端代码部署到 Railway，包括：
- Node.js + Express 服务
- MySQL 数据库
- 自动运行数据库迁移

---

## 🎯 详细步骤

### 步骤 1: 登录 Railway

1. **打开浏览器，访问**
   ```
   https://railway.app
   ```

2. **登录 GitHub**
   - 点击 "Login with GitHub"
   - 使用你的 GitHub 账号登录（dyx131455@gmail.com）
   - 授权 Railway 访问你的仓库

### 步骤 2: 创建新项目

1. **点击 "New Project"**
   - 在 Railway 控制台，点击右上角 "+ New Project"

2. **选择 "Deploy from GitHub repo"**
   - 点击 "Deploy from GitHub repo"
   - 会显示你的 GitHub 仓库列表

3. **选择 ding-blog 仓库**
   - 在列表中找到 `ding-blog`
   - 点击仓库名称

### 步骤 3: 配置后端服务

1. **设置 Root Directory**
   ```
   Root Directory: backend
   ```

2. **自动检测配置**
   - Railway 会自动检测到 `package.json`
   - 会自动设置：
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`

3. **点击 "Deploy"**
   - 点击底部的 "Deploy" 按钮
   - 等待部署开始（约 30 秒）

### 步骤 4: 添加 MySQL 数据库

1. **在项目页面，点击 "New Service"**
   - 在项目顶部，找到 "+ New Service" 按钮
   - 点击它

2. **选择 Database**
   - 在弹出菜单中，选择 "Database"
   - 选择 "MySQL"
   - 点击 "Add MySQL"

3. **等待 MySQL 创建完成**
   - Railway 会创建一个 MySQL 实例
   - 等待状态变为 "Running"（约 1-2 分钟）

### 步骤 5: 配置环境变量

1. **打开后端服务设置**
   - 在项目页面，点击后端服务（通常显示为 "backend"）
   - 点击顶部的 "Variables" 标签

2. **添加以下环境变量**

   点击 "New Variable"，逐个添加：

   ```env
   # JWT 配置
   JWT_SECRET=ding-yixuan-super-secret-jwt-key-2024-very-secure-change-in-production
   JWT_EXPIRES_IN=7d

   # 服务器配置
   PORT=3001
   NODE_ENV=production

   # 前端 URL（暂时使用 localhost，部署完前端后修改）
   FRONTEND_URL=http://localhost:3000

   # API 配置
   API_PREFIX=/api/v1
   ```

3. **设置 DATABASE_URL**

   Railway 会自动注入 MySQL 相关变量：
   - `MYSQLHOST`
   - `MYSQLPORT`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`

   添加以下变量（Railway 会自动替换）：

   ```env
   DATABASE_URL=mysql://${MYSQLUSER}:${MYSQLPASSWORD}@${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}
   ```

### 步骤 6: 配置数据库迁移脚本

1. **在服务设置中，找到 "Scripts" 标签**
   - 点击进入

2. **添加部署后脚本**
   - Name: `migrate`
   - Script:
     ```bash
     npx prisma migrate deploy
     npx prisma generate
     ```

3. **保存脚本**

### 步骤 7: 重新部署

1. **点击 "Deploy" 按钮**
   - 在后端服务页面，点击 "Deploy"
   - 或者点击 "Restart" 重启服务

2. **等待部署完成**
   - 查看部署日志
   - 等待所有步骤完成（约 2-3 分钟）

3. **确认部署成功**
   - 服务状态应该显示 "Running"
   - 没有错误日志

### 步骤 8: 获取后端 URL

1. **查看服务 URL**
   - 在后端服务页面顶部
   - 找到 "Public Networking" 或 "Domains"
   - 复制后端 URL，格式类似：
     ```
     https://ding-backend-production.up.railway.app
     ```

2. **测试后端 API**
   - 在浏览器中访问：
     ```
     https://你的后端URL/health
     ```
   - 应该返回：
     ```json
     {
       "success": true,
       "message": "服务器运行正常",
       "timestamp": "2024-02-27T..."
     }
     ```

---

## ✅ 完成检查清单

完成以下检查，确认后端部署成功：

- [ ] 后端服务状态为 "Running"
- [ ] MySQL 数据库状态为 "Running"
- [ ] 环境变量全部配置完成
- [ ] `/health` 端点返回成功
- [ ] 数据库迁移已执行
- [ ] 获得后端 URL

---

## 🆘 常见问题

### 问题 1: 构建失败

**可能原因**：
- Node.js 版本不兼容
- 依赖安装失败

**解决**：
- 查看构建日志
- 确认 `package.json` 配置正确

### 问题 2: 数据库连接失败

**可能原因**：
- DATABASE_URL 格式错误
- MySQL 服务未启动

**解决**：
- 检查 DATABASE_URL 格式
- 确认 MySQL 服务运行正常
- 查看 Railway 日志

### 问题 3: 迁移失败

**可能原因**：
- Prisma Client 未生成
- 数据库连接问题

**解决**：
- 在 Console 中手动运行：
  ```bash
  npx prisma migrate deploy
  npx prisma generate
  ```

---

## 📝 下一步

后端部署成功后，告诉我：

1. **后端 URL**（类似：https://ding-backend.up.railway.app）
2. **是否所有检查都通过**

然后我们继续部署前端到 Vercel！

---

🫡 **跟着将军，冲冲冲！**

开始部署吧，有问题随时告诉我！
