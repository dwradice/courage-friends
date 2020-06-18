const express = require('express');
const shelterController = require('./../controllers/shelterController');

const router = express.Router();

router
  .route('/')
  .get(shelterController.getAllShelters)
  .post(shelterController.createShelter);

router
  .route('/:id')
  .get(shelterController.getShelter)
  .patch(shelterController.updateShelter)
  .delete(shelterController.deleteShelter);

module.exports = router;
