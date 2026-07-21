import React from 'react'
import { useLims } from '../context/LimsContext'
import {
  LIMSLogo,
  HIPAALogo,
  GDPRLogo,
  SuperAdminIcon,
  LabManagerIcon,
  PathologistIcon,
  LabTechnicianIcon,
  SampleCollectorIcon,
  ReceptionistIcon
} from '../components/Icons'

export default function LandingPage() {
  const { setView, selectRole } = useLims()

  // Roles details array mapped to designs in screenshot
  const roles = [
    {
      id: 'super-admin',
      name: 'Super Admin',
      description: 'Complete system control, audit logs, and global configuration.',
      icon: SuperAdminIcon,
      cardBg: 'bg-[#e9effc]',
      borderColor: 'border-[#1e3a8a]',
      offsetBg: 'bg-[#102a43]'
    },
    {
      id: 'lab-manager',
      name: 'Lab Manager',
      description: 'Optimize workflow, manage inventory, and track team KPIs.',
      icon: LabManagerIcon,
      cardBg: 'bg-[#eafaf1]',
      borderColor: 'border-[#1b4332]',
      offsetBg: 'bg-[#1b4332]'
    },
    {
      id: 'pathologist',
      name: 'Pathologist',
      description: 'Review digital pathology, sign reports, and collaborate.',
      icon: PathologistIcon,
      cardBg: 'bg-[#e0f7fa]',
      borderColor: 'border-[#0f766e]',
      offsetBg: 'bg-[#0f766e]'
    },
    {
      id: 'lab-technician',
      name: 'Lab Technician',
      description: 'Process batches, manage test queues, and validate results.',
      icon: LabTechnicianIcon,
      cardBg: 'bg-[#fff3e0]',
      borderColor: 'border-[#7c2d12]',
      offsetBg: 'bg-[#7c2d12]'
    },
    {
      id: 'sample-collector',
      name: 'Sample Collector',
      description: 'Track collection routes, manage patient schedules, and maintain chain of custody.',
      icon: SampleCollectorIcon,
      cardBg: 'bg-[#fffde7]',
      borderColor: 'border-[#713f12]',
      offsetBg: 'bg-[#713f12]'
    },
    {
      id: 'receptionist',
      name: 'Receptionist',
      description: 'Streamline patient registration, scheduling, and billing.',
      icon: ReceptionistIcon,
      cardBg: 'bg-[#fce4ec]',
      borderColor: 'border-[#701a75]',
      offsetBg: 'bg-[#701a75]'
    }
  ]

  const handleRoleSelect = (roleId) => {
    // Calls server-verified token check before routing to role page or registration page
    selectRole(roleId)
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans">
      {/* Vertical background split for desktop */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[#e6f4f2] z-0 hidden md:block"></div>

      {/* Navigation Bar */}
      <header className="relative z-10 w-full border-b border-gray-105 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <LIMSLogo />
          <div className="flex items-center gap-6">
            <button
              className="text-sm font-semibold text-gray-750 hover:text-teal-700 cursor-pointer transition-colors"
              onClick={() => setView('login')}
            >
              Login
            </button>
            <button
              className="border-2 border-blue-500 hover:bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-xl text-sm transition-all cursor-pointer shadow-xs"
              onClick={() => alert('Sales portal connection is currently active. Our team will contact you shortly!')}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20">
        {/* Title Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-[2.6rem] font-bold text-gray-900 tracking-tight font-sans">
            Access Your Lab Command Center
          </h1>
        </div>

        {/* Roles Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {roles.map((role) => {
            const IconComponent = role.icon
            return (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className="relative group cursor-pointer"
              >
                {/* Shadow offset card background (offset bottom-left) */}
                <div className={`absolute inset-0 rounded-[1.75rem] ${role.offsetBg} -translate-x-2.5 translate-y-2.5 z-0`} />

                {/* Front colored Neo-brutalist card */}
                <div className={`relative ${role.cardBg} border-2 ${role.borderColor} rounded-[1.75rem] p-6 z-10 flex items-start gap-4 shadow-sm transition-all duration-300 transform hover:-translate-x-1.5 hover:translate-y-1.5 min-h-[170px]`}>
                  
                  {/* Icon illustration (rendered directly on card background) */}
                  <div className="shrink-0">
                    <IconComponent />
                  </div>

                  {/* Text labels */}
                  <div className="flex-1 text-left space-y-1.5 pr-5">
                    <h2 className="text-[17px] font-extrabold text-gray-900 tracking-tight leading-snug">
                      {role.name}
                    </h2>
                    <p className="text-[11.5px] text-gray-600 leading-normal font-semibold">
                      {role.description}
                    </p>
                  </div>

                  {/* Circle arrow-right action button */}
                  <div className="absolute bottom-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-[#1e88e5] text-white flex items-center justify-center shadow-md transition-colors group-hover:bg-[#1565c0]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Section - Universal Security */}
        <div className="mt-24 text-center flex flex-col items-center gap-4">
          <span className="text-xs font-extrabold uppercase text-gray-800 tracking-widest leading-none font-heading">
            Universal Security
          </span>
          <div className="flex justify-center items-center gap-8 mt-2">
            <HIPAALogo />
            <GDPRLogo />
          </div>
        </div>
      </main>

    </div>
  )
}
