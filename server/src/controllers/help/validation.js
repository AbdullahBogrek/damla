import Joi from 'joi';

const HelpSchema = Joi.object({
  help: Joi.string().required(),
  title: Joi.string().required(),
  province: Joi.string().required(),
  district: Joi.string().required(),
  street: Joi.string().required(),
  description: Joi.string().min(3),
  photos: Joi.string().required(),
});

export default HelpSchema;