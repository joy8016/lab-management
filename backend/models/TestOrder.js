import mongoose from 'mongoose';

const testParameterSchema = new mongoose.Schema(
  {
    paramId: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      default: '',
      trim: true,
    },
    units: {
      type: String,
      trim: true,
    },
    refMin: {
      type: Number,
    },
    refMax: {
      type: Number,
    },
    flag: {
      type: String,
      default: '',
      trim: true,
    },
    isCritical: {
      type: Boolean,
      default: false,
    },
    instrument: {
      type: String,
      default: 'Manual Entry/Interface',
      trim: true,
    },
  },
  { _id: false }
);

const testOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      trim: true,
    },
    sample: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sample',
    },
    sampleId: {
      type: String,
      required: [true, 'Sample ID is required'],
      trim: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    testName: {
      type: String,
      required: [true, 'Test name is required'],
      trim: true,
    },
    department: {
      type: String,
      enum: {
        values: [
          'Hematology',
          'Biochemistry',
          'Immunoassay',
          'Urinalysis',
          'Endocrinology',
          'Microbiology',
          'Other',
        ],
        message: '{VALUE} is not a valid department',
      },
      default: 'Hematology',
    },
    parameters: [testParameterSchema],
    urgency: {
      type: String,
      enum: ['Routine', 'Urgent', 'STAT (Urgent)'],
      default: 'Routine',
    },
    status: {
      type: String,
      enum: ['Received', 'Synced', 'Entered', 'Draft', 'Approved', 'Flagged'],
      default: 'Received',
    },
    enteredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const TestOrder = mongoose.model('TestOrder', testOrderSchema);
export default TestOrder;
