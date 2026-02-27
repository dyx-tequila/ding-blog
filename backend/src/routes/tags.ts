import { Router } from 'express';
import * as tagController from '../controllers/tags';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', tagController.getTags);
router.get('/:id', tagController.getTagById);

router.post('/', authenticate, authorize('admin'), tagController.createTag);
router.put('/:id', authenticate, authorize('admin'), tagController.updateTag);
router.delete('/:id', authenticate, authorize('admin'), tagController.deleteTag);

export default router;
