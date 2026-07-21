import React from 'react'
import { useLims } from '../../../context/LimsContext'

// Quick Management Link SVG Icons
const BranchesCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="9" y1="22" x2="9" y2="16" />
    <line x1="15" y1="22" x2="15" y2="16" />
  </svg>
)

const UsersCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
  </svg>
)

const RolesCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <circle cx="9" cy="7" r="4" />
  </svg>
)

const CatalogCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

const PricingCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

const ReferenceCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function DashboardOverview({ setActiveTab }) {
  const { users, inventoryRequests } = useLims()

  // Calculate dynamic approvals size based on the pending items
  const pendingApprovalsCount = inventoryRequests.filter((r) => r.status === 'Pending').length

  // Chart values (blue height, green height) for the branches monthly test volume
  const chartData = [
    { branch: 'Main Lab', val1: 260, val2: 130 },
    { branch: 'City Clinic', val1: 290, val2: 180 },
    { branch: 'Main Lab', val1: 350, val2: 190 },
    { branch: 'Mary Lab', val1: 250, val2: 160 },
    { branch: 'Twin Lab', val1: 340, val2: 210 },
    { branch: 'July Lab', val1: 270, val2: 230 },
    { branch: 'City Clinic', val1: 310, val2: 350 },
    { branch: 'City Clinic', val1: 360, val2: 230 }
  ]

  // Audit Logs static table data
  const auditLogs = [
    { time: '13:55 AM', action: 'Admin X updated reference range for Test Y', entity: 'Test Y' },
    { time: '13:55 PM', action: 'Admin X updated reference range for Test Y', entity: 'Test Y' },
    { time: '13:55 AM', action: 'Admin X updated reference range for Test Y', entity: 'Test Y' },
    { time: '13:56 PM', action: 'Admin X updated reference range for Test Y', entity: 'Test Y' },
    { time: '13:56 PM', action: 'Admin Y updated reference range for Test Y', entity: 'Test Y' },
    { time: '13:57 PM', action: 'Admin Z authorized branch configuration changes', entity: 'Branch C' },
    { time: '13:58 PM', action: 'Admin X activated user portal permissions', entity: 'User B' }
  ]

  return (
    <div className="space-y-8 py-2 font-sans text-left">
      
      {/* Stat Widgets row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Stat Card 1: Active Users */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Active Users</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
              ↑ Trend
            </span>
          </div>
          <div className="flex justify-between items-end mt-4">
            <div>
              <span className="text-2xl font-black text-gray-900 leading-none block">132</span>
              <span className="text-[10px] font-bold text-gray-400 block mt-1 uppercase tracking-wide">count</span>
            </div>
            {/* Sparkline trend representation */}
            <div className="w-24 h-8 text-emerald-500 shrink-0">
              <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                <path
                  d="M0 25 C20 10 40 30 60 5 C80 20 90 10 100 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Stat Card 2: Cataloged Tests */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Total Tests Cataloged</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-gray-900 leading-none block">1,690</span>
            <span className="text-[10px] font-bold text-gray-400 block mt-1 uppercase tracking-wide">catalog size</span>
          </div>
        </div>

        {/* Stat Card 3: Pending Approvals */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Pending Critical Approvals</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 animate-pulse">
              <span className="font-black text-xs">!</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-red-600 leading-none block">
              {pendingApprovalsCount > 0 ? pendingApprovalsCount * 7 - 1 : 20}
            </span>
            <span className="text-[10px] font-bold text-gray-400 block mt-1 uppercase tracking-wide">requires review</span>
          </div>
        </div>

        {/* Stat Card 4: Security Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Recent Security Alerts</span>
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-3.5 h-3.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-gray-900 leading-none block">0</span>
            <span className="text-[10px] font-bold text-gray-400 block mt-1 uppercase tracking-wide">active incidents</span>
          </div>
        </div>

      </div>

      {/* Main Panels section: Charts and Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Monthly Test Volume bar chart */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-gray-50 pb-4 mb-4">
            <h2 className="text-base font-bold text-gray-900 tracking-tight">Test Volume by Branch (Monthly)</h2>
            <select className="bg-gray-50 border border-gray-100 rounded-lg text-xs font-semibold py-1.5 px-2.5 outline-none text-gray-600">
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          {/* Bar Chart Container */}
          <div className="h-64 flex flex-col justify-between mt-6">
            {/* Chart Area with Gridlines */}
            <div className="flex-1 flex gap-4 relative">
              
              {/* Y-axis grid labels */}
              <div className="w-8 flex flex-col justify-between text-[10px] font-bold text-gray-400 text-right pr-2">
                <span>400</span>
                <span>300</span>
                <span>200</span>
                <span>100</span>
                <span>0</span>
              </div>

              {/* Gridlines backplane */}
              <div className="absolute inset-y-0 left-8 right-0 flex flex-col justify-between pointer-events-none z-0">
                <div className="w-full border-t border-gray-100" />
                <div className="w-full border-t border-gray-100" />
                <div className="w-full border-t border-gray-100" />
                <div className="w-full border-t border-gray-100" />
                <div className="w-full border-t border-gray-200" />
              </div>

              {/* Double Bar Pillars list */}
              <div className="flex-1 flex justify-around items-end z-10">
                {chartData.map((data, idx) => {
                  // Map heights proportionally (Max 400 = 100%)
                  const h1 = `${(data.val1 / 400) * 100}%`
                  const h2 = `${(data.val2 / 400) * 100}%`

                  return (
                    <div key={idx} className="flex items-end gap-1.5 h-full w-8">
                      {/* Bar 1 (Blue) */}
                      <div 
                        style={{ height: h1 }}
                        className="w-2.5 bg-blue-500 rounded-t-xs hover:bg-blue-600 transition-colors shadow-xs" 
                        title={`Vol 1: ${data.val1}`}
                      />
                      {/* Bar 2 (Green) */}
                      <div 
                        style={{ height: h2 }}
                        className="w-2.5 bg-teal-400 rounded-t-xs hover:bg-teal-500 transition-colors shadow-xs"
                        title={`Vol 2: ${data.val2}`}
                      />
                    </div>
                  )
                })}
              </div>

            </div>

            {/* X-axis Labels */}
            <div className="flex gap-4 mt-2">
              <div className="w-8 shrink-0" /> {/* Y-axis spacing */}
              <div className="flex-1 flex justify-around text-[9px] font-bold text-gray-400 tracking-tight text-center">
                {chartData.map((data, idx) => (
                  <span key={idx} className="w-8 truncate">{data.branch}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Audit Log Feed */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <div className="border-b border-gray-50 pb-4 mb-4">
            <h2 className="text-base font-bold text-gray-900 tracking-tight">Recent Audit Log Feed</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-64 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 font-bold uppercase border-b border-gray-50 pb-2">
                  <th className="py-2 pr-2 font-bold tracking-wide">Time</th>
                  <th className="py-2 pr-2 font-bold tracking-wide">User Action</th>
                  <th className="py-2 font-bold tracking-wide">Impacted Entity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-600 font-medium">
                {auditLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-2.5 pr-2 whitespace-nowrap text-gray-400 font-semibold">{log.time}</td>
                    <td className="py-2.5 pr-2 text-gray-800 font-semibold leading-relaxed">{log.action}</td>
                    <td className="py-2.5 text-gray-500 font-mono text-[10px]">{log.entity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Quick Links section (Bottom row) */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold uppercase text-gray-800 tracking-wider">Quick Management Links</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Quick link 1 */}
          <div 
            onClick={() => setActiveTab('branches')}
            className="group flex justify-between items-center bg-blue-50/40 hover:bg-blue-50/80 border border-blue-100 p-5 rounded-2xl cursor-pointer shadow-xs transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center border border-blue-200">
                <BranchesCardIcon />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-gray-900">Configure Branches</div>
                <div className="text-[10px] text-gray-500 font-semibold mt-0.5">Configure Management module</div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition-colors">
              <ArrowRightIcon />
            </div>
          </div>

          {/* Quick link 2 */}
          <div 
            onClick={() => setActiveTab('users')}
            className="group flex justify-between items-center bg-blue-50/40 hover:bg-blue-50/80 border border-blue-100 p-5 rounded-2xl cursor-pointer shadow-xs transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center border border-blue-200">
                <UsersCardIcon />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-gray-900">Manage Users</div>
                <div className="text-[10px] text-gray-500 font-semibold mt-0.5">Manage User modules</div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition-colors">
              <ArrowRightIcon />
            </div>
          </div>

          {/* Quick link 3 */}
          <div 
            onClick={() => setActiveTab('roles')}
            className="group flex justify-between items-center bg-teal-50/40 hover:bg-teal-50/80 border border-teal-100 p-5 rounded-2xl cursor-pointer shadow-xs transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center border border-teal-200">
                <RolesCardIcon />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-gray-900">Define Roles</div>
                <div className="text-[10px] text-gray-500 font-semibold mt-0.5">Define Management Modules</div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-sm group-hover:bg-teal-700 transition-colors">
              <ArrowRightIcon />
            </div>
          </div>

          {/* Quick link 4 */}
          <div 
            onClick={() => setActiveTab('catalog')}
            className="group flex justify-between items-center bg-teal-50/40 hover:bg-teal-50/80 border border-teal-100 p-5 rounded-2xl cursor-pointer shadow-xs transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center border border-teal-200">
                <CatalogCardIcon />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-gray-900">Update Test Catalog</div>
                <div className="text-[10px] text-gray-500 font-semibold mt-0.5">Update Management Modules</div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-sm group-hover:bg-teal-700 transition-colors">
              <ArrowRightIcon />
            </div>
          </div>

          {/* Quick link 5 */}
          <div 
            onClick={() => setActiveTab('pricing')}
            className="group flex justify-between items-center bg-blue-50/40 hover:bg-blue-50/80 border border-blue-100 p-5 rounded-2xl cursor-pointer shadow-xs transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center border border-blue-200">
                <PricingCardIcon />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-gray-900">Set Pricing Matrix</div>
                <div className="text-[10px] text-gray-500 font-semibold mt-0.5">Set Pricing Matrix</div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition-colors">
              <ArrowRightIcon />
            </div>
          </div>

          {/* Quick link 6 */}
          <div 
            onClick={() => setActiveTab('ranges')}
            className="group flex justify-between items-center bg-teal-50/40 hover:bg-teal-50/80 border border-teal-100 p-5 rounded-2xl cursor-pointer shadow-xs transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center border border-teal-200">
                <ReferenceCardIcon />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-gray-900">View Reference Ranges</div>
                <div className="text-[10px] text-gray-500 font-semibold mt-0.5">View Reference Ranges module</div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-sm group-hover:bg-teal-700 transition-colors">
              <ArrowRightIcon />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
