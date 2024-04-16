const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authentication');

const {
  getAllPets,
  createPet,
  updatePet,
  updateMedicalPet,
  deletePet,
} = require('../controllers/petController');

router.route('/getAllPets').get(getAllPets);
router.route('/createPet').post(auth, createPet);
router.route('/updatePet/:id').patch(auth, updatePet);
router.route('/update/:id').patch(auth, updateMedicalPet)
router.route('/deletePet/:id').delete(auth, deletePet);

module.exports = router;
