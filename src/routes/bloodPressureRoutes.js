const express = require('express');
const controller = require('../controllers/bloodPressureController');
const {
  validateReading,
  validateClassifyQuery,
  validateReadingId
} = require('../middlewares/validateBloodPressure');

const router = express.Router();

router.get('/categories', controller.getCategories);
router.get('/classify', validateClassifyQuery, controller.classifyValues);
router.get('/summary', controller.getSummary);

// /api/blood-pressure
router
  .route('/')
  .get(controller.getReadings)
  .post(validateReading, controller.createReading);

// /api/blood-pressure/:id
router
  .route('/:id')
  .put(validateReadingId, validateReading, controller.updateReading)
  .delete(validateReadingId, controller.deleteReading);

module.exports = router;