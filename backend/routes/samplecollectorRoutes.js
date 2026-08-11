import express from 'express';
import { getVitals, recordVitals, getBarcodeLinks, linkBarcode } from '../controllers/samplecollectorController.js';

const router = express.Router();

router.get('/vitals', getVitals);
router.post('/vitals', recordVitals);
router.get('/barcode-links', getBarcodeLinks);
router.post('/barcode-link', linkBarcode);

export default router;
