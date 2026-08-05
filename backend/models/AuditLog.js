import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
    },
    userAction: {
      type: String,
      required: true,
    },
    impactedEntity: {
      type: String,
      required: true,
    },
    admin: {
      type: String,
      default: 'Super Admin',
    },
  },
  {
    timestamps: true,
  }
);

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
