const Joi = require("joi")

const baseSchema = {
    name: Joi.string().min(2).max(10).required(),
    code: Joi.string().regex(/^[a-zA-Z]+[0-9]+$/).message("invalid course code"),
    description: Joi.string(),
}

const addCourseSchema =Joi.object({
    ...baseSchema
});

module.exports = {
    addCourseSchema,
}