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
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => rows.push(normalizedRow(row)))
      .on('end', () => resolve(rows))
      .on('error', reject);
  });
}

async function uploadStudents(req, res) {
  if (!req.file) {
    throw new AppError('Please attach a CSV file in the "file" field.', 400);
  }

  try {
    const rows = await readCsv(req.file.path);
    if (rows.length === 0) throw new AppError('CSV file is empty.', 400);

    const accepted = [];
    const rejected = [];
    const ranksInFile = new Set();

    rows.forEach((row, index) => {
      const rowNumber = index + 2;
      const rank = Number(row.rank);
      const branch = String(row.branch || '').toUpperCase();

      if (!Number.isInteger(rank) || rank < 1 || !row.name || !['CSE', 'AIML', 'CIC'].includes(branch)) {
        rejected.push({ row: rowNumber, reason: 'Rank, Name, or Branch is invalid.' });
        return;
      }
      if (ranksInFile.has(rank)) {
        rejected.push({ row: rowNumber, rank, reason: 'Duplicate rank in CSV.' });
        return;
      }

      ranksInFile.add(rank);
      accepted.push({ rank, name: row.name, branch });
    });

    const existingRanks = accepted.length
      ? await Student.find({ rank: { $in: accepted.map((student) => student.rank) } }).distinct('rank')
      : [];
    const existingRankSet = new Set(existingRanks);
    const newStudents = accepted.filter((student) => {
      if (!existingRankSet.has(student.rank)) return true;
      rejected.push({ rank: student.rank, reason: 'Rank already exists.' });
      return false;
    });

    let insertedStudents = [];
    if (newStudents.length) {
      insertedStudents = await Student.insertMany(newStudents);
    }

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
  } finally {
    fs.promises.unlink(req.file.path).catch(() => {});
  }
}

module.exports = { uploadStudents };
