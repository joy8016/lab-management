import React, { useState } from 'react'
import { useLims } from '../../context/LimsContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import SampleIntake from './components/SampleIntake'
import TestEntry from './components/TestEntry'
import QualityControl from './components/QualityControl'
import PlaceholderView from './components/PlaceholderView'

export default function LabTechnicianPortal() {
  const { setView } = useLims()
  const [activeTab, setActiveTab] = useState('test-entry')

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'sample-intake':
        return <SampleIntake />
      case 'test-entry':
        return <TestEntry />
      case 'quality-control':
        return <QualityControl />
      case 'reports':
        return (
          <PlaceholderView
            title="Reports"
            description="Generate, export, and print lab test reports, turnaround analytics, and QC summaries."
          />
        )
      case 'settings':
        return (
          <PlaceholderView
            title="Settings"
            description="Configure instrument interfaces, barcode scanners, label printers, and notification preferences."
          />
        )
      default:
        return <TestEntry />
    }
  }

  return (
    <div className="flex flex-col min-h-screen font-sans" style={{ backgroundColor: '#f3f7fa' }}>
      {/* Top Header */}
      <Header onBack={() => setView('landing')} />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Content */}
        {renderActiveView()}
      </div>
    </div>
  )
}
