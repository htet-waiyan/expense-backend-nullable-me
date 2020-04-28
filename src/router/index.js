import { Router } from 'express';
import user from '../user';
import budget from '../budget';
import category from '../category';
import expense from '../expense';
import income from '../income';
import allocation from '../allocation';
import registeration from '../register';
import logger from '../logger';
import {
  jwtAuthorize,
  clientAuthorize,
} from '../middleware';

const router = new Router();

router.get('/echo', (req, res) => {
  res.status(200).json({ message: 'Spllit API Server' });
});

router.use(clientAuthorize);
router.use('/register', registeration);
router.use('/user', jwtAuthorize, user);
router.use('/budget', jwtAuthorize, budget);
router.use('/category', jwtAuthorize, category);
router.use('/expense', jwtAuthorize, expense);
router.use('/income', jwtAuthorize, income);
router.use('/allocation', jwtAuthorize, allocation);

router.use((err, req, res) => {
  logger.error('Error in servicing request %j', err);
  res.sendStatus(500);
});

export default router;
