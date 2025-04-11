import Joi from 'joi';
import { typeList } from '../constants/contacts.js';

export const createContactsSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.number().required(),
  email: Joi.string().min(3).max(20).email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .required()
    .min(3)
    .max(20)
    .valid(...typeList),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.number(),
  email: Joi.string().min(3).max(20).email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...typeList),
});
