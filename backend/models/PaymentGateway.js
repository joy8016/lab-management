import mongoose from 'mongoose';

const paymentGatewaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Testing / Sandbox'],
      default: 'Active',
    },
    mode: {
      type: String,
      default: 'Live Production',
    },
    transactionFee: {
      type: String,
      default: '2.4% + $0.30 per tx',
    },
  },
  {
    timestamps: true,
  }
);

const PaymentGateway = mongoose.model('PaymentGateway', paymentGatewaySchema);
export default PaymentGateway;
