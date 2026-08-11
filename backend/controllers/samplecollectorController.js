import VitalsLog from '../models/VitalsLog.js';
import BarcodeLink from '../models/BarcodeLink.js';

// @desc    Get all vitals logs
// @route   GET /api/samplecollector/vitals
export const getVitals = async (req, res) => {
  try {
    const logs = await VitalsLog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Save new vitals log
// @route   POST /api/samplecollector/vitals
export const recordVitals = async (req, res) => {
  try {
    const newLog = await VitalsLog.create(req.body);
    res.status(201).json({ success: true, data: newLog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all barcode links
// @route   GET /api/samplecollector/barcode-links
export const getBarcodeLinks = async (req, res) => {
  try {
    const links = await BarcodeLink.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: links });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Link barcode to patient
// @route   POST /api/samplecollector/barcode-link
export const linkBarcode = async (req, res) => {
  try {
    const newLink = await BarcodeLink.create(req.body);
    res.status(201).json({ success: true, data: newLink });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
