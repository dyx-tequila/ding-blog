import { Router } from 'express';
import * as messageController from '../controllers/messages';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.post('/', messageController.createMessage);
router.get('/', authenticate, authorize('admin'), messageController.getMessages);
router.put('/:id/approve', authenticate, authorize('admin'), messageController.approveMessage);
router.delete('/:id', authenticate, authorize('admin'), messageController.deleteMessage);

export default router;
