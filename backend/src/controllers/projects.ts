import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const getProjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ featured: 'desc' }, { order: 'asc' }],
    });

    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: 'asc' },
    });

    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: req.params.slug },
    });

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
    });

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await prisma.project.create({ data: req.body });
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: '删除成功' });
  } catch (error) {
    next(error);
  }
};
