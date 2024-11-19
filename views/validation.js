const Joi = require('joi');

const authSchema = {
    body:Joi.object().keys({
        title: Joi.string().required().messages({
            "string.base": "Title must be a string.",
            "any.required": "Title is required."
        }),
        author: Joi.string().required().messages({
            "string.base": "Author must be a string.",
            "any.required": "Author is required."
        }),
        description: Joi.string().optional(),
        published_year: Joi.number().required().messages({
            "number.base": "Published Year must be a number.",
            "any.required": "Published Year is required."
        }),
        genre: Joi.string().required().messages({
            "string.base": "Genre must be a string.",
            "any.required": "Genre is required."
        })
    })};

const pick = (object, keys) => {
  return keys.reduce((result, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      result[key] = object[key];
    }
    return result;
  }, {});
};


const validate = (authSchema) => (req, res, next) => {
  const validSchema = pick(authSchema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return res.status(400).json({ error: errorMessage });
  }
  Object.assign(req, value);
  return next();
};


    
module.exports= {
    authSchema, validate
}
