import { Router } from 'express';
import user from '../user';
import budget from '../budget';
import category from '../category';
import expense from '../expense';
import income from '../income';
import allocation from '../allocation';

import logger from '../logger';
import {
  jwtAuthorize,
} from '../middleware';

const router = new Router();

router.get('/echo', (req, res) => {
  res.status(200).json({ message: 'Hello World!!!' });
});

router.use('/user', jwtAuthorize, user);
router.use('/budget', budget);
router.use('/category', category);
router.use('/expense', jwtAuthorize, expense);
router.use('/income', jwtAuthorize, income);
router.use('/allocation', jwtAuthorize, allocation);

router.use((err, req, res) => {
  logger.error('Error in servicing request %j', err);
  res.sendStatus(500);
});

export default router;
