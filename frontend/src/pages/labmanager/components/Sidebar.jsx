import React from 'react'

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

const OperationsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

const QualityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const InventoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const StaffingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const ReportsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

const LIMSLogo = () => (
  <div className="flex items-center gap-2.5 px-2 py-1">
    <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100 shrink-0">
      <svg viewBox="0 0 100 100" width="22" height="22" className="text-teal-700">
        <path d="M30 80 L70 80" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        <path d="M50 80 L50 63" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path d="M42 63 L62 63" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path d="M65 80 C71 80 77 74 77 60 C77 47 70 44 58 44" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        <line x1="38" y1="22" x2="52" y2="36" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
      </svg>
    </div>
    <div className="leading-none text-left">
      <div className="text-sm font-black text-gray-900 tracking-tight">LIMS</div>
      <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">organization</div>
    </div>
  </div>
)

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'operations', label: 'Operations Overview', icon: OperationsIcon },
    { id: 'quality', label: 'Quality Control', icon: QualityIcon },
    { id: 'inventory', label: 'Inventory & Purchasing', icon: InventoryIcon },
    { id: 'staffing', label: 'Staffing', icon: StaffingIcon },
    { id: 'reports', label: 'Reports', icon: ReportsIcon },
  ]

  return (
    <aside className="w-52 bg-white border-r border-gray-100 flex flex-col shrink-0 min-h-screen py-5 px-3 font-sans">
      <div className="mb-8 pl-1">
        <LIMSLogo />
      </div>

      <nav className="flex-1 space-y-1" aria-label="Lab Manager Sidebar">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-teal-50/80 text-teal-800 shadow-xs border border-teal-100'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
