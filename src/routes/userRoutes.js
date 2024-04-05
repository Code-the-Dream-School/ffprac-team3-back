const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");

const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userControllers");

router.route("/register").post(registerUser);
router.route("/loginUser").post(loginUser);

router.route("/getCurrentUser").post(auth, getCurrentUser);

module.exports = router;
