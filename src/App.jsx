import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth.jsx'

const Login = lazy(() => import('./pages/Login.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const TestTaking = lazy(() => import('./pages/TestTaking.jsx'))
const Results = lazy(() => import('./pages/Results.jsx'))
const Admin = lazy(() => import('./pages/Admin.jsx'))
const Guide = lazy(() => import('./pages/Guide.jsx'))
const FinalTest = lazy(() => import('./pages/FinalTest.jsx'))
const Mistakes = lazy(() => import('./pages/Mistakes.jsx'))
const Review = lazy(() => import('./pages/Review.jsx'))
const Report = lazy(() => import('./pages/Report.jsx'))
const Share = lazy(() => import('./pages/Share.jsx'))
const AuthCallback = lazy(() => import('./pages/AuthCallback.jsx'))
const ResetPassword = lazy(() => import('./pages/ResetPassword.jsx'))

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
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
            <Route path="/review" element={<ProtectedRoute><Review /></ProtectedRoute>} />
            <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
            <Route path="/share" element={<Share />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}
