import React from 'react'

export default function PlaceholderView({ title, description }) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f3f7fa] p-5 font-sans">
      <h2 className="text-base font-extrabold text-slate-800 mb-4 tracking-tight">{title}</h2>
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-slate-800">{title} Module</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  )
}
