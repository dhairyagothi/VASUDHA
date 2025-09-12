import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BeakerIcon,
  DocumentTextIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import StatCard from '../../components/common/StatCard'
import QuickActions from '../../components/common/QuickActions'
import RecentActivity from '../../components/common/RecentActivity'
import AlertsPanel from '../../components/common/AlertsPanel'

const LabDashboard = () => {
  const [stats] = useState({
    pendingSamples: 15,
    completedToday: 8,
    mrlViolations: 2,
    averageProcessingTime: 24
  })

  const quickActions = [
    {
      title: 'Process Sample',
      description: 'Start testing new sample',
      icon: BeakerIcon,
      color: 'bg-blue-500',
      href: '/lab-results'
    },
    {
      title: 'Upload Results',
      description: 'Submit test results',
      icon: DocumentTextIcon,
      color: 'bg-green-500',
      href: '/test-reports'
    },
    {
      title: 'Sample Queue',
      description: 'View pending samples',
      icon: ClockIcon,
      color: 'bg-purple-500',
      href: '/sampling'
    },
    {
      title: 'Generate Report',
      description: 'Create compliance report',
      icon: DocumentTextIcon,
      color: 'bg-orange-500',
      href: '/compliance'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'test',
      message: 'Completed MRL test for Sample #MS001 - PASSED',
      time: '15 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'violation',
      message: 'MRL violation detected in Sample #MS002',
      time: '1 hour ago',
      status: 'error'
    },
    {
      id: 3,
      type: 'pending',
      message: 'Received new sample batch from Green Valley Farm',
      time: '2 hours ago',
      status: 'pending'
    }
  ]

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'MRL Violation Detected',
      message: 'Sample #MS002 exceeds Tetracycline MRL limit',
      time: '1 hour ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Equipment Calibration',
      message: 'HPLC system calibration due tomorrow',
      time: '6 hours ago'
    }
  ]

  const sampleQueue = [
    {
      id: 'MS005',
      farmName: 'Sunshine Dairy',
      sampleType: 'Milk',
      priority: 'High',
      receivedAt: '2 hours ago',
      status: 'pending'
    },
    {
      id: 'MS006',
      farmName: 'Organic Valley',
      sampleType: 'Milk',
      priority: 'Normal',
      receivedAt: '4 hours ago',
      status: 'in-progress'
    },
    {
      id: 'MS007',
      farmName: 'Green Farm',
      sampleType: 'Meat',
      priority: 'Normal',
      receivedAt: '6 hours ago',
      status: 'pending'
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Normal': return 'bg-blue-100 text-blue-800'
      case 'Low': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Good morning, Central Lab! 🔬</h1>
        <p className="opacity-90">Laboratory testing and compliance monitoring</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.pendingSamples}</div>
            <div className="text-sm opacity-90">Pending Samples</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.completedToday}</div>
            <div className="text-sm opacity-90">Completed Today</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.mrlViolations}</div>
            <div className="text-sm opacity-90">MRL Violations</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.averageProcessingTime}h</div>
            <div className="text-sm opacity-90">Avg Processing</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Sample Backlog"
          value={stats.pendingSamples}
          change="+3 from yesterday"
          changeType="negative"
          icon={BeakerIcon}
          color="purple"
        />
        <StatCard
          title="Tests Completed"
          value="47"
          change="This week"
          changeType="positive"
          icon={CheckCircleIcon}
          color="green"
        />
        <StatCard
          title="MRL Violations"
          value={stats.mrlViolations}
          change="This month"
          changeType="negative"
          icon={ExclamationTriangleIcon}
          color="red"
        />
        <StatCard
          title="Lab Efficiency"
          value="96%"
          change="+2% this month"
          changeType="positive"
          icon={DocumentTextIcon}
          color="blue"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions actions={quickActions} />
          
          {/* Sample Queue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Sample Queue</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View all
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium text-gray-900">Sample ID</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-900">Farm</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-900">Type</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-900">Priority</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-900">Status</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-900">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sampleQueue.map((sample) => (
                    <tr key={sample.id} className="hover:bg-gray-50">
                      <td className="py-3 text-sm font-medium text-gray-900">{sample.id}</td>
                      <td className="py-3 text-sm text-gray-600">{sample.farmName}</td>
                      <td className="py-3 text-sm text-gray-600">{sample.sampleType}</td>
                      <td className="py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(sample.priority)}`}>
                          {sample.priority}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(sample.status)}`}>
                          {sample.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">{sample.receivedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <RecentActivity activities={recentActivities} />
        </div>

        <div className="space-y-6">
          <AlertsPanel alerts={alerts} />
          
          {/* Equipment Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Status</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">HPLC System</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mass Spectrometer</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Centrifuge</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-yellow-600">Maintenance Due</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Test Standards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">MRL Standards</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Tetracycline (Milk)</span>
                <span className="font-medium">100 μg/kg</span>
              </div>
              <div className="flex justify-between">
                <span>Penicillin (Milk)</span>
                <span className="font-medium">4 μg/kg</span>
              </div>
              <div className="flex justify-between">
                <span>Chloramphenicol</span>
                <span className="font-medium text-red-600">Not Detected</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LabDashboard
