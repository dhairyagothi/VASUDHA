import React, { useState, useEffect } from 'react'
import { 
  CalendarIcon, 
  DocumentCheckIcon,
  TruckIcon,
  ReceiptPercentIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '../../store/authStore'
import StatCard from '../../components/common/StatCard'

const CollectorDashboard = () => {
  const { user } = useAuthStore()
  const [stats, setStats] = useState({
    scheduledCollections: 15,
    completedToday: 8,
    pendingCompliance: 3,
    totalFarms: 45
  })

  const [upcomingCollections, setUpcomingCollections] = useState([
    {
      id: 1,
      farmName: "Green Valley Farm",
      location: "Sector 12, Pune",
      scheduledTime: "09:00 AM",
      type: "Milk Collection",
      compliance: "Verified",
      status: "scheduled"
    },
    {
      id: 2,
      farmName: "Sunrise Dairy",
      location: "Sector 8, Mumbai",
      scheduledTime: "11:30 AM", 
      type: "Sample Collection",
      compliance: "Pending",
      status: "scheduled"
    },
    {
      id: 3,
      farmName: "Highland Ranch",
      location: "Sector 15, Nashik",
      scheduledTime: "02:00 PM",
      type: "Quality Check",
      compliance: "Verified",
      status: "scheduled"
    }
  ])

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      action: "Collection completed",
      farmName: "Valley View Farm",
      timestamp: "2 hours ago",
      type: "success"
    },
    {
      id: 2,
      action: "Compliance issue detected",
      farmName: "Mountain Dairy",
      timestamp: "4 hours ago",
      type: "warning"
    },
    {
      id: 3,
      action: "Quality report submitted",
      farmName: "River Side Ranch",
      timestamp: "6 hours ago",
      type: "info"
    }
  ])

  const quickActions = [
    {
      title: "Schedule Collection",
      description: "Plan new collection visits",
      icon: CalendarIcon,
      color: "bg-blue-50 text-blue-700",
      href: "/collector/scheduling"
    },
    {
      title: "Compliance Check",
      description: "Verify farm compliance status",
      icon: DocumentCheckIcon,
      color: "bg-green-50 text-green-700",
      href: "/collector/compliance-check"
    },
    {
      title: "Digital Receipts",
      description: "Generate collection receipts",
      icon: ReceiptPercentIcon,
      color: "bg-purple-50 text-purple-700",
      href: "/collector/receipts"
    },
    {
      title: "Risk Analysis",
      description: "View risk insights",
      icon: ExclamationTriangleIcon,
      color: "bg-orange-50 text-orange-700",
      href: "/collector/risk-insights"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Collector Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'Collector'}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today's Date</p>
          <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Scheduled Collections"
          value={stats.scheduledCollections}
          icon={CalendarIcon}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Completed Today"
          value={stats.completedToday}
          icon={TruckIcon}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Pending Compliance"
          value={stats.pendingCompliance}
          icon={ExclamationTriangleIcon}
          color="orange"
          trend={{ value: 2, isPositive: false }}
        />
        <StatCard
          title="Total Farms"
          value={stats.totalFarms}
          icon={MapPinIcon}
          color="purple"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Collections */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Collections</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {upcomingCollections.map((collection) => (
                <div key={collection.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{collection.farmName}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          collection.compliance === 'Verified' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {collection.compliance}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span>{collection.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{collection.scheduledTime}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{collection.type}</p>
                      <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        Start Collection
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.farmName}</p>
                    <p className="text-xs text-gray-400">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Collection Performance</h2>
          <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
            <ChartBarIcon className="h-12 w-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Performance Chart</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Trends</h2>
          <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
            <ChartBarIcon className="h-12 w-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Compliance Chart</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectorDashboard