import { Router } from 'express';
import * as categoryController from '../controllers/categories';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', categoryController.getCategories);
router.get('/slug/:slug', categoryController.getCategoryBySlug);
router.get('/:id', categoryController.getCategoryById);

router.post('/', authenticate, authorize('admin'), categoryController.createCategory);
router.put('/:id', authenticate, authorize('admin'), categoryController.updateCategory);
router.delete('/:id', authenticate, authorize('admin'), categoryController.deleteCategory);

export default router;
