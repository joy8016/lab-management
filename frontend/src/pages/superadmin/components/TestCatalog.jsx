import React, { useState } from 'react'
import { useLims } from '../../../context/LimsContext'

export default function TestCatalog() {
  const { testCatalog, addTestCatalogItem } = useLims()
  // Initial Mock Test Catalog Data
  const initialTests = [
    {
      id: 1,
      code: 'BIO-102',
      name: 'Fasting Blood Sugar (FBS)',
      alias: 'FBS / Glucose Fasting',
      category: 'Biochemistry',
      sampleType: 'Serum / Plasma',
      sampleVolume: '1 ml',
      container: 'Grey Top (Sodium Fluoride)',
      tat: '4 Hours',
      status: 'Active',
      isPanel: false,
      method: 'Spectrophotometry / Hexokinase',
      handling: 'Fasting 8-10 hours required. Separate serum within 1 hr.',
      units: 'mg/dL',
      branches: ['Main Lab HQ', 'City Clinic', 'Mary Lab', 'Twin Lab', 'July Lab'],
      parameters: [
        { name: 'Glucose (Fasting)', unit: 'mg/dL', maleMin: 70, maleMax: 99, femaleMin: 70, femaleMax: 99, critLow: 50, critHigh: 300 }
      ],
      reportOrder: 1
    },
    {
      id: 2,
      code: 'HEM-001',
      name: 'Complete Blood Count (CBC)',
      alias: 'CBC / Hemogram',
      category: 'Hematology',
      sampleType: 'EDTA Whole Blood',
      sampleVolume: '2 ml',
      container: 'Purple Top (EDTA)',
      tat: '6 Hours',
      status: 'Active',
      isPanel: true,
      method: 'Automated Hematology Flow Cytometry',
      handling: 'Mix gently by inverting tube 8 times. Do not freeze.',
      units: 'Mixed',
      branches: ['Main Lab HQ', 'City Clinic', 'Mary Lab', 'Twin Lab', 'July Lab'],
      subTests: ['Hemoglobin (Hb)', 'Red Blood Cell Count (RBC)', 'White Blood Cell Count (WBC)', 'Platelet Count'],
      parameters: [
        { name: 'Hemoglobin (Hb)', unit: 'g/dL', maleMin: 13.5, maleMax: 17.5, femaleMin: 12.0, femaleMax: 15.5, critLow: 7.0, critHigh: 20.0 },
        { name: 'Total WBC Count', unit: 'x10^3/mcL', maleMin: 4.5, maleMax: 11.0, femaleMin: 4.5, femaleMax: 11.0, critLow: 2.0, critHigh: 30.0 },
        { name: 'Platelet Count', unit: 'x10^3/mcL', maleMin: 150, maleMax: 450, femaleMin: 150, femaleMax: 450, critLow: 50, critHigh: 1000 }
      ],
      reportOrder: 2
    },
    {
      id: 3,
      code: 'LIP-201',
      name: 'Lipid Profile Panel',
      alias: 'Lipid Panel / Cholesterol Test',
      category: 'Biochemistry',
      sampleType: 'Serum',
      sampleVolume: '2 ml',
      container: 'Red Top (Plain) / SST',
      tat: '12 Hours',
      status: 'Active',
      isPanel: true,
      method: 'Enzymatic Colorimetric Assay',
      handling: 'Patient should fast 12 hours prior to collection.',
      units: 'mg/dL',
      branches: ['Main Lab HQ', 'City Clinic', 'Mary Lab'],
      subTests: ['Total Cholesterol', 'HDL Cholesterol', 'LDL Cholesterol', 'Triglycerides'],
      parameters: [
        { name: 'Total Cholesterol', unit: 'mg/dL', maleMin: 125, maleMax: 200, femaleMin: 125, femaleMax: 200, critLow: 90, critHigh: 300 },
        { name: 'HDL Cholesterol', unit: 'mg/dL', maleMin: 40, maleMax: 60, femaleMin: 50, femaleMax: 70, critLow: 25, critHigh: 100 },
        { name: 'Triglycerides', unit: 'mg/dL', maleMin: 35, maleMax: 150, femaleMin: 35, femaleMax: 150, critLow: 20, critHigh: 500 }
      ],
      reportOrder: 3
    },
    {
      id: 4,
      code: 'LFT-301',
      name: 'Liver Function Test (LFT)',
      alias: 'Hepatic Function Panel',
      category: 'Biochemistry',
      sampleType: 'Serum',
      sampleVolume: '3 ml',
      container: 'Red Top (Plain)',
      tat: '8 Hours',
      status: 'Active',
      isPanel: true,
      method: 'Automated Photometric Analysis',
      handling: 'Protect specimen from light exposure. Avoid hemolysis.',
      units: 'U/L & mg/dL',
      branches: ['Main Lab HQ', 'City Clinic', 'July Lab'],
      subTests: ['ALT (SGPT)', 'AST (SGOT)', 'Bilirubin Total', 'Alkaline Phosphatase (ALP)', 'Serum Albumin'],
      parameters: [
        { name: 'ALT (SGPT)', unit: 'U/L', maleMin: 7, maleMax: 56, femaleMin: 7, femaleMax: 45, critLow: 0, critHigh: 500 },
        { name: 'Bilirubin Total', unit: 'mg/dL', maleMin: 0.1, maleMax: 1.2, femaleMin: 0.1, femaleMax: 1.2, critLow: 0.0, critHigh: 15.0 }
      ],
      reportOrder: 4
    },
    {
      id: 5,
      code: 'PAT-402',
      name: 'Histopathology Biopsy',
      alias: 'Tissue Histology',
      category: 'Pathology',
      sampleType: 'Tissue Specimen',
      sampleVolume: 'Variable',
      container: 'Formalin Container (10% NBF)',
      tat: '48 Hours',
      status: 'Active',
      isPanel: false,
      method: 'Microscopic Section & Staining',
      handling: 'Store in 10% Neutral Buffered Formalin immediately upon collection.',
      units: 'Qualitative Report',
      branches: ['Main Lab HQ'],
      parameters: [
        { name: 'Histopathology Impression', unit: 'Text', maleMin: 0, maleMax: 0, femaleMin: 0, femaleMax: 0, critLow: 0, critHigh: 0 }
      ],
      reportOrder: 5
    },
    {
      id: 6,
      code: 'MIC-501',
      name: 'Urine Culture & Sensitivity',
      alias: 'Urine C/S',
      category: 'Microbiology',
      sampleType: 'Clean Catch Midstream Urine',
      sampleVolume: '10 ml',
      container: 'Sterile Urine Container',
      tat: '24 Hours',
      status: 'Active',
      isPanel: false,
      method: 'Agar Culture & Antibiotic Disc Susceptibility',
      handling: 'Deliver to laboratory within 2 hours or refrigerate at 4°C.',
      units: 'CFU/mL & Susceptibility',
      branches: ['Main Lab HQ', 'City Clinic', 'Twin Lab'],
      parameters: [
        { name: 'Colony Count', unit: 'CFU/mL', maleMin: 0, maleMax: 10000, femaleMin: 0, femaleMax: 10000, critLow: 0, critHigh: 100000 }
      ],
      reportOrder: 6
    },
    {
      id: 7,
      code: 'SER-601',
      name: 'Thyroid Stimulating Hormone (TSH)',
      alias: 'Ultra-sensitive TSH',
      category: 'Serology',
      sampleType: 'Serum',
      sampleVolume: '1.5 ml',
      container: 'Yellow Top (SST Gel)',
      tat: '6 Hours',
      status: 'Active',
      isPanel: false,
      method: 'Chemiluminescent Immunoassay (CLIA)',
      handling: 'Centrifuge and separate serum. Stable 7 days at 2-8°C.',
      units: 'uIU/mL',
      branches: ['Main Lab HQ', 'City Clinic', 'Mary Lab', 'July Lab'],
      parameters: [
        { name: 'TSH Level', unit: 'uIU/mL', maleMin: 0.4, maleMax: 4.0, femaleMin: 0.4, femaleMax: 4.2, critLow: 0.01, critHigh: 20.0 }
      ],
      reportOrder: 7
    },
    {
      id: 8,
      code: 'EXC-901',
      name: 'Executive Health Checkup Package',
      alias: 'Master Executive Panel',
      category: 'Multi-Department',
      sampleType: 'Blood & Urine',
      sampleVolume: '5 ml Blood + 20 ml Urine',
      container: 'Purple Top + Red Top + Urine Cup',
      tat: '24 Hours',
      status: 'Active',
      isPanel: true,
      method: 'Multi-Analyzer Protocol Package',
      handling: 'Overnight fasting required. Full body wellness package.',
      units: 'Multi-Unit Package',
      branches: ['Main Lab HQ', 'City Clinic'],
      subTests: ['Complete Blood Count (CBC)', 'Lipid Profile Panel', 'Liver Function Test (LFT)', 'Fasting Blood Sugar (FBS)', 'TSH'],
      parameters: [],
      reportOrder: 8
    }
  ]

  const activeCatalog = testCatalog && testCatalog.length > 0 ? testCatalog : initialTests
  const [tests, setTests] = useState(initialTests)

  const catalogList = testCatalog && testCatalog.length > 0 ? testCatalog : tests

  // Filtering & Search State
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedType, setSelectedType] = useState('All')

  // Toast Banner State
  const [toastMessage, setToastMessage] = useState('')

  // Modal Controllers
  const [isTestModalOpen, setIsTestModalOpen] = useState(false)
  const [editingTest, setEditingTest] = useState(null)

  const [isPanelModalOpen, setIsPanelModalOpen] = useState(false)
  const [editingPanel, setEditingPanel] = useState(null)

  const [isRangeModalOpen, setIsRangeModalOpen] = useState(false)
  const [selectedTestForRanges, setSelectedTestForRanges] = useState(null)

  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  // Department Categories
  const categories = ['All', 'Biochemistry', 'Hematology', 'Pathology', 'Microbiology', 'Serology', 'Multi-Department']
  const allBranches = ['Main Lab HQ', 'City Clinic', 'Mary Lab', 'Twin Lab', 'July Lab']

  // Form State for Add / Edit Individual Test
  const emptyTestForm = {
    code: '',
    name: '',
    alias: '',
    category: 'Biochemistry',
    sampleType: 'Serum',
    sampleVolume: '2 ml',
    container: 'Red Top (Plain)',
    tat: '4 Hours',
    status: 'Active',
    method: 'Automated Chemistry',
    handling: '',
    units: 'mg/dL',
    branches: ['Main Lab HQ', 'City Clinic'],
    parameters: [
      { name: 'Primary Parameter', unit: 'mg/dL', maleMin: 70, maleMax: 110, femaleMin: 70, femaleMax: 110, critLow: 40, critHigh: 250 }
    ]
  }
  const [testForm, setTestForm] = useState(emptyTestForm)

  // Form State for Add / Edit Test Panel / Package
  const emptyPanelForm = {
    code: '',
    name: '',
    alias: '',
    category: 'Biochemistry',
    sampleType: 'Blood & Serum',
    sampleVolume: '5 ml',
    container: 'Multiple Tubes',
    tat: '12 Hours',
    status: 'Active',
    method: 'Multi-Panel Protocol',
    handling: 'Fasting may be required depending on sub-tests.',
    branches: ['Main Lab HQ', 'City Clinic'],
    subTests: ['Fasting Blood Sugar (FBS)', 'Lipid Profile Panel']
  }
  const [panelForm, setPanelForm] = useState(emptyPanelForm)  // Filter Logic
  const filteredTests = catalogList.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.alias && t.alias.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory
    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus
    const matchesType =
      selectedType === 'All' ||
      (selectedType === 'Individual' && !t.isPanel) ||
      (selectedType === 'Panel' && t.isPanel)

    return matchesSearch && matchesCategory && matchesStatus && matchesType
  })

  // Show Toast Utility
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 4000)
  }

  // Open Edit Modal for Test or Panel
  const handleOpenEdit = (test) => {
    if (test.isPanel) {
      setEditingPanel(test)
      setPanelForm({
        code: test.code,
        name: test.name,
        alias: test.alias || '',
        category: test.category,
        sampleType: test.sampleType,
        sampleVolume: test.sampleVolume,
        container: test.container,
        tat: test.tat,
        status: test.status,
        method: test.method || '',
        handling: test.handling || '',
        branches: test.branches || allBranches,
        subTests: test.subTests || []
      })
      setIsPanelModalOpen(true)
    } else {
      setEditingTest(test)
      setTestForm({
        code: test.code,
        name: test.name,
        alias: test.alias || '',
        category: test.category,
        sampleType: test.sampleType,
        sampleVolume: test.sampleVolume,
        container: test.container,
        tat: test.tat,
        status: test.status,
        method: test.method || '',
        handling: test.handling || '',
        units: test.units || 'mg/dL',
        branches: test.branches || allBranches,
        parameters: test.parameters || [
          { name: test.name, unit: test.units || 'mg/dL', maleMin: 0, maleMax: 100, femaleMin: 0, femaleMax: 100, critLow: 0, critHigh: 200 }
        ]
      })
      setIsTestModalOpen(true)
    }
  }

  // Toggle Test Status
  const handleToggleStatus = (id) => {
    setTests((prev) =>
      prev.map((t) => (t.id === id || t._id === id ? { ...t, status: t.status === 'Active' ? 'Suspended' : 'Active' } : t))
    )
    const target = catalogList.find((t) => t.id === id || t._id === id)
    showToast(`Status updated to ${target?.status === 'Active' ? 'Suspended' : 'Active'} for ${target?.code}`)
  }

  // Save Individual Test Form
  const handleSaveTest = (e) => {
    e.preventDefault()
    if (editingTest) {
      setTests((prev) =>
        prev.map((t) =>
          (t.id === editingTest.id || t._id === editingTest._id)
            ? { ...t, ...testForm, isPanel: false }
            : t
        )
      )
      showToast(`Test ${testForm.code} updated successfully!`)
    } else {
      addTestCatalogItem(testForm)
      const newTest = {
        id: Date.now(),
        ...testForm,
        isPanel: false,
        reportOrder: catalogList.length + 1
      }
      setTests((prev) => [newTest, ...prev])
      showToast(`New test ${testForm.name} (${testForm.code}) registered successfully in database!`)
    }
    setIsTestModalOpen(false)
    setEditingTest(null)
    setTestForm(emptyTestForm)
  }

  // Save Panel Form
  const handleSavePanel = (e) => {
    e.preventDefault()
    if (editingPanel) {
      setTests((prev) =>
        prev.map((t) =>
          t.id === editingPanel.id
            ? { ...t, ...panelForm, isPanel: true }
            : t
        )
      )
      showToast(`Test Panel ${panelForm.code} updated successfully!`)
    } else {
      const newPanel = {
        id: Date.now(),
        ...panelForm,
        isPanel: true,
        reportOrder: tests.length + 1
      }
      setTests((prev) => [newPanel, ...prev])
      showToast(`New Test Panel ${panelForm.name} (${panelForm.code}) created successfully!`)
    }
    setIsPanelModalOpen(false)
    setEditingPanel(null)
    setPanelForm(emptyPanelForm)
  }

  // Save Reference Ranges
  const handleSaveRanges = (e) => {
    e.preventDefault()
    if (!selectedTestForRanges) return
    setTests((prev) =>
      prev.map((t) => (t.id === selectedTestForRanges.id ? selectedTestForRanges : t))
    )
    showToast(`Reference ranges updated for ${selectedTestForRanges.name}`)
    setIsRangeModalOpen(false)
    setSelectedTestForRanges(null)
  }

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = ['Test Code', 'Test Name', 'Category', 'Sample Type', 'Sample Volume', 'Container', 'TAT', 'Status', 'Type']
    const rows = filteredTests.map((t) => [
      t.code,
      `"${t.name}"`,
      t.category,
      `"${t.sampleType}"`,
      t.sampleVolume,
      `"${t.container}"`,
      t.tat,
      t.status,
      t.isPanel ? 'Panel/Package' : 'Individual Test'
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `lims_test_catalog_${new Date().toISOString().slice(0,10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Catalog exported to CSV file successfully!')
  }

  // Bulk Import Handler (Simulated)
  const handleSimulateImport = () => {
    const importedSample = [
      {
        id: Date.now() + 1,
        code: 'IMM-701',
        name: 'IgE Total Antibody',
        alias: 'Immunoglobulin E',
        category: 'Serology',
        sampleType: 'Serum',
        sampleVolume: '1 ml',
        container: 'Yellow Top (SST)',
        tat: '12 Hours',
        status: 'Active',
        isPanel: false,
        method: 'ELISA Immunoassay',
        handling: 'Store at 2-8°C.',
        units: 'IU/mL',
        branches: ['Main Lab HQ', 'City Clinic'],
        parameters: [{ name: 'IgE Total', unit: 'IU/mL', maleMin: 0, maleMax: 100, femaleMin: 0, femaleMax: 100, critLow: 0, critHigh: 500 }],
        reportOrder: tests.length + 1
      },
      {
        id: Date.now() + 2,
        code: 'BIO-802',
        name: 'HbA1c Glycated Hemoglobin',
        alias: 'Glycated Hemoglobin A1c',
        category: 'Biochemistry',
        sampleType: 'EDTA Whole Blood',
        sampleVolume: '2 ml',
        container: 'Purple Top (EDTA)',
        tat: '4 Hours',
        status: 'Active',
        isPanel: false,
        method: 'HPLC Chromatography',
        handling: 'No fasting required. Do not centrifuge.',
        units: '%',
        branches: allBranches,
        parameters: [{ name: 'HbA1c Percentage', unit: '%', maleMin: 4.0, maleMax: 5.6, femaleMin: 4.0, femaleMax: 5.6, critLow: 3.5, critHigh: 12.0 }],
        reportOrder: tests.length + 2
      }
    ]
    setTests((prev) => [...importedSample, ...prev])
    setIsImportModalOpen(false)
    showToast('Bulk import successful: 2 new laboratory test definitions loaded!')
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 font-sans text-left relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center justify-between animate-fade-in transition-all">
          <div className="flex items-center gap-3 text-xs font-bold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white text-xs font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* Header Banner */}
      <div className="border-b border-gray-100 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Diagnostic Test Catalog</h2>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-blue-100">
              {tests.length} Registered Items
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Manage individual blood analysis definitions, specimen container rules, turnaround times, and report panel mappings.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
            title="Export catalog data as CSV"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Export Catalog
          </button>

          <button
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
            title="Import test lists via CSV/Excel"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
            Bulk Import
          </button>

          <button
            onClick={() => {
              setEditingPanel(null)
              setPanelForm(emptyPanelForm)
              setIsPanelModalOpen(true)
            }}
            className="inline-flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            + Create Test Panel / Package
          </button>

          <button
            onClick={() => {
              setEditingTest(null)
              setTestForm(emptyTestForm)
              setIsTestModalOpen(true)
            }}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            + Add New Test
          </button>
        </div>
      </div>

      {/* 1. TOP CONTROLS & FILTER BAR */}
      <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search Test Name, Code (e.g. CBC, LFT)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:border-blue-500 outline-none text-gray-800 placeholder:text-gray-400"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 focus:border-blue-500 outline-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Department: {c}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 focus:border-blue-500 outline-none cursor-pointer"
          >
            <option value="All">Type: All (Tests &amp; Panels)</option>
            <option value="Individual">Individual Tests</option>
            <option value="Panel">Test Panels &amp; Bundles</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 focus:border-blue-500 outline-none cursor-pointer"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active Only</option>
            <option value="Suspended">Suspended Only</option>
          </select>
        </div>
      </div>

      {/* 2. TEST CATALOG DATA TABLE */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50/80 text-gray-500 font-extrabold uppercase tracking-wider border-b border-gray-100 text-[10px]">
              <th className="py-3.5 px-4">Test Code</th>
              <th className="py-3.5 px-4">Test Name &amp; Type</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4">Sample Specimen &amp; Volume</th>
              <th className="py-3.5 px-4">Container Tube</th>
              <th className="py-3.5 px-4">TAT</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
            {filteredTests.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-12 text-center text-gray-400 font-bold">
                  No laboratory tests match the selected search criteria.
                </td>
              </tr>
            ) : (
              filteredTests.map((test) => (
                <tr key={test.id} className="hover:bg-blue-50/30 transition-colors group">
                  {/* Test Code */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 text-[11px]">
                      {test.code}
                    </span>
                  </td>

                  {/* Test Name & Type */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {test.name}
                      </span>
                      {test.isPanel && (
                        <span className="bg-indigo-100 text-indigo-800 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border border-indigo-200">
                          Panel
                        </span>
                      )}
                    </div>
                    {test.alias && (
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5 truncate">{test.alias}</p>
                    )}
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-lg text-[10px]">
                      {test.category}
                    </span>
                  </td>

                  {/* Sample Type & Volume */}
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-gray-900">{test.sampleType}</p>
                    <p className="text-[10px] text-gray-400 font-semibold">Min: {test.sampleVolume}</p>
                  </td>

                  {/* Container / Tube Type */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        test.container.includes('Purple') ? 'bg-purple-600' :
                        test.container.includes('Red') ? 'bg-red-600' :
                        test.container.includes('Yellow') ? 'bg-amber-400' :
                        test.container.includes('Grey') ? 'bg-gray-500' : 'bg-blue-600'
                      }`} />
                      {test.container}
                    </span>
                  </td>

                  {/* TAT */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-gray-800 bg-gray-50 px-2 py-1 rounded-md border border-gray-200 text-[11px]">
                      {test.tat}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleStatus(test.id)}
                      className={`cursor-pointer inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        test.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${test.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      {test.status}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!test.isPanel && (
                        <button
                          onClick={() => {
                            setSelectedTestForRanges({ ...test })
                            setIsRangeModalOpen(true)
                          }}
                          className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                          title="Configure normal/critical reference ranges"
                        >
                          Ranges
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenEdit(test)}
                        className="text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 3. INDIVIDUAL TEST MODAL / DRAWER */}
      {isTestModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh] text-left font-sans">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200">
                  {editingTest ? 'Update Test Specification' : 'Register New Test Definition'}
                </span>
                <h3 className="text-xl font-black tracking-tight mt-0.5">
                  {editingTest ? `Edit Test: ${editingTest.name}` : 'Add Individual Laboratory Test'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsTestModalOpen(false)
                  setEditingTest(null)
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveTest} className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              {/* Basic Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">1. Basic Test Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Test Code *</label>
                    <input
                      type="text"
                      placeholder="e.g. BIO-102"
                      value={testForm.code}
                      onChange={(e) => setTestForm({ ...testForm, code: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:bg-white focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Test Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Fasting Blood Sugar (FBS)"
                      value={testForm.name}
                      onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:bg-white focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Department / Category</label>
                    <select
                      value={testForm.category}
                      onChange={(e) => setTestForm({ ...testForm, category: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:bg-white focus:border-blue-500 outline-none cursor-pointer"
                    >
                      {categories.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Test Method</label>
                    <input
                      type="text"
                      placeholder="e.g. Spectrophotometry, ELISA"
                      value={testForm.method}
                      onChange={(e) => setTestForm({ ...testForm, method: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:bg-white focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Turnaround Time (TAT)</label>
                    <input
                      type="text"
                      placeholder="e.g. 4 Hours"
                      value={testForm.tat}
                      onChange={(e) => setTestForm({ ...testForm, tat: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:bg-white focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Specimen Requirements */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">2. Specimen Requirements</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Sample Specimen Type</label>
                    <input
                      type="text"
                      placeholder="e.g. EDTA Blood, Serum"
                      value={testForm.sampleType}
                      onChange={(e) => setTestForm({ ...testForm, sampleType: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:bg-white focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Minimum Volume</label>
                    <input
                      type="text"
                      placeholder="e.g. 2 ml"
                      value={testForm.sampleVolume}
                      onChange={(e) => setTestForm({ ...testForm, sampleVolume: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:bg-white focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Container / Tube Type</label>
                    <input
                      type="text"
                      placeholder="e.g. Purple Top (EDTA)"
                      value={testForm.container}
                      onChange={(e) => setTestForm({ ...testForm, container: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:bg-white focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Special Handling Instructions</label>
                    <input
                      type="text"
                      placeholder="e.g. Keep on ice, Fasting required 8-10 hours, Protect from direct light"
                      value={testForm.handling}
                      onChange={(e) => setTestForm({ ...testForm, handling: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:bg-white focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Branch / Location Availability */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">3. Branch Availability &amp; Routing</h4>
                <div className="flex flex-wrap gap-3">
                  {allBranches.map((b) => {
                    const isChecked = testForm.branches.includes(b)
                    return (
                      <label key={b} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                        isChecked ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-600'
                      }`}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setTestForm({ ...testForm, branches: testForm.branches.filter((x) => x !== b) })
                            } else {
                              setTestForm({ ...testForm, branches: [...testForm.branches, b] })
                            }
                          }}
                          className="rounded text-blue-600 cursor-pointer"
                        />
                        {b}
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsTestModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all cursor-pointer"
                >
                  {editingTest ? 'Save Test Changes' : 'Register Test'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. CREATE / EDIT TEST PANEL & PACKAGE MODAL */}
      {isPanelModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh] text-left font-sans">
            <div className="p-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-200">
                  {editingPanel ? 'Update Test Package Mapping' : 'Create Bundled Test Package / Panel'}
                </span>
                <h3 className="text-xl font-black tracking-tight mt-0.5">
                  {editingPanel ? `Edit Panel: ${editingPanel.name}` : 'Configure New Test Panel'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsPanelModalOpen(false)
                  setEditingPanel(null)
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePanel} className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Package Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. CBC-001 or LIP-201"
                    value={panelForm.code}
                    onChange={(e) => setPanelForm({ ...panelForm, code: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:bg-white focus:border-indigo-500 outline-none"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Package / Panel Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Complete Blood Count (CBC) or Lipid Profile"
                    value={panelForm.name}
                    onChange={(e) => setPanelForm({ ...panelForm, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:bg-white focus:border-indigo-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Department</label>
                  <select
                    value={panelForm.category}
                    onChange={(e) => setPanelForm({ ...panelForm, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 outline-none cursor-pointer"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Turnaround Time (TAT)</label>
                  <input
                    type="text"
                    placeholder="e.g. 12 Hours"
                    value={panelForm.tat}
                    onChange={(e) => setPanelForm({ ...panelForm, tat: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Specimen Collection</label>
                  <input
                    type="text"
                    placeholder="e.g. Serum & EDTA Blood"
                    value={panelForm.sampleType}
                    onChange={(e) => setPanelForm({ ...panelForm, sampleType: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Sub-tests / Package Components Mapping */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">
                    Package Sub-Tests &amp; Report Weight Ordering
                  </h4>
                  <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full">
                    {panelForm.subTests.length} Sub-Tests Linked
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">
                  Select sub-tests to include in this bundled package. Arrange component weights for report output sequence.
                </p>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {tests.filter((t) => !t.isPanel).map((indTest, idx) => {
                    const isIncluded = panelForm.subTests.includes(indTest.name)
                    return (
                      <div
                        key={indTest.id}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
                          isIncluded ? 'bg-indigo-50/60 border-indigo-200' : 'bg-gray-50/40 border-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isIncluded}
                            onChange={() => {
                              if (isIncluded) {
                                setPanelForm({
                                  ...panelForm,
                                  subTests: panelForm.subTests.filter((s) => s !== indTest.name)
                                })
                              } else {
                                setPanelForm({
                                  ...panelForm,
                                  subTests: [...panelForm.subTests, indTest.name]
                                })
                              }
                            }}
                            className="rounded text-indigo-600 cursor-pointer"
                          />
                          <div>
                            <span className="font-bold text-gray-900">{indTest.name}</span>
                            <span className="text-[10px] text-gray-400 font-semibold ml-2">({indTest.code})</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-500 font-bold bg-white px-2 py-0.5 rounded border border-gray-200">
                          Order Weight: {idx + 1}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsPanelModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all cursor-pointer"
                >
                  {editingPanel ? 'Save Package Changes' : 'Create Test Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. REFERENCE RANGES CONFIGURATION MODAL */}
      {isRangeModalOpen && selectedTestForRanges && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh] text-left font-sans">
            <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-gray-900 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-200">
                  Biochemical Reference Metric Matrix
                </span>
                <h3 className="text-xl font-black tracking-tight mt-0.5">
                  Configure Ranges: {selectedTestForRanges.name} ({selectedTestForRanges.code})
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsRangeModalOpen(false)
                  setSelectedTestForRanges(null)
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveRanges} className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              <p className="text-xs text-gray-500 font-medium">
                Map physiological reference bounds, age adjustments, and critical threshold limits used during automated diagnostic result validation.
              </p>

              {selectedTestForRanges.parameters && selectedTestForRanges.parameters.map((param, pIdx) => (
                <div key={pIdx} className="p-4 bg-gray-50/70 border border-gray-100 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-gray-900 text-sm">{param.name}</span>
                    <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                      Unit: {param.unit}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 mb-1">Male Normal Min</label>
                      <input
                        type="number"
                        step="any"
                        value={param.maleMin}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0
                          const updatedParams = [...selectedTestForRanges.parameters]
                          updatedParams[pIdx].maleMin = val
                          setSelectedTestForRanges({ ...selectedTestForRanges, parameters: updatedParams })
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 font-bold outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 mb-1">Male Normal Max</label>
                      <input
                        type="number"
                        step="any"
                        value={param.maleMax}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0
                          const updatedParams = [...selectedTestForRanges.parameters]
                          updatedParams[pIdx].maleMax = val
                          setSelectedTestForRanges({ ...selectedTestForRanges, parameters: updatedParams })
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 font-bold outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 mb-1">Female Normal Min</label>
                      <input
                        type="number"
                        step="any"
                        value={param.femaleMin}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0
                          const updatedParams = [...selectedTestForRanges.parameters]
                          updatedParams[pIdx].femaleMin = val
                          setSelectedTestForRanges({ ...selectedTestForRanges, parameters: updatedParams })
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 font-bold outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 mb-1">Female Normal Max</label>
                      <input
                        type="number"
                        step="any"
                        value={param.femaleMax}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0
                          const updatedParams = [...selectedTestForRanges.parameters]
                          updatedParams[pIdx].femaleMax = val
                          setSelectedTestForRanges({ ...selectedTestForRanges, parameters: updatedParams })
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 font-bold outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-200/50">
                    <div>
                      <label className="block text-[10px] font-bold text-rose-600 mb-1">Panic / Critical Low Limit</label>
                      <input
                        type="number"
                        step="any"
                        value={param.critLow}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0
                          const updatedParams = [...selectedTestForRanges.parameters]
                          updatedParams[pIdx].critLow = val
                          setSelectedTestForRanges({ ...selectedTestForRanges, parameters: updatedParams })
                        }}
                        className="w-full bg-rose-50/50 border border-rose-200 rounded-lg px-2.5 py-1.5 font-bold text-rose-800 outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-rose-600 mb-1">Panic / Critical High Limit</label>
                      <input
                        type="number"
                        step="any"
                        value={param.critHigh}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0
                          const updatedParams = [...selectedTestForRanges.parameters]
                          updatedParams[pIdx].critHigh = val
                          setSelectedTestForRanges({ ...selectedTestForRanges, parameters: updatedParams })
                        }}
                        className="w-full bg-rose-50/50 border border-rose-200 rounded-lg px-2.5 py-1.5 font-bold text-rose-800 outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsRangeModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all cursor-pointer"
                >
                  Save Reference Ranges
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. BULK IMPORT MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col text-left font-sans">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h3 className="text-base font-black tracking-tight">Bulk Import Test Catalog</h3>
                <p className="text-[10px] text-gray-300">Upload CSV or Excel file containing test metrics</p>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center space-y-2 hover:border-blue-400 transition-colors bg-gray-50/50 cursor-pointer">
                <svg className="w-10 h-10 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="font-bold text-gray-800">Drop CSV / Excel file here or click to browse</p>
                <p className="text-[10px] text-gray-400">Supported Formats: .csv, .xlsx (Max 10 MB)</p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSimulateImport}
                  className="px-5 py-2 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all cursor-pointer"
                >
                  Simulate Import Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
