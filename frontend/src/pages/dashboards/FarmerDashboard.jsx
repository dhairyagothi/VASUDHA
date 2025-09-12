import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  UserGroupIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  QrCodeIcon,
  BellIcon
} from '@heroicons/react/24/outline'

// Components
import StatCard from '../../components/common/StatCard'
import QuickActions from '../../components/common/QuickActions'
import RecentActivity from '../../components/common/RecentActivity'
import WeatherWidget from '../../components/common/WeatherWidget'
import AlertsPanel from '../../components/common/AlertsPanel'

const FarmerDashboard = () => {
  const [stats, setStats] = useState({
    totalAnimals: 45,
    activeAnimals: 42,
    withdrawalPending: 3,
    lowStock: 2,
    samplesPending: 1,
    complianceScore: 92
  })

  const quickActions = [
    {
      title: 'Record Drug Administration',
      description: 'Quick drug administration entry',
      icon: ClipboardDocumentListIcon,
      color: 'bg-blue-500',
      href: '/administration'
    },
    {
      title: 'Scan QR Code',
      description: 'Scan drug batch or sample QR',
      icon: QrCodeIcon,
      color: 'bg-green-500',
      href: '/qr-scanner'
    },
    {
      title: 'Collect Sample',
      description: 'Register new sample collection',
      icon: CubeIcon,
      color: 'bg-purple-500',
      href: '/sampling'
    },
    {
      title: 'View Animals',
      description: 'Manage animal profiles',
      icon: UserGroupIcon,
      color: 'bg-orange-500',
      href: '/animals'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'administration',
      message: 'Administered Oxytetracycline to Cattle #123',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'sample',
      message: 'Milk sample collected from Cow #456',
      time: '1 day ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'alert',
      message: 'Withdrawal period ending for Cattle #789',
      time: '2 days ago',
      status: 'warning'
    }
  ]

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Withdrawal Period Ending',
      message: 'Cattle #123 withdrawal period ends tomorrow',
      time: '1 hour ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Low Stock Alert',
      message: 'Amoxicillin stock running low (5 units left)',
      time: '3 hours ago'
    },
    {
      id: 3,
      type: 'success',
      title: 'Sample Result',
      message: 'Milk sample #MS001 passed MRL test',
      time: '1 day ago'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Good morning, Rajesh! 🌅</h1>
        <p className="opacity-90">Today's farm overview and important updates</p>
        
        {/* Quick stats in header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.totalAnimals}</div>
            <div className="text-sm opacity-90">Total Animals</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.complianceScore}%</div>
            <div className="text-sm opacity-90">Compliance Score</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.withdrawalPending}</div>
            <div className="text-sm opacity-90">Pending Withdrawals</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.lowStock}</div>
            <div className="text-sm opacity-90">Low Stock Items</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Animals"
          value={stats.activeAnimals}
          change="+2 this week"
          changeType="positive"
          icon={UserGroupIcon}
          color="blue"
        />
        <StatCard
          title="Drug Inventory"
          value="18 types"
          change="2 low stock"
          changeType="negative"
          icon={CubeIcon}
          color="purple"
        />
        <StatCard
          title="Pending Samples"
          value={stats.samplesPending}
          change="1 new today"
          changeType="neutral"
          icon={ClipboardDocumentListIcon}
          color="green"
        />
        <StatCard
          title="Compliance Score"
          value={`${stats.complianceScore}%`}
          change="+5% this month"
          changeType="positive"
          icon={ArrowUpIcon}
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <QuickActions actions={quickActions} />
          
          {/* Recent Activity */}
          <RecentActivity activities={recentActivities} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Alerts Panel */}
          <AlertsPanel alerts={alerts} />
          
          {/* Weather Widget */}
          <WeatherWidget location="Maharashtra, India" />
          
          {/* AI Risk Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">AI Risk Assessment</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Low Risk</div>
              <div className="text-sm text-gray-600 mb-4">
                Your farm compliance is excellent
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>MRL Compliance</span>
                  <span className="font-medium">98%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Withdrawal Adherence</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Record Keeping</span>
                  <span className="font-medium">92%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* IoT Status Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">IoT Sensors</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Milk Quality Sensor</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Water Quality Monitor</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Feed Storage Sensor</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-yellow-600">Warning</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default FarmerDashboard
