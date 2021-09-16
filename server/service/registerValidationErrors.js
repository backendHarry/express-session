const regValidationErr = (err) => {
  const errors = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  };
  let errorObj = err["details"][0];
  //   console.log(err["details"][0]);
  errors[errorObj["path"][0]] = errorObj["message"];
  return errors;
};

const passwordErrorHandler = (err) => {
  const errors = {
    password: null,
    confirmPassword: null,
  };
  let errorObj = err["details"][0];
  //   console.log(err["details"][0]);
  errors[errorObj["path"][0]] = errorObj["message"];
  return errors;
};

module.exports = { regValidationErr, passwordErrorHandler };
