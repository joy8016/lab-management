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

export default function SettingsPage() {
  const { user, setView } = useLims()
  const [activeTab, setActiveTab] = useState('general') // 'general' | 'notifications' | 'workflow' | 'security'
  const [savedToast, setSavedToast] = useState(null)

  // Settings State
  const [settings, setSettings] = useState({
    theme: 'light', // 'light' | 'dark' | 'system'
    language: 'en',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '12h',
    timezone: 'UTC-5 (EST)',
    emailAlerts: true,
    soundAlerts: true,
    desktopPush: true,
    weeklyDigest: false,
    autoSaveInterval: '30s',
    barcodeFormat: 'Code-128',
    panicThresholdAlerts: true,
    autoLogoutTimeout: '30m',
    exportFormat: 'PDF',
    auditLogLevel: 'Detailed',
  })

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

  const currentRole = user?.role || 'lab-manager'

  const handleBackToPortal = () => {
    setView(currentRole)
  }

  const handleSaveSettings = (e) => {
    if (e) e.preventDefault()
    setSavedToast('System settings saved successfully!')
    setTimeout(() => setSavedToast(null), 4000)
  }

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
          <h1 className="text-sm font-black text-gray-900 tracking-tight">System &amp; Account Settings</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('profile')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 border border-gray-200 transition cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>My Profile</span>
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

        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-gray-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-gray-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-teal-400/20 border border-teal-300/30 text-teal-200 text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                LIMS System Preferences
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Configure Your Workspace</h2>
            <p className="text-xs text-gray-300 font-medium max-w-xl leading-relaxed">
              Customize system localization, automated alert triggers, report auto-saving, sound chimes, and security timeout thresholds.
            </p>
          </div>

          <button
            onClick={() => handleSaveSettings()}
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-5 py-3 rounded-2xl transition cursor-pointer shadow-md shrink-0 border border-teal-400/30"
          >
            Save All Preferences
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-white rounded-2xl px-2 pt-2 shadow-2xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'general'
                ? 'border-teal-600 text-teal-700 font-extrabold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>General &amp; Display</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'notifications'
                ? 'border-teal-600 text-teal-700 font-extrabold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            <span>Notifications &amp; Alerts</span>
          </button>

          <button
            onClick={() => setActiveTab('workflow')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'workflow'
                ? 'border-teal-600 text-teal-700 font-extrabold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
            <span>Lab &amp; Workflow</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'security'
                ? 'border-teal-600 text-teal-700 font-extrabold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <span>Security &amp; Exports</span>
          </button>
        </div>

        {/* TAB 1: General & Display */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-black text-gray-900 tracking-tight">Display &amp; Localization Preferences</h3>
              <p className="text-xs text-gray-500 font-medium">Customize interface theme, regional language, and date/time formats</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              {/* Theme Selector */}
              <div className="space-y-2 sm:col-span-2">
                <label className="block text-xs font-bold text-gray-800">Interface Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light', name: 'Light Mode', desc: 'Clean white background' },
                    { id: 'dark', name: 'Dark Mode', desc: 'Sleek dark theme' },
                    { id: 'system', name: 'System Sync', desc: 'Follow OS preference' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSettings({ ...settings, theme: item.id })}
                      className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                        settings.theme === item.id
                          ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-500/20'
                          : 'border-gray-200 bg-gray-50/50 hover:bg-gray-100'
                      }`}
                    >
                      <p className="font-extrabold text-gray-900 text-xs">{item.name}</p>
                      <p className="text-[10px] text-gray-500 font-medium mt-0.5">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">System Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                >
                  <option value="en">English (US)</option>
                  <option value="es">Español (Spanish)</option>
                  <option value="fr">Français (French)</option>
                  <option value="de">Deutsch (German)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                >
                  <option value="UTC-5 (EST)">Eastern Time (UTC-5)</option>
                  <option value="UTC-8 (PST)">Pacific Time (UTC-8)</option>
                  <option value="UTC+0 (GMT)">Greenwich Mean Time (UTC+0)</option>
                  <option value="UTC+5:30 (IST)">Indian Standard Time (UTC+5:30)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">Date Display Format</label>
                <select
                  value={settings.dateFormat}
                  onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                >
                  <option value="YYYY-MM-DD">YYYY-MM-DD (2026-08-06)</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY (06/08/2026)</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY (08/06/2026)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">Time Clock Format</label>
                <select
                  value={settings.timeFormat}
                  onChange={(e) => setSettings({ ...settings, timeFormat: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                >
                  <option value="12h">12-Hour Clock (e.g. 02:45 PM)</option>
                  <option value="24h">24-Hour Military Clock (e.g. 14:45)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Notifications & Alerts */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-black text-gray-900 tracking-tight">Notification &amp; Real-Time Alerts</h3>
              <p className="text-xs text-gray-500 font-medium">Control how and when you receive automated updates from the lab</p>
            </div>

            <div className="space-y-4">
              {[
                { key: 'emailAlerts', title: 'Email Notifications', desc: 'Receive emails for pending approvals, critical lab values, and inventory thresholds.' },
                { key: 'soundAlerts', title: 'Audio Sound Chimes', desc: 'Play audible sound alerts when STAT urgent specimens or high-priority requests arrive.' },
                { key: 'desktopPush', title: 'Desktop Push Notifications', desc: 'Show browser popups for immediate shift updates and lab notices.' },
                { key: 'weeklyDigest', title: 'Weekly Summary Digest', desc: 'Receive a weekly email breakdown of lab performance and staff attendance.' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50/60 rounded-2xl border border-gray-100">
                  <div className="space-y-0.5">
                    <p className="font-extrabold text-gray-900 text-xs">{item.title}</p>
                    <p className="text-[10px] text-gray-500 font-medium">{item.desc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key] })}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      settings[item.key] ? 'bg-teal-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform absolute top-1 ${
                        settings[item.key] ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Lab & Workflow */}
        {activeTab === 'workflow' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-black text-gray-900 tracking-tight">Lab Operations &amp; Instrument Integration</h3>
              <p className="text-xs text-gray-500 font-medium">Fine-tune data entry behavior, auto-save triggers, and panic range alerts</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">Draft Auto-Save Frequency</label>
                <select
                  value={settings.autoSaveInterval}
                  onChange={(e) => setSettings({ ...settings, autoSaveInterval: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                >
                  <option value="15s">Every 15 Seconds</option>
                  <option value="30s">Every 30 Seconds (Recommended)</option>
                  <option value="1m">Every 1 Minute</option>
                  <option value="disabled">Disabled (Manual Save Only)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">Specimen Barcode Format</label>
                <select
                  value={settings.barcodeFormat}
                  onChange={(e) => setSettings({ ...settings, barcodeFormat: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                >
                  <option value="Code-128">Code-128 (Standard Diagnostic)</option>
                  <option value="QR-Code">QR Code (2D DataMatrix)</option>
                  <option value="Code-39">Code-39 (Legacy Support)</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex items-center justify-between p-4 bg-teal-50/50 rounded-2xl border border-teal-100">
                <div>
                  <p className="font-extrabold text-gray-900 text-xs">Abnormal Panic Value Highlight</p>
                  <p className="text-[10px] text-gray-500 font-medium">Automatically highlight out-of-range lab result entries in bold red badges</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, panicThresholdAlerts: !settings.panicThresholdAlerts })}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    settings.panicThresholdAlerts ? 'bg-teal-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform absolute top-1 ${
                      settings.panicThresholdAlerts ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Security & Exports */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-black text-gray-900 tracking-tight">Security Timeouts &amp; File Export Defaults</h3>
              <p className="text-xs text-gray-500 font-medium">Set automatic session lock rules and default report formats</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">Inactivity Auto-Logout Timeout</label>
                <select
                  value={settings.autoLogoutTimeout}
                  onChange={(e) => setSettings({ ...settings, autoLogoutTimeout: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                >
                  <option value="15m">15 Minutes (High Security)</option>
                  <option value="30m">30 Minutes (Standard)</option>
                  <option value="1h">1 Hour</option>
                  <option value="never">Never (Not Recommended)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">Default Report Export File Format</label>
                <select
                  value={settings.exportFormat}
                  onChange={(e) => setSettings({ ...settings, exportFormat: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                >
                  <option value="PDF">PDF Document (Formatted Report)</option>
                  <option value="CSV">CSV Data File</option>
                  <option value="Excel">Microsoft Excel (.xlsx)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">Audit Log Verbosity</label>
                <select
                  value={settings.auditLogLevel}
                  onChange={(e) => setSettings({ ...settings, auditLogLevel: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:bg-white focus:border-teal-500 outline-none"
                >
                  <option value="Detailed">Detailed (Log all clicks &amp; modifications)</option>
                  <option value="Standard">Standard (Log critical actions)</option>
                  <option value="Minimal">Minimal</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
