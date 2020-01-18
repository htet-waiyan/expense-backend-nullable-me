import { Router } from 'express';
import {
  create,
  totalIncome,
  getAll,
  remove,
  update,
} from './controller';

const router = new Router();

router.post('/', create);
router.get('/total', totalIncome);
router.get('/', getAll);
router.delete('/:id', remove);
router.put('/:id', update);

export default router;
