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

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
