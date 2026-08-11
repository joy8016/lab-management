import React, { useState } from 'react'
import { useLims } from '../context/LimsContext'

const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const LockIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

export default function ProfilePage() {
  const { user, setUser, setView } = useLims()
  const [activeTab, setActiveTab] = useState('personal') // 'personal' | 'security' | 'permissions'
  const [isEditing, setIsEditing] = useState(false)
  const [savedToast, setSavedToast] = useState(null)

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Dr. Jane Smith',
    email: user?.email || 'janesmith@lims.org',
    phone: user?.phone || '+1 (555) 349-8821',
    role: user?.role || 'lab-manager',
    department: user?.department || 'Hematology & Clinical Diagnostics',
    employeeId: user?.employeeId || 'LIMS-EMP-9942',
    location: user?.location || 'Central Hospital HQ - Floor 3',
    bio: user?.bio || 'Certified Senior Pathologist & Laboratory Operations Lead with 10+ years managing high-volume diagnostic centers.',
  })

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')

  // 2FA State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  // Active Sessions Data
  const [sessions, setSessions] = useState([
    { id: 1, device: 'Browser Session (Current)', ip: '127.0.0.1', location: 'Local Session', lastActive: 'Active Now', current: true },
  ])

  // Get user role display name
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

  // Handle Return to Portal
  const handleBackToPortal = () => {
    const targetRole = user?.role || 'lab-manager'
    setView(targetRole)
  }

  // Handle Profile Update Save
  const handleSaveProfile = (e) => {
    e.preventDefault()
    if (setUser) {
      setUser((prev) => ({
        ...prev,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        location: formData.location,
        bio: formData.bio,
      }))
    }
    setIsEditing(false)
    setSavedToast('Profile information updated successfully!')
    setTimeout(() => setSavedToast(null), 4000)
  }

  // Handle Password Change
  const handleChangePassword = (e) => {
    e.preventDefault()
    if (!passwordForm.currentPassword) {
      setPasswordError('Please enter your current password.')
      return
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.')
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password and confirmation do not match.')
      return
    }

    setPasswordError('')
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setSavedToast('Password updated successfully!')
    setTimeout(() => setSavedToast(null), 4000)
  }

  // Revoke Session
  const handleRevokeSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
    setSavedToast('Session revoked.')
    setTimeout(() => setSavedToast(null), 3000)
  }

  const rolePermissionsMap = {
    'lab-manager': [
      'Approve & Reject Reagent Purchase Requests',
      'Manage Technician Staffing & Shift Rosters',
      'Access Lab Quality Control & Operational Analytics',
      'Manage Equipment Calibration Logs',
      'View Department Financial Summary Reports'
    ],
    'super-admin': [
      'Full Infrastructure & Multi-Branch Management',
      'Manage User Accounts, Roles & Authorization Levels',
      'Configure Master Test Catalog & Reference Ranges',
      'View Real-Time Audit Logs & Security Metrics',
      'Manage Billing & Pricing Rules'
    ],
    'pathologist': [
      'Review & Validate Laboratory Test Results',
      'Add Clinical Interpretations & Pathology Notes',
      'Digital Sign-off on Diagnostic Reports',
      'Flag Critical Values & Request Test Re-runs',
      'Access Historical Patient Case Records'
    ],
    'lab-technician': [
      'Access Test Worklists & Enter Analytical Data',
      'Log Specimen Intake & Barcode Scanning',
      'Perform Quality Control Standards & Calibration',
      'Raise Reagent Reorder Requests',
      'Print Specimen Labels & Test Worksheets'
    ],
    'sample-collector': [
      'View Scheduled Specimen Collection Pickups',
      'Record Patient Collection Details & Time Stamping',
      'Generate & Attach Specimen Barcode IDs',
      'Log Sample Storage Temperature & Chain of Custody'
    ],
    'receptionist': [
      'Register New Patients & Update Medical Demographics',
      'Book Diagnostic Appointments & Lab Orders',
      'Generate Invoice Bills & Collect Payments',
      'Issue Finalized Patient Test Reports'
    ]
  }

  const currentRole = formData.role || 'lab-manager'
  const userPermissions = rolePermissionsMap[currentRole] || rolePermissionsMap['lab-manager']

  return (
    <div className="min-h-screen bg-gray-50/60 font-sans text-gray-800 pb-16">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-6 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToPortal}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition cursor-pointer border border-gray-200"
          >
            <BackArrowIcon />
            <span>Back to {getRoleDisplayName(currentRole)} Portal</span>
          </button>
          <div className="h-4 w-px bg-gray-200 mx-1" />
          <h1 className="text-sm font-black text-gray-900 tracking-tight">Account Profile</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('settings')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 border border-gray-200 transition cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>Settings</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Toast Notification */}
        {savedToast && (
          <div className="bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center justify-between transition-all animate-bounce">
            <div className="flex items-center gap-2.5 text-xs font-bold">
              <CheckIcon />
              <span>{savedToast}</span>
            </div>
            <button onClick={() => setSavedToast(null)} className="text-white/80 hover:text-white text-xs font-bold cursor-pointer">✕</button>
          </div>
        )}

        {/* Hero Card Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-800 via-teal-700 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-teal-700/40">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar Initials Badge */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 border-4 border-white/20 flex items-center justify-center text-white font-black text-3xl shadow-2xl shrink-0">
                {formData.fullName.substring(0, 2).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center title='Online'" />
            </div>

            {/* Profile Summary Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{formData.fullName}</h2>
                <span className="bg-teal-400/20 border border-teal-300/30 text-teal-100 text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  {getRoleDisplayName(formData.role)}
                </span>
              </div>

              <p className="text-xs text-teal-100/90 font-medium max-w-xl leading-relaxed">
                {formData.bio}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-teal-100/80">
                <div className="flex items-center gap-1.5 font-semibold">
                  <svg className="w-4 h-4 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  {formData.email}
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <svg className="w-4 h-4 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                  {formData.department}
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <svg className="w-4 h-4 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6"/></svg>
                  {formData.employeeId}
                </div>
              </div>
            </div>

            {/* Edit / Action Button */}
            <button
              onClick={() => {
                setActiveTab('personal')
                setIsEditing(!isEditing)
              }}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition cursor-pointer shadow-xs shrink-0 self-center sm:self-start"
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Section Tabs Navigation */}
        <div className="flex border-b border-gray-200 bg-white rounded-2xl px-2 pt-2 shadow-2xs">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'personal'
                ? 'border-teal-600 text-teal-700 font-extrabold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span>Personal Information</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'security'
                ? 'border-teal-600 text-teal-700 font-extrabold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <span>Security & Login</span>
          </button>

          <button
            onClick={() => setActiveTab('permissions')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'permissions'
                ? 'border-teal-600 text-teal-700 font-extrabold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            <span>Role &amp; Permissions</span>
          </button>
        </div>

        {/* TAB 1: Personal Information */}
        {activeTab === 'personal' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-black text-gray-900 tracking-tight">Personal &amp; Professional Details</h3>
                <p className="text-xs text-gray-500 font-medium">Update your profile info registered across the lab system</p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3.5 py-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-xl text-xs font-bold transition cursor-pointer border border-teal-100"
                >
                  Edit Information
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Assigned Location / Branch</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Employee ID (Read Only)</label>
                    <input
                      type="text"
                      value={formData.employeeId}
                      disabled
                      className="w-full bg-gray-100 text-gray-500 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Professional Bio / Summary</label>
                  <textarea
                    rows="3"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Full Name</span>
                  <p className="font-bold text-gray-900 text-sm">{formData.fullName}</p>
                </div>

                <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Email Address</span>
                  <p className="font-bold text-gray-900 text-sm">{formData.email}</p>
                </div>

                <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Phone Number</span>
                  <p className="font-bold text-gray-900 text-sm">{formData.phone}</p>
                </div>

                <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Department</span>
                  <p className="font-bold text-gray-900 text-sm">{formData.department}</p>
                </div>

                <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Location / Branch</span>
                  <p className="font-bold text-gray-900 text-sm">{formData.location}</p>
                </div>

                <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-gray-400">System Employee ID</span>
                  <p className="font-bold text-teal-800 text-sm">{formData.employeeId}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Security & Login */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Change Password Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-5">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-base font-black text-gray-900 tracking-tight">Change Account Password</h3>
                <p className="text-xs text-gray-500 font-medium">Ensure your password uses strong letters, numbers &amp; symbols</p>
              </div>

              {passwordError && (
                <div className="bg-red-50 text-red-700 p-3.5 rounded-xl text-xs font-semibold border border-red-200">
                  ⚠️ {passwordError}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                    placeholder="At least 6 characters"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition cursor-pointer"
                >
                  Update Password
                </button>
              </form>

              {/* Active Sessions */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">Active Login Sessions</h4>
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3.5 bg-gray-50/60 rounded-2xl border border-gray-100 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                          💻
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{session.device}</p>
                          <p className="text-[10px] text-gray-400 font-semibold">{session.ip} • {session.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${session.current ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600'}`}>
                          {session.lastActive}
                        </span>
                        {!session.current && (
                          <button
                            onClick={() => handleRevokeSession(session.id)}
                            className="text-[11px] font-bold text-red-600 hover:text-red-800 transition cursor-pointer"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2FA & Security Badge Box */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-gray-900 tracking-tight">Two-Factor Authentication</h4>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${twoFactorEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'}`}>
                    {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>

                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Protect your LIMS account with an extra verification layer using authenticator apps like Google Authenticator or Microsoft Authenticator.
                </p>

                <button
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled)
                    setSavedToast(twoFactorEnabled ? '2FA disabled.' : '2FA enabled.')
                    setTimeout(() => setSavedToast(null), 3000)
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    twoFactorEnabled
                      ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                      : 'bg-teal-700 text-white hover:bg-teal-800 shadow-xs'
                  }`}
                >
                  {twoFactorEnabled ? 'Disable 2FA Security' : 'Enable 2FA Security'}
                </button>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-gray-800 text-white rounded-3xl p-6 shadow-md space-y-3">
                <div className="flex items-center gap-2">
                  <LockIcon />
                  <span className="text-[11px] font-extrabold uppercase text-teal-400 tracking-wider">Security Compliance</span>
                </div>
                <p className="text-xs font-semibold text-gray-300 leading-relaxed">
                  HIPAA &amp; ISO 15189 Lab Security standard active. All diagnostic activities and session signatures are registered into audit ledgers.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Role & Permissions */}
        {activeTab === 'permissions' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-black text-gray-900 tracking-tight">System Role &amp; Access Privileges</h3>
                <p className="text-xs text-gray-500 font-medium">Assigned capabilities based on your designated organizational role</p>
              </div>
              <span className="text-xs font-extrabold bg-teal-50 text-teal-800 border border-teal-200 px-3.5 py-1 rounded-full uppercase tracking-wider">
                {getRoleDisplayName(currentRole)}
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">Granted Permissions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {userPermissions.map((perm, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 bg-teal-50/40 rounded-2xl border border-teal-100/70 text-xs">
                    <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold shrink-0">
                      ✓
                    </div>
                    <span className="font-bold text-gray-800">{perm}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-3">Certifications &amp; Licenses</h4>
              <div className="flex flex-wrap gap-2.5">
                <span className="bg-gray-100 border border-gray-200 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-xl">
                  📜 CAP Accredited Specialist
                </span>
                <span className="bg-gray-100 border border-gray-200 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-xl">
                  🔬 ISO 15189 Medical Lab Auditor
                </span>
                <span className="bg-gray-100 border border-gray-200 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-xl">
                  🛡️ HIPAA Certified Professional
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
