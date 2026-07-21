import React from 'react'

export default function PlaceholderView({ title, description }) {
  return (
    <div className="flex-1 overflow-y-auto p-8 font-sans" style={{ backgroundColor: '#141416', color: '#ffffff' }}>
      <h2 className="text-2xl font-black text-white tracking-tight mb-4">{title}</h2>
      <div
        className="rounded-2xl p-12 text-center space-y-4"
        style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
          style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32', color: '#9ca3af' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white">{title} Module</h3>
        <p className="text-xs font-semibold max-w-sm mx-auto leading-relaxed" style={{ color: '#9ca3af' }}>
          {description}
        </p>
      </div>
    </div>
  )
}
