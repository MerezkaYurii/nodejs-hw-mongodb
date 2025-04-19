import Joi from 'joi';
import { authRegexp } from '../constants/auth.js';

export const authRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(authRegexp).required(),
  password: Joi.string().required(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(authRegexp).required(),
  password: Joi.string().required(),
});
