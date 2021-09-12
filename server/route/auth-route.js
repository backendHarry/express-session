const express = require("express");
const {
  homeController,
  registerController,
  verifyAccountController,
} = require("../controller/authController");

const router = express.Router();

// GET
router.get("/home", homeController);
router.get("/verify-account", verifyAccountController);

// POST
router.post("/register", registerController);

module.exports = router;
