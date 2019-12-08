import Expense from './model';
import BudgetService from '../budget/service';
import SavingService from '../saving/service';
import moment from 'moment';
import { businessError } from '../util';
import logger from '../logger';

export default class ExpenseService {
  constructor() {
    this.expense = Expense;
  }

  async recordNewExpense(pojo) {
    try {
      const budgetService = new BudgetService();
      const latestBudget = await budgetService.getLatestBudget(pojo.user);
      // TODO: to determine overspand
      if (!latestBudget) return businessError('No budget associated found');
      return this.expense.create(pojo);
    } catch (error) {
      throw error;
    }
  }

  async getExpensesDateRange(fromDate, toDate) {
    logger.info('Getting expenses from %d to %d', fromDate, toDate);
    return this.expense.find({
      $and: [
        { timestamp: { $gte: fromDate } },
        { timestamp: { $lte: toDate } },
      ],
    });
  }

  /**
   * 
   * @param {*} from - YYYY-MM-DD format
   * @param {*} to - YYYY-MM-DD format
   */
  async getMtdSummary(user) {
    try {
      const fromDate = moment().startOf('month').unix();
      const toDate = moment().endOf('month').unix();
      const savingService = new SavingService();
      const mtdExpenses = await this.getExpensesDateRange(fromDate, toDate);
      const latestSaving = await savingService.getLatestSaving(user);
      const expense = mtdExpenses.reduce((a, b) => a + b.amount, 0);
      return {
        saving: latestSaving.amount,
        expense,
        transactions: mtdExpenses,
      };
    } catch (error) {
      logger.error('Error getting MTD summary %j', error);
      throw error;
    }
  }
}
