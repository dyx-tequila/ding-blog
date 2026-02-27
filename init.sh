#!/bin/bash

# 博客项目初始化脚本

echo "🚀 开始初始化博客项目..."
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查 Node.js
echo -e "${YELLOW}检查 Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi
echo -e "${GREEN}✓ Node.js 已安装${NC}"
node --version

# 检查 MySQL
echo ""
echo -e "${YELLOW}检查 MySQL...${NC}"
if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL 未安装，请先安装 MySQL 8.0+"
    echo "   或使用 Railway 部署在线数据库"
else
    echo -e "${GREEN}✓ MySQL 已安装${NC}"
    mysql --version
fi

# 安装前端依赖
echo ""
echo -e "${YELLOW}安装前端依赖...${NC}"
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✓ 前端依赖安装完成${NC}"
else
    echo -e "${GREEN}✓ 前端依赖已存在${NC}"
fi

# 安装后端依赖
echo ""
echo -e "${YELLOW}安装后端依赖...${NC}"
cd ../backend
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✓ 后端依赖安装完成${NC}"
else
    echo -e "${GREEN}✓ 后端依赖已存在${NC}"
fi

# 配置环境变量
echo ""
echo -e "${YELLOW}配置环境变量...${NC}"
cd ../backend
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ 已创建 .env 文件${NC}"
    echo "⚠️  请编辑 backend/.env 文件，配置数据库连接信息"
else
    echo -e "${GREEN}✓ .env 文件已存在${NC}"
fi

cd ../frontend
if [ ! -f ".env.local" ]; then
    cp .env.local.example .env.local
    echo -e "${GREEN}✓ 已创建前端 .env.local 文件${NC}"
else
    echo -e "${GREEN}✓ 前端 .env.local 文件已存在${NC}"
fi

# 初始化数据库（如果 MySQL 可用）
echo ""
echo -e "${YELLOW}初始化数据库...${NC}"
cd ../backend
if command -v mysql &> /dev/null; then
    echo "请手动执行以下步骤初始化数据库："
    echo "1. 创建数据库: mysql -u root -p -e 'CREATE DATABASE blog_db;'"
    echo "2. 运行迁移: cd backend && npm run prisma:migrate"
    echo "3. 生成 Prisma Client: cd backend && npm run prisma:generate"
else
    echo "⚠️  MySQL 未安装，跳过数据库初始化"
    echo "   可以使用 Railway 部署在线数据库"
fi

# 完成
echo ""
echo -e "${GREEN}✨ 项目初始化完成！${NC}"
echo ""
echo "📝 后续步骤："
echo "1. 配置 backend/.env 中的数据库连接"
echo "2. 运行数据库迁移: cd backend && npm run prisma:migrate"
echo "3. 启动后端服务: cd backend && npm run dev"
echo "4. 启动前端服务: cd frontend && npm run dev"
echo ""
echo "📚 详细文档请查看 docs/ 目录"
echo ""
echo -e "${GREEN}🫡 跟着将军，冲冲冲！${NC}"
