const joi = require("joi");
const regValidationErr = require("./registerValidationErrors");

const registerValidation = (body) => {
  const validationSchema = joi.object({
    username: joi.string().min(6).required().messages({
      "string.min": "username must be atleast 6 characters long",
      "any.required": "username is required",
    }),
    email: joi.string().required().min(6).email().messages({
      "string.min": "email must be atleast 6 characters long",
      "string.email": "Please, enter a valid email",
      "any.required": "username is required",
    }),
    password: joi.string().required().min(6).messages({
      "string.min": "password must be atleast 6 characters long",
      "any.required": "username is required",
    }),
    confirmPassword: joi.any().valid(joi.ref("password")).required().messages({
      "any.only": "passswords do not match",
      "any.required": "Please, confirm password",
    }),
  });
  const { error, value } = validationSchema.validate(body);
  //   console.log(error["details"]);
  if (error) {
    const errors = regValidationErr(error);
    return { errors: errors };
  } else {
    return { value: value };
  }
};

module.exports = registerValidation;
