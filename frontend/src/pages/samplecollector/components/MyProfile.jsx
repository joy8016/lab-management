import React, { useState } from 'react'
import { useLims } from '../../../context/LimsContext'

export default function MyProfile() {
  const { user } = useLims()

  // Compute initials dynamically
  const fullName = user?.fullName || 'Ramesh Iyer'
  const initials = fullName
    ? fullName.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2)
    : 'RI'

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || 'Ramesh Iyer',
    email: user?.email || 'ramesh.iyer@lims.org',
    phone: '+1 (555) 234-5678',
    employeeId: 'EMP-9082',
    certification: 'Certified Phlebotomist (CPT-I)',
    shift: 'Morning (07:30 AM - 03:30 PM)',
    location: 'Metropolis HQ & Central District'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 4000)
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setIsEditing(false)
    showToast('Profile credentials updated successfully!')
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-7 font-sans text-left" style={{ backgroundColor: '#141416', color: '#ffffff' }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-sky-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center justify-between animate-fade-in transition-all text-xs font-bold">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">My Profile</h2>
          <p className="text-xs font-semibold mt-1" style={{ color: '#9ca3af' }}>
            Phlebotomist identity, certification details, and assigned shift route
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer shrink-0 border"
          style={{ backgroundColor: '#202024', borderColor: '#2d2d32' }}
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile Credentials'}
        </button>
      </div>

      {/* Main Profile Info Banner */}
      <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl tracking-wider shadow-md shrink-0 border"
          style={{ backgroundColor: '#0c4a6e', borderColor: '#0284c7', color: '#bae6fd' }}
        >
          {initials}
        </div>
        <div className="space-y-1 text-center md:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <h3 className="text-xl font-extrabold text-white">{profileData.fullName}</h3>
            <span className="text-[10px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-full uppercase">
              Active Duty
            </span>
          </div>
          <p className="text-xs font-bold" style={{ color: '#38bdf8' }}>{profileData.certification}</p>
          <p className="text-xs" style={{ color: '#9ca3af' }}>
            Employee ID: <span className="font-mono font-bold text-white">{profileData.employeeId}</span> | Shift: <span className="text-gray-200 font-bold">{profileData.shift}</span>
          </p>
          <p className="text-xs text-gray-400 font-medium">
            Email: <span className="text-sky-300 font-semibold">{profileData.email}</span> • Route: <span className="text-gray-300 font-semibold">{profileData.location}</span>
          </p>
        </div>
      </div>

      {/* Edit Form or Information Display */}
      {isEditing ? (
        <form onSubmit={handleSaveProfile} className="rounded-2xl p-6 space-y-4 text-xs" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
          <h4 className="text-sm font-bold uppercase tracking-wider text-sky-400">Edit Logged-In Collector Credentials</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                className="w-full rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-sky-500"
                style={{ backgroundColor: '#141416', border: '1px solid #2d2d32' }}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Email Address</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-sky-500"
                style={{ backgroundColor: '#141416', border: '1px solid #2d2d32' }}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Contact Phone</label>
              <input
                type="text"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-sky-500"
                style={{ backgroundColor: '#141416', border: '1px solid #2d2d32' }}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Certification Title</label>
              <input
                type="text"
                value={profileData.certification}
                onChange={(e) => setProfileData({ ...profileData, certification: e.target.value })}
                className="w-full rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-sky-500"
                style={{ backgroundColor: '#141416', border: '1px solid #2d2d32' }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-800">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 font-bold text-gray-300 rounded-xl bg-slate-800 hover:bg-slate-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold text-white rounded-xl bg-sky-600 hover:bg-sky-700 shadow-sm cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      ) : null}

      {/* Grid: Assigned Equipment & Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6 space-y-3" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
          <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#9ca3af' }}>Assigned Equipment</h4>
          <ul className="space-y-2 text-xs font-semibold">
            <li className="flex items-center justify-between p-2.5 rounded-xl" style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}>
              <span style={{ color: '#d1d5db' }}>Portable Barcode Scanner (Zebra TC26)</span>
              <span className="font-bold" style={{ color: '#34d399' }}>Online</span>
            </li>
            <li className="flex items-center justify-between p-2.5 rounded-xl" style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}>
              <span style={{ color: '#d1d5db' }}>Digital BP Monitor (Omron HEM-7120)</span>
              <span className="font-bold" style={{ color: '#34d399' }}>Calibrated</span>
            </li>
            <li className="flex items-center justify-between p-2.5 rounded-xl" style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}>
              <span style={{ color: '#d1d5db' }}>Cold Chain Specimen Bag (#K-89)</span>
              <span className="font-bold" style={{ color: '#34d399' }}>4°C Verified</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl p-6 space-y-3" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
          <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#9ca3af' }}>Performance Summary</h4>
          <div className="space-y-2 text-xs font-semibold">
            <div className="flex items-center justify-between p-2.5 rounded-xl" style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}>
              <span style={{ color: '#d1d5db' }}>On-Time Home Pickups</span>
              <span className="font-bold" style={{ color: '#38bdf8' }}>98.5%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl" style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}>
              <span style={{ color: '#d1d5db' }}>Hemolysis / Rejection Rate</span>
              <span className="font-bold" style={{ color: '#34d399' }}>0.2% (Low)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl" style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}>
              <span style={{ color: '#d1d5db' }}>Total Collections This Month</span>
              <span className="font-bold text-white">142 Samples</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
