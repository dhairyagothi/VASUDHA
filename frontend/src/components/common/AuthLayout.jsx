import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/logo.png" 
              alt="VASUDHA Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">VASUDHA</h1>
          <p className="text-gray-600 mt-2">Digital Farm Management Portal</p>
          <p className="text-sm text-gray-500 mt-1">MRL & AMU Monitoring System</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8">
          <Outlet />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Ministry of Fisheries, Animal Husbandry & Dairying
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
