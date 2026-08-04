import React, { useState, useEffect } from 'react'

export default function TestBooking() {
  // Load registered patients from localStorage or use default list
  const defaultPatientList = [
    'Jane Smith - ID: 12345',
    'John Doe - ID: 1029',
    'Arthur Pendragon - ID: 901'
  ]

  const [patientOptions, setPatientOptions] = useState(defaultPatientList)
  const [selectedPatient, setSelectedPatient] = useState('Jane Smith - ID: 12345')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lims_registered_patients')
      if (saved) {
        const parsed = JSON.parse(saved)
        const formatted = parsed.map(p => `${p.name} - ID: ${p.id}`)
        // Combine with defaults ensuring uniqueness
        const combined = Array.from(new Set([...defaultPatientList, ...formatted]))
        setPatientOptions(combined)
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const [testSearch, setTestSearch] = useState('')
  
  // Selected Tests State
  const [selectedTests, setSelectedTests] = useState([
    { id: 'CBC', name: 'Complete Blood Count (CBC)', price: 30.0 },
    { id: 'LIPID', name: 'Lipid Panel Profile', price: 45.0 },
  ])

  // Complete Available Tests Catalog
  const availableTests = [
    { id: 'CBC', name: 'Complete Blood Count (CBC)', price: 30.0, category: 'Hematology' },
    { id: 'LIPID', name: 'Lipid Panel Profile', price: 45.0, category: 'Biochemistry' },
    { id: 'GLU', name: 'Fasting Blood Glucose', price: 15.0, category: 'Biochemistry' },
    { id: 'LFT', name: 'Liver Function Test (LFT)', price: 50.0, category: 'Biochemistry' },
    { id: 'KFT', name: 'Kidney Function Test (KFT)', price: 40.0, category: 'Biochemistry' },
    { id: 'THY', name: 'Thyroid Profile (T3, T4, TSH)', price: 55.0, category: 'Serology' },
    { id: 'PAT', name: 'Histopathology Biopsy', price: 120.0, category: 'Pathology' },
    { id: 'MIC', name: 'Urine Culture & Sensitivity', price: 35.0, category: 'Microbiology' }
  ]

  // Toast & Modal State
  const [toastMessage, setToastMessage] = useState('')
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 4000)
  }

  const addTest = (t) => {
    if (!selectedTests.find(st => st.id === t.id)) {
      setSelectedTests([...selectedTests, { id: t.id, name: t.name, price: t.price }])
      showToast(`Added ${t.name} to order summary.`)
    }
  }

  const removeTest = (id) => {
    const target = selectedTests.find(st => st.id === id)
    setSelectedTests(selectedTests.filter(t => t.id !== id))
    if (target) {
      showToast(`Removed ${target.name} from order summary.`)
    }
  }

  const subtotal = selectedTests.reduce((acc, t) => acc + t.price, 0)
  const tax = 0.0
  const totalPayable = subtotal + tax

  const handleGenerateInvoice = () => {
    if (selectedTests.length === 0) {
      showToast('Please add at least one test to generate an invoice.')
      return
    }
    setShowInvoiceModal(true)
  }

  const handleConfirmInvoice = () => {
    setShowInvoiceModal(false)
    showToast(`Provisional Invoice generated successfully for ${selectedPatient} ($${totalPayable.toFixed(2)})`)
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans text-left" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center justify-between animate-fade-in transition-all text-xs font-bold">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white font-bold cursor-pointer">✕</button>
        </div>
      )}

      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Test Booking &amp; Order Entry</h2>
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
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 font-bold outline-none focus:border-[#1a5fb4] cursor-pointer"
            >
              {patientOptions.map((p, idx) => (
                <option key={idx} value={p}>{p}</option>
              ))}
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

          <div className="space-y-2 pt-2 max-h-96 overflow-y-auto pr-1">
            {availableTests
              .filter(t => t.name.toLowerCase().includes(testSearch.toLowerCase()) || t.id.toLowerCase().includes(testSearch.toLowerCase()))
              .map(t => {
                const isAdded = selectedTests.some(st => st.id === t.id)
                return (
                  <div key={t.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{t.name}</p>
                      <p className="text-[10px] font-mono text-slate-500">Code: {t.id} • ${t.price.toFixed(2)}</p>
                    </div>
                    {isAdded ? (
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-bold">
                        ✓ Added
                      </span>
                    ) : (
                      <button
                        onClick={() => addTest(t)}
                        className="px-3.5 py-1 bg-[#1a5fb4] hover:bg-[#14498c] text-white rounded text-xs font-bold transition cursor-pointer"
                      >
                        + Add
                      </button>
                    )}
                  </div>
                )
              })}
          </div>
        </div>

        {/* Selected Order Summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Order Summary: {selectedPatient}
            </h3>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {selectedTests.length === 0 ? (
                <p className="text-xs text-slate-400 font-bold py-6 text-center">No tests selected yet. Add tests from catalog.</p>
              ) : (
                selectedTests.map(st => (
                  <div key={st.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{st.name}</p>
                      <p className="text-[10px] font-mono text-slate-500">Code: {st.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-900">${st.price.toFixed(2)}</span>
                      <button
                        onClick={() => removeTest(st.id)}
                        className="text-red-500 hover:text-red-700 font-bold text-xs cursor-pointer px-1.5 py-0.5 rounded hover:bg-red-50"
                        title="Remove Test"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
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
            <div className="flex justify-between text-base font-black text-slate-900 pt-1 border-t border-slate-100">
              <span>TOTAL PAYABLE:</span>
              <span className="text-[#1a5fb4]">${totalPayable.toFixed(2)}</span>
            </div>

            <button
              onClick={handleGenerateInvoice}
              className="w-full py-3 bg-[#1a5fb4] hover:bg-[#14498c] text-white rounded-xl text-sm font-bold transition shadow-xs cursor-pointer"
            >
              Generate Provisional Invoice &amp; Proceed
            </button>
          </div>
        </div>
      </div>

      {/* PROVISIONAL INVOICE MODAL */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-left">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col font-sans">
            <div className="p-5 bg-[#1a5fb4] text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-200">Official Diagnostic Invoice</span>
                <h3 className="text-base font-black tracking-tight">Provisional Invoice: {selectedPatient}</h3>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} className="text-white font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-3">
                <div>
                  <p className="font-bold text-slate-900">Target Patient: {selectedPatient}</p>
                  <p className="text-[10px] text-slate-500 font-mono">Invoice Date: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Status: Pending Settlement
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-extrabold uppercase text-slate-400 text-[10px]">Itemized Booked Tests</p>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-bold text-slate-600 border-b border-slate-200">
                        <th className="p-2">Test Name</th>
                        <th className="p-2">Code</th>
                        <th className="p-2 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedTests.map((t, idx) => (
                        <tr key={idx}>
                          <td className="p-2 font-bold text-slate-800">{t.name}</td>
                          <td className="p-2 font-mono text-[10px] text-slate-500">{t.id}</td>
                          <td className="p-2 text-right font-bold text-slate-900">${t.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-100 font-bold text-slate-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-200">
                  <span>Total Payable</span>
                  <span className="text-[#1a5fb4]">${totalPayable.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmInvoice}
                  className="px-5 py-2 font-bold text-white bg-[#1a5fb4] hover:bg-[#14498c] rounded-lg shadow-xs cursor-pointer"
                >
                  Confirm &amp; Finalize Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
