import React from 'react'

export default function QualityControl() {
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
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-all">
          <div className="flex justify-between items-start text-sm font-bold text-gray-800">
            <span>Biochemistry Analyzer - Beckman Coulter</span>
            <span className="text-emerald-600 font-extrabold">99.8%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: '99.8%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Status: Calibrated &amp; Certified</span>
            <span>Next Due: In 22 Days</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-all">
          <div className="flex justify-between items-start text-sm font-bold text-gray-800">
            <span>Hematology Cell Counter - Sysmex XN</span>
            <span className="text-amber-600 font-extrabold">94.2%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-amber-500" style={{ width: '94.2%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Status: Deviation Detected</span>
            <span className="text-amber-600 font-semibold">Next Due: In 4 Days (Urgent)</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-all">
          <div className="flex justify-between items-start text-sm font-bold text-gray-800">
            <span>Microbiology incubator - Memmert IN30</span>
            <span className="text-emerald-600 font-extrabold">100%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: '100%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Status: Optimal Stability</span>
            <span>Next Due: In 60 Days</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-all">
          <div className="flex justify-between items-start text-sm font-bold text-gray-800">
            <span>PCR Thermal Cycler - Bio-Rad CFX</span>
            <span className="text-red-600 font-extrabold">81.5%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-red-500 animate-pulse" style={{ width: '81.5%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Status: Out of Calibration</span>
            <span className="text-red-600 font-semibold">Calibration Required Immediately</span>
          </div>
        </div>
      </div>
    </div>
  )
}
