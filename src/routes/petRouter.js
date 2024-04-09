const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authentication');

const {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
} = require('../controllers/petController');

router.route('/getAllPets').get(getAllPets);
router.route('/createPet').post(createPet);
router.route('/updatePet').patch(updatePet);
router.route('/deletePet').delete(deletePet);

module.exports = router;
