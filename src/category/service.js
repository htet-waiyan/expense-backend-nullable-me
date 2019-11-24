import Category from './model';
import { businessError } from '../util';

export default class CategoryService {
  constructor() {
    this.category = Category;
  }

  getAllCategories(query = {}) {
    return this.category.find(query);
  }

  async createNew(pojo) {
    try {
      const count = await this.getCountByName(pojo.title);
      if (count > 0) return businessError('Category name is taken');

      return this.category.create(pojo);
    } catch (error) {
      throw error;
    }
  }

  getCountByName(title) {
    return this.category.count({ title });
  }
}
