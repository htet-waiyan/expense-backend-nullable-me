/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import Expense from './model';
import AllocationService from '../allocation/service';
import moment from 'moment';
import { businessError } from '../util';
import logger from '../logger';
import { EXPENSES_LIST_GROUPBY } from './enum';

export default class ExpenseService {
  constructor() {
    this.expense = Expense;
  }

  async recordNewExpense(pojo) {
    try {
      const budgetService = new AllocationService();
      const latestAllocation = await budgetService.getLatestAllocation({ user: pojo.user });
      // TODO: to determine overspand
      if (!latestAllocation) return businessError('No budget associated found');
      // eslint-disable-next-line no-underscore-dangle
      pojo.allocation = latestAllocation._id;
      return this.expense.create(pojo);
    } catch (error) {
      throw error;
    }
  }

  async getExpensesDateRange(user, fromDate, toDate, order, groupBy = EXPENSES_LIST_GROUPBY.DATE) {
    logger.info('Getting expenses from %d to %d', fromDate, toDate);
    const expenseList = await this.expense.find({
      user,
      $and: [
        { timestamp: { $gte: fromDate } },
        { timestamp: { $lte: toDate } },
      ],
    }).populate('category')
      .sort({ timestamp: order });
    if (groupBy === EXPENSES_LIST_GROUPBY.DATE) {
      return this.groupExpensesByDate(expenseList);
    }
    if (groupBy === EXPENSES_LIST_GROUPBY.CHART) {
      return this.groupExpensesByChart(expenseList);
    }
    return this.groupExpensesByCategory(expenseList);
  }

  async groupExpensesByDate(expenses = []) {
    return expenses.reduce((group, curr) => {
      const date = moment(curr.timestamp, 'X').format('YYYYMMDD');
      const groupByDate = group[date] || [];
      groupByDate.push(curr);
      group[date] = groupByDate;
      return group;
    }, {});
  }

  async groupExpensesByCategory(expenses = []) {
    return expenses.reduce((group, curr) => {
      if (!group[curr.category.title]) {
        group[curr.category.title] = curr.amount;
      } else {
        group[curr.category.title] += curr.amount;
      }
      return group;
    }, {});
  }

  async groupExpensesByChart(expenses = []) {
    return expenses.reduce((group, curr) => {
      if (!group[curr.category.title]) {
        group[curr.category.title] = curr;
      } else {
        group[curr.category.title].amount += curr.amount;
      }
      return group;
    }, {});
  }

  async getMtdSpend(user, from, to) {
    const expenseList = await this.expense.find({
      user,
      $and: [
        { timestamp: { $gte: from } },
        { timestamp: { $lte: to } },
      ],
    });
    return expenseList.reduce((a, b) => a + b.amount, 0);
  }

  /**
   * 
   * @param {*} from - YYYY-MM-DD format
   * @param {*} to - YYYY-MM-DD format
   */
  async getMtdSummary(user, from, to, groupBy) {
    try {
      let fromDate = moment().startOf('month').unix();
      let toDate = moment().endOf('month').unix();
      if (from) {
        fromDate = moment(from, 'YYYYMM').startOf('month').unix();
      }
      if (to) {
        toDate = moment(from, 'YYYYMM').endOf('month').unix();
      }
      const allocationService = new AllocationService();
      const mtdExpenses = await this.getExpensesDateRange(user, fromDate, toDate, -1, groupBy);
      const allocation = await allocationService.getLatestAllocation({ user, period: { $lte: from || +moment().format('YYYYMM') } });
      const expense = await this.getMtdSpend(user, fromDate, toDate);
      return {
        saving: (allocation || {}).savingAmount || 0,
        expense: (allocation || {}).expenseAmount || 0,
        totalSpend: expense,
        transactions: mtdExpenses,
      };
    } catch (error) {
      logger.error('Error getting MTD summary %j', error);
      throw error;
    }
  }
}
