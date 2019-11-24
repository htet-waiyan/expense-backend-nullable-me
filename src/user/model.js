import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { PREFER_LOGIN } from './enum';

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
    // required: true,
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
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: '{VALUE} already existed' });
export default mongoose.model('User', UserSchema);
