import React, { useState, useEffect } from 'react'

export default function BarcodeLinking() {
  const defaultPatients = [
    'S. Ghosh (Home visit - 10:00 AM)',
    'R. Banerjee (In-lab - 11:30 AM)',
    'M. Das (Home visit - 01:00 PM)',
    'A. Sharma (Home visit - 08:30 AM)',
    'P. Nair (In-lab - 09:15 AM)'
  ]

  const [patientOptions, setPatientOptions] = useState(defaultPatients)
  const [patientId, setPatientId] = useState('S. Ghosh (Home visit - 10:00 AM)')
  const [barcode, setBarcode] = useState('')
  const [tubeType, setTubeType] = useState('EDTA (Purple Top)')

  const [linkedList, setLinkedList] = useState([
    { id: 'BC-10234', patient: 'A. Sharma', tube: 'SST (Gold Top)', time: '08:35 AM', status: 'Linked & Verified' },
    { id: 'BC-10235', patient: 'P. Nair', tube: 'Sodium Fluoride (Grey)', time: '09:20 AM', status: 'Linked & Verified' },
  ])

  // Toast & Modal State
  const [toastMessage, setToastMessage] = useState('')
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 4000)
  }

  // Load newly registered patients from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lims_registered_patients')
      if (saved) {
        const parsed = JSON.parse(saved)
        const customNames = parsed.map(p => `${p.name} (Walk-in Today)`)
        setPatientOptions(Array.from(new Set([...defaultPatients, ...customNames])))
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  // Auto-generate barcode helper
  const handleAutoGenerateBarcode = () => {
    const randomBC = `BC-${Math.floor(10000 + Math.random() * 90000)}`
    setBarcode(randomBC)
    showToast(`Barcode scanner simulated: Generated ${randomBC}`)
  }

  const handleLink = (e) => {
    e.preventDefault()
    if (!barcode.trim()) {
      showToast('Please scan or enter a barcode string before linking.')
      return
    }
    const cleanBarcode = barcode.toUpperCase()
    const patientNameClean = patientId.split(' (')[0]

    const newItem = {
      id: cleanBarcode,
      patient: patientNameClean,
      tube: tubeType,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Linked & Verified'
    }
    setLinkedList([newItem, ...linkedList])
    showToast(`Vial Barcode ${cleanBarcode} linked to ${patientNameClean} (${tubeType}) successfully!`)
    setBarcode('')
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 font-sans text-left" style={{ backgroundColor: '#141416', color: '#ffffff' }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-sky-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center justify-between animate-fade-in transition-all text-xs font-bold">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Barcode Linking</h2>
        <p className="text-xs font-semibold mt-1" style={{ color: '#9ca3af' }}>Scan vial barcodes to associate physical samples with patient records</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Link Form */}
        <div className="rounded-2xl p-5 sm:p-6 space-y-5" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <h3 className="text-base font-bold text-white">Link New Sample Vial</h3>
            <span className="text-[10px] font-bold text-sky-400 bg-sky-950 border border-sky-800 px-2 py-0.5 rounded-full">
              Scanner Active
            </span>
          </div>

          <form onSubmit={handleLink} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9ca3af' }}>Target Patient</label>
              <select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-bold outline-none cursor-pointer"
                style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
              >
                {patientOptions.map((p, idx) => (
                  <option key={idx} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9ca3af' }}>Vial Tube Type</label>
              <select
                value={tubeType}
                onChange={(e) => setTubeType(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-bold outline-none cursor-pointer"
                style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
              >
                <option value="EDTA (Purple Top)">EDTA (Purple Top)</option>
                <option value="SST Gel (Gold Top)">SST Gel (Gold Top)</option>
                <option value="Sodium Citrate (Blue Top)">Sodium Citrate (Blue Top)</option>
                <option value="Sodium Fluoride (Grey Top)">Sodium Fluoride (Grey Top)</option>
                <option value="Plain Serum (Red Top)">Plain Serum (Red Top)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: '#9ca3af' }}>Barcode String</label>
                <button
                  type="button"
                  onClick={handleAutoGenerateBarcode}
                  className="text-[10px] font-bold text-sky-400 hover:text-sky-300 underline cursor-pointer"
                >
                  📷 Simulate Scanner Code
                </button>
              </div>
              <input
                type="text"
                placeholder="Scan or type BC-XXXXX"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none font-mono font-bold placeholder:text-gray-600 focus:border-sky-500"
                style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white rounded-xl text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer hover:bg-sky-700"
              style={{ backgroundColor: '#0284c7' }}
            >
              Link Barcode to Patient
            </button>
          </form>
        </div>

        {/* Recently Linked Samples */}
        <div className="rounded-2xl p-5 sm:p-6 space-y-4" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <h3 className="text-base font-bold text-white">Recently Linked Barcodes</h3>
            <span className="text-[10px] font-bold text-gray-400">{linkedList.length} Samples Linked</span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {linkedList.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:border-sky-500/50"
                style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-mono font-extrabold" style={{ color: '#38bdf8' }}>{item.id}</p>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-xs font-bold text-white mt-0.5">{item.patient}</p>
                  <p className="text-xs font-medium" style={{ color: '#9ca3af' }}>{item.tube}</p>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full self-start sm:self-center"
                  style={{ backgroundColor: 'rgba(6, 78, 59, 0.6)', color: '#34d399', border: '1px solid rgba(6, 95, 70, 0.4)' }}
                >
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
