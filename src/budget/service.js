import mongoose from 'mongoose';
import logger from '../logger';
import Budget from './model';
import { UserService } from '../user';
import { businessError } from '../util';

export default class BudgetService {
  constructor() {
    this.budget = Budget;
  }

  async defineBudget(budgetPojo) {
    try {
      const userService = new UserService();
      const salary = await userService.getSalary(budgetPojo.user);
      if (+budgetPojo.amount > +salary) return businessError('Budget is more than salary defined');
      const existingBudget = await this.budget.findOne({
        user: mongoose.Types.ObjectId(budgetPojo.user),
        budgetYear: +budgetPojo.budgetYear,
      });
      if (existingBudget) return businessError('Budget for this month already defined');
      return this.budget.create(budgetPojo);
    } catch (error) {
      throw error;
    }
  }

  async getLatestBudget(user, budgetYear) {
    logger.info('Getting latest budget for %s %s', user, budgetYear);
    try {
      const query = { user };
      if (budgetYear) {
        query.budgetYear = budgetYear;
      }
      const budgetList = await this.budget.find(query)
        .sort({ budgetYear: 'desc' });
      return budgetList[0];
    } catch (error) {
      throw error;
    }
  }
}
