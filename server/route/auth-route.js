const express = require("express");
const {
  homeController,
  registerController,
  verifyAccountEmailController,
  resendTokenController,
  loginController,
} = require("../controller/authController");

const router = express.Router();

// GET
router.get("/home", homeController);
router.get("/verify-account", verifyAccountEmailController);
router.get("/resend-token", resendTokenController);

// POST
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
