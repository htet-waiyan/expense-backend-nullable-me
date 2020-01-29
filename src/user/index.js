import { Router } from 'express';
import { register, getUser, patchUserProfile } from './controller';
import service from './service';

const router = new Router();

router.post('/', register);
router.get('/', getUser);
router.patch('/patch/:id', patchUserProfile);

export default router;
export const UserService = service;
