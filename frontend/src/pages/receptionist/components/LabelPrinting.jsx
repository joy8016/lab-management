import React from 'react'

export default function LabelPrinting() {
  const labelQueue = [
    { patient: 'Jane Smith', id: '12345', barcode: '109409880400', test: 'CBC', time: '10:15 AM' },
    { patient: 'John Doe', id: '1029', barcode: '109409880401', test: 'Lipid Panel', time: '09:45 AM' },
    { patient: 'Arthur Pendragon', id: '901', barcode: '109409880402', test: 'Liver Function', time: '08:30 AM' },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Label & Barcode Printing</h2>
        <p className="text-xs text-slate-500 font-semibold mt-1">Generate thermal specimen barcode labels for tube tubes and collection containers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {labelQueue.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs text-center font-mono">
            <h3 className="text-xs font-sans font-bold text-slate-500 uppercase tracking-wider">SPECIMEN STICKER #{idx + 1}</h3>
            
            <div className="bg-slate-50 border border-slate-300 rounded-lg p-4 space-y-1">
              <div className="flex items-center justify-center gap-0.5 py-1">
                <div className="w-1.5 h-12 bg-slate-900"></div>
                <div className="w-0.5 h-12 bg-slate-900"></div>
                <div className="w-2 h-12 bg-slate-900"></div>
                <div className="w-1 h-12 bg-slate-900"></div>
                <div className="w-0.5 h-12 bg-slate-900"></div>
                <div className="w-1.5 h-12 bg-slate-900"></div>
                <div className="w-2 h-12 bg-slate-900"></div>
              </div>
              <p className="text-xs text-slate-500 tracking-wider font-bold">{item.barcode}</p>
              <p className="text-sm font-sans font-black text-slate-900">{item.patient}</p>
              <p className="text-xs font-sans text-slate-600">ID: {item.id} • Test: {item.test}</p>
            </div>

            <button className="w-full py-2 bg-[#1a5fb4] hover:bg-[#14498c] text-white text-xs font-bold rounded-lg transition shadow-xs cursor-pointer">
              Print Thermal Label
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
