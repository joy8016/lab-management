import React from 'react'

// Home visit icon
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 inline mr-1.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

// In-lab icon
const LabIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 inline mr-1.5">
    <path d="M3 21h18" />
    <path d="M9 8h1" />
    <path d="M9 12h1" />
    <path d="M9 16h1" />
    <path d="M14 8h1" />
    <path d="M14 12h1" />
    <path d="M14 16h1" />
    <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
  </svg>
)

// Scan barcode icon for quick actions
const BarcodeActionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 shrink-0">
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <line x1="7" y1="8" x2="7" y2="16" />
    <line x1="10" y1="8" x2="10" y2="16" />
    <line x1="14" y1="8" x2="14" y2="16" />
    <line x1="17" y1="8" x2="17" y2="16" />
  </svg>
)

// Heartbeat vitals icon for quick actions
const HeartActionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 shrink-0">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

// Clock log time icon for quick actions
const ClockActionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 shrink-0">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-x-1">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function Dashboard({ setActiveTab }) {
  const stats = [
    { label: "TODAY'S VISITS", value: '14', color: '#ffffff' },
    { label: 'COMPLETED', value: '9', color: '#22c55e' },
    { label: 'PENDING PICKUP', value: '5', color: '#f59e0b' },
    { label: 'UNLINKED BARCODES', value: '2', color: '#ef4444' },
  ]

  const scheduleData = [
    { time: '08:30 AM', patient: 'A. Sharma', type: 'Home visit', isHome: true, barcode: 'BC-10234', status: 'Collected', statusType: 'success' },
    { time: '09:15 AM', patient: 'P. Nair', type: 'In-lab', isHome: false, barcode: 'BC-10235', status: 'Collected', statusType: 'success' },
    { time: '10:00 AM', patient: 'S. Ghosh', type: 'Home visit', isHome: true, barcode: 'Not linked', status: 'In progress', statusType: 'amber' },
    { time: '11:30 AM', patient: 'R. Banerjee', type: 'In-lab', isHome: false, barcode: 'BC-10237', status: 'Scheduled', statusType: 'gray' },
    { time: '01:00 PM', patient: 'M. Das', type: 'Home visit', isHome: true, barcode: 'BC-10238', status: 'Scheduled', statusType: 'gray' },
  ]

  return (
    <div
      className="flex-1 overflow-y-auto p-8 space-y-7 font-sans"
      style={{ backgroundColor: '#141416', color: '#ffffff' }}
    >
      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-5 space-y-2 shadow-sm"
            style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}
          >
            <p className="text-[11px] font-extrabold tracking-wider uppercase" style={{ color: '#9ca3af' }}>
              {stat.label}
            </p>
            <p className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Today's collection schedule Table Card */}
      <div
        className="rounded-2xl p-6 space-y-5 shadow-sm"
        style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}
      >
        <h3 className="text-lg font-bold text-white tracking-tight">
          Today's collection schedule
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid #2d2d32' }}>
                <th className="py-3 px-3 text-xs font-extrabold uppercase tracking-wider" style={{ color: '#9ca3af' }}>TIME</th>
                <th className="py-3 px-3 text-xs font-extrabold uppercase tracking-wider" style={{ color: '#9ca3af' }}>PATIENT</th>
                <th className="py-3 px-3 text-xs font-extrabold uppercase tracking-wider" style={{ color: '#9ca3af' }}>TYPE</th>
                <th className="py-3 px-3 text-xs font-extrabold uppercase tracking-wider" style={{ color: '#9ca3af' }}>BARCODE</th>
                <th className="py-3 px-3 text-xs font-extrabold uppercase tracking-wider" style={{ color: '#9ca3af' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((row, idx) => (
                <tr
                  key={idx}
                  className="transition-colors hover:bg-[#25252a]"
                  style={{ borderBottom: '1px solid #2a2a30' }}
                >
                  <td className="py-4 px-3 font-extrabold text-white text-sm whitespace-nowrap">
                    {row.time}
                  </td>
                  <td className="py-4 px-3 font-extrabold text-white text-sm whitespace-nowrap">
                    {row.patient}
                  </td>
                  <td className="py-4 px-3 font-bold text-sm whitespace-nowrap" style={{ color: '#e5e7eb' }}>
                    {row.isHome ? <HomeIcon /> : <LabIcon />}
                    {row.type}
                  </td>
                  <td className="py-4 px-3 font-extrabold text-sm whitespace-nowrap" style={{ color: '#e5e7eb' }}>
                    {row.barcode}
                  </td>
                  <td className="py-4 px-3 whitespace-nowrap">
                    {row.statusType === 'success' && (
                      <span
                        className="inline-flex px-3 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: 'rgba(20, 83, 45, 0.8)', color: '#22c55e', border: '1px solid rgba(21, 128, 61, 0.5)' }}
                      >
                        {row.status}
                      </span>
                    )}
                    {row.statusType === 'amber' && (
                      <span
                        className="inline-flex px-3 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: 'rgba(69, 26, 3, 0.8)', color: '#f59e0b', border: '1px solid rgba(180, 83, 9, 0.5)' }}
                      >
                        {row.status}
                      </span>
                    )}
                    {row.statusType === 'gray' && (
                      <span
                        className="inline-flex px-3 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: '#333338', color: '#d1d5db', border: '1px solid #44444a' }}
                      >
                        {row.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="space-y-3">
        <p className="text-xs font-extrabold tracking-wider uppercase" style={{ color: '#9ca3af' }}>
          QUICK ACTIONS
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Scan Barcode */}
          <div
            onClick={() => setActiveTab && setActiveTab('barcode')}
            className="rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all group shadow-sm hover:bg-[#26262c]"
            style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl" style={{ backgroundColor: 'rgba(12, 74, 110, 0.4)', border: '1px solid rgba(7, 89, 133, 0.4)' }}>
                <BarcodeActionIcon />
              </div>
              <div>
                <h4 className="text-base font-black text-white leading-tight">
                  Scan barcode
                </h4>
                <p className="text-xs font-semibold mt-0.5" style={{ color: '#9ca3af' }}>
                  Link sample to patient
                </p>
              </div>
            </div>
            <ArrowRightIcon />
          </div>

          {/* Card 2: Record Vitals */}
          <div
            onClick={() => setActiveTab && setActiveTab('vitals')}
            className="rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all group shadow-sm hover:bg-[#26262c]"
            style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl" style={{ backgroundColor: 'rgba(136, 19, 55, 0.4)', border: '1px solid rgba(159, 18, 57, 0.4)' }}>
                <HeartActionIcon />
              </div>
              <div>
                <h4 className="text-base font-black text-white leading-tight">
                  Record vitals
                </h4>
                <p className="text-xs font-semibold mt-0.5" style={{ color: '#9ca3af' }}>
                  BP, pulse, temperature
                </p>
              </div>
            </div>
            <ArrowRightIcon />
          </div>

          {/* Card 3: Log Collection Time */}
          <div
            onClick={() => setActiveTab && setActiveTab('schedule')}
            className="rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all group shadow-sm hover:bg-[#26262c]"
            style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl" style={{ backgroundColor: 'rgba(20, 83, 45, 0.4)', border: '1px solid rgba(22, 101, 52, 0.4)' }}>
                <ClockActionIcon />
              </div>
              <div>
                <h4 className="text-base font-black text-white leading-tight">
                  Log collection time
                </h4>
                <p className="text-xs font-semibold mt-0.5" style={{ color: '#9ca3af' }}>
                  Update sample status
                </p>
              </div>
            </div>
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
