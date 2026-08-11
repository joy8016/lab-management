import React, { useState } from 'react'

export default function VitalsEntry() {
  const [patient, setPatient] = useState('')
  const [systolic, setSystolic] = useState('')
  const [diastolic, setDiastolic] = useState('')
  const [pulse, setPulse] = useState('')
  const [temp, setTemp] = useState('')
  const [fasting, setFasting] = useState('Fasting (8+ hrs)')
  const [savedLogs, setSavedLogs] = useState([])

  const handleSave = (e) => {
    e.preventDefault()
    const newLog = {
      patient,
      bp: `${systolic}/${diastolic}`,
      pulse: `${pulse} bpm`,
      temp: `${temp}°F`,
      status: Number(systolic) > 130 ? 'Elevated' : 'Normal'
    }
    setSavedLogs([newLog, ...savedLogs])
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-7 font-sans" style={{ backgroundColor: '#141416', color: '#ffffff' }}>
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">Vitals Entry</h2>
        <p className="text-xs font-semibold mt-1" style={{ color: '#9ca3af' }}>Record patient blood pressure, pulse, temperature, and fasting state prior to collection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Card */}
        <div className="rounded-2xl p-6 space-y-5" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
          <h3 className="text-base font-bold text-white">Record Vitals for Patient</h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9ca3af' }}>Patient</label>
              <select
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
              >
                <option>S. Ghosh (Home visit)</option>
                <option>R. Banerjee (In-lab)</option>
                <option>M. Das (Home visit)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9ca3af' }}>Systolic BP</label>
                <input
                  type="number"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none font-bold"
                  style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9ca3af' }}>Diastolic BP</label>
                <input
                  type="number"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none font-bold"
                  style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9ca3af' }}>Pulse (BPM)</label>
                <input
                  type="number"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none font-bold"
                  style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9ca3af' }}>Temp (°F)</label>
                <input
                  type="text"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none font-bold"
                  style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9ca3af' }}>Fasting Status</label>
              <select
                value={fasting}
                onChange={(e) => setFasting(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
              >
                <option>Fasting (8+ hrs)</option>
                <option>Non-fasting (Random)</option>
                <option>Post-Prandial (2 hrs post meal)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white rounded-xl text-sm font-bold transition shadow-sm cursor-pointer"
              style={{ backgroundColor: '#e11d48' }}
            >
              Save Vitals Entry
            </button>
          </form>
        </div>

        {/* Logs Card */}
        <div className="rounded-2xl p-6 space-y-4" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
          <h3 className="text-base font-bold text-white">Recorded Vitals History</h3>
          <div className="space-y-3">
            {savedLogs.map((log, idx) => (
              <div
                key={idx}
                className="rounded-xl p-4 flex items-center justify-between"
                style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}
              >
                <div>
                  <p className="text-sm font-bold text-white">{log.patient}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: '#9ca3af' }}>
                    BP: <span className="font-bold text-white">{log.bp}</span> | Pulse: <span className="font-bold text-white">{log.pulse}</span>
                  </p>
                  <p className="text-xs font-medium" style={{ color: '#9ca3af' }}>
                    Temp: <span className="font-bold text-white">{log.temp}</span>
                  </p>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={
                    log.status === 'Normal'
                      ? { backgroundColor: 'rgba(6, 78, 59, 0.6)', color: '#34d399', border: '1px solid rgba(6, 95, 70, 0.4)' }
                      : { backgroundColor: 'rgba(120, 53, 15, 0.6)', color: '#fbbf24', border: '1px solid rgba(146, 64, 14, 0.4)' }
                  }
                >
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
