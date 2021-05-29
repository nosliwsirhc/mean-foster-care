import Joi from 'joi'
import { IUser } from '../../models/user.model'

export const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()]{8,30}$'))
    .required(),
})

export const registerSchema = Joi.object<IUser>({
  dateOfBirth: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  gender: Joi.string().required(),
  isActive: Joi.bool().required().default(true),
  isManager: Joi.bool().required().default(false),
  jobTitle: Joi.string().required(),
  manager: Joi.string().required(),
  nameGiven: Joi.string().min(2).required(),
  nameMiddle: Joi.string().allow(null, ''),
  nameFamily: Joi.string().min(2).required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()]{8,30}$'))
    .required(),
  picture: Joi.required(),
  roles: Joi.array().items(Joi.string()).required(),
})
