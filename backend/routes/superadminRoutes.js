import express from 'express';
import {
  getDashboardStats,
  getBranches,
  addBranch,
  getUsers,
  provisionUser,
  toggleUserStatus,
  getTestCatalog,
  addTestCatalogItem,
  getPricingBilling,
  updateTestPrice,
} from '../controllers/superadminController.js';

const router = express.Router();

// Dashboard Stats & Audit Logs
router.get('/dashboard-stats', getDashboardStats);

// Branches Management
router.get('/branches', getBranches);
router.post('/branches', addBranch);

// Users & Provisioning Management
router.get('/users', getUsers);
router.post('/users', provisionUser);
router.put('/users/:id/toggle-status', toggleUserStatus);

// Test Catalog Management
router.get('/test-catalog', getTestCatalog);
router.post('/test-catalog', addTestCatalogItem);

// Pricing & Billing Management
router.get('/pricing-billing', getPricingBilling);
router.put('/pricing-matrix/:id', updateTestPrice);

export default router;
