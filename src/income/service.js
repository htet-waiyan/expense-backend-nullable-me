/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// TODO: fix circular dependencies
import mongoose from 'mongoose';
import Income from './model';
import AllocationService from '../allocation/service';
import { businessError, BIZ_ERROR_CODES } from '../util';

export default class SavingService {
  constructor() {
    this.income = Income;
  }

  async recordNewIncome(income) {
    try {
      if (!income.title) {
        return businessError('Title is required');
      }
      if (income.amount <= 0) {
        return businessError('Invalid income amount');
      }
      return this.income.create(income);
    } catch (error) {
      throw error;
    }
  }

  async getTotalIncome(user) {
    const aggregate = await this.income.aggregate([
      { $match: { user: mongoose.Types.ObjectId(user) } },
      {
        $group: {
          _id: '',
          totalIncome: { $sum: '$amount' },
        },
      },
    ]);

    if (aggregate && aggregate.length > 0) {
      return aggregate[0].totalIncome;
    }

    return 0;
  }

  async getAllIncomes(user) {
    return this.income.find({ user }).lean();
  }

  async remove(id, user) {
    try {
      const allocationService = new AllocationService();
      const removingIncome = await this.income.findById(id);
      const latestAllocation = await allocationService.getLatestAllocation({ user });
      const totalIncome = await this.getTotalIncome(user);
      if (latestAllocation.expenseAmount > (totalIncome - removingIncome.amount)) {
        return businessError('Expense allocation is more than new total income', BIZ_ERROR_CODES.EXPENSE_MORE_THAN_INCOME);
      }
      return this.income.findByIdAndRemove(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id, newIncome, user) {
    try {
      const allocationService = new AllocationService();
      const latestAllocation = await allocationService.getLatestAllocation({ user });
      const allIncomes = await this.getAllIncomes(user);
      const totalIncome = allIncomes.map((income) => {
        if (income._id.toString() === newIncome._id) {
          income.amount = newIncome.amount;
        }
        return income;
      }).reduce((a, b) => a + b.amount, 0);
      if (latestAllocation.expenseAmount > totalIncome) {
        return businessError('Expense allocation is more than new total income', BIZ_ERROR_CODES.EXPENSE_MORE_THAN_INCOME);
      }
      return this.income.findByIdAndUpdate(id, newIncome, { lean: true });
    } catch (error) {
      throw error;
    }
  }
}
