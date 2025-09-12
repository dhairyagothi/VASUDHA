import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

const StatCard = ({ title, value, change, changeType, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    red: 'bg-red-50 text-red-600 border-red-200'
  }

  const getChangeIcon = () => {
    if (changeType === 'positive') return ArrowUpIcon
    if (changeType === 'negative') return ArrowDownIcon
    return null
  }

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-green-600'
    if (changeType === 'negative') return 'text-red-600'
    return 'text-gray-600'
  }

  const ChangeIcon = getChangeIcon()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 ${getChangeColor()}`}>
              {ChangeIcon && <ChangeIcon className="w-4 h-4 mr-1" />}
              <span className="text-sm">{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  )
}

export default StatCard
