import express from 'express';
import {
  getInventoryRequests,
  approveInventoryRequest,
  rejectInventoryRequest,
  getRoster,
  addStaffShift,
  removeStaffShift,
  getOperationsOverview,
  getQualityControl,
} from '../controllers/labmanagerController.js';

const router = express.Router();

// Inventory Purchase Requests
router.get('/inventory-requests', getInventoryRequests);
router.put('/inventory-requests/:id/approve', approveInventoryRequest);
router.put('/inventory-requests/:id/reject', rejectInventoryRequest);

// Staff Roster & Scheduling
router.get('/roster', getRoster);
router.post('/roster', addStaffShift);
router.delete('/roster/:id', removeStaffShift);

// Operations Overview & QC
router.get('/operations-overview', getOperationsOverview);
router.get('/quality-control', getQualityControl);

export default router;
