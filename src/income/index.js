import { Router } from 'express';
import {
  create,
  totalIncome,
  getAll,
} from './controller';

const router = new Router();

router.post('/', create);
router.get('/total', totalIncome);
router.get('/', getAll);

export default router;
