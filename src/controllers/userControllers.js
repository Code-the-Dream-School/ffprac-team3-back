const UserProfile = require('../models/UserProfile');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      throw new BadRequestError(
        'Please provide first name, last name, email, and password'
      );

    console.log({ ...req.body });
    const user = await UserProfile.create({ ...req.body });
    console.log(user);

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
      lastName: user.lastName,
      userEmail: user.email,
      userPhone: user.phone,
      userAddress: user.address,
      userCity: user.city,
      userState: user.state,
      userZip: user.zipCode,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Unable to login' });
  }
};

const getCurrentUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach user to job routes
    const user = await User.findById(payload.userId).select('-password');
    res
      .status(StatusCodes.OK)
      .json({ user: { name: user.getName(), isadmin: user.isadmin }, token });
  } catch (error) {
    //throw new UnauthenticatedError("Authentication invalid");
    console.log(error);
    res.status(500).json({ msg: 'Authentication invalid' });
  }
};

module.exports = { registerUser, loginUser, getCurrentUser };
