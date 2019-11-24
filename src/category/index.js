import { Router } from 'express';
import { create, fetchAll, count } from './controller';

const router = new Router();

router.post('/', create);
router.get('/', fetchAll);
router.get('/count', count);

export default router;
