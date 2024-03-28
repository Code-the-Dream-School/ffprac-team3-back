const registerUser = async (req, res) => {
  res.send('Successfully accessing the registerUser route');
};

const loginUser = async (req, res) => {
  res.send('Successfully accessing the loginUser route ');
};

module.exports = { registerUser, loginUser };
