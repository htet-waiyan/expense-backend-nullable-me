import mongoose from 'mongoose';
import moment from 'moment';

const AllocationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  savingAmount: { type: Number, default: 0 },
  expenseAmount: { type: Number, default: 0 },
  timestamp: { type: Number, default: moment().unix() },
  period: { type: Number },
}, { timestamps: true });

export default mongoose.model('Allocation', AllocationSchema);
