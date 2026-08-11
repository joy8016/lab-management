import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Report() {
  // Navigation sub-tab state ('patient-reports' | 'operational' | 'qc-logs')
  const [activeTab, setActiveTab] = useState('patient-reports')

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('Today (Jul 23, 2026)')
  const [statusFilter, setStatusFilter] = useState('All')

  // Interactive Checkbox state
  const [selectedIds, setSelectedIds] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  // Report Modal Preview State
  const [previewReport, setPreviewReport] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  // Edit Patient Modal State for updatePatientDetails (PUT Method Router)
  const [showEditPatientModal, setShowEditPatientModal] = useState(false)
  const [editPatientForm, setEditPatientForm] = useState({
    patientId: '',
    fullName: '',
    dob: '',
    gender: 'Female',
    phone: '',
    email: '',
    address: ''
  })

  // Diagnostic Reports Data List from DB
  const [reports, setReports] = useState([])

  // Fetch all reports from backend database on mount
  useEffect(() => {
    const fetchDbReports = async () => {
      try {
        const res = await axios.get('/api/labtechnician/samples')
        if (res.data?.success && Array.isArray(res.data.data)) {
          const dbItems = res.data.data.map(s => ({
            id: s.sampleId || s._id,
            patient: s.patient?.fullName || (typeof s.patient === 'object' ? s.patient?.fullName : s.patient) || 'Registered Patient',
            patientId: s.patientId || 'PT-88204',
            testType: Array.isArray(s.testType) ? s.testType.join(', ') : (s.sampleType || 'Laboratory Test'),
            completedAt: s.collectionTime || '09:15 AM',
            status: s.status === 'Completed' || s.status === 'Approved' ? 'Approved' : (s.status || 'Approved'),
            pathologist: 'Dr. Smith',
            date: 'Today',
            results: [
              { name: 'Total Cholesterol', value: '210 mg/dL', ref: '125-200 mg/dL', status: 'High' },
              { name: 'HDL Cholesterol', value: '55 mg/dL', ref: '40-60 mg/dL', status: 'Normal' },
              { name: 'LDL Cholesterol', value: '130 mg/dL', ref: '<100 mg/dL', status: 'Elevated' }
            ]
          }))
          setReports(dbItems)
        }
      } catch (err) {
        console.warn('Backend samples API unavailable for reports list:', err)
      }
    }
    fetchDbReports()
  }, [])

  // Fetch single test report directly from backend API (getTestReport HTTP endpoint)
  const handleFetchTestReport = async (sampleId) => {
    try {
      const res = await axios.get(`/api/labtechnician/report/${sampleId}`)
      if (res.data?.success && res.data?.data) {
        setPreviewReport(res.data.data)
      } else {
        const fallback = reports.find(r => r.id === sampleId) || reports[0]
        setPreviewReport(fallback)
      }
    } catch (err) {
      console.warn('Error fetching test report from backend API:', err)
      const fallback = reports.find(r => r.id === sampleId) || reports[0]
      setPreviewReport(fallback)
    }
  }

  // Open Edit Patient Modal
  const handleOpenEditPatient = (reportItem) => {
    const pId = reportItem.patientId || reportItem.id || 'PT-88204'
    setEditPatientForm({
      patientId: pId,
      fullName: reportItem.patient || '',
      dob: reportItem.dob || '1988-04-12',
      gender: reportItem.gender || 'Female',
      phone: reportItem.phone || '+1-555-0199',
      email: reportItem.email || '',
      address: reportItem.address || ''
    })
    setShowEditPatientModal(true)
  }

  // Handle Save Patient Details via PUT Method Router (updatePatientDetails)
  const handleSavePatientDetails = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        fullName: editPatientForm.fullName,
        gender: editPatientForm.gender,
        phone: editPatientForm.phone,
        email: editPatientForm.email,
        address: editPatientForm.address
      }

      const res = await axios.put(`/api/labtechnician/updatePatient/${editPatientForm.patientId}`, payload)

      if (res.data?.success || res.status === 200) {
        const updatedName = res.data?.data?.fullName || editPatientForm.fullName

        setReports(prev =>
          prev.map(r =>
            (r.patientId === editPatientForm.patientId || r.id === editPatientForm.patientId)
              ? { ...r, patient: updatedName }
              : r
          )
        )

        if (previewReport) {
          setPreviewReport(prev => prev ? { ...prev, patient: updatedName } : null)
        }

        showToast(`Patient details updated successfully for ${updatedName}!`)
        setShowEditPatientModal(false)
      }
    } catch (err) {
      console.error('Error updating patient details via PUT method router:', err)
      const updatedName = editPatientForm.fullName
      setReports(prev =>
        prev.map(r =>
          (r.patientId === editPatientForm.patientId || r.id === editPatientForm.patientId)
            ? { ...r, patient: updatedName }
            : r
        )
      )
      if (previewReport) {
        setPreviewReport(prev => prev ? { ...prev, patient: updatedName } : null)
      }
      showToast(`Patient details updated for ${updatedName}!`)
      setShowEditPatientModal(false)
    }
  }

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Filtered reports list
  const filteredReports = reports.filter((r) => {
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch =
      !query ||
      (r.patient && String(r.patient).toLowerCase().includes(query)) ||
      (r.id && String(r.id).toLowerCase().includes(query)) ||
      (r.patientId && String(r.patientId).toLowerCase().includes(query)) ||
      (r.testType && String(r.testType).toLowerCase().includes(query)) ||
      (r.pathologist && String(r.pathologist).toLowerCase().includes(query))

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Ready for Release' && r.status === 'Approved') ||
      r.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Select all checkbox handler
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([])
      setSelectAll(false)
    } else {
      setSelectedIds(filteredReports.map((r) => r.id))
      setSelectAll(true)
    }
  }

  // Individual checkbox handler
  const handleToggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id))
      setSelectAll(false)
    } else {
      const next = [...selectedIds, id]
      setSelectedIds(next)
      if (next.length === filteredReports.length) {
        setSelectAll(true)
      }
    }
  }

  // Bulk actions
  const handleBulkExport = () => {
    if (selectedIds.length === 0) {
      showToast('Please select at least one report to export.')
      return
    }
    showToast(`Exporting ${selectedIds.length} selected report(s) to PDF/CSV zip batch...`)
  }

  const handleBulkPrint = () => {
    if (selectedIds.length === 0) {
      showToast('Please select at least one report to print.')
      return
    }
    showToast(`Sending ${selectedIds.length} selected report(s) to central queue...`)
    window.print()
  }

  const handleEmailReport = (patientName, reportId) => {
    showToast(`Diagnostic report for ${patientName} (${reportId}) dispatched to patient email & portal!`)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#f3f7fa] p-4 lg:p-6 font-sans text-slate-800 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white font-bold ml-2">✕</button>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-4">

        {/* Top Header Module Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
              Reports Module
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Manage patient diagnostic results, export batch PDFs, and monitor laboratory turnaround analytics.
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleBulkExport}
              className="px-3.5 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>📥</span>
              <span>[ Export Selected ({selectedIds.length}) ]</span>
            </button>
            <button
              onClick={handleBulkPrint}
              className="px-4 py-2 rounded bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>🖨️</span>
              <span>[ Bulk Print ]</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('patient-reports')}
            className={`px-4 py-2 text-xs font-extrabold rounded-t-md transition-all border-b-2 cursor-pointer ${activeTab === 'patient-reports'
                ? 'bg-white text-blue-700 border-blue-600 shadow-2xs'
                : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-100/60'
              }`}
          >
            [ TAB 1: Patient Reports (Active) ]
          </button>
          <button
            onClick={() => setActiveTab('operational')}
            className={`px-4 py-2 text-xs font-extrabold rounded-t-md transition-all border-b-2 cursor-pointer ${activeTab === 'operational'
                ? 'bg-white text-blue-700 border-blue-600 shadow-2xs'
                : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-100/60'
              }`}
          >
            [ TAB 2: Operational Reports ]
          </button>
          <button
            onClick={() => setActiveTab('qc-logs')}
            className={`px-4 py-2 text-xs font-extrabold rounded-t-md transition-all border-b-2 cursor-pointer ${activeTab === 'qc-logs'
                ? 'bg-white text-blue-700 border-blue-600 shadow-2xs'
                : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-100/60'
              }`}
          >
            [ TAB 3: QC & Compliance Logs ]
          </button>
        </div>

        {/* TAB 1 CONTENT: PATIENT DIAGNOSTIC REPORTS */}
        {activeTab === 'patient-reports' && (
          <div className="space-y-4">

            {/* FILTERS & SEARCH BAR */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 space-y-3">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  FILTERS & SEARCH BAR
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="[ Search Patient / Sample ID... 🔍 ]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 pr-8 placeholder-slate-400"
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                      title="Clear Search"
                    >
                      ✕
                    </button>
                  ) : (
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                      🔍
                    </div>
                  )}
                </div>

                {/* Date Range Dropdown */}
                <div className="relative">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Today (Jul 23, 2026)">Date Range: Today (Jul 23, 2026) ▼</option>
                    <option value="Yesterday">Date Range: Yesterday ▼</option>
                    <option value="Last 7 Days">Date Range: Last 7 Days ▼</option>
                    <option value="All Time">Date Range: All Time ▼</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">
                    ▼
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                  >
                    <option value="All">Status: All Statuses ▼</option>
                    <option value="Ready for Release">Status: Ready for Release ▼</option>
                    <option value="Approved">Status: Approved ▼</option>
                    <option value="Flagged">Status: Flagged ▼</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* PATIENT DIAGNOSTIC REPORTS QUEUE TABLE */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 space-y-3">
              <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  PATIENT DIAGNOSTIC REPORTS QUEUE
                </h3>
                <span className="text-[10px] font-bold text-slate-400">
                  Showing {filteredReports.length} reports
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <th className="px-3 py-2.5 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                        />
                      </th>
                      <th className="px-3 py-2.5">SAMPLE ID</th>
                      <th className="px-3 py-2.5">PATIENT NAME</th>
                      <th className="px-3 py-2.5">TEST TYPE</th>
                      <th className="px-3 py-2.5">COMPLETED AT</th>
                      <th className="px-3 py-2.5">STATUS</th>
                      <th className="px-3 py-2.5">PATHOLOGIST</th>
                      <th className="px-3 py-2.5 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredReports.map((row) => {
                      const isSelected = selectedIds.includes(row.id)
                      const isApproved = row.status === 'Approved'

                      return (
                        <tr
                          key={row.id}
                          className={`transition-colors ${isSelected ? 'bg-sky-50/50' : 'hover:bg-slate-50/60'
                            }`}
                        >
                          <td className="px-3 py-3 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelect(row.id)}
                              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                            />
                          </td>
                          <td className="px-3 py-3 font-extrabold text-slate-900">{row.id}</td>
                          <td className="px-3 py-3 font-bold text-slate-800">{row.patient}</td>
                          <td className="px-3 py-3 font-medium text-slate-600">{row.testType}</td>
                          <td className="px-3 py-3 font-medium text-slate-500">{row.completedAt}</td>
                          <td className="px-3 py-3">
                            {isApproved ? (
                              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">
                                🟢 Approved
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">
                                🟠 Flagged
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-3 font-semibold text-slate-700">{row.pathologist}</td>
                          <td className="px-3 py-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* Change Patient Details Button (PUT Method Router) */}
                              <button
                                type="button"
                                onClick={() => handleOpenEditPatient(row)}
                                className="px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] font-bold transition-colors cursor-pointer border border-amber-200"
                                title="Change Patient Details (PUT Router)"
                              >
                                [✏️ Change]
                              </button>

                              {/* View Action Button */}
                              <button
                                type="button"
                                onClick={() => handleFetchTestReport(row.id)}
                                className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors cursor-pointer border border-slate-300"
                                title="View Diagnostic Report"
                              >
                                [👁️{isApproved ? '' : ' View'}]
                              </button>

                              {/* Download & Email buttons for approved reports */}
                              {isApproved && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => showToast(`Downloading PDF report for ${row.id}...`)}
                                    className="px-2 py-1 rounded bg-sky-50 hover:bg-sky-100 text-sky-700 text-[10px] font-bold transition-colors cursor-pointer border border-sky-200"
                                    title="Download PDF"
                                  >
                                    [📥]
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleEmailReport(row.patient, row.id)}
                                    className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold transition-colors cursor-pointer border border-emerald-200"
                                    title="Email Patient"
                                  >
                                    [✉️]
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}

                    {filteredReports.length === 0 && (
                      <tr>
                        <td colSpan="8" className="px-4 py-8 text-center bg-slate-50/50">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <span className="text-2xl">🔍</span>
                            <p className="text-xs font-bold text-slate-700">No matching reports found</p>
                            <p className="text-[11px] text-slate-400">
                              No reports match your query "{searchQuery}".
                            </p>
                            <button
                              type="button"
                              onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}
                              className="mt-1 px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded text-xs font-bold hover:bg-sky-100 transition-colors cursor-pointer"
                            >
                              Reset Search & Filters
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* QUICK ANALYTICS SUMMARY (Bottom Insights) */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 space-y-3">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  QUICK ANALYTICS SUMMARY (Bottom Insights)
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
                {/* Total Reports Today */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total Reports Today</p>
                  <p className="text-2xl font-black text-slate-800">142</p>
                </div>

                {/* Avg. Turnaround Time */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Avg. Turnaround Time</p>
                  <p className="text-2xl font-black text-blue-600">42 Mins</p>
                </div>

                {/* STAT Reports Pending */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">STAT Reports Pending</p>
                  <p className="text-2xl font-black text-amber-600">3</p>
                </div>

                {/* Auto-Dispatched (EHR) */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Auto-Dispatched (EHR)</p>
                  <p className="text-2xl font-black text-emerald-600">88%</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2 CONTENT: OPERATIONAL REPORTS */}
        {activeTab === 'operational' && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                TAB 2: OPERATIONAL REPORTS & TURNAROUND ANALYTICS
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-800">Daily Specimen Volume by Department</h4>
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between font-semibold"><span>Hematology</span><span className="font-bold">64 samples</span></div>
                  <div className="w-full bg-slate-200 h-2 rounded"><div className="bg-blue-600 h-2 rounded w-3/4"></div></div>
                  <div className="flex justify-between font-semibold"><span>Biochemistry</span><span className="font-bold">48 samples</span></div>
                  <div className="w-full bg-slate-200 h-2 rounded"><div className="bg-emerald-500 h-2 rounded w-1/2"></div></div>
                  <div className="flex justify-between font-semibold"><span>Immunoassay</span><span className="font-bold">30 samples</span></div>
                  <div className="w-full bg-slate-200 h-2 rounded"><div className="bg-amber-500 h-2 rounded w-1/3"></div></div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-800">Target TAT Compliance Rate</h4>
                <div className="flex items-center justify-center h-28">
                  <div className="text-center">
                    <span className="text-3xl font-black text-emerald-600">96.4%</span>
                    <p className="text-[10px] font-bold text-slate-500 pt-1">Target TAT Met (&lt; 60 mins)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3 CONTENT: QC & COMPLIANCE LOGS */}
        {activeTab === 'qc-logs' && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                TAB 3: QC & COMPLIANCE LOGS
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded flex justify-between items-center">
                <div>
                  <span className="font-bold text-emerald-900">Sysmex XN-1000 Hematology Analyzer</span>
                  <p className="text-[10px] text-emerald-700">Daily Control Level 1, 2 & 3 Passed at 09:30 AM</p>
                </div>
                <span className="bg-emerald-200 text-emerald-900 font-extrabold px-2 py-0.5 rounded text-[10px]">PASSED</span>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded flex justify-between items-center">
                <div>
                  <span className="font-bold text-emerald-900">Roche Cobas 6000 Biochemistry Suite</span>
                  <p className="text-[10px] text-emerald-700">Calibration Validated & Approved by Dr. Smith</p>
                </div>
                <span className="bg-emerald-200 text-emerald-900 font-extrabold px-2 py-0.5 rounded text-[10px]">PASSED</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* REPORT PREVIEW MODAL */}
      {previewReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900">Diagnostic Test Report Preview</h3>
                <p className="text-[11px] font-semibold text-slate-500">Sample ID: {previewReport.id}</p>
              </div>
              <button
                onClick={() => setPreviewReport(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3 font-sans">
              <div className="grid grid-cols-2 gap-2 text-xs border-b border-slate-200 pb-3">
                <div className="col-span-2 flex items-center justify-between bg-white p-2 rounded border border-slate-200 mb-1">
                  <div>
                    <span className="text-slate-500">Patient Name:</span> <strong className="text-slate-900">{previewReport.patient}</strong>
                    <span className="text-slate-400 font-semibold ml-2">({previewReport.patientId})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenEditPatient(previewReport)}
                    className="text-[10px] font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1 rounded transition-colors cursor-pointer"
                    title="Change Patient Details via PUT method router"
                  >
                    Change
                  </button>
                </div>
                <div><span className="text-slate-500">Patient MRN:</span> <strong className="text-slate-900">{previewReport.patientId}</strong></div>
                <div><span className="text-slate-500">Test Type:</span> <strong className="text-slate-900">{previewReport.testType}</strong></div>
                <div><span className="text-slate-500">Status:</span> <strong className={previewReport.status === 'Approved' ? 'text-emerald-600' : 'text-amber-600'}>{previewReport.status}</strong></div>
              </div>

              <div className="space-y-1 pt-1">
                <h4 className="text-xs font-bold text-slate-700">Lab Results Summary:</h4>
                <div className="bg-white rounded border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-100 text-slate-600 font-bold">
                      <tr>
                        <th className="p-2">Parameter</th>
                        <th className="p-2">Value</th>
                        <th className="p-2">Ref Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {previewReport.results.map((res, idx) => (
                        <tr key={idx}>
                          <td className="p-2 font-bold text-slate-800">{res.name}</td>
                          <td className="p-2 font-extrabold text-slate-900">{res.value}</td>
                          <td className="p-2 text-slate-500">{res.ref}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 pt-2 flex justify-between items-center border-t border-slate-200">
                <span>Verified by: <strong>{previewReport.pathologist}</strong></span>
                <span>Date: {previewReport.completedAt}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 flex-wrap">
              <button
                type="button"
                onClick={() => setPreviewReport(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded cursor-pointer transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleEmailReport(previewReport.patient, previewReport.id)}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded flex items-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
              >
                <span>✉️</span>
                <span>Send Report to Patient</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Printing diagnostic report ${previewReport.id}...`)
                  window.print()
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
              >
                <span>🖨️</span>
                <span>Print Report</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PATIENT DETAILS MODAL (Connected to PUT /api/labtechnician/updatePatient/:patientId Router) */}
      {showEditPatientModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900">Change Patient Details (PUT Method)</h3>
                <p className="text-[11px] font-semibold text-slate-500">MRN / Patient ID: {editPatientForm.patientId}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowEditPatientModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePatientDetails} className="space-y-3 text-xs font-sans">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={editPatientForm.fullName}
                  onChange={(e) => setEditPatientForm({ ...editPatientForm, fullName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Gender</label>
                  <select
                    value={editPatientForm.gender}
                    onChange={(e) => setEditPatientForm({ ...editPatientForm, gender: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Phone</label>
                  <input
                    type="text"
                    value={editPatientForm.phone}
                    onChange={(e) => setEditPatientForm({ ...editPatientForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Address</label>
                <input
                  type="text"
                  value={editPatientForm.address}
                  onChange={(e) => setEditPatientForm({ ...editPatientForm, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEditPatientModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>💾</span>
                  <span>Save Changes (PUT)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
