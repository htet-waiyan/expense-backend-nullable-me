import User from './model';
import logger from '../logger';
import { businessError } from '../util';

export default class UserService {
  constructor() {
    this.user = User;
  }

  async registerNewuser(userPojo) {
    try {
      logger.info('Registering new user %j', userPojo);
      return this.user.create(userPojo);
    } catch (error) {
      throw error;
    }
  }

  async getUserProfile(id) {
    try {
      return this.user.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async defineSalaryIncome(id, salary = 0) {
    try {
      const foundUser = await this.getUserProfile(id);
      if (salary < 0) return businessError('Salary cannot be less than 0');
      foundUser.salary = salary;
      return foundUser.save();
    } catch (error) {
      logger.error('Error in updating salary income %j', error);
      throw error;
    }
  }

  async getSalary(id) {
    try {
      const user = await this.getUserProfile(id);
      return user.salary;
    } catch (err) {
      throw err;
    }
  }
}
