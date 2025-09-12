import React from 'react'
import { motion } from 'framer-motion'
import {
  ChartBarIcon,
  PresentationChartLineIcon,
  DocumentChartBarIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline'

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
          <p className="text-gray-600">Data analytics and business intelligence dashboard</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center"
      >
        <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
        <p className="text-gray-600 mb-4">
          Advanced analytics and insights for farm management, compliance tracking, and business intelligence.
        </p>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          View Analytics
        </button>
      </motion.div>
    </div>
  )
}

export default Analytics
