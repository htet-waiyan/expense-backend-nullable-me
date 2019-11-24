import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  isSystemCategory: { type: Boolean, default: false },
  colorLabel: { type: String, default: '#CDDC39' },
  icon: String,
}, { timestamps: true });

export default mongoose.model('Category', CategorySchema);
