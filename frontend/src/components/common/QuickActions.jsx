import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const QuickActions = ({ actions }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={action.href}
                className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-gray-700">
                      {action.title}
                    </h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default QuickActions
