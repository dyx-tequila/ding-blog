import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const createMessage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, email, content } = req.body;

    const message = await prisma.message.create({
      data: { name, email, content },
    });

    res.status(201).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};

export const approveMessage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const message = await prisma.message.update({
      where: { id: req.params.id },
      data: { status: 'approved' },
    });

    res.json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.message.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: '删除成功' });
  } catch (error) {
    next(error);
  }
};
