import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import API, { getCleanBaseUrl } from '../services/api'

// Configure Axios defaults dynamically via environment variable or central API service
const rawBackendUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL 
const BACKEND_URL = getCleanBaseUrl(rawBackendUrl)
axios.defaults.baseURL = BACKEND_URL
axios.defaults.withCredentials = true

// Global axios interceptor to guarantee no duplicate /api/api pathing and attach JWT Authorization header
axios.interceptors.request.use((config) => {
  if (config.url && config.url.startsWith('/api/') && config.baseURL && config.baseURL.endsWith('/api')) {
    config.url = config.url.replace(/^\/api/, '');
  }
  const token = localStorage.getItem('lims_token') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const LimsContext = createContext()

const validViews = [
  'landing',
  'lab-manager',
  'super-admin',
  'pathologist',
  'lab-technician',
  'sample-collector',
  'receptionist',
  'register',
  'login',
  'profile',
  'settings'
]

const getViewFromPath = (path) => {
  const cleanPath = (path || '').replace(/^\/+|\/+$/g, '').toLowerCase()
  if (!cleanPath || cleanPath === 'landing') return 'landing'
  if (validViews.includes(cleanPath)) return cleanPath
  return 'landing'
}

const getPathFromView = (v) => {
  if (!v || v === 'landing') return '/'
  return `/${v}`
}

export function LimsProvider({ children }) {
  // Navigation View State with browser URL synchronization
  const [viewState, setViewState] = useState(() => {
    if (typeof window !== 'undefined') {
      return getViewFromPath(window.location.pathname)
    }
    return 'landing'
  })

  const setView = (newView, replace = false) => {
    setViewState(newView)
    if (typeof window !== 'undefined') {
      const targetPath = getPathFromView(newView)
      if (window.location.pathname !== targetPath) {
        if (replace) {
          window.history.replaceState({ view: newView }, '', targetPath)
        } else {
          window.history.pushState({ view: newView }, '', targetPath)
        }
      }
    }
  }

  const view = viewState

  // Sync browser back & forward navigation buttons
  useEffect(() => {
    const handlePopState = () => {
      const currentView = getViewFromPath(window.location.pathname)
      setViewState(currentView)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Tracks which role the user clicked so we can redirect after auth
  const [pendingRole, setPendingRole] = useState(null)

  // Current authenticated user state
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Pathologist: Cases Queue State
  const [cases, setCases] = useState([])

  // Lab Manager: Roster Schedule State
  const [roster, setRoster] = useState([])

  // Lab Manager: Inventory / Reagent Requests State
  const [inventoryRequests, setInventoryRequests] = useState([])

  // Lab Manager: Quality Control & Operations State
  const [qualityControl, setQualityControl] = useState([])
  const [operationsOverview, setOperationsOverview] = useState(null)

  // Fetch Lab Manager Data from MongoDB Database
  const fetchLabManagerData = async () => {
    try {
      const [invRes, rosterRes, qcRes, opsRes] = await Promise.all([
        axios.get('/api/labmanager/inventory-requests'),
        axios.get('/api/labmanager/roster'),
        axios.get('/api/labmanager/quality-control'),
        axios.get('/api/labmanager/operations-overview'),
      ])

      if (invRes.data.success) setInventoryRequests(invRes.data.data)
      if (rosterRes.data.success) setRoster(rosterRes.data.data)
      if (qcRes.data.success) setQualityControl(qcRes.data.data)
      if (opsRes.data.success) setOperationsOverview(opsRes.data.data)
    } catch (error) {
      console.error('Error fetching Lab Manager database data:', error)
    }
  }


  // Super Admin: State
  const [branches, setBranches] = useState([])
  const [users, setUsers] = useState([])
  const [testCatalog, setTestCatalog] = useState([])
  const [dashboardStats, setDashboardStats] = useState(null)

  // Fetch Super Admin Data from MongoDB Database
  const fetchSuperAdminData = async () => {
    try {
      const [branchesRes, usersRes, testRes, statsRes] = await Promise.all([
        axios.get('/api/superadmin/branches'),
        axios.get('/api/superadmin/users'),
        axios.get('/api/superadmin/test-catalog'),
        axios.get('/api/superadmin/dashboard-stats'),
      ])

      if (branchesRes.data.success) setBranches(branchesRes.data.data)
      if (usersRes.data.success) setUsers(usersRes.data.data)
      if (testRes.data.success) setTestCatalog(testRes.data.data)
      if (statsRes.data.success) setDashboardStats(statsRes.data.data)
    } catch (error) {
      console.error('Error fetching Super Admin database data:', error)
    }
  }

  const fetchedRolesRef = useRef({})

  useEffect(() => {
    if (view === 'lab-manager' && !fetchedRolesRef.current['lab-manager']) {
      fetchedRolesRef.current['lab-manager'] = true
      fetchLabManagerData()
    } else if (view === 'super-admin' && !fetchedRolesRef.current['super-admin']) {
      fetchedRolesRef.current['super-admin'] = true
      fetchSuperAdminData()
    } else if (view === 'pathologist' && !fetchedRolesRef.current['pathologist']) {
      fetchedRolesRef.current['pathologist'] = true
      fetchPathologistData()
    }
  }, [view])

  // Pathologist: API & MongoDB State
  const [pathologyCases, setPathologyCases] = useState([])
  const [testValidations, setTestValidations] = useState([])
  const [auditLogs, setAuditLogs] = useState([])

  const fetchPathologistData = async () => {
    try {
      const [casesRes, valRes, auditRes] = await Promise.all([
        axios.get('/api/pathologist/cases'),
        axios.get('/api/pathologist/validations'),
        axios.get('/api/pathologist/audit-logs'),
      ])

      if (casesRes.data.success) setPathologyCases(casesRes.data.data)
      if (valRes.data.success) setTestValidations(valRes.data.data)
      if (auditRes.data.success) setAuditLogs(auditRes.data.data)
    } catch (error) {
      console.error('Error fetching Pathologist database data:', error)
    }
  }

  const signPathologyReportDB = async (caseId, findings, testResults) => {
    try {
      const { data } = await axios.put(`/api/pathologist/cases/${caseId}/sign`, { findings, testResults })
      if (data.success) {
        setPathologyCases(prev => prev.map(c => (c.id === caseId || c._id === caseId ? { ...c, status: 'Signed & Finalized', findings: findings || c.findings } : c)))
        fetchPathologistData()
      }
    } catch (error) {
      console.error('Error signing pathology report in DB:', error)
    }
  }

  const saveInterpretationDB = async (caseId, payload) => {
    try {
      const { data } = await axios.put(`/api/pathologist/cases/${caseId}/interpretation`, payload)
      if (data.success) {
        setPathologyCases(prev => prev.map(c => (c.id === caseId || c._id === caseId ? { ...c, ...payload } : c)))
        fetchPathologistData()
      }
    } catch (error) {
      console.error('Error saving interpretation in DB:', error)
    }
  }

  const validateTestResultDB = async (valId) => {
    try {
      const { data } = await axios.put(`/api/pathologist/validations/${valId}/validate`)
      if (data.success) {
        setTestValidations(prev => prev.map(v => (v.id === valId ? { ...v, validated: true } : v)))
      }
    } catch (error) {
      console.error('Error validating test result in DB:', error)
    }
  }

  const batchValidateTestResultsDB = async (ids) => {
    try {
      const { data } = await axios.put('/api/pathologist/validations/batch-validate', { ids })
      if (data.success) {
        setTestValidations(prev => prev.map(v => (ids.includes(v.id) ? { ...v, validated: true } : v)))
      }
    } catch (error) {
      console.error('Error batch validating test results in DB:', error)
    }
  }

  const retestTestResultDB = async (valId) => {
    try {
      const { data } = await axios.put(`/api/pathologist/validations/${valId}/retest`)
      if (data.success) {
        setTestValidations(prev => prev.map(v => (v.id === valId ? { ...v, flag: 'RE-TEST ORDERED', qcStatus: 'RE-CALIBRATE' } : v)))
      }
    } catch (error) {
      console.error('Error ordering retest in DB:', error)
    }
  }

  const createAuditLogDB = async (logPayload) => {
    try {
      const { data } = await axios.post('/api/pathologist/audit-logs', logPayload)
      if (data.success && data.data) {
        setAuditLogs(prev => [data.data, ...prev])
      }
    } catch (error) {
      console.error('Error creating audit log entry in DB:', error)
    }
  }

  // Lab Manager Action Handlers backed by MongoDB
  const addShift = async (name, dept, shift) => {
    try {
      const { data } = await axios.post('/api/labmanager/roster', { name, dept, shift })
      if (data.success && data.data) {
        setRoster((prev) => [data.data, ...prev])
      }
    } catch (error) {
      console.error('Error adding shift to DB:', error)
    }
  }

  const removeShift = async (id) => {
    try {
      await axios.delete(`/api/labmanager/roster/${id}`)
      setRoster((prev) => prev.filter((item) => item.id !== id && item._id !== id))
    } catch (error) {
      console.error('Error removing shift from DB:', error)
    }
  }

  const approveRequest = async (id) => {
    try {
      const { data } = await axios.put(`/api/labmanager/inventory-requests/${id}/approve`)
      if (data.success) {
        setInventoryRequests((prev) =>
          prev.map((req) => ((req.id === id || req._id === id) ? { ...req, status: 'Approved' } : req))
        )
      }
    } catch (error) {
      console.error('Error approving request in DB:', error)
    }
  }

  const rejectRequest = async (id) => {
    try {
      const { data } = await axios.put(`/api/labmanager/inventory-requests/${id}/reject`)
      if (data.success) {
        setInventoryRequests((prev) =>
          prev.map((req) => ((req.id === id || req._id === id) ? { ...req, status: 'Rejected' } : req))
        )
      }
    } catch (error) {
      console.error('Error rejecting request in DB:', error)
    }
  }

  // Super Admin Action Handlers backed by MongoDB
  const addBranch = async (name, address, city) => {
    try {
      const { data } = await axios.post('/api/superadmin/branches', { name, address, city })
      if (data.success && data.data) {
        setBranches((prev) => [data.data, ...prev])
      }
    } catch (error) {
      console.error('Error adding branch to DB:', error)
    }
  }

  const toggleUserStatus = async (id) => {
    try {
      const { data } = await axios.put(`/api/superadmin/users/${id}/toggle-status`)
      if (data.success) {
        setUsers((prev) =>
          prev.map((u) => ((u.id === id || u._id === id) ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u))
        )
      }
    } catch (error) {
      console.error('Error toggling user status in DB:', error)
    }
  }

  const addUser = async (name, email, role) => {
    try {
      const { data } = await axios.post('/api/superadmin/users', { name, email, role })
      if (data.success && data.data) {
        setUsers((prev) => [data.data, ...prev])
      }
    } catch (error) {
      console.error('Error provisioning user in DB:', error)
    }
  }

  const addTestCatalogItem = async (testObj) => {
    try {
      const { data } = await axios.post('/api/superadmin/test-catalog', testObj)
      if (data.success && data.data) {
        setTestCatalog((prev) => [data.data, ...prev])
      }
    } catch (error) {
      console.error('Error adding test catalog item to DB:', error)
    }
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
            if (window.location.pathname === '/' || window.location.pathname === '') {
              setView(data.user.role, true)
            }
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
        removeShift,
        inventoryRequests,
        approveRequest,
        rejectRequest,
        qualityControl,
        operationsOverview,
        fetchLabManagerData,
        branches,
        addBranch,
        users,
        toggleUserStatus,
        addUser,
        testCatalog,
        addTestCatalogItem,
        dashboardStats,
        fetchSuperAdminData,
        pathologyCases,
        testValidations,
        auditLogs,
        fetchPathologistData,
        signPathologyReportDB,
        saveInterpretationDB,
        validateTestResultDB,
        batchValidateTestResultsDB,
        retestTestResultDB,
        createAuditLogDB,
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
