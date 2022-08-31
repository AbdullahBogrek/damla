import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  surname: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{7,20}$'), "Şifreniz en az 8 karakterden oluşmalı ve harf ile başlamalıdır."),
  birthday: Joi.date(),
  gender: Joi.string(),
  phone: Joi.string().min(10).max(10),
  province: Joi.string(),
  district: Joi.string(),
  street: Joi.string().min(3),
  terms: Joi.bool(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{7,20}$'), "Şifreniz en az 8 karakterden oluşmalıdır.")
    .required(),
});

module.exports = {
  registerSchema,
  loginSchema
}

// name: Joi.string().min(2).required(),
// surname: Joi.string().min(2).required(),
// birthday: Joi.date().required(),
// gender: Joi.string().required(),
// phone: Joi.string().min(10).max(10).required(),
// province: Joi.string().required(),
// district: Joi.string().required(),
// street: Joi.string().min(3).required(),
// terms: Joi.bool().required(),

// name: Joi.string()
// .min(3)
// .max(30)
// .required(),
// surname: Joi.string()
// .min(3)
// .max(30)
// .required(),
// email: Joi.string()
// .email()
// .required(),
// password: Joi.string()
// .pattern(new RegExp('^[a-zA-Z0-9]{7,20}$'), "Şifreniz en az 8 karakterden oluşmalı ve harf ile başlamalıdır."),
// birthday: Joi.date(),
// gender: Joi.string(),
// phone: Joi.string().min(10).max(10),
// province: Joi.string(),
// district: Joi.string(),
// street: Joi.string().min(3),
// terms: Joi.bool(),
