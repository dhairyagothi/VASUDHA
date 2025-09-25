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
  BellAlertIcon,
  BeakerIcon,
  CheckCircleIcon,
  TruckIcon,
  IdentificationIcon,
  BoltIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline'

// Components
import StatCard from '../../components/common/StatCard'
import QuickActions from '../../components/common/QuickActions'
import RecentActivity from '../../components/common/RecentActivity'
import WeatherWidget from '../../components/common/WeatherWidget'
import AlertsPanel from '../../components/common/AlertsPanel'

const ProducerDashboard = () => {
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
      icon: BeakerIcon,
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
      icon: IdentificationIcon,
      color: 'bg-purple-500',
      href: '/sampling'
    },
    {
      title: 'View Animals',
      description: 'Manage animal profiles',
      icon: UserGroupIcon,
      color: 'bg-orange-500',
      href: '/animals'
    },
    {
      title: 'Order Supplies',
      description: 'Request new inventory items',
      icon: TruckIcon,
      color: 'bg-pink-500',
      href: '/order-supplies'
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
    <div className="space-y-8">
      {/* Header with quick stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-700 to-blue-700 rounded-2xl p-8 text-white shadow-lg"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Good morning, Producer! <span role='img' aria-label='sunrise'>🌅</span></h1>
            <p className="opacity-90 text-lg">Today's livestock overview and important updates</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-3 bg-white/20 rounded-xl p-4">
              <UserGroupIcon className="w-7 h-7 text-white/90" />
              <div>
                <div className="text-xl font-semibold">{stats.totalAnimals}</div>
                <div className="text-xs opacity-90">Total Animals</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/20 rounded-xl p-4">
              <CheckCircleIcon className="w-7 h-7 text-white/90" />
              <div>
                <div className="text-xl font-semibold">{stats.complianceScore}%</div>
                <div className="text-xs opacity-90">Compliance Score</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/20 rounded-xl p-4">
              <ExclamationTriangleIcon className="w-7 h-7 text-yellow-300" />
              <div>
                <div className="text-xl font-semibold">{stats.withdrawalPending}</div>
                <div className="text-xs opacity-90">Pending Withdrawals</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/20 rounded-xl p-4">
              <BoltIcon className="w-7 h-7 text-white/90" />
              <div>
                <div className="text-xl font-semibold">{stats.lowStock}</div>
                <div className="text-xs opacity-90">Low Stock Items</div>
              </div>
            </div>
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
          icon={Squares2X2Icon}
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
          icon={CheckCircleIcon}
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <QuickActions actions={quickActions} />

          {/* Recent Activity */}
          <RecentActivity activities={recentActivities} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Alerts Panel */}
          <AlertsPanel alerts={alerts} />

          {/* Weather Widget */}
          <WeatherWidget location="Maharashtra, India" />

          {/* AI Risk Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">AI Risk Assessment</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Low Risk</div>
              <div className="text-sm text-gray-600 mb-4">
                Your livestock compliance is excellent
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
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
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

export default ProducerDashboard