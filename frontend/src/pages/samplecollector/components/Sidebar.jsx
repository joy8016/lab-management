import React from 'react'

// Water droplet logo icon
const WaterDropIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
)

const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
)

const ScheduleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const BarcodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
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

const VitalsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export default function Sidebar({ activeTab, setActiveTab, onBack }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'schedule', label: 'My schedule', icon: ScheduleIcon },
    { id: 'barcode', label: 'Barcode linking', icon: BarcodeIcon },
    { id: 'vitals', label: 'Vitals entry', icon: VitalsIcon },
    { id: 'history', label: 'Collection history', icon: HistoryIcon },
    { id: 'profile', label: 'My profile', icon: ProfileIcon },
  ]

  return (
    <aside
      className="w-64 flex flex-col shrink-0 font-sans min-h-[calc(100vh-80px)] select-none p-5"
      style={{ backgroundColor: '#141416', borderRight: '1px solid #222226', color: '#a1a1aa' }}
    >
      {/* Back Arrow button to Roles */}
      <button
        onClick={onBack}
        className="flex items-center gap-2.5 px-3 py-2 mb-6 rounded-xl transition-all cursor-pointer text-xs font-bold w-fit"
        style={{ backgroundColor: '#202024', border: '1px solid #2d2d32', color: '#e5e7eb' }}
        title="Back to Roles Selection"
      >
        <BackArrowIcon />
        <span>Back to Roles</span>
      </button>

      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <WaterDropIcon />
        <div>
          <h2 className="text-lg font-black text-white tracking-wider leading-none">LIMS</h2>
          <p className="text-[9px] font-extrabold tracking-widest uppercase mt-0.5" style={{ color: '#9ca3af' }}>
            SAMPLE COLLECTOR
          </p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer"
              style={
                isActive
                  ? { backgroundColor: '#0f3854', color: '#38bdf8', border: '1px solid rgba(2, 132, 199, 0.4)' }
                  : { backgroundColor: 'transparent', color: '#d1d5db' }
              }
            >
              <span style={{ color: isActive ? '#38bdf8' : '#9ca3af' }}>
                <Icon />
              </span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
