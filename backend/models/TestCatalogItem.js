import mongoose from 'mongoose';

const testCatalogItemSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Test name is required'],
      trim: true,
    },
    alias: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Department category is required'],
      trim: true,
    },
    sampleType: {
      type: String,
      required: [true, 'Sample specimen type is required'],
      trim: true,
    },
    sampleVolume: {
      type: String,
      default: '2 ml',
    },
    container: {
      type: String,
      default: 'Red Top (Plain)',
    },
    tat: {
      type: String,
      default: '6 Hours',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    isPanel: {
      type: Boolean,
      default: false,
    },
    method: {
      type: String,
      trim: true,
    },
    handling: {
      type: String,
      trim: true,
    },
    units: {
      type: String,
      trim: true,
    },
    basePrice: {
      type: Number,
      default: 50,
    },
    discount: {
      type: String,
      default: '0%',
    },
    cityMultiplier: {
      type: Number,
      default: 1.1,
    },
    branches: [
      {
        type: String,
      },
    ],
    parameters: [
      {
        name: String,
        unit: String,
        maleMin: Number,
        maleMax: Number,
        femaleMin: Number,
        femaleMax: Number,
        critLow: Number,
        critHigh: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TestCatalogItem = mongoose.model('TestCatalogItem', testCatalogItemSchema);
export default TestCatalogItem;
