import React from 'react'
import { motion } from 'framer-motion'
import {
  UserIcon,
  CogIcon,
  BellIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const Profile = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center"
      >
        <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">User Profile</h3>
        <p className="text-gray-600 mb-4">
          Update your personal information, change password, and manage account preferences.
        </p>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Edit Profile
        </button>
      </motion.div>
    </div>
  )
}

export default Profile
