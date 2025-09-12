import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'farmer'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { login, mockLogin } = useAuthStore()
  const navigate = useNavigate()

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
      toast.success('Login successful!')
      navigate('/')
    } catch (error) {
      toast.error('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const quickLoginButtons = [
    { role: 'farmer', label: 'Demo Farmer', color: 'bg-green-600 hover:bg-green-700' },
    { role: 'veterinarian', label: 'Demo Vet', color: 'bg-blue-600 hover:bg-blue-700' },
    { role: 'lab', label: 'Demo Lab', color: 'bg-purple-600 hover:bg-purple-700' },
    { role: 'regulator', label: 'Demo Regulator', color: 'bg-red-600 hover:bg-red-700' },
    { role: 'admin', label: 'Demo Admin', color: 'bg-gray-600 hover:bg-gray-700' },
  ]

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your password"
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
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option value="farmer">Farmer</option>
            <option value="veterinarian">Veterinarian</option>
            <option value="lab">Laboratory</option>
            <option value="regulator">Regulator</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <Link
            to="/auth/forgot-password"
            className="text-sm text-green-600 hover:text-green-500"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Demo Login Buttons */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or try demo login</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {quickLoginButtons.map((button) => (
            <button
              key={button.role}
              onClick={() => {
                mockLogin(button.role)
                toast.success(`Logged in as ${button.label}`)
                navigate('/')
              }}
              className={`px-3 py-2 text-xs font-medium text-white rounded-md transition-colors ${button.color}`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-green-600 hover:text-green-500 font-medium">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Login
