#!/bin/bash

# 丁宇轩的个人博客 - 自动化部署脚本
# 服务器: 147.139.183.210

set -e  # 遇到错误立即退出

echo "🚀 开始部署丁宇轩的个人博客..."
echo "服务器: 147.139.183.210"
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 第一步：更新系统
echo -e "${YELLOW}[1/8] 更新系统...${NC}"
yum update -y

# 第二步：安装 Node.js 18
echo -e "${YELLOW}[2/8] 安装 Node.js 18...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
    yum install -y nodejs
    echo -e "${GREEN}✓ Node.js 安装完成${NC}"
    node --version
    npm --version
else
    echo -e "${GREEN}✓ Node.js 已安装${NC}"
    node --version
fi

# 第三步：安装 MySQL 8.0
echo -e "${YELLOW}[3/8] 安装 MySQL 8.0...${NC}"
if ! command -v mysql &> /dev/null; then
    yum install -y mysql-server
    systemctl start mysqld
    systemctl enable mysqld
    echo -e "${GREEN}✓ MySQL 安装完成${NC}"

    # 获取临时密码
    TEMP_PASSWORD=$(grep 'temporary password' /var/log/mysqld.log | tail -1 | awk '{print $NF}')
    echo "MySQL 临时密码: $TEMP_PASSWORD"

    # 安全配置（使用临时密码）
    mysql -u root -p"$TEMP_PASSWORD" --connect-expired-password <<EOF
ALTER USER 'root'@'localhost' IDENTIFIED BY 'dyx206778';
CREATE DATABASE blog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'bloguser'@'localhost' IDENTIFIED BY 'blog_password_2024';
GRANT ALL PRIVILEGES ON blog_db.* TO 'bloguser'@'localhost';
FLUSH PRIVILEGES;
EOF
    echo -e "${GREEN}✓ MySQL 配置完成${NC}"
else
    echo -e "${GREEN}✓ MySQL 已安装${NC}"
    systemctl start mysqld
    systemctl enable mysqld
fi

# 第四步：安装 Nginx
echo -e "${YELLOW}[4/8] 安装 Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    yum install -y nginx
    systemctl start nginx
    systemctl enable nginx
    echo -e "${GREEN}✓ Nginx 安装完成${NC}"
else
    echo -e "${GREEN}✓ Nginx 已安装${NC}"
    systemctl start nginx
fi

# 第五步：安装 PM2
echo -e "${YELLOW}[5/8] 安装 PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    echo -e "${GREEN}✓ PM2 安装完成${NC}"
else
    echo -e "${GREEN}✓ PM2 已安装${NC}"
fi

# 第六步：克隆项目代码
echo -e "${YELLOW}[6/8] 部署项目代码...${NC}"
mkdir -p /var/www
cd /var/www

if [ -d "ding-blog" ]; then
    echo "项目已存在，拉取最新代码..."
    cd ding-blog
    git pull
else
    echo "克隆项目..."
    # 使用 SSH（推荐）
    # git clone git@github.com:dyx-tequila/ding-blog.git

    # 使用 HTTPS
    git clone https://github.com/dyx-tequila/ding-blog.git
    cd ding-blog
fi

# 第七步：部署后端
echo -e "${YELLOW}[7/8] 部署后端服务...${NC}"
cd /var/www/ding-blog/backend

# 安装依赖
echo "安装后端依赖..."
npm install

# 生成 Prisma Client
echo "生成 Prisma Client..."
npx prisma generate

# 创建环境变量
cat > .env << 'EOF'
DATABASE_URL="mysql://bloguser:blog_password_2024@localhost:3306/blog_db"
JWT_SECRET="ding-yixuan-super-secret-jwt-key-2024-very-secure-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="production"
FRONTEND_URL="http://147.139.183.210"
API_PREFIX="/api/v1"
EOF

# 运行数据库迁移
echo "运行数据库迁移..."
npx prisma migrate deploy

# 使用 PM2 启动后端
echo "启动后端服务..."
pm2 delete blog-backend 2>/dev/null || true
pm2 start dist/index.js --name "blog-backend"

# 第八步：部署前端
echo -e "${YELLOW}[8/8] 部署前端服务...${NC}"
cd /var/www/ding-blog/frontend

# 安装依赖
echo "安装前端依赖..."
npm install

# 创建环境变量
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://147.139.183.210:3001/api/v1
NEXT_PUBLIC_SITE_URL=http://147.139.183.210
EOF

# 构建项目
echo "构建前端项目..."
npm run build

# 使用 PM2 启动前端
echo "启动前端服务..."
pm2 delete blog-frontend 2>/dev/null || true
pm2 start npm --name "blog-frontend" -- start

# PM2 开机自启
echo "配置 PM2 开机自启..."
pm2 startup systemd -u root --hp /root
pm2 save

# 第九步：配置 Nginx
echo -e "${YELLOW}配置 Nginx 反向代理...${NC}"
cat > /etc/nginx/conf.d/blog.conf << 'EOF'
# 后端 API
server {
    listen 8080;
    server_name _;

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
    server_name _;

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

# 测试 Nginx 配置
nginx -t

# 重启 Nginx
systemctl restart nginx

# 第十步：配置防火墙
echo -e "${YELLOW}配置防火墙...${NC}"
if command -v firewall-cmd &> /dev/null; then
    firewall-cmd --permanent --add-service=http
    firewall-cmd --permanent --add-service=https
    firewall-cmd --permanent --add-port=3000/tcp
    firewall-cmd --permanent --add-port=3001/tcp
    firewall-cmd --permanent --add-port=8080/tcp
    firewall-cmd --reload
    echo -e "${GREEN}✓ 防火墙配置完成${NC}"
else
    echo -e "${YELLOW}防火墙未启用，跳过配置${NC}"
fi

# 完成
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✨ 部署完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "📝 服务信息："
echo "  - 前端: http://147.139.183.210"
echo "  - 后端: http://147.139.183.210:3001"
echo "  - 后端 API (通过 Nginx): http://147.139.183.210:8080"
echo ""
echo "📊 PM2 状态："
pm2 list
echo ""
echo "🔍 查看日志："
echo "  pm2 logs blog-backend"
echo "  pm2 logs blog-frontend"
echo ""
echo "🔄 重启服务："
echo "  pm2 restart blog-backend"
echo "  pm2 restart blog-frontend"
echo ""
echo -e "${GREEN}🫡 跟着将军，冲冲冲！${NC}"
