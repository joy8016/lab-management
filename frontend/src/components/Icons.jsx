import React from 'react'

// ── LANDING PAGE ROLE CARD ILLUSTRATIONS ──

export const SuperAdminIcon = () => (
  <svg viewBox="0 0 100 100" width="64" height="64" className="w-16 h-16 shrink-0">
    <line x1="50" y1="30" x2="50" y2="18" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <line x1="60" y1="40" x2="72" y2="28" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <line x1="64" y1="50" x2="82" y2="50" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <line x1="60" y1="60" x2="72" y2="72" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="64" x2="50" y2="82" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <line x1="40" y1="60" x2="28" y2="72" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <line x1="36" y1="50" x2="18" y2="50" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <line x1="40" y1="40" x2="28" y2="28" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <circle cx="50" cy="50" r="16" fill="#dbeafe" stroke="#1e293b" strokeWidth="4" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
      <rect
        key={idx}
        x="46"
        y="27"
        width="8"
        height="11"
        rx="2"
        fill="#93c5fd"
        stroke="#1e293b"
        strokeWidth="4"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="7" fill="#ffffff" stroke="#1e293b" strokeWidth="4" />
    <circle cx="50" cy="18" r="7" fill="#f43f5e" stroke="#1e293b" strokeWidth="4" />
    <circle cx="72" cy="28" r="7" fill="#3b82f6" stroke="#1e293b" strokeWidth="4" />
    <circle cx="82" cy="50" r="7" fill="#ef4444" stroke="#1e293b" strokeWidth="4" />
    <circle cx="72" cy="72" r="7" fill="#10b981" stroke="#1e293b" strokeWidth="4" />
    <circle cx="50" cy="82" r="7" fill="#eab308" stroke="#1e293b" strokeWidth="4" />
    <circle cx="28" cy="72" r="7" fill="#8b5cf6" stroke="#1e293b" strokeWidth="4" />
    <circle cx="18" cy="50" r="7" fill="#a78bfa" stroke="#1e293b" strokeWidth="4" />
    <circle cx="28" cy="28" r="7" fill="#ec4899" stroke="#1e293b" strokeWidth="4" />
  </svg>
)

export const LabManagerIcon = () => (
  <svg viewBox="0 0 100 100" width="64" height="64" className="w-16 h-16 shrink-0">
    <rect x="15" y="16" width="70" height="42" rx="5" fill="#f8fafc" stroke="#1e293b" strokeWidth="3.5" />
    <line x1="15" y1="48" x2="85" y2="48" stroke="#1e293b" strokeWidth="3" />
    <path d="M40 58 L32 72 L68 72 L60 58 Z" fill="#cbd5e1" stroke="#1e293b" strokeWidth="3.5" strokeLinejoin="round" />
    <circle cx="36" cy="32" r="9" fill="#10b981" stroke="#1e293b" strokeWidth="3" />
    <path d="M36 32 L36 23 A9 9 0 0 1 45 32 Z" fill="#eab308" stroke="#1e293b" strokeWidth="3" />
    <rect x="54" y="26" width="6" height="14" fill="#ef4444" stroke="#1e293b" strokeWidth="3" />
    <rect x="63" y="20" width="6" height="20" fill="#3b82f6" stroke="#1e293b" strokeWidth="3" />
    <rect x="72" y="30" width="6" height="10" fill="#10b981" stroke="#1e293b" strokeWidth="3" />
    {[20, 35, 50, 65, 80].map((cx, idx) => (
      <g key={idx}>
        <circle cx={cx} cy="83" r="4.5" fill="#93c5fd" stroke="#1e293b" strokeWidth="3" />
        <path d={`M${cx - 7} 93 A7 7 0 0 1 ${cx + 7} 93 Z`} fill="#cbd5e1" stroke="#1e293b" strokeWidth="3" />
      </g>
    ))}
  </svg>
)

export const PathologistIcon = () => (
  <svg viewBox="0 0 100 100" width="64" height="64" className="w-16 h-16 shrink-0">
    <circle cx="28" cy="28" r="18" fill="#fdf2f8" stroke="#1e293b" strokeWidth="3.5" />
    <circle cx="22" cy="22" r="3" fill="#ec4899" />
    <circle cx="34" cy="32" r="4" fill="#db2777" />
    <circle cx="20" cy="32" r="2" fill="#f43f5e" />
    <circle cx="32" cy="20" r="3" fill="#be185d" />
    <path d="M48 84 L82 84" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <path d="M45 66 L75 66" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
    <path d="M76 84 L76 54 C76 44 68 40 60 40" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <circle cx="76" cy="64" r="4" fill="#94a3b8" stroke="#1e293b" strokeWidth="3" />
    <line x1="48" y1="34" x2="60" y2="46" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
    <rect x="42" y="28" width="10" height="6" fill="#cbd5e1" stroke="#1e293b" strokeWidth="2.5" transform="rotate(45 47 31)" />
    <circle cx="54" cy="54" r="4.5" fill="#475569" stroke="#1e293b" strokeWidth="3" />
    <line x1="51" y1="56" x2="46" y2="62" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
    <line x1="57" y1="57" x2="57" y2="63" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

export const LabTechnicianIcon = () => (
  <svg viewBox="0 0 100 100" width="64" height="64" className="w-16 h-16 shrink-0">
    <rect x="25" y="24" width="60" height="52" rx="6" fill="#f8fafc" stroke="#1e293b" strokeWidth="3.5" />
    <rect x="58" y="32" width="20" height="14" rx="2.5" fill="#f1f5f9" stroke="#1e293b" strokeWidth="3" />
    <path d="M62 40 L66 35 L70 41 L74 36" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="62" cy="55" r="2.5" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
    <circle cx="70" cy="55" r="2.5" fill="#eab308" stroke="#1e293b" strokeWidth="2" />
    <circle cx="78" cy="55" r="2.5" fill="#22c55e" stroke="#1e293b" strokeWidth="2" />
    <rect x="58" y="63" width="20" height="4" fill="#475569" stroke="#1e293b" strokeWidth="2" />
    <rect x="8" y="58" width="22" height="18" rx="3" fill="#cbd5e1" stroke="#1e293b" strokeWidth="3.5" />
    <rect x="12" y="44" width="4" height="18" rx="2" fill="#ef4444" stroke="#1e293b" strokeWidth="3" />
    <rect x="17" y="38" width="4" height="24" rx="2" fill="#ef4444" stroke="#1e293b" strokeWidth="3" />
    <rect x="22" y="46" width="4" height="16" rx="2" fill="#ef4444" stroke="#1e293b" strokeWidth="3" />
    <rect x="11" y="42" width="6" height="3" rx="0.5" fill="#ef4444" />
    <rect x="16" y="36" width="6" height="3" rx="0.5" fill="#ef4444" />
    <rect x="21" y="44" width="6" height="3" rx="0.5" fill="#ef4444" />
  </svg>
)

export const SampleCollectorIcon = () => (
  <svg viewBox="0 0 100 100" width="64" height="64" className="w-16 h-16 shrink-0">
    <path d="M70 80 C70 73 64 70 57 70 L57 62 C63 62 66 58 66 53 L66 43 L82 43 L82 56 C82 62 77 64 77 70 L77 80" fill="#cbd5e1" stroke="#1e293b" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M50 46 L66 42 L66 56 L56 60 Z" fill="#94a3b8" stroke="#1e293b" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M46 38 L58 34 L64 46 L50 46 Z" fill="#475569" stroke="#1e293b" strokeWidth="3.5" strokeLinejoin="round" />
    <polygon points="44,36 26,38 26,52 46,48" fill="#fee2e2" opacity="0.5" />
    <line x1="40" y1="42" x2="28" y2="43" stroke="#ef4444" strokeWidth="3" strokeDasharray="3 2" />
    <path d="M8 73 L24 73 C28 73 30 69 30 66 C30 63 28 60 24 60 L20 60 L20 53 C20 50 18 48 14 48 L8 48" fill="#cbd5e1" stroke="#1e293b" strokeWidth="3.5" strokeLinejoin="round" />
    <rect x="22" y="30" width="6" height="30" rx="3" fill="#f8fafc" stroke="#1e293b" strokeWidth="3" />
    <rect x="22" y="42" width="6" height="15" fill="#ef4444" />
    <rect x="21" y="28" width="8" height="4" rx="1" fill="#3b82f6" stroke="#1e293b" strokeWidth="2" />
    <rect x="23" y="34" width="4" height="6" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
    <line x1="24" y1="36" x2="24" y2="39" stroke="#1e293b" strokeWidth="1" />
    <line x1="25" y1="35" x2="25" y2="39" stroke="#1e293b" strokeWidth="1" />
    <line x1="26" y1="36" x2="26" y2="38" stroke="#1e293b" strokeWidth="1" />
  </svg>
)

export const ReceptionistIcon = () => (
  <svg viewBox="0 0 100 100" width="64" height="64" className="w-16 h-16 shrink-0">
    <rect x="15" y="64" width="70" height="20" rx="3" fill="#cbd5e1" stroke="#1e293b" strokeWidth="3.5" />
    <rect x="58" y="42" width="22" height="16" rx="2" fill="#94a3b8" stroke="#1e293b" strokeWidth="3" />
    <line x1="69" y1="58" x2="69" y2="64" stroke="#1e293b" strokeWidth="3" />
    <line x1="64" y1="64" x2="74" y2="64" stroke="#1e293b" strokeWidth="3" />
    <path d="M25 64 C25 54 32 49 42 49 C52 49 59 54 59 64 Z" fill="#60a5fa" stroke="#1e293b" strokeWidth="3.5" strokeLinejoin="round" />
    <polygon points="42,49 39,55 42,61 45,55" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />
    <circle cx="42" cy="37" r="8" fill="#fbcfe8" stroke="#1e293b" strokeWidth="3" />
    <path d="M33 37 C33 27 42 23 51 27 C51 27 52 34 49 37 C49 37 45 31 42 31 C39 31 35 37 33 37 Z" fill="#78350f" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
    <path d="M34 37 L34 45 C34 45 36 47 37 45 C37 45 37 39 37 37 Z" fill="#78350f" stroke="#1e293b" strokeWidth="2.5" />
    <path d="M50 37 L50 45 C50 45 48 47 47 45 C47 45 47 39 47 37 Z" fill="#78350f" stroke="#1e293b" strokeWidth="2.5" />
    <rect x="20" y="58" width="6" height="6" rx="1" fill="#f43f5e" stroke="#1e293b" strokeWidth="2" />
  </svg>
)

// ── COMPLIANCE & BRANDING SVGs ──

export const LIMSLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 rounded-full bg-[#e8f5f3] flex items-center justify-center border border-teal-100">
      <svg viewBox="0 0 100 100" width="24" height="24" className="w-6 h-6 text-teal-700">
        <path d="M30 80 L70 80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path d="M50 80 L50 60" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M42 60 L62 60" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M65 80 C72 80 78 72 78 58 C78 45 70 42 58 42" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <line x1="38" y1="20" x2="52" y2="35" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      </svg>
    </div>
    <div className="text-left">
      <div className="text-base font-extrabold text-gray-900 tracking-tight leading-tight">LIMS</div>
      <div className="text-[9px] text-gray-500 font-medium uppercase tracking-wider leading-none">organization</div>
    </div>
  </div>
)

export const HIPAALogo = () => (
  <div className="flex items-center gap-2 text-gray-500 font-medium">
    <svg viewBox="0 0 100 100" width="28" height="28" className="w-7 h-7 text-[#0f294a]">
      <path d="M50 15 C70 15 80 20 80 45 C80 65 65 80 50 85 C35 80 20 65 20 45 C20 20 30 15 50 15 Z" fill="#eff6ff" stroke="currentColor" strokeWidth="4" />
      <line x1="50" y1="27" x2="50" y2="70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="23" r="3.5" fill="currentColor" />
      <path d="M38 35 C42 30 46 45 50 40 C54 45 58 30 62 35" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M38 53 C42 48 46 63 50 58 C54 63 58 48 62 53" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
    <div className="text-left leading-none">
      <div className="text-[10px] uppercase font-bold text-gray-900 tracking-wide">HIPAA</div>
      <div className="text-[7.5px] text-gray-400 font-semibold tracking-wider">COMPLIANT</div>
    </div>
  </div>
)

export const GDPRLogo = () => (
  <div className="flex items-center gap-2 text-gray-500 font-medium">
    <svg viewBox="0 0 100 100" width="28" height="28" className="w-7 h-7 text-[#0f294a]">
      <circle cx="50" cy="50" r="32" fill="#eff6ff" stroke="currentColor" strokeWidth="4" strokeDasharray="6 6" />
      <text x="50" y="56" fontSize="15" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">GDPR</text>
    </svg>
    <div className="text-left leading-none">
      <div className="text-[10px] uppercase font-bold text-gray-900 tracking-wide">GDPR</div>
      <div className="text-[7.5px] text-gray-400 font-semibold tracking-wider">COMPLIANT</div>
    </div>
  </div>
)

// ── PORTAL CONTROL SVGs ──

export const LockIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export const ShieldIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
)

export const ClipboardIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 9h6" />
    <path d="M9 13h6" />
    <path d="M9 17h6" />
  </svg>
)

export const FlaskIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 3h12" />
    <path d="M12 3v6" />
    <path d="M8 9h8" />
    <path d="M8 9l-4 9.5A2 2 0 0 0 5.8 21h12.4a2 2 0 0 0 1.8-2.5L16 9" />
  </svg>
)

export const DropIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
)

export const HeadphonesIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
)
