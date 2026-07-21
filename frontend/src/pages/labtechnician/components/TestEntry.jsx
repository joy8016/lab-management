import React, { useState } from 'react'
import PendingSamplesQueue from './PendingSamplesQueue'
import FlaggedResultsReview from './FlaggedResultsReview'

// Warning Icon
const WarningIcon = () => (
  <svg viewBox="0 0 20 20" fill="#e07a5f" className="w-4 h-4 mr-1 text-[#e07a5f] shrink-0">
    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
)

// Green Passed checkmark
const GreenCheckCircle = () => (
  <span className="w-4 h-4 rounded-full bg-[#10b981] flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
)

// Selected checkmark indicator (blue circle with check)
const BlueCheckCircle = () => (
  <span className="w-4 h-4 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
)

// Gear settings icon
const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#2563eb]">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

export default function TestEntry() {
  const [activeSubTab, setActiveSubTab] = useState('pending')
  const [selectedSample, setSelectedSample] = useState('LAB-23456')

  const subTabs = [
    { id: 'pending', label: 'Pending Samples (4)' },
    { id: 'active', label: 'Active Tests (8)' },
    { id: 'abnormal', label: 'Abnormal Review (3)' },
  ]

  const [testParams, setTestParams] = useState([
    { id: 1, name: 'WBC', instrument: 'Manual Entry/Interface', value: '14.5', units: '', refRange: 'FLAG FOR PATHOLOGIST REVIEW', status: 'flagged', isChecked: true },
    { id: 2, name: 'RBC', instrument: 'Manual Entry/Interface', value: '4.8', units: 'ug/L', refRange: '1.8 - 4.8', status: 'normal', isChecked: false },
    { id: 3, name: 'Hgb', instrument: 'Manual Entry/Interface', value: '13.9', units: 'ug/L', refRange: '13.9 - 13.9', status: 'pass', isChecked: true },
    { id: 4, name: 'Hct', instrument: 'Manual Entry/Interface', value: '41', units: '%', refRange: '41 - 41', status: 'pass', isChecked: true },
    { id: 5, name: 'Plt', instrument: 'Manual Entry/Interface', value: '280', units: 'ng/L', refRange: '280 - 280', status: 'pass', isChecked: true },
  ])

  const updateValue = (id, val) => {
    setTestParams(prev => prev.map(p => p.id === id ? { ...p, value: val } : p))
  }

  const toggleCheck = (id) => {
    setTestParams(prev => prev.map(p => p.id === id ? { ...p, isChecked: !p.isChecked } : p))
  }

  return (
    <div className="flex-1 overflow-y-auto p-5 font-sans" style={{ backgroundColor: '#f3f7fa' }}>
      {/* Title */}
      <h2 className="text-base font-extrabold text-slate-800 mb-3 tracking-tight">Test Result Entry</h2>

      {/* Sub Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 mb-4">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`pb-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeSubTab === tab.id
                ? 'text-[#1d4ed8] border-[#1d4ed8]'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sample Info Bar */}
      <div
        className="flex items-center justify-between border rounded px-5 py-2 mb-4"
        style={{ backgroundColor: '#e0f2fe', borderColor: '#bae6fd' }}
      >
        <div className="flex items-center gap-8 text-[11px] text-slate-800 font-bold">
          <span>Sample ID: <span className="text-slate-900 font-extrabold">LAB-23456</span></span>
          <span>Patient: <span className="text-slate-900 font-extrabold">John Doe</span></span>
          <span>DOB: <span className="text-slate-900 font-extrabold">05/12/1981</span></span>
          <span className="text-slate-900 font-extrabold">Male</span>
        </div>
        <button className="p-1 hover:bg-[#bae6fd] rounded transition cursor-pointer">
          <GearIcon />
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Left Column (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Card 1: Assigned Samples */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800">Test Entry</h3>
                <p className="text-[10px] text-slate-400 font-semibold">Assigned Samples</p>
              </div>
              <select className="text-[10px] font-bold bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-700 outline-none cursor-pointer">
                <option>Active workflow ▾</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="px-3 py-2 w-7"></th>
                    <th className="px-2 py-2 font-bold text-slate-500 uppercase tracking-wider">Sample ID</th>
                    <th className="px-2 py-2 font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                    <th className="px-2 py-2 font-bold text-slate-500 uppercase tracking-wider">Test Type</th>
                    <th className="px-2 py-2 font-bold text-slate-500 uppercase tracking-wider">Received Date ↓</th>
                    <th className="px-2 py-2 font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#e0f2fe]/60 border-t border-slate-100">
                    <td className="px-3 py-2.5">
                      <BlueCheckCircle />
                    </td>
                    <td className="px-2 py-2.5 font-bold text-slate-900">LAB-23456</td>
                    <td className="px-2 py-2.5 font-semibold text-slate-800">John Doe</td>
                    <td className="px-2 py-2.5 text-slate-600">CBC + Diff</td>
                    <td className="px-2 py-2.5 text-slate-600">05/12/1981</td>
                    <td className="px-2 py-2.5">
                      <span className="inline-flex px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe]">
                        Selected
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 2: LAB-23456 Parameter inputs */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 mb-1">LAB-23456</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200">
                    <th className="px-3 py-2 font-bold text-slate-500 uppercase tracking-wider">Test Parameter</th>
                    <th className="px-2 py-2 font-bold text-slate-500 uppercase tracking-wider w-44">Instrument</th>
                    <th className="px-2 py-2 font-bold text-slate-500 uppercase tracking-wider w-24">Value</th>
                    <th className="px-2 py-2 font-bold text-slate-500 uppercase tracking-wider">Units</th>
                    <th className="px-2 py-2 font-bold text-slate-500 uppercase tracking-wider">Reference Range</th>
                    <th className="px-2 py-2 font-bold text-slate-500 uppercase tracking-wider w-16 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {testParams.map((param) => {
                    const isFlagged = param.status === 'flagged'
                    return (
                      <tr key={param.id} className={isFlagged ? 'bg-[#ffebee]/65' : ''}>
                        <td className="px-3 py-2.5 font-bold text-slate-800">{param.name}</td>
                        <td className="px-2 py-2.5">
                          <select className="bg-white border border-slate-300 rounded px-2 py-1 text-[10px] text-slate-700 outline-none cursor-pointer focus:border-[#3b82f6] w-full max-w-[160px]">
                            <option>{param.instrument} ▾</option>
                          </select>
                        </td>
                        <td className="px-2 py-2.5">
                          <input
                            type="text"
                            value={param.value}
                            onChange={(e) => updateValue(param.id, e.target.value)}
                            className={`w-20 border rounded px-2.5 py-1 text-[10px] font-bold outline-none text-center ${
                              isFlagged
                                ? 'bg-white border-[#f59e0b] text-[#c05621] focus:border-[#f59e0b]'
                                : 'bg-white border-slate-300 text-slate-900 focus:border-[#3b82f6]'
                            }`}
                          />
                        </td>
                        <td className="px-2 py-2.5 text-slate-500 font-semibold">{param.units}</td>
                        <td className="px-2 py-2.5">
                          {isFlagged ? (
                            <div className="flex items-center text-[#c05621] font-bold text-[9px]">
                              <WarningIcon />
                              <span>{param.refRange}</span>
                            </div>
                          ) : (
                            <span className="text-slate-500 font-semibold">{param.refRange}</span>
                          )}
                        </td>
                        <td className="px-2 py-2.5 text-center">
                          {param.status === 'pass' ? (
                            <div className="flex items-center justify-center">
                              <GreenCheckCircle />
                            </div>
                          ) : (
                            <input
                              type="checkbox"
                              checked={param.isChecked}
                              onChange={() => toggleCheck(param.id)}
                              className="w-3.5 h-3.5 accent-[#2563eb] rounded cursor-pointer border-slate-350"
                            />
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Actions & Tooltips */}
          <div className="flex flex-col gap-3">
            {/* Top action level: QC Check and main blue buttons */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* QC Check Box */}
              <div className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-3 shadow-xs">
                <div className="leading-tight">
                  <h4 className="text-[10px] font-extrabold text-slate-800">QC Check</h4>
                  <p className="text-[9px] text-[#555] font-semibold">Hematology analyzer (Sysmex XN-1000)</p>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#10b981]">
                  <GreenCheckCircle />
                  <span>QC: Passed (Today 09:30 AM)</span>
                </div>
              </div>

              {/* Central buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-[#2563eb] text-[#2563eb] rounded text-[10px] font-bold transition cursor-pointer">
                  Save Progress
                </button>
                <button className="px-3.5 py-1.5 bg-white hover:bg-[#fff7ed] border border-[#f97316] text-[#c05621] rounded text-[10px] font-bold transition cursor-pointer">
                  Flag abnormal for Pathologist Review
                </button>
                <button className="px-4 py-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded text-[10px] font-bold transition shadow-xs cursor-pointer">
                  Submit for Approval
                </button>
              </div>

            </div>

            {/* Bottom action level: Pathologist Restricted Badge & Inactive Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 relative">
              {/* Floating label for approval restriction */}
              <div className="absolute right-[190px] -top-3.5 bg-[#1e293b] text-white text-[8px] font-semibold px-2 py-0.5 rounded shadow-sm select-none">
                Approval restricted to Pathologist role.
              </div>

              <button disabled className="px-4 py-1.5 bg-[#f1f5f9] text-slate-400 border border-slate-200 rounded text-[10px] font-semibold cursor-not-allowed">
                Approve
              </button>
              <button disabled className="px-4 py-1.5 bg-[#f1f5f9] text-slate-400 border border-slate-200 rounded text-[10px] font-semibold cursor-not-allowed">
                Release Report
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Sidebar widgets */}
        <div className="lg:col-span-1 space-y-4">
          <PendingSamplesQueue
            selectedSampleId={selectedSample}
            onSelectSample={setSelectedSample}
          />
          <FlaggedResultsReview />
        </div>
      </div>
    </div>
  )
}
