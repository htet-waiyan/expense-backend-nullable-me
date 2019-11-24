import mongoose from 'mongoose';
import moment from 'moment';

const BudgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, default: 0 },
  timestamp: { type: Number, default: moment().unix() },
  budgetYear: { type: Number },
}, { timestamps: true });

export default mongoose.model('Budget', BudgetSchema);
