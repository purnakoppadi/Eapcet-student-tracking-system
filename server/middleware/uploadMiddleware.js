const fs = require('fs');
const path = require('path');
const multer = require('multer');
const os = require('os');
const AppError = require('../utils/AppError');

// Use system temp directory for Render (ephemeral storage friendly)
const uploadDir = path.join(os.tmpdir(), 'student-tracker-uploads');

// Ensure upload directory exists
try {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`[Upload] Directory ready: ${uploadDir}`);
} catch (error) {
  console.error(`[Upload] Failed to create directory: ${error.message}`);
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(`[Upload] Saving file to: ${uploadDir}`);
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.csv`;
    console.log(`[Upload] File name generated: ${uniqueName}`);
    callback(null, uniqueName);
  },
});

function csvFileFilter(req, file, callback) {
  console.log(`[Upload] Filtering file: ${file.originalname}, MIME: ${file.mimetype}`);
  
  const hasCsvExtension = path.extname(file.originalname).toLowerCase() === '.csv';
  const validMimeTypes = ['text/csv', 'application/vnd.ms-excel', 'application/csv', 'application/octet-stream', 'text/plain'];

  if (!hasCsvExtension) {
    console.warn(`[Upload] Invalid extension: ${path.extname(file.originalname)}`);
    callback(new AppError('Only CSV files are accepted.', 400));
    return;
  }

  if (file.mimetype && !validMimeTypes.includes(file.mimetype)) {
    console.warn(`[Upload] Invalid MIME type: ${file.mimetype}`);
    callback(new AppError('Invalid file format. Please upload a CSV file.', 400));
    return;
  }

  console.log(`[Upload] File filter passed for: ${file.originalname}`);
  callback(null, true);
}

const uploadCsv = multer({
  storage,
  fileFilter: csvFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = uploadCsv;
