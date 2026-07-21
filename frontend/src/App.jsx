import React from 'react'
import { useLims } from './context/LimsContext'
import LandingPage from './pages/LandingPage'
import LabManagerPortal from './pages/labmanager/LabManagerPortal'
import SuperAdminPortal from './pages/superadmin/SuperAdminPortal'
import PathologistPortal from './pages/pathologist/PathologistPortal'
import LabTechnicianPortal from './pages/labtechnician/LabTechnicianPortal'
import SampleCollectorPortal from './pages/samplecollector/SampleCollectorPortal'
import ReceptionistPortal from './pages/receptionist/ReceptionistPortal'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  const { view } = useLims()

  switch (view) {
    case 'landing':
      return <LandingPage />
    case 'lab-manager':
      return <LabManagerPortal />
    case 'super-admin':
      return <SuperAdminPortal />
    case 'pathologist':
      return <PathologistPortal />
    case 'lab-technician':
      return <LabTechnicianPortal />
    case 'sample-collector':
      return <SampleCollectorPortal />
    case 'receptionist':
      return <ReceptionistPortal />
    case 'register':
      return <RegisterPage />
    case 'login':
      return <LoginPage />
    default:
      return <LandingPage />
  }
}
