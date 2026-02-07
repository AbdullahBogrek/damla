import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  surname: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(50).required(),
  birthday: Joi.date(),
  gender: Joi.string(),
  phone: Joi.string().min(10).max(10),
  province: Joi.string(),
  district: Joi.string(),
  street: Joi.string().min(3),
  terms: Joi.bool(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).max(50).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
