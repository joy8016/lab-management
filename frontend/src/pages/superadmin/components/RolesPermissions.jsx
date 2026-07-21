import React from 'react'

export default function RolesPermissions() {
  const rolesData = [
    { role: 'Super Admin', desc: 'Root permissions, branch configuration, billing schemas, audits.', users: 2, level: 'Level 4 (System)' },
    { role: 'Lab Manager', desc: 'Overview stats, daily technician roster scheduling, inventory approval.', users: 4, level: 'Level 3 (Operational)' },
    { role: 'Pathologist', desc: 'Digital report verification, signing, laboratory test catalogs.', users: 3, level: 'Level 3 (Diagnostic)' },
    { role: 'Lab Technician', desc: 'Processing tubes, calibrating equipment, submitting findings.', users: 12, level: 'Level 2 (Technician)' },
    { role: 'Receptionist', desc: 'Patient check-in, profile registration, payments, billing queries.', users: 8, level: 'Level 1 (Clerical)' }
  ]

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 font-sans">
      <div className="border-b border-gray-50 pb-4">
        <h2 className="text-base font-bold text-gray-900 tracking-tight">Roles &amp; Permissions</h2>
        <p className="text-xs text-gray-500 font-semibold mt-1">Configure diagnostic authorization criteria, access tokens, and administrative hierarchy.</p>
      </div>

      <div className="space-y-4 text-left">
        <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">System Role Definitions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rolesData.map((r, idx) => (
            <div key={idx} className="p-5 bg-gray-50/30 border border-gray-100 rounded-2xl flex flex-col justify-between hover:bg-gray-50/60 transition-colors">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-gray-900">{r.role}</span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                    {r.level}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium leading-relaxed">{r.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100/50 flex justify-between items-center text-[10px] font-bold text-gray-400">
                <span>{r.users} active profiles</span>
                <span className="text-blue-600 hover:underline cursor-pointer">Configure Policies →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
