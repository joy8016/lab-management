import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardOverview from './components/DashboardOverview'
import { useLims } from '../../context/LimsContext'

export default function PathologistPortal() {
  const [activeTab, setActiveTab] = useState('home')
  const { setView } = useLims()

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header onBack={() => setView('landing')} />

        {/* Tab Content */}
        {activeTab === 'home' && <DashboardOverview />}

        {activeTab === 'queue' && (
          <div className="flex-1 p-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Case Review Queue</h2>
              <p className="text-sm text-gray-500">Full case review queue with advanced filtering — coming soon.</p>
            </div>
          </div>
        )}

        {activeTab === 'validation' && (
          <div className="flex-1 p-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Test Results Validation</h2>
              <p className="text-sm text-gray-500">Validate incoming test results with automated range checks — coming soon.</p>
            </div>
          </div>
        )}

        {activeTab === 'interpretations' && (
          <div className="flex-1 p-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Add Interpretations</h2>
              <p className="text-sm text-gray-500">Add clinical notes and interpretive commentary to finalized results — coming soon.</p>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="flex-1 p-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Audit History</h2>
              <p className="text-sm text-gray-500">Full audit trail of all pathologist actions and case reviews — coming soon.</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="flex-1 p-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Profile Settings</h2>
              <p className="text-sm text-gray-500">Manage your profile, credentials, and digital signature — coming soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
