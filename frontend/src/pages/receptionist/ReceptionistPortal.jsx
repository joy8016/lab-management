import React, { useState } from 'react'
import { useLims } from '../../context/LimsContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import PatientRegistration from './components/PatientRegistration'
import TestBooking from './components/TestBooking'
import LabelPrinting from './components/LabelPrinting'
import ReportStatus from './components/ReportStatus'
import PlaceholderView from './components/PlaceholderView'

export default function ReceptionistPortal() {
  const { setView } = useLims()
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />
      case 'registration':
        return <PatientRegistration />
      case 'booking':
        return <TestBooking />
      case 'printing':
        return <LabelPrinting />
      case 'reports':
        return <ReportStatus />
      case 'search':
        return (
          <PlaceholderView
            title="Search"
            description="Search patients, invoice records, test orders, and diagnostic report logs across the clinic network."
          />
        )
      default:
        return <Dashboard setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="flex flex-col min-h-screen font-sans" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
      {/* Top Header with Back to Roles Button */}
      <Header onBack={() => setView('landing')} />

      {/* Main Layout: Sidebar + Dynamic Subview */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Subview */}
        {renderActiveView()}
      </div>
    </div>
  )
}
