import React from 'react'
import { useLims } from '../../../context/LimsContext'
import HeaderUserDropdown from '../../../components/HeaderUserDropdown'

const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

export default function Header({ onBack }) {
  const { setView } = useLims()
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
      <HeaderUserDropdown />
    </header>
  )
}
