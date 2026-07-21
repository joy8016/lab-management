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
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shrink-0 font-sans">
      {/* Left: Welcome & Back Button */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all cursor-pointer border border-gray-200/70 shadow-2xs group shrink-0"
          title="Back to Landing / Roles"
          aria-label="Back to Landing / Roles"
        >
          <div className="group-hover:-translate-x-0.5 transition-transform">
            <BackArrowIcon />
          </div>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            Welcome, {user ? user.fullName : 'Dr. Sarah Jenkins'}
          </h1>
          <p className="text-sm text-gray-500 font-medium">Pathologist Dashboard</p>
        </div>
      </div>

      {/* Right: Badges & Actions */}
      <div className="flex items-center gap-5">
        {/* Alerts */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-amber-600">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Pending Review Cases: <span className="font-black text-amber-700">14</span>
          </span>
          <span className="flex items-center gap-1.5 text-red-500">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
            </svg>
            Urgent Flags: <span className="font-black text-red-600">2</span>
          </span>
        </div>

        {/* Separator */}
        <div className="w-px h-7 bg-gray-200" />

        {/* Notification Bell */}
        <button className="relative text-gray-500 hover:text-gray-800 transition">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <button
          onClick={logoutUser}
          className="flex items-center gap-2 bg-gray-800 text-white text-xs font-semibold pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-700 transition cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-300 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white">
            {user ? user.fullName.substring(0, 2).toUpperCase() : 'SC'}
          </div>
          Logout
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </header>
  )
}
