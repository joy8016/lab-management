import express from 'express';
import {
  getPathologyCases,
  signPathologyCase,
  saveInterpretation,
  getTestValidations,
  validateSingleTestResult,
  batchValidateTestResults,
  retestSingleTestResult,
  getAuditLogs,
  createAuditLogEntry,
} from '../controllers/pathologistController.js';

const router = express.Router();

// Cases Queue Routes
router.get('/cases', getPathologyCases);
router.put('/cases/:id/sign', signPathologyCase);

// Interpretation Routes
router.put('/cases/:id/interpretation', saveInterpretation);

// Test Results Validation Routes
router.get('/validations', getTestValidations);
router.put('/validations/:id/validate', validateSingleTestResult);
router.put('/validations/batch-validate', batchValidateTestResults);
router.put('/validations/:id/retest', retestSingleTestResult);

// Audit Log Routes
router.get('/audit-logs', getAuditLogs);
router.post('/audit-logs', createAuditLogEntry);

export default router;
