import React from 'react'

// Sidebar Navigation Icons
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const QueueIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
)

const TestIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
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
    { id: 'home', label: 'Pathology Home', icon: HomeIcon },
    { id: 'queue', label: 'Case Review Queue', icon: QueueIcon },
    { id: 'validation', label: 'Test Results Validation', icon: TestIcon },
    { id: 'interpretations', label: 'Add Interpretations', icon: EditIcon },
    { id: 'history', label: 'Audit History', icon: HistoryIcon },
    { id: 'profile', label: 'Profile', icon: ProfileIcon },
  ]

  return (
    <aside className="w-56 bg-white border-r border-gray-100 flex flex-col shrink-0 min-h-screen py-5 px-3 font-sans">
      <div className="mb-8 pl-1">
        <LIMSLogo />
      </div>

      <nav className="flex-1 space-y-1" aria-label="Pathologist Sidebar">
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
