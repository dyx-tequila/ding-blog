import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const getVisitStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Number(days));

    const analytics = await prisma.analytics.findMany({
      where: {
        date: { gte: startDate },
      },
      orderBy: { date: 'asc' },
    });

    res.json({ success: true, data: analytics });
  } catch (error) {
    next(error);
  }
};

export const getPageViewStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        viewCount: true,
      },
      orderBy: { viewCount: 'desc' },
      take: 10,
    });

    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const trackVisit = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { path } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.analytics.upsert({
      where: { date: today },
      create: {
        date: today,
        visits: 1,
        pageViews: 1,
      },
      update: {
        visits: { increment: 1 },
        pageViews: { increment: 1 },
      },
    });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
