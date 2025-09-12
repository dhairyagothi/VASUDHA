import React from 'react'
import { motion } from 'framer-motion'
import { ClockIcon } from '@heroicons/react/24/outline'

const RecentActivity = ({ activities }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✓'
      case 'warning': return '⚠'
      case 'error': return '✗'
      case 'pending': return '⏳'
      default: return '•'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${getStatusColor(activity.status)}`}>
              {getStatusIcon(activity.status)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.message}
              </p>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <ClockIcon className="h-3 w-3 mr-1" />
                {activity.time}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default RecentActivity
