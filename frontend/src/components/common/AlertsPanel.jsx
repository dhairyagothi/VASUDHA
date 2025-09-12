import React from 'react'
import { motion } from 'framer-motion'
import { 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  CheckCircleIcon,
  ClockIcon 
} from '@heroicons/react/24/outline'

const AlertsPanel = ({ alerts }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return ExclamationTriangleIcon
      case 'info': return InformationCircleIcon
      case 'success': return CheckCircleIcon
      default: return InformationCircleIcon
    }
  }

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'border-yellow-200 bg-yellow-50'
      case 'info': return 'border-blue-200 bg-blue-50'
      case 'success': return 'border-green-200 bg-green-50'
      case 'error': return 'border-red-200 bg-red-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getIconColor = (type) => {
    switch (type) {
      case 'warning': return 'text-yellow-600'
      case 'info': return 'text-blue-600'
      case 'success': return 'text-green-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Alerts & Notifications</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
          {alerts.length}
        </span>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts.map((alert, index) => {
          const Icon = getAlertIcon(alert.type)
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg border ${getAlertColor(alert.type)} hover:shadow-sm transition-shadow`}
            >
              <div className="flex items-start space-x-3">
                <Icon className={`h-5 w-5 mt-0.5 ${getIconColor(alert.type)}`} />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {alert.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {alert.message}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    {alert.time}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 py-2 border-t border-gray-200">
        View all alerts
      </button>
    </motion.div>
  )
}

export default AlertsPanel
