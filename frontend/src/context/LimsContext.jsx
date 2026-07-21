import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

// Configure Axios defaults
axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

const LimsContext = createContext()

export function LimsProvider({ children }) {
  // Navigation View State: 'landing' | 'lab-manager' | 'super-admin' | 'pathologist' | 'lab-technician' | 'sample-collector' | 'receptionist' | 'register' | 'login'
  const [view, setView] = useState('landing')

  // Tracks which role the user clicked so we can redirect after auth
  const [pendingRole, setPendingRole] = useState(null)

  // Current authenticated user state
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Pathologist: Cases Queue State
  const [cases, setCases] = useState([
    { id: 'PT98765', patientName: 'PT98765***', type: 'Example', urgency: 'Urgent', time: 'Today 11:38 AM', status: 'Technician Submitted' },
    { id: 'PT98766', patientName: 'PT98765***', type: 'Case Case', urgency: 'Urgent', time: 'Today 11:38 AM', status: 'Technician Submitted' },
    { id: 'PT98764', patientName: 'PT98764', type: 'Example', urgency: 'Urgent', time: 'Today 11:30 AM', status: 'Technician Submitted' },
    { id: 'PT98765-2', patientName: 'PT98765', type: 'Example', urgency: 'Urgent', time: 'Today 11:30 AM', status: 'Technician Submitted' },
    { id: 'PT98767', patientName: 'PT98767**', type: 'Man Lab', urgency: 'Urgent', time: 'Today 11:30 AM', status: 'Technician Submitted' },
    { id: 'PT98763', patientName: 'PT98763', type: 'Example', urgency: 'Urgent', time: 'Today 11:30 AM', status: 'Technician Submitted' }
  ])

  // Lab Manager: Roster Schedule State
  const [roster, setRoster] = useState([
    { id: 1, name: 'Dr. Sarah Jenkins', dept: 'Hematology', shift: 'Morning' },
    { id: 2, name: 'Robert Chen', dept: 'Biochemistry', shift: 'Evening' },
    { id: 3, name: 'Jane Doe', dept: 'Radiology', shift: 'Night' },
    { id: 4, name: 'Elena Rostova', dept: 'Microbiology', shift: 'Morning' }
  ])

  // Lab Manager: Inventory / Reagent Requests State
  const [inventoryRequests, setInventoryRequests] = useState([
    { id: 'REQ-201', item: 'CBC Reagent Kits', qty: 50, requester: 'T. Miller', status: 'Pending' },
    { id: 'REQ-202', item: 'Blood Collection Tubes (Lavender)', qty: 100, requester: 'V. Patel', status: 'Pending' },
    { id: 'REQ-203', item: 'PCR Diagnostic Cartridges', qty: 30, requester: 'L. Gomez', status: 'Pending' },
    { id: 'REQ-204', item: 'Sterile Swabs & Media Kits', qty: 200, requester: 'J. Smith', status: 'Approved' }
  ])

  // Super Admin: Affiliate Branches list
  const [branches, setBranches] = useState([
    { id: 1, name: 'Main Lab HQ', address: '102 Medical Drive', city: 'Metropolis', staff: 14, status: 'Active' },
    { id: 2, name: 'City Clinic', address: '405 Plaza Ave Suite 4', city: 'Metropolis', staff: 6, status: 'Active' },
    { id: 3, name: 'Mary Lab', address: '98 St. Mary Street', city: 'Gotham', staff: 5, status: 'Active' },
    { id: 4, name: 'Twin Lab', address: '881 Twin Peaks Road', city: 'Twin Peaks', staff: 4, status: 'Active' },
    { id: 5, name: 'July Lab', address: '501 Summer Blvd', city: 'Star City', staff: 8, status: 'Active' }
  ])

  // Super Admin: Users/Employees account list
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@lims.org', role: 'Lab Manager', status: 'Active' },
    { id: 2, name: 'Bob Johnson', email: 'bob@lims.org', role: 'Pathologist', status: 'Active' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@lims.org', role: 'Lab Technician', status: 'Active' },
    { id: 4, name: 'Diana Prince', email: 'diana@lims.org', role: 'Receptionist', status: 'Active' },
    { id: 5, name: 'Evan Wright', email: 'evan@lims.org', role: 'Sample Collector', status: 'Suspended' }
  ])

  // Action Handlers
  const addShift = (name, dept, shift) => {
    const newRosterItem = { id: Date.now(), name, dept, shift }
    setRoster((prev) => [...prev, newRosterItem])
  }

  const approveRequest = (id) => {
    setInventoryRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req))
    )
  }

  const rejectRequest = (id) => {
    setInventoryRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'Rejected' } : req))
    )
  }

  const addBranch = (name, address, city) => {
    const newBranch = {
      id: branches.length + 1,
      name,
      address,
      city,
      staff: 1,
      status: 'Active'
    }
    setBranches((prev) => [...prev, newBranch])
  }

  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u))
    )
  }

  const addUser = (name, email, role) => {
    const newUser = { id: users.length + 1, name, email, role, status: 'Active' }
    setUsers((prev) => [...prev, newUser])
  }

  const signReport = (caseId) => {
    setCases((prev) => prev.map((c) => (c.id === caseId ? { ...c, status: 'Signed & Finalized' } : c)))
  }

  // Load current user profile on app start/mount
  useEffect(() => {
    const loadCurrentUser = async () => {
      const token = localStorage.getItem('lims_token')
      if (token || localStorage.getItem('lims_logged_in') === 'true') {
        try {
          const headers = token ? { Authorization: `Bearer ${token}` } : {}
          const { data } = await axios.get('/api/auth/me', { headers })
          if (data.success && data.exists && data.user) {
            setUser(data.user)
            setView(data.user.role)
          } else {
            throw new Error('User profile verification failed')
          }
        } catch (error) {
          setUser(null)
          localStorage.removeItem('lims_token')
          localStorage.removeItem('lims_logged_in')
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    loadCurrentUser()
  }, [])

  // SELECT ROLE HANDLER: Verifies token, expiration date & role match on server when role card is clicked
  const selectRole = async (roleId) => {
    const token = localStorage.getItem('lims_token')

    if (token) {
      try {
        const { data } = await axios.post(
          '/api/auth/verify-role',
          { requestedRole: roleId },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        // CASE 1: User exists, token valid (within timing window), and role MATCHES -> Open Role Portal directly!
        if (data.success && data.exists && !data.roleMismatch && data.user) {
          setUser(data.user)
          localStorage.setItem('lims_logged_in', 'true')
          setView(roleId)
          return
        }

        // CASE 2: User visits after token validation date (token EXPIRED) -> Open LOGIN PAGE!
        if (data.expired) {
          console.log('Token expired after validation date. Redirecting to Login.')
          localStorage.removeItem('lims_token')
          localStorage.removeItem('lims_logged_in')
          setUser(null)
          setPendingRole(roleId)
          setView('login')
          return
        }

        // CASE 3: Role Mismatch (e.g. Registered Super Admin clicking Lab Technician) -> Open REGISTRATION PAGE
        if (data.roleMismatch) {
          console.log(`Role mismatch: Registered as ${data.userRole}, requested ${roleId}. Redirecting to Registration.`)
          setPendingRole(roleId)
          setView('register')
          return
        }
      } catch (error) {
        console.log('Verification request error:', error.message)
        localStorage.removeItem('lims_token')
        localStorage.removeItem('lims_logged_in')
        setUser(null)
      }
    }

    // CASE 4: No token stored or user not found -> Navigate to Registration Page with pre-set role
    setPendingRole(roleId)
    setView('register')
  }

  // Login handler
  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password })
      if (data.success && data.user) {
        setUser(data.user)
        if (data.token) {
          localStorage.setItem('lims_token', data.token)
        }
        localStorage.setItem('lims_logged_in', 'true')
        const targetView = pendingRole || data.user.role
        setView(targetView)
        return { success: true }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.'
      }
    }
  }

  // Register handler
  const registerUser = async (fullName, email, password, role) => {
    try {
      const { data } = await axios.post('/api/auth/register', { fullName, email, password, role })
      if (data.success && data.user) {
        setUser(data.user)
        if (data.token) {
          localStorage.setItem('lims_token', data.token)
        }
        localStorage.setItem('lims_logged_in', 'true')
        const targetView = pendingRole || data.user.role
        setView(targetView)
        return { success: true }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.'
      }
    }
  }

  // Logout handler
  const logoutUser = async () => {
    try {
      await axios.get('/api/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setPendingRole(null)
      localStorage.removeItem('lims_token')
      localStorage.removeItem('lims_logged_in')
      setView('landing')
    }
  }

  return (
    <LimsContext.Provider
      value={{
        view,
        setView,
        pendingRole,
        setPendingRole,
        selectRole,
        user,
        loading,
        loginUser,
        registerUser,
        logoutUser,
        cases,
        signReport,
        roster,
        addShift,
        inventoryRequests,
        approveRequest,
        rejectRequest,
        branches,
        addBranch,
        users,
        toggleUserStatus,
        addUser
      }}
    >
      {children}
    </LimsContext.Provider>
  )
}

export function useLims() {
  const context = useContext(LimsContext)
  if (!context) {
    throw new Error('useLims must be used within a LimsProvider')
  }
  return context
}
