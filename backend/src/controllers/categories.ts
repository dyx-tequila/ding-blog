import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';

export const getCategories = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: { where: { status: 'published' } } },
        },
      },
    });

    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategoryBySlug = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: req.params.slug },
      include: {
        posts: {
          where: { status: 'published' },
          include: {
            author: { select: { id: true, username: true, avatar: true } },
          },
        },
      },
    });

    if (!category) throw new AppError('分类不存在', 404);

    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const category = await prisma.category.findUnique({ where: { id: req.params.id } });
    if (!category) throw new AppError('分类不存在', 404);
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const category = await prisma.category.create({ data: req.body });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const category = await prisma.category.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.category.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: '删除成功' });
  } catch (error) {
    next(error);
  }
};
