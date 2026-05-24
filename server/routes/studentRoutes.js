const express = require('express');
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  markReported,
  completePhoneStep,
  completeScanningStep,
  completeFinalVerification,
} = require('../controllers/studentController');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

router.route('/')
  .get(asyncHandler(getStudents))
  .post(asyncHandler(createStudent));

router.patch('/:id/reported', asyncHandler(markReported));
router.patch('/:id/phone', asyncHandler(completePhoneStep));
router.patch('/:id/scanning', asyncHandler(completeScanningStep));
router.patch('/:id/final', asyncHandler(completeFinalVerification));

router.route('/:id')
  .get(asyncHandler(getStudent))
  .put(asyncHandler(updateStudent))
  .delete(asyncHandler(deleteStudent));

module.exports = router;
