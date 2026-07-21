import React from 'react'

export default function SampleIntake() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f3f7fa] p-5 font-sans">
      <h2 className="text-base font-extrabold text-slate-800 mb-4 tracking-tight">Sample Intake</h2>
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center mx-auto text-[#2563eb]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="16" y1="11" x2="22" y2="11" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-slate-800">Sample Intake Module</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-medium">
          Register new samples, scan barcodes, and route incoming specimens to the appropriate test stations.
        </p>
        <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded px-4 py-2 text-[10px] font-bold transition shadow-sm cursor-pointer">
          Register New Sample
        </button>
      </div>
    </div>
  )
}
