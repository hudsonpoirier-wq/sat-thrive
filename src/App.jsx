import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth.jsx'
import AppErrorBoundary from './components/AppErrorBoundary.jsx'
import Login from './pages/Login.jsx'

const loadDashboard = () => import('./pages/Dashboard.jsx')
const loadTestTaking = () => import('./pages/TestTaking.jsx')
const loadResults = () => import('./pages/Results.jsx')
const loadAdmin = () => import('./pages/Admin.jsx')
const loadGuide = () => import('./pages/Guide.jsx')
const loadFinalTest = () => import('./pages/FinalTest.jsx')
const loadMistakes = () => import('./pages/Mistakes.jsx')
const loadReport = () => import('./pages/Report.jsx')
const loadCalendar = () => import('./pages/Calendar.jsx')
const loadShare = () => import('./pages/Share.jsx')
const loadAuthCallback = () => import('./pages/AuthCallback.jsx')
const loadResetPassword = () => import('./pages/ResetPassword.jsx')

const Dashboard = lazy(loadDashboard)
const TestTaking = lazy(loadTestTaking)
const Results = lazy(loadResults)
const Admin = lazy(loadAdmin)
const Guide = lazy(loadGuide)
const FinalTest = lazy(loadFinalTest)
const Mistakes = lazy(loadMistakes)
const Report = lazy(loadReport)
const Calendar = lazy(loadCalendar)
const Share = lazy(loadShare)
const AuthCallback = lazy(loadAuthCallback)
const ResetPassword = lazy(loadResetPassword)

function RouteLoader() {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'Sora,sans-serif',color:'#64748b'}}>
      Loading…
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'Sora,sans-serif',color:'#64748b'}}>Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

function PublicRoute({ children }) {
  const { user } = useAuth()
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

function AppWarmup() {
  const { user } = useAuth()

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const preload = () => {
      const loaders = user
        ? [loadDashboard, loadGuide, loadMistakes, loadResults, loadReport, loadCalendar]
        : [loadDashboard]
      loaders.forEach((load) => {
        try { load().catch(() => {}) } catch {}
      })
    }

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preload, { timeout: 1200 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = window.setTimeout(preload, 250)
    return () => window.clearTimeout(timeoutId)
  }, [user])

  return null
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppErrorBoundary>
          <AppWarmup />
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/test/:attemptId" element={<ProtectedRoute><TestTaking /></ProtectedRoute>} />
              <Route path="/results/:attemptId" element={<ProtectedRoute><Results /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/guide" element={<ProtectedRoute><Guide /></ProtectedRoute>} />
              <Route path="/final" element={<ProtectedRoute><FinalTest /></ProtectedRoute>} />
              <Route path="/mistakes" element={<ProtectedRoute><Mistakes /></ProtectedRoute>} />
              <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="/share" element={<Share />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Suspense>
        </AppErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  )
}
