import React, { useState } from 'react'
import { useLims } from '../../../context/LimsContext'

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

export default function Header({ onBack }) {
  const { user, logoutUser } = useLims()
  const [showNotifications, setShowNotifications] = useState(false)

  // Compute initials dynamically
  const fullName = user?.fullName || 'Ramesh Iyer'
  const initials = fullName
    ? fullName.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2)
    : 'RI'

  const mockNotifications = [
    { id: 1, text: 'New home visit assigned at 10:00 AM (S. Ghosh)', time: '10m ago' },
    { id: 2, text: 'Cold chain temperature verified for Bag #K-89', time: '1h ago' }
  ]

  return (
    <header
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 sm:px-8 py-4 text-white shrink-0 font-sans gap-4 relative"
      style={{ backgroundColor: '#141416', borderBottom: '1px solid #222226' }}
    >
      {/* Title & Back Button */}
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer border group"
            style={{ backgroundColor: '#202024', borderColor: '#2d2d32' }}
            title="Back to Role Selection"
          >
            <svg className="w-4 h-4 text-sky-400 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Roles</span>
          </button>
        )}
        <div className="text-left">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
            Welcome, {fullName}
          </h1>
          <p className="text-[10px] sm:text-xs font-extrabold tracking-wider uppercase mt-0.5" style={{ color: '#9ca3af' }}>
            PHLEBOTOMIST / SAMPLE COLLECTOR
          </p>
        </div>
      </div>

      {/* Right Tools: Bell + Profile Avatar + Logout */}
      <div className="flex items-center gap-3 self-end sm:self-center">
        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl transition-all cursor-pointer hover:bg-slate-800"
            style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}
            title="Notifications"
          >
            <BellIcon />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#38bdf8' }} />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-2xl z-50 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <span className="font-extrabold text-white">Collector Alerts</span>
                <span className="text-[10px] text-sky-400 font-bold">Live Feed</span>
              </div>
              {mockNotifications.map((n) => (
                <div key={n.id} className="p-2 bg-zinc-800/60 rounded-xl space-y-1">
                  <p className="font-semibold text-gray-200">{n.text}</p>
                  <p className="text-[9px] text-gray-400 font-mono">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm tracking-wider shadow-sm border shrink-0"
          style={{ backgroundColor: '#0c4a6e', borderColor: '#0284c7', color: '#bae6fd' }}
          title={fullName}
        >
          {initials}
        </div>

        {/* Logout Button */}
        {logoutUser && (
          <button
            onClick={logoutUser}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-gray-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  )
}
