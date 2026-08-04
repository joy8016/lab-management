import React, { useState } from 'react'

export default function MySchedule() {
  const initialSchedule = [
    {
      id: 1,
      time: '08:30 AM',
      patient: 'A. Sharma',
      phone: '+1 (555) 192-8374',
      address: '42 Park Street, Flat 3B',
      type: 'Home visit',
      tests: 'CBC, Lipid Profile',
      tubes: ['Purple Top (EDTA 2ml)', 'Red Top (Plain 2ml)'],
      status: 'Collected',
      notes: 'Patient requested morning visit prior to breakfast fasting.'
    },
    {
      id: 2,
      time: '09:15 AM',
      patient: 'P. Nair',
      phone: '+1 (555) 283-9102',
      address: 'Main Lab Desk 2',
      type: 'In-lab',
      tests: 'HbA1c, Thyroid',
      tubes: ['Purple Top (EDTA 2ml)', 'Yellow Top (SST 3ml)'],
      status: 'Collected',
      notes: 'Walk-in appointment verified at front desk.'
    },
    {
      id: 3,
      time: '10:00 AM',
      patient: 'S. Ghosh',
      phone: '+1 (555) 394-0192',
      address: '18 Lake Road, Sector 5',
      type: 'Home visit',
      tests: 'Liver Function Test',
      tubes: ['Red Top (Plain 3ml)'],
      status: 'In progress',
      notes: 'Phlebotomist en route to patient location.'
    },
    {
      id: 4,
      time: '11:30 AM',
      patient: 'R. Banerjee',
      phone: '+1 (555) 401-9283',
      address: 'Main Lab Desk 1',
      type: 'In-lab',
      tests: 'Renal Panel',
      tubes: ['Red Top (Plain 2ml)'],
      status: 'Scheduled',
      notes: 'Patient scheduled for mid-day draw.'
    },
    {
      id: 5,
      time: '01:00 PM',
      patient: 'M. Das',
      phone: '+1 (555) 512-0394',
      address: '77 Salt Lake, Block B',
      type: 'Home visit',
      tests: 'Vitamin D, B12',
      tubes: ['Yellow Top (SST 2ml)'],
      status: 'Scheduled',
      notes: 'Protect serum sample from light after draw.'
    }
  ]

  const [schedule, setSchedule] = useState(initialSchedule)

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  // Toast & Modal State
  const [toastMessage, setToastMessage] = useState('')
  const [selectedVisit, setSelectedVisit] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 4000)
  }

  // Refresh Visits Handler
  const handleRefreshVisits = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      showToast('Schedule synchronized! 5 phlebotomy appointments updated.')
    }, 600)
  }

  // Update Visit Status
  const handleUpdateStatus = (visitId, newStatus) => {
    setSchedule(prev =>
      prev.map(item => item.id === visitId ? { ...item, status: newStatus } : item)
    )
    const target = schedule.find(item => item.id === visitId)
    showToast(`Visit for ${target?.patient} status updated to: ${newStatus}`)
    if (selectedVisit && selectedVisit.id === visitId) {
      setSelectedVisit({ ...selectedVisit, status: newStatus })
    }
  }

  // Filter Logic
  const filteredSchedule = schedule.filter(item => {
    const matchesSearch =
      item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tests.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === 'All' || item.type === typeFilter
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 font-sans text-left" style={{ backgroundColor: '#141416', color: '#ffffff' }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-sky-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center justify-between animate-fade-in transition-all text-xs font-bold">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">My Schedule</h2>
          <p className="text-xs font-semibold mt-1" style={{ color: '#9ca3af' }}>Today's assigned phlebotomy visits and lab appointments</p>
        </div>
        <button
          onClick={handleRefreshVisits}
          disabled={isRefreshing}
          className="px-4 py-2.5 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer shrink-0 flex items-center gap-2"
          style={{ backgroundColor: '#0284c7' }}
        >
          <svg className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isRefreshing ? 'Syncing...' : 'Refresh Visits'}
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
        <div>
          <input
            type="text"
            placeholder="Search Patient, Address, Tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-sky-500 text-white"
            style={{ backgroundColor: '#141416', border: '1px solid #2d2d32' }}
          />
        </div>
        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer text-white"
            style={{ backgroundColor: '#141416', border: '1px solid #2d2d32' }}
          >
            <option value="All">Visit Type: All</option>
            <option value="Home visit">Home Visit Only</option>
            <option value="In-lab">In-Lab Only</option>
          </select>
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer text-white"
            style={{ backgroundColor: '#141416', border: '1px solid #2d2d32' }}
          >
            <option value="All">Status: All</option>
            <option value="Collected">Collected Only</option>
            <option value="In progress">In Progress Only</option>
            <option value="Scheduled">Scheduled Only</option>
          </select>
        </div>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-4">
        {filteredSchedule.length === 0 ? (
          <div className="p-8 text-center rounded-2xl" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32', color: '#9ca3af' }}>
            No phlebotomy visits match the selected filter criteria.
          </div>
        ) : (
          filteredSchedule.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-sky-500/50 transition-all"
              style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="text-sm font-black px-3 py-1 rounded-lg"
                    style={{ backgroundColor: 'rgba(12, 74, 110, 0.6)', color: '#38bdf8', border: '1px solid rgba(7, 89, 133, 0.4)' }}
                  >
                    {item.time}
                  </span>
                  <h3 className="text-base font-extrabold text-white">{item.patient}</h3>
                  <span className="text-xs font-bold" style={{ color: '#9ca3af' }}>({item.type})</span>
                </div>
                <p className="text-xs font-semibold" style={{ color: '#d1d5db' }}>{item.address}</p>
                <p className="text-xs font-medium" style={{ color: '#9ca3af' }}>Tests Requested: <span className="text-white font-bold">{item.tests}</span></p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={
                    item.status === 'Collected'
                      ? { backgroundColor: 'rgba(20, 83, 45, 0.8)', color: '#22c55e', border: '1px solid rgba(21, 128, 61, 0.5)' }
                      : item.status === 'In progress'
                      ? { backgroundColor: 'rgba(69, 26, 3, 0.8)', color: '#f59e0b', border: '1px solid rgba(180, 83, 9, 0.5)' }
                      : { backgroundColor: '#333338', color: '#d1d5db', border: '1px solid #44444a' }
                  }
                >
                  {item.status}
                </span>
                <button
                  onClick={() => setSelectedVisit(item)}
                  className="px-3.5 py-1.5 text-white rounded-xl text-xs font-bold transition cursor-pointer hover:bg-slate-700"
                  style={{ backgroundColor: '#2a2a30', border: '1px solid #383840' }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* VISIT DETAILS MODAL */}
      {selectedVisit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-left">
          <div
            className="w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col font-sans"
            style={{ backgroundColor: '#1c1c20', border: '1px solid #2d2d32', color: '#ffffff' }}
          >
            <div className="p-5 flex justify-between items-center" style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b' }}>
              <div>
                <span className="text-[10px] font-black uppercase text-sky-400">Phlebotomy Visit Specs</span>
                <h3 className="text-lg font-black tracking-tight text-white">{selectedVisit.patient} ({selectedVisit.time})</h3>
              </div>
              <button onClick={() => setSelectedVisit(null)} className="text-white text-sm font-bold cursor-pointer">✕</button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl space-y-1.5" style={{ backgroundColor: '#141416', border: '1px solid #292930' }}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Visit Type</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                    {selectedVisit.type}
                  </span>
                </div>
                <p className="text-gray-300 font-medium">📍 Address: {selectedVisit.address}</p>
                <p className="text-gray-300 font-medium">📞 Contact: {selectedVisit.phone}</p>
              </div>

              <div className="space-y-1">
                <p className="font-black uppercase text-gray-400 text-[10px]">Tests Requested &amp; Container Tubes</p>
                <div className="p-3 rounded-xl space-y-2" style={{ backgroundColor: '#141416', border: '1px solid #292930' }}>
                  <p className="font-extrabold text-white text-sm">{selectedVisit.tests}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedVisit.tubes.map((tube, idx) => (
                      <span key={idx} className="bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        🧪 {tube}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {selectedVisit.notes && (
                <div className="p-3 rounded-xl text-gray-300 font-medium" style={{ backgroundColor: '#141416', border: '1px solid #292930' }}>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Collector Notes</span>
                  {selectedVisit.notes}
                </div>
              )}

              {/* Status Update Controllers */}
              <div className="pt-2 border-t border-gray-800 space-y-2">
                <p className="font-black uppercase text-gray-400 text-[10px]">Update Visit Status</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedVisit.id, 'Scheduled')}
                    className={`py-2 rounded-xl text-xs font-bold cursor-pointer border ${
                      selectedVisit.status === 'Scheduled'
                        ? 'bg-slate-700 text-white border-slate-500'
                        : 'bg-slate-900 text-gray-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    Scheduled
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedVisit.id, 'In progress')}
                    className={`py-2 rounded-xl text-xs font-bold cursor-pointer border ${
                      selectedVisit.status === 'In progress'
                        ? 'bg-amber-900/80 text-amber-300 border-amber-600'
                        : 'bg-slate-900 text-gray-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedVisit.id, 'Collected')}
                    className={`py-2 rounded-xl text-xs font-bold cursor-pointer border ${
                      selectedVisit.status === 'Collected'
                        ? 'bg-emerald-900/80 text-emerald-300 border-emerald-600'
                        : 'bg-slate-900 text-gray-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    Collected ✓
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedVisit(null)}
                  className="px-5 py-2 text-xs font-bold text-white rounded-xl bg-slate-800 hover:bg-slate-700 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
