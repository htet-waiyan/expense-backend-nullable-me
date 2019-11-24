import { success, badRequest } from '../util';
import UserService from './service';

export const register = async (req, res, next) => {
  try {
    const service = new UserService();
    const data = await service.registerNewuser(req.body);
    return success(res, 200, data);
  } catch (error) {
    // TODO: handle biz or system error
    return next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const service = new UserService();
    const data = await service.getUserProfile(req.params.id);
    return success(res, 200, data);
  } catch (error) {
    return next(error);
  }
};

export const updateSalary = async (req, res, next) => {
  try {
    const service = new UserService();
    const salary = +req.params.salary;
    await service.defineSalaryIncome(req.params.id, salary);
    return success(res, 200, { ok: true, message: 'Successfully update the salary' });
  } catch (error) {
    if (error.code === 2000) return badRequest(res, 400, { message: error.message });
    return next(error);
  }
};
