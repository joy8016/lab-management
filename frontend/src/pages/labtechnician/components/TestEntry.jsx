import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PendingSamplesQueue from './PendingSamplesQueue'
import FlaggedResultsReview from './FlaggedResultsReview'

export default function TestEntry() {
  // Navigation & Workflow state
  const [activeSubTab, setActiveSubTab] = useState('pending')
  const [currentStep, setCurrentStep] = useState('entered') // 'received' | 'synced' | 'entered' | 'draft' | 'approved'
  const [toastMessage, setToastMessage] = useState(null)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  // Sub Tabs
  const subTabs = [
    { id: 'pending', label: 'Pending Samples (4)' },
    { id: 'active', label: 'Active Tests (8)' },
    { id: 'abnormal', label: 'Abnormal Review (3)' },
  ]

  // Samples Database with specimen details
  const samplesData = {
    'LAB-23456': {
      id: 'LAB-23456',
      patient: 'John Doe',
      dob: '05/12/1981',
      gender: 'Male',
      testType: 'CBC + Differential Results (STAT Order)',
      urgency: 'STAT',
      wbc: {
        value: '14.5',
        inputMode: 'Input',
        units: 'x10^9/L',
        instrument: 'Sysmex XN-1000',
        syncedTime: 'Auto-Synced, 10:38:38 EMT',
        refMin: 4.0,
        refMax: 11.0,
        flag: 'Critical High Leukocytosis',
        isCritical: true
      },
      redCellParams: [
        { id: 'rbc', name: 'RBC', instrument: 'Manual Entry/Interface', value: '4.8', units: 'ug/L', refMin: 1.8, refMax: 4.8, flag: '', isChecked: false, isHighlight: false },
        { id: 'hgb', name: 'Hgb', instrument: 'Manual Entry/Interface', value: '6.2', units: 'ug/L', refMin: 13.9, refMax: 13.9, flag: 'Low Abnormal', isChecked: true, isHighlight: true },
        { id: 'hct', name: 'Hct', instrument: 'Manual Entry/Interface', value: '41', units: '%', refMin: 41, refMax: 41, flag: '', isChecked: true, isHighlight: false },
        { id: 'plt', name: 'Plt', instrument: 'Manual Entry/Interface', value: '280', units: 'ng/L', refMin: 280, refMax: 280, flag: 'Warning', isChecked: true, isHighlight: false }
      ]
    },
    'LAB-21457': {
      id: 'LAB-21457',
      patient: 'Emily Johnson',
      dob: '04/12/1988',
      gender: 'Female',
      testType: 'Lipid Panel Results (Routine)',
      urgency: 'Routine',
      wbc: {
        value: '6.8',
        inputMode: 'Input',
        units: 'x10^9/L',
        instrument: 'Sysmex XN-1000',
        syncedTime: 'Auto-Synced, 09:15:00 EMT',
        refMin: 4.0,
        refMax: 11.0,
        flag: '',
        isCritical: false
      },
      redCellParams: [
        { id: 'chol', name: 'Total Cholesterol', instrument: 'Manual Entry/Interface', value: '210', units: 'mg/dL', refMin: 125, refMax: 200, flag: 'High', isChecked: true, isHighlight: true },
        { id: 'hdl', name: 'HDL Cholesterol', instrument: 'Manual Entry/Interface', value: '55', units: 'mg/dL', refMin: 40, refMax: 60, flag: '', isChecked: true, isHighlight: false },
        { id: 'ldl', name: 'LDL Cholesterol', instrument: 'Manual Entry/Interface', value: '130', units: 'mg/dL', refMin: 0, refMax: 100, flag: 'Elevated', isChecked: false, isHighlight: false },
        { id: 'trig', name: 'Triglycerides', instrument: 'Manual Entry/Interface', value: '145', units: 'mg/dL', refMin: 0, refMax: 150, flag: '', isChecked: true, isHighlight: false }
      ]
    },
    'LAB-21458': {
      id: 'LAB-21458',
      patient: 'Mark Williams',
      dob: '11/05/1975',
      gender: 'Male',
      testType: 'Comprehensive Metabolic Panel',
      urgency: 'Routine',
      wbc: {
        value: '7.2',
        inputMode: 'Input',
        units: 'x10^9/L',
        instrument: 'Sysmex XN-1000',
        syncedTime: 'Auto-Synced, 08:45:12 EMT',
        refMin: 4.0,
        refMax: 11.0,
        flag: '',
        isCritical: false
      },
      redCellParams: [
        { id: 'glu', name: 'Glucose', instrument: 'Manual Entry/Interface', value: '98', units: 'mg/dL', refMin: 70, refMax: 99, flag: '', isChecked: true, isHighlight: false },
        { id: 'bun', name: 'BUN', instrument: 'Manual Entry/Interface', value: '14', units: 'mg/dL', refMin: 7, refMax: 20, flag: '', isChecked: true, isHighlight: false },
        { id: 'creat', name: 'Creatinine', instrument: 'Manual Entry/Interface', value: '0.9', units: 'mg/dL', refMin: 0.6, refMax: 1.2, flag: '', isChecked: true, isHighlight: false }
      ]
    }
  }

  const [dbSamples, setDbSamples] = useState([])

  // Fetch all samples from backend database on mount
  useEffect(() => {
    const fetchSamplesFromDb = async () => {
      try {
        const res = await axios.get('/api/labtechnician/samples')
        if (res.data?.success && Array.isArray(res.data.data)) {
          setDbSamples(res.data.data)
        }
      } catch (err) {
        console.warn('Backend samples API unavailable, using local cache:', err)
      }
    }
    fetchSamplesFromDb()
  }, [])

  // Dynamic Queues merged with database samples
  const pendingQueue = [
    ...dbSamples.map(s => ({
      id: s.sampleId || s._id,
      badge: s.urgency || 'Routine',
      badgeStyle: s.urgency?.includes('STAT') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
    })),
    { id: 'LAB-23456', badge: 'STAT', badgeStyle: 'bg-red-50 text-red-700 border border-red-200' },
    { id: 'LAB-21457', badge: 'Routine', badgeStyle: 'bg-slate-100 text-slate-600 border border-slate-200' },
    { id: 'LAB-21458', badge: 'Routine', badgeStyle: 'bg-slate-100 text-slate-600 border border-slate-200' },
    { id: 'LAB-21459', badge: 'Urgent', badgeStyle: 'bg-amber-50 text-amber-700 border border-amber-200' }
  ].filter((v, idx, self) => self.findIndex(t => t.id === v.id) === idx)

  const activeQueue = [
    ...dbSamples.map(s => ({
      id: s.sampleId || s._id,
      badge: 'In Progress',
      badgeStyle: 'bg-sky-50 text-sky-700 border border-sky-200'
    })),
    { id: 'LAB-23456', badge: 'Running', badgeStyle: 'bg-blue-50 text-blue-700 border border-blue-200' },
    { id: 'LAB-21457', badge: 'Analyzing', badgeStyle: 'bg-indigo-50 text-indigo-700 border border-indigo-200' },
    { id: 'LAB-21458', badge: 'In Progress', badgeStyle: 'bg-sky-50 text-sky-700 border border-sky-200' },
    { id: 'LAB-21459', badge: 'Synced', badgeStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    { id: 'LAB-21460', badge: 'In Progress', badgeStyle: 'bg-sky-50 text-sky-700 border border-sky-200' },
    { id: 'LAB-21461', badge: 'Running', badgeStyle: 'bg-blue-50 text-blue-700 border border-blue-200' },
    { id: 'LAB-21462', badge: 'Analyzing', badgeStyle: 'bg-indigo-50 text-indigo-700 border border-indigo-200' },
    { id: 'LAB-21463', badge: 'In Progress', badgeStyle: 'bg-sky-50 text-sky-700 border border-sky-200' }
  ].filter((v, idx, self) => self.findIndex(t => t.id === v.id) === idx)

  const abnormalQueue = [
    { id: 'LAB-23456', badge: 'Critical High', badgeStyle: 'bg-red-100 text-red-800 border border-red-300 font-extrabold' },
    { id: 'LAB-21457', badge: 'High Lipid', badgeStyle: 'bg-amber-100 text-amber-800 border border-amber-300 font-extrabold' },
    { id: 'LAB-21462', badge: 'Low Hgb', badgeStyle: 'bg-orange-100 text-orange-800 border border-orange-300 font-extrabold' }
  ]

  const [selectedSampleId, setSelectedSampleId] = useState('LAB-23456')
  const [currentSampleData, setCurrentSampleData] = useState(samplesData['LAB-23456'])

  // Fetch sample test details directly from backend API when clicked
  const handleSelectSample = async (id) => {
    setSelectedSampleId(id)

    // Check local database cache first
    const foundInDb = dbSamples.find(s => s.sampleId === id || s._id === id)
    if (foundInDb) {
      const patientName = foundInDb.patient?.fullName || (typeof foundInDb.patient === 'object' ? foundInDb.patient?.fullName : foundInDb.patient) || 'Registered Patient'
      const dobStr = foundInDb.patient?.dob ? new Date(foundInDb.patient.dob).toLocaleDateString() : (foundInDb.collectionDate ? new Date(foundInDb.collectionDate).toLocaleDateString() : '01/01/1988')
      const testName = Array.isArray(foundInDb.testType) ? foundInDb.testType.join(', ') + ' Results' : (foundInDb.sampleType ? `${foundInDb.sampleType} Analysis` : 'Laboratory Test Panel')

      setCurrentSampleData({
        id: foundInDb.sampleId || id,
        patient: patientName,
        dob: dobStr,
        gender: foundInDb.patient?.gender || 'Unspecified',
        testType: testName,
        urgency: foundInDb.urgency || 'Routine',
        wbc: samplesData[id]?.wbc || { value: '7.4', inputMode: 'Input', units: 'x10^9/L', instrument: 'Sysmex XN-1000', syncedTime: 'Auto-Synced', refMin: 4.0, refMax: 11.0, flag: '', isCritical: false },
        redCellParams: samplesData[id]?.redCellParams || [
          { id: 'rbc', name: 'RBC', instrument: 'Manual Entry/Interface', value: '4.8', units: 'ug/L', refMin: 1.8, refMax: 4.8, flag: '', isChecked: true, isHighlight: false },
          { id: 'hgb', name: 'Hgb', instrument: 'Manual Entry/Interface', value: '13.5', units: 'ug/L', refMin: 13.9, refMax: 13.9, flag: '', isChecked: true, isHighlight: false },
          { id: 'hct', name: 'Hct', instrument: 'Manual Entry/Interface', value: '41', units: '%', refMin: 41, refMax: 41, flag: '', isChecked: true, isHighlight: false },
          { id: 'plt', name: 'Plt', instrument: 'Manual Entry/Interface', value: '280', units: 'ng/L', refMin: 280, refMax: 280, flag: '', isChecked: true, isHighlight: false }
        ]
      })
      return
    }

    // Try fetching from GET /api/labtechnician/samples/:id
    try {
      const res = await axios.get(`/api/labtechnician/samples/${id}`)
      if (res.data?.success && res.data?.data) {
        const s = res.data.data
        const patientName = s.patient?.fullName || (typeof s.patient === 'object' ? s.patient?.fullName : s.patient) || 'Registered Patient'
        const dobStr = s.patient?.dob ? new Date(s.patient.dob).toLocaleDateString() : (s.collectionDate ? new Date(s.collectionDate).toLocaleDateString() : '01/01/1988')
        const testName = Array.isArray(s.testType) ? s.testType.join(', ') + ' Results' : (s.sampleType ? `${s.sampleType} Analysis` : 'Laboratory Test Panel')

        setCurrentSampleData({
          id: s.sampleId || id,
          patient: patientName,
          dob: dobStr,
          gender: s.patient?.gender || 'Unspecified',
          testType: testName,
          urgency: s.urgency || 'Routine',
          wbc: samplesData[id]?.wbc || { value: '7.4', inputMode: 'Input', units: 'x10^9/L', instrument: 'Sysmex XN-1000', syncedTime: 'Auto-Synced', refMin: 4.0, refMax: 11.0, flag: '', isCritical: false },
          redCellParams: samplesData[id]?.redCellParams || [
            { id: 'rbc', name: 'RBC', instrument: 'Manual Entry/Interface', value: '4.8', units: 'ug/L', refMin: 1.8, refMax: 4.8, flag: '', isChecked: true, isHighlight: false },
            { id: 'hgb', name: 'Hgb', instrument: 'Manual Entry/Interface', value: '13.5', units: 'ug/L', refMin: 13.9, refMax: 13.9, flag: '', isChecked: true, isHighlight: false },
            { id: 'hct', name: 'Hct', instrument: 'Manual Entry/Interface', value: '41', units: '%', refMin: 41, refMax: 41, flag: '', isChecked: true, isHighlight: false },
            { id: 'plt', name: 'Plt', instrument: 'Manual Entry/Interface', value: '280', units: 'ng/L', refMin: 280, refMax: 280, flag: '', isChecked: true, isHighlight: false }
          ]
        })
        return
      }
    } catch (err) {
      // Fallback gracefully to local mock dataset
    }

    if (samplesData[id]) {
      setCurrentSampleData(samplesData[id])
    } else {
      setCurrentSampleData({
        id: id,
        patient: 'Patient Record',
        dob: '01/01/1985',
        gender: 'Male',
        testType: 'Diagnostic Test Panel',
        urgency: 'Routine',
        wbc: { value: '7.0', inputMode: 'Input', units: 'x10^9/L', instrument: 'Sysmex XN-1000', syncedTime: 'Auto-Synced', refMin: 4.0, refMax: 11.0, flag: '', isCritical: false },
        redCellParams: [
          { id: 'p1', name: 'RBC', instrument: 'Manual Entry/Interface', value: '4.5', units: 'ug/L', refMin: 1.8, refMax: 4.8, flag: '', isChecked: true, isHighlight: false },
          { id: 'p2', name: 'Hgb', instrument: 'Manual Entry/Interface', value: '13.8', units: 'ug/L', refMin: 13.9, refMax: 13.9, flag: '', isChecked: true, isHighlight: false },
          { id: 'p3', name: 'Hct', instrument: 'Manual Entry/Interface', value: '42', units: '%', refMin: 41, refMax: 41, flag: '', isChecked: true, isHighlight: false }
        ]
      })
    }
  }

  // Update WBC value
  const handleWbcChange = (val) => {
    const numVal = parseFloat(val)
    const isCritical = numVal > currentSampleData.wbc.refMax || numVal < currentSampleData.wbc.refMin
    setCurrentSampleData(prev => ({
      ...prev,
      wbc: {
        ...prev.wbc,
        value: val,
        isCritical,
        flag: isCritical ? (numVal > prev.wbc.refMax ? 'Critical High Leukocytosis' : 'Critical Low') : ''
      }
    }))
  }

  // Update Red Cell Parameter Value
  const handleRedCellParamChange = (id, val) => {
    setCurrentSampleData(prev => ({
      ...prev,
      redCellParams: prev.redCellParams.map(item =>
        item.id === id ? { ...item, value: val } : item
      )
    }))
  }

  // Toggle Checkbox Status
  const handleToggleCheck = (id) => {
    setCurrentSampleData(prev => ({
      ...prev,
      redCellParams: prev.redCellParams.map(item =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    }))
  }

  // Show Toast helper
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  // Action Button Handlers
  const handleSaveDraft = () => {
    setCurrentStep('draft')
    showToast(`Draft saved & submitted for Pathologist Review [Sample ${selectedSampleId}]`)
  }

  const handleEscalate = () => {
    showToast(`Sample ${selectedSampleId} escalated to Pathologist for immediate review!`)
  }

  const handleSubmitApproval = () => {
    setCurrentStep('draft')
    showToast(`Sample ${selectedSampleId} submitted to Pathologist queue!`)
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6 font-sans text-slate-800 bg-[#f3f7fa] relative">

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white font-bold ml-2">✕</button>
        </div>
      )}

      {/* Title */}
      <h2 className="text-lg font-black text-slate-800 mb-3 tracking-tight">Test Result Entry</h2>

      {/* Sub Tabs Bar */}
      <div className="flex items-center gap-6 border-b border-slate-200 mb-4">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`pb-2.5 text-xs font-extrabold transition-all border-b-2 cursor-pointer ${
              activeSubTab === tab.id
                ? 'text-[#1d4ed8] border-[#1d4ed8]'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sample Info Top Bar */}
      <div className="flex items-center justify-between bg-[#e0f2fe] border border-[#bae6fd] rounded-md px-4 py-2.5 mb-4 shadow-2xs">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-slate-800 font-bold">
          <span>Sample ID: <strong className="text-slate-950 font-black">{currentSampleData.id}</strong></span>
          <span>Patient: <strong className="text-slate-950 font-black">{currentSampleData.patient}</strong></span>
          <span>DOE: <strong className="text-slate-950 font-black">{currentSampleData.dob}</strong></span>
          <span className="text-slate-950 font-black">{currentSampleData.gender}</span>
        </div>
        <button
          onClick={() => setShowSettingsModal(true)}
          className="p-1.5 hover:bg-[#bae6fd] rounded text-blue-600 transition-colors cursor-pointer"
          title="Analyzer Settings"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        
        {/* Left 3 Columns: Active Test Results Workflow */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Card: Stepper Workflow & Test Parameter Entry */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 lg:p-5 space-y-5">
            
            {/* Workflow Stepper Bar */}
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[11px] font-bold text-slate-600 overflow-x-auto gap-2">
              <button
                type="button"
                onClick={() => setCurrentStep('received')}
                className={`flex items-center gap-1.5 shrink-0 px-2 py-1 rounded transition-colors cursor-pointer ${
                  currentStep === 'received'
                    ? 'bg-[#1e3a8a] text-white font-extrabold shadow-xs'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">✓</span>
                <span>Sample Received</span>
              </button>
              <span className="text-slate-300">———</span>

              <button
                type="button"
                onClick={() => setCurrentStep('synced')}
                className={`flex items-center gap-1.5 shrink-0 px-2 py-1 rounded transition-colors cursor-pointer ${
                  currentStep === 'synced'
                    ? 'bg-[#1e3a8a] text-white font-extrabold shadow-xs'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">✓</span>
                <span>Results Synced</span>
              </button>
              <span className="text-slate-300">———</span>

              <button
                type="button"
                onClick={() => setCurrentStep('entered')}
                className={`flex items-center gap-1.5 shrink-0 px-2 py-1 rounded transition-colors cursor-pointer ${
                  currentStep === 'entered'
                    ? 'bg-[#1e3a8a] text-white font-extrabold shadow-xs'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span>✓</span>
                <span>Results Entered</span>
              </button>
              <span className="text-slate-300">———</span>

              <button
                type="button"
                onClick={() => setCurrentStep('draft')}
                className={`flex items-center gap-1.5 shrink-0 px-2 py-1 rounded transition-colors cursor-pointer ${
                  currentStep === 'draft'
                    ? 'bg-[#1e3a8a] text-white font-extrabold shadow-xs'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${currentStep === 'draft' ? 'bg-white text-[#1e3a8a] border-white' : ''}`}>
                  {currentStep === 'draft' ? '✓' : ''}
                </span>
                <span>Draft Sent</span>
              </button>
              <span className="text-slate-300">———</span>

              <button
                type="button"
                onClick={() => setCurrentStep('approved')}
                className={`flex items-center gap-1.5 shrink-0 px-2 py-1 rounded transition-colors cursor-pointer ${
                  currentStep === 'approved'
                    ? 'bg-emerald-700 text-white font-extrabold shadow-xs'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${currentStep === 'approved' ? 'bg-white text-emerald-700 border-white' : ''}`}>
                  {currentStep === 'approved' ? '✓' : ''}
                </span>
                <span>Pathologist Approved</span>
              </button>
            </div>

            {/* Test Title Header */}
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight">
                {currentSampleData.testType}
              </h3>
            </div>

            {/* GROUP 1: WHITE CELL PARAMETERS */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700">Group 1: White Cell Parameters</h4>
              
              <div className="overflow-x-auto border border-slate-200 rounded-md">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <th className="px-3 py-2">PARAMETER</th>
                      <th className="px-3 py-2">INPUT</th>
                      <th className="px-3 py-2">REFERENCE RANGE ℹ️</th>
                      <th className="px-3 py-2">VALUE</th>
                      <th className="px-3 py-2">UNITS</th>
                      <th className="px-3 py-2">INSTRUMENT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-3 py-3 font-bold text-slate-900">WBC</td>
                      <td className="px-3 py-3">
                        <select className="bg-white border border-slate-300 rounded px-2 py-1 text-xs font-medium text-slate-700 outline-none cursor-pointer focus:border-blue-500">
                          <option>{currentSampleData.wbc.inputMode} ▾</option>
                        </select>
                      </td>
                      <td className="px-3 py-3 w-52">
                        {/* Graphical Reference Range Bar */}
                        <div className="relative pt-3 pb-1">
                          <div className="h-2.5 w-full bg-slate-100 rounded-full flex overflow-hidden border border-slate-200">
                            <div className="w-1/4 bg-amber-200"></div>
                            <div className="w-2/4 bg-emerald-300"></div>
                            <div className="w-1/4 bg-red-300"></div>
                          </div>
                          {/* Indicator Marker */}
                          <div className="absolute top-0 right-4 -translate-x-1/2 flex flex-col items-center">
                            <span className="text-[10px] text-red-600 font-black leading-none">▼</span>
                          </div>
                          <div className="flex justify-between text-[9px] font-bold text-slate-400 pt-0.5">
                            <span>{currentSampleData.wbc.refMin.toFixed(1)}</span>
                            <span>{currentSampleData.wbc.refMax.toFixed(1)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-col items-start gap-1">
                          <input
                            type="text"
                            value={currentSampleData.wbc.value}
                            onChange={(e) => handleWbcChange(e.target.value)}
                            className={`w-20 border rounded px-2.5 py-1 text-xs font-black text-center outline-none ${
                              currentSampleData.wbc.isCritical
                                ? 'bg-red-50 border-red-300 text-red-700 focus:ring-2 focus:ring-red-400/20'
                                : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                            }`}
                          />
                          {currentSampleData.wbc.flag && (
                            <div className="inline-flex items-center gap-1 bg-red-100 text-red-700 border border-red-200 px-1.5 py-0.5 rounded text-[9px] font-bold">
                              <span>⚠️</span>
                              <span>{currentSampleData.wbc.flag}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-3 font-semibold text-slate-500">{currentSampleData.wbc.units}</td>
                      <td className="px-3 py-3">
                        <div className="text-xs font-bold text-slate-800">{currentSampleData.wbc.instrument}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{currentSampleData.wbc.syncedTime}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* GROUP 2: RED CELL PARAMETERS */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-700">Group 2: Red Cell Parameters</h4>

              <div className="overflow-x-auto border border-slate-200 rounded-md">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <th className="px-3 py-2">TEST PARAMETER</th>
                      <th className="px-3 py-2">INSTRUMENT</th>
                      <th className="px-3 py-2 w-24">VALUE</th>
                      <th className="px-3 py-2">UNITS</th>
                      <th className="px-3 py-2">REFERENCE RANGE</th>
                      <th className="px-3 py-2">FLAGS ℹ️</th>
                      <th className="px-3 py-2 text-center w-16">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentSampleData.redCellParams.map((param) => {
                      const isHighlighted = param.isHighlight
                      return (
                        <tr key={param.id} className={isHighlighted ? 'bg-amber-50/70' : 'hover:bg-slate-50/50'}>
                          <td className="px-3 py-3 font-bold text-slate-900">{param.name}</td>
                          <td className="px-3 py-3">
                            <select className="bg-white border border-slate-300 rounded px-2 py-1 text-xs font-medium text-slate-700 outline-none cursor-pointer focus:border-blue-500">
                              <option>{param.instrument} ▾</option>
                            </select>
                          </td>
                          <td className="px-3 py-3">
                            <input
                              type="text"
                              value={param.value}
                              onChange={(e) => handleRedCellParamChange(param.id, e.target.value)}
                              className={`w-16 border rounded px-2 py-1 text-xs font-black text-center outline-none ${
                                isHighlighted
                                  ? 'bg-white border-amber-400 text-amber-900 focus:ring-2 focus:ring-amber-400/20'
                                  : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                              }`}
                            />
                          </td>
                          <td className="px-3 py-3 font-semibold text-slate-500">{param.units}</td>
                          <td className="px-3 py-3">
                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-600">{param.refMin} - {param.refMax}</span>
                              {/* Range bar graphic for Hgb or flagged params */}
                              {isHighlighted && (
                                <div className="relative pt-2 pb-0.5 w-32">
                                  <div className="h-2 w-full bg-slate-100 rounded-full flex overflow-hidden border border-slate-200">
                                    <div className="w-1/3 bg-amber-400"></div>
                                    <div className="w-1/3 bg-emerald-300"></div>
                                    <div className="w-1/3 bg-red-300"></div>
                                  </div>
                                  <div className="absolute top-0 left-2 flex flex-col items-center">
                                    <span className="text-[9px] text-amber-700 font-black leading-none">▼</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            {param.flag ? (
                              <div className="relative group inline-block">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                                  param.flag.includes('Abnormal') || param.flag.includes('High')
                                    ? 'bg-slate-900 text-white shadow-xs'
                                    : 'text-amber-600 bg-amber-100'
                                }`}>
                                  {param.flag.includes('Warning') ? '⚠️' : param.flag}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-300 font-bold">-</span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-center">
                            {param.isChecked ? (
                              <span className="inline-flex w-4 h-4 rounded-full bg-emerald-500 text-white items-center justify-center text-[10px] font-black mx-auto">
                                ✓
                              </span>
                            ) : (
                              <input
                                type="checkbox"
                                checked={param.isChecked}
                                onChange={() => handleToggleCheck(param.id)}
                                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                              />
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* BOTTOM ACTIONS BAR & QC CHECK */}
          <div className="flex flex-col gap-3">
            
            {/* Action Bar Level 1 */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* QC Check Card */}
              <div className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-3 shadow-xs">
                <div className="leading-tight">
                  <h4 className="text-xs font-black text-slate-800">QC Check</h4>
                  <p className="text-[10px] text-slate-500 font-semibold">Hematology analyzer (Sysmex XN-1000)</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-black">✓</span>
                  <span>QC: Passed (Today 09:30 AM)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
                >
                  Save Draft & Send to Review
                </button>
                <button
                  type="button"
                  onClick={handleEscalate}
                  className="px-4 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
                >
                  Escalate to Pathologist Review
                </button>
                <button
                  type="button"
                  onClick={handleSubmitApproval}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
                >
                  Submit for Approval
                </button>
              </div>

            </div>

            {/* Action Bar Level 2: Restricted Approval */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 bg-slate-900 text-white px-2.5 py-1 rounded shadow-xs">
                Approval restricted to Pathologist role.
              </span>
              <div className="flex items-center gap-2">
                <button disabled className="px-4 py-1.5 bg-slate-100 text-slate-400 border border-slate-200 rounded text-xs font-bold cursor-not-allowed">
                  Approve
                </button>
                <button disabled className="px-4 py-1.5 bg-slate-100 text-slate-400 border border-slate-200 rounded text-xs font-bold cursor-not-allowed">
                  Release Report
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right 1 Column: Queue & Review Cards */}
        <div className="lg:col-span-1 space-y-4">
          {activeSubTab === 'pending' && (
            <>
              <PendingSamplesQueue
                title="Pending Samples Queue"
                samples={pendingQueue}
                selectedSampleId={selectedSampleId}
                onSelectSample={handleSelectSample}
              />
              <FlaggedResultsReview />
            </>
          )}

          {activeSubTab === 'active' && (
            <PendingSamplesQueue
              title="Active Tests Queue"
              samples={activeQueue}
              selectedSampleId={selectedSampleId}
              onSelectSample={handleSelectSample}
            />
          )}

          {activeSubTab === 'abnormal' && (
            <>
              <PendingSamplesQueue
                title="Abnormal Review Queue"
                samples={abnormalQueue}
                selectedSampleId={selectedSampleId}
                onSelectSample={handleSelectSample}
              />
              <FlaggedResultsReview flaggedNotes="Critical leukocytosis & lipid flags pending Pathologist review." />
            </>
          )}
        </div>

      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-sm w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Analyzer Connection Settings</h3>
              <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Primary Instrument Interface</label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs font-semibold">
                  <option>Sysmex XN-1000 (Serial COM3)</option>
                  <option>Roche Cobas 6000 (TCP/IP)</option>
                  <option>Manual Entry Mode</option>
                </select>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-semibold text-slate-700">Auto-sync results on completed run</span>
                <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4 rounded" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
