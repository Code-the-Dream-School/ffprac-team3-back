const Pet = require('../models/Pets');
const { StatusCodes } = require('http-status-codes');

const getAllPets = async (req, res) => {
  res.send('Success: Get all pets');
};

const createPet = async (req, res) => {
  res.send('Success: Create Pet');
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
