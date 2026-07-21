import React, { useState } from 'react'
import { useLims } from '../../context/LimsContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import MySchedule from './components/MySchedule'
import BarcodeLinking from './components/BarcodeLinking'
import VitalsEntry from './components/VitalsEntry'
import CollectionHistory from './components/CollectionHistory'
import MyProfile from './components/MyProfile'

export default function SampleCollectorPortal() {
  const { setView } = useLims()
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />
      case 'schedule':
        return <MySchedule />
      case 'barcode':
        return <BarcodeLinking />
      case 'vitals':
        return <VitalsEntry />
      case 'history':
        return <CollectionHistory />
      case 'profile':
        return <MyProfile />
      default:
        return <Dashboard setActiveTab={setActiveTab} />
    }
  }

  return (
    <div
      className="flex flex-col min-h-screen font-sans"
      style={{ backgroundColor: '#141416', color: '#ffffff' }}
    >
      {/* Header */}
      <Header />

      {/* Main Container: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onBack={() => setView('landing')}
        />

        {/* Dynamic Subview */}
        {renderActiveView()}
      </div>
    </div>
  )
}
