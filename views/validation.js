const Joi = require('joi');

const authSchema = Joi.object({
    title: Joi.string().required().messages({
        "string.base": "Title must be a string.",
        "any.required": "Title is required."
    }),
    author: Joi.string().required().messages({
        "string.base": "Author must be a string.",
        "any.required": "Author is required."
    }),
    description: Joi.string().optional(),
    publishing_year: Joi.number().required().messages({
        "number.base": "Published Year must be a number.",
        "any.required": "Published Year is required."
    }),
    genre: Joi.string().required().messages({
        "string.base": "Genre must be a string.",
        "any.required": "Genre is required."
    })
});

module.exports= {
    authSchema
}
