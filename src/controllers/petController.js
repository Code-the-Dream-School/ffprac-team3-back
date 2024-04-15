const Pet = require('../models/Pets.js');
const { StatusCodes } = require('http-status-codes');

const getAllPets = async (req, res) => {
  const petData = await Pet.find({}).sort('CreatedAt');
  res.status(StatusCodes.OK).json({ petData, count: petData.length });
};

const createPet = async (req, res) => {
  req.body.authorizedUsers = req.user;
  const data = JSON.parse(JSON.stringify(req.body))
  const pet = await Pet.create({...data, fileImages: req.file});
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

  const pet = await Pet.findOneAndUpdate(
    { _id: petId, authorizedUsers: userId },
    {...req.body, fileImages: req.file,},
    { new: true, runValidators: true }
  );

  if (!pet) {
    throw new Error(`No pet with id ${petId} found.`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Successfully updated pet profile' });
};

const updateMedicalPet = async (req, res) => {
  const {
    user: userId,
    params: { id: petId },
  } = req;
  
  const petPdf = await Pet.findOneAndUpdate(
    { _id: petId, authorizedUsers: userId },
    { fileMedical: req.file },
    { new: true, runValidators: true }
  );

  if (!petPdf) {
    throw new Error(`No medical record with id ${petId} found.`);
  }

  res.status(StatusCodes.OK).json({ msg: "Successfully updated pet's medical history" });
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
  updateMedicalPet,
  deletePet,
};
