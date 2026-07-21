import React, { useState } from 'react'

export default function TestBooking() {
  const [patient, setPatient] = useState('Jane Smith - ID: 12345')
  const [testSearch, setTestSearch] = useState('')
  const [selectedTests, setSelectedTests] = useState([
    { id: 'CBC', name: 'Complete Blood Count (CBC)', price: 30.0 },
    { id: 'LIPID', name: 'Lipid Panel Profile', price: 45.0 },
  ])

  const availableTests = [
    { id: 'CBC', name: 'Complete Blood Count (CBC)', price: 30.0 },
    { id: 'LIPID', name: 'Lipid Panel Profile', price: 45.0 },
    { id: 'GLU', name: 'Fasting Blood Glucose', price: 15.0 },
    { id: 'LFT', name: 'Liver Function Test (LFT)', price: 50.0 },
    { id: 'KFT', name: 'Kidney Function Test (KFT)', price: 40.0 },
    { id: 'THY', name: 'Thyroid Profile (T3, T4, TSH)', price: 55.0 },
  ]

  const addTest = (t) => {
    if (!selectedTests.find(st => st.id === t.id)) {
      setSelectedTests([...selectedTests, t])
    }
  }

  const removeTest = (id) => {
    setSelectedTests(selectedTests.filter(t => t.id !== id))
  }

  const subtotal = selectedTests.reduce((acc, t) => acc + t.price, 0)

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Test Booking & Order Entry</h2>
        <p className="text-xs text-slate-500 font-semibold mt-1">Book diagnostic test orders, select lab parameters, and generate provisional invoices</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Tests Search */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Select Tests for Patient
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Target Patient</label>
            <select
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-[#1a5fb4]"
            >
              <option>Jane Smith - ID: 12345</option>
              <option>John Doe - ID: 1029</option>
              <option>Arthur Pendragon - ID: 901</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Search Catalog</label>
            <input
              type="text"
              placeholder="Type test name or code..."
              value={testSearch}
              onChange={(e) => setTestSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-[#1a5fb4]"
            />
          </div>

          <div className="space-y-2 pt-2">
            {availableTests
              .filter(t => t.name.toLowerCase().includes(testSearch.toLowerCase()) || t.id.toLowerCase().includes(testSearch.toLowerCase()))
              .map(t => (
                <div key={t.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between hover:bg-slate-50">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{t.name}</p>
                    <p className="text-[10px] font-mono text-slate-500">Code: {t.id} • ${t.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => addTest(t)}
                    className="px-3 py-1 bg-[#1a5fb4] hover:bg-[#14498c] text-white rounded text-xs font-bold transition cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Selected Order Summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Order Summary: {patient}
            </h3>

            <div className="space-y-2">
              {selectedTests.map(st => (
                <div key={st.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{st.name}</p>
                    <p className="text-[10px] font-mono text-slate-500">Code: {st.id}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-900">${st.price.toFixed(2)}</span>
                    <button
                      onClick={() => removeTest(st.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-3">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>SUBTOTAL:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>TAX (0%):</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900">
              <span>TOTAL PAYABLE:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <button className="w-full py-3 bg-[#1a5fb4] hover:bg-[#14498c] text-white rounded-xl text-sm font-bold transition shadow-xs cursor-pointer">
              Generate Provisional Invoice & Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
