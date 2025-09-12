import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Layout Components
import Layout from './components/common/Layout'
import AuthLayout from './components/common/AuthLayout'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import LandingPage from './pages/auth/LandingPage'

// Dashboard Pages
import FarmerDashboard from './pages/dashboards/FarmerDashboard'
import VeterinarianDashboard from './pages/dashboards/VeterinarianDashboard'
import LabDashboard from './pages/dashboards/LabDashboard'
import RegulatorDashboard from './pages/dashboards/RegulatorDashboard'
import AdminDashboard from './pages/dashboards/AdminDashboard'

// Farm Management
import FarmManagement from './pages/farm/FarmManagement'
import AnimalManagement from './pages/farm/AnimalManagement'
import AnimalProfile from './pages/farm/AnimalProfile'

// Drug & Inventory
import DrugInventory from './pages/inventory/DrugInventory'
import DrugAdministration from './pages/inventory/DrugAdministration'
import PrescriptionManagement from './pages/vet/PrescriptionManagement'

// Sampling & Lab
import SampleCollection from './pages/lab/SampleCollection'
import LabResults from './pages/lab/LabResults'
import TestReports from './pages/lab/TestReports'

// Analytics & Reporting
import Analytics from './pages/shared/Analytics'
import ComplianceReports from './pages/regulator/ComplianceReports'
import AuditTrail from './pages/regulator/AuditTrail'

// Profile & Settings
import Profile from './pages/shared/Profile'
import Settings from './pages/shared/Settings'

// Store
import { useAuthStore } from './store/authStore'

function App() {
  const { user, isAuthenticated } = useAuthStore()

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />
    }
    
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
      return <Navigate to="/unauthorized" replace />
    }
    
    return children
  }

  // Get dashboard based on user role
  const getDashboardRoute = (role) => {
    switch (role) {
      case 'farmer': return '/dashboard/farmer'
      case 'veterinarian': return '/dashboard/veterinarian'
      case 'lab': return '/dashboard/lab'
      case 'regulator': return '/dashboard/regulator'
      case 'admin': return '/dashboard/admin'
      default: return '/'
    }
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page - show when not authenticated */}
          <Route path="/" element={
            isAuthenticated ? (
              <Navigate to={getDashboardRoute(user?.role)} replace />
            ) : (
              <LandingPage />
            )
          } />
          
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="farmer" element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="veterinarian" element={
              <ProtectedRoute allowedRoles={['veterinarian']}>
                <VeterinarianDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="lab" element={
              <ProtectedRoute allowedRoles={['lab']}>
                <LabDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="regulator" element={
              <ProtectedRoute allowedRoles={['regulator']}>
                <RegulatorDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Route>

          {/* Protected App Routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            {/* Farm Management */}
            <Route path="farms" element={<FarmManagement />} />
            <Route path="animals" element={<AnimalManagement />} />
            <Route path="animals/:id" element={<AnimalProfile />} />

            {/* Drug & Inventory */}
            <Route path="inventory" element={<DrugInventory />} />
            <Route path="administration" element={<DrugAdministration />} />
            <Route path="prescriptions" element={<PrescriptionManagement />} />

            {/* Sampling & Lab */}
            <Route path="sampling" element={<SampleCollection />} />
            <Route path="lab-results" element={<LabResults />} />
            <Route path="test-reports" element={<TestReports />} />

            {/* Analytics & Reports */}
            <Route path="analytics" element={<Analytics />} />
            <Route path="compliance" element={<ComplianceReports />} />
            <Route path="audit" element={<AuditTrail />} />

            {/* Profile & Settings */}
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            className: 'text-sm',
          }}
        />
      </div>
    </Router>
  )
}

export default App
