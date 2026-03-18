import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

if (typeof window !== 'undefined') {
  window.__agoraAppBooted = true
  try { localStorage.removeItem('agora_autofix_once_v1') } catch {}
  window.addEventListener('vite:preloadError', (event) => {
    try { event?.preventDefault?.() } catch {}
    if (window.__agoraPreloadRecoveryRunning) return
    window.__agoraPreloadRecoveryRunning = true
    if (window.agoraFixAndReload) {
      window.agoraFixAndReload()
      return
    }
    window.location.reload()
  })
}

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
