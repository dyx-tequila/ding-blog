import { Router } from 'express';
import * as skillController from '../controllers/skills';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', skillController.getSkills);

router.post('/', authenticate, authorize('admin'), skillController.createSkill);
router.put('/:id', authenticate, authorize('admin'), skillController.updateSkill);
router.delete('/:id', authenticate, authorize('admin'), skillController.deleteSkill);

export default router;
