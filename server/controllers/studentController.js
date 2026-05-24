const Student = require('../models/Student');
const AppError = require('../utils/AppError');

const editableFields = ['rank', 'name', 'branch', 'studentPhone', 'parentPhone'];
const validSortFields = ['rank', 'name', 'branch', 'status', 'createdAt', 'updatedAt'];

async function findStudentOrFail(id) {
  const student = await Student.findById(id);
  if (!student) throw new AppError('Student not found.', 404);
  return student;
}

function copyEditableFields(target, source) {
  editableFields.forEach((field) => {
    if (source[field] !== undefined) target[field] = source[field];
  });
}

async function getStudents(req, res) {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 100);
  const filter = {};

  if (req.query.branch) {
    const branch = req.query.branch.toUpperCase();
    if (!['CSE', 'AIML', 'CIC'].includes(branch)) {
      throw new AppError('Branch must be CSE, AIML, or CIC.', 400);
    }
    filter.branch = branch;
  }

  if (req.query.rank) {
    const rank = Number(req.query.rank);
    if (!Number.isInteger(rank) || rank <= 0) throw new AppError('Rank must be a positive whole number.', 400);
    filter.rank = rank;
  }

  if (req.query.status) {
    if (!['Pending', 'In Progress', 'Completed'].includes(req.query.status)) {
      throw new AppError('Status must be Pending, In Progress, or Completed.', 400);
    }
    filter.status = req.query.status;
  }

  const sortBy = validSortFields.includes(req.query.sortBy) ? req.query.sortBy : 'rank';
  const sortOrder = req.query.order === 'desc' ? -1 : 1;
  const [students, total] = await Promise.all([
    Student.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit),
    Student.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: students,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
}

async function getStudent(req, res) {
  const student = await findStudentOrFail(req.params.id);
  res.status(200).json({ success: true, data: student });
}

async function createStudent(req, res) {
  const student = new Student();
  copyEditableFields(student, req.body);
  await student.save();
  res.status(201).json({ success: true, data: student });
}

async function updateStudent(req, res) {
  const student = await findStudentOrFail(req.params.id);
  copyEditableFields(student, req.body);
  await student.save();
  res.status(200).json({ success: true, data: student });
}

async function deleteStudent(req, res) {
  const student = await findStudentOrFail(req.params.id);
  await student.deleteOne();
  res.status(200).json({ success: true, message: 'Student deleted successfully.' });
}

async function markReported(req, res) {
  const student = await findStudentOrFail(req.params.id);
  if (!student.reported) {
    student.reported = true;
    student.reportedTime = new Date();
    await student.save();
  }
  res.status(200).json({ success: true, data: student });
}

async function completePhoneStep(req, res) {
  const student = await findStudentOrFail(req.params.id);
  if (!student.reported) throw new AppError('Student must be marked as reported before the phone step.', 409);

  const studentPhone = String(req.body.studentPhone || '').trim();
  const parentPhone = String(req.body.parentPhone || '').trim();
  if (!studentPhone || !parentPhone) {
    throw new AppError('Student phone and parent phone are required.', 400);
  }

  student.studentPhone = studentPhone;
  student.parentPhone = parentPhone;
  if (!student.phoneStep) {
    student.phoneStep = true;
    student.phoneStepTime = new Date();
  }
  await student.save();

  res.status(200).json({ success: true, data: student });
}

async function completeScanningStep(req, res) {
  const student = await findStudentOrFail(req.params.id);
  if (!student.phoneStep) throw new AppError('Phone step must be completed before scanning.', 409);

  if (!student.scanningStep) {
    student.scanningStep = true;
    student.scanningStepTime = new Date();
    await student.save();
  }

  res.status(200).json({ success: true, data: student });
}

async function completeFinalVerification(req, res) {
  const student = await findStudentOrFail(req.params.id);
  if (!student.scanningStep) throw new AppError('Scanning must be completed before final verification.', 409);

  if (!student.finalVerification) {
    student.finalVerification = true;
    student.finalVerificationTime = new Date();
    await student.save();
  }

  res.status(200).json({ success: true, data: student });
}

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  markReported,
  completePhoneStep,
  completeScanningStep,
  completeFinalVerification,
};
