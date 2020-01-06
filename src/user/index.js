import { Router } from 'express';
import { register, getUser } from './controller';
import service from './service';

const router = new Router();

router.post('/', register);
router.get('/', getUser);

export default router;
export const UserService = service;
