import mongoose from 'mongoose';

const inventoryRequestSchema = new mongoose.Schema(
  {
    reqId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    item: {
      type: String,
      required: [true, 'Consumable item name is required'],
      trim: true,
    },
    qty: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
    requester: {
      type: String,
      required: [true, 'Requester name is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const InventoryRequest = mongoose.model('InventoryRequest', inventoryRequestSchema);
export default InventoryRequest;
