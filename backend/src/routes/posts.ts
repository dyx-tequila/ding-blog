import { Router } from 'express';
import * as postController from '../controllers/posts';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', postController.getPosts);
router.get('/featured', postController.getFeaturedPosts);
router.get('/search', postController.searchPosts);
router.get('/slug/:slug', postController.getPostBySlug);
router.get('/:id', postController.getPostById);

// 需要认证的路由
router.post('/', authenticate, authorize('admin'), postController.createPost);
router.put('/:id', authenticate, authorize('admin'), postController.updatePost);
router.delete('/:id', authenticate, authorize('admin'), postController.deletePost);

export default router;
