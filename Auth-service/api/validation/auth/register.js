const joi = require("joi");

const registerSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().valid("admin", "user").default("user"),
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

module.exports = {
    registerSchema,
    loginSchema,
};
