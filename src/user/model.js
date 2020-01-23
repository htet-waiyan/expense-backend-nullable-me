import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { PREFER_LOGIN, BASE_CURRENCY } from './enum';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: { // TODO: add unique validator
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  countryCode: {
    type: String,
  },
  phone: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
    default: 0,
  },
  dateOfBirth: {
    type: Date,
  },
  lastLogin: {
    type: Date,
  },
  preferLogin: {
    type: String,
    enum: Object.keys(PREFER_LOGIN),
    default: PREFER_LOGIN.EMAIL,
  },
  baseCurrency: {
    type: String,
    enum: Object.keys(BASE_CURRENCY),
    default: BASE_CURRENCY.SGD,
  },
  googleId: String,
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: '{VALUE} already existed' });
export default mongoose.model('User', UserSchema);
