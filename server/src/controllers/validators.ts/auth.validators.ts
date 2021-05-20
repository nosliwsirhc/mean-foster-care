import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()]{8,30}$'))
    .required(),
});

export const registerSchema = Joi.object({
  dateOfBirth: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  gender: Joi.string().required(),
  isActive: Joi.bool().required().default(true),
  jobTitle: Joi.string().required(),
  manager: Joi.string().required(),
  nameGiven: Joi.string().min(2).required(),
  nameMiddle: Joi.string(),
  nameFamily: Joi.string().min(2).required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()]{8,30}$'))
    .required(),
  passwordConfirm: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()]{8,30}$'))
    .equal(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
    }),
  picture: Joi.required(),
  roles: Joi.array().items(Joi.string()).required(),
});
