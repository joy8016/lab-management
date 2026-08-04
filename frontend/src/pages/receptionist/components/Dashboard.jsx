import React, { useState } from 'react'

// Icon components for Top Action Cards
const UserPenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1a5fb4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 shrink-0">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M16 11l2 2 4-4" />
  </svg>
)

const CalendarPenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1a5fb4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 shrink-0">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M12 14l2 2 4-4" />
  </svg>
)

const TrackReportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1a5fb4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 shrink-0">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <circle cx="10.5" cy="14.5" r="2.5" />
    <line x1="12.5" y1="16.5" x2="15" y2="19" />
  </svg>
)

export default function Dashboard({ setActiveTab }) {
  // Active Stepper Index: 0=Registration, 1=Test Booking, 2=Label Printing, 3=Awaiting Report, 4=Notify Patient
  const [activeStep, setActiveStep] = useState(1)

  // Dynamic Selected Tests for Jane Smith
  const [selectedTests, setSelectedTests] = useState([
    { id: 1, name: 'Test Name', code: 'CBC', price: 30.0, checked: true },
    { id: 2, name: 'Test Name', code: 'CBC', price: 30.0, checked: true },
    { id: 3, name: 'Glucose', code: 'CBC', price: 25.0, checked: false },
    { id: 4, name: 'Lipid Panel', code: 'Lipid Panel', price: 10.0, checked: false },
  ])

  // Catalog tests for dynamic dropdown
  const catalogTests = [
    { id: 'CBC', name: 'Complete Blood Count (CBC)', code: 'CBC', price: 30.0 },
    { id: 'GLU', name: 'Fasting Blood Glucose', code: 'CBC', price: 25.0 },
    { id: 'LIP', name: 'Lipid Panel Profile', code: 'Lipid Panel', price: 10.0 },
    { id: 'LFT', name: 'Liver Function Test (LFT)', code: 'LFT-301', price: 60.0 },
    { id: 'TSH', name: 'Thyroid Stimulating Hormone', code: 'SER-601', price: 30.0 },
  ]

  const [testSearchInput, setTestSearchInput] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  // Radio button label option
  const [labelOption, setLabelOption] = useState('all')

  // Recent activity list state
  const [activities, setActivities] = useState([
    'Registered: John Doe',
    'Booked Test: Jane Smith - CBC',
    'Booked Test: Jane Smith - CBC',
    'Booked Test: Jane Smith - ID: 12345)',
    'Booked Test: Jane Smith - CBC',
    'Registered: Jane Smith - CBC',
    'Registered: John Doe',
    'Registered: John Doe',
    'Booked Test: Jane Smith - CBC',
    'Booked Test: Jane Smith - CBC',
    'Registered: John Doe',
  ])

  // Ready Reports List
  const [reports, setReports] = useState([
    { id: 1, patient: 'Jane Smith', test: 'Test Name', time: '12:50 AM', status: 'Ready' },
    { id: 2, patient: 'John Doe', test: 'Ready / Status', time: '03:30 AM', status: 'Ready' }
  ])

  // Filter inputs for Report Status
  const [reportSearch, setReportSearch] = useState('')
  const [reportStatusFilter, setReportStatusFilter] = useState('All')

  // Toast / Modals State
  const [toastMessage, setToastMessage] = useState('')
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showLabelModal, setShowLabelModal] = useState(false)
  const [selectedReceiptPatient, setSelectedReceiptPatient] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 4000)
  }

  // Toggle Test Checkbox
  const toggleTest = (id) => {
    setSelectedTests(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t))
  }

  // Add Test from Dropdown
  const handleSelectCatalogTest = (cTest) => {
    const newTest = {
      id: Date.now(),
      name: cTest.name,
      code: cTest.code,
      price: cTest.price,
      checked: true
    }
    setSelectedTests(prev => [...prev, newTest])
    setShowDropdown(false)
    setTestSearchInput('')
    showToast(`Added ${cTest.name} ($${cTest.price.toFixed(2)}) to current order!`)
  }

  // Calculate Totals
  const checkedTests = selectedTests.filter(t => t.checked)
  const subtotal = checkedTests.reduce((sum, t) => sum + t.price, 0)
  const tax = 0.0
  const total = subtotal + tax + (subtotal > 0 ? 3.0 : 0.0) // $3 processing fee matching $133

  // Handle Generate Invoice
  const handleGenerateInvoice = () => {
    if (checkedTests.length === 0) {
      showToast('Please select at least one test to generate an invoice.')
      return
    }
    setShowInvoiceModal(true)
  }

  const handleConfirmInvoice = () => {
    setShowInvoiceModal(false)
    const newAct = `Booked Test Order: Jane Smith - Total $${total.toFixed(2)}`
    setActivities(prev => [newAct, ...prev])
    showToast(`Provisional Invoice generated successfully for Jane Smith ($${total.toFixed(2)})`)
  }

  // Notify Patient Handler
  const handleNotifyPatient = (patientName) => {
    showToast(`SMS & Email Notification sent to ${patientName}!`)
  }

  // Filtered Reports
  const filteredReports = reports.filter(r => {
    const matchesSearch = r.patient.toLowerCase().includes(reportSearch.toLowerCase()) || r.test.toLowerCase().includes(reportSearch.toLowerCase())
    const matchesStatus = reportStatusFilter === 'All' || r.status === reportStatusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-5 font-sans" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center justify-between animate-fade-in transition-all text-xs font-bold">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* Title */}
      <h2 className="text-xl font-black tracking-tight text-slate-900 text-left">
        Patient Workflow Dashboard
      </h2>

      {/* Row 1: Top 3 Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div
          onClick={() => setActiveTab && setActiveTab('registration')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-4 cursor-pointer hover:shadow-md transition-all text-left"
        >
          <UserPenIcon />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">REGISTER NEW PATIENT</h3>
            <p className="text-xs text-slate-500 font-medium">Register new patient new patient.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => setActiveTab && setActiveTab('booking')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-4 cursor-pointer hover:shadow-md transition-all text-left"
        >
          <CalendarPenIcon />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">BOOK TESTS</h3>
            <p className="text-xs text-slate-500 font-medium">Book action: to want book tests.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => setActiveTab && setActiveTab('reports')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-4 cursor-pointer hover:shadow-md transition-all text-left"
        >
          <TrackReportIcon />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">TRACK REPORTS</h3>
            <p className="text-xs text-slate-500 font-medium">Track reports ahond track reports.</p>
          </div>
        </div>
      </div>

      {/* Row 2: Horizontal Chevron Progress Stepper */}
      <div className="flex items-center w-full overflow-x-auto text-xs font-extrabold py-1 select-none">
        <button
          onClick={() => {
            setActiveStep(0)
            setActiveTab && setActiveTab('registration')
          }}
          className={`flex-1 min-w-[120px] py-2.5 px-4 text-center font-bold rounded-l-lg transition-colors cursor-pointer ${
            activeStep === 0 ? 'text-white' : 'text-slate-600 hover:bg-slate-200'
          }`}
          style={{ backgroundColor: activeStep === 0 ? '#1a5fb4' : '#e2e8f0' }}
        >
          Registration
        </button>
        <button
          onClick={() => {
            setActiveStep(1)
            setActiveTab && setActiveTab('booking')
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 text-center text-white font-bold transition-colors cursor-pointer ${
            activeStep === 1 ? 'bg-[#14498c]' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
          }`}
        >
          Test Booking ❯
        </button>
        <button
          onClick={() => {
            setActiveStep(2)
            setActiveTab && setActiveTab('printing')
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 text-center font-bold transition-colors cursor-pointer ${
            activeStep === 2 ? 'bg-[#1a5fb4] text-white' : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
          }`}
        >
          Label Printing ❯
        </button>
        <button
          onClick={() => {
            setActiveStep(3)
            setActiveTab && setActiveTab('reports')
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 text-center font-bold transition-colors cursor-pointer ${
            activeStep === 3 ? 'bg-[#1a5fb4] text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Awaiting Report ❯
        </button>
        <button
          onClick={() => {
            setActiveStep(4)
            setActiveTab && setActiveTab('reports')
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 text-center font-bold rounded-r-lg transition-colors cursor-pointer ${
            activeStep === 4 ? 'bg-[#1a5fb4] text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Notify Patient
        </button>
      </div>

      {/* Row 3: Main Workspace (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start text-left">
        
        {/* Left Column: Recent Activity (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs h-[470px] overflow-y-auto">
          <h3 className="text-xs font-black tracking-wider text-slate-800 uppercase border-b border-slate-100 pb-2">
            RECENT ACTIVITY
          </h3>
          <div className="space-y-2">
            {activities.map((act, idx) => (
              <div
                key={idx}
                className="pl-3 py-1.5 border-l-4 border-[#1a5fb4] text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-r"
              >
                {act}
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: Current Action Test Order (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-xs">
          <h3 className="text-xs font-black text-slate-900 border-b border-slate-100 pb-2">
            Current Action: Book Test Order (Jane Smith - ID: 12345)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            {/* Left part of middle card: ADD TEST */}
            <div className="md:col-span-7 space-y-3">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider">ADD TEST</h4>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for dynamic wodown... ▾"
                  value={testSearchInput}
                  onFocus={() => setShowDropdown(true)}
                  onChange={(e) => {
                    setTestSearchInput(e.target.value)
                    setShowDropdown(true)
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-700 outline-none focus:border-[#1a5fb4] cursor-pointer"
                />
                
                {/* Dropdown preview box */}
                {showDropdown && (
                  <div className="mt-1 border border-slate-200 rounded-lg overflow-hidden shadow-md text-xs font-semibold bg-white absolute top-full left-0 right-0 z-20">
                    <div className="flex justify-between px-3 py-1.5 bg-[#1a5fb4] text-white font-bold">
                      <span>Select Test to Add</span>
                      <span className="cursor-pointer" onClick={() => setShowDropdown(false)}>✕</span>
                    </div>
                    {catalogTests
                      .filter(t => t.name.toLowerCase().includes(testSearchInput.toLowerCase()) || t.code.toLowerCase().includes(testSearchInput.toLowerCase()))
                      .map(cTest => (
                        <div
                          key={cTest.id}
                          onClick={() => handleSelectCatalogTest(cTest)}
                          className="flex justify-between px-3 py-2 text-slate-700 hover:bg-blue-50 cursor-pointer border-b border-slate-100"
                        >
                          <span className="font-bold">{cTest.name}</span>
                          <span className="font-extrabold text-[#1a5fb4]">${cTest.price.toFixed(2)}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* TESTS SELECTED */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
                  <span>TESTS SELECTED</span>
                  <span className="text-slate-400">Dynamically</span>
                </div>
                <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100/80 text-[10px] font-bold text-slate-600 border-b border-slate-200">
                        <th className="p-1.5 w-6 text-center"></th>
                        <th className="p-1.5">Test Name</th>
                        <th className="p-1.5">Code</th>
                        <th className="p-1.5 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {selectedTests.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50">
                          <td className="p-1.5 text-center">
                            <input
                              type="checkbox"
                              checked={t.checked}
                              onChange={() => toggleTest(t.id)}
                              className="accent-[#1a5fb4] rounded cursor-pointer"
                            />
                          </td>
                          <td className="p-1.5 text-slate-800 font-semibold">{t.name}</td>
                          <td className="p-1.5 text-slate-500 font-mono text-[10px]">{t.code}</td>
                          <td className="p-1.5 text-right text-slate-900 font-bold">${t.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Billing Totals */}
              <div className="text-xs space-y-1 border-t border-slate-100 pt-2 font-bold text-slate-700">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>TAX</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-sm pt-1">
                  <span>PROVISIONAL INVOICE TOTAL</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleGenerateInvoice}
                className="w-full py-2 bg-[#1a5fb4] hover:bg-[#14498c] text-white text-xs font-bold rounded-lg transition shadow-xs cursor-pointer"
              >
                Generate Provisional Invoice
              </button>
            </div>

            {/* Right part of middle card: PRINT BARCODES/LABELS */}
            <div className="md:col-span-5 rounded-xl p-3.5 space-y-3" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">PRINT BARCODES/LABELS</h4>
              
              <div className="space-y-1 text-xs font-semibold text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="labelOption"
                    checked={labelOption === 'all'}
                    onChange={() => setLabelOption('all')}
                    className="accent-[#1a5fb4]"
                  />
                  <span>All Selected Tests</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="labelOption"
                    checked={labelOption === 'single'}
                    onChange={() => setLabelOption('single')}
                    className="accent-[#1a5fb4]"
                  />
                  <span>Selected Test Only</span>
                </label>
              </div>

              <div className="flex justify-between items-center text-[10px] font-black text-slate-800 uppercase pt-2">
                <span>PREVIEW</span>
                <button
                  onClick={() => setShowLabelModal(true)}
                  className="text-sky-600 underline font-bold cursor-pointer hover:text-sky-800"
                >
                  PREVIEW
                </button>
              </div>

              {/* Barcode Sticker Box */}
              <div
                onClick={() => setShowLabelModal(true)}
                className="bg-white border border-slate-300 rounded-lg p-3 text-center space-y-1 shadow-2xs font-mono cursor-pointer hover:border-[#1a5fb4] transition-colors"
              >
                {/* Barcode graphic */}
                <div className="flex items-center justify-center gap-0.5 py-1">
                  <div className="w-1.5 h-10 bg-slate-900"></div>
                  <div className="w-0.5 h-10 bg-slate-900"></div>
                  <div className="w-2 h-10 bg-slate-900"></div>
                  <div className="w-1 h-10 bg-slate-900"></div>
                  <div className="w-0.5 h-10 bg-slate-900"></div>
                  <div className="w-1.5 h-10 bg-slate-900"></div>
                  <div className="w-2 h-10 bg-slate-900"></div>
                </div>
                <p className="text-[9px] text-slate-500 tracking-wider">109409880400</p>
                <p className="text-xs font-sans font-bold text-slate-900">Patient Name</p>
                <p className="text-[10px] font-sans text-slate-600">ID: 12345</p>
                <p className="text-[10px] font-sans text-slate-600">Test Code: CBC</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Report Status & Ready Reports (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Card 1: Report Status Filter */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5 shadow-xs">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Report Status</h3>
            <input
              type="text"
              placeholder="Patient Name/ID"
              value={reportSearch}
              onChange={(e) => setReportSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-700 outline-none"
            />
            <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-700 outline-none cursor-pointer">
              <option>Test ▾</option>
              <option>CBC</option>
              <option>Glucose</option>
              <option>Lipid Panel</option>
            </select>
            <select
              value={reportStatusFilter}
              onChange={(e) => setReportStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-700 outline-none cursor-pointer"
            >
              <option value="All">Status (Report Ready / Pending) ▾</option>
              <option value="Ready">Report Ready Only</option>
              <option value="Pending">Pending Only</option>
            </select>
          </div>

          {/* Card 2: READY REPORTS Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">READY REPORTS</h3>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-[10px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <th className="p-1.5">Patient Name</th>
                    <th className="p-1.5">Test(s)</th>
                    <th className="p-1.5">Ready Time</th>
                    <th className="p-1.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredReports.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="p-1.5 font-bold text-slate-900">{r.patient}</td>
                      <td className="p-1.5 text-slate-600">{r.test}</td>
                      <td className="p-1.5 text-slate-600">{r.time}</td>
                      <td className="p-1.5 text-center">
                        {r.patient === 'Jane Smith' ? (
                          <button
                            onClick={() => handleNotifyPatient(r.patient)}
                            className="px-2 py-1 bg-[#1a5fb4] text-white text-[9px] font-bold rounded uppercase hover:bg-[#14498c] cursor-pointer"
                          >
                            NOTIFY PATIENT (SMS/EMAIL)
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedReceiptPatient(r.patient)}
                            className="px-2 py-1 bg-[#1a5fb4] text-white text-[9px] font-bold rounded uppercase hover:bg-[#14498c] cursor-pointer"
                          >
                            PRINT RECEIPT
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Row 4: SYSTEM PERMISSIONS Banner */}
      <div className="rounded-xl p-4 text-xs space-y-1 border text-left" style={{ backgroundColor: '#dbeafe', borderColor: '#93c5fd', color: '#1e3a8a' }}>
        <h4 className="font-black text-slate-900 tracking-wider">SYSTEM PERMISSIONS</h4>
        <p className="font-semibold text-slate-700">
          Access limited to Front Desk, Test Booking, Label Printing, Report Status. Clinical / Result modules locked.
        </p>
        <p className="font-bold text-slate-900">
          NOT PERMITTED: Result Entry, Doctor Consultations, Patient Medical History
        </p>
      </div>

      {/* ========================================= */}
      {/* MODAL 1: PROVISIONAL INVOICE PREVIEW      */}
      {/* ========================================= */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-left">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col font-sans">
            <div className="p-5 bg-[#1a5fb4] text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-200">Official Diagnostic Invoice</span>
                <h3 className="text-base font-black tracking-tight">Provisional Invoice: Jane Smith</h3>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} className="text-white font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-3">
                <div>
                  <p className="font-bold text-slate-900">Patient: Jane Smith</p>
                  <p className="text-[10px] text-slate-500 font-mono">Patient ID: 12345</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">Date: {new Date().toLocaleDateString()}</p>
                  <p className="text-[10px] text-emerald-600 font-bold">Status: Pending Settlement</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-extrabold uppercase text-slate-400 text-[10px]">Itemized Booked Tests</p>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-bold text-slate-600 border-b border-slate-200">
                        <th className="p-2">Test Name</th>
                        <th className="p-2">Code</th>
                        <th className="p-2 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {checkedTests.map((t, idx) => (
                        <tr key={idx}>
                          <td className="p-2 font-bold text-slate-800">{t.name}</td>
                          <td className="p-2 font-mono text-[10px] text-slate-500">{t.code}</td>
                          <td className="p-2 text-right font-bold text-slate-900">${t.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-100 font-bold text-slate-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-200">
                  <span>Provisional Total</span>
                  <span className="text-[#1a5fb4]">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmInvoice}
                  className="px-5 py-2 font-bold text-white bg-[#1a5fb4] hover:bg-[#14498c] rounded-lg shadow-xs"
                >
                  Confirm &amp; Issue Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL 2: THERMAL BARCODE LABEL STICKER     */}
      {/* ========================================= */}
      {showLabelModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-left">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col font-sans">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="text-sm font-black">Specimen Barcode Sticker Preview</h3>
              <button onClick={() => setShowLabelModal(false)} className="text-white font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4 text-center">
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-5 space-y-2 font-mono">
                <div className="flex items-center justify-center gap-0.5 py-2">
                  <div className="w-2 h-14 bg-slate-900"></div>
                  <div className="w-0.5 h-14 bg-slate-900"></div>
                  <div className="w-2.5 h-14 bg-slate-900"></div>
                  <div className="w-1 h-14 bg-slate-900"></div>
                  <div className="w-0.5 h-14 bg-slate-900"></div>
                  <div className="w-2 h-14 bg-slate-900"></div>
                  <div className="w-3 h-14 bg-slate-900"></div>
                </div>
                <p className="text-xs text-slate-500 font-bold tracking-wider">109409880400</p>
                <p className="text-sm font-sans font-black text-slate-900">Jane Smith</p>
                <p className="text-xs font-sans text-slate-600 font-bold">ID: 12345 • Test: CBC</p>
              </div>

              <button
                onClick={() => {
                  setShowLabelModal(false)
                  showToast('Thermal barcode sticker printed successfully!')
                }}
                className="w-full py-2.5 bg-[#1a5fb4] hover:bg-[#14498c] text-white text-xs font-bold rounded-lg transition shadow-xs"
              >
                Print Thermal Barcode Label
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL 3: RECEIPT PREVIEW                  */}
      {/* ========================================= */}
      {selectedReceiptPatient && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-left">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col font-sans">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="text-sm font-black">Official Diagnostic Receipt</h3>
              <button onClick={() => setSelectedReceiptPatient(null)} className="text-white font-bold">✕</button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-2">
                <p className="font-bold text-slate-900 text-sm">{selectedReceiptPatient}</p>
                <p className="text-[10px] text-slate-500 font-semibold">Payment Status: Settled &amp; Verified</p>
              </div>

              <div className="space-y-1 font-bold text-slate-700">
                <div className="flex justify-between"><span>Service Fee</span><span>$30.00</span></div>
                <div className="flex justify-between"><span>Tax</span><span>$0.00</span></div>
                <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-200"><span>Paid Total</span><span>$30.00</span></div>
              </div>

              <button
                onClick={() => {
                  setSelectedReceiptPatient(null)
                  showToast(`Receipt printed for ${selectedReceiptPatient}!`)
                }}
                className="w-full py-2.5 bg-[#1a5fb4] hover:bg-[#14498c] text-white text-xs font-bold rounded-lg transition"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
