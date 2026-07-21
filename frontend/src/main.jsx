import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LimsProvider } from './context/LimsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LimsProvider>
      <App />
    </LimsProvider>
  </StrictMode>,
)
