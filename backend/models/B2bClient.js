import mongoose from 'mongoose';

const b2bClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    tariffDiscount: {
      type: String,
      default: '10% Off',
    },
    creditLimit: {
      type: Number,
      default: 10000,
    },
    currentBalance: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Near Limit', 'Paused (Overdue)'],
      default: 'Active',
    },
    invoicePeriod: {
      type: String,
      default: 'Monthly',
    },
  },
  {
    timestamps: true,
  }
);

const B2bClient = mongoose.model('B2bClient', b2bClientSchema);
export default B2bClient;
