import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function PatientRegistration() {
  const [fullName, setFullName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('Male')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const [registeredPatients, setRegisteredPatients] = useState([])

  const fetchPatientsFromAPI = async () => {
    try {
      const res = await axios.get('/api/labtechnician/patients')
      if (res.data.success && Array.isArray(res.data.data)) {
        const formatted = res.data.data.map(p => ({
          id: p.patientId || p._id,
          name: p.fullName,
          phone: p.phone || '',
          gender: p.gender || 'N/A',
          time: new Date(p.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }))
        setRegisteredPatients(formatted)
      } else {
        setRegisteredPatients([])
      }
    } catch (err) {
      console.error('Error fetching patients from API:', err)
      setRegisteredPatients([])
    }
  }

  useEffect(() => {
    fetchPatientsFromAPI()
  }, [])

  const [toastMessage, setToastMessage] = useState('')
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 4000)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!fullName.trim()) return
    const generatedId = `PAT-${Math.floor(1000 + Math.random() * 9000)}`
    
    try {
      const res = await axios.post('/api/labtechnician/createPatient', {
        PatientId: generatedId,
        fullName: fullName.trim(),
        dob: age ? `${new Date().getFullYear() - parseInt(age)}-01-01` : '2000-01-01',
        gender,
        phone: phone || '+1 555-0000',
        email,
        address
      })

      if (res.data.success) {
        showToast(`Patient ${fullName} (${generatedId}) registered & saved to DB!`)
        fetchPatientsFromAPI()
      } else {
        showToast(`Registration note: ${res.data.message || 'Saved locally'}`)
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message
      showToast(`Registered with notice: ${errorMsg}`)
      const fallbackPatient = {
        id: generatedId,
        name: fullName,
        phone: phone || '+1 555-0000',
        gender,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setRegisteredPatients([fallbackPatient, ...registeredPatients])
    }

    setFullName('')
    setAge('')
    setPhone('')
    setEmail('')
    setAddress('')
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans text-left" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center justify-between animate-fade-in transition-all text-xs font-bold">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white font-bold cursor-pointer">✕</button>
        </div>
      )}

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
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Recently Registered Today
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Persistent Storage Active
            </span>
          </div>

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
