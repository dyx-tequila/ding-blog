import { Router } from 'express';
import * as analyticsController from '../controllers/analytics';

const router = Router();

router.get('/visits', analyticsController.getVisitStats);
router.get('/page-views', analyticsController.getPageViewStats);
router.post('/track', analyticsController.trackVisit);

export default router;
