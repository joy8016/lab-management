import React from 'react'

// Sidebar SVG Icons
const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
)

const OrganizationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="9" y1="22" x2="9" y2="16" />
    <line x1="15" y1="22" x2="15" y2="16" />
    <line x1="9" y1="16" x2="15" y2="16" />
    <path d="M8 6h2v2H8V6z" />
    <path d="M14 6h2v2h-2V6z" />
    <path d="M8 11h2v2H8v-2z" />
    <path d="M14 11h2v2h-2v-2z" />
  </svg>
)

const UserManagementIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const RolesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <rect x="9" y="11" width="6" height="4" rx="1" />
  </svg>
)

const CatalogIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

const PricingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

const ReferenceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

const LogsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="12" y2="13" />
    <line x1="8" y1="17" x2="12" y2="17" />
  </svg>
)

const LIMSLogo = () => (
  <div className="flex items-center gap-2.5 px-2 py-1">
    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
      <svg viewBox="0 0 100 100" width="22" height="22" className="text-blue-700">
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
    { id: 'branches', label: 'Organization & Branches', icon: OrganizationIcon },
    { id: 'users', label: 'User Management', icon: UserManagementIcon },
    { id: 'roles', label: 'Roles & Permissions', icon: RolesIcon },
    { id: 'catalog', label: 'Test Catalog', icon: CatalogIcon },
    { id: 'pricing', label: 'Pricing & Billing', icon: PricingIcon },
    { id: 'ranges', label: 'Reference Ranges', icon: ReferenceIcon },
    { id: 'logs', label: 'Audit Logs', icon: LogsIcon },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 min-h-screen py-5 px-4 font-sans">
      {/* Sidebar Header - Logo */}
      <div className="mb-8 pl-1">
        <LIMSLogo />
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1" aria-label="Sidebar Navigation">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-50/70 text-blue-700 shadow-xs'
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
