import React, { useState, useMemo } from 'react';
import { useLims } from '../../../context/LimsContext';

// Standardized clinical report templates
const REPORT_TEMPLATES = [
  {
    id: 'histo_biopsy',
    title: 'Histopathology Biopsy (Standard)',
    category: 'Histopathology',
    summary: 'Specimen demonstrates acute-on-chronic inflammatory changes with mucosal ulceration.',
    microscopic: 'Sections show fragment of tissue composed of columnar epithelium displaying moderate nuclear atypia, increased mitotic activity, and focal glandular crowding.',
    staging: 'pT2 N0 M0',
    recommendations: ['Immunohistochemistry (IHC) panel for Ki-67 and p53', 'Follow-up endoscopy in 6 weeks', 'Correlate with serum tumor markers']
  },
  {
    id: 'ihc_panel',
    title: 'Immunohistochemistry (IHC) Breast Panel',
    category: 'Immunohistochemistry',
    summary: 'Invasive ductal carcinoma (IDC), Grade 2. ER/PR Positive, HER2 Negative (Score 1+).',
    microscopic: 'Estrogen Receptor (ER): Strong nuclear positivity in 85% of tumor cells. Progesterone Receptor (PR): Moderate nuclear positivity in 60% of tumor cells. HER2/neu: Membrane staining 1+ (Negative). Ki-67 proliferation index: 18%.',
    staging: 'Stage IIA (pT2 N0 M0)',
    recommendations: ['Endocrine therapy candidate', 'Oncotype DX testing recommended if clinically indicated', 'Multidisciplinary tumor board review']
  },
  {
    id: 'cyto_pap',
    title: 'Cytopathology - Bethesda System Pap Smear',
    category: 'Cytopathology',
    summary: 'Atypical Squamous Cells of Undetermined Significance (ASC-US).',
    microscopic: 'Smear demonstrates adequate squamous component with scattered cells showing nuclear enlargement, hyperchromasia, and mild irregular nuclear contours. No high-grade intraepithelial lesion (HSIL) identified.',
    staging: 'N/A (Non-Neoplastic/ASC-US)',
    recommendations: ['Reflex High-Risk HPV DNA Co-Testing', 'Repeat Cytology in 6 to 12 months', 'Colposcopy if HPV 16/18 positive']
  },
  {
    id: 'bone_marrow',
    title: 'Bone Marrow Aspiration & Biopsy',
    category: 'Hematopathology',
    summary: 'Hypercellular bone marrow with erythroid hyperplasia and mild megakaryocytic atypia.',
    microscopic: 'Marrow cellularity is approximately 70%. M:E ratio is decreased (1:1). Erythroid precursors show megaloblastoid changes. Blasts account for 2% of total nucleated cells.',
    staging: 'Evaluation for Myelodysplastic Syndrome (MDS)',
    recommendations: ['Cytogenetic analysis (Karyotype + FISH panel)', 'Next-Generation Sequencing (NGS) myeloid panel', 'Serum Ferritin and Vitamin B12 / Folate level correlation']
  }
];

// Mock cases ready for interpretation
const mockInterpretationCases = [
  {
    id: 'CAS-2026-101',
    patientName: 'Sarah Jenkins',
    patientId: 'PT-8831',
    age: 45,
    gender: 'Female',
    testType: 'Surgical Pathology Biopsy',
    physician: 'Dr. Alan Grant',
    submittedDate: '2026-08-05 02:15 PM',
    status: 'Pending Interpretation',
    specimen: 'Colonic Polyp Biopsy',
    validatedValues: [
      { name: 'Specimen Size', value: '1.2 x 0.8 cm' },
      { name: 'Margin Status', value: 'Surgically Clear (3mm)' },
    ]
  },
  {
    id: 'CAS-2026-102',
    patientName: 'Robert Chen',
    patientId: 'PT-4412',
    age: 62,
    gender: 'Male',
    testType: 'IHC Biomarker Panel',
    physician: 'Dr. Maria Santos',
    submittedDate: '2026-08-06 08:30 AM',
    status: 'Pending Interpretation',
    specimen: 'Left Breast Core Biopsy',
    validatedValues: [
      { name: 'ER Status', value: 'Positive (85%)' },
      { name: 'PR Status', value: 'Positive (60%)' },
      { name: 'HER2 Status', value: '1+ Negative' },
    ]
  },
  {
    id: 'CAS-2026-103',
    patientName: 'Elena Rostova',
    patientId: 'PT-9102',
    age: 38,
    gender: 'Female',
    testType: 'Cervical Cytology (Pap)',
    physician: 'Dr. James Vance',
    submittedDate: '2026-08-06 09:45 AM',
    status: 'Pending Interpretation',
    specimen: 'ThinPrep Liquid Cytology',
    validatedValues: [
      { name: 'Specimen Adequacy', value: 'Satisfactory' },
      { name: 'HPV High-Risk DNA', value: 'Detected (Pool 16/18)' },
    ]
  }
];

export default function AddInterpretations() {
  const {
    pathologyCases: dbCases,
    saveInterpretationDB,
    createAuditLogDB,
  } = useLims();

  // Merge database cases with mock cases
  const availableCases = useMemo(() => {
    if (dbCases && dbCases.length > 0) {
      const existingIds = new Set(dbCases.map(c => c.id));
      const uniqueMock = mockInterpretationCases.filter(c => !existingIds.has(c.id));
      return [...dbCases.map(c => ({
        id: c.id,
        patientName: c.patient || c.patientName,
        patientId: c.patientId || c.id,
        age: c.age || 45,
        gender: c.gender || 'Female',
        testType: c.testType || 'Pathology Review',
        physician: c.physician || 'Dr. Attending Physician',
        submittedDate: c.submittedDate || 'Today',
        status: c.status || 'Pending Interpretation',
        specimen: c.specimen || 'Tissue Specimen',
        validatedValues: c.validatedValues || [{ name: 'Primary Diagnostic Marker', value: 'Verified' }]
      })), ...uniqueMock];
    }
    return mockInterpretationCases;
  }, [dbCases]);

  const [selectedCase, setSelectedCase] = useState(availableCases[0] || mockInterpretationCases[0]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  
  // Editor State
  const [summary, setSummary] = useState('');
  const [microscopic, setMicroscopic] = useState('');
  const [staging, setStaging] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [customRecInput, setCustomRecInput] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [draftSaved, setDraftSaved] = useState(false);

  // Apply Structured Template
  const handleApplyTemplate = (templateId) => {
    const tmpl = REPORT_TEMPLATES.find(t => t.id === templateId);
    if (!tmpl) return;
    setSelectedTemplateId(templateId);
    setSummary(tmpl.summary);
    setMicroscopic(tmpl.microscopic);
    setStaging(tmpl.staging);
    setRecommendations([...tmpl.recommendations]);
    setDraftSaved(false);
  };

  // Add Custom Recommendation
  const handleAddRecommendation = () => {
    if (!customRecInput.trim()) return;
    setRecommendations(prev => [...prev, customRecInput.trim()]);
    setCustomRecInput('');
  };

  // Remove Recommendation
  const handleRemoveRecommendation = (idx) => {
    setRecommendations(prev => prev.filter((_, i) => i !== idx));
  };

  // Save Draft connected to DB
  const handleSaveDraft = async () => {
    if (saveInterpretationDB && selectedCase) {
      await saveInterpretationDB(selectedCase.id, {
        findings: summary,
        microscopic,
        staging,
        recommendations,
      });
    }
    setDraftSaved(true);
    setToastMessage(`Draft interpretation saved for case ${selectedCase.id} in MongoDB.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Finalize & Dispatch Interpretation connected to DB
  const handleFinalizeInterpretation = async () => {
    if (saveInterpretationDB && selectedCase) {
      await saveInterpretationDB(selectedCase.id, {
        findings: summary,
        microscopic,
        staging,
        recommendations,
      });
    }
    if (createAuditLogDB && selectedCase) {
      createAuditLogDB({
        caseId: selectedCase.id,
        patientName: selectedCase.patientName,
        actionCategory: 'INTERPRETATION_ADDED',
        actionDescription: `Published clinical interpretation for ${selectedCase.id}`,
        previousValue: 'Interpretation Pending',
        newValue: `Staging: ${staging || 'Finalized'}`,
      });
    }
    setToastMessage(`Diagnostic Interpretation successfully published to MongoDB & attached to case ${selectedCase.id}!`);
    setTimeout(() => setToastMessage(null), 4000);
    setDraftSaved(true);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 space-y-6 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-teal-900 text-white px-5 py-3 rounded-xl shadow-xl border border-teal-700 flex items-center gap-3 animate-fade-in">
          <svg className="w-5 h-5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Add Interpretations & Clinical Reporting</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Attach qualitative medical opinions, diagnostic summaries, structured pathology staging, and clinical recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
          >
            Save Draft
          </button>
          <button
            onClick={handleFinalizeInterpretation}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 transition cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <svg className="w-4 h-4 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Publish Interpretation</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Case Queue, Right Interpretation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Select Case & Template Picker (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Case Selection List */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cases Awaiting Interpretation</h3>
            <div className="space-y-2">
              {mockInterpretationCases.map(c => {
                const isSelected = selectedCase.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCase(c);
                      setSummary('');
                      setMicroscopic('');
                      setStaging('');
                      setRecommendations([]);
                      setSelectedTemplateId('');
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-teal-50/70 border-teal-300 ring-2 ring-teal-100'
                        : 'bg-white border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-800">{c.id}</span>
                      <span className="text-[10px] font-semibold text-gray-400">{c.submittedDate}</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{c.patientName}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{c.testType} • {c.specimen}</div>
                    <div className="text-[11px] text-teal-700 font-medium mt-1">Ref. Doctor: {c.physician}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Structured Template Library */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Standardized Template Library</h3>
              <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">Quick Fill</span>
            </div>
            
            <div className="space-y-2">
              {REPORT_TEMPLATES.map(tmpl => (
                <button
                  key={tmpl.id}
                  onClick={() => handleApplyTemplate(tmpl.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer ${
                    selectedTemplateId === tmpl.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="font-bold">{tmpl.title}</div>
                  <div className={`text-[10px] mt-0.5 ${selectedTemplateId === tmpl.id ? 'text-slate-300' : 'text-gray-500'}`}>
                    Category: {tmpl.category}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Clinical Report Editor (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Active Case Banner */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-teal-400 font-mono font-bold">Active Interpretation Target</span>
                <h2 className="text-lg font-bold text-white mt-0.5">{selectedCase.patientName} ({selectedCase.id})</h2>
              </div>
              <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold px-3 py-1 rounded-full">
                {selectedCase.testType}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Age / Gender</span>
                <span className="font-semibold text-slate-200">{selectedCase.age} Yrs • {selectedCase.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Specimen</span>
                <span className="font-semibold text-slate-200">{selectedCase.specimen}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Primary Physician</span>
                <span className="font-semibold text-slate-200">{selectedCase.physician}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">MRN / ID</span>
                <span className="font-semibold text-teal-300 font-mono">{selectedCase.patientId}</span>
              </div>
            </div>

            {/* Validated Lab Values Summary */}
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 mt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Validated Lab Values Received:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedCase.validatedValues.map((v, i) => (
                  <span key={i} className="bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-300">
                    <strong className="text-teal-400">{v.name}:</strong> {v.value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form Section 1: Diagnostic Summary */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
              1. Diagnostic Impression / Qualitative Summary
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Enter high-level diagnostic impression or select a template on the left..."
              className="w-full p-3 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none resize-none transition"
            />
          </div>

          {/* Form Section 2: Microscopic & Clinical Analysis */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
              2. Detailed Microscopic &amp; Histopathological Observations
            </label>
            <textarea
              rows={4}
              value={microscopic}
              onChange={(e) => setMicroscopic(e.target.value)}
              placeholder="Describe cellular structure, tissue margins, mitotic counts, nuclear atypia, or immunophenotype..."
              className="w-full p-3 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none resize-none transition"
            />
          </div>

          {/* Form Section 3: Tumor / Specimen Staging */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
              3. Pathological Staging &amp; Classification (e.g. TNM / Bethesda)
            </label>
            <input
              type="text"
              value={staging}
              onChange={(e) => setStaging(e.target.value)}
              placeholder="e.g. pT2 N0 M0 (Stage IIA) or ASC-US"
              className="w-full p-3 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none transition"
            />
          </div>

          {/* Form Section 4: Follow-up Diagnostic Recommendations */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
            <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
              4. Follow-up Diagnostic Recommendations for Primary Care Physician
            </label>
            
            {/* List of active recommendations */}
            <div className="space-y-2">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-center justify-between bg-teal-50/60 border border-teal-100 p-2.5 rounded-xl text-xs text-teal-900 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                    <span>{rec}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveRecommendation(idx)}
                    className="text-red-500 hover:text-red-700 font-bold px-2 py-0.5 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Input to add custom recommendation */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Type custom recommendation (e.g. Recommend reflex HPV co-testing)..."
                value={customRecInput}
                onChange={(e) => setCustomRecInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddRecommendation()}
                className="flex-1 p-2.5 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none"
              />
              <button
                onClick={handleAddRecommendation}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
