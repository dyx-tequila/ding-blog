import { Router } from 'express';
import * as experienceController from '../controllers/experiences';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', experienceController.getExperiences);

router.post('/', authenticate, authorize('admin'), experienceController.createExperience);
router.put('/:id', authenticate, authorize('admin'), experienceController.updateExperience);
router.delete('/:id', authenticate, authorize('admin'), experienceController.deleteExperience);

export default router;
