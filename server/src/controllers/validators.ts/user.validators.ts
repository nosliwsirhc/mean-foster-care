import Joi from 'joi';

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().length(8).required(),
  newPassword: Joi.string().pattern(
    new RegExp('^[a-zA-Z0-9!@#$%^&*()]{8,30}$')
  ),
  newPasswordConfirm: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()]{8,30}$'))
    .equal(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
    }),
});
