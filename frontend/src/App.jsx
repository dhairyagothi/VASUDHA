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
import ProducerDashboard from './pages/dashboards/ProducerDashboard'
import VeterinarianDashboard from './pages/dashboards/VeterinarianDashboard'
import LabDashboard from './pages/dashboards/LabDashboard'
import RegulatorDashboard from './pages/dashboards/RegulatorDashboard'
import AdminDashboard from './pages/dashboards/AdminDashboard'
import CollectorDashboard from './pages/dashboards/CollectorDashboard'

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
import QRScanner from './pages/shared/QRScanner'

// Main Dashboard
import MainDashboard from './components/common/MainDashboard'

// Producer Components
import AMULogging from './components/producer/AMULogging'
import AlertsReminders from './components/producer/AlertsReminders'
import ComplianceDashboard from './components/producer/ComplianceDashboard'
import AnimalProfiles from './components/producer/AnimalProfiles'
import MarketplaceIntegration from './components/producer/MarketplaceIntegration'

// Veterinarian Components
import DigitalPrescriptionManagement from './components/veterinarian/DigitalPrescriptionManagement'
import FarmOversightDashboard from './components/veterinarian/FarmOversightDashboard'
import Teleconsultation from './components/veterinarian/Teleconsultation'
import KnowledgeBase from './components/veterinarian/KnowledgeBase'

// Lab Components
import SampleManagement from './components/lab/SampleManagement'
import ResultSubmission from './components/lab/ResultSubmission'
import DataAPIInterface from './components/lab/DataAPIInterface'

// Collector Components
import FarmComplianceCheck from './components/collector/FarmComplianceCheck'
import CollectionScheduling from './components/collector/CollectionScheduling'
import DigitalReceipts from './components/collector/DigitalReceipts'
import RiskInsights from './components/collector/RiskInsights'

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
      case 'producer': return '/dashboard/producer'
      case 'veterinarian': return '/dashboard/veterinarian'
      case 'lab': return '/dashboard/lab'
      case 'collector': return '/dashboard/collector'
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
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* Main Dashboard Route */}
          <Route path="/main-dashboard" element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          } />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="producer" element={
              <ProtectedRoute allowedRoles={['producer']}>
                <ProducerDashboard />
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
            
            <Route path="collector" element={
              <ProtectedRoute allowedRoles={['collector']}>
                <CollectorDashboard />
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

            {/* Shared Tools */}
            <Route path="qr-scanner" element={<QRScanner />} />

            {/* Profile & Settings */}
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Producer Routes */}
          <Route path="/producer" element={
            <ProtectedRoute allowedRoles={['producer']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="amu-logging" element={<AMULogging />} />
            <Route path="alerts" element={<AlertsReminders />} />
            <Route path="compliance" element={<ComplianceDashboard />} />
            <Route path="animal-profiles" element={<AnimalProfiles />} />
            <Route path="marketplace" element={<MarketplaceIntegration />} />
          </Route>

          {/* Veterinarian Routes */}
          <Route path="/veterinarian" element={
            <ProtectedRoute allowedRoles={['veterinarian']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="prescriptions" element={<DigitalPrescriptionManagement />} />
            <Route path="farm-oversight" element={<FarmOversightDashboard />} />
            <Route path="teleconsultation" element={<Teleconsultation />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} />
          </Route>

          {/* Lab Routes */}
          <Route path="/lab" element={
            <ProtectedRoute allowedRoles={['lab']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="sample-management" element={<SampleManagement />} />
            <Route path="result-submission" element={<ResultSubmission />} />
            <Route path="data-api" element={<DataAPIInterface />} />
          </Route>

          {/* Collector Routes */}
          <Route path="/collector" element={
            <ProtectedRoute allowedRoles={['collector']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="compliance-check" element={<FarmComplianceCheck />} />
            <Route path="scheduling" element={<CollectionScheduling />} />
            <Route path="receipts" element={<DigitalReceipts />} />
            <Route path="risk-insights" element={<RiskInsights />} />
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
