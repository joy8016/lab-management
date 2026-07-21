import React from 'react'
import { useLims } from '../../../context/LimsContext'

const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

export default function Header({ onBack }) {
  const { user, setView, logoutUser } = useLims()
  const handleBack = onBack || (() => setView('landing'))

  return (
    <header className="flex items-center justify-between px-8 py-3 bg-white border-b border-gray-100 shrink-0 font-sans">
      {/* Left: Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 text-xs font-bold transition-all cursor-pointer border border-gray-200/70 shadow-2xs group"
          title="Back to Landing / Roles"
          aria-label="Back to Landing / Roles"
        >
          <div className="group-hover:-translate-x-0.5 transition-transform">
            <BackArrowIcon />
          </div>
          <span>Back to Roles</span>
        </button>
      </div>

      {/* Right: Profile & Settings */}
      <div className="flex items-center gap-4">
        {/* Settings Gear */}
        <button className="text-gray-400 hover:text-gray-700 transition cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>

        {/* Profile */}
        <button
          onClick={logoutUser}
          className="flex items-center gap-2.5 bg-gray-800 text-white text-xs font-semibold pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-700 transition cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white">
            {user ? user.fullName.substring(0, 2).toUpperCase() : 'SC'}
          </div>
          {user ? `${user.fullName} (${user.role})` : 'Sarah Chen (Lab Manager)'}
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </header>
  )
}
