import { Router } from 'express';
import {
  create,
  totalIncome,
} from './controller';

const router = new Router();

router.post('/', create);
router.get('/total', totalIncome);

export default router;
