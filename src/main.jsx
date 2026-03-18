import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  const registerServiceWorker = () => {
    navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .then((reg) => { try { reg.update() } catch {} })
      .catch(() => {})
  }

  window.addEventListener('load', () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(registerServiceWorker, { timeout: 2000 })
      return
    }
    window.setTimeout(registerServiceWorker, 1200)
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
