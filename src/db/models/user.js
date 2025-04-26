import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';
import { authRegexp } from '../../constants/auth.js';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, match: authRegexp, unique: true },
    password: { type: String, required: true },
    verify: { type: Boolean, default: false, required: true },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', setUpdateSettings);
userSchema.post('findOneAndUpdate', handleSaveError);

export const UsersCollection = model('user', userSchema);
