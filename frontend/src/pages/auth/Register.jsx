import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { 
  EyeIcon, 
  EyeSlashIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    subRole: '',
    phone: '',
    organization: '',
    location: '',
    state: '',
    district: '',
    pincode: '',
    licenseNumber: '',
    registrationNumber: '',
    specialization: '',
    experience: '',
    aadhaarNumber: '',
    panNumber: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { mockLogin } = useAuthStore()
  const navigate = useNavigate()

  const mainUserTypes = [
    { role: 'producer', label: 'Livestock Owner/Producer', description: 'Farmers and livestock producers', color: 'bg-green-600 hover:bg-green-700' },
    { role: 'veterinarian', label: 'Veterinarian', description: 'Veterinary professionals', color: 'bg-blue-600 hover:bg-blue-700' },
    { role: 'lab', label: 'Laboratory', description: 'Testing and diagnostic labs', color: 'bg-purple-600 hover:bg-purple-700' },
    { role: 'regulator', label: 'Government Official', description: 'Regulatory and policy officials', color: 'bg-red-600 hover:bg-red-700' },
    { role: 'admin', label: 'System Administrator', description: 'IT and system administrators', color: 'bg-gray-600 hover:bg-gray-700' },
    { role: 'collector', label: 'Collector', description: 'Product and sample collectors', color: 'bg-orange-600 hover:bg-orange-700' },
  ]

  const subUserTypes = {
    producer: [
      { value: 'individual_farmer', label: 'Individual Farmer / Pashupalak' },
      { value: 'farm_manager', label: 'Farm Manager / Prabandhak' },
      { value: 'dairy_cooperative', label: 'Dairy Cooperative Member' },
      { value: 'poultry_farmer', label: 'Poultry Farmer' },
      { value: 'goat_sheep_farmer', label: 'Goat/Sheep Farmer' },
      { value: 'fish_farmer', label: 'Fish Farmer / Aquaculture Producer' },
    ],
    veterinarian: [
      { value: 'govt_veterinary_officer', label: 'Veterinary Officer (Government)' },
      { value: 'private_veterinarian', label: 'Licensed Private Veterinarian' },
      { value: 'para_veterinarian', label: 'Para-veterinarian / Pashu Paricharak' },
      { value: 'vet_student', label: 'Veterinary College Student' },
    ],
    lab: [
      { value: 'lab_technician', label: 'Lab Technician / Sahayak' },
      { value: 'quality_control_officer', label: 'Quality Control Officer' },
      { value: 'lab_manager', label: 'Lab Manager / Prabandhak' },
    ],
    regulator: [
      { value: 'food_safety_officer', label: 'Food Safety Officer (FSSAI)' },
      { value: 'district_veterinary_officer', label: 'District Veterinary Officer' },
      { value: 'block_official', label: 'Block/Taluka Level Official' },
      { value: 'policy_analyst', label: 'Policy Analyst' },
    ],
    admin: [
      { value: 'it_administrator', label: 'IT Administrator' },
      { value: 'technical_support', label: 'Technical Support Staff' },
      { value: 'database_manager', label: 'Database Manager' },
    ],
    collector: [
      { value: 'milk_collector', label: 'Milk Collector / Dudh Sangrahak' },
      { value: 'collection_center_manager', label: 'Collection Center Manager' },
      { value: 'dairy_cooperative_rep', label: 'Dairy Cooperative Representative' },
      { value: 'meat_poultry_distributor', label: 'Meat/Poultry Distributor' },
    ],
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
      // Reset subRole when main role changes
      ...(name === 'role' && { subRole: '' })
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.role) {
      toast.error('Please select your stakeholder type')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      // For demo purposes, use mock login after registration
      mockLogin(formData.role)
      toast.success('Registration successful!')
      navigate('/')
    } catch (error) {
      toast.error('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickRegister = (role) => {
    mockLogin(role)
    toast.success(`Quick registration successful as ${role}`)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="flex min-h-screen">
        {/* Left Side - Ministry Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-800 to-blue-900 text-white p-12 flex-col justify-center">
          <div className="max-w-md">
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
            <p className="text-xl text-green-100 mb-8">
              Government of India Initiative for Livestock Safety & Compliance
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-300" />
                <span>MRL & AMU Monitoring</span>
              </div>
              <div className="flex items-center space-x-3">
                <ChartBarIcon className="h-6 w-6 text-blue-300" />
                <span>Real-time Compliance Tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <UserGroupIcon className="h-6 w-6 text-blue-300" />
                <span>Multi-stakeholder Platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h3>
              <p className="text-gray-600">Register for VASUDHA portal access</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Type *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your main category</option>
                  {mainUserTypes.map((type) => (
                    <option key={type.role} value={type.role}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {formData.role && subUserTypes[formData.role] && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific Role *
                  </label>
                  <select
                    name="subRole"
                    value={formData.subRole}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your specific role</option>
                    {subUserTypes[formData.role].map((subType) => (
                      <option key={subType.value} value={subType.value}>
                        {subType.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your state"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District *
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your district"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location/Village *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your location"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter PIN code"
                    pattern="[0-9]{6}"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization/Farm/Institution Name
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter organization, farm, or institution name"
                />
              </div>

              {/* Professional Details */}
              {(formData.role === 'veterinarian' || formData.subRole?.includes('veterinarian') || formData.subRole?.includes('vet')) && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      License Number *
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Veterinary license number"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Area of specialization"
                    />
                  </div>
                </div>
              )}

              {(formData.role === 'lab' || formData.subRole?.includes('lab')) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lab Registration Number *
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Laboratory registration number"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              {/* Identity Documents */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Identity Verification (Optional)</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aadhaar Number
                    </label>
                    <input
                      type="text"
                      name="aadhaarNumber"
                      value={formData.aadhaarNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="12-digit Aadhaar number"
                      pattern="[0-9]{12}"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="PAN number"
                      pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                      style={{ textTransform: 'uppercase' }}
                    />
                  </div>
                </div>
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
                    className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Government Platform Integration */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or register using Government Platforms</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {/* AgriStack Integration */}
                <button
                  onClick={() => toast.info('AgriStack integration coming soon')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-green-300 rounded-lg shadow-sm hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Register with AgriStack</span>
                  </div>
                </button>

                {/* DigiLocker Integration */}
                <button
                  onClick={() => toast.info('DigiLocker integration coming soon')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-blue-300 rounded-lg shadow-sm hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">D</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Register with DigiLocker</span>
                  </div>
                </button>

                {/* Aadhaar Integration */}
                <button
                  onClick={() => toast.info('Aadhaar integration coming soon')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-orange-300 rounded-lg shadow-sm hover:bg-orange-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">₹</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Register with Aadhaar</span>
                  </div>
                </button>

                {/* Google Integration */}
                <button
                  onClick={() => toast.info('Google integration coming soon')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-red-300 rounded-lg shadow-sm hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Register with Google</span>
                  </div>
                </button>

                {/* eNAM Integration */}
                <button
                  onClick={() => toast.info('eNAM integration coming soon')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-purple-300 rounded-lg shadow-sm hover:bg-purple-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">E</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Register with eNAM</span>
                  </div>
                </button>

                {/* PM-Kisan Integration */}
                <button
                  onClick={() => toast.info('PM-Kisan integration coming soon')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-indigo-300 rounded-lg shadow-sm hover:bg-indigo-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">K</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Register with PM-Kisan</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link to="/auth/login" className="text-green-600 hover:text-green-500">
                Already have an account? Sign in
              </Link>
            </div>

            {/* Demo Registration Buttons */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Quick Demo Registration</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {mainUserTypes.map((type) => (
                  <button
                    key={type.role}
                    onClick={() => handleQuickRegister(type.role)}
                    className={`${type.color} text-white px-3 py-2 rounded text-sm hover:opacity-90 transition-colors`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link to="/" className="text-gray-600 hover:text-gray-500 text-sm">
                ← Back to Overview
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register