import Joi from "joi";

export const productSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    images:Joi.array().items(Joi.string()).required(),
    category: Joi.string().required(),
    stock: Joi.number().required(),
    rating: Joi.number().default(0),
})