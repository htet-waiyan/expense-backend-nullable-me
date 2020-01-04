import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  isSystemCategory: { type: Boolean, default: false },
  tags: [String],
  colorLabel: { type: String, default: '#CDDC39' },
  icon: { type: String, default: 'start' },
}, { timestamps: true });

export default mongoose.model('Category', CategorySchema);
