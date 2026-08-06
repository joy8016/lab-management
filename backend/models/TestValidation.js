import mongoose from 'mongoose';

const testValidationSchema = new mongoose.Schema(
  {
    valId: {
      type: String,
      required: true,
      unique: true,
    },
    sampleId: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 40,
    },
    gender: {
      type: String,
      default: 'Female',
    },
    equipment: {
      type: String,
      required: true,
    },
    qcStatus: {
      type: String,
      default: 'QC PASS',
    },
    testName: {
      type: String,
      required: true,
    },
    measuredValue: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      default: '',
    },
    refRange: {
      type: String,
      required: true,
    },
    minRef: {
      type: Number,
      default: 0,
    },
    maxRef: {
      type: Number,
      default: 100,
    },
    flag: {
      type: String,
      enum: ['NORMAL', 'HIGH', 'LOW', 'CRITICAL HIGH', 'CRITICAL LOW', 'RE-TEST ORDERED'],
      default: 'NORMAL',
    },
    category: {
      type: String,
      default: 'General',
    },
    timestamp: {
      type: String,
      default: 'Today',
    },
    validated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TestValidation = mongoose.model('TestValidation', testValidationSchema);
export default TestValidation;
