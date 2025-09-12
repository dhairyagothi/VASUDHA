import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  MapIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  BuildingOfficeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import StatCard from '../../components/common/StatCard'
import QuickActions from '../../components/common/QuickActions'
import RecentActivity from '../../components/common/RecentActivity'
import AlertsPanel from '../../components/common/AlertsPanel'

const RegulatorDashboard = () => {
  const [stats] = useState({
    registeredFarms: 156,
    mrlViolations: 8,
    complianceRate: 94,
    pendingInspections: 12
  })

  const quickActions = [
    {
      title: 'Compliance Monitor',
      description: 'View farm compliance status',
      icon: ShieldCheckIcon,
      color: 'bg-red-500',
      href: '/compliance'
    },
    {
      title: 'Geographic View',
      description: 'Map view of farms and violations',
      icon: MapIcon,
      color: 'bg-blue-500',
      href: '/geo-view'
    },
    {
      title: 'Generate Report',
      description: 'Create regulatory reports',
      icon: DocumentTextIcon,
      color: 'bg-green-500',
      href: '/reports'
    },
    {
      title: 'Risk Analytics',
      description: 'AI-powered risk assessment',
      icon: ChartBarIcon,
      color: 'bg-purple-500',
      href: '/analytics'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'violation',
      message: 'MRL violation reported at Green Valley Farm',
      time: '1 hour ago',
      status: 'error'
    },
    {
      id: 2,
      type: 'inspection',
      message: 'Completed inspection at Sunrise Dairy - Compliant',
      time: '3 hours ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'registration',
      message: 'New farm registration: Organic Valley Farm',
      time: '1 day ago',
      status: 'pending'
    }
  ]

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Risk Farm Detected',
      message: 'Sunshine Dairy shows concerning AMU patterns',
      time: '30 minutes ago'
    },
    {
      id: 2,
      type: 'error',
      title: 'Critical MRL Violation',
      message: 'Sample #MS008 exceeds safe limits by 300%',
      time: '2 hours ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'Inspection Scheduled',
      message: '5 farms scheduled for next week inspection',
      time: '1 day ago'
    }
  ]

  const riskAssessment = [
    { farm: 'Green Valley Farm', risk: 'High', score: 78, violations: 3 },
    { farm: 'Sunshine Dairy', risk: 'Medium', score: 45, violations: 1 },
    { farm: 'Organic Farm', risk: 'Low', score: 12, violations: 0 },
    { farm: 'Fresh Milk Co.', risk: 'Low', score: 8, violations: 0 }
  ]

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Good morning, Amit! 🛡️</h1>
        <p className="opacity-90">Regulatory oversight and compliance monitoring</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.registeredFarms}</div>
            <div className="text-sm opacity-90">Registered Farms</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.complianceRate}%</div>
            <div className="text-sm opacity-90">Compliance Rate</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.mrlViolations}</div>
            <div className="text-sm opacity-90">MRL Violations</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.pendingInspections}</div>
            <div className="text-sm opacity-90">Pending Inspections</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Violations"
          value={stats.mrlViolations}
          change="-2 from last month"
          changeType="positive"
          icon={ExclamationTriangleIcon}
          color="red"
        />
        <StatCard
          title="Farm Inspections"
          value="23"
          change="This month"
          changeType="neutral"
          icon={BuildingOfficeIcon}
          color="blue"
        />
        <StatCard
          title="Compliance Score"
          value={`${stats.complianceRate}%`}
          change="+3% improvement"
          changeType="positive"
          icon={ShieldCheckIcon}
          color="green"
        />
        <StatCard
          title="Risk Level"
          value="Moderate"
          change="Regional average"
          changeType="neutral"
          icon={ChartBarIcon}
          color="orange"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions actions={quickActions} />
          
          {/* Risk Assessment Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Farm Risk Assessment</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View all farms
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium text-gray-900">Farm Name</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-900">Risk Level</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-900">Risk Score</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-900">Violations</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {riskAssessment.map((farm, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 text-sm font-medium text-gray-900">{farm.farm}</td>
                      <td className="py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(farm.risk)}`}>
                          {farm.risk}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">{farm.score}</td>
                      <td className="py-3 text-sm text-gray-600">{farm.violations}</td>
                      <td className="py-3">
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          Inspect
                        </button>
                      </td>
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
          
          {/* Compliance Overview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Overview</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>MRL Compliance</span>
                  <span>94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Record Keeping</span>
                  <span>87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '87%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Withdrawal Periods</span>
                  <span>96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '96%'}}></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Regional Statistics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Statistics</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Maharashtra</span>
                <span className="text-sm font-medium">45 farms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Gujarat</span>
                <span className="text-sm font-medium">38 farms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Rajasthan</span>
                <span className="text-sm font-medium">32 farms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Karnataka</span>
                <span className="text-sm font-medium">28 farms</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RegulatorDashboard
