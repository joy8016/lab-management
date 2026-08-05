import React, { useState } from 'react'
import { useLims } from '../../../context/LimsContext'

export default function UsersManagement() {
  const { users, toggleUserStatus, addUser } = useLims()

  const [activeFilter, setActiveFilter] = useState('All')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState('Lab Technician')

  const filterPills = ['All', 'Lab Manager', 'Pathologist', 'Lab Technician', 'Receptionist']

  const handleRegister = (e) => {
    e.preventDefault()
    if (!userName || !userEmail) return
    addUser(userName, userEmail, userRole)
    setUserName('')
    setUserEmail('')
  }

  // Filtered users selection
  const filteredUsers = users.filter((u) => {
    if (activeFilter === 'All') return true
    return u.role.toLowerCase() === activeFilter.toLowerCase()
  })

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 font-sans text-left">
      <div className="border-b border-gray-50 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <h2 className="text-base font-bold text-gray-900 tracking-tight">User Management</h2>
          <p className="text-xs text-gray-500 font-semibold mt-1">Manage employee accounts, directory lookup, and portal credentials.</p>
        </div>

        {/* Filter Pill Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-gray-50 p-1.5 rounded-xl border border-gray-100 shrink-0">
          {filterPills.map((p) => (
            <button
              key={p}
              onClick={() => setActiveFilter(p)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === p
                  ? 'bg-white text-gray-900 shadow-xs border border-gray-100'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Users Table list */}
        <div className="lg:col-span-2 overflow-hidden border border-gray-50 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50 text-gray-400 font-bold uppercase">
                <th className="px-4 py-3 font-bold tracking-wide">Member</th>
                <th className="px-4 py-3 font-bold tracking-wide">Role</th>
                <th className="px-4 py-3 font-bold tracking-wide">Account Status</th>
                <th className="px-4 py-3 font-bold tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
              {filteredUsers.map((u) => (
                <tr key={u.id || u._id} className="hover:bg-gray-50/20 transition-colors">
                  <td className="px-4 py-3.5 align-middle">
                    <div className="text-left">
                      <div className="text-xs font-bold text-gray-900">{u.name}</div>
                      <div className="text-[10px] text-gray-400 font-semibold mt-0.5">{u.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle text-gray-800 font-semibold">{u.role}</td>
                  <td className="px-4 py-3.5 align-middle">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      u.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <button
                      onClick={() => toggleUserStatus(u.id || u._id)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                        u.status === 'Active'
                          ? 'bg-red-50 hover:bg-red-100 text-red-600 border-red-100'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-100'
                      }`}
                    >
                      {u.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Provision Form */}
        <div className="bg-gray-50/40 p-5 rounded-2xl border border-gray-100 h-fit">
          <h3 className="text-xs font-black uppercase text-gray-600 tracking-wider mb-4 text-left">Register New Employee</h3>
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="text-left">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Full Name</label>
              <input 
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. John Doe" 
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-blue-500 transition-colors mt-1 font-semibold"
                required
              />
            </div>
            <div className="text-left">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Email Address</label>
              <input 
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="e.g. john@lims.org" 
                className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-blue-500 transition-colors mt-1 font-semibold"
                required
              />
            </div>
            <div className="text-left">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">System Role</label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-xl px-3 py-2 text-xs outline-none focus:border-blue-500 transition-colors mt-1 text-gray-700 font-semibold"
              >
                <option value="Lab Manager">Lab Manager</option>
                <option value="Pathologist">Pathologist</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Receptionist">Receptionist</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer mt-2"
            >
              Provision Account
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
