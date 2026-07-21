import React from 'react'

export default function MyProfile() {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-7 font-sans" style={{ backgroundColor: '#141416', color: '#ffffff' }}>
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">My Profile</h2>
        <p className="text-xs font-semibold mt-1" style={{ color: '#9ca3af' }}>Phlebotomist identity, certification details, and assigned shift route</p>
      </div>

      <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl tracking-wider shadow-md"
          style={{ backgroundColor: '#0c4a6e', border: '2px solid #0284c7', color: '#bae6fd' }}
        >
          RI
        </div>
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-extrabold text-white">Ramesh Iyer</h3>
          <p className="text-xs font-bold" style={{ color: '#38bdf8' }}>Certified Phlebotomist (CPT-I)</p>
          <p className="text-xs" style={{ color: '#9ca3af' }}>
            Employee ID: <span className="font-mono font-bold text-white">EMP-9082</span> | Shift: Morning (07:30 AM - 03:30 PM)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6 space-y-3" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
          <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#9ca3af' }}>Assigned Equipment</h4>
          <ul className="space-y-2 text-xs font-semibold">
            <li className="flex items-center justify-between p-2.5 rounded-xl" style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}>
              <span style={{ color: '#d1d5db' }}>Portable Barcode Scanner (Zebra TC26)</span>
              <span className="font-bold" style={{ color: '#34d399' }}>Online</span>
            </li>
            <li className="flex items-center justify-between p-2.5 rounded-xl" style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}>
              <span style={{ color: '#d1d5db' }}>Digital BP Monitor (Omron HEM-7120)</span>
              <span className="font-bold" style={{ color: '#34d399' }}>Calibrated</span>
            </li>
            <li className="flex items-center justify-between p-2.5 rounded-xl" style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}>
              <span style={{ color: '#d1d5db' }}>Cold Chain Specimen Bag (#K-89)</span>
              <span className="font-bold" style={{ color: '#34d399' }}>4°C Verified</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl p-6 space-y-3" style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}>
          <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#9ca3af' }}>Performance Summary</h4>
          <div className="space-y-2 text-xs font-semibold">
            <div className="flex items-center justify-between p-2.5 rounded-xl" style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}>
              <span style={{ color: '#d1d5db' }}>On-Time Home Pickups</span>
              <span className="font-bold" style={{ color: '#38bdf8' }}>98.5%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl" style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}>
              <span style={{ color: '#d1d5db' }}>Hemolysis / Rejection Rate</span>
              <span className="font-bold" style={{ color: '#34d399' }}>0.2% (Low)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl" style={{ backgroundColor: '#18181b', border: '1px solid #2d2d32' }}>
              <span style={{ color: '#d1d5db' }}>Total Collections This Month</span>
              <span className="font-bold text-white">142 Samples</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
