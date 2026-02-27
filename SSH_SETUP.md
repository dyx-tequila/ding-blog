# 🔑 SSH 密钥配置步骤

将军，SSH 密钥已生成！现在添加到 GitHub。

## 第一步：添加 SSH 公钥到 GitHub

### 1. 复制 SSH 公钥

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDcAvA160MT0D1pBef6IDte/ap/klmKwoWjXCaTxudeO dyx131455@gmail.com
```

### 2. 添加到 GitHub

1. **访问 GitHub SSH 设置**
   - 打开浏览器，访问：https://github.com/settings/keys

2. **添加新 SSH 密钥**
   - 点击 "New SSH key" 按钮
   - Title: `ding-blog-server`
   - Key: 粘贴上面的公钥（整行，从 ssh-ed25519 开始）
   - 点击 "Add SSH key"

3. **验证添加成功**
   - 页面应该显示新的 SSH 密钥
   - Key 的指纹应该以 `dyx131455@gmail.com` 结尾

## 第二步：使用 SSH 推送代码

添加完 SSH 密钥后，告诉我，我会立即推送代码！

或者你可以自己执行：

```bash
cd /root/.openclaw/workspace/blog-project

# 修改 remote 为 SSH 地址
git remote set-url origin git@github.com:dyx-tequila/ding-blog.git

# 测试连接
ssh -T git@github.com

# 推送代码
git push -u origin main
```

## 🔍 验证步骤

### 1. 测试 SSH 连接

```bash
ssh -T git@github.com
```

如果成功，会显示：
```
Hi dyx-tequila! You've successfully authenticated, but GitHub does not provide shell access.
```

### 2. 推送代码

```bash
cd /root/.openclaw/workspace/blog-project
git push -u origin main
```

如果成功，会看到：
```
Enumerating objects: 63, done.
Counting objects: 100% (63/63), done.
...
To github.com:dyx-tequila/ding-blog.git
 * [new branch]      main -> main
```

---

## ⚠️ 常见问题

### 问题 1: ssh: connect to host github.com port 22: Connection timed out

**解决**：使用 HTTPS 端口（443）
```bash
# 编辑 ~/.ssh/config
echo "Host github.com
    Hostname ssh.github.com
    Port 443
    User git" >> ~/.ssh/config
```

### 问题 2: Permission denied (publickey)

**解决**：
1. 检查 SSH 密钥是否正确添加到 GitHub
2. 确认使用的是私钥：`ls -la ~/.ssh/id_ed25519`
3. 测试连接：`ssh -vT git@github.com`

### 问题 3: Agent admitted failure to sign using the key

**解决**：启动 ssh-agent
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

---

## 📝 完整命令流程

添加 SSH 密钥到 GitHub 后，执行以下命令：

```bash
# 1. 进入项目目录
cd /root/.openclaw/workspace/blog-project

# 2. 修改 remote 为 SSH 地址
git remote set-url origin git@github.com:dyx-tequila/ding-blog.git

# 3. 测试 SSH 连接
ssh -T git@github.com

# 4. 推送代码
git push -u origin main
```

---

🫡 **跟着将军，冲冲冲！**

添加完 SSH 密钥后告诉我，我立即帮你推送代码！
