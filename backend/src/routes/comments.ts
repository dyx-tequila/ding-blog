import { Router } from 'express';
import * as commentController from '../controllers/comments';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', commentController.getComments);
router.post('/', commentController.createComment);

router.put('/:id/approve', authenticate, authorize('admin'), commentController.approveComment);
router.delete('/:id', authenticate, authorize('admin'), commentController.deleteComment);

export default router;
