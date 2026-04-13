import Joi from "joi";

export const orderSchema = Joi.object({
  paymentMethod: Joi.string()
    .valid("COD", "Stripe", "JazzCash", "EasyPaisa")
    .default("COD"),

  shippingAddress: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.string().allow("", null),
    country: Joi.string().default("Pakistan"),
  }).required(),
});