import { Router } from 'express';
import {
  create,
  totalIncome,
  getAll,
  remove,
} from './controller';

const router = new Router();

router.post('/', create);
router.get('/total', totalIncome);
router.get('/', getAll);
router.delete('/:id', remove);

export default router;
