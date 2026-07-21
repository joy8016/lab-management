import React, { useState } from 'react'
import { useLims } from '../../../context/LimsContext'

/* ─── Metric Card ─── */
function MetricCard({ title, value, subtitle, icon, accent }) {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 px-5 py-4 flex flex-col gap-1.5 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 font-semibold">{title}</span>
        {icon}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-extrabold text-gray-900 leading-none">{value}</span>
        {subtitle && <span className={`text-xs font-bold ${accent || 'text-amber-500'}`}>{subtitle}</span>}
      </div>
    </div>
  )
}

/* ─── Case Review Queue Table ─── */
function CaseReviewQueue({ cases, selectedCaseId, onSelectCase }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <h3 className="text-base font-bold text-gray-900">Case Review Queue</h3>
        <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 font-semibold text-gray-600 cursor-pointer outline-none focus:ring-1 focus:ring-teal-200">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Daily</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-gray-50 text-gray-500 font-semibold">
              <th className="px-5 py-2.5">Patient ID ↓</th>
              <th className="px-3 py-2.5">Case Type</th>
              <th className="px-3 py-2.5">Urgency</th>
              <th className="px-3 py-2.5">Received Time</th>
              <th className="px-3 py-2.5">Status</th>
              <th className="px-3 py-2.5 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr
                key={c.id}
                onClick={() => onSelectCase(c.id)}
                className={`border-t border-gray-50 cursor-pointer transition-all ${
                  selectedCaseId === c.id
                    ? 'bg-amber-50/60 border-l-[3px] border-l-amber-400'
                    : 'hover:bg-gray-50/60'
                }`}
              >
                <td className="px-5 py-3 font-semibold text-gray-800">{c.patientName}</td>
                <td className="px-3 py-3 text-gray-600">{c.type}</td>
                <td className="px-3 py-3">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                    c.urgency === 'Urgent'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {c.urgency}
                  </span>
                </td>
                <td className="px-3 py-3 text-gray-500">{c.time}</td>
                <td className="px-3 py-3 text-gray-500">{c.status}</td>
                <td className="px-3 py-3 text-center">
                  <button className="text-gray-400 hover:text-gray-700 transition cursor-pointer">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── Selected Case Detail ─── */
function SelectedCaseDetail({ caseData, onSign }) {
  const [remarks, setRemarks] = useState('')
  const [results, setResults] = useState([
    { category: 'Blood Counts', tests: [
      { name: 'Blood Counts', value: '90-120', remark: 'Alevat Kasariam Narrah' },
      { name: 'Blood Counts', value: '>30', remark: '' },
    ]},
    { category: 'Biochemistry', tests: [
      { name: 'Biochemistry', value: '150', status: null },
      { name: 'Biochemistry', value: '130', status: null },
      { name: 'Biochemistry', value: '8.0', status: null },
      { name: 'Biochemistry', value: '4.0', status: null },
      { name: 'Biochemistry', value: '2.2', status: null },
    ]}
  ])

  const handleTestAction = (catIdx, testIdx, action) => {
    setResults(prev => {
      const copy = JSON.parse(JSON.stringify(prev))
      copy[catIdx].tests[testIdx].status = action
      return copy
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 flex flex-col gap-4">
      {/* Title */}
      <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
        Selected Case Detail: <span className="text-teal-700">{caseData?.id || '—'}</span>
      </h3>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-gray-500 font-semibold">
              <th className="pb-2">Test Name</th>
              <th className="pb-2">Value</th>
              <th className="pb-2">Technician Remark</th>
            </tr>
          </thead>
          <tbody>
            {results.map((cat, catIdx) => (
              <React.Fragment key={catIdx}>
                {/* Category Header */}
                <tr>
                  <td colSpan={3} className="pt-3 pb-1.5 text-xs font-bold text-gray-800">{cat.category}</td>
                </tr>
                {cat.tests.map((t, testIdx) => (
                  <tr key={testIdx} className="border-t border-gray-50">
                    <td className="py-2 text-gray-600">{t.name}</td>
                    <td className="py-2 font-semibold text-gray-800">{t.value}</td>
                    <td className="py-2">
                      {cat.category === 'Blood Counts' ? (
                        <span className="text-gray-500">{t.remark}</span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleTestAction(catIdx, testIdx, 'approve')}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition ${
                              t.status === 'approve'
                                ? 'bg-green-600 text-white'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleTestAction(catIdx, testIdx, 'reject')}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition ${
                              t.status === 'reject'
                                ? 'bg-red-600 text-white'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleTestAction(catIdx, testIdx, 'retest')}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition ${
                              t.status === 'retest'
                                ? 'bg-amber-600 text-white'
                                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                            }`}
                          >
                            Flag for Re-test
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Clinical Remarks */}
      <div className="flex flex-col gap-1.5 pt-1">
        <label className="text-xs font-bold text-gray-800">Add Clinical Remarks &amp; Interpretation</label>
        <textarea
          rows={2}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Add Clinical Remarks & Interpretation"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-600 outline-none resize-none focus:ring-2 focus:ring-teal-100 focus:border-teal-300 transition"
        />
      </div>

      {/* Sign Button */}
      <button
        onClick={() => caseData && onSign(caseData.id)}
        className="w-full bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 text-white rounded-xl py-3 text-sm font-bold transition cursor-pointer shadow-sm"
      >
        <span className="block">Digitally Sign and Finalize Report</span>
        <span className="block text-[10px] font-medium text-teal-200 -mt-0.5">Apply E-Signature</span>
      </button>
    </div>
  )
}

/* ─── Recent Signed Reports ─── */
function RecentSignedReports() {
  const reports = [
    { name: 'Recent Signed Report 1', status: 'Summary' },
    { name: 'Recent Signed Report 2', status: 'Summary' },
    { name: 'Recent Signed Report 3', status: 'Summary' },
  ]
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5">
      <h3 className="text-base font-bold text-gray-900 mb-3">Recent Signed Reports</h3>
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="text-gray-500 font-semibold">
            <th className="pb-2">Reports</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <tr key={i} className="border-t border-gray-50">
              <td className="py-2.5 text-gray-700 font-medium">{r.name}</td>
              <td className="py-2.5 text-gray-500">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─── Pending Critical Alerts ─── */
function PendingCriticalAlerts() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 flex items-center gap-5">
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-1">Pending Critical Alerts</h3>
        <p className="text-xs text-gray-500">Monitor urgent cases and abnormal results that require immediate attention.</p>
      </div>
      {/* Illustration */}
      <div className="shrink-0 w-28 h-28 flex items-center justify-center">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Clipboard background */}
          <rect x="25" y="15" width="55" height="75" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <rect x="40" y="10" width="25" height="10" rx="3" fill="#0284c7" />
          {/* Lines on clipboard */}
          <line x1="35" y1="35" x2="70" y2="35" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" />
          <line x1="35" y1="45" x2="65" y2="45" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" />
          <line x1="35" y1="55" x2="60" y2="55" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" />
          <line x1="35" y1="65" x2="55" y2="65" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" />
          {/* Doctor figure */}
          <circle cx="90" cy="45" r="10" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" />
          <rect x="82" y="58" width="16" height="28" rx="5" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
          <circle cx="87" cy="66" r="2" fill="#22c55e" />
          {/* Alert triangle */}
          <g transform="translate(72, 68)">
            <polygon points="12,2 22,22 2,22" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
            <text x="12" y="18" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">!</text>
          </g>
        </svg>
      </div>
    </div>
  )
}

/* ─── Dashboard Overview ─── */
export default function DashboardOverview() {
  const { cases, signReport } = useLims()
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id || null)

  const selectedCase = cases.find((c) => c.id === selectedCaseId) || null
  const urgentCount = cases.filter((c) => c.urgency === 'Urgent').length

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 space-y-5">
      {/* ─── Metrics Row ─── */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          title="Cases to Approve"
          value={cases.length}
          subtitle={`Urgent: ${urgentCount}`}
          accent="text-red-500"
          icon={
            <span className="text-[10px] font-bold text-red-500 flex items-center gap-0.5 bg-red-50 px-2 py-0.5 rounded-md">
              ↑ Trend
            </span>
          }
        />
        <MetricCard
          title="Total Verified (Today)"
          value="28"
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-400">
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
            </svg>
          }
        />
        <MetricCard
          title="Average Verification Time"
          value="2.4 min"
          icon={
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400">
              <circle cx="10" cy="10" r="8" />
              <path d="M10 6v4l2.5 1.5" strokeLinecap="round" />
            </svg>
          }
        />
        <MetricCard
          title="Recent Security Alerts"
          value="0"
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-400">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495z" clipRule="evenodd" />
            </svg>
          }
        />
      </div>

      {/* ─── Main Content Split ─── */}
      <div className="grid grid-cols-5 gap-5">
        {/* Left Column: Table + Bottom Row */}
        <div className="col-span-3 space-y-5">
          <CaseReviewQueue
            cases={cases}
            selectedCaseId={selectedCaseId}
            onSelectCase={setSelectedCaseId}
          />

          <div className="grid grid-cols-2 gap-5">
            <RecentSignedReports />
            <PendingCriticalAlerts />
          </div>
        </div>

        {/* Right Column: Case Detail */}
        <div className="col-span-2">
          <SelectedCaseDetail caseData={selectedCase} onSign={signReport} />
        </div>
      </div>
    </div>
  )
}
