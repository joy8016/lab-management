import React, { useState, useMemo } from 'react';
import { useLims } from '../../../context/LimsContext';

// Default mock cases to merge with LIMS context if needed
const defaultMockCases = [
  {
    id: 'CAS-2026-001',
    patient: 'Sarah Jenkins',
    patientId: 'PT-8831',
    age: 45,
    gender: 'Female',
    testType: 'Histopathology - Biopsy',
    category: 'Histopathology',
    urgent: true,
    status: 'Pending Review',
    submittedDate: '2026-04-05 09:30 AM',
    physician: 'Dr. Alan Grant',
    findings: '',
    testResults: [
      { name: 'Tissue Specimen Architecture', value: 'Abnormal Cellular Density', status: null, reference: 'Normal Architecture' },
      { name: 'Mitotic Rate', value: '4 per 10 HPF', status: null, reference: '< 2 per 10 HPF' },
      { name: 'Surgically Clear Margins', value: 'Inconclusive (2mm)', status: null, reference: '> 5mm' }
    ]
  },
  {
    id: 'CAS-2026-002',
    patient: 'Robert Chen',
    patientId: 'PT-4412',
    age: 62,
    gender: 'Male',
    testType: 'Cytopathology - Pap Smear',
    category: 'Cytopathology',
    urgent: false,
    status: 'Pending Review',
    submittedDate: '2026-04-05 10:15 AM',
    physician: 'Dr. Maria Santos',
    findings: '',
    testResults: [
      { name: 'Epithelial Cell Analysis', value: 'NILM (Negative)', status: 'approve', reference: 'NILM' },
      { name: 'Endocervical Component', value: 'Present', status: 'approve', reference: 'Present' }
    ]
  },
  {
    id: 'CAS-2026-003',
    patient: 'Elena Rostova',
    patientId: 'PT-9102',
    age: 38,
    gender: 'Female',
    testType: 'Dermatopathology Skin Lesion',
    category: 'Histopathology',
    urgent: true,
    status: 'In Review',
    submittedDate: '2026-04-04 04:45 PM',
    physician: 'Dr. James Vance',
    findings: 'Atypical melanocytic proliferation observed. Suggest immunohistochemistry staining.',
    testResults: [
      { name: 'Breslow Thickness', value: '0.8 mm', status: null, reference: '< 0.75 mm' },
      { name: 'Ulceration', value: 'Absent', status: 'approve', reference: 'Absent' },
      { name: 'Ki-67 Index', value: '8%', status: null, reference: '< 5%' }
    ]
  },
  {
    id: 'CAS-2026-004',
    patient: 'Marcus Vance',
    patientId: 'PT-3301',
    age: 54,
    gender: 'Male',
    testType: 'Surgical Pathology - Appendectomy',
    category: 'Surgical Pathology',
    urgent: false,
    status: 'Pending Review',
    submittedDate: '2026-04-05 11:00 AM',
    physician: 'Dr. Sarah Connor',
    findings: '',
    testResults: [
      { name: 'Mucosal Inflammation', value: 'Acute Neutrophilic Infiltrate', status: null, reference: 'None' },
      { name: 'Serosal Exudate', value: 'Fibrinous Exudate Present', status: null, reference: 'None' }
    ]
  },
  {
    id: 'CAS-2026-005',
    patient: 'David Kim',
    patientId: 'PT-7729',
    age: 29,
    gender: 'Male',
    testType: 'Hematology - Bone Marrow Aspiration',
    category: 'Hematology',
    urgent: true,
    status: 'Pending Review',
    submittedDate: '2026-04-05 11:45 AM',
    physician: 'Dr. Elena Rostova',
    findings: '',
    testResults: [
      { name: 'M:E Ratio', value: '4:1', status: null, reference: '1.5:1 - 3:1' },
      { name: 'Blasts', value: '1.8%', status: null, reference: '< 5%' }
    ]
  }
];

export default function CaseReviewQueue() {
  const {
    cases: contextCases,
    pathologyCases: dbCases,
    signReport,
    signPathologyReportDB,
  } = useLims();

  // Combine context cases, DB cases, and mock cases
  const allCases = useMemo(() => {
    const combined = [...(dbCases || []), ...(contextCases || []).map((c, index) => ({
      id: c.id,
      patient: c.patientName || `Patient ${c.id}`,
      patientId: c.id,
      age: 40 + (index * 5) % 30,
      gender: index % 2 === 0 ? 'Female' : 'Male',
      testType: c.type || 'General Pathology Review',
      category: c.type?.includes('Biochemistry') ? 'Biochemistry' : 'Histopathology',
      urgent: c.urgency === 'Urgent',
      status: c.status === 'Signed & Finalized' ? 'Signed & Finalized' : (c.status || 'Pending Review'),
      submittedDate: c.time || 'Today 11:30 AM',
      physician: 'Dr. Chief Pathologist',
      findings: c.status === 'Signed & Finalized' ? 'Report reviewed and digitally signed off.' : '',
      testResults: [
        { name: 'Primary Diagnostic Marker', value: 'Within Limits', status: c.status === 'Signed & Finalized' ? 'approve' : null, reference: 'Normal Range' },
        { name: 'Microscopic Observation', value: 'Unremarkable', status: c.status === 'Signed & Finalized' ? 'approve' : null, reference: 'Unremarkable' }
      ]
    }))];

    const existingIds = new Set(combined.map(c => c.id));
    const uniqueMock = defaultMockCases.filter(c => !existingIds.has(c.id));
    return [...combined, ...uniqueMock];
  }, [dbCases, contextCases]);

  // Filters & Pagination State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Selected Drawer Case
  const [selectedCase, setSelectedCase] = useState(null);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [testItemStatuses, setTestItemStatuses] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  // Open Case Drawer
  const handleOpenReview = (c) => {
    setSelectedCase(c);
    setClinicalNotes(c.findings || '');
    
    // Initialize test item status map for selected case
    const initialStatuses = {};
    (c.testResults || []).forEach((t, i) => {
      initialStatuses[i] = t.status || null;
    });
    setTestItemStatuses(initialStatuses);
  };

  // Close Drawer
  const handleCloseDrawer = () => {
    setSelectedCase(null);
    setClinicalNotes('');
    setTestItemStatuses({});
  };

  // Handle individual test parameter action
  const handleTestItemAction = (index, action) => {
    setTestItemStatuses(prev => ({
      ...prev,
      [index]: prev[index] === action ? null : action
    }));
  };

  // Preset template inserted into clinical notes
  const handleApplyPreset = (text) => {
    setClinicalNotes(prev => (prev ? `${prev} ${text}` : text));
  };

  // Sign & Finalize Report connected to DB
  const handleSignAndFinalize = async () => {
    if (!selectedCase) return;

    const updatedResults = (selectedCase.testResults || []).map((t, idx) => ({
      ...t,
      status: testItemStatuses[idx] || 'approve'
    }));

    if (signPathologyReportDB) {
      await signPathologyReportDB(selectedCase.id, clinicalNotes || 'Reviewed and digitally signed.', updatedResults);
    }

    if (signReport) {
      signReport(selectedCase.id);
    }

    // Show toast
    setToastMessage(`Case ${selectedCase.id} has been digitally signed and saved to MongoDB!`);
    setTimeout(() => setToastMessage(null), 4000);

    handleCloseDrawer();
  };

  // Filtered dataset calculation
  const filteredCases = useMemo(() => {
    return allCases.filter((c) => {
      const query = (searchQuery || '').toLowerCase();
      const matchesSearch =
        (c.id || c.caseId || '').toString().toLowerCase().includes(query) ||
        (c.patient || c.patientName || '').toLowerCase().includes(query) ||
        (c.testType || '').toLowerCase().includes(query) ||
        (c.physician || '').toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Pending Review' && (c.status === 'Pending Review' || c.status === 'Technician Submitted')) ||
        c.status === statusFilter;

      const matchesUrgency =
        urgencyFilter === 'All' ||
        (urgencyFilter === 'Urgent' ? c.urgent : !c.urgent);

      const matchesCategory =
        categoryFilter === 'All' || c.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesUrgency && matchesCategory;
    });
  }, [allCases, searchQuery, statusFilter, urgencyFilter, categoryFilter]);

  // Statistics
  const pendingCount = allCases.filter(c => c.status === 'Pending Review' || c.status === 'Technician Submitted').length;
  const inReviewCount = allCases.filter(c => c.status === 'In Review').length;
  const urgentCount = allCases.filter(c => c.urgent && c.status !== 'Signed & Finalized').length;
  const finalizedCount = allCases.filter(c => c.status === 'Signed & Finalized').length;

  // Pagination slice
  const paginatedCases = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredCases.slice(start, start + rowsPerPage);
  }, [filteredCases, page, rowsPerPage]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 space-y-6 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-teal-800 text-white px-5 py-3 rounded-xl shadow-lg border border-teal-700 flex items-center gap-3 animate-bounce">
          <svg className="w-5 h-5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Page Title & Stats Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Case Review Queue</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage, review diagnostic results, and digitally sign pathology reports.</p>
        </div>

        {/* Metric Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 px-3.5 py-1.5 rounded-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-amber-800">Pending Review:</span>
            <span className="text-xs font-bold text-amber-900 bg-white px-2 py-0.5 rounded-md border border-amber-200">{pendingCount}</span>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="text-xs font-semibold text-blue-800">In Review:</span>
            <span className="text-xs font-bold text-blue-900 bg-white px-2 py-0.5 rounded-md border border-blue-200">{inReviewCount}</span>
          </div>

          <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-3.5 py-1.5 rounded-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="text-xs font-semibold text-red-800">Urgent Flags:</span>
            <span className="text-xs font-bold text-red-900 bg-white px-2 py-0.5 rounded-md border border-red-200">{urgentCount}</span>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-semibold text-emerald-800">Signed Today:</span>
            <span className="text-xs font-bold text-emerald-900 bg-white px-2 py-0.5 rounded-md border border-emerald-200">{finalizedCount}</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          
          {/* Search Field */}
          <div className="lg:col-span-4 relative">
            <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search Case ID, Patient Name, Physician..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Select */}
          <div className="lg:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none transition"
            >
              <option value="All">All Statuses</option>
              <option value="Pending Review">Pending Review / Technician Submitted</option>
              <option value="In Review">In Review</option>
              <option value="Signed & Finalized">Signed & Finalized</option>
            </select>
          </div>

          {/* Category Select */}
          <div className="lg:col-span-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none transition"
            >
              <option value="All">All Categories</option>
              <option value="Histopathology">Histopathology</option>
              <option value="Cytopathology">Cytopathology</option>
              <option value="Surgical Pathology">Surgical Pathology</option>
              <option value="Hematology">Hematology</option>
              <option value="Biochemistry">Biochemistry</option>
            </select>
          </div>

          {/* Urgency Select */}
          <div className="lg:col-span-2">
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none transition"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent Only</option>
              <option value="Normal">Normal Priority</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="lg:col-span-1 flex items-center justify-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setUrgencyFilter('All');
                setCategoryFilter('All');
                setPage(0);
              }}
              title="Reset Filters"
              className="w-full py-2 px-3 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer flex items-center justify-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-5">Case ID</th>
                <th className="py-3.5 px-4">Patient Information</th>
                <th className="py-3.5 px-4">Test Description</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Submitted Date</th>
                <th className="py-3.5 px-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {paginatedCases.length > 0 ? (
                paginatedCases.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-teal-50/30 transition-colors group cursor-pointer"
                    onClick={() => handleOpenReview(row)}
                  >
                    {/* Case ID */}
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-teal-800 group-hover:text-teal-900">{row.id}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{row.patientId}</div>
                    </td>

                    {/* Patient Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900">{row.patient}</div>
                      <div className="text-[11px] text-gray-500">
                        {row.age} yrs • {row.gender}
                      </div>
                    </td>

                    {/* Test Description */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-800">{row.testType}</div>
                      <div className="text-[10px] text-gray-400">{row.category}</div>
                    </td>

                    {/* Priority Badge */}
                    <td className="py-3.5 px-4">
                      {row.urgent ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">
                          <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l3.55 3.4A1 1 0 0117 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                          </svg>
                          Urgent
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
                          Normal
                        </span>
                      )}
                    </td>

                    {/* Status Chip */}
                    <td className="py-3.5 px-4">
                      {row.status === 'Signed & Finalized' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          ✓ Signed & Finalized
                        </span>
                      ) : row.status === 'In Review' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                          In Review
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          Pending Review
                        </span>
                      )}
                    </td>

                    {/* Submitted Date */}
                    <td className="py-3.5 px-4 text-gray-500 font-medium">
                      {row.submittedDate}
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-5 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenReview(row)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 mx-auto ${
                          row.status === 'Signed & Finalized'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{row.status === 'Signed & Finalized' ? 'View Report' : 'Review Case'}</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm font-semibold text-gray-600">No matching cases found</p>
                    <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search keywords.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-3 bg-gray-50/50 border-t border-gray-100 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(0);
              }}
              className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span>entries per page</span>
          </div>

          <div>
            Showing <span className="font-bold">{filteredCases.length > 0 ? page * rowsPerPage + 1 : 0}</span> to{' '}
            <span className="font-bold">{Math.min((page + 1) * rowsPerPage, filteredCases.length)}</span> of{' '}
            <span className="font-bold">{filteredCases.length}</span> cases
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1 rounded-lg border border-gray-200 bg-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              disabled={(page + 1) * rowsPerPage >= filteredCases.length}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1 rounded-lg border border-gray-200 bg-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Slide-out Review Drawer Panel */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-gray-100">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-gray-100 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-10">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">Case Review: {selectedCase.id}</h2>
                  {selectedCase.urgent && (
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                      Urgent
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Submitted by {selectedCase.physician} • {selectedCase.submittedDate}</p>
              </div>

              <button
                onClick={handleCloseDrawer}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 flex-1">
              
              {/* Patient Banner */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient Name</span>
                  <div className="text-base font-bold text-slate-900">{selectedCase.patient}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Age / Gender</span>
                  <div className="text-sm font-semibold text-slate-700">{selectedCase.age} Yrs • {selectedCase.gender}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MRN / ID</span>
                  <div className="text-sm font-semibold text-teal-700">{selectedCase.patientId}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Test Category</span>
                  <div className="text-sm font-semibold text-slate-700">{selectedCase.category}</div>
                </div>
              </div>

              {/* Diagnostic Test Parameters Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Lab Test Observations</h3>
                  <span className="text-xs text-gray-500 font-medium">Verify individual parameter values</span>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                        <th className="py-2.5 px-3.5">Parameter</th>
                        <th className="py-2.5 px-3">Observed Value</th>
                        <th className="py-2.5 px-3">Reference</th>
                        <th className="py-2.5 px-3.5 text-center">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(selectedCase.testResults || []).map((t, idx) => {
                        const status = testItemStatuses[idx];
                        return (
                          <tr key={idx} className="hover:bg-gray-50/50">
                            <td className="py-2.5 px-3.5 font-medium text-gray-900">{t.name}</td>
                            <td className="py-2.5 px-3 font-bold text-teal-800">{t.value}</td>
                            <td className="py-2.5 px-3 text-gray-500">{t.reference}</td>
                            <td className="py-2.5 px-3.5">
                              {selectedCase.status === 'Signed & Finalized' ? (
                                <div className="text-center">
                                  <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                    Verified
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    onClick={() => handleTestItemAction(idx, 'approve')}
                                    className={`px-2 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
                                      status === 'approve'
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                    }`}
                                  >
                                    ✓ Approve
                                  </button>
                                  <button
                                    onClick={() => handleTestItemAction(idx, 'reject')}
                                    className={`px-2 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
                                      status === 'reject'
                                        ? 'bg-red-600 text-white'
                                        : 'bg-red-50 text-red-700 hover:bg-red-100'
                                    }`}
                                  >
                                    ✕ Flag
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Template Presets */}
              {selectedCase.status !== 'Signed & Finalized' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-800">Quick Clinical Impressions:</label>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => handleApplyPreset('Unremarkable microscopic impression with negative malignancy.')}
                      className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition"
                    >
                      + Normal / Unremarkable
                    </button>
                    <button
                      onClick={() => handleApplyPreset('Mild dysplasia noted. Correlate with clinical history.')}
                      className="text-[11px] bg-amber-50 hover:bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg transition"
                    >
                      + Mild Dysplasia
                    </button>
                    <button
                      onClick={() => handleApplyPreset('Requires repeat biopsy for conclusive histopathological diagnosis.')}
                      className="text-[11px] bg-red-50 hover:bg-red-100 text-red-800 px-2.5 py-1 rounded-lg transition"
                    >
                      + Repeat Biopsy
                    </button>
                  </div>
                </div>
              )}

              {/* Pathologist Clinical Remarks & Notes */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800">
                  Pathologist Findings & Clinical Commentary
                </label>
                <textarea
                  rows={4}
                  value={clinicalNotes}
                  disabled={selectedCase.status === 'Signed & Finalized'}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="Type diagnostic conclusions, micro-observations, or recommendations for the treating physician..."
                  className="w-full p-3 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none resize-none transition disabled:bg-gray-50"
                />
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 sticky bottom-0">
              <button
                onClick={handleCloseDrawer}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200 transition"
              >
                Close
              </button>

              {selectedCase.status !== 'Signed & Finalized' && (
                <button
                  onClick={handleSignAndFinalize}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Digitally Sign &amp; Finalize Report</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}