import React, { useState, useRef, useEffect } from 'react'
import { useLims } from '../context/LimsContext'

export default function HeaderUserDropdown() {
  const { user, setView, logoutUser } = useLims()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getRoleDisplayName = (r) => {
    switch (r) {
      case 'super-admin': return 'Super Admin'
      case 'lab-manager': return 'Lab Manager'
      case 'pathologist': return 'Pathologist'
      case 'lab-technician': return 'Lab Technician'
      case 'sample-collector': return 'Sample Collector'
      case 'receptionist': return 'Receptionist'
      default: return r || 'User'
    }
  }

  const userName = user?.fullName || 'Jane Smith'
  const userRole = getRoleDisplayName(user?.role || 'lab-manager')
  const userInitials = userName.substring(0, 2).toUpperCase()

  return (
    <div className="flex items-center gap-3 font-sans relative" ref={dropdownRef}>
      {/* Settings Gear Button */}
      <button
        onClick={() => setView('settings')}
        className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        title="Account & System Settings"
        aria-label="Account Settings"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-gray-800 text-white text-xs font-semibold pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-700 transition cursor-pointer shadow-xs"
        aria-label="User Menu"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
          {userInitials}
        </div>
        <span>{userName} ({userRole})</span>
        <svg viewBox="0 0 20 20" fill="currentColor" className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown Menu Modal */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl border border-gray-100 shadow-xl py-2 z-50 animate-fade-in text-left">
          <div className="px-4 py-3 border-b border-gray-100 space-y-0.5">
            <p className="text-xs font-black text-gray-900 truncate">{userName}</p>
            <p className="text-[10px] text-gray-500 truncate">{user?.email || 'user@lims.org'}</p>
            <span className="inline-block mt-1 bg-teal-50 text-teal-800 border border-teal-100 text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase">
              {userRole}
            </span>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false)
                setView('profile')
              }}
              className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-teal-50 hover:text-teal-800 transition flex items-center gap-2.5 cursor-pointer"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>My Profile</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false)
                setView('settings')
              }}
              className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-teal-50 hover:text-teal-800 transition flex items-center gap-2.5 cursor-pointer"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Account Settings</span>
            </button>
          </div>

          <div className="pt-1 border-t border-gray-100">
            <button
              onClick={() => {
                setIsOpen(false)
                logoutUser()
              }}
              className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition flex items-center gap-2.5 cursor-pointer"
            >
              <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
