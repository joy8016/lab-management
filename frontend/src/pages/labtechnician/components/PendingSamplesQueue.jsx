import React from 'react'

export default function PendingSamplesQueue({ title = 'Pending Samples Queue', samples = [], selectedSampleId, onSelectSample }) {
  const sampleList = samples.length > 0 ? samples : [
    { id: 'LAB-23456' },
    { id: 'LAB-21457' },
    { id: 'LAB-21458' }
  ]

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 font-sans">
      <h3 className="text-xs font-bold text-slate-800 mb-3 tracking-tight">
        {title}
      </h3>
      <div className="space-y-2">
        {sampleList.map((sample, idx) => (
          <div
            key={idx}
            onClick={() => onSelectSample && onSelectSample(sample.id)}
            className={`p-2 px-3 rounded border text-[10px] cursor-pointer transition-all flex items-center justify-between ${
              selectedSampleId === sample.id
                ? 'bg-sky-50 border-sky-400 text-sky-950 font-bold shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Sample ID: {sample.id}</span>
            {sample.badge && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${sample.badgeStyle || 'bg-slate-100 text-slate-600'}`}>
                {sample.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
