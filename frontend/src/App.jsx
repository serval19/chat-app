import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Debugging logs
  console.log('Auth state:', { isCheckingAuth, authUser })

  // Show loader while checking auth OR if we haven't finished checking yet
  if (isCheckingAuth && !authUser) 
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Protected routes */}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"  />} />
        <Route path="/settings" element={<SettingsPage /> } />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" replace />} />
        
        {/* Public routes */}
        <Route path="/login" element={!authUser? <LoginPage /> : <Navigate to="/"/> } />
        <Route path="/signup" element={!authUser? <SignUpPage /> : <Navigate to="/"/> }/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App