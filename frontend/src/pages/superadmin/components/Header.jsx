import React from 'react'

// Header Icons
const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

export default function Header({ onLogout, onBack }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6 border-b border-gray-100 font-sans">
      {/* Title block */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all cursor-pointer border border-gray-200/70 shadow-2xs group shrink-0"
            title="Back to Roles / Landing"
            aria-label="Back to Roles or Landing Page"
          >
            <div className="group-hover:-translate-x-0.5 transition-transform">
              <BackArrowIcon />
            </div>
          </button>
        )}
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">Welcome, Super Admin</h1>
          <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">
            Laboratory Information Management System (LIMS)
          </p>
        </div>
      </div>

      {/* Control Actions toolbar */}
      <div className="flex items-center flex-wrap gap-4 w-full md:w-auto">
        {/* Global Search Bar */}
        <div className="relative w-full md:w-60">
          <input 
            type="text" 
            placeholder="Global Search" 
            className="w-full bg-gray-50/50 border border-gray-100 rounded-xl pl-9.5 pr-4 py-2 text-xs font-medium outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700 placeholder:text-gray-400"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          {/* Chat bubble button */}
          <button 
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50/50 hover:bg-gray-100/50 text-gray-600 transition-colors cursor-pointer border border-gray-50"
            onClick={() => alert("No new messages in the admin inbox.")}
          >
            <ChatIcon />
          </button>

          {/* Bell notification button */}
          <button 
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50/50 hover:bg-gray-100/50 text-gray-600 transition-colors cursor-pointer relative border border-gray-50"
            onClick={() => alert("Notification Feed: 20 pending laboratory approvals need your clearance.")}
          >
            <BellIcon />
            {/* Red alert bubble dot */}
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-white animate-pulse" />
          </button>
        </div>

        {/* Profile drop and Logout button */}
        <div className="flex items-center gap-2 border-l border-gray-100 pl-4">
          <button 
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors text-left cursor-pointer"
            onClick={() => alert("Super Admin profile metrics under audit logs.")}
          >
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs uppercase border border-blue-200">
              SA
            </div>
            <div className="leading-none hidden sm:block">
              <div className="text-xs font-bold text-gray-800">Profile</div>
              <div className="text-[9px] text-gray-400 font-bold mt-0.5 uppercase tracking-wide">Root</div>
            </div>
          </button>

          <button 
            className="text-xs font-semibold text-gray-500 hover:text-red-600 px-3 py-1.5 rounded-xl hover:bg-red-50 transition-all cursor-pointer border border-transparent"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
