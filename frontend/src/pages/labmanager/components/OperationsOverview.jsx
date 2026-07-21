import React from 'react'
import { ClipboardIcon, FlaskIcon, ShieldIcon } from '../../../components/Icons'

export default function OperationsOverview({ activeStaffCount, deptStaffCount }) {
  const biochemistryStaff = deptStaffCount('Biochemistry')
  const hematologyStaff = deptStaffCount('Hematology')
  const radiologyStaff = deptStaffCount('Radiology')
  const microbiologyStaff = deptStaffCount('Microbiology')

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
            <div className="text-2xl font-extrabold text-gray-900 tracking-tight">28 Min</div>
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
            <div className="text-2xl font-extrabold text-gray-900 tracking-tight">36</div>
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
            <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{activeStaffCount} / 8</div>
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
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 align-middle">
                <strong className="font-semibold text-gray-900">Biochemistry</strong>
              </td>
              <td className="px-6 py-4 align-middle text-gray-700">22</td>
              <td className="px-6 py-4 align-middle text-gray-700">34 mins</td>
              <td className="px-6 py-4 align-middle text-gray-700">{biochemistryStaff} Staff</td>
              <td className="px-6 py-4 align-middle">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    biochemistryStaff < 2
                      ? 'bg-red-50 text-red-700 border border-red-100'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}
                >
                  {biochemistryStaff < 2 ? 'Staffing Alert' : 'Healthy'}
                </span>
              </td>
            </tr>

            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 align-middle">
                <strong className="font-semibold text-gray-900">Hematology</strong>
              </td>
              <td className="px-6 py-4 align-middle text-gray-700">8</td>
              <td className="px-6 py-4 align-middle text-gray-700">18 mins</td>
              <td className="px-6 py-4 align-middle text-gray-700">{hematologyStaff} Staff</td>
              <td className="px-6 py-4 align-middle">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Optimal
                </span>
              </td>
            </tr>

            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 align-middle">
                <strong className="font-semibold text-gray-900">Radiology</strong>
              </td>
              <td className="px-6 py-4 align-middle text-gray-700">2</td>
              <td className="px-6 py-4 align-middle text-gray-700">45 mins</td>
              <td className="px-6 py-4 align-middle text-gray-700">{radiologyStaff} Staff</td>
              <td className="px-6 py-4 align-middle">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Optimal
                </span>
              </td>
            </tr>

            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 align-middle">
                <strong className="font-semibold text-gray-900">Microbiology</strong>
              </td>
              <td className="px-6 py-4 align-middle text-gray-700">4</td>
              <td className="px-6 py-4 align-middle text-gray-700">72 mins</td>
              <td className="px-6 py-4 align-middle text-gray-700">{microbiologyStaff} Staff</td>
              <td className="px-6 py-4 align-middle">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Optimal
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
