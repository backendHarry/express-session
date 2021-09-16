const express = require("express");
const {
  homeController,
  registerController,
  verifyAccountEmailController,
  resendTokenController,
  loginController,
  logoutController,
  forgetPasswordController,
  confirmQuestionGetController,
  confirmQuestionPostController,
  updatePasswordEmailController,
} = require("../controller/authController");
const loginLimitter = require("../service/login_throttle");

const router = express.Router();

// GET
router.get("/home", homeController);
router.get("/verify-account", verifyAccountEmailController);
router.get("/resend-token", resendTokenController);
router.get("/logout", logoutController);
router.get("/confirm-question", confirmQuestionGetController);
// router.get("/change-password", updatePasswordEmailController);

// POST
router.post("/register", registerController);
router.post("/login", loginLimitter, loginController);
router.post("/forget-password", forgetPasswordController);
router.post("/confirm-question", confirmQuestionPostController);
router.post("/change-password", updatePasswordEmailController);

module.exports = router;
