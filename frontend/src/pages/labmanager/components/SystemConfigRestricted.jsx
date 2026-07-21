import React from 'react'
import { LockIcon } from '../../../components/Icons'

export default function SystemConfigRestricted() {
  return (
    <div className="py-12">
      <div className="max-w-md mx-auto text-center bg-white border border-gray-100 p-8 rounded-2xl shadow-sm flex flex-col items-center gap-4">
        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center border border-red-100">
          <LockIcon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">System Configuration Restricted</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Access is denied. Altering system billing guidelines, fee templates, 
          creating new user portals, or modifying department permissions is strictly 
          restricted to the <strong className="text-gray-900 font-semibold">Super Admin</strong> role to preserve audit trails.
        </p>
      </div>
    </div>
  )
}
