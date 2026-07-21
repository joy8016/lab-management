import React from 'react'

export default function CollectionHistory() {
  const history = [
    { id: 'JOB-901', patient: 'A. Sharma', date: 'Today 08:30 AM', barcode: 'BC-10234', location: 'Home Visit', status: 'Delivered to Lab' },
    { id: 'JOB-902', patient: 'P. Nair', date: 'Today 09:15 AM', barcode: 'BC-10235', location: 'In-lab Desk 2', status: 'Delivered to Lab' },
    { id: 'JOB-899', patient: 'Arthur Pendragon', date: 'Yesterday 04:30 PM', barcode: 'BC-10190', location: 'Home Visit', status: 'Processed' },
    { id: 'JOB-898', patient: 'Morgan Le Fay', date: 'Yesterday 02:15 PM', barcode: 'BC-10188', location: 'Home Visit', status: 'Processed' },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6 font-sans" style={{ backgroundColor: '#141416', color: '#ffffff' }}>
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">Collection History</h2>
        <p className="text-xs font-semibold mt-1" style={{ color: '#9ca3af' }}>Audit log of completed sample collections and chain of custody tracking</p>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#18181b', borderBottom: '1px solid #2d2d32' }}>
                <th className="py-3.5 px-4 text-xs font-extrabold uppercase tracking-wider" style={{ color: '#9ca3af' }}>JOB ID</th>
                <th className="py-3.5 px-4 text-xs font-extrabold uppercase tracking-wider" style={{ color: '#9ca3af' }}>PATIENT</th>
                <th className="py-3.5 px-4 text-xs font-extrabold uppercase tracking-wider" style={{ color: '#9ca3af' }}>DATE & TIME</th>
                <th className="py-3.5 px-4 text-xs font-extrabold uppercase tracking-wider" style={{ color: '#9ca3af' }}>BARCODE</th>
                <th className="py-3.5 px-4 text-xs font-extrabold uppercase tracking-wider" style={{ color: '#9ca3af' }}>LOCATION</th>
                <th className="py-3.5 px-4 text-xs font-extrabold uppercase tracking-wider" style={{ color: '#9ca3af' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#25252a] transition-colors"
                  style={{ borderBottom: '1px solid #2a2a30' }}
                >
                  <td className="py-4 px-4 font-mono font-extrabold text-xs" style={{ color: '#38bdf8' }}>{row.id}</td>
                  <td className="py-4 px-4 font-extrabold text-white">{row.patient}</td>
                  <td className="py-4 px-4 font-medium" style={{ color: '#d1d5db' }}>{row.date}</td>
                  <td className="py-4 px-4 font-mono font-bold" style={{ color: '#e5e7eb' }}>{row.barcode}</td>
                  <td className="py-4 px-4 font-semibold" style={{ color: '#d1d5db' }}>{row.location}</td>
                  <td className="py-4 px-4">
                    <span
                      className="inline-flex px-3 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: 'rgba(20, 83, 45, 0.8)', color: '#22c55e', border: '1px solid rgba(21, 128, 61, 0.5)' }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
