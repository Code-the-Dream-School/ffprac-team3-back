const Pet = require('../models/Pets');
const { StatusCodes } = require('http-status-codes');

const getAllPets = async (req, res) => {
  const petData = await Pet.find({}).sort('CreatedAt');
  res.status(StatusCodes.OK).json({ petData, count: petData.length });
};

const createPet = async (req, res) => {
  req.body.authorizedUsers = req.user.userId;
  const pet = await Pet.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .send({ msg: 'You successfully created a new pet profile.', pet: pet._id });
};

const updatePet = async (req, res) => {
  res.send('Success: update pet');
};

const deletePet = async (req, res) => {
  res.send('Success: Delete Pet');
};

module.exports = {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
};
