#!/bin/bash

# GitHub 快速部署脚本（使用 gh CLI）

echo "🚀 开始部署丁宇轩的个人博客..."
echo ""

# 检查 gh 是否已安装
if ! command -v gh &> /dev/null; then
    echo "📦 安装 GitHub CLI..."
    
    # 使用二进制直接安装（更可靠）
    wget https://github.com/cli/cli/releases/download/v2.40.0/gh_2.40.0_linux_amd64.tar.gz -O /tmp/gh.tar.gz
    tar -xzf /tmp/gh.tar.gz -C /tmp
    sudo cp /tmp/gh_2.40.0_linux_amd64/bin/gh /usr/local/bin/
    rm -rf /tmp/gh*
    
    echo "✅ GitHub CLI 安装完成"
fi

echo ""
echo "🔐 登录 GitHub..."
echo "请按提示操作："
echo "1. 按 Enter 继续"
echo "2. 会打开浏览器，请在浏览器中授权"
echo "3. 授权完成后回到这里"
echo ""

# 登录 GitHub
gh auth login

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ GitHub 登录成功！"
    echo ""
    echo "📦 推送代码到 GitHub..."
    
    cd /root/.openclaw/workspace/blog-project
    
    # 推送
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 代码推送成功！"
        echo ""
        echo "📝 下一步："
        echo "1. 访问 GitHub 仓库：https://github.com/dyx-tequila/ding-blog"
        echo "2. 部署后端到 Railway：https://railway.app/new"
        echo "3. 部署前端到 Vercel：https://vercel.com/new"
        echo ""
    else
        echo ""
        echo "❌ 推送失败，请检查错误信息"
    fi
else
    echo ""
    echo "❌ GitHub 登录失败"
fi

echo ""
echo "🫡 跟着将军，冲冲冲！"
