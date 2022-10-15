import { Router } from 'express';
import images from './images';

const router = Router();

router.use('/images', images.route);

export default router;
