import { Router } from 'express';
import user from '../user';
import budget from '../budget';
import saving from '../saving';
import category from '../category';
import logger from '../logger';

const router = new Router();

router.get('/echo', (req, res) => {
  res.status(200).json({ message: 'Hello World!!!' });
});

router.use('/user', user);
router.use('/budget', budget);
router.use('/saving', saving);
router.use('/category', category);

router.use((err, req, res) => {
  logger.error('Error in servicing request %j', err);
  res.sendStatus(500);
});

export default router;
