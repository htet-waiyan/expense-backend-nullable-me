import mongoose from 'mongoose';
import moment from 'moment';

const ExpenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  description: { type: String, trim: true },
  tags: [{ type: String }],
  // to determine with which budget scheme this expense is associate with
  // auto select latest budget scheme
  budget: { type: mongoose.Schema.Types.ObjectId, ref: 'Budget' },
  allocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Allocation' },
  isOverSpend: { type: Boolean, default: false },
  timestamp: { type: Number, default: moment().unix() },
  expenseDate: { type: Number },
}, { timestamps: true });

export default mongoose.model('Expense', ExpenseSchema);
