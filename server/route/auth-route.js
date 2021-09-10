const express = require("express");
const {
  homeController,
  registerController,
} = require("../controller/authController");

const router = express.Router();

router.get("/home", homeController);
router.post("/register", registerController);

module.exports = router;
