const fs = require('fs');
const csv = require('csv-parser');
const Student = require('../models/Student');
const AppError = require('../utils/AppError');

function normalizedRow(row) {
  return Object.entries(row).reduce((result, [header, value]) => {
    const key = header.replace(/^\uFEFF/, '').trim().toLowerCase();
    result[key] = String(value || '').trim();
    return result;
  }, {});
}

function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    console.log(`[CSV Parser] Starting to read: ${filePath}`);
    
    const stream = fs.createReadStream(filePath);
    
    stream
      .pipe(csv())
      .on('data', (row) => {
        const normalized = normalizedRow(row);
        console.log(`[CSV Parser] Row parsed: ${JSON.stringify(normalized)}`);
        rows.push(normalized);
      })
      .on('end', () => {
        console.log(`[CSV Parser] Completed. Total rows: ${rows.length}`);
        resolve(rows);
      })
      .on('error', (error) => {
        console.error(`[CSV Parser] Error reading file: ${error.message}`);
        reject(new AppError(`CSV parsing error: ${error.message}`, 400));
      });

    stream.on('error', (error) => {
      console.error(`[CSV Parser] Stream error: ${error.message}`);
      reject(new AppError(`File stream error: ${error.message}`, 400));
    });
  });
}

async function uploadStudents(req, res) {
  console.log(`[Upload] Request received. File present: ${Boolean(req.file)}`);
  
  if (!req.file) {
    console.error('[Upload] No file attached');
    throw new AppError('Please attach a CSV file in the "file" field.', 400);
  }

  console.log(`[Upload] File details: name=${req.file.originalname}, size=${req.file.size}, path=${req.file.path}`);

  let filePath = req.file.path;
  
  try {
    // Read and parse CSV
    console.log(`[Upload] Reading CSV from: ${filePath}`);
    const rows = await readCsv(filePath);
    
    if (rows.length === 0) {
      console.warn('[Upload] CSV file is empty');
      throw new AppError('CSV file is empty.', 400);
    }

    console.log(`[Upload] Processing ${rows.length} rows from CSV`);

    const accepted = [];
    const rejected = [];
    const ranksInFile = new Set();

    // Validate each row
    rows.forEach((row, index) => {
      const rowNumber = index + 2;
      const rank = Number(row.rank);
      const branch = String(row.branch || '').toUpperCase();

      console.log(`[Upload] Validating row ${rowNumber}: rank=${row.rank}, name=${row.name}, branch=${row.branch}`);

      if (!Number.isInteger(rank) || rank < 1) {
        console.warn(`[Upload] Row ${rowNumber}: Invalid rank ${row.rank}`);
        rejected.push({ row: rowNumber, reason: 'Rank must be a positive integer.' });
        return;
      }

      if (!row.name || row.name.trim().length === 0) {
        console.warn(`[Upload] Row ${rowNumber}: Missing name`);
        rejected.push({ row: rowNumber, reason: 'Student name is required.' });
        return;
      }

      if (!['CSE', 'AIML', 'CIC'].includes(branch)) {
        console.warn(`[Upload] Row ${rowNumber}: Invalid branch ${row.branch}`);
        rejected.push({ row: rowNumber, reason: 'Branch must be CSE, AIML, or CIC.' });
        return;
      }

      if (ranksInFile.has(rank)) {
        console.warn(`[Upload] Row ${rowNumber}: Duplicate rank ${rank} in file`);
        rejected.push({ row: rowNumber, rank, reason: 'Duplicate rank in CSV.' });
        return;
      }

      ranksInFile.add(rank);
      accepted.push({ rank, name: row.name, branch });
      console.log(`[Upload] Row ${rowNumber}: Accepted`);
    });

    console.log(`[Upload] Validation complete: accepted=${accepted.length}, rejected=${rejected.length}`);

    // Check for duplicates in database
    const existingRanks = accepted.length
      ? await Student.find({ rank: { $in: accepted.map((student) => student.rank) } }).distinct('rank')
      : [];
    
    console.log(`[Upload] Database check: ${existingRanks.length} students already exist`);

    const existingRankSet = new Set(existingRanks);
    const newStudents = accepted.filter((student) => {
      if (!existingRankSet.has(student.rank)) return true;
      console.warn(`[Upload] Rank ${student.rank} already exists in database`);
      rejected.push({ rank: student.rank, reason: 'Rank already exists in database.' });
      return false;
    });

    console.log(`[Upload] After deduplication: new students=${newStudents.length}`);

    // Insert new students into MongoDB
    let insertedStudents = [];
    if (newStudents.length > 0) {
      console.log(`[Upload] Inserting ${newStudents.length} students into MongoDB...`);
      try {
        insertedStudents = await Student.insertMany(newStudents);
        console.log(`[Upload] Successfully inserted ${insertedStudents.length} students`);
      } catch (dbError) {
        console.error(`[Upload] Database insertion error: ${dbError.message}`);
        throw new AppError(`Database error: ${dbError.message}`, 500);
      }
    }

    console.log(`[Upload] Upload complete: inserted=${insertedStudents.length}, rejected=${rejected.length}`);

    res.status(201).json({
      success: true,
      message: 'CSV processing completed.',
      data: {
        rowsReceived: rows.length,
        inserted: insertedStudents.length,
        rejected: rejected.length,
        errors: rejected,
      },
    });

  } catch (error) {
    console.error(`[Upload] Error in uploadStudents: ${error.message}`);
    
    // Ensure file is deleted even on error
    try {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`[Upload] Cleaned up file: ${filePath}`);
      }
    } catch (cleanupError) {
      console.error(`[Upload] Cleanup error: ${cleanupError.message}`);
    }

    // Re-throw the error for asyncHandler middleware
    throw error;

  } finally {
    // Final cleanup attempt
    try {
      if (filePath && fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        console.log(`[Upload] File cleaned up in finally block: ${filePath}`);
      }
    } catch (cleanupError) {
      console.warn(`[Upload] Final cleanup failed: ${cleanupError.message}`);
    }
  }
}

module.exports = { uploadStudents };
