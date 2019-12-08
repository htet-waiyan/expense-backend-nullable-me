import ExpenseService from './service';
import { success } from '../util';

export const record = async (req, res, next) => {
  try {
    const service = new ExpenseService();
    req.body.user = req.user;
    const data = await service.recordNewExpense(req.body);
    return success(res, 200, { success: true, data });
  } catch (error) {
    if (error.code === 2000) {
      return res.status(400).json({ message: error.message });
    }
    return next(error);
  }
};

export const mtdList = async (req, res, next) => {
  try {
    const service = new ExpenseService();
    const data = await service.getMtdSummary(req.user);
    return success(res, 200, { success: true, data });
  } catch (error) {
    if (error.code === 2000) {
      return res.status(400).json({ message: error.message });
    }
    return next(error);
  }
}

export const remove = async (req, res, next) => {};
