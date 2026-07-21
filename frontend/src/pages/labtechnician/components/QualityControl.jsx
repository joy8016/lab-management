import React from 'react'

export default function QualityControl() {
  const qcRuns = [
    { id: 'QC-001', analyzer: 'Sysmex XN-1000', type: 'Hematology', level: 'Normal', result: 'Passed', time: 'Today 09:30 AM' },
    { id: 'QC-002', analyzer: 'Cobas 6000', type: 'Chemistry', level: 'High', result: 'Passed', time: 'Today 08:15 AM' },
    { id: 'QC-003', analyzer: 'Alinity ci', type: 'Immunoassay', level: 'Low', result: 'Failed', time: 'Yesterday 04:45 PM' },
  ]

  return (
    <div className="flex-1 overflow-y-auto bg-[#f3f7fa] p-5 font-sans">
      <h2 className="text-base font-extrabold text-slate-800 mb-4 tracking-tight">Quality Control</h2>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xs font-bold text-slate-800">Recent QC Runs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px] border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
                <th className="px-4 py-2">QC ID</th>
                <th className="px-3 py-2">Analyzer</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Level</th>
                <th className="px-3 py-2">Result</th>
                <th className="px-3 py-2">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {qcRuns.map((run) => (
                <tr key={run.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">{run.id}</td>
                  <td className="px-3 py-3 font-semibold text-slate-800">{run.analyzer}</td>
                  <td className="px-3 py-3 text-slate-500 font-semibold">{run.type}</td>
                  <td className="px-3 py-3 text-slate-500 font-semibold">{run.level}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                      run.result === 'Passed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {run.result}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-400 font-semibold">{run.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
