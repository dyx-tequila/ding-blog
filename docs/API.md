# API 文档

## 基础信息

- **Base URL**: `http://localhost:3001/api/v1`
- **认证方式**: Bearer Token (JWT)
- **响应格式**: JSON

## 认证

### 注册

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "testuser",
  "password": "password123",
  "role": "user"
}
```

### 登录

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

响应:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "username": "testuser"
    },
    "token": "jwt-token"
  }
}
```

## 文章

### 获取文章列表

```http
GET /posts?page=1&limit=10&category=frontend&status=published
```

### 获取文章详情

```http
GET /posts/slug/:slug
```

### 创建文章 (需要认证)

```http
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "文章标题",
  "slug": "article-slug",
  "content": "文章内容",
  "excerpt": "摘要",
  "categoryId": "category-id",
  "tags": ["tag-id-1", "tag-id-2"],
  "status": "published"
}
```

### 更新文章 (需要认证)

```http
PUT /posts/:id
Authorization: Bearer <token>
```

### 删除文章 (需要认证)

```http
DELETE /posts/:id
Authorization: Bearer <token>
```

## 分类

### 获取所有分类

```http
GET /categories
```

### 创建分类 (需要认证)

```http
POST /categories
Authorization: Bearer <token>
```

## 标签

### 获取所有标签

```http
GET /tags
```

## 评论

### 获取评论列表

```http
GET /comments?postId=post-id
```

### 创建评论

```http
POST /comments
Content-Type: application/json

{
  "content": "评论内容",
  "postId": "post-id",
  "parentId": "parent-comment-id" // 可选，回复评论时使用
}
```

## 项目

### 获取项目列表

```http
GET /projects
```

### 获取推荐项目

```http
GET /projects/featured
```

### 创建项目 (需要认证)

```http
POST /projects
Authorization: Bearer <token>
```

## 留言

### 创建留言

```http
POST /messages
Content-Type: application/json

{
  "name": "访客",
  "email": "guest@example.com",
  "content": "留言内容"
}
```

## 技能

### 获取技能列表

```http
GET /skills
```

## 工作经历

### 获取工作经历

```http
GET /experiences
```

## 统计

### 获取访问统计

```http
GET /analytics/visits?days=30
```

### 记录访问

```http
POST /analytics/track
Content-Type: application/json

{
  "path": "/blog"
}
```

## 错误响应

所有错误响应格式:

```json
{
  "success": false,
  "message": "错误信息"
}
```

常见状态码:
- `200` - 成功
- `201` - 创建成功
- `400` - 请求错误
- `401` - 未认证
- `403` - 权限不足
- `404` - 资源不存在
- `500` - 服务器错误

## 分页参数

所有列表接口支持分页:

- `page` - 页码 (默认: 1)
- `limit` - 每页数量 (默认: 10)

响应中包含分页信息:

```json
{
  "data": {
    "posts": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

---

🫡 API 文档持续更新中...
