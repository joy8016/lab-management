import React from 'react'

export default function PlaceholderView({ title, description }) {
  return (
    <div className="flex-1 overflow-y-auto p-8 font-sans" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
      <h2 className="text-xl font-black text-slate-900 tracking-tight mb-4">{title}</h2>
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-slate-900">{title} Module</h3>
        <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
