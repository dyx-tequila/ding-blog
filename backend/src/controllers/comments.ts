import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';

export const getComments = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { postId, status } = req.query;

    const comments = await prisma.comment.findMany({
      where: {
        ...(postId && { postId: postId as string }),
        ...(status && { status: status as string }),
        parentId: null,
      },
      include: {
        author: { select: { id: true, username: true, avatar: true } },
        replies: {
          include: {
            author: { select: { id: true, username: true, avatar: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { content, postId, parentId } = req.body;

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        parentId,
        authorId: req.user?.id,
        status: 'pending',
      },
      include: {
        author: { select: { id: true, username: true, avatar: true } },
      },
    });

    // 更新文章评论数
    await prisma.post.update({
      where: { id: postId },
      data: { commentCount: { increment: 1 } },
    });

    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

export const approveComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const comment = await prisma.comment.update({
      where: { id: req.params.id },
      data: { status: 'approved' },
    });

    res.json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.comment.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: '删除成功' });
  } catch (error) {
    next(error);
  }
};
