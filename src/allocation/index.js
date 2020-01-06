import { Router } from 'express';
import {
  create,
  getByMonths
} from './controller';

const router = new Router();

router.post('/', create);
router.get('/', getByMonths);


export default router;
