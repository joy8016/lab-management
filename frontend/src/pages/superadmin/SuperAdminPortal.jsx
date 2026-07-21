import React, { useState } from 'react'
import { useLims } from '../../context/LimsContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardOverview from './components/DashboardOverview'
import BranchesManagement from './components/BranchesManagement'
import UsersManagement from './components/UsersManagement'
import RolesPermissions from './components/RolesPermissions'

// Reusable mock component for sections under construction or basic previews
const PlaceholderView = ({ title, description }) => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center py-16 space-y-4 font-sans">
    <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-blue-600">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
    <h2 className="text-base font-bold text-gray-900 tracking-tight">{title} Module</h2>
    <p className="text-xs text-gray-500 font-semibold max-w-sm mx-auto leading-relaxed">{description}</p>
    <button 
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer"
      onClick={() => alert(`${title} settings are currently optimized for live production deployment.`)}
    >
      Configure Policies
    </button>
  </div>
)

export default function SuperAdminPortal() {
  const { setView, logoutUser } = useLims()
  const [activeTab, setActiveTab] = useState('dashboard')

  // Navigation router returning the active child component
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview setActiveTab={setActiveTab} />
      case 'branches':
        return <BranchesManagement />
      case 'users':
        return <UsersManagement />
      case 'roles':
        return <RolesPermissions />
      case 'catalog':
        return (
          <PlaceholderView 
            title="Test Catalog" 
            description="Manage blood analysis catalogs, sample volume guidelines, pathology ranges, and panel mappings." 
          />
        )
      case 'pricing':
        return (
          <PlaceholderView 
            title="Pricing &amp; Billing" 
            description="Adjust laboratory service pricing matrices, client hospital invoices, currency profiles, and merchant gateways." 
          />
        )
      case 'ranges':
        return (
          <PlaceholderView 
            title="Reference Ranges" 
            description="Configure biochemical parameters, normal/critical range metrics, age adjustments, and warning labels." 
          />
        )
      case 'logs':
        return (
          <PlaceholderView 
            title="Audit Logs" 
            description="View real-time security logs, IP address logins, record revision logs, database changes, and system warnings." 
          />
        )
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col min-w-0 px-6 sm:px-8 pb-12">
        {/* Top Header toolbar */}
        <Header onLogout={logoutUser} onBack={() => setView('landing')} />

        {/* Dynamic Inner Panel */}
        <main className="mt-6 flex-1">
          {renderActiveView()}
        </main>
      </div>
    </div>
  )
}
