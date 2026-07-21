import React from 'react'
import { useLims } from '../../../context/LimsContext'

const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const FlaskIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M10 2v7.5L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9.5V2" />
    <path d="M8.5 2h7" />
    <path d="M7 16h10" />
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

export default function Header({ onBack }) {
  const { user, setView } = useLims()
  const handleBack = onBack || (() => setView('landing'))

  return (
    <header
      className="text-white px-5 py-2.5 flex items-center justify-between font-sans shrink-0"
      style={{ backgroundColor: '#244b7a', borderBottom: '1px solid #1c3c64' }}
    >
      {/* Left: Back Arrow + Branding */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-white hover:opacity-80 transition-all cursor-pointer border border-white/20"
          style={{ backgroundColor: '#1c3c64' }}
          title="Back to Roles / Landing"
          aria-label="Back to Roles"
        >
          <BackArrowIcon />
        </button>
        
        <div className="flex items-center gap-2 ml-1">
          <FlaskIcon />
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-sm tracking-wide">MediLab</span>
            <span className="text-xs font-semibold opacity-70">Systems</span>
          </div>
        </div>

        <span className="h-6 w-px bg-white/20 mx-2" />
        <span className="text-sm font-extrabold tracking-wider opacity-90">LIS</span>
      </div>

      {/* Right: User status & Tools */}
      <div className="flex items-center gap-5">
        <div className="text-xs opacity-80 font-medium hidden md:block">
          Logged in: <span className="font-bold opacity-100">{user ? user.fullName : 'Sarah J.'} (Lab Technician)</span>
        </div>

        <button className="relative hover:opacity-80 transition cursor-pointer p-1">
          <ChatIcon />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-sky-400" />
        </button>

        <button className="relative hover:opacity-80 transition cursor-pointer p-1">
          <BellIcon />
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
            1
          </span>
        </button>

        <div className="relative w-40 md:w-48">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded pl-7 pr-3 py-1 text-xs text-white outline-none border border-white/20"
            style={{ backgroundColor: '#1b3d68' }}
          />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-60">
            <SearchIcon />
          </div>
        </div>
      </div>
    </header>
  )
}
