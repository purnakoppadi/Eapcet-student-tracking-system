const fs = require('fs');
const path = require('path');
const multer = require('multer');
const AppError = require('../utils/AppError');

const uploadDir = path.resolve(__dirname, '..', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, uploadDir),
  filename: (req, file, callback) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.csv`;
    callback(null, uniqueName);
  },
});

function csvFileFilter(req, file, callback) {
  const hasCsvExtension = path.extname(file.originalname).toLowerCase() === '.csv';
  const validMimeTypes = ['text/csv', 'application/vnd.ms-excel', 'application/csv', 'application/octet-stream'];

  if (!hasCsvExtension || (file.mimetype && !validMimeTypes.includes(file.mimetype))) {
    callback(new AppError('Only CSV files are accepted.', 400));
    return;
  }

  callback(null, true);
}

const uploadCsv = multer({
  storage,
  fileFilter: csvFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = uploadCsv;
