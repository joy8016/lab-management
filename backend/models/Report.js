import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
      required: [true, 'Report ID is required'],
      unique: true,
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
    testOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestOrder',
      },
    ],
    status: {
      type: String,
      enum: {
        values: ['Draft', 'Awaiting Approval', 'Approved', 'Released', 'Archived'],
        message: '{VALUE} is not a valid report status',
      },
      default: 'Draft',
    },
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    pathologist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    summaryNotes: {
      type: String,
      trim: true,
    },
    releasedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model('Report', reportSchema);
export default Report;
