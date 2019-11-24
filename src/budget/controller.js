import BudgetService from './service';
import { success, badRequest } from '../util';

// expense budget for a particular month
export const defineBudget = async (req, res, next) => {
  try {
    const service = new BudgetService();
    const data = await service.defineBudget(req.body);
    return success(res, 200, data);
  } catch (error) {
    if (error.code === 2000) return badRequest(res, 400, { success: false, message: error.message });
    return next(error);
  }
};

export const latest = async (req, res, next) => {
  try {
    const service = new BudgetService();
    const data = await service.getLatestBudget(req.params.user, req.query.year);
    return success(res, 200, data);
  } catch (error) {
    if (error.code === 2000) {
      return badRequest(res, 400, { success: false, message: error.message });
    }
    return next(error);
  }
};
