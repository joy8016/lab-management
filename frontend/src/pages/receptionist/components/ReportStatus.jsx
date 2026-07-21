import React from 'react'

export default function ReportStatus() {
  const reports = [
    { patient: 'Jane Smith', test: 'CBC + Diff', time: '12:50 AM', status: 'Ready', notifySent: true },
    { patient: 'John Doe', test: 'Lipid Profile', time: '03:30 AM', status: 'Ready', notifySent: false },
    { patient: 'Arthur Pendragon', test: 'Liver Function', time: 'Pending', status: 'In Processing', notifySent: false },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Report Status & Patient Notifications</h2>
        <p className="text-xs text-slate-500 font-semibold mt-1">Track ready reports, send SMS/Email notifications, and print receipts</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
          Diagnostic Reports Log
        </h3>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <th className="p-3">Patient Name</th>
                <th className="p-3">Test Name</th>
                <th className="p-3">Ready Time</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {reports.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{r.patient}</td>
                  <td className="p-3 text-slate-600">{r.test}</td>
                  <td className="p-3 text-slate-600">{r.time}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      r.status === 'Ready' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button className="px-3 py-1.5 bg-[#1a5fb4] text-white text-xs font-bold rounded hover:bg-[#14498c] cursor-pointer">
                      Notify Patient (SMS/EMAIL)
                    </button>
                    <button className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded hover:bg-slate-300 cursor-pointer">
                      Print Receipt
                    </button>
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
