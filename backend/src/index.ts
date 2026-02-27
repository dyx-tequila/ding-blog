import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

// 导入路由
import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import categoryRoutes from './routes/categories';
import tagRoutes from './routes/tags';
import commentRoutes from './routes/comments';
import projectRoutes from './routes/projects';
import messageRoutes from './routes/messages';
import skillRoutes from './routes/skills';
import experienceRoutes from './routes/experiences';
import analyticsRoutes from './routes/analytics';

// 导入中间件
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

// 加载环境变量
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// 信任代理
app.set('trust proxy', 1);

// 安全中间件
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS 配置
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 压缩
app.use(compression());

// 请求体解析
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 限制每个 IP 100 个请求
  message: {
    success: false,
    message: '请求过于频繁，请稍后再试'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// 健康检查
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '服务器运行正常',
    timestamp: new Date().toISOString(),
  });
});

// API 路由
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/posts`, postRoutes);
app.use(`${API_PREFIX}/categories`, categoryRoutes);
app.use(`${API_PREFIX}/tags`, tagRoutes);
app.use(`${API_PREFIX}/comments`, commentRoutes);
app.use(`${API_PREFIX}/projects`, projectRoutes);
app.use(`${API_PREFIX}/messages`, messageRoutes);
app.use(`${API_PREFIX}/skills`, skillRoutes);
app.use(`${API_PREFIX}/experiences`, experienceRoutes);
app.use(`${API_PREFIX}/analytics`, analyticsRoutes);

// 404 处理
app.use(notFound);

// 错误处理
app.use(errorHandler);

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📡 API 端点: http://localhost:${PORT}${API_PREFIX}`);
  console.log(`🏥 健康检查: http://localhost:${PORT}/health`);
});

export default app;
