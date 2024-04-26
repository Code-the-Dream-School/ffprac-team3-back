const UserProfile = require('../models/UserProfile');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      throw new BadRequestError(
        'Please provide first name, last name, email, and password'
      );

    const user = await UserProfile.create({ ...req.body });

    res.status(StatusCodes.CREATED).json({
      user: { name: user.getName() },
      message: 'Registered successfully',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Unable to signup' });
  }
};

const loginUser = async (req, res) => {
  // res.send('Successfully accessing the loginUser route ');
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('Please provide email and password');
    }

    const user = await UserProfile.findOne({ email });

    if (!user)
      throw new UnauthenticatedError('Please provide valid credentials');

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect)
      throw new UnauthenticatedError('Please provide valid credentials');

    const token = await user.createJWT();

    res.status(StatusCodes.OK).json({
      fistName: user.firstName,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Unable to login' });
  }
};

const getCurrentUser = async (req, res) => {
  const { user: userId } = req;
  const user = await UserProfile.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`User not found.`);
  }

  res.status(StatusCodes.OK).json({
    firstName: user.firstName,
    lastName: user.lastName,
    userEmail: user.userEmail,
    userPhone: user.userPhone,
    userAddress: user.userAddress,
    userCity: user.userCity,
    userState: user.userState,
    userZip: user.userZip,
  });
};

const updateUser = async (req, res) => {
  const { user: userId } = req;

  const profile = await UserProfile.updateOne({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!profile) {
    throw new NotFoundError(`User not found.`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Successfully updated user profile.' });
};

module.exports = { registerUser, loginUser, getCurrentUser, updateUser };
