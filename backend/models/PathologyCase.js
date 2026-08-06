import mongoose from 'mongoose';

const testResultSchema = new mongoose.Schema({
  name: String,
  value: String,
  status: String,
  reference: String,
}, { _id: false });

const pathologyCaseSchema = new mongoose.Schema(
  {
    caseId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    patientId: {
      type: String,
      default: '',
    },
    age: {
      type: Number,
      default: 40,
    },
    gender: {
      type: String,
      default: 'Female',
    },
    testType: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Histopathology',
    },
    urgent: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['Pending Review', 'Technician Submitted', 'In Review', 'Signed & Finalized'],
      default: 'Pending Review',
    },
    submittedDate: {
      type: String,
      default: 'Today',
    },
    physician: {
      type: String,
      default: 'Dr. Primary Care',
    },
    specimen: {
      type: String,
      default: 'Biopsy Specimen',
    },
    findings: {
      type: String,
      default: '',
    },
    microscopic: {
      type: String,
      default: '',
    },
    staging: {
      type: String,
      default: '',
    },
    recommendations: [
      {
        type: String,
      },
    ],
    testResults: [testResultSchema],
    validatedValues: [
      {
        name: String,
        value: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PathologyCase = mongoose.model('PathologyCase', pathologyCaseSchema);
export default PathologyCase;
