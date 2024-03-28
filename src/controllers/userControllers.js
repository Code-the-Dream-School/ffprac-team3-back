const UserProfile = require('../models/UserProfile');

const registerUser = async (req, res) => {
  const userProfile = await UserProfile.create(req.body);
  res.status(200).json({
    msg: 'Registration Successful',
  });
};

const loginUser = async (req, res) => {
  res.send('Successfully accessing the loginUser route ');
};

module.exports = { registerUser, loginUser };
