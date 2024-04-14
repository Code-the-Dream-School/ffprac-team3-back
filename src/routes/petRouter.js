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
router.route('/updatePet/:id').patch(auth, updatePet);
router.route('/deletePet/:id').delete(auth, deletePet);

module.exports = router;
