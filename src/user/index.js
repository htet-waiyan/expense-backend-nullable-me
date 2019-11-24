import { Router } from 'express';
import { register, getUser, updateSalary } from './controller';
import service from './service';

const router = new Router();

router.post('/', register);
router.get('/:id', getUser);
router.patch('/:id/:salary', updateSalary);

export default router;
export const UserService = service;
