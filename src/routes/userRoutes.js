const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userControllers');

router.route('/register').get(registerUser);
router.route('/loginUser').post(loginUser);

module.exports = router;
