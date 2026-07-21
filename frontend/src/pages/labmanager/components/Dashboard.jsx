import React from 'react'
import { useLims } from '../../../context/LimsContext'

/* ─── Mini Sparkline SVG (reusable) ─── */
function Sparkline({ color = '#f97316', data = [20,35,25,40,30,45,35] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 80, h = 28
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Mini Bar Chart SVG (for department cards) ─── */
function MiniBarChart({ colors = ['#0ea5e9', '#f97316', '#22c55e', '#8b5cf6'] }) {
  const bars = [18, 28, 22, 32, 15, 25]
  const max = Math.max(...bars)
  return (
    <svg width="60" height="24" viewBox="0 0 60 24" className="shrink-0">
      {bars.map((v, i) => (
        <rect key={i} x={i * 10 + 1} y={24 - (v / max) * 24} width="7" height={(v / max) * 24} rx="1"
          fill={colors[i % colors.length]} opacity="0.85" />
      ))}
    </svg>
  )
}

/* ─── Department Card ─── */
function DeptCard({ name, icon, tat, tatColor, sparkColor, sparkData, subtitle, checkColor }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4 flex flex-col gap-2.5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
            {icon}
          </div>
          <span className="text-sm font-bold text-gray-900">{name}</span>
        </div>
        {/* Checkmark */}
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${checkColor || 'bg-green-500'}`}>
          <svg viewBox="0 0 20 20" fill="white" className="w-3 h-3"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <MiniBarChart colors={name === 'Biochemistry' ? ['#0ea5e9','#38bdf8','#7dd3fc','#0284c7'] : name === 'Hematology' ? ['#f97316','#fb923c','#fdba74','#ea580c'] : name === 'Radiology' ? ['#0ea5e9','#06b6d4','#22d3ee','#0891b2'] : ['#22c55e','#4ade80','#86efac','#16a34a']} />
          {subtitle ? (
            <p className="text-[11px] text-gray-500 mt-1">{subtitle}</p>
          ) : (
            <p className="text-[11px] mt-1">
              <span className="text-gray-500">TAT: </span>
              <span className={`font-bold ${tatColor || 'text-green-600'}`}>{tat}</span>
            </p>
          )}
        </div>
        <Sparkline color={sparkColor || '#f97316'} data={sparkData || [20,35,25,40,30,45,35]} />
      </div>
    </div>
  )
}

/* ─── Inventory Purchase Requests Table ─── */
function InventoryTable({ requests, onApprove, onDeny }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden h-full flex flex-col">
      <div className="px-5 pt-4 pb-3">
        <h3 className="text-base font-bold text-gray-900">Inventory Purchase Requests</h3>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-gray-50 text-gray-500 font-semibold">
              <th className="px-5 py-2.5">PO ID</th>
              <th className="px-3 py-2.5">Request</th>
              <th className="px-3 py-2.5">Dr. Evam</th>
              <th className="px-3 py-2.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-t border-gray-50">
                <td className="px-5 py-3 font-semibold text-gray-800">{r.id}</td>
                <td className="px-3 py-3 text-gray-600">{r.item}</td>
                <td className="px-3 py-3 text-gray-500">Dr. Evans</td>
                <td className="px-3 py-3 text-center">
                  {r.status === 'Pending' ? (
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onApprove(r.id)}
                        className="px-3 py-1 rounded-md text-[10px] font-bold bg-green-600 text-white hover:bg-green-700 transition cursor-pointer"
                      >
                        APPROVE
                      </button>
                      <button
                        onClick={() => onDeny(r.id)}
                        className="px-3 py-1 rounded-md text-[10px] font-bold bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
                      >
                        DENY
                      </button>
                    </div>
                  ) : (
                    <span className={`px-3 py-1 rounded-md text-[10px] font-bold ${
                      r.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>{r.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── Operational Efficiency Chart (Bar + Line hybrid) ─── */
function OperationalEfficiencyChart() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const samplesData = [25, 40, 38, 42, 35, 20, 22]
  const tatData = [28, 30, 28, 35, 30, 18, 25]
  const maxVal = 50
  const chartH = 160, chartW = 340, barW = 18, gap = 48

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 flex-1">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-bold text-gray-900">Operational Efficiency</h4>
        <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><circle cx="10" cy="4" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="10" cy="16" r="1.5"/></svg>
        </button>
      </div>
      {/* Legend */}
      <div className="flex items-center gap-4 mb-3 text-[10px] font-semibold text-gray-500">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-teal-500 inline-block" /> Samples Processed per Day</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-orange-500 inline-block" /> Avg. Turnaround Time</span>
      </div>

      <svg viewBox={`0 0 ${chartW + 40} ${chartH + 40}`} className="w-full" style={{ maxHeight: '220px' }}>
        {/* Y-axis labels (left) */}
        {[0, 10, 20, 30, 40, 50].map((v, i) => (
          <text key={`yl-${i}`} x="0" y={chartH - (v / maxVal) * chartH + 12} fontSize="8" fill="#9ca3af" textAnchor="start">{v}</text>
        ))}
        {/* Y-axis labels (right) */}
        {[0, 25, 50, 75, 100, 125, 150].map((v, i) => (
          <text key={`yr-${i}`} x={chartW + 30} y={chartH - (v / 150) * chartH + 12} fontSize="8" fill="#9ca3af" textAnchor="end">{v}</text>
        ))}
        {/* Grid lines */}
        {[0, 10, 20, 30, 40, 50].map((v, i) => (
          <line key={`g-${i}`} x1="18" y1={chartH - (v / maxVal) * chartH + 8} x2={chartW + 10} y2={chartH - (v / maxVal) * chartH + 8} stroke="#f3f4f6" strokeWidth="1" />
        ))}
        {/* Bars */}
        {days.map((day, i) => {
          const x = 24 + i * gap
          const samplesH = (samplesData[i] / maxVal) * chartH
          const tatH = (tatData[i] / maxVal) * chartH
          return (
            <g key={day}>
              {/* Teal bar */}
              <rect x={x} y={chartH - samplesH + 8} width={barW} height={samplesH} rx="3" fill="#0d9488" opacity="0.9" />
              {/* Orange bar */}
              <rect x={x + barW + 2} y={chartH - tatH + 8} width={barW} height={tatH} rx="3" fill="#f97316" opacity="0.8" />
              {/* X label */}
              <text x={x + barW} y={chartH + 25} fontSize="9" fill="#6b7280" textAnchor="middle">{day}</text>
            </g>
          )
        })}
        {/* X-axis label */}
        <text x={(chartW + 30) / 2} y={chartH + 38} fontSize="9" fill="#9ca3af" textAnchor="middle" fontWeight="600">Week</text>
      </svg>
    </div>
  )
}

/* ─── QC Performance Line Chart ─── */
function QCPerformanceChart() {
  const days = Array.from({ length: 7 }, (_, i) => i * 5)
  const passData = [62, 70, 80, 65, 75, 82, 78]
  const majorData = [55, 60, 58, 62, 65, 60, 68]
  const minorData = [50, 55, 52, 58, 60, 55, 62]
  const maxVal = 100
  const chartW = 280, chartH = 160

  const toPath = (data) => {
    return data.map((v, i) => {
      const x = 30 + (i / (data.length - 1)) * (chartW - 40)
      const y = chartH - (v / maxVal) * chartH + 8
      return `${i === 0 ? 'M' : 'L'}${x},${y}`
    }).join(' ')
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 flex-1">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-bold text-gray-900">QC Performance</h4>
        <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><circle cx="10" cy="4" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="10" cy="16" r="1.5"/></svg>
        </button>
      </div>
      {/* Legend */}
      <div className="flex items-center gap-3 mb-3 text-[10px] font-semibold text-gray-500">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Pass Analytis</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block" /> Major Analytis</span>
        <span className="flex items-center gap-1"><span className="w-4 border-t border-dashed border-gray-400 inline-block" /> Minor Analytis</span>
      </div>

      <svg viewBox={`0 0 ${chartW + 10} ${chartH + 40}`} className="w-full" style={{ maxHeight: '220px' }}>
        {/* Y-axis labels */}
        {[0, 20, 40, 60, 80, 100].map((v, i) => (
          <text key={`y-${i}`} x="0" y={chartH - (v / maxVal) * chartH + 12} fontSize="8" fill="#9ca3af" textAnchor="start">{v}</text>
        ))}
        {/* Grid lines */}
        {[0, 20, 40, 60, 80, 100].map((v, i) => (
          <line key={`g-${i}`} x1="22" y1={chartH - (v / maxVal) * chartH + 8} x2={chartW} y2={chartH - (v / maxVal) * chartH + 8} stroke="#f3f4f6" strokeWidth="1" />
        ))}
        {/* Control Limit lines */}
        <line x1="22" y1={chartH - (85 / maxVal) * chartH + 8} x2={chartW} y2={chartH - (85 / maxVal) * chartH + 8} stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
        <text x={chartW + 2} y={chartH - (85 / maxVal) * chartH + 11} fontSize="7" fill="#ef4444">Control Limit</text>
        <line x1="22" y1={chartH - (45 / maxVal) * chartH + 8} x2={chartW} y2={chartH - (45 / maxVal) * chartH + 8} stroke="#22c55e" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
        <text x={chartW + 2} y={chartH - (45 / maxVal) * chartH + 11} fontSize="7" fill="#22c55e">Control Limit</text>

        {/* Lines */}
        <path d={toPath(passData)} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        <path d={toPath(majorData)} fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
        <path d={toPath(minorData)} fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" />

        {/* Data points */}
        {passData.map((v, i) => (
          <circle key={`p-${i}`} cx={30 + (i / (passData.length - 1)) * (chartW - 40)} cy={chartH - (v / maxVal) * chartH + 8} r="3" fill="#22c55e" />
        ))}
        {majorData.map((v, i) => (
          <circle key={`m-${i}`} cx={30 + (i / (majorData.length - 1)) * (chartW - 40)} cy={chartH - (v / maxVal) * chartH + 8} r="3" fill="#2563eb" />
        ))}

        {/* X-axis labels */}
        {days.map((d, i) => (
          <text key={`x-${i}`} x={30 + (i / (days.length - 1)) * (chartW - 40)} y={chartH + 25} fontSize="9" fill="#6b7280" textAnchor="middle">{d}</text>
        ))}
        <text x={(chartW) / 2} y={chartH + 38} fontSize="9" fill="#9ca3af" textAnchor="middle" fontWeight="600">Time (Days)</text>
      </svg>
    </div>
  )
}

/* ─── Main Dashboard Content ─── */
export default function Dashboard() {
  const { inventoryRequests, approveRequest, rejectRequest } = useLims()
  const pendingPOs = inventoryRequests.filter(r => r.status === 'Pending').length

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 space-y-5">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900">Operations Command Center</h2>

      {/* ─── Metrics Status Bar ─── */}
      <div className="grid grid-cols-4 gap-0 bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-r border-gray-100">
          <span className="text-xs text-gray-500 font-medium">System Status: </span>
          <span className="text-sm font-extrabold text-green-600">NORMAL</span>
        </div>
        <div className="px-5 py-3.5 border-r border-gray-100">
          <span className="text-xs text-gray-500 font-medium">Active Samples: </span>
          <span className="text-sm font-extrabold text-gray-900">1,240</span>
        </div>
        <div className="px-5 py-3.5 border-r border-gray-100">
          <span className="text-xs text-gray-500 font-medium">Critical Alerts: </span>
          <span className="text-sm font-extrabold text-orange-600">2 (QC Related)</span>
        </div>
        <div className="px-5 py-3.5">
          <span className="text-xs text-gray-500 font-medium">Pending POs: </span>
          <span className="text-sm font-extrabold text-blue-700">{pendingPOs}</span>
        </div>
      </div>

      {/* ─── Department Overview + Inventory Split ─── */}
      <div className="grid grid-cols-5 gap-5">
        {/* Left: Departmental Operations Overview */}
        <div className="col-span-3 space-y-3">
          <h3 className="text-sm font-bold text-gray-900">Departmental Operations Overview</h3>
          <div className="grid grid-cols-2 gap-3">
            <DeptCard
              name="Biochemistry"
              tat="94%"
              tatColor="text-green-600"
              sparkColor="#f97316"
              sparkData={[30, 35, 28, 40, 32, 38, 42]}
              checkColor="bg-green-500"
              icon={
                <svg viewBox="0 0 40 40" className="w-10 h-10">
                  <rect x="2" y="2" width="36" height="36" rx="8" fill="#e0f2fe" />
                  <path d="M14 28 L14 16 L18 16 L18 28 Z" fill="#0284c7" />
                  <path d="M20 28 L20 12 L24 12 L24 28 Z" fill="#0ea5e9" />
                  <path d="M26 28 L26 18 L30 18 L30 28 Z" fill="#7dd3fc" />
                  <line x1="10" y1="28" x2="32" y2="28" stroke="#0284c7" strokeWidth="1.5" />
                </svg>
              }
            />
            <DeptCard
              name="Hematology"
              tat="88%"
              tatColor="text-orange-600"
              sparkColor="#f97316"
              sparkData={[22, 30, 25, 35, 28, 32, 30]}
              checkColor="bg-orange-500"
              icon={
                <svg viewBox="0 0 40 40" className="w-10 h-10">
                  <rect x="2" y="2" width="36" height="36" rx="8" fill="#fff7ed" />
                  <circle cx="15" cy="18" r="4" fill="#f97316" />
                  <circle cx="25" cy="18" r="4" fill="#fb923c" />
                  <circle cx="20" cy="26" r="4" fill="#fdba74" />
                  <path d="M18 12 L22 8" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
                </svg>
              }
            />
            <DeptCard
              name="Radiology"
              subtitle="Equipment: 100% UP"
              sparkColor="#0ea5e9"
              sparkData={[40, 38, 42, 35, 40, 38, 42]}
              checkColor="bg-green-500"
              icon={
                <svg viewBox="0 0 40 40" className="w-10 h-10">
                  <rect x="2" y="2" width="36" height="36" rx="8" fill="#e0f2fe" />
                  <rect x="10" y="10" width="20" height="16" rx="3" fill="#0284c7" />
                  <rect x="14" y="14" width="12" height="8" rx="1" fill="#7dd3fc" />
                  <rect x="16" y="28" width="8" height="3" rx="1" fill="#0284c7" />
                </svg>
              }
            />
            <DeptCard
              name="Microbiology"
              tat="96%"
              tatColor="text-green-600"
              sparkColor="#22c55e"
              sparkData={[30, 32, 35, 38, 40, 42, 45]}
              checkColor="bg-green-500"
              icon={
                <svg viewBox="0 0 40 40" className="w-10 h-10">
                  <rect x="2" y="2" width="36" height="36" rx="8" fill="#f0fdf4" />
                  <circle cx="20" cy="20" r="8" fill="none" stroke="#22c55e" strokeWidth="2" />
                  <circle cx="20" cy="20" r="3" fill="#22c55e" />
                  <line x1="20" y1="8" x2="20" y2="12" stroke="#22c55e" strokeWidth="1.5" />
                  <line x1="20" y1="28" x2="20" y2="32" stroke="#22c55e" strokeWidth="1.5" />
                  <line x1="8" y1="20" x2="12" y2="20" stroke="#22c55e" strokeWidth="1.5" />
                  <line x1="28" y1="20" x2="32" y2="20" stroke="#22c55e" strokeWidth="1.5" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Right: Inventory Purchase Requests */}
        <div className="col-span-2">
          <InventoryTable
            requests={inventoryRequests}
            onApprove={approveRequest}
            onDeny={rejectRequest}
          />
        </div>
      </div>

      {/* ─── Operational & Quality-Control Dashboard ─── */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-3">Operational &amp; Quality-Control Dashboard</h3>
        <div className="flex gap-5">
          <OperationalEfficiencyChart />
          <QCPerformanceChart />
        </div>
      </div>
    </div>
  )
}
