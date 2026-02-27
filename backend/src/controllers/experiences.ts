import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const getExperiences = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ startDate: 'desc' }],
    });

    res.json({ success: true, data: experiences });
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const experience = await prisma.experience.create({ data: req.body });
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const experience = await prisma.experience.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.experience.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: '删除成功' });
  } catch (error) {
    next(error);
  }
};
