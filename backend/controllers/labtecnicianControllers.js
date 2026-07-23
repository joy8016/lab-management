import Patient from "../models/Patient.js";
import Sample from "../models/Sample.js";
import TestOrder from "../models/TestOrder.js";
import Report from "../models/Report.js";
import QualityControl from "../models/QualityControl.js";

// create new patient
export async function createPatient(req, res) {
    try {
        const { PatientId, fullName, dob, gender, phone, email, address } = req.body;

        if (!PatientId || !fullName || !dob || !gender) {
            return res.status(400).json({
                success: false,
                message: "PatientId, fullName, dob, and gender are required"
            });
        }

        const patient = await Patient.findOne({ patientId: PatientId });
        if (patient) {
            return res.status(400).json({
                success: false,
                message: "Patient already exists"
            });
        }

        const newPatient = new Patient({
            patientId: PatientId,
            fullName,
            dob,
            gender,
            phone,
            email,
            address
        });

        await newPatient.save();

        res.status(201).json({
            success: true,
            message: "Patient created successfully",
            data: newPatient
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error creating patient",
            error: err.message
        });
    }
}

// create new sample
export async function createNewSample(req, res) {
    try {
        const {
            sampleId,
            patient,
            patientId,
            sampleType,
            testType,
            collectionDate,
            collectionTime,
            collectionMethod,
            specimenCondition,
            urgency,
            clinicalNotes,
            barcodePrinted,
            status,
            registeredBy
        } = req.body;

        if (!sampleType) {
            return res.status(400).json({
                success: false,
                message: "sampleType is a required field"
            });
        }

        // Helper to validate Mongoose ObjectId before passing to model
        const isValidObjectId = (id) => id && typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/);

        const newSample = new Sample({
            sampleId,
            patientId,
            sampleType,
            testType,
            collectionDate: collectionDate || Date.now(),
            collectionTime,
            collectionMethod,
            specimenCondition,
            urgency,
            clinicalNotes,
            barcodePrinted,
            status,
            patient: isValidObjectId(patient) ? patient : undefined,
            registeredBy: req.user?._id || (isValidObjectId(registeredBy) ? registeredBy : undefined)
        });

        await newSample.save();

        return res.status(201).json({
            success: true,
            message: "Sample created successfully",
            data: newSample
        });

    } catch (err) {
        console.error("Error creating sample:", err);
        return res.status(500).json({
            success: false,
            message: "Error creating sample",
            error: err.message
        });
    }
}

// search or list patients from database
export async function getPatients(req, res) {
    try {
        const { query } = req.query;
        let filter = {};
        if (query) {
            filter = {
                $or: [
                    { fullName: { $regex: query, $options: 'i' } },
                    { patientId: { $regex: query, $options: 'i' } },
                    { phone: { $regex: query, $options: 'i' } }
                ]
            };
        }
        const patients = await Patient.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: patients
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching patients",
            error: err.message
        });
    }
}

// get all samples
export async function getAllSamples(req, res){
    try{
        const samples = await Sample.find().sort({createdAt: -1})
        res.status(200).json({

            success:true,
            message:"fetch all samples",
            data:samples
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"error to fetching samples",
            error:err.message
        })

    }
}
