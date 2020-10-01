const joi = require("@hapi/joi");

const productSchema = joi.object({
  itemName: joi.string().required().messages({
    "string.required": `"name"`,
  }),
  itemDiscript: joi.string().required().messages({
    "string.required": `"discript'`,
  }),
  itemPrice: joi.number().required().messages({
    "string.required": `"price'`,
  }),
  itemTopic: joi.string().required().messages({
    "string.required": `"topic'`,
  }),
  file: joi.string(),
});

const createProductSchema = (data) => {
  return productSchema.validateAsync(data, { abortEarly: false });
};

module.exports.createProductSchema = createProductSchema;
