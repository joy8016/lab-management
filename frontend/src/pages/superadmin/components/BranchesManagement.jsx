import React, { useState } from 'react'
import { useLims } from '../../../context/LimsContext'

export default function BranchesManagement() {
  const { branches, addBranch } = useLims()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!name || !address || !city) return
    addBranch(name, address, city)
    setName('')
    setAddress('')
    setCity('')
  }

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 font-sans text-left">
      <div className="border-b border-gray-50 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">Organization &amp; Branches</h2>
          <p className="text-xs text-gray-500 font-semibold mt-1">Configure diagnostic laboratories and affiliate collection centers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* List of branches */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Registered Centers</h3>
          <div className="divide-y divide-gray-50 border border-gray-100 rounded-2xl overflow-hidden">
            {branches.map((b) => (
              <div key={b.id} className="flex justify-between items-center p-4 bg-gray-50/20 hover:bg-gray-50/70 transition-colors">
                <div className="text-left">
                  <div className="text-xs font-bold text-gray-900">{b.name}</div>
                  <div className="text-[10px] text-gray-400 font-semibold mt-0.5">{b.address}, {b.city}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
                    {b.staff} Staff
                  </span>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Branch form */}
        <div className="bg-gray-50/40 p-5 rounded-2xl border border-gray-100 h-fit">
          <h3 className="text-xs font-black uppercase text-gray-600 tracking-wider mb-4 text-left">Register New Affiliate</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="text-left">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Branch Name</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Gotham North Clinic" 
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-blue-500 transition-colors mt-1 font-semibold"
                required
              />
            </div>
            <div className="text-left">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Street Address</label>
              <input 
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 742 Evergreen Terrace" 
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-blue-500 transition-colors mt-1 font-semibold"
                required
              />
            </div>
            <div className="text-left">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">City</label>
              <input 
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Springfield" 
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-blue-500 transition-colors mt-1 font-semibold"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer mt-2"
            >
              Add Affiliate Center
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
