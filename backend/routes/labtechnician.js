import express from "express";
import { createNewSample, createPatient, getAllSamples, getPatients } from "../controllers/labtecnicianControllers.js";

const router = express.Router()

router.post('/createPatient', createPatient)
router.post('/createNewSample', createNewSample)
router.get('/patients', getPatients)
router.get('/samples', getAllSamples)

export default router