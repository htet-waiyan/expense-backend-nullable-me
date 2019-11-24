import { Router } from 'express';
import { create, fetchAll } from './controller';

const router = new Router();

router.post('/', create);
router.get('/', fetchAll);

export default router;
