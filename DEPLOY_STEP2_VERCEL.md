# 🚀 部署指南 - 第二步：Vercel 前端

## 前提条件

✅ 后端已部署到 Railway
✅ 已获得后端 URL
✅ 后端 `/health` 端点测试通过

---

## 🎯 详细步骤

### 步骤 1: 登录 Vercel

1. **打开浏览器，访问**
   ```
   https://vercel.com
   ```

2. **登录 GitHub**
   - 点击 "Login" 或 "Sign Up"
   - 选择 "Continue with GitHub"
   - 使用你的 GitHub 账号登录
   - 授权 Vercel 访问你的仓库

### 步骤 2: 导入项目

1. **点击 "Add New" → "Project"**
   - 在 Vercel 控制台，点击右上角 "Add New"
   - 选择 "Project"

2. **选择 GitHub 仓库**
   - 在 "Import Git Repository" 页面
   - 找到 `ding-blog` 仓库
   - 点击 "Import"

### 步骤 3: 配置项目

1. **设置项目名称**
   ```
   Name: ding-blog
   ```

2. **设置 Root Directory**
   ```
   Root Directory: frontend
   ```
   - **重要**：必须设置为 `frontend`
   - 否则 Vercel 找不到 Next.js 项目

3. **Framework Preset**
   - Vercel 会自动检测到 "Next.js"
   - 确认显示为 "Next.js"

4. **构建和开发设置**
   - Vercel 会自动配置：
     - Build Command: `npm run build`
     - Output Directory: `.next`
     - Install Command: `npm install`

### 步骤 4: 配置环境变量

1. **在 "Environment Variables" 部分**
   - 点击 "Add New"

2. **添加以下变量**

   **变量 1: NEXT_PUBLIC_API_URL**
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://你的后端URL/api/v1
   ```
   - 替换 `你的后端URL` 为实际的 Railway 后端 URL
   - 例如：`https://ding-backend-production.up.railway.app/api/v1`

   **变量 2: NEXT_PUBLIC_SITE_URL**
   ```
   Name: NEXT_PUBLIC_SITE_URL
   Value: https://ding-blog.vercel.app
   ```
   - 这个可以先填写，部署后如果域名不同再修改

3. **确认添加**
   - 每个变量输入后，点击 "Add"
   - 或者回车自动添加

### 步骤 5: 部署

1. **点击 "Deploy" 按钮**
   - 在页面底部，点击 "Deploy"
   - 部署开始（约 1-2 分钟）

2. **查看部署进度**
   - Vercel 会显示实时部署日志
   - 可以看到：
     - Installing dependencies
     - Building application
     - Uploading

3. **等待部署完成**
   - 状态变为 "Ready"
   - 表示部署成功

### 步骤 6: 获取前端 URL

1. **查看部署 URL**
   - 部署完成后，Vercel 会提供一个 URL
   - 格式类似：
     ```
     https://ding-blog.vercel.app
     ```

2. **访问网站**
   - 点击提供的 URL
   - 或在浏览器中输入

3. **测试功能**
   - ✅ 查看首页
   - ✅ 测试主题切换（右上角月亮/太阳图标）
   - ✅ 浏览博客页面
   - ✅ 查看项目展示
   - ✅ 阅读关于我页面

---

## ✅ 完成检查清单

完成以下检查，确认前端部署成功：

- [ ] 部署状态为 "Ready"
- [ ] 环境变量配置完成
- [ ] 网站可以正常访问
- [ ] 主题切换功能正常
- [ ] 所有页面都可以访问
- [ ] API 调用正常（查看浏览器控制台）

---

## 🔧 后续配置

### 1. 更新后端的 FRONTEND_URL

回到 Railway 后端服务：

1. **编辑环境变量**
   - 找到 `FRONTEND_URL`
   - 修改为：
     ```
     https://ding-blog.vercel.app
     ```

2. **重启后端服务**
   - 点击 "Restart"
   - 等待重启完成

### 2. 配置自定义域名（可选）

如果你有自己的域名：

1. **在 Vercel 项目设置中**
   - 点击 "Domains"
   - 点击 "Add"

2. **输入你的域名**
   - 例如：`dingyixuan.com`
   - 或 `blog.dingyixuan.com`

3. **配置 DNS**
   - Vercel 会提供 DNS 记录
   - 在你的域名提供商处添加：
     - Type: `A`
     - Name: `@` 或 `blog`
     - Value: Vercel 提供的 IP

---

## 🆘 常见问题

### 问题 1: 构建失败

**可能原因**：
- Root Directory 设置错误
- 环境变量缺失
- 依赖安装失败

**解决**：
- 检查 Root Directory 是否为 `frontend`
- 查看构建日志
- 确认 `package.json` 配置正确

### 问题 2: API 调用失败

**可能原因**：
- NEXT_PUBLIC_API_URL 配置错误
- 后端未启动
- CORS 配置问题

**解决**：
- 检查环境变量是否正确
- 确认后端服务运行正常
- 查看浏览器控制台错误信息

### 问题 3: 样式加载异常

**可能原因**：
- Tailwind CSS 配置问题
- 构建缓存问题

**解决**：
- 清除 Vercel 缓存，重新部署
- 检查 `tailwind.config.ts` 配置

---

## 🎉 部署完成！

如果所有检查都通过，恭喜你！

你的个人博客已经成功部署到生产环境！

### 你现在拥有：

- ✅ 一个在线的个人博客网站
- ✅ 创意的视觉设计（渐变、玻璃态、动画）
- ✅ 主题切换功能（浅色/深色）
- ✅ 完整的博客系统
- ✅ 项目展示
- ✅ 技能展示
- ✅ 工作经历展示
- ✅ 评论系统
- ✅ 访问统计

### 分享你的网站：

- 前端 URL：`https://ding-blog.vercel.app`
- 后端 URL：`https://ding-backend.up.railway.app`

### 后续维护：

- **更新代码**：
  ```bash
  git add .
  git commit -m "Update"
  git push
  ```
  Vercel 和 Railway 会自动部署！

- **查看日志**：
  - Vercel：在项目页面查看
  - Railway：在服务页面查看

- **监控运行**：
  - 定期检查服务状态
  - 查看访问统计
  - 关注错误日志

---

🫡 **跟着将军，冲冲冲！**

部署完成后，告诉我，我们庆祝一下！🎉
