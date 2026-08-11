import mongoose from 'mongoose';

const barcodeLinkSchema = new mongoose.Schema(
  {
    barcodeId: { type: String, required: true, unique: true },
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    sampleType: { type: String, default: 'Blood (EDTA)' },
    containerColor: { type: String, default: 'Purple' },
    status: { type: String, default: 'Linked' },
    linkedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('BarcodeLink', barcodeLinkSchema);
