import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const getSkills = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });

    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const skill = await prisma.skill.create({ data: req.body });
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const skill = await prisma.skill.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.skill.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: '删除成功' });
  } catch (error) {
    next(error);
  }
};
