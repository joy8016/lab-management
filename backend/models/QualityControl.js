import mongoose from 'mongoose';

const qualityControlSchema = new mongoose.Schema(
  {
    qcId: {
      type: String,
      trim: true,
    },
    instrumentName: {
      type: String,
      required: [true, 'Instrument name is required'],
      trim: true,
    },
    lotNumber: {
      type: String,
      required: [true, 'Lot number is required'],
      trim: true,
    },
    testCategory: {
      type: String,
      trim: true,
    },
    parameterTested: {
      type: String,
      required: [true, 'Parameter tested is required'],
      trim: true,
    },
    measuredValue: {
      type: Number,
      required: [true, 'Measured value is required'],
    },
    targetValue: {
      type: Number,
    },
    expectedMin: {
      type: Number,
    },
    expectedMax: {
      type: Number,
    },
    status: {
      type: String,
      enum: {
        values: ['Pass', 'Fail', 'Warning', 'Pending Review'],
        message: '{VALUE} is not a valid QC status',
      },
      default: 'Pass',
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const QualityControl = mongoose.model('QualityControl', qualityControlSchema);
export default QualityControl;
