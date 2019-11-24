import SavingService from './service';
import { success } from '../util';

export const create = async (req, res, next) => {
  try {
    const service = new SavingService();
    const data = await service.defineSaving(req.body);
    return success(res, 200, data);
  } catch (error) {
    return next(error);
  }
}

export const update = async (req, res, next) => {}
