import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ClipboardDocumentListIcon,
  UserGroupIcon,
  MapIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import StatCard from '../../components/common/StatCard'
import QuickActions from '../../components/common/QuickActions'
import RecentActivity from '../../components/common/RecentActivity'
import AlertsPanel from '../../components/common/AlertsPanel'

const VeterinarianDashboard = () => {
  const [stats] = useState({
    activePrescriptions: 12,
    farmsVisited: 8,
    animalsExamined: 45,
    pendingFollowups: 3
  })

  const quickActions = [
    {
      title: 'Create Prescription',
      description: 'Write new prescription for animal',
      icon: ClipboardDocumentListIcon,
      color: 'bg-blue-500',
      href: '/prescriptions'
    },
    {
      title: 'Schedule Farm Visit',
      description: 'Plan upcoming farm inspections',
      icon: CalendarDaysIcon,
      color: 'bg-green-500',
      href: '/farm-visits'
    },
    {
      title: 'View Farm Map',
      description: 'Geographic view of assigned farms',
      icon: MapIcon,
      color: 'bg-purple-500',
      href: '/farms'
    },
    {
      title: 'Treatment Analytics',
      description: 'Review treatment effectiveness',
      icon: ChartBarIcon,
      color: 'bg-orange-500',
      href: '/analytics'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'prescription',
      message: 'Prescribed Amoxicillin for Cattle #456 at Green Valley Farm',
      time: '30 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'visit',
      message: 'Completed inspection at Sunrise Dairy Farm',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'followup',
      message: 'Follow-up required for Cow #789 treatment',
      time: '1 day ago',
      status: 'warning'
    }
  ]

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Follow-up Required',
      message: 'Cattle #456 treatment follow-up due tomorrow',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Farm Registration',
      message: 'Organic Valley Farm requested veterinary services',
      time: '1 day ago'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Good morning, Dr. Priya! 👩‍⚕️</h1>
        <p className="opacity-90">Your veterinary practice overview</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.activePrescriptions}</div>
            <div className="text-sm opacity-90">Active Prescriptions</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.farmsVisited}</div>
            <div className="text-sm opacity-90">Farms This Week</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.animalsExamined}</div>
            <div className="text-sm opacity-90">Animals Examined</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-lg font-semibold">{stats.pendingFollowups}</div>
            <div className="text-sm opacity-90">Pending Follow-ups</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Appointments"
          value="6"
          change="+2 from yesterday"
          changeType="positive"
          icon={CalendarDaysIcon}
          color="blue"
        />
        <StatCard
          title="Prescriptions Written"
          value="23"
          change="This week"
          changeType="neutral"
          icon={ClipboardDocumentListIcon}
          color="green"
        />
        <StatCard
          title="Emergency Calls"
          value="2"
          change="Active now"
          changeType="negative"
          icon={ExclamationTriangleIcon}
          color="red"
        />
        <StatCard
          title="Treatment Success Rate"
          value="94%"
          change="+3% this month"
          changeType="positive"
          icon={ChartBarIcon}
          color="purple"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions actions={quickActions} />
          <RecentActivity activities={recentActivities} />
          
          {/* Today's Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Farm Visit - Green Valley</div>
                  <div className="text-sm text-gray-600">Routine health check</div>
                </div>
                <div className="text-sm text-blue-600">10:00 AM</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Emergency Call - Sunrise Dairy</div>
                  <div className="text-sm text-gray-600">Cattle showing symptoms</div>
                </div>
                <div className="text-sm text-yellow-600">2:00 PM</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Follow-up - Organic Valley</div>
                  <div className="text-sm text-gray-600">Treatment progress review</div>
                </div>
                <div className="text-sm text-green-600">4:30 PM</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <AlertsPanel alerts={alerts} />
          
          {/* Drug Database Quick Access */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Drug Database</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Search drugs..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="space-y-2 mt-3">
                <div className="p-2 bg-gray-50 rounded text-sm">
                  <div className="font-medium">Amoxicillin</div>
                  <div className="text-gray-600">Cattle: 7-14 day withdrawal</div>
                </div>
                <div className="p-2 bg-gray-50 rounded text-sm">
                  <div className="font-medium">Oxytetracycline</div>
                  <div className="text-gray-600">Dairy: 10 day withdrawal</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default VeterinarianDashboard
