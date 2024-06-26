const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authentication');

const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
} = require('../controllers/userControllers');

router.route('/register').post(registerUser);
router.route('/loginUser').post(loginUser);
router.route('/updateUser').patch(auth, updateUser);
router.route('/getCurrentUser').get(auth, getCurrentUser);

module.exports = router;
