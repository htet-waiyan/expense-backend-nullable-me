import mongoose from 'mongoose';
import moment from 'moment';

const AllocationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  savingAmount: { type: Number, default: 0 },
  expenseAmount: { type: Number, default: 0 },
  timestamp: { type: Number },
  period: { type: Number },
}, { timestamps: true });

AllocationSchema.pre('save', function (next) {
  this.timestamp = moment().unix();
  next();
});

export default mongoose.model('Allocation', AllocationSchema);
