# 🚀 服务器部署完整指南

## 目标服务器
- **IP**: 192.168.1.100（待确认）
- **用户**: root
- **系统**: Linux (OpenCloudOS)

## 部署架构

```
┌─────────────────────────────────────┐
│     服务器 (192.168.1.100)           │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────┐  ┌─────────────┐ │
│  │  前端        │  │  后端       │ │
│  │  Next.js    │  │  Node.js    │ │
│  │  Port: 3000 │  │  Port: 3001 │ │
│  └──────────────┘  └─────────────┘ │
│         │                 │         │
│         └────────┬────────┘         │
│                  │                  │
│         ┌────────▼────────┐        │
│         │   Nginx         │        │
│         │   Port: 80/443  │        │
│         └─────────────────┘        │
│                  │                  │
│         ┌────────▼────────┐        │
│         │   MySQL         │        │
│         │   Port: 3306    │        │
│         └─────────────────┘        │
└─────────────────────────────────────┘
```

---

## 📋 部署步骤

### 第一步：服务器环境准备

#### 1. 连接到服务器

```bash
ssh root@192.168.1.100
```

#### 2. 安装必要软件

```bash
# 更新系统
yum update -y

# 安装 Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

# 安装 MySQL 8.0
yum install -y mysql-server
systemctl start mysqld
systemctl enable mysqld

# 安装 Nginx
yum install -y nginx
systemctl start nginx
systemctl enable nginx

# 安装 PM2（进程管理器）
npm install -g pm2

# 验证安装
node --version
npm --version
mysql --version
nginx -v
```

#### 3. 配置 MySQL

```bash
# 获取临时密码
grep 'temporary password' /var/log/mysqld.log

# 安全配置
mysql_secure_installation

# 登录 MySQL
mysql -u root -p

# 创建数据库和用户
CREATE DATABASE blog_db;
CREATE USER 'bloguser'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON blog_db.* TO 'bloguser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

### 第二步：部署后端

#### 1. 克隆代码

```bash
# 创建项目目录
mkdir -p /var/www
cd /var/www

# 克隆仓库（使用 SSH）
git clone git@github.com:dyx-tequila/ding-blog.git

# 或使用 HTTPS
git clone https://github.com/dyx-tequila/ding-blog.git
```

#### 2. 安装依赖

```bash
cd /var/www/ding-blog/backend

# 安装依赖
npm install

# 生成 Prisma Client
npx prisma generate

# 运行数据库迁移
npx prisma migrate deploy
```

#### 3. 配置环境变量

```bash
# 创建 .env 文件
cat > .env << 'EOF'
DATABASE_URL="mysql://bloguser:your_password@localhost:3306/blog_db"
JWT_SECRET="ding-yixuan-super-secret-jwt-key-2024-very-secure"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="production"
FRONTEND_URL="http://192.168.1.100"
API_PREFIX="/api/v1"
EOF
```

#### 4. 启动后端服务

```bash
# 使用 PM2 启动
pm2 start dist/index.js --name "blog-backend"

# 设置开机自启
pm2 startup
pm2 save

# 查看日志
pm2 logs blog-backend
```

#### 5. 测试后端

```bash
curl http://localhost:3001/health
```

---

### 第三步：部署前端

#### 1. 安装依赖

```bash
cd /var/www/ding-blog/frontend

# 安装依赖
npm install

# 创建环境变量
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://192.168.1.100:3001/api/v1
NEXT_PUBLIC_SITE_URL=http://192.168.1.100
EOF

# 构建项目
npm run build
```

#### 2. 启动前端服务

```bash
# 使用 PM2 启动
pm2 start npm --name "blog-frontend" -- start

# 查看日志
pm2 logs blog-frontend
```

#### 3. 测试前端

```bash
curl http://localhost:3000
```

---

### 第四步：配置 Nginx 反向代理

#### 1. 创建 Nginx 配置

```bash
cat > /etc/nginx/conf.d/blog.conf << 'EOF'
# 后端 API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# 前端
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
```

#### 2. 重启 Nginx

```bash
# 测试配置
nginx -t

# 重启 Nginx
systemctl restart nginx
```

---

### 第五步：配置防火墙

```bash
# 开放必要端口
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-port=3000/tcp
firewall-cmd --permanent --add-port=3001/tcp
firewall-cmd --reload
```

---

## 🎯 访问网站

部署完成后，通过以下地址访问：

- **前端**: http://192.168.1.100 或 http://yourdomain.com
- **后端 API**: http://192.168.1.100:3001 或 http://api.yourdomain.com

---

## 📝 常用命令

### PM2 管理命令

```bash
# 查看所有进程
pm2 list

# 查看日志
pm2 logs

# 重启服务
pm2 restart blog-backend
pm2 restart blog-frontend

# 停止服务
pm2 stop blog-backend
pm2 stop blog-frontend

# 删除服务
pm2 delete blog-backend
pm2 delete blog-frontend
```

### 更新代码

```bash
cd /var/www/ding-blog

# 拉取最新代码
git pull

# 更新后端
cd backend
npm install
npx prisma migrate deploy
pm2 restart blog-backend

# 更新前端
cd ../frontend
npm install
npm run build
pm2 restart blog-frontend
```

---

## ✅ 部署检查清单

- [ ] Node.js 18 已安装
- [ ] MySQL 8.0 已安装并配置
- [ ] Nginx 已安装并配置
- [ ] PM2 已安装
- [ ] 后端服务运行正常
- [ ] 前端服务运行正常
- [ ] Nginx 反向代理配置完成
- [ ] 防火墙规则已配置
- [ ] 可以通过浏览器访问

---

## 🆘 常见问题

### 问题 1: MySQL 连接失败

**解决**：
```bash
# 检查 MySQL 状态
systemctl status mysqld

# 检查连接
mysql -u bloguser -p blog_db
```

### 问题 2: PM2 服务未启动

**解决**：
```bash
# 查看详细日志
pm2 logs --lines 100

# 重新启动
pm2 restart all
```

### 问题 3: Nginx 502 错误

**解决**：
```bash
# 检查后端服务是否运行
pm2 list

# 检查 Nginx 配置
nginx -t

# 查看错误日志
tail -f /var/log/nginx/error.log
```

---

## 🎉 完成！

部署完成后，你的个人博客将运行在服务器上！

### 访问地址

- **网站**: http://192.168.1.100
- **API**: http://192.168.1.100:3001

### 后续维护

- 定期更新代码：`git pull`
- 监控服务状态：`pm2 list`
- 查看日志：`pm2 logs`

---

🫡 **跟着将军，冲冲冲！**

准备好后告诉我，我们开始部署！
