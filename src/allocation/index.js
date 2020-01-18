import { Router } from 'express';
import {
  create,
  update,
  getByMonths,
} from './controller';

const router = new Router();

router.post('/', create);
router.get('/', getByMonths);
router.put('/:id', update);

export default router;
