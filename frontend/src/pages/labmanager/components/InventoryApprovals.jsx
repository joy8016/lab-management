import React from 'react'
import { useLims } from '../../../context/LimsContext'

export default function InventoryApprovals() {
  const { inventoryRequests, approveRequest, rejectRequest } = useLims()

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-5">
        <h2 className="text-xl font-bold text-gray-900 font-sans tracking-tight">
          Approve Inventory Purchase Requests
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Review, approve, or reject supply reorders raised by technicians for consumables and kit reagents.
        </p>
      </div>

      <div className="overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm">
        <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                Req ID
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                Consumable Item
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                Qty Requested
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                Raised By
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                Status
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-600 border-b border-gray-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 bg-white">
            {inventoryRequests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 align-middle">
                  <code className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {req.id}
                  </code>
                </td>
                <td className="px-6 py-4 align-middle">
                  <strong className="font-semibold text-gray-900">{req.item}</strong>
                </td>
                <td className="px-6 py-4 align-middle text-gray-700">{req.qty} Kits</td>
                <td className="px-6 py-4 align-middle text-gray-700">{req.requester}</td>
                <td className="px-6 py-4 align-middle">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    req.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                    req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                    'bg-red-50 text-red-700 border border-red-100'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 align-middle">
                  {req.status === 'Pending' ? (
                    <div className="flex gap-2">
                      <button 
                        className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-xs font-semibold hover:bg-emerald-100 hover:text-emerald-700 transition-colors cursor-pointer"
                        onClick={() => approveRequest(req.id)}
                      >
                        Approve
                      </button>
                      <button 
                        className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg text-xs font-semibold hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer"
                        onClick={() => rejectRequest(req.id)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-medium text-gray-400">Locked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
