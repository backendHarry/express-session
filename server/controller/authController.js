const joi = require("joi");
const User = require("../model/user-model"); //User model for DB
const regValidation = require("../service/registerValidation");
const homeController = (req, res) => {
  res.json({ message: "hello user welcome to the home route" });
};

const registerController = (req, res) => {
  try {
    const { errors, value } = regValidation(req.body);
    if (errors) return res.status(400).json({ errors });
    res.status(200).json({ value });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  homeController,
  registerController,
};
