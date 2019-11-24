import { Router } from 'express';
import { defineBudget, latest } from './controller';
import service from './service';

const router = new Router();

router.post('/', defineBudget);
router.get('/latest/:user', latest);

export default router;
export const BudgetService = service;
