import React, { useState, useEffect } from 'react'

export default function LabelPrinting() {
  const defaultQueue = [
    { patient: 'Jane Smith', id: '12345', barcode: '109409880400', test: 'CBC', tube: 'Purple Top (EDTA)', volume: '2 ml', time: '10:15 AM', status: 'Pending Print' },
    { patient: 'John Doe', id: '1029', barcode: '109409880401', test: 'Lipid Panel', tube: 'Red Top (Plain)', volume: '2 ml', time: '09:45 AM', status: 'Pending Print' },
    { patient: 'Arthur Pendragon', id: '901', barcode: '109409880402', test: 'Liver Function', tube: 'Yellow Top (SST)', volume: '3 ml', time: '08:30 AM', status: 'Pending Print' },
  ]

  const [labelQueue, setLabelQueue] = useState(defaultQueue)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTubeFilter, setSelectedTubeFilter] = useState('All')

  // Sync with localStorage registered patients if any
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lims_registered_patients')
      if (saved) {
        const parsed = JSON.parse(saved)
        const customItems = parsed.map((p, idx) => ({
          patient: p.name,
          id: p.id,
          barcode: `10940988${403 + idx}`,
          test: 'General Diagnostic Panel',
          tube: 'Purple Top (EDTA)',
          volume: '2 ml',
          time: p.time || '11:00 AM',
          status: 'Pending Print'
        }))
        // Merge without duplicating
        const existingIds = new Set(defaultQueue.map(q => q.id))
        const newOnly = customItems.filter(ci => !existingIds.has(ci.id))
        setLabelQueue([...defaultQueue, ...newOnly])
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  // Modals & Toast State
  const [toastMessage, setToastMessage] = useState('')
  const [activeModalItem, setActiveModalItem] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 4000)
  }

  const handlePrintLabel = (item) => {
    setLabelQueue(prev =>
      prev.map(q => q.barcode === item.barcode ? { ...q, status: 'Printed' } : q)
    )
    showToast(`Thermal sticker printed for ${item.patient} (${item.barcode})`)
    setActiveModalItem(null)
  }

  const handlePrintAll = () => {
    setLabelQueue(prev => prev.map(q => ({ ...q, status: 'Printed' })))
    showToast(`All ${labelQueue.length} thermal specimen labels sent to printer!`)
  }

  // Filter Queue
  const filteredQueue = labelQueue.filter(item => {
    const matchesSearch =
      item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.test.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTube = selectedTubeFilter === 'All' || item.tube.includes(selectedTubeFilter)
    return matchesSearch && matchesTube
  })

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

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Label &amp; Barcode Printing</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">Generate thermal specimen barcode labels for specimen tubes and collection containers</p>
        </div>
        <button
          onClick={handlePrintAll}
          className="bg-[#1a5fb4] hover:bg-[#14498c] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs cursor-pointer shrink-0"
        >
          🖨️ Print All Queue Labels ({filteredQueue.length})
        </button>
      </div>

      {/* Controls & Filter Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs shadow-2xs">
        <div>
          <input
            type="text"
            placeholder="Filter Patient Name, ID, or Barcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold outline-none focus:border-[#1a5fb4]"
          />
        </div>
        <div>
          <select
            value={selectedTubeFilter}
            onChange={(e) => setSelectedTubeFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold outline-none cursor-pointer"
          >
            <option value="All">Specimen Tube: All</option>
            <option value="Purple">Purple Top (EDTA)</option>
            <option value="Red">Red Top (Plain)</option>
            <option value="Yellow">Yellow Top (SST)</option>
          </select>
        </div>
      </div>

      {/* Grid of Specimen Stickers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredQueue.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs text-center font-mono relative flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider">
                  SPECIMEN STICKER #{idx + 1}
                </span>
                <span className={`text-[9px] font-sans font-black px-2 py-0.5 rounded-full ${
                  item.status === 'Printed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.status}
                </span>
              </div>
              
              {/* Sticker Preview Box */}
              <div
                onClick={() => setActiveModalItem(item)}
                className="bg-slate-50 border border-slate-300 rounded-lg p-4 space-y-1 cursor-pointer hover:border-[#1a5fb4] transition-all"
              >
                {/* Barcode Graphic */}
                <div className="flex items-center justify-center gap-0.5 py-1">
                  <div className="w-1.5 h-12 bg-slate-900"></div>
                  <div className="w-0.5 h-12 bg-slate-900"></div>
                  <div className="w-2 h-12 bg-slate-900"></div>
                  <div className="w-1 h-12 bg-slate-900"></div>
                  <div className="w-0.5 h-12 bg-slate-900"></div>
                  <div className="w-1.5 h-12 bg-slate-900"></div>
                  <div className="w-2 h-12 bg-slate-900"></div>
                </div>
                <p className="text-xs text-slate-500 tracking-wider font-bold">{item.barcode}</p>
                <p className="text-sm font-sans font-black text-slate-900">{item.patient}</p>
                <p className="text-xs font-sans text-slate-600">ID: {item.id} • Test: {item.test}</p>
                <p className="text-[10px] font-sans text-slate-400 pt-1 border-t border-slate-200">{item.tube} ({item.volume})</p>
              </div>
            </div>

            <button
              onClick={() => handlePrintLabel(item)}
              className="w-full py-2 bg-[#1a5fb4] hover:bg-[#14498c] text-white text-xs font-bold rounded-lg transition shadow-xs cursor-pointer"
            >
              Print Thermal Label
            </button>
          </div>
        ))}
      </div>

      {/* PRINT MODAL PREVIEW */}
      {activeModalItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-left">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col font-sans">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="text-sm font-black">Specimen Barcode Thermal Sticker</h3>
              <button onClick={() => setActiveModalItem(null)} className="text-white font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4 text-center">
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-5 space-y-2 font-mono">
                <div className="flex items-center justify-center gap-0.5 py-2">
                  <div className="w-2 h-14 bg-slate-900"></div>
                  <div className="w-0.5 h-14 bg-slate-900"></div>
                  <div className="w-2.5 h-14 bg-slate-900"></div>
                  <div className="w-1 h-14 bg-slate-900"></div>
                  <div className="w-0.5 h-14 bg-slate-900"></div>
                  <div className="w-2 h-14 bg-slate-900"></div>
                  <div className="w-3 h-14 bg-slate-900"></div>
                </div>
                <p className="text-xs text-slate-500 font-bold tracking-wider">{activeModalItem.barcode}</p>
                <p className="text-base font-sans font-black text-slate-900">{activeModalItem.patient}</p>
                <p className="text-xs font-sans text-slate-600 font-bold">ID: {activeModalItem.id} • Test: {activeModalItem.test}</p>
                <p className="text-[11px] font-sans text-indigo-700 bg-indigo-50 border border-indigo-100 rounded py-1 px-2 font-bold">
                  {activeModalItem.tube} • Min: {activeModalItem.volume}
                </p>
              </div>

              <button
                onClick={() => handlePrintLabel(activeModalItem)}
                className="w-full py-2.5 bg-[#1a5fb4] hover:bg-[#14498c] text-white text-xs font-bold rounded-lg transition shadow-xs cursor-pointer"
              >
                Trigger Thermal Sticker Printer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
