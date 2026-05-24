const express = require('express');
const { uploadStudents } = require('../controllers/uploadController');
const uploadCsv = require('../middleware/uploadMiddleware');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

router.post(
  '/',
  uploadCsv.single('file'),
  asyncHandler(uploadStudents),
);

module.exports = router;
