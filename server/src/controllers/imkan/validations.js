import Joi from 'joi';

const ImkanSchema = Joi.object({
  title: Joi.string().required(),
  kind: Joi.string().required(),
  description: Joi.string().required(),
  fromWho: Joi.string().required(),
  phone: Joi.string().min(10).max(10),
  email: Joi.string().email().required(),
  province: Joi.string().required(),
  district: Joi.string().required(),
  street: Joi.string().required(),
  positions: Joi.object()
});

export default ImkanSchema;