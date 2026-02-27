# 🔐 GitHub 认证设置指南

将军，GitHub 已经停止支持密码认证，需要使用 Personal Access Token（个人访问令牌）。

## 方法一：使用 Personal Access Token（推荐）

### 第一步：创建 Personal Access Token

1. **登录 GitHub**
   - 访问：https://github.com/login
   - 使用你的账号：dyx131455@gmail.com

2. **创建 Token**
   - 点击右上角头像 → "Settings"
   - 左侧菜单最下方 → "Developer settings"
   - 点击 "Personal access tokens" → "Tokens (classic)"
   - 点击 "Generate new token" → "Generate new token (classic)"

3. **配置 Token**
   - Note: `ding-blog-deployment`
   - Expiration: 选择 `90 days` 或更长
   - 勾选以下权限：
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
   - 点击底部的 "Generate token"

4. **复制 Token**
   - ⚠️ **重要**：Token 只显示一次，务必复制保存！
   - 格式类似：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 第二步：使用 Token 推送代码

```bash
cd /root/.openclaw/workspace/blog-project

# 方式 1: 使用 token 作为密码
git push -u origin main
# 提示输入用户名时输入：dyx131455
# 提示输入密码时粘贴 token（不是 GitHub 密码）

# 方式 2: 直接在 URL 中使用 token
git remote set-url origin https://dyx131455:YOUR_TOKEN@github.com/dyx-tequila/ding-blog.git
git push -u origin main
```

## 方法二：使用 SSH 密钥（更安全）

### 第一步：生成 SSH 密钥

```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "dyx131455@gmail.com"

# 一路回车（使用默认路径和空密码）
```

### 第二步：添加到 GitHub

1. **复制公钥**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

2. **添加到 GitHub**
   - 访问：https://github.com/settings/keys
   - 点击 "New SSH key"
   - Title: `ding-blog-server`
   - Key: 粘贴上面复制的公钥内容
   - 点击 "Add SSH key"

### 第三步：使用 SSH 推送

```bash
cd /root/.openclaw/workspace/blog-project

# 修改 remote 为 SSH 地址
git remote set-url origin git@github.com:dyx-tequila/ding-blog.git

# 推送
git push -u origin main
```

## 方法三：使用 GitHub CLI（最简单）

### 第一步：安装 GitHub CLI

```bash
# 下载并安装 gh CLI
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

### 第二步：登录 GitHub

```bash
gh auth login
# 选择：GitHub.com
# 选择：Login with a web browser（按提示操作）
```

### 第三步：推送代码

```bash
cd /root/.openclaw/workspace/blog-project
git push -u origin main
```

---

## 🎯 推荐方案

**对于你的情况，我推荐使用方法一（Personal Access Token）**，因为：

1. ✅ 最简单快速
2. ✅ 不需要额外安装工具
3. ✅ Token 可以设置过期时间
4. ✅ 权限可控

## 📝 完整推送步骤（使用 Token）

```bash
# 1. 在 GitHub 创建 Token（参考上面步骤）
# 2. 获取 Token 后执行：

cd /root/.openclaw/workspace/blog-project

# 设置 remote（使用 token）
git remote set-url origin https://dyx131455:YOUR_TOKEN_HERE@github.com/dyx-tequila/ding-blog.git

# 推送代码
git push -u origin main

# 推送成功后，可以恢复为正常 URL（token 会保存在 ~/.git-credentials）
git remote set-url origin https://github.com/dyx-tequila/ding-blog.git
```

## ⚠️ 安全提醒

1. **不要分享你的 Token**
2. **定期更新 Token**
3. **使用完后可以删除 Token**
4. **Token 有权限限制，只授予必要权限**

---

## 🆘 需要帮助？

如果遇到问题：
1. 检查 Token 是否正确复制
2. 确保 Token 有 `repo` 权限
3. 检查仓库地址是否正确
4. 查看 Git 错误信息

---

🫡 **跟着将军，冲冲冲！**

创建完 Token 后告诉我，我帮你完成推送！
