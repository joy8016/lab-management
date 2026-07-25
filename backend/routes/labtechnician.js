import express from "express";
import { createNewSample, createPatient, getAllSamples, getPatients, getSampleById, getTestReport, updatePatientDetails } from "../controllers/labtecnicianControllers.js";

const router = express.Router()

router.post('/createPatient', createPatient)
router.post('/createNewSample', createNewSample)
router.get('/patients', getPatients)
router.get('/samples', getAllSamples)
router.get('/samples/:sampleId', getSampleById)
router.get('/report/:sampleId', getTestReport)
router.put('/updatePatient/:patientId', updatePatientDetails)
router.put('/patients/:patientId', updatePatientDetails)

export default router