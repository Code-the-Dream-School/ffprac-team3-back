const Pet = require('../models/Pets.js');
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');


const db = mongoose.connection;

const gfsBucket = new GridFSBucket(db, {bucketName: 'uploads'});

const getAllPets = async (req, res) => {
  const petData = await Pet.find({}).sort('CreatedAt');
  res.status(StatusCodes.OK).json({ petData, count: petData.length });
};

const getPetImage = async (req, res) => {
    try {
        const { filename } = req.params;

        const file = await Pet.findOne({ 'fileImages.filename': filename }).exec();

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        const readstream = gfsBucket.openDownloadStreamByName(file.fileImages.filename);

        readstream.pipe(res);
    } catch (error) {
        console.error('Error fetching pet image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPetMedical = async (req, res) => {
  try {
      const { filename } = req.params;

      const file = await Pet.findOne({ 'fileMedical.filename': filename }).exec();

      console.log(file)

      if (!file) {
          return res.status(404).json({ error: 'File not found' });
      }

      const readstream = gfsBucket.openDownloadStreamByName(file.fileMedical.filename);

      readstream.pipe(res);
  } catch (error) {
      console.error('Error fetching pet image:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
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
  const { id } = req.params

  // const {
  //   user: userId,
  //   params: { id: petId },
  // } = req;
  
  const petPdf = await Pet.findOneAndUpdate(
    { _id: id },
    { fileMedical: req.file },
    { new: true, runValidators: true }
  );

  if (!petPdf) {
    throw new Error(`No medical record with id ${id} found.`);
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
  getPetImage,
  getPetMedical,
  createPet,
  updatePet,
  updateMedicalPet,
  deletePet,
};
