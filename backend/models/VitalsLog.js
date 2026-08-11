import mongoose from 'mongoose';

const vitalsLogSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    systolic: { type: Number },
    diastolic: { type: Number },
    heartRate: { type: Number },
    temp: { type: Number },
    spo2: { type: Number },
    respiratoryRate: { type: Number },
    bmi: { type: Number },
    notes: { type: String },
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('VitalsLog', vitalsLogSchema);
