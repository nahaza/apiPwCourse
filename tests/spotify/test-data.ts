import Joi from "joi";

export const schema = Joi.object({
  href: Joi.string().required(),
  limit: Joi.number().required(),
  next: Joi.string().allow(null),
  offset: Joi.number().required(),
  previous: Joi.string().allow(null),
  total: Joi.number().required(),
  items: Joi.array().required(),
});

export const schemaHeaders = Joi.object({
  "content-type": Joi.string().required(),
  "cache-control": Joi.string().required(),
  etag: Joi.string().required(),
  vary: Joi.string().required(),
  "x-robots-tag": Joi.string().required(),
  "access-control-allow-origin": Joi.string().required(),
  "access-control-allow-headers": Joi.string().required(),
  "access-control-allow-methods": Joi.string().required(),
  "access-control-allow-credentials": Joi.string().required(),
  "access-control-max-age": Joi.string().required(),
  "content-encoding": Joi.string().required(),
  "strict-transport-security": Joi.string().required(),
  "x-content-type-options": Joi.string().required(),
  "alt-svc": Joi.string().required(),
  date: Joi.date().required(),
  server: Joi.string().required(),
  via: Joi.string().required(),
  "transfer-encoding": Joi.string().required(),
});
