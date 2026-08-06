import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardOverview from './components/DashboardOverview'
import CaseReviewQueue from './components/CaseReviewQueue'
import TestResultsValidation from './components/TestResultsValidation'
import AddInterpretations from './components/AddInterpretations'
import AuditHistory from './components/AuditHistory'
import { useLims } from '../../context/LimsContext'

export default function PathologistPortal() {
  const [activeTab, setActiveTab] = useState('home')
  const { setView, user } = useLims()

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header onBack={() => setView('landing')} />

        {/* Tab Router Content */}
        {activeTab === 'home' && <DashboardOverview />}
        {activeTab === 'queue' && <CaseReviewQueue />}
        {activeTab === 'validation' && <TestResultsValidation />}
        {activeTab === 'interpretations' && <AddInterpretations />}
        {activeTab === 'history' && <AuditHistory />}

        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
                <div className="w-16 h-16 rounded-full bg-teal-800 text-white font-bold text-xl flex items-center justify-center shadow-md">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : 'PA'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{user?.name || 'Pathology Specialist'}</h2>
                  <p className="text-xs text-gray-500">{user?.email || 'pathologist@lims.org'} • Chief Pathologist</p>
                  <span className="inline-block mt-1 bg-teal-50 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-100">
                    License #: MD-99201-PATH
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">Digital Signature &amp; Security Credentials</h3>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-semibold">Digital Certificate Status:</span>
                    <span className="text-emerald-700 font-bold">✓ Active (RSA 4096-bit)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-semibold">E-Signature Stamp:</span>
                    <span className="text-gray-900 font-mono">Dr. Evelyn Vance, MD, FCAP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-semibold">2FA Authentication:</span>
                    <span className="text-emerald-700 font-bold">Enabled (FIDO2 Key)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
