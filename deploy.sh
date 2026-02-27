#!/bin/bash

# 快速部署脚本

echo "🚀 开始部署丁宇轩的个人博客..."
echo ""

# 检查是否已配置 remote
if git remote get-url origin > /dev/null 2>&1; then
    echo "✓ Git remote 已配置"
    git remote -v
else
    echo "⚠️  请先配置 GitHub 仓库地址："
    echo "   git remote add origin https://github.com/你的用户名/仓库名.git"
    echo ""
    echo "然后运行："
    echo "   git push -u origin main"
    exit 1
fi

echo ""
echo "📦 推送代码到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 代码已推送到 GitHub！"
    echo ""
    echo "📝 下一步操作："
    echo ""
    echo "1️⃣  部署后端到 Railway："
    echo "   - 访问：https://railway.app/new"
    echo "   - 选择 GitHub 仓库"
    echo "   - Root Directory: backend"
    echo "   - 添加 MySQL 数据库"
    echo "   - 配置环境变量"
    echo "   - 点击 Deploy"
    echo ""
    echo "2️⃣  部署前端到 Vercel："
    echo "   - 访问：https://vercel.com/new"
    echo "   - 选择 GitHub 仓库"
    echo "   - Root Directory: frontend"
    echo "   - 配置环境变量（NEXT_PUBLIC_API_URL）"
    echo "   - 点击 Deploy"
    echo ""
    echo "📚 详细说明请查看：DEPLOY_NOW.md"
    echo ""
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "   1. GitHub 仓库地址是否正确"
    echo "   2. GitHub 账号是否有权限"
    echo "   3. 网络连接是否正常"
    exit 1
fi

echo "🫡 跟着将军，冲冲冲！"
