import React, { useState } from 'react'

export default function RolesPermissions() {
  const initialRoles = [
    { 
      id: 'super_admin',
      role: 'Super Admin', 
      desc: 'Root permissions, branch configuration, billing schemas, audits.', 
      users: 2, 
      level: 'Level 4 (System)',
      tokenValidity: '24 Hours',
      permissions: {
        readRecords: true,
        writeBilling: true,
        manageRoster: true,
        signReports: true,
        auditExport: true,
        apiAccess: true,
        userControl: true
      }
    },
    { 
      id: 'lab_manager',
      role: 'Lab Manager', 
      desc: 'Overview stats, daily technician roster scheduling, inventory approval.', 
      users: 4, 
      level: 'Level 3 (Operational)',
      tokenValidity: '12 Hours',
      permissions: {
        readRecords: true,
        writeBilling: false,
        manageRoster: true,
        signReports: false,
        auditExport: true,
        apiAccess: false,
        userControl: true
      }
    },
    { 
      id: 'pathologist',
      role: 'Pathologist', 
      desc: 'Digital report verification, signing, laboratory test catalogs.', 
      users: 3, 
      level: 'Level 3 (Diagnostic)',
      tokenValidity: '12 Hours',
      permissions: {
        readRecords: true,
        writeBilling: false,
        manageRoster: false,
        signReports: true,
        auditExport: false,
        apiAccess: false,
        userControl: false
      }
    },
    { 
      id: 'lab_technician',
      role: 'Lab Technician', 
      desc: 'Processing tubes, calibrating equipment, submitting findings.', 
      users: 12, 
      level: 'Level 2 (Technician)',
      tokenValidity: '8 Hours',
      permissions: {
        readRecords: true,
        writeBilling: false,
        manageRoster: false,
        signReports: false,
        auditExport: false,
        apiAccess: false,
        userControl: false
      }
    },
    { 
      id: 'receptionist',
      role: 'Receptionist', 
      desc: 'Patient check-in, profile registration, payments, billing queries.', 
      users: 8, 
      level: 'Level 1 (Clerical)',
      tokenValidity: '8 Hours',
      permissions: {
        readRecords: true,
        writeBilling: true,
        manageRoster: false,
        signReports: false,
        auditExport: false,
        apiAccess: false,
        userControl: false
      }
    }
  ]

  const [roles, setRoles] = useState(initialRoles)
  const [selectedRole, setSelectedRole] = useState(null)
  const [successToast, setSuccessToast] = useState('')

  const handleOpenConfigure = (roleObj) => {
    setSelectedRole({ ...roleObj })
  }

  const handleTogglePermission = (permKey) => {
    if (!selectedRole) return
    setSelectedRole((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permKey]: !prev.permissions[permKey]
      }
    }))
  }

  const handleSavePolicy = (e) => {
    e.preventDefault()
    if (!selectedRole) return

    setRoles((prevRoles) =>
      prevRoles.map((r) => (r.id === selectedRole.id ? selectedRole : r))
    )
    
    setSuccessToast(`Policy configuration updated successfully for ${selectedRole.role}`)
    setSelectedRole(null)
    setTimeout(() => setSuccessToast(''), 4000)
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 font-sans text-left relative">
      {/* Success Notification Banner */}
      {successToast && (
        <div className="bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center justify-between animate-fade-in transition-all">
          <div className="flex items-center gap-3 text-xs font-bold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast('')} className="text-white/80 hover:text-white text-xs font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Header section */}
      <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">Roles &amp; Permissions</h2>
          <p className="text-xs text-gray-500 font-semibold mt-1">Configure diagnostic authorization criteria, access tokens, and administrative hierarchy.</p>
        </div>
        <button
          onClick={() => handleOpenConfigure(roles[0])}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
        >
          + Global Policy Preset
        </button>
      </div>

      {/* Roles Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">System Role Definitions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((r) => (
            <div key={r.id} className="p-5 bg-gray-50/40 border border-gray-100 rounded-2xl flex flex-col justify-between hover:bg-gray-50/80 transition-all shadow-2xs hover:shadow-xs group">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-gray-900 group-hover:text-blue-600 transition-colors">{r.role}</span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                    {r.level}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium leading-relaxed">{r.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-bold">
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">Token: {r.tokenValidity}</span>
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100">
                    {Object.values(r.permissions).filter(Boolean).length} Active Scopes
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400">
                <span>{r.users} active profiles</span>
                <button
                  onClick={() => handleOpenConfigure(r)}
                  className="text-blue-600 hover:text-blue-800 font-extrabold hover:underline cursor-pointer flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  Configure Policies →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configure Policies Modal Drawer */}
      {selectedRole && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-500/20 text-blue-200 border border-blue-400/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                    {selectedRole.level}
                  </span>
                  <span className="text-xs text-blue-200 font-semibold">{selectedRole.users} active profiles</span>
                </div>
                <h3 className="text-xl font-black mt-1 tracking-tight">Configure Policies: {selectedRole.role}</h3>
                <p className="text-xs text-blue-100/80 font-medium mt-0.5">{selectedRole.desc}</p>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSavePolicy} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Security Token Expiration */}
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-2">
                <label className="block text-xs font-bold text-gray-900">
                  Access Token Expiration Window
                </label>
                <select
                  value={selectedRole.tokenValidity}
                  onChange={(e) => setSelectedRole({ ...selectedRole, tokenValidity: e.target.value })}
                  className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="4 Hours">4 Hours (Strict Laboratory Protocol)</option>
                  <option value="8 Hours">8 Hours (Standard Shift)</option>
                  <option value="12 Hours">12 Hours (Extended Shift)</option>
                  <option value="24 Hours">24 Hours (Administrative Root)</option>
                  <option value="7 Days">7 Days (Persistent Access)</option>
                </select>
                <p className="text-[10px] text-gray-500 font-medium">
                  Users assigned to this role will be required to re-authenticate once token validity expires.
                </p>
              </div>

              {/* Authorization Scopes Matrix */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">
                  Authorization Matrix &amp; Scopes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-start gap-3 p-3.5 bg-gray-50/70 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedRole.permissions.readRecords}
                      onChange={() => handleTogglePermission('readRecords')}
                      className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-gray-900 block">Read Master Records</span>
                      <span className="text-[10px] text-gray-500 font-medium">Access patient data and lab diagnostics</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 bg-gray-50/70 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedRole.permissions.writeBilling}
                      onChange={() => handleTogglePermission('writeBilling')}
                      className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-gray-900 block">Write Billing &amp; Pricing</span>
                      <span className="text-[10px] text-gray-500 font-medium">Modify payment invoices and pricing models</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 bg-gray-50/70 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedRole.permissions.manageRoster}
                      onChange={() => handleTogglePermission('manageRoster')}
                      className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-gray-900 block">Manage Staff Rosters</span>
                      <span className="text-[10px] text-gray-500 font-medium">Assign work shifts and department schedules</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 bg-gray-50/70 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedRole.permissions.signReports}
                      onChange={() => handleTogglePermission('signReports')}
                      className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-gray-900 block">Sign &amp; Verify Reports</span>
                      <span className="text-[10px] text-gray-500 font-medium">Digital clearance for diagnostic results</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 bg-gray-50/70 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedRole.permissions.auditExport}
                      onChange={() => handleTogglePermission('auditExport')}
                      className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-gray-900 block">Audit Log Export</span>
                      <span className="text-[10px] text-gray-500 font-medium">Download security events and access logs</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 bg-gray-50/70 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedRole.permissions.apiAccess}
                      onChange={() => handleTogglePermission('apiAccess')}
                      className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-gray-900 block">API Access Tokens</span>
                      <span className="text-[10px] text-gray-500 font-medium">Generate programmatic access tokens</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all cursor-pointer"
                >
                  Save Policy Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
