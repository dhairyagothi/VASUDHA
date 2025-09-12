import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  UserGroupIcon,
  CogIcon,
  ChartBarIcon,
  ServerIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import StatCard from '../../components/common/StatCard'
import QuickActions from '../../components/common/QuickActions'
import RecentActivity from '../../components/common/RecentActivity'
import AlertsPanel from '../../components/common/AlertsPanel'

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 324,
    activeFarms: 156,
    systemUptime: 99.8,
    dataPoints: 12450
  })

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: UserGroupIcon,
      color: 'bg-blue-500',
      href: '/users'
    },
    {
      title: 'System Settings',
      description: 'Configure system parameters',
      icon: CogIcon,
      color: 'bg-gray-500',
      href: '/settings'
    },
    {
      title: 'Analytics Dashboard',
      description: 'View system-wide analytics',
      icon: ChartBarIcon,
      color: 'bg-green-500',
      href: '/analytics'
    },
    {
      title: 'Audit Trail',
      description: 'Review system activity logs',
      icon: ShieldCheckIcon,
      color: 'bg-purple-500',
      href: '/audit'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      message: 'New veterinarian registered: Dr. Sharma',
      time: '15 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'system',
      message: 'System backup completed successfully',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'alert',
      message: 'Database connection timeout alert resolved',
      time: '4 hours ago',
      status: 'warning'
    }
  ]

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Server Load',
      message: 'Database server CPU usage at 85%',
      time: '10 minutes ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for Sunday 2 AM',
      time: '1 day ago'
    }
  ]

  const systemMetrics = [
    { name: 'API Response Time', value: '120ms', status: 'good' },
    { name: 'Database Queries/sec', value: '450', status: 'good' },
    { name: 'Active Connections', value: '234', status: 'warning' },
    { name: 'Error Rate', value: '0.02%', status: 'good' }
  ]

  const userStats = [
    { role: 'Farmers', count: 156, percentage: 48 },
    { role: 'Veterinarians', count: 45, percentage: 14 },
    { role: 'Labs', count: 23, percentage: 7 },
    { role: 'Regulators', count: 12, percentage: 4 },
    { role: 'Admins', count: 5, percentage: 2 }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-gray-600 to-blue-600 rounded-lg p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Good morning, Admin! ⚙️</h1>
        <p className="opacity-90">System administration and monitoring</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.totalUsers}</div>
            <div className="text-sm opacity-90">Total Users</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.activeFarms}</div>
            <div className="text-sm opacity-90">Active Farms</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.systemUptime}%</div>
            <div className="text-sm opacity-90">System Uptime</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.dataPoints.toLocaleString()}</div>
            <div className="text-sm opacity-90">Data Points</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="System Health"
          value="Excellent"
          change="99.8% uptime"
          changeType="positive"
          icon={ServerIcon}
          color="green"
        />
        <StatCard
          title="Active Users"
          value="234"
          change="+12 today"
          changeType="positive"
          icon={UserGroupIcon}
          color="blue"
        />
        <StatCard
          title="Data Storage"
          value="2.4 TB"
          change="85% capacity"
          changeType="warning"
          icon={ChartBarIcon}
          color="orange"
        />
        <StatCard
          title="Security Alerts"
          value="0"
          change="All clear"
          changeType="positive"
          icon={ShieldCheckIcon}
          color="purple"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions actions={quickActions} />
          
          {/* System Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Metrics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{metric.name}</span>
                    <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                      {metric.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* User Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h3>
            
            <div className="space-y-4">
              {userStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">{stat.role}</span>
                    <span className="text-sm text-gray-600">({stat.count})</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{width: `${stat.percentage}%`}}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-10">{stat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <RecentActivity activities={recentActivities} />
        </div>

        <div className="space-y-6">
          <AlertsPanel alerts={alerts} />
          
          {/* Database Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Status</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Connection Pool</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Replication</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Backup Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Completed</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage Usage</span>
                <span className="text-sm text-gray-900">2.4TB / 5TB</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Activity</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">New Registrations</span>
                <span className="text-sm font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">API Requests</span>
                <span className="text-sm font-medium">45,678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Data Processed</span>
                <span className="text-sm font-medium">2.3 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Error Rate</span>
                <span className="text-sm font-medium text-green-600">0.02%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
