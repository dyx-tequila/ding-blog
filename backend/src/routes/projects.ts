import { Router } from 'express';
import * as projectController from '../controllers/projects';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', projectController.getProjects);
router.get('/featured', projectController.getFeaturedProjects);
router.get('/slug/:slug', projectController.getProjectBySlug);
router.get('/:id', projectController.getProjectById);

router.post('/', authenticate, authorize('admin'), projectController.createProject);
router.put('/:id', authenticate, authorize('admin'), projectController.updateProject);
router.delete('/:id', authenticate, authorize('admin'), projectController.deleteProject);

export default router;
