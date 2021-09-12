const joi = require("joi");
const regValidationErr = require("./registerValidationErrors");
const { passwordStrength } = require("check-password-strength");
const usernameGenerator = require("./uniqueNamesGen");

const registerValidation = (body) => {
  const validationSchema = joi.object({
    username: joi.string().min(6).required().messages({
      "string.min": "username must be atleast 6 characters long",
      "any.required": "username is required",
      "string.empty": "username is required",
    }),
    email: joi.string().required().email().messages({
      "string.email": "Please, enter a valid email",
      "any.required": "email is required",
      "string.empty": "email is required",
    }),
    password: joi.string().required().min(6).messages({
      "string.min": "password must be atleast 6 characters long",
      "any.required": "password is required",
      "string.empty": "password is required",
    }),
    confirmPassword: joi.any().valid(joi.ref("password")).required().messages({
      "any.only": "passswords do not match",
      "any.required": "Please, confirm password",
    }),
  });
  const { error, value } = validationSchema.validate(body);
  //   console.log(error["details"]);
  if (error) {
    console.log(error);
    const errors = regValidationErr(error);
    return { errors: errors };
  } else {
    return { value: value };
  }
};

const passwordChecker = (password) => {
  const result = passwordStrength(password);
  if (result.id < 1) {
    return {
      errors: {
        password:
          "password should contain Uppercase, lowerCase, Number and character",
      },
      message:
        "passwords should be atleast 8 Characters long, with Uppercasem lowercase, numbers and characters mix to ensure secured password",
    };
  } else {
    return true;
  }
};

const uniqueUsernameVal = (err, data) => {
  return {
    errors: {
      username: `username ${data.username} is already taken`,
    },
    message: usernameGenerator(data.username),
  };
};

module.exports = { registerValidation, passwordChecker, uniqueUsernameVal };
