import mongoose from 'mongoose';
import Income from './model';
import { businessError } from '../util';

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
}
