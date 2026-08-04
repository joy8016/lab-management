import React, { useState, useEffect } from 'react'

export default function ReportStatus() {
  const defaultReports = [
    { id: 1, patient: 'Jane Smith', phone: '+1 555-0184', test: 'CBC + Diff', time: '12:50 AM', status: 'Ready', notifySent: true, amount: 30.0 },
    { id: 2, patient: 'John Doe', phone: '+1 555-0192', test: 'Lipid Profile', time: '03:30 AM', status: 'Ready', notifySent: false, amount: 45.0 },
    { id: 3, patient: 'Arthur Pendragon', phone: '+1 555-0901', test: 'Liver Function', time: 'Pending', status: 'In Processing', notifySent: false, amount: 50.0 },
  ]

  const [reports, setReports] = useState(defaultReports)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // Modals & Toast State
  const [toastMessage, setToastMessage] = useState('')
  const [notifyModalItem, setNotifyModalItem] = useState(null)
  const [receiptModalItem, setReceiptModalItem] = useState(null)

  // Sync with localStorage registered patients if any
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lims_registered_patients')
      if (saved) {
        const parsed = JSON.parse(saved)
        const customReports = parsed.map((p, idx) => ({
          id: Date.now() + idx,
          patient: p.name,
          phone: p.phone || '+1 555-0000',
          test: 'General Diagnostic Panel',
          time: p.time || '10:00 AM',
          status: 'Ready',
          notifySent: false,
          amount: 35.0
        }))
        const existingNames = new Set(defaultReports.map(r => r.patient))
        const newOnly = customReports.filter(cr => !existingNames.has(cr.patient))
        setReports([...defaultReports, ...newOnly])
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 4000)
  }

  // Dispatch Notification Handler
  const handleSendNotification = (item) => {
    setReports(prev =>
      prev.map(r => r.id === item.id ? { ...r, notifySent: true } : r)
    )
    showToast(`SMS and Email notification sent successfully to ${item.patient}!`)
    setNotifyModalItem(null)
  }

  // Bulk Notification Handler
  const handleBulkNotify = () => {
    setReports(prev =>
      prev.map(r => r.status === 'Ready' ? { ...r, notifySent: true } : r)
    )
    showToast('SMS/Email ready notifications sent to all completed patient reports!')
  }

  // Filter Logic
  const filteredReports = reports.filter(r => {
    const matchesSearch =
      r.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.test.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'All' || r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans text-left" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
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

      {/* Title & Top Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Report Status &amp; Patient Notifications</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">Track ready reports, send SMS/Email notifications, and print receipts</p>
        </div>
        <button
          onClick={handleBulkNotify}
          className="bg-[#1a5fb4] hover:bg-[#14498c] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs cursor-pointer shrink-0"
        >
          📲 Send All Ready Notifications
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs shadow-2xs">
        <div>
          <input
            type="text"
            placeholder="Search Patient Name or Test Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold outline-none focus:border-[#1a5fb4]"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold outline-none cursor-pointer"
          >
            <option value="All">Filter Status: All Reports</option>
            <option value="Ready">Report Ready Only</option>
            <option value="In Processing">In Processing Only</option>
          </select>
        </div>
      </div>

      {/* Main Diagnostic Reports Log */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Diagnostic Reports Log
          </h3>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
            {filteredReports.length} Records Found
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <th className="p-3">Patient Name</th>
                <th className="p-3">Test Name</th>
                <th className="p-3">Ready Time</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-slate-400 font-bold">
                    No diagnostic reports match the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredReports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">
                      <div>
                        <span>{r.patient}</span>
                        {r.notifySent && (
                          <span className="ml-2 text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                            Sent ✓
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-slate-600">{r.test}</td>
                    <td className="p-3 text-slate-600">{r.time}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        r.status === 'Ready' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => setNotifyModalItem(r)}
                        className="px-3 py-1.5 bg-[#1a5fb4] text-white text-xs font-bold rounded hover:bg-[#14498c] transition cursor-pointer"
                      >
                        Notify Patient (SMS/EMAIL)
                      </button>
                      <button
                        onClick={() => setReceiptModalItem(r)}
                        className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded hover:bg-slate-300 transition cursor-pointer"
                      >
                        Print Receipt
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: DISPATCH NOTIFICATION MODAL */}
      {notifyModalItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-left">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col font-sans">
            <div className="p-5 bg-[#1a5fb4] text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-200">Patient Clearance Dispatch</span>
                <h3 className="text-base font-black tracking-tight">Notify Patient: {notifyModalItem.patient}</h3>
              </div>
              <button onClick={() => setNotifyModalItem(null)} className="text-white font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl space-y-1">
                <p className="font-bold text-slate-900">Destination Contact</p>
                <p className="text-slate-600 font-medium">Phone: {notifyModalItem.phone} • Email: patient@lims.org</p>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Automated SMS Message Preview</label>
                <textarea
                  readOnly
                  rows="3"
                  value={`Dear ${notifyModalItem.patient}, your laboratory diagnostic report for ${notifyModalItem.test} is now READY. Please visit the clinic or download online.`}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-700 outline-none font-medium"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setNotifyModalItem(null)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSendNotification(notifyModalItem)}
                  className="px-5 py-2 font-bold text-white bg-[#1a5fb4] hover:bg-[#14498c] rounded-lg shadow-xs cursor-pointer"
                >
                  Send SMS &amp; Email Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINT RECEIPT PREVIEW MODAL */}
      {receiptModalItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-left">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col font-sans">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="text-sm font-black">Diagnostic Receipt &amp; Report Clearance</h3>
              <button onClick={() => setReceiptModalItem(null)} className="text-white font-bold">✕</button>
            </div>

            <div className="p-5 space-y-4 text-xs font-sans">
              <div className="border-b border-slate-100 pb-2">
                <p className="font-bold text-slate-900 text-base">{receiptModalItem.patient}</p>
                <p className="text-[10px] text-slate-500 font-mono">Invoice #: INV-2026-{(receiptModalItem.id % 1000).toString().padStart(3, '0')}</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Test Ordered: {receiptModalItem.test}</p>
              </div>

              <div className="space-y-1 font-bold text-slate-700">
                <div className="flex justify-between"><span>Diagnostic Service Fee</span><span>${receiptModalItem.amount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax (0%)</span><span>$0.00</span></div>
                <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
                  <span>Paid Total</span>
                  <span className="text-[#1a5fb4]">${receiptModalItem.amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[10px] font-bold text-emerald-800 text-center">
                Payment Settled &amp; Verified • Report Delivered
              </div>

              <button
                onClick={() => {
                  setReceiptModalItem(null)
                  showToast(`Receipt printed successfully for ${receiptModalItem.patient}!`)
                }}
                className="w-full py-2.5 bg-[#1a5fb4] hover:bg-[#14498c] text-white text-xs font-bold rounded-lg transition cursor-pointer"
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
