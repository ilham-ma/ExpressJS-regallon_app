const express = require("express");
const {
  login,
  register,
  getProfile,
  updateProfile,
} = require("../controllers/userController");
const { authenticated } = require("../validations/authValidation");
const {
  validateLogin,
  validateRegister,
  validateProfile,
} = require("../validations/userValidation");

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/register", validateRegister, register);
router.get("/profile", authenticated, getProfile);
router.put("/profile/update", authenticated, validateProfile, updateProfile);

module.exports = router;
