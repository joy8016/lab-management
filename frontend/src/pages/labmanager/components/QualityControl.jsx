import React from 'react'
import { useLims } from '../../../context/LimsContext'

export default function QualityControl() {
  const { qualityControl } = useLims()

  // Fallback initial list if DB state is loading
  const records = qualityControl && qualityControl.length > 0 ? qualityControl : [
    { id: '1', instrumentName: 'Biochemistry Analyzer - Beckman Coulter', percentage: '99.8%', statusText: 'Status: Calibrated & Certified', dueDateText: 'Next Due: In 22 Days', value: 99.8, status: 'Pass' },
    { id: '2', instrumentName: 'Hematology Cell Counter - Sysmex XN', percentage: '94.2%', statusText: 'Status: Deviation Detected', dueDateText: 'Next Due: In 4 Days (Urgent)', value: 94.2, status: 'Warning' },
    { id: '3', instrumentName: 'Microbiology Incubator - Memmert IN30', percentage: '100%', statusText: 'Status: Optimal Stability', dueDateText: 'Next Due: In 60 Days', value: 100, status: 'Pass' },
    { id: '4', instrumentName: 'PCR Thermal Cycler - Bio-Rad CFX', percentage: '81.5%', statusText: 'Status: Out of Calibration', dueDateText: 'Calibration Required Immediately', value: 81.5, status: 'Fail' },
  ]

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-5">
        <h2 className="text-xl font-bold text-gray-900 font-sans tracking-tight">
          Quality Control &amp; Equipment Calibrations
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Monitor instrumentation stability, calibration cycles, and system test error margins.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {records.map((qc) => {
          const isWarning = qc.status === 'Warning'
          const isFail = qc.status === 'Fail'
          const barColor = isFail ? 'bg-red-500 animate-pulse' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
          const textColor = isFail ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-emerald-600'

          return (
            <div key={qc.id || qc._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-all">
              <div className="flex justify-between items-start text-sm font-bold text-gray-800">
                <span>{qc.instrumentName}</span>
                <span className={`${textColor} font-extrabold`}>{qc.percentage}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${barColor}`} style={{ width: qc.percentage }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{qc.statusText}</span>
                <span className={isFail || isWarning ? `${textColor} font-semibold` : ''}>{qc.dueDateText}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
