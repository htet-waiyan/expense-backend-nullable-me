import Saving from './model';
import { UserService } from '../user';
import { BudgetService } from '../budget';
import { businessError } from '../util';

export default class SavingService {
  constructor() {
    this.saving = Saving;
  }

  async defineSaving(saving) {
    try {
      const userService = new UserService();
      const salary = await userService.getSalary(saving.user);
      const budgetService = new BudgetService();
      const budget = await budgetService.getLatestBudget(saving.user);
      let budgetAmount = 0;
      if (budget) { budgetAmount = +budget.amount || 0; }
      if ((budgetAmount + +saving.amount) > salary) return businessError('Saving amount is more than remaining of salary');
      return this.saving.create(saving);
    } catch (error) {
      throw error;
    }
  }

  async getLatestSaving(user, savingYear) {
    const query = { user };
    if (savingYear) {
      query.savingYear = savingYear;
      return this.saving.findOne(query);
    }
    const savings = await this.saving.find().sort({ savingYear: 'desc' });
    return savings[0];
  }
}
