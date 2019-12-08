import { Router } from 'express';
import {
  record,
  mtdList,
  remove,
} from './controller';

const router = new Router();

router.post('/', record);
router.get('/mtd', mtdList);
router.delete('/:id', remove);

export default router;
