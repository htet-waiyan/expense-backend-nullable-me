import { Router } from 'express';
import {
  record,
  mtdList,
} from './controller';

const router = new Router();

router.post('/', record);
router.get('/mtd', mtdList);

export default router;
