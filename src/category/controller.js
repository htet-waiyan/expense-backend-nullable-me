import CategoryService from './service';
import { success, badRequest } from '../util';

export const fetchAll = async (req, res, next) => {
  try {
    const service = new CategoryService();
    const query = { $or: [{ isSystemCategory: true }, { user: req.user }] };
    const data = await service.getAllCategories(query);
    return success(res, 200, data);
  } catch (error) {
    if (error.code === 2000) return badRequest(res, 400, { success: false, message: error.message });
    return next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const service = new CategoryService();
    const data = await service.createNew(req.body);
    return success(res, 200, data);
  } catch (error) {
    if (error.code === 2000) return badRequest(res, 400, { success: false, message: error.message });
    return next(error);
  }
};

export const count = async (req, res, next) => {
  try {
    const service = new CategoryService();
    const nameCount = await service.getCountByName(req.query.name);
    return success(res, 200, { count: nameCount });
  } catch (error) {
    if (error.code === 2000) return badRequest(res, 400, { success: false, message: error.message });
    return next(error);
  }
};
