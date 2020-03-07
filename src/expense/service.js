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
        { expenseDate: { $gte: fromDate } },
        { expenseDate: { $lte: toDate } },
      ],
    }).populate('category')
      .sort({ timestamp: order });
    switch (groupBy) {
      case EXPENSES_LIST_GROUPBY.DATE: return this.groupExpensesByDate(expenseList);
      case EXPENSES_LIST_GROUPBY.CHART: return this.groupExpensesByChart(expenseList);
      case EXPENSES_LIST_GROUPBY.MONTH_YEAR: return this.groupExpensesByMonthYear(expenseList);
      default: return this.groupExpensesByCategory(expenseList);
    }
  }

  async groupExpensesByDate(expenses = []) {
    return expenses.reduce((group, curr) => {
      const date = `${curr.expenseDate}_`;
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

  async groupExpensesByMonthYear(expenses = []) {
    return expenses.reduce((group, curr) => {
      const date = moment(curr.timestamp, 'X').format('YYYYMM');
      if (!group[date]) {
        group[date] = curr.amount;
      } else {
        group[date] += curr.amount;
      }
      return group;
    }, {});
  }

  async getMtdSpend(user, from, to) {
    const expenseList = await this.expense.find({
      user,
      $and: [
        { expenseDate: { $gte: from } },
        { expenseDate: { $lte: to } },
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
    logger.info('Getting expense from %s to %s ', from, to);
    try {
      let fromDate = +moment().startOf('month').format('YYYYMMDD');
      let toDate = +moment().endOf('month').format('YYYYMMDD');
      if (from) {
        fromDate = +moment(from, 'YYYYMM').startOf('month').format('YYYYMMDD');
      }
      if (to) {
        toDate = +moment(to, 'YYYYMM').endOf('month').format('YYYYMMDD');
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

  async remove(id) {
    return this.expense.findByIdAndRemove(id);
  }
}
