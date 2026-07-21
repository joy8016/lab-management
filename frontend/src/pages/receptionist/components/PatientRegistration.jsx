import React, { useState } from 'react'

export default function PatientRegistration() {
  const [fullName, setFullName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('Male')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [registeredPatients, setRegisteredPatients] = useState([
    { id: 'PAT-1029', name: 'John Doe', phone: '+1 555-0192', gender: 'Male', time: '10:15 AM' },
    { id: 'PAT-1028', name: 'Jane Smith', phone: '+1 555-0184', gender: 'Female', time: '09:40 AM' },
  ])

  const handleRegister = (e) => {
    e.preventDefault()
    if (!fullName.trim()) return
    const newPatient = {
      id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      name: fullName,
      phone: phone || '+1 555-0000',
      gender,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setRegisteredPatients([newPatient, ...registeredPatients])
    setFullName('')
    setAge('')
    setPhone('')
    setEmail('')
    setAddress('')
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Patient Registration</h2>
        <p className="text-xs text-slate-500 font-semibold mt-1">Register new walk-in or appointment patients into the LIMS database</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Form */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            New Patient Entry Form
          </h3>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-[#1a5fb4]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Age</label>
                <input
                  type="number"
                  placeholder="e.g. 42"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-[#1a5fb4]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-[#1a5fb4]"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 555-xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-[#1a5fb4]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-[#1a5fb4]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Residential Address</label>
              <input
                type="text"
                placeholder="Street address, City, Postal Code"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-[#1a5fb4]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#1a5fb4] hover:bg-[#14498c] text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Complete Patient Registration
            </button>
          </form>
        </div>

        {/* Recently Registered Patients */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Recently Registered Today
          </h3>
          <div className="space-y-3">
            {registeredPatients.map((p) => (
              <div key={p.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono font-bold text-[#1a5fb4]">{p.id}</p>
                  <p className="text-sm font-bold text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{p.phone} • {p.gender}</p>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                  {p.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
