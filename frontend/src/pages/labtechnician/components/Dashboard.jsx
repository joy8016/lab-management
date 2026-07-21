import React from 'react'

export default function Dashboard() {
  const stats = [
    { label: 'Pending Samples', value: '12', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { label: 'Active Tests', value: '8', color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200' },
    { label: 'Completed Today', value: '24', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { label: 'Flagged for Review', value: '3', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  ]

  const recentSamples = [
    { id: 'LAB-23460', patient: 'Emily Johnson', test: 'Lipid Panel', status: 'In Progress', urgency: 'Routine' },
    { id: 'LAB-23459', patient: 'Mark Williams', test: 'CBC + Diff', status: 'Completed', urgency: 'Urgent' },
    { id: 'LAB-23458', patient: 'Michael Chang', test: 'Thyroid Panel', status: 'Pending QC', urgency: 'Routine' },
    { id: 'LAB-23457', patient: 'Sarah Connor', test: 'Metabolic Panel', status: 'Completed', urgency: 'Routine' },
    { id: 'LAB-23456', patient: 'John Doe', test: 'CBC + Diff', status: 'Awaiting Approval', urgency: 'Urgent' },
  ]

  return (
    <div className="flex-1 overflow-y-auto bg-[#f3f7fa] p-5 font-sans">
      <h2 className="text-base font-extrabold text-slate-800 mb-4 tracking-tight">Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat, idx) => (
          <div key={idx} className={`bg-white border border-slate-200 rounded-lg p-4 shadow-sm`}>
            <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wide">{stat.label}</p>
            <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Samples */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xs font-bold text-slate-800">Recent Samples</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px] border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
                <th className="px-4 py-2">Sample ID</th>
                <th className="px-3 py-2">Patient</th>
                <th className="px-3 py-2">Test Type</th>
                <th className="px-3 py-2">Urgency</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentSamples.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">{s.id}</td>
                  <td className="px-3 py-3 font-semibold text-slate-800">{s.patient}</td>
                  <td className="px-3 py-3 font-medium text-slate-500">{s.test}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                      s.urgency === 'Urgent'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-sky-50 text-sky-700 border border-sky-200'
                    }`}>
                      {s.urgency}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                      s.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      s.status === 'In Progress' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                      s.status === 'Awaiting Approval' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {s.status}
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
