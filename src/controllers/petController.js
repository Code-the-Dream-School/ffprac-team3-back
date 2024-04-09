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
  const {
    user: userId,
    params: { id: petId },
    body: { type },
  } = req;

  if (type.trim() === 0) {
    throw new BadRequestError('Pet type cannot be blank');
  }

  console.log('This is the pet ID: ', petId);
  console.log('This is the req.body: ', req.body);
  console.log('This is the userID: ', userId);

  const pet = await Pet.findOneAndUpdate(
    { _id: petId, authorizedUsers: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!pet) {
    throw new Error(`No pet with id ${petId} found.`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Successfully updated pet profile' });
};

const deletePet = async (req, res) => {
  const {
    user: userId,
    params: { id: petId },
  } = req;

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
