import mongoose from 'mongoose';
import moment from 'moment';

const SavingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, default: 0 },
  timestamp: { type: Number, default: moment().unix() },
  savingYear: { type: Number },
}, { timestamps: true });

SavingSchema.pre('save', function () {
  this.savingYear = +moment().format('YYYYMM');
});

export default mongoose.model('Saving', SavingSchema);
