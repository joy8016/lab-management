import React from 'react'
import { useLims } from '../../../context/LimsContext'

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

export default function Header() {
  const { user } = useLims()
  
  return (
    <header
      className="flex items-center justify-between px-8 py-5 text-white shrink-0 font-sans"
      style={{ backgroundColor: '#141416', borderBottom: '1px solid #222226' }}
    >
      {/* Welcome Title */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white">
          Welcome, {user?.fullName || 'Ramesh Iyer'}
        </h1>
        <p className="text-xs font-extrabold tracking-wider uppercase mt-0.5" style={{ color: '#9ca3af' }}>
          PHLEBOTOMIST / SAMPLE COLLECTOR
        </p>
      </div>

      {/* Right Tools: Bell + Avatar */}
      <div className="flex items-center gap-4">
        <button
          className="relative p-2 rounded-xl transition-all cursor-pointer"
          style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}
          title="Notifications"
        >
          <BellIcon />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: '#38bdf8' }} />
        </button>

        {/* RI Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm tracking-wider shadow-sm"
          style={{ backgroundColor: '#0c4a6e', border: '1px solid #0284c7', color: '#bae6fd' }}
        >
          RI
        </div>
      </div>
    </header>
  )
}
