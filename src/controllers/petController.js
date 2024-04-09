const Pet = require('../models/Pets');
const { StatusCodes } = require('http-status-codes');

const getAllPets = async (req, res) => {
  const petData = await Pet.find({}).sort('CreatedAt');
  res.status(StatusCodes.OK).json({ petData, count: petData.length });
};

const createPet = async (req, res) => {
  req.body.authorizedUsers = req.user;
  const pet = await Pet.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .send({ msg: 'You successfully created a new pet profile.', pet: pet._id });
};

const updatePet = async (req, res) => {
  res.send('Success: update pet');
};

const deletePet = async (req, res) => {
  const {
    params: { id: petId },
  } = req;

  const userId = req.user;

  console.log(petId, userId);

  const pet = await Pet.findOneAndDelete({
    _id: petId,
    authorizedUsers: userId,
  });

  if (!pet) {
    throw new Error(`No pet with id ${petId} found.`);
  }

  res.status(StatusCodes.OK).send(`Success removing pet with id ${petId}.`);
};

module.exports = {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
};
