const express = require("express");
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  userDetail,
} = require("../controllers/user.js");
const { authMid } = require("../middleware/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.post("/reset/:token", resetPassword);
router.get("/me", authMid, userDetail);

module.exports = router;
