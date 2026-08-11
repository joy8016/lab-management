import PathologyCase from '../models/PathologyCase.js';
import TestValidation from '../models/TestValidation.js';
import PathologyAudit from '../models/PathologyAudit.js';

// Seed Initial Pathology Cases if DB is empty
const seedPathologyCases = async () => {
  const count = await PathologyCase.countDocuments();
  if (count === 0) {
    const initialCases = [
      {
        caseId: 'CAS-2026-001',
        patientName: 'Sarah Jenkins',
        patientId: 'PT-8831',
        age: 45,
        gender: 'Female',
        testType: 'Histopathology - Biopsy',
        category: 'Histopathology',
        urgent: true,
        status: 'Pending Review',
        submittedDate: '2026-04-05 09:30 AM',
        physician: 'Dr. Alan Grant',
        specimen: 'Colonic Polyp Biopsy',
        findings: '',
        microscopic: 'Sections show fragment of tissue composed of columnar epithelium displaying moderate nuclear atypia.',
        staging: 'pT2 N0 M0',
        recommendations: ['Follow-up endoscopy in 6 weeks'],
        testResults: [
          { name: 'Tissue Specimen Architecture', value: 'Abnormal Cellular Density', status: null, reference: 'Normal Architecture' },
          { name: 'Mitotic Rate', value: '4 per 10 HPF', status: null, reference: '< 2 per 10 HPF' },
          { name: 'Surgically Clear Margins', value: 'Inconclusive (2mm)', status: null, reference: '> 5mm' },
        ],
        validatedValues: [
          { name: 'Specimen Size', value: '1.2 x 0.8 cm' },
          { name: 'Margin Status', value: 'Inconclusive (2mm)' },
        ],
      },
      {
        caseId: 'CAS-2026-002',
        patientName: 'Robert Chen',
        patientId: 'PT-4412',
        age: 62,
        gender: 'Male',
        testType: 'Cytopathology - Pap Smear',
        category: 'Cytopathology',
        urgent: false,
        status: 'Pending Review',
        submittedDate: '2026-04-05 10:15 AM',
        physician: 'Dr. Maria Santos',
        specimen: 'Cervical Cytology',
        findings: '',
        microscopic: 'Smear demonstrates adequate squamous component with NILM classification.',
        staging: 'NILM',
        recommendations: ['Repeat Cytology in 12 months'],
        testResults: [
          { name: 'Epithelial Cell Analysis', value: 'NILM (Negative)', status: 'approve', reference: 'NILM' },
          { name: 'Endocervical Component', value: 'Present', status: 'approve', reference: 'Present' },
        ],
        validatedValues: [
          { name: 'Specimen Adequacy', value: 'Satisfactory' },
        ],
      },
      {
        caseId: 'CAS-2026-003',
        patientName: 'Elena Rostova',
        patientId: 'PT-9102',
        age: 38,
        gender: 'Female',
        testType: 'Dermatopathology Skin Lesion',
        category: 'Histopathology',
        urgent: true,
        status: 'In Review',
        submittedDate: '2026-04-04 04:45 PM',
        physician: 'Dr. James Vance',
        specimen: 'Skin Lesion Excision',
        findings: 'Atypical melanocytic proliferation observed.',
        microscopic: 'Breslow thickness 0.8 mm with no ulceration.',
        staging: 'Stage IA (pT1b)',
        recommendations: ['Re-excision with 1cm margin'],
        testResults: [
          { name: 'Breslow Thickness', value: '0.8 mm', status: null, reference: '< 0.75 mm' },
          { name: 'Ulceration', value: 'Absent', status: 'approve', reference: 'Absent' },
          { name: 'Ki-67 Index', value: '8%', status: null, reference: '< 5%' },
        ],
        validatedValues: [
          { name: 'Mitotic Index', value: '1/mm2' },
        ],
      },
      {
        caseId: 'CAS-2026-004',
        patientName: 'Marcus Vance',
        patientId: 'PT-3301',
        age: 54,
        gender: 'Male',
        testType: 'Surgical Pathology - Appendectomy',
        category: 'Surgical Pathology',
        urgent: false,
        status: 'Pending Review',
        submittedDate: '2026-04-05 11:00 AM',
        physician: 'Dr. Sarah Connor',
        specimen: 'Appendix Specimen',
        findings: '',
        microscopic: 'Neutrophilic infiltrate in muscularis propria.',
        staging: 'Acute Suppurative Appendicitis',
        recommendations: ['Routine postoperative follow-up'],
        testResults: [
          { name: 'Mucosal Inflammation', value: 'Acute Neutrophilic Infiltrate', status: null, reference: 'None' },
          { name: 'Serosal Exudate', value: 'Fibrinous Exudate Present', status: null, reference: 'None' },
        ],
        validatedValues: [
          { name: 'Perforation', value: 'Absent' },
        ],
      },
    ];
    await PathologyCase.insertMany(initialCases);
  }
};

// Seed Initial Test Validations if DB is empty
const seedTestValidations = async () => {
  const count = await TestValidation.countDocuments();
  if (count === 0) {
    const initialValidations = [
      {
        valId: 'VAL-901',
        sampleId: 'SMP-2026-8801',
        patientName: 'David Miller',
        age: 52,
        gender: 'Male',
        equipment: 'Sysmex XN-1000 Hematology',
        qcStatus: 'QC PASS',
        testName: 'Hemoglobin (Hb)',
        measuredValue: 6.8,
        unit: 'g/dL',
        refRange: '13.5 - 17.5',
        minRef: 13.5,
        maxRef: 17.5,
        flag: 'CRITICAL LOW',
        category: 'Hematology',
        timestamp: '2026-08-06 10:12 AM',
        validated: false,
      },
      {
        valId: 'VAL-902',
        sampleId: 'SMP-2026-8802',
        patientName: 'Sophia Rodriguez',
        age: 34,
        gender: 'Female',
        equipment: 'Roche Cobas c501 Chemistry',
        qcStatus: 'QC PASS',
        testName: 'Fasting Plasma Glucose',
        measuredValue: 245,
        unit: 'mg/dL',
        refRange: '70 - 99',
        minRef: 70,
        maxRef: 99,
        flag: 'CRITICAL HIGH',
        category: 'Biochemistry',
        timestamp: '2026-08-06 10:20 AM',
        validated: false,
      },
      {
        valId: 'VAL-903',
        sampleId: 'SMP-2026-8803',
        patientName: 'Arthur Pendelton',
        age: 68,
        gender: 'Male',
        equipment: 'Abbott Alinity i Immunoassay',
        qcStatus: 'QC PASS',
        testName: 'Serum Creatinine',
        measuredValue: 2.4,
        unit: 'mg/dL',
        refRange: '0.7 - 1.3',
        minRef: 0.7,
        maxRef: 1.3,
        flag: 'HIGH',
        category: 'Biochemistry',
        timestamp: '2026-08-06 10:28 AM',
        validated: false,
      },
      {
        valId: 'VAL-904',
        sampleId: 'SMP-2026-8804',
        patientName: 'Emily Watson',
        age: 28,
        gender: 'Female',
        equipment: 'Sysmex XN-1000 Hematology',
        qcStatus: 'QC PASS',
        testName: 'White Blood Cell (WBC)',
        measuredValue: 7.2,
        unit: 'x10^3/µL',
        refRange: '4.5 - 11.0',
        minRef: 4.5,
        maxRef: 11.0,
        flag: 'NORMAL',
        category: 'Hematology',
        timestamp: '2026-08-06 10:35 AM',
        validated: false,
      },
      {
        valId: 'VAL-905',
        sampleId: 'SMP-2026-8805',
        patientName: 'Marcus Aurelius',
        age: 60,
        gender: 'Male',
        equipment: 'Roche Cobas c501 Chemistry',
        qcStatus: 'QC WARNING',
        testName: 'Serum Potassium (K+)',
        measuredValue: 6.2,
        unit: 'mmol/L',
        refRange: '3.5 - 5.1',
        minRef: 3.5,
        maxRef: 5.1,
        flag: 'CRITICAL HIGH',
        category: 'Biochemistry',
        timestamp: '2026-08-06 10:40 AM',
        validated: false,
      },
    ];
    await TestValidation.insertMany(initialValidations);
  }
};

// Seed Initial Pathology Audit Logs if DB is empty
const seedPathologyAuditLogs = async () => {
  const count = await PathologyAudit.countDocuments();
  if (count === 0) {
    const initialAudits = [
      {
        logId: 'AUD-8801',
        timestamp: '2026-08-06 10:45:12 AM',
        caseId: 'CAS-2026-001',
        patientName: 'Sarah Jenkins',
        user: 'Dr. Evelyn Vance (Pathologist)',
        userRole: 'Pathologist',
        ipAddress: '192.168.1.104',
        actionCategory: 'REPORT_DIGITALLY_SIGNED',
        actionDescription: 'Digitally signed and finalized pathology report.',
        previousValue: 'Status: Pending Review',
        newValue: 'Status: Signed & Finalized',
        complianceStandards: ['HIPAA §164.312', 'CAP Gen.41350', 'ISO 15189:2022'],
        version: 'v2.0 (Final)',
        hasDiff: true,
        diffDetails: {
          oldText: 'Report status: Pending Review by Pathologist.\nFindings: Pending clinical commentary.',
          newText: 'Report status: Signed & Finalized by Dr. Evelyn Vance.\nFindings: Unremarkable microscopic impression.\nDigital Signature ID: SIG-990218-SHA256',
        },
      },
      {
        logId: 'AUD-8802',
        timestamp: '2026-08-06 10:32:05 AM',
        caseId: 'CAS-2026-003',
        patientName: 'Elena Rostova',
        user: 'Tech. Marcus Brody',
        userRole: 'Lab Technician',
        ipAddress: '192.168.1.112',
        actionCategory: 'RESULT_VALUE_MODIFIED',
        actionDescription: 'Corrected WBC counter value after re-run on Sysmex XN-1000.',
        previousValue: 'WBC: 18.5 x10^3/µL',
        newValue: 'WBC: 7.2 x10^3/µL',
        complianceStandards: ['CAP HEM.25300', 'ISO 15189:2022 §5.6'],
        version: 'v1.1 (Amended)',
        hasDiff: true,
        diffDetails: {
          oldText: 'Sysmex Automated Counter Run #1: WBC 18.5 x10^3/µL (Flagged High).',
          newText: 'Sysmex Automated Counter Run #2 (Re-dilution): WBC 7.2 x10^3/µL (Verified Normal).',
        },
      },
    ];
    await PathologyAudit.insertMany(initialAudits);
  }
};

// @desc    Get All Pathology Cases
// @route   GET /api/pathologist/cases
export const getPathologyCases = async (req, res) => {
  try {
    const cases = await PathologyCase.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: cases.length,
      data: cases.map(c => ({
        id: c.caseId,
        _id: c._id,
        patient: c.patientName,
        patientId: c.patientId,
        age: c.age,
        gender: c.gender,
        testType: c.testType,
        category: c.category,
        urgent: c.urgent,
        status: c.status,
        submittedDate: c.submittedDate,
        physician: c.physician,
        specimen: c.specimen,
        findings: c.findings,
        microscopic: c.microscopic,
        staging: c.staging,
        recommendations: c.recommendations,
        testResults: c.testResults,
        validatedValues: c.validatedValues,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Sign & Finalize Pathology Case Report
// @route   PUT /api/pathologist/cases/:id/sign
export const signPathologyCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { findings, testResults } = req.body;

    let pCase = await PathologyCase.findOne({ caseId: id });
    if (!pCase) {
      pCase = await PathologyCase.findById(id);
    }
    if (!pCase) {
      return res.status(404).json({ success: false, message: 'Pathology Case not found' });
    }

    pCase.status = 'Signed & Finalized';
    if (findings) pCase.findings = findings;
    if (testResults) pCase.testResults = testResults;
    await pCase.save();

    // Create Audit Log Entry in MongoDB
    const auditId = `AUD-${Math.floor(1000 + Math.random() * 9000)}`;
    await PathologyAudit.create({
      logId: auditId,
      timestamp: new Date().toLocaleString(),
      caseId: pCase.caseId,
      patientName: pCase.patientName,
      user: 'Dr. Chief Pathologist',
      userRole: 'Pathologist',
      ipAddress: req.ip || '192.168.1.100',
      actionCategory: 'REPORT_DIGITALLY_SIGNED',
      actionDescription: `Digitally signed report for ${pCase.caseId}`,
      previousValue: 'Status: Pending Review',
      newValue: 'Status: Signed & Finalized',
      complianceStandards: ['HIPAA §164.312', 'CAP Gen.41350', 'ISO 15189:2022'],
      version: 'v2.0 (Final)',
      hasDiff: true,
      diffDetails: {
        oldText: 'Status: Pending Review',
        newText: `Status: Signed & Finalized. Findings: ${pCase.findings}`,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Report digitally signed and finalized',
      data: pCase,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Save/Publish Clinical Interpretation
// @route   PUT /api/pathologist/cases/:id/interpretation
export const saveInterpretation = async (req, res) => {
  try {
    const { id } = req.params;
    const { findings, microscopic, staging, recommendations } = req.body;

    let pCase = await PathologyCase.findOne({ caseId: id });
    if (!pCase) {
      pCase = await PathologyCase.findById(id);
    }
    if (!pCase) {
      return res.status(404).json({ success: false, message: 'Pathology Case not found' });
    }

    if (findings !== undefined) pCase.findings = findings;
    if (microscopic !== undefined) pCase.microscopic = microscopic;
    if (staging !== undefined) pCase.staging = staging;
    if (recommendations !== undefined) pCase.recommendations = recommendations;

    await pCase.save();

    // Create Audit Log
    const auditId = `AUD-${Math.floor(1000 + Math.random() * 9000)}`;
    await PathologyAudit.create({
      logId: auditId,
      timestamp: new Date().toLocaleString(),
      caseId: pCase.caseId,
      patientName: pCase.patientName,
      user: 'Dr. Chief Pathologist',
      userRole: 'Pathologist',
      ipAddress: req.ip || '192.168.1.100',
      actionCategory: 'INTERPRETATION_ADDED',
      actionDescription: `Saved clinical interpretation for ${pCase.caseId}`,
      previousValue: 'Interpretation Pending',
      newValue: `Staging: ${pCase.staging}`,
      complianceStandards: ['HIPAA §164.312', 'CAP CYP.28000'],
      version: 'v1.1',
      hasDiff: false,
    });

    res.status(200).json({
      success: true,
      message: 'Interpretation saved successfully',
      data: pCase,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get All Test Validations
// @route   GET /api/pathologist/validations
export const getTestValidations = async (req, res) => {
  try {
    const validations = await TestValidation.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: validations.length,
      data: validations.map(v => ({
        id: v.valId,
        _id: v._id,
        sampleId: v.sampleId,
        patientName: v.patientName,
        age: v.age,
        gender: v.gender,
        equipment: v.equipment,
        qcStatus: v.qcStatus,
        testName: v.testName,
        measuredValue: v.measuredValue,
        unit: v.unit,
        refRange: v.refRange,
        minRef: v.minRef,
        maxRef: v.maxRef,
        flag: v.flag,
        category: v.category,
        timestamp: v.timestamp,
        validated: v.validated,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Validate Single Test Result
// @route   PUT /api/pathologist/validations/:id/validate
export const validateSingleTestResult = async (req, res) => {
  try {
    const { id } = req.params;
    let item = await TestValidation.findOne({ valId: id });
    if (!item) item = await TestValidation.findById(id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Test Result not found' });
    }

    item.validated = true;
    await item.save();

    res.status(200).json({
      success: true,
      message: `Test result ${id} validated successfully`,
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Batch Validate Test Results
// @route   PUT /api/pathologist/validations/batch-validate
export const batchValidateTestResults = async (req, res) => {
  try {
    const { ids } = req.body; // array of valIds
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ success: false, message: 'Please provide an array of IDs' });
    }

    await TestValidation.updateMany(
      { $or: [{ valId: { $in: ids } }, { _id: { $in: ids } }] },
      { $set: { validated: true } }
    );

    res.status(200).json({
      success: true,
      message: `Batch validated ${ids.length} test result(s)`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Re-test Test Result
// @route   PUT /api/pathologist/validations/:id/retest
export const retestSingleTestResult = async (req, res) => {
  try {
    const { id } = req.params;
    let item = await TestValidation.findOne({ valId: id });
    if (!item) item = await TestValidation.findById(id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Test Result not found' });
    }

    item.flag = 'RE-TEST ORDERED';
    item.qcStatus = 'RE-CALIBRATE';
    await item.save();

    res.status(200).json({
      success: true,
      message: `Re-test ordered for ${id}`,
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get All Audit Logs
// @route   GET /api/pathologist/audit-logs
export const getAuditLogs = async (req, res) => {
  try {
    const logs = await PathologyAudit.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs.map(l => ({
        id: l.logId,
        _id: l._id,
        timestamp: l.timestamp,
        caseId: l.caseId,
        patientName: l.patientName,
        user: l.user,
        userRole: l.userRole,
        ipAddress: l.ipAddress,
        actionCategory: l.actionCategory,
        actionDescription: l.actionDescription,
        previousValue: l.previousValue,
        newValue: l.newValue,
        complianceStandards: l.complianceStandards,
        version: l.version,
        hasDiff: l.hasDiff,
        diffDetails: l.diffDetails,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create Audit Log Entry
// @route   POST /api/pathologist/audit-logs
export const createAuditLogEntry = async (req, res) => {
  try {
    const { caseId, patientName, actionCategory, actionDescription, previousValue, newValue, diffDetails } = req.body;

    const auditId = `AUD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLog = await PathologyAudit.create({
      logId: auditId,
      timestamp: new Date().toLocaleString(),
      caseId: caseId || 'CAS-2026-GEN',
      patientName: patientName || 'General Patient',
      user: 'Dr. Chief Pathologist',
      userRole: 'Pathologist',
      ipAddress: req.ip || '127.0.0.1',
      actionCategory: actionCategory || 'GENERAL_ACTION',
      actionDescription: actionDescription || 'Pathologist Action Logged',
      previousValue: previousValue || 'N/A',
      newValue: newValue || 'N/A',
      complianceStandards: ['HIPAA §164.312', 'ISO 15189:2022'],
      version: 'v1.0',
      hasDiff: Boolean(diffDetails),
      diffDetails: diffDetails || { oldText: '', newText: '' },
    });

    res.status(201).json({
      success: true,
      data: newLog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
