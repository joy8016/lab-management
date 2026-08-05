import React from 'react'
import { ClipboardIcon, FlaskIcon, ShieldIcon } from '../../../components/Icons'
import { useLims } from '../../../context/LimsContext'

export default function OperationsOverview({ activeStaffCount, deptStaffCount }) {
  const { operationsOverview } = useLims()

  const biochemistryStaff = deptStaffCount('Biochemistry')
  const hematologyStaff = deptStaffCount('Hematology')
  const radiologyStaff = deptStaffCount('Radiology')
  const microbiologyStaff = deptStaffCount('Microbiology')

  const avgTat = operationsOverview?.avgTat || '28 Min'
  const pendingLabSamples = operationsOverview?.pendingLabSamples || 36
  const staffCountOnDuty = activeStaffCount || operationsOverview?.activeStaffCount || 4

  const departments = operationsOverview?.departments || [
    { name: 'Biochemistry', pendingSamples: 22, avgProcessTime: '34 mins', staffCount: biochemistryStaff, status: biochemistryStaff < 2 ? 'Staffing Alert' : 'Healthy' },
    { name: 'Hematology', pendingSamples: 8, avgProcessTime: '18 mins', staffCount: hematologyStaff, status: 'Optimal' },
    { name: 'Radiology', pendingSamples: 2, avgProcessTime: '45 mins', staffCount: radiologyStaff, status: 'Optimal' },
    { name: 'Microbiology', pendingSamples: 4, avgProcessTime: '72 mins', staffCount: microbiologyStaff, status: 'Optimal' },
  ]

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-5">
        <h2 className="text-xl font-bold text-gray-900 font-sans tracking-tight">Daily Operations Monitor</h2>
        <p className="mt-1 text-sm text-gray-500">
          Monitor turnaround times, pending bottlenecks, and cross-department throughput.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <ClipboardIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{avgTat}</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-0.5">
              Avg Turnaround Time (TAT)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-50 text-amber-700 animate-pulse">
            <FlaskIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{pendingLabSamples}</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-0.5">
              Pending Lab Samples
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-sky-50 text-sky-700">
            <ShieldIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{staffCountOnDuty} / 8</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-0.5">
              Active Technicians On-Duty
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm">
        <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                Department
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                Pending Samples
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                Avg Process Time
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                Staff Count
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                Operational Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 bg-white">
            {departments.map((dept) => {
              const currentStaff = dept.name === 'Biochemistry' ? biochemistryStaff : dept.name === 'Hematology' ? hematologyStaff : dept.name === 'Radiology' ? radiologyStaff : microbiologyStaff
              const isAlert = dept.name === 'Biochemistry' && currentStaff < 2

              return (
                <tr key={dept.name} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 align-middle">
                    <strong className="font-semibold text-gray-900">{dept.name}</strong>
                  </td>
                  <td className="px-6 py-4 align-middle text-gray-700">{dept.pendingSamples}</td>
                  <td className="px-6 py-4 align-middle text-gray-700">{dept.avgProcessTime}</td>
                  <td className="px-6 py-4 align-middle text-gray-700">{currentStaff} Staff</td>
                  <td className="px-6 py-4 align-middle">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isAlert
                          ? 'bg-red-50 text-red-700 border border-red-100'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      }`}
                    >
                      {isAlert ? 'Staffing Alert' : dept.status || 'Optimal'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
