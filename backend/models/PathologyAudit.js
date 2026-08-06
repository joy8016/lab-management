import mongoose from 'mongoose';

const pathologyAuditSchema = new mongoose.Schema(
  {
    logId: {
      type: String,
      required: true,
      unique: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    caseId: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      default: '',
    },
    user: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      default: 'Pathologist',
    },
    ipAddress: {
      type: String,
      default: '127.0.0.1',
    },
    actionCategory: {
      type: String,
      required: true,
    },
    actionDescription: {
      type: String,
      required: true,
    },
    previousValue: {
      type: String,
      default: 'N/A',
    },
    newValue: {
      type: String,
      default: 'N/A',
    },
    complianceStandards: [
      {
        type: String,
      },
    ],
    version: {
      type: String,
      default: 'v1.0',
    },
    hasDiff: {
      type: Boolean,
      default: false,
    },
    diffDetails: {
      oldText: { type: String, default: '' },
      newText: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

const PathologyAudit = mongoose.model('PathologyAudit', pathologyAuditSchema);
export default PathologyAudit;
