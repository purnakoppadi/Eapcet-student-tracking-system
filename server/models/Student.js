const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    rank: {
      type: Number,
      required: [true, 'Rank is required.'],
      unique: true,
      min: [1, 'Rank must be greater than zero.'],
      validate: {
        validator: Number.isInteger,
        message: 'Rank must be a whole number.',
      },
    },
    name: {
      type: String,
      required: [true, 'Student name is required.'],
      trim: true,
    },
    branch: {
      type: String,
      required: [true, 'Branch is required.'],
      uppercase: true,
      enum: {
        values: ['CSE', 'AIML', 'CIC'],
        message: 'Branch must be CSE, AIML, or CIC.',
      },
    },
    reported: { type: Boolean, default: false },
    reportedTime: { type: Date, default: null },
    studentPhone: { type: String, trim: true, default: '' },
    parentPhone: { type: String, trim: true, default: '' },
    phoneStep: { type: Boolean, default: false },
    phoneStepTime: { type: Date, default: null },
    scanningStep: { type: Boolean, default: false },
    scanningStepTime: { type: Date, default: null },
    finalVerification: { type: Boolean, default: false },
    finalVerificationTime: { type: Date, default: null },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true },
);

studentSchema.pre('validate', function setWorkflowStatus(next) {
  if (this.phoneStep && !this.reported) {
    this.invalidate('phoneStep', 'Phone step requires the reported step.');
  }
  if (this.scanningStep && !this.phoneStep) {
    this.invalidate('scanningStep', 'Scanning step requires the phone step.');
  }
  if (this.finalVerification && !this.scanningStep) {
    this.invalidate('finalVerification', 'Final verification requires the scanning step.');
  }

  const steps = [this.reported, this.phoneStep, this.scanningStep, this.finalVerification];
  if (steps.every(Boolean)) {
    this.status = 'Completed';
  } else if (steps.some(Boolean)) {
    this.status = 'In Progress';
  } else {
    this.status = 'Pending';
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema);
