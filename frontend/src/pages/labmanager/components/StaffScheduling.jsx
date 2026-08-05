import React, { useState } from 'react'
import { useLims } from '../../../context/LimsContext'

export default function StaffScheduling({ deptStaffCount }) {
  const { roster, addShift, removeShift } = useLims()
  const biochemistryStaffCount = deptStaffCount('Biochemistry')

  // Local form state
  const [newStaffName, setNewStaffName] = useState('')
  const [newStaffDept, setNewStaffDept] = useState('Biochemistry')
  const [newStaffShift, setNewStaffShift] = useState('Morning')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!newStaffName.trim()) return
    addShift(newStaffName, newStaffDept, newStaffShift)
    setNewStaffName('')
  }

  // Roster item remover directly updating context state list
  const handleRemove = (id) => {
    // Note: since setRoster isn't explicitly defined in context, let's make sure it handles lists.
    // Wait, in LimsContext.jsx we have roster and setRoster, wait, did we export setRoster?
    // Let's check LimsContext: we exported:
    // view, setView, roster, addShift, inventoryRequests, approveRequest, rejectRequest, branches, addBranch, users, toggleUserStatus, addUser
    // Ah! In LimsContext we did not export setRoster! But we can filter the roster.
    // Wait! Let's check how roster is updated in LimsContext: we can add a removeRoster function in context, or we can update LimsContext to export setRoster!
    // Yes! Let's look at LimsContext value object: we can add "setRoster" or "removeRoster"!
    // Let's check if we can add a removeRoster handler or export setRoster in LimsContext. Yes, we can easily export it. Let's make sure it's exported, or let's use a removeShift handler in LimsContext!
    // Let's edit LimsContext or check it. We will export setRoster in LimsContext to make it simple, or add a removeShift(id) helper!
    // Yes, a removeShift(id) helper in LimsContext is cleaner! Let's use that!
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-5">
        <h2 className="text-xl font-bold text-gray-900 font-sans tracking-tight">
          Staff Scheduling &amp; Workload Distribution
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Create shifts, assign technicians, and distribute workload across departments to balance backlog bottlenecks.
        </p>
      </div>

      {biochemistryStaffCount < 2 && (
        <div className="flex gap-3 bg-amber-50 border border-amber-100 text-amber-800 rounded-2xl p-4 text-sm leading-relaxed shadow-sm animate-pulse">
          <span className="text-lg leading-none" role="img" aria-label="warning">⚠️</span>
          <div>
            <strong>Workload Staffing Alert:</strong> Biochemistry currently has <strong>22 pending samples</strong> but only <strong>{biochemistryStaffCount}</strong> staff member assigned. Reassign other technicians immediately to balance the operational bottleneck.
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <form onSubmit={onSubmit} className="w-full lg:w-80 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 self-start">
          <h3 className="text-base font-bold text-gray-900 border-b border-gray-50 pb-2">Assign Shift</h3>
          
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
              Staff Member Name
            </label>
            <input 
              type="text" 
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all placeholder:text-gray-400" 
              placeholder="e.g. Dr. John Doe"
              value={newStaffName}
              onChange={(e) => setNewStaffName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
              Assigned Department
            </label>
            <select 
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all text-gray-700"
              value={newStaffDept}
              onChange={(e) => setNewStaffDept(e.target.value)}
            >
              <option value="Biochemistry">Biochemistry</option>
              <option value="Hematology">Hematology</option>
              <option value="Radiology">Radiology</option>
              <option value="Microbiology">Microbiology</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
              Shift Roster
            </label>
            <select 
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all text-gray-700"
              value={newStaffShift}
              onChange={(e) => setNewStaffShift(e.target.value)}
            >
              <option value="Morning">Morning (06:00 - 14:00)</option>
              <option value="Evening">Evening (14:00 - 22:00)</option>
              <option value="Night">Night (22:00 - 06:00)</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 bg-teal-700 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-all hover:bg-teal-800 shadow-sm cursor-pointer"
          >
            Assign Staff Shift
          </button>
        </form>

        <div className="flex-1 overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm">
          <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                  Technician / Phlebotomist
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                  Department Scope
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                  Active Shift
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {roster.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 align-middle">
                    <strong className="font-semibold text-gray-900">{staff.name}</strong>
                  </td>
                  <td className="px-6 py-4 align-middle text-gray-700">{staff.dept}</td>
                  <td className="px-6 py-4 align-middle text-gray-700">{staff.shift}</td>
                  <td className="px-6 py-4 align-middle">
                    <button 
                      className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg text-xs font-semibold hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer"
                      onClick={() => removeShift(staff.id || staff._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
