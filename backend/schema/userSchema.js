import Joi from "joi" 
export const registerSchema={
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    role:Joi.string().valid("user","admin").default("user"),
    image:Joi.string().optional()
}

export const loginSchema={
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
}   
