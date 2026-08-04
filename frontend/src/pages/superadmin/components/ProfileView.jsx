import React, { useState } from 'react'
import { useLims } from '../../../context/LimsContext'

export default function ProfileView() {
  const { user } = useLims()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || 'Super Admin',
    email: user?.email || 'admin@lims.org',
    phone: '+1 (555) 234-5678',
    department: 'Executive System Administration',
    location: 'Metropolis Central HQ',
    twoFactorEnabled: true,
    emailAlerts: true
  })
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  const activeSessions = [
    { device: 'Chrome on Windows 11 (Current)', ip: '192.168.1.45', location: 'Metropolis, USA', lastActive: 'Active Now' },
    { device: 'Safari on macOS Monterey', ip: '172.56.21.90', location: 'Gotham City, USA', lastActive: '2 hours ago' },
    { device: 'LIMS Mobile App (iOS)', ip: '10.0.0.12', location: 'Metropolis, USA', lastActive: '1 day ago' }
  ]

  return (
    <div className="space-y-6 font-sans text-left max-w-5xl mx-auto pb-8">
      {/* Toast Notification */}
      {savedSuccess && (
        <div className="bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3 text-xs font-bold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Profile credentials updated successfully!</span>
          </div>
          <button onClick={() => setSavedSuccess(false)} className="text-white/80 hover:text-white text-xs font-bold">✕</button>
        </div>
      )}

      {/* Main Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 flex items-center justify-center text-white font-black text-3xl shadow-inner shrink-0">
            SA
          </div>
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{profileData.fullName}</h1>
              <span className="bg-blue-400/20 border border-blue-300/30 text-blue-100 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Root Super Admin
              </span>
            </div>
            <p className="text-xs text-blue-100/80 font-medium">
              Primary System Controller • Full Infrastructure & Authorization Privileges
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-blue-100">
              <div className="flex items-center gap-1.5 font-semibold">
                <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                {profileData.email}
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {profileData.location}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-all cursor-pointer shadow-sm self-center sm:self-start"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information / Edit Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-base font-black text-gray-900 tracking-tight">Account Details</h2>
              <p className="text-xs text-gray-500 font-medium">Manage your personal credentials and system information</p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Level 4 Root</span>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-gray-400">Full Name</span>
                <p className="font-bold text-gray-900 text-sm">{profileData.fullName}</p>
              </div>
              <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-gray-400">Email Address</span>
                <p className="font-bold text-gray-900 text-sm">{profileData.email}</p>
              </div>
              <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-gray-400">Contact Number</span>
                <p className="font-bold text-gray-900 text-sm">{profileData.phone}</p>
              </div>
              <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-gray-400">Department</span>
                <p className="font-bold text-gray-900 text-sm">{profileData.department}</p>
              </div>
            </div>
          )}

          {/* Active Sessions */}
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider">Active Authorized Sessions</h3>
            <div className="space-y-3">
              {activeSessions.map((session, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 bg-gray-50/40 rounded-xl border border-gray-100 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      💻
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{session.device}</p>
                      <p className="text-[10px] text-gray-400 font-semibold">{session.ip} • {session.location}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${session.lastActive === 'Active Now' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600'}`}>
                    {session.lastActive}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security & System Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5">
            <h3 className="text-sm font-black text-gray-900 tracking-tight">Security &amp; Authorization</h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-bold text-gray-800">Two-Factor Auth</p>
                  <p className="text-[10px] text-gray-400 font-medium">Hardware Key / Authenticator</p>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">Enforced</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-bold text-gray-800">API Bearer Scopes</p>
                  <p className="text-[10px] text-gray-400 font-medium">Wildcard System Access</p>
                </div>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">Full Scope</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-bold text-gray-800">Session Expiration</p>
                  <p className="text-[10px] text-gray-400 font-medium">24h Auto Renewal</p>
                </div>
                <span className="text-[10px] font-bold bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-gray-800 text-white rounded-3xl p-6 shadow-md space-y-3">
            <span className="text-[10px] font-extrabold uppercase text-blue-400 tracking-wider">Super Admin Security Badge</span>
            <p className="text-xs font-semibold text-gray-300 leading-relaxed">
              You are currently logged in with highest system authority. All actions are logged under the master audit ledger.
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-gray-400 border-t border-gray-700/60">
              <span>Security Level</span>
              <span className="text-emerald-400">Class 4 System Root</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
