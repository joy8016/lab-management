import React from 'react'
import { useLims } from '../../../context/LimsContext'

const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const UserCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/90">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5 text-white/90">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5 text-white/90">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

export default function Header({ onBack }) {
  const { user, setView, logoutUser } = useLims()
  const handleBack = onBack || (() => setView('landing'))

  return (
    <header
      className="flex items-center justify-between px-6 py-3 text-white font-sans shrink-0"
      style={{ backgroundColor: '#1a5fb4', borderBottom: '1px solid #14498c' }}
    >
      {/* Left: Back Button & Portal Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
          style={{ backgroundColor: '#14498c', border: '1px solid #236bc7', color: '#ffffff' }}
          title="Back to Landing / Roles"
          aria-label="Back to Roles"
        >
          <BackArrowIcon />
          <span>Back to Roles</span>
        </button>

        <h1 className="text-base font-extrabold tracking-wide uppercase text-white ml-2">
          FRONT DESK / RECEPTIONIST
        </h1>
      </div>

      {/* Right Tools: Profile + Gear + Logout */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition">
          <UserCircleIcon />
          <span className="font-bold text-white">{user?.fullName || 'Sarah Jones'} ⌄</span>
        </div>

        <button className="p-1 hover:opacity-80 transition cursor-pointer" title="Settings">
          <GearIcon />
        </button>

        <button
          onClick={logoutUser}
          className="p-1 hover:opacity-80 transition cursor-pointer"
          title="Logout"
        >
          <LogoutIcon />
        </button>
      </div>
    </header>
  )
}
