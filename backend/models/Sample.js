import mongoose from 'mongoose';

const sampleSchema = new mongoose.Schema(
  {
    sampleId: {
      type: String,
      trim: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    patientId: {
      type: String,
      trim: true,
    },
    sampleType: {
      type: String,
      required: [true, 'Sample type is required'],
      enum: {
        values: [
          'Blood (Whole Blood/EDTA)',
          'Blood (Serum)',
          'Blood (Plasma)',
          'Urine (Midstream)',
          'Stool Specimen',
          'CSF (Cerebrospinal Fluid)',
          'Swab (Nasopharyngeal)',
          'Tissue Biopsy',
          'Other',
        ],
        message: '{VALUE} is not a valid sample type',
      },
    },
    testType: [
      {
        type: String,
        enum: {
          values: [
            
            'CBC + Diff',
            'Lipid Panel',
            'Thyroid Panel (TSH)',
            'Metabolic Panel',
            'Liver Function Test (LFT)',
            'Urinalysis Complete',
            'HbA1c Glycated Hemoglobin',
           
            'Basic Metabolic Panel (BMP)',
            'Comprehensive Metabolic Panel (CMP)',
            'Renal Function Test (KFT/RFT)',
            'Electrolytes Panel',
            'ESR (Erythrocyte Sedimentation Rate)',
            'Coagulation Profile (PT/INR, PTT)',
            'Blood Group & Rh Typing',
            'Thyroid Profile (T3, T4, TSH)',
            'Vitamin D (25-OH)',
            'Vitamin B12',
            'Serum Ferritin',
            'Prostate-Specific Antigen (PSA)',
            'Urine Culture & Sensitivity',
            'Stool Routine & Occult Blood',
            'Dengue NS1 Antigen & Antibodies',
            'Malaria Parasite (MP)',
            'Typhoid (Widal Test)',
            'C-Reactive Protein (CRP)',
            'Cardiac Markers (Troponin-I, CK-MB)',
            'D-Dimer',
            'RT-PCR Viral Test',
            'Sputum for AFB',
            'Other',
          ],
          message: '{VALUE} is not a valid test type',
        },
      },
    ],
    collectionDate: {
      type: Date,
      default: Date.now,
    },
    collectionTime: {
      type: String,
      trim: true,
    },
    collectionMethod: {
      type: String,
      trim: true,
      default: 'Venipuncture',
    },
    specimenCondition: {
      type: String,
      enum: {
        values: ['Normal', 'Hemolyzed', 'Insufficient (QNS)', 'Other'],
        message: '{VALUE} is not a valid specimen condition',
      },
      default: 'Normal',
    },
    urgency: {
      type: String,
      enum: {
        values: ['Routine', 'Urgent', 'STAT (Urgent)'],
        message: '{VALUE} is not a valid urgency level',
      },
      default: 'Routine',
    },
    clinicalNotes: {
      type: String,
      trim: true,
    },
    barcodePrinted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: {
        values: [
          'Pending',
          'In Progress',
          'Pending QC',
          'Completed',
          'Awaiting Approval',
          'Flagged',
        ],
        message: '{VALUE} is not a valid sample status',
      },
      default: 'Pending',
    },
    registeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Sample = mongoose.model('Sample', sampleSchema);
export default Sample;
