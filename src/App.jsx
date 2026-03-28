import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { AuthProvider, useAuth } from './hooks/useAuth.jsx'
import AppErrorBoundary from './components/AppErrorBoundary.jsx'
import { ToastProvider } from './components/Toast.jsx'
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
const loadChooseTest = () => import('./pages/ChooseTest.jsx')
const loadCompareTests = () => import('./pages/CompareTests.jsx')
const loadSetupPlan = () => import('./pages/SetupPlan.jsx')
const loadTutorDashboard = () => import('./pages/TutorDashboard.jsx')
const loadOverview = () => import('./pages/Overview.jsx')
const loadWelcome = () => import('./pages/Welcome.jsx')
const loadAbout = () => import('./pages/About.jsx')
const loadMorePractice = () => import('./pages/MorePractice.jsx')
const loadTasks = () => import('./pages/Tasks.jsx')
const loadJourney = () => import('./pages/Journey.jsx')
const loadSettings = () => import('./pages/Settings.jsx')
const loadExtraTests = () => import('./pages/ExtraTests.jsx')
const loadPickTestDate = () => import('./pages/PickTestDate.jsx')
const loadTestStrategies = () => import('./pages/TestStrategies.jsx')
const loadPriorScore = () => import('./pages/PriorScore.jsx')
const loadCollegeRecruiting = () => import('./pages/CollegeRecruiting.jsx')
const loadFormulaSheet = () => import('./pages/FormulaSheet.jsx')
const loadLanding = () => import('./pages/Landing.jsx')

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
const ChooseTest = lazy(loadChooseTest)
const CompareTests = lazy(loadCompareTests)
const SetupPlan = lazy(loadSetupPlan)
const TutorDashboard = lazy(loadTutorDashboard)
const Overview = lazy(loadOverview)
const Welcome = lazy(loadWelcome)
const About = lazy(loadAbout)
const MorePractice = lazy(loadMorePractice)
const Tasks = lazy(loadTasks)
const Journey = lazy(loadJourney)
const Settings = lazy(loadSettings)
const ExtraTests = lazy(loadExtraTests)
const PickTestDate = lazy(loadPickTestDate)
const TestStrategies = lazy(loadTestStrategies)
const PriorScore = lazy(loadPriorScore)
const CollegeRecruiting = lazy(loadCollegeRecruiting)
const FormulaSheet = lazy(loadFormulaSheet)
const Landing = lazy(loadLanding)

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
  const { user, profile, loading } = useAuth()
  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'Sora,sans-serif',color:'#64748b'}}>Loading…</div>
  if (user) {
    // Wait for profile to load before redirecting so we route to the correct page
    if (!profile) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'Sora,sans-serif',color:'#64748b'}}>Loading…</div>
    const role = profile?.role
    if (role === 'tutor') return <Navigate to="/tutor" replace />
    if (role === 'admin') return <Navigate to="/admin" replace />
    // New students who haven't chosen an exam go to choose-test
    const hasChosenExam = user?.user_metadata?.preferred_exam
    if (!hasChosenExam) return <Navigate to="/choose-test" replace />
    return <Navigate to="/dashboard" replace />
  }
  return children
}

function RoleRedirect() {
  const { profile } = useAuth()
  if (!profile) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'Sora,sans-serif',color:'#64748b'}}>Loading…</div>
  const role = profile?.role
  if (role === 'tutor') return <Navigate to="/tutor" replace />
  if (role === 'admin') return <Navigate to="/admin" replace />
  return <Navigate to="/dashboard" replace />
}

function AppWarmup() {
  const { user } = useAuth()

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const preload = () => {
      const loaders = user
        ? [loadDashboard, loadGuide, loadMistakes, loadResults, loadReport, loadCalendar, loadChooseTest, loadCompareTests, loadOverview]
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

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
}
const pageTransition = { type: 'tween', ease: 'easeInOut', duration: 0.25 }

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} style={{ minHeight: '100vh' }}>
        <Routes location={location}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/choose-test" element={<ProtectedRoute><ChooseTest /></ProtectedRoute>} />
              <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
              <Route path="/pick-test-date" element={<ProtectedRoute><PickTestDate /></ProtectedRoute>} />
              <Route path="/prior-score" element={<ProtectedRoute><PriorScore /></ProtectedRoute>} />
              <Route path="/compare-tests" element={<ProtectedRoute><CompareTests /></ProtectedRoute>} />
              <Route path="/test/:attemptId" element={<ProtectedRoute><TestTaking /></ProtectedRoute>} />
              <Route path="/setup-plan/:attemptId" element={<ProtectedRoute><SetupPlan /></ProtectedRoute>} />
              <Route path="/results/:attemptId" element={<ProtectedRoute><Results /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/tutor" element={<ProtectedRoute><TutorDashboard /></ProtectedRoute>} />
              <Route path="/overview" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
              <Route path="/guide" element={<ProtectedRoute><Guide /></ProtectedRoute>} />
              <Route path="/strategies" element={<ProtectedRoute><TestStrategies /></ProtectedRoute>} />
              <Route path="/final" element={<ProtectedRoute><FinalTest /></ProtectedRoute>} />
              <Route path="/mistakes" element={<ProtectedRoute><Mistakes /></ProtectedRoute>} />
              <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
              <Route path="/practice" element={<ProtectedRoute><MorePractice /></ProtectedRoute>} />
              <Route path="/extra-tests" element={<ProtectedRoute><ExtraTests /></ProtectedRoute>} />
              <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
              <Route path="/journey" element={<ProtectedRoute><Journey /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/college-recruiting" element={<ProtectedRoute><CollegeRecruiting /></ProtectedRoute>} />
              <Route path="/formulas" element={<ProtectedRoute><FormulaSheet /></ProtectedRoute>} />
              <Route path="/share" element={<Share />} />
              <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppErrorBoundary>
            <AppWarmup />
            <ScrollToTop />
            <Suspense fallback={<RouteLoader />}>
              <AnimatedRoutes />
            </Suspense>
          </AppErrorBoundary>
        </BrowserRouter>
      </ToastProvider>
      <Analytics />
      <SpeedInsights />
    </AuthProvider>
  )
}
