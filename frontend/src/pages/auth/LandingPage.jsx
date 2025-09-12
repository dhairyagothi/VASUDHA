import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { 
  ShieldCheckIcon, 
  CubeIcon, 
  ChartBarIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const LandingPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'farmer',
    name: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { mockLogin } = useAuthStore()
  const navigate = useNavigate()

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Maximum Residue Limits (MRL) Monitoring',
      description: 'Advanced tracking and compliance monitoring for drug residues in livestock products'
    },
    {
      icon: CubeIcon,
      title: 'Antimicrobial Usage (AMU) Management',
      description: 'Comprehensive management of antimicrobial usage patterns and stewardship'
    },
    {
      icon: ChartBarIcon,
      title: 'Real-time Analytics',
      description: 'Data-driven insights for better decision making and compliance management'
    },
    {
      icon: UserGroupIcon,
      title: 'Multi-stakeholder Platform',
      description: 'Connecting farmers, veterinarians, labs, and regulators in one ecosystem'
    },
    {
      icon: ClipboardDocumentCheckIcon,
      title: 'Compliance Reporting',
      description: 'Automated compliance reports and audit trails for regulatory requirements'
    },
    {
      icon: GlobeAltIcon,
      title: 'National Coverage',
      description: 'Nationwide implementation supporting India\'s livestock sector digitization'
    }
  ]

  const userTypes = [
    { role: 'farmer', label: 'Farmer/Producer', description: 'Livestock farmers and producers', color: 'bg-green-600 hover:bg-green-700' },
    { role: 'veterinarian', label: 'Veterinarian', description: 'Licensed veterinary professionals', color: 'bg-blue-600 hover:bg-blue-700' },
    { role: 'lab', label: 'Laboratory', description: 'Testing and diagnostic laboratories', color: 'bg-purple-600 hover:bg-purple-700' },
    { role: 'regulator', label: 'Regulator', description: 'Government regulatory officials', color: 'bg-red-600 hover:bg-red-700' },
    { role: 'admin', label: 'Administrator', description: 'System administrators', color: 'bg-gray-600 hover:bg-gray-700' },
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // For demo purposes, use mock login
      mockLogin(formData.role)
      toast.success(`Welcome! Logged in as ${formData.role}`)
      navigate('/')
    } catch (error) {
      toast.error('Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = (role) => {
    mockLogin(role)
    toast.success(`Demo login successful as ${role}`)
    navigate('/')
  }

  if (isLoginMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="flex min-h-screen">
          {/* Left Side - Ministry Branding */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 to-green-800 text-white p-12 flex-col justify-center">
            <div className="max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-3 mb-8">
                  <img 
                    src="/logo.png" 
                    alt="VASUDHA Logo" 
                    className="w-12 h-12 object-contain bg-white rounded-lg p-1"
                  />
                  <div>
                    <h1 className="text-2xl font-bold">VASUDHA</h1>
                    <p className="text-blue-200 text-sm">Digital Farm Management Portal</p>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold mb-4">
                  Ministry of Fisheries, Animal Husbandry & Dairying
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Government of India Initiative for Livestock Safety & Compliance
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-300" />
                    <span>MRL & AMU Monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ChartBarIcon className="h-6 w-6 text-green-300" />
                    <span>Real-time Compliance Tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <UserGroupIcon className="h-6 w-6 text-green-300" />
                    <span>Multi-stakeholder Platform</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
            <motion.div 
              className="w-full max-w-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {showRegister ? 'Create Account' : 'Welcome Back'}
                </h3>
                <p className="text-gray-600">
                  {showRegister ? 'Register for VASUDHA portal access' : 'Sign in to your VASUDHA account'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {showRegister && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Type
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {userTypes.map((type) => (
                      <option key={type.role} value={type.role}>
                        {type.label} - {type.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {showRegister && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : (showRegister ? 'Create Account' : 'Sign In')}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowRegister(!showRegister)}
                  className="text-blue-600 hover:text-blue-500"
                >
                  {showRegister ? 'Already have an account? Sign in' : 'Need an account? Register'}
                </button>
              </div>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Quick Demo Access</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {userTypes.slice(0, 4).map((type) => (
                    <button
                      key={type.role}
                      onClick={() => handleQuickLogin(type.role)}
                      className={`${type.color} text-white px-3 py-2 rounded text-sm hover:opacity-90 transition-colors`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLoginMode(false)}
                  className="text-gray-600 hover:text-gray-500 text-sm"
                >
                  ← Back to Overview
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="VASUDHA Logo" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">VASUDHA</h1>
                <p className="text-xs text-gray-600">Digital Farm Management Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLoginMode(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Access Portal
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <GlobeAltIcon className="h-4 w-4" />
                <span>Government of India Initiative</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="text-blue-600">VASUDHA</span><br />
                Digital Farm Management Portal
              </h1>
              
              <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
                Ministry of Fisheries, Animal Husbandry & Dairying
              </p>
              
              <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto">
                A comprehensive digital platform for Maximum Residue Limits (MRL) monitoring and 
                Antimicrobial Usage (AMU) management in India's livestock sector, ensuring food safety 
                and regulatory compliance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsLoginMode(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-lg font-medium"
              >
                <span>Get Started</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Livestock Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Supporting India's livestock sector with advanced digital tools for safety, compliance, and productivity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Multi-Stakeholder Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connecting all stakeholders in the livestock ecosystem for better coordination and compliance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userTypes.map((type, index) => (
              <motion.div
                key={type.role}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className={`w-12 h-12 rounded-lg ${type.color} flex items-center justify-center mb-4`}>
                  <UserGroupIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {type.label}
                </h3>
                <p className="text-gray-600 mb-4">
                  {type.description}
                </p>
                <button
                  onClick={() => {
                    setFormData({ ...formData, role: type.role })
                    setIsLoginMode(true)
                  }}
                  className="text-blue-600 hover:text-blue-500 font-medium flex items-center space-x-1"
                >
                  <span>Access Dashboard</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Livestock Management?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of farmers, veterinarians, and officials using VASUDHA for safer, 
              more compliant livestock management across India.
            </p>
            <button
              onClick={() => setIsLoginMode(true)}
              className="bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors text-lg font-medium"
            >
              Start Using VASUDHA Today
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/logo.png" 
                  alt="VASUDHA Logo" 
                  className="w-8 h-8 object-contain bg-blue-600 rounded-lg p-1"
                />
                <span className="text-lg font-bold">VASUDHA</span>
              </div>
              <p className="text-gray-400">
                Digital Farm Management Portal by Ministry of Fisheries, Animal Husbandry & Dairying, Government of India.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About VASUDHA</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Ministry of Fisheries, Animal Husbandry & Dairying</li>
                <li>Government of India</li>
                <li>Email: support@vasudha.gov.in</li>
                <li>Helpline: 1800-XXX-XXXX</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 Government of India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
