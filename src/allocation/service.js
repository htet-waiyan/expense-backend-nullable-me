/* eslint-disable no-param-reassign */
import moment from 'moment';
import Allocation from './model';
import IncomeService from '../income/service';
import { businessError } from '../util';
import logger from '../logger';

// TODO: call this allocation
export default class SavingService {
  constructor() {
    this.allocation = Allocation;
  }

  async allocateIncomes(allocation) {
    try {
      const service = new IncomeService();
      const totalIncome = await service.getTotalIncome(allocation.user);
      if ((allocation.saving + allocation.expense) < totalIncome) {
        return businessError('Saving and expense allocation is more than your monthly total income');
      }
      allocation.period = +(moment().format('YYYYMM'));
      return this.allocation.create(allocation);
    } catch (error) {
      throw error;
    }
  }

  async getLatestAllocation(query) {
    const allAllocations = await this.allocation.find(query).sort({ timestamp: -1 }).limit(1);
    return allAllocations[0];
  }
}