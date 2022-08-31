import Joi from 'joi';

const TalepSchema = Joi.object({
  title: Joi.string().required(),
  kind: Joi.string().required(),
  description: Joi.string().required(),
  job: Joi.string().required(),
  income: Joi.string().required(),
  phone: Joi.string().min(10).max(10),
  email: Joi.string().email().required(),
  province: Joi.string().required(),
  district: Joi.string().required(),
  street: Joi.string().required(),
  positions: Joi.object()
});

export default TalepSchema;