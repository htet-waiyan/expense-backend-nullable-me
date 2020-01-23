import { Router } from 'express';
import { register } from '../user/controller';

const router = new Router();

router.post('/', register);

export default router;
