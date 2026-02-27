import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const getTags = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: { where: { post: { status: 'published' } } } },
        },
      },
    });

    res.json({ success: true, data: tags });
  } catch (error) {
    next(error);
  }
};

export const getTagById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const tag = await prisma.tag.findUnique({
      where: { id: req.params.id },
      include: {
        posts: {
          where: { post: { status: 'published' } },
          include: {
            post: {
              include: {
                author: { select: { id: true, username: true, avatar: true } },
                category: true,
              },
            },
          },
        },
      },
    });

    res.json({ success: true, data: tag });
  } catch (error) {
    next(error);
  }
};

export const createTag = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const tag = await prisma.tag.create({ data: req.body });
    res.status(201).json({ success: true, data: tag });
  } catch (error) {
    next(error);
  }
};

export const updateTag = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const tag = await prisma.tag.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: tag });
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.tag.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: '删除成功' });
  } catch (error) {
    next(error);
  }
};
