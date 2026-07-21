import React, { useState } from 'react'

// Icon components for Top Action Cards
const UserPenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1a5fb4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 shrink-0">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M16 11l2 2 4-4" />
  </svg>
)

const CalendarPenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1a5fb4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 shrink-0">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M12 14l2 2 4-4" />
  </svg>
)

const TrackReportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1a5fb4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 shrink-0">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <circle cx="10.5" cy="14.5" r="2.5" />
    <line x1="12.5" y1="16.5" x2="15" y2="19" />
  </svg>
)

export default function Dashboard({ setActiveTab }) {
  const [selectedTests, setSelectedTests] = useState([
    { id: 1, name: 'Test Name', code: 'CBC', price: 30.0, checked: true },
    { id: 2, name: 'Test Name', code: 'CBC', price: 30.0, checked: true },
    { id: 3, name: 'Glucose', code: 'CBC', price: 25.0, checked: false },
    { id: 4, name: 'Lipid Panel', code: 'Lipid Panel', price: 10.0, checked: false },
  ])

  const toggleTest = (id) => {
    setSelectedTests(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t))
  }

  const activities = [
    'Registered: John Doe',
    'Booked Test: Jane Smith - CBC',
    'Booked Test: Jane Smith - CBC',
    'Booked Test: Jane Smith - ID: 12345)',
    'Booked Test: Jane Smith - CBC',
    'Registered: Jane Smith - CBC',
    'Registered: John Doe',
    'Registered: John Doe',
    'Booked Test: Jane Smith - CBC',
    'Booked Test: Jane Smith - CBC',
    'Registered: John Doe',
  ]

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-5 font-sans" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
      {/* Title */}
      <h2 className="text-xl font-black tracking-tight text-slate-900">
        Patient Workflow Dashboard
      </h2>

      {/* Row 1: Top 3 Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div
          onClick={() => setActiveTab && setActiveTab('registration')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-4 cursor-pointer hover:shadow-md transition-all"
        >
          <UserPenIcon />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">REGISTER NEW PATIENT</h3>
            <p className="text-xs text-slate-500 font-medium">Register new patient new patient.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => setActiveTab && setActiveTab('booking')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-4 cursor-pointer hover:shadow-md transition-all"
        >
          <CalendarPenIcon />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">BOOK TESTS</h3>
            <p className="text-xs text-slate-500 font-medium">Book action: to want book tests.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => setActiveTab && setActiveTab('reports')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-4 cursor-pointer hover:shadow-md transition-all"
        >
          <TrackReportIcon />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">TRACK REPORTS</h3>
            <p className="text-xs text-slate-500 font-medium">Track reports ahond track reports.</p>
          </div>
        </div>
      </div>

      {/* Row 2: Horizontal Chevron Progress Stepper */}
      <div className="flex items-center w-full overflow-x-auto text-xs font-extrabold py-1 select-none">
        <div className="flex-1 min-w-[120px] py-2.5 px-4 text-center text-white font-bold rounded-l-lg" style={{ backgroundColor: '#1a5fb4' }}>
          Registration
        </div>
        <div className="flex-1 min-w-[130px] py-2.5 px-4 text-center text-white font-bold" style={{ backgroundColor: '#14498c' }}>
          Test Booking ❯
        </div>
        <div className="flex-1 min-w-[130px] py-2.5 px-4 text-center font-bold" style={{ backgroundColor: '#dbeafe', color: '#1e3a8a' }}>
          Label Printing ❯
        </div>
        <div className="flex-1 min-w-[130px] py-2.5 px-4 text-center font-bold" style={{ backgroundColor: '#e2e8f0', color: '#475569' }}>
          Awaiting Report ❯
        </div>
        <div className="flex-1 min-w-[130px] py-2.5 px-4 text-center font-bold rounded-r-lg" style={{ backgroundColor: '#e2e8f0', color: '#475569' }}>
          Notify Patient
        </div>
      </div>

      {/* Row 3: Main Workspace (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Left Column: Recent Activity (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs h-[460px] overflow-y-auto">
          <h3 className="text-xs font-black tracking-wider text-slate-800 uppercase border-b border-slate-100 pb-2">
            RECENT ACTIVITY
          </h3>
          <div className="space-y-2">
            {activities.map((act, idx) => (
              <div
                key={idx}
                className="pl-3 py-1.5 border-l-4 border-[#1a5fb4] text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-r"
              >
                {act}
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: Current Action Test Order (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-xs">
          <h3 className="text-xs font-black text-slate-900 border-b border-slate-100 pb-2">
            Current Action: Book Test Order (Jane Smith - ID: 12345)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            {/* Left part of middle card: ADD TEST */}
            <div className="md:col-span-7 space-y-3">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider">ADD TEST</h4>
              
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value="Search for dynamic wodown... ▾"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-600 outline-none cursor-pointer"
                />
                {/* Dropdown preview box */}
                <div className="mt-1 border border-slate-200 rounded-lg overflow-hidden shadow-xs text-xs font-semibold bg-white">
                  <div className="flex justify-between px-3 py-1.5 bg-[#1a5fb4] text-white">
                    <span>CBC</span>
                    <span>$28.00</span>
                  </div>
                  <div className="flex justify-between px-3 py-1.5 text-slate-700 hover:bg-slate-50">
                    <span>Glucose</span>
                    <span>$25.00</span>
                  </div>
                  <div className="flex justify-between px-3 py-1.5 text-slate-700 hover:bg-slate-50">
                    <span>Lipid Panel</span>
                    <span>$15.00</span>
                  </div>
                </div>
              </div>

              {/* TESTS SELECTED */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
                  <span>TESTS SELECTED</span>
                  <span className="text-slate-400">Dynamically</span>
                </div>
                <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100/80 text-[10px] font-bold text-slate-600 border-b border-slate-200">
                        <th className="p-1.5 w-6 text-center"></th>
                        <th className="p-1.5">Test Name</th>
                        <th className="p-1.5">Code</th>
                        <th className="p-1.5 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {selectedTests.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50">
                          <td className="p-1.5 text-center">
                            <input
                              type="checkbox"
                              checked={t.checked}
                              onChange={() => toggleTest(t.id)}
                              className="accent-[#1a5fb4] rounded cursor-pointer"
                            />
                          </td>
                          <td className="p-1.5 text-slate-800 font-semibold">{t.name}</td>
                          <td className="p-1.5 text-slate-500 font-mono text-[10px]">{t.code}</td>
                          <td className="p-1.5 text-right text-slate-900 font-bold">${t.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Billing Totals */}
              <div className="text-xs space-y-1 border-t border-slate-100 pt-2 font-bold text-slate-700">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span>$130.00</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>TAX</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-sm pt-1">
                  <span>PROVISIONAL INVOICE TOTAL</span>
                  <span>$133.00</span>
                </div>
              </div>

              <button className="w-full py-2 bg-[#1a5fb4] hover:bg-[#14498c] text-white text-xs font-bold rounded-lg transition shadow-xs cursor-pointer">
                Generate Provisional Invoice
              </button>
            </div>

            {/* Right part of middle card: PRINT BARCODES/LABELS */}
            <div className="md:col-span-5 rounded-xl p-3.5 space-y-3" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">PRINT BARCODES/LABELS</h4>
              
              <div className="space-y-1 text-xs font-semibold text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="labelOption" defaultChecked className="accent-[#1a5fb4]" />
                  <span>All Selected Tests</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="labelOption" className="accent-[#1a5fb4]" />
                  <span>All Selected Tests</span>
                </label>
              </div>

              <div className="flex justify-between items-center text-[10px] font-black text-slate-800 uppercase pt-2">
                <span>PREVIEW</span>
                <span className="text-sky-600 underline cursor-pointer">Preview</span>
              </div>

              {/* Barcode Sticker Box */}
              <div className="bg-white border border-slate-300 rounded-lg p-3 text-center space-y-1 shadow-2xs font-mono">
                {/* Barcode graphic */}
                <div className="flex items-center justify-center gap-0.5 py-1">
                  <div className="w-1.5 h-10 bg-slate-900"></div>
                  <div className="w-0.5 h-10 bg-slate-900"></div>
                  <div className="w-2 h-10 bg-slate-900"></div>
                  <div className="w-1 h-10 bg-slate-900"></div>
                  <div className="w-0.5 h-10 bg-slate-900"></div>
                  <div className="w-1.5 h-10 bg-slate-900"></div>
                  <div className="w-2 h-10 bg-slate-900"></div>
                </div>
                <p className="text-[9px] text-slate-500 tracking-wider">109409880400</p>
                <p className="text-xs font-sans font-bold text-slate-900">Patient Name</p>
                <p className="text-[10px] font-sans text-slate-600">ID: 12345</p>
                <p className="text-[10px] font-sans text-slate-600">Test Code</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Report Status & Ready Reports (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Card 1: Report Status Filter */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5 shadow-xs">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Report Status</h3>
            <input
              type="text"
              placeholder="Patient Name/ID"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-700 outline-none"
            />
            <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-700 outline-none cursor-pointer">
              <option>Test ▾</option>
            </select>
            <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-700 outline-none cursor-pointer">
              <option>Status (Report Ready / Pending) ▾</option>
            </select>
          </div>

          {/* Card 2: READY REPORTS Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">READY REPORTS</h3>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-[10px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <th className="p-1.5">Patient Name</th>
                    <th className="p-1.5">Test(s)</th>
                    <th className="p-1.5">Ready Time</th>
                    <th className="p-1.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr className="hover:bg-slate-50">
                    <td className="p-1.5 font-bold text-slate-900">Jane Smith</td>
                    <td className="p-1.5 text-slate-600">Test Name</td>
                    <td className="p-1.5 text-slate-600">12:50 AM</td>
                    <td className="p-1.5 text-center">
                      <button className="px-2 py-1 bg-[#1a5fb4] text-white text-[9px] font-bold rounded uppercase hover:bg-[#14498c] cursor-pointer">
                        NOTIFY PATIENT (SMS/EMAIL)
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-1.5 font-bold text-slate-900">John Doe</td>
                    <td className="p-1.5 text-slate-600">Ready / Status</td>
                    <td className="p-1.5 text-slate-600">03:30 AM</td>
                    <td className="p-1.5 text-center">
                      <button className="px-2 py-1 bg-[#1a5fb4] text-white text-[9px] font-bold rounded uppercase hover:bg-[#14498c] cursor-pointer">
                        PRINT RECEIPT
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Row 4: SYSTEM PERMISSIONS Banner */}
      <div className="rounded-xl p-4 text-xs space-y-1 border" style={{ backgroundColor: '#dbeafe', borderColor: '#93c5fd', color: '#1e3a8a' }}>
        <h4 className="font-black text-slate-900 tracking-wider">SYSTEM PERMISSIONS</h4>
        <p className="font-semibold text-slate-700">
          Access limited to Front Desk, Test Booking, Label Printing, Report Status. Clinical / Result modules locked.
        </p>
        <p className="font-bold text-slate-900">
          NOT PERMITTED: Result Entry, Doctor Consultations, Patient Medical History
        </p>
      </div>
    </div>
  )
}
