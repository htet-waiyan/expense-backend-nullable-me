import IncomeService from './service';
import { success } from '../util';

export const create = async (req, res, next) => {
  try {
    const service = new IncomeService();
    req.body.user = req.user;
    const data = await service.recordNewIncome(req.body);
    return success(res, 200, data);
  } catch (error) {
    return next(error);
  }
};

export const totalIncome = async (req, res, next) => {
  try {
    const service = new IncomeService();
    const data = await service.getTotalIncome(req.user);
    return success(res, 200, { totalIncome: data });
  } catch (error) {
    return next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const service = new IncomeService();
    const data = await service.getAllIncomes(req.user);
    return success(res, 200, { data });
  } catch (error) {
    return next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const service = new IncomeService();
    const data = await service.remove(req.params.id, req.user);
    return success(res, 200, data);
  } catch (error) {
    if (error.code === 2000) return res.status(400).json({ error });
    return next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const service = new IncomeService();
    const data = await service.update(req.params.id, req.body, req.user);
    return success(res, 200, data);
  } catch (error) {
    if (error.code === 2000) return res.status(400).json({ error });
    return next(error);
  }
};
