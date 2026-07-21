import React, { useState } from 'react'

export default function MySchedule() {
  const [schedule] = useState([
    { id: 1, time: '08:30 AM', patient: 'A. Sharma', address: '42 Park Street, Flat 3B', type: 'Home visit', tests: 'CBC, Lipid Profile', status: 'Collected' },
    { id: 2, time: '09:15 AM', patient: 'P. Nair', address: 'Main Lab Desk 2', type: 'In-lab', tests: 'HbA1c, Thyroid', status: 'Collected' },
    { id: 3, time: '10:00 AM', patient: 'S. Ghosh', address: '18 Lake Road, Sector 5', type: 'Home visit', tests: 'Liver Function Test', status: 'In progress' },
    { id: 4, time: '11:30 AM', patient: 'R. Banerjee', address: 'Main Lab Desk 1', type: 'In-lab', tests: 'Renal Panel', status: 'Scheduled' },
    { id: 5, time: '01:00 PM', patient: 'M. Das', address: '77 Salt Lake, Block B', type: 'Home visit', tests: 'Vitamin D, B12', status: 'Scheduled' },
  ])

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6 font-sans" style={{ backgroundColor: '#141416', color: '#ffffff' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">My Schedule</h2>
          <p className="text-xs font-semibold mt-1" style={{ color: '#9ca3af' }}>Today's assigned phlebotomy visits and lab appointments</p>
        </div>
        <button
          className="px-4 py-2 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
          style={{ backgroundColor: '#0284c7' }}
        >
          Refresh Visits
        </button>
      </div>

      <div className="space-y-4">
        {schedule.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            style={{ backgroundColor: '#202024', border: '1px solid #2d2d32' }}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span
                  className="text-sm font-black px-3 py-1 rounded-lg"
                  style={{ backgroundColor: 'rgba(12, 74, 110, 0.6)', color: '#38bdf8', border: '1px solid rgba(7, 89, 133, 0.4)' }}
                >
                  {item.time}
                </span>
                <h3 className="text-base font-extrabold text-white">{item.patient}</h3>
                <span className="text-xs font-bold" style={{ color: '#9ca3af' }}>({item.type})</span>
              </div>
              <p className="text-xs font-semibold" style={{ color: '#d1d5db' }}>{item.address}</p>
              <p className="text-xs font-medium" style={{ color: '#9ca3af' }}>Tests Requested: <span className="text-white font-bold">{item.tests}</span></p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={
                  item.status === 'Collected'
                    ? { backgroundColor: 'rgba(20, 83, 45, 0.8)', color: '#22c55e', border: '1px solid rgba(21, 128, 61, 0.5)' }
                    : item.status === 'In progress'
                    ? { backgroundColor: 'rgba(69, 26, 3, 0.8)', color: '#f59e0b', border: '1px solid rgba(180, 83, 9, 0.5)' }
                    : { backgroundColor: '#333338', color: '#d1d5db', border: '1px solid #44444a' }
                }
              >
                {item.status}
              </span>
              <button
                className="px-3.5 py-1.5 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                style={{ backgroundColor: '#2a2a30', border: '1px solid #383840' }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
