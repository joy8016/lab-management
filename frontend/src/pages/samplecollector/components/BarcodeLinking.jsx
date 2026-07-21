import React, { useState } from 'react'

export default function BarcodeLinking() {
  const [patientId, setPatientId] = useState('S. Ghosh')
  const [barcode, setBarcode] = useState('')
  const [tubeType, setTubeType] = useState('EDTA (Purple Top)')
  const [linkedList, setLinkedList] = useState([
    { id: 'BC-10234', patient: 'A. Sharma', tube: 'SST (Gold Top)', time: '08:35 AM' },
    { id: 'BC-10235', patient: 'P. Nair', tube: 'Sodium Fluoride (Grey)', time: '09:20 AM' },
  ])

  const handleLink = (e) => {
    e.preventDefault()
    if (!barcode.trim()) return
    const newItem = {
      id: barcode.toUpperCase(),
      patient: patientId,
      tube: tubeType,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setLinkedList([newItem, ...linkedList])
    setBarcode('')
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-7 font-sans" style={{ backgroundColor: '#141416', color: '#ffffff' }}>
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">Barcode Linking</h2>
        <p className="text-xs font-semibold mt-1" style={{ color: '#9ca3af' }}>Scan vial barcodes to associate physical samples with patient records</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Link Form */}
        <div className="rounded-2xl p-6 space-y-5" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
          <h3 className="text-base font-bold text-white">Link New Sample Vial</h3>

          <form onSubmit={handleLink} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9ca3af' }}>Patient</label>
              <select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
              >
                <option>S. Ghosh (Home visit - 10:00 AM)</option>
                <option>R. Banerjee (In-lab - 11:30 AM)</option>
                <option>M. Das (Home visit - 01:00 PM)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9ca3af' }}>Vial Tube Type</label>
              <select
                value={tubeType}
                onChange={(e) => setTubeType(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
              >
                <option>EDTA (Purple Top)</option>
                <option>SST Gel (Gold Top)</option>
                <option>Sodium Citrate (Blue Top)</option>
                <option>Sodium Fluoride (Grey Top)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9ca3af' }}>Barcode String</label>
              <input
                type="text"
                placeholder="Scan or type BC-XXXXX"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none font-mono font-bold"
                style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white rounded-xl text-sm font-bold transition shadow-sm cursor-pointer"
              style={{ backgroundColor: '#0284c7' }}
            >
              Link Barcode to Patient
            </button>
          </form>
        </div>

        {/* Recently Linked Samples */}
        <div className="rounded-2xl p-6 space-y-4" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
          <h3 className="text-base font-bold text-white">Recently Linked Barcodes</h3>
          <div className="space-y-3">
            {linkedList.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl p-4 flex items-center justify-between"
                style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
              >
                <div>
                  <p className="text-sm font-mono font-extrabold" style={{ color: '#38bdf8' }}>{item.id}</p>
                  <p className="text-xs font-bold text-white mt-0.5">{item.patient}</p>
                  <p className="text-xs font-medium" style={{ color: '#9ca3af' }}>{item.tube}</p>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
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
