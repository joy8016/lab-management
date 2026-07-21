import React, { useState } from 'react'
import { useLims } from '../context/LimsContext'
import { LIMSLogo } from '../components/Icons'

export default function RegisterPage() {
  const { pendingRole, setView, registerUser } = useLims()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: pendingRole || 'lab-manager'
  })
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const roleLabels = {
    'super-admin': 'Super Admin',
    'lab-manager': 'Lab Manager',
    'pathologist': 'Pathologist',
    'lab-technician': 'Lab Technician',
    'sample-collector': 'Sample Collector',
    'receptionist': 'Receptionist'
  }

  const roleColors = {
    'super-admin': { bg: 'from-blue-600 to-indigo-700', badge: 'bg-blue-100 text-blue-800' },
    'lab-manager': { bg: 'from-emerald-600 to-teal-700', badge: 'bg-emerald-100 text-emerald-800' },
    'pathologist': { bg: 'from-cyan-600 to-teal-700', badge: 'bg-cyan-100 text-cyan-800' },
    'lab-technician': { bg: 'from-orange-500 to-amber-700', badge: 'bg-orange-100 text-orange-800' },
    'sample-collector': { bg: 'from-yellow-500 to-amber-600', badge: 'bg-yellow-100 text-yellow-800' },
    'receptionist': { bg: 'from-pink-500 to-rose-700', badge: 'bg-pink-100 text-pink-800' }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGeneralError('')
    if (!validate()) return
    setIsSubmitting(true)
    
    const result = await registerUser(
      formData.fullName,
      formData.email,
      formData.password,
      formData.role
    )
    
    setIsSubmitting(false)
    if (!result.success) {
      setGeneralError(result.message)
    }
  }

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const currentColors = roleColors[pendingRole] || roleColors['lab-manager']

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col font-sans">
      {/* Navigation */}
      <header className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => setView('landing')} className="cursor-pointer bg-transparent border-none p-0">
            <LIMSLogo />
          </button>
          <button
            onClick={() => setView('landing')}
            className="text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer transition-colors flex items-center gap-2 bg-transparent border-none"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Roles
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Role Badge */}
          {pendingRole && (
            <div className="text-center mb-6 animate-[fadeSlideDown_0.4s_ease-out]">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${currentColors.badge} shadow-sm`}>
                <span className="w-2 h-2 rounded-full bg-current opacity-60" />
                {roleLabels[pendingRole]} Portal
              </span>
            </div>
          )}

          {/* Registration Card */}
          <div className="bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_8px_60px_-12px_rgba(0,0,0,0.12)] p-8 relative overflow-hidden animate-[fadeSlideUp_0.5s_ease-out]">
            {/* Decorative gradient accent */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${currentColors.bg}`} />

            {/* Header */}
            <div className="text-center mb-8">
              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${currentColors.bg} flex items-center justify-center shadow-lg`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Create Your Account</h1>
              <p className="text-sm text-gray-500 mt-1.5 font-medium">Join the LIMS platform to get started</p>
            </div>

             {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {generalError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5 text-xs text-red-600 font-bold animate-[shake_0.4s_ease-in-out]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{generalError}</span>
                </div>
              )}
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange('fullName')}
                    placeholder="Dr. Jane Smith"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50/80 border-2 ${errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:shadow-sm`}
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    placeholder="jane@laboratory.com"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50/80 border-2 ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:shadow-sm`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange('password')}
                    placeholder="Min. 8 characters"
                    className={`w-full pl-10 pr-12 py-3 bg-gray-50/80 border-2 ${errors.password ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:shadow-sm`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer bg-transparent border-none"
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    placeholder="Re-enter your password"
                    className={`w-full pl-10 pr-12 py-3 bg-gray-50/80 border-2 ${errors.confirmPassword ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:shadow-sm`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer bg-transparent border-none"
                  >
                    {showConfirmPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-sm tracking-wide uppercase transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-r ${currentColors.bg}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-500 font-medium">
                Already have an account?{' '}
                <button
                  onClick={() => setView('login')}
                  className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer transition-colors bg-transparent border-none underline decoration-2 underline-offset-2 hover:decoration-blue-800"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>

          {/* Security Footer */}
          <div className="text-center mt-6 animate-[fadeSlideUp_0.6s_ease-out]">
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-xs font-semibold">256-bit SSL Encrypted • HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
