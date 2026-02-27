import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';

// 注册
export const register = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username, password, role = 'user' } = req.body;

    // 检查用户是否已存在
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new AppError('邮箱或用户名已存在', 400);
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        avatar: true,
        bio: true,
        createdAt: true,
      },
    });

    // 生成 JWT
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      success: true,
      message: '注册成功',
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

// 登录
export const login = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('邮箱或密码错误', 401);
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError('邮箱或密码错误', 401);
    }

    // 生成 JWT
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: '登录成功',
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          avatar: user.avatar,
          bio: user.bio,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 获取个人信息
export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        avatar: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError('用户不存在', 404);
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// 更新个人信息
export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, bio, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        ...(username && { username }),
        ...(bio !== undefined && { bio }),
        ...(avatar !== undefined && { avatar }),
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        avatar: true,
        bio: true,
        updatedAt: true,
      },
    });

    res.json({
      success: true,
      message: '更新成功',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
