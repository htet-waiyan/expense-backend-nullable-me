import mongoose from 'mongoose';
import moment from 'moment';

const IncomeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  amount: { type: Number, default: 0 },
  timestamp: { type: Number, default: moment().unix() },
}, { timestamps: true });

export default mongoose.model('Income', IncomeSchema);
