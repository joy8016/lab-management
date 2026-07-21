import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import OperationsOverview from './components/OperationsOverview'
import StaffScheduling from './components/StaffScheduling'
import InventoryApprovals from './components/InventoryApprovals'
import QualityControl from './components/QualityControl'
import { useLims } from '../../context/LimsContext'

export default function LabManagerPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { setView, roster, inventoryRequests } = useLims()

  const pendingApprovalsCount = inventoryRequests.filter((req) => req.status === 'Pending').length
  const activeStaffCount = roster.length
  const deptStaffCount = (dept) => roster.filter((s) => s.dept === dept).length

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header onBack={() => setView('landing')} />

        {/* Tab Content */}
        {activeTab === 'dashboard' && <Dashboard />}

        {activeTab === 'operations' && (
          <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6">
              <OperationsOverview activeStaffCount={activeStaffCount} deptStaffCount={deptStaffCount} />
            </div>
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6">
              <QualityControl />
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6">
              <InventoryApprovals />
            </div>
          </div>
        )}

        {activeTab === 'staffing' && (
          <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6">
              <StaffScheduling deptStaffCount={deptStaffCount} />
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="flex-1 p-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Reports</h2>
              <p className="text-sm text-gray-500">Generate and export lab performance reports — coming soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
