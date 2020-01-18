import SavingService from './service';
import { success } from '../util';

export const create = async (req, res, next) => {
  try {
    const service = new SavingService();
    req.body.user = req.user;
    const data = await service.allocateIncomes(req.body);
    return success(res, 200, data);
  } catch (error) {
    if (error.code === 2000) return res.status(401).json({ message: error.message });
    return next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const service = new SavingService();
    const data = await service.updateAllocation(req.params.id, req.body);
    return success(res, 200, data);
  } catch (error) {
    if (error.code === 2000) return res.status(401).json({ message: error.message });
    return next(error);
  }
}

export const getByMonths = async (req, res, next) => {
  try {
    const service = new SavingService();
    req.body.user = req.user;
    const data = await service.getAllocationMaps({ user: req.user });
    return success(res, 200, data);
  } catch (error) {
    if (error.code === 2000) return res.status(401).json({ message: error.message });
    return next(error);
  }
};
