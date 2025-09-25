import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  Users, 
  Stethoscope, 
  TestTube, 
  Truck, 
  Shield, 
  Settings,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  MapPin,
  Clock,
  Bell
} from 'lucide-react';

const MainDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [systemMetrics, setSystemMetrics] = useState({
    totalFarms: 2847,
    totalAnimals: 45823,
    activeCollectors: 156,
    labsConnected: 23,
    complianceRate: 94.2,
    alertsActive: 18
  });

  // Role-based dashboard routing
  const userDashboards = {
    producer: {
      title: 'Livestock Producer Dashboard',
      description: 'Manage your farm, animals, and compliance',
      icon: Users,
      color: 'bg-green-600',
      route: '/dashboard/producer',
      features: ['AMU Logging', 'Animal Profiles', 'Compliance Tracking', 'Marketplace Integration']
    },
    veterinarian: {
      title: 'Veterinarian Dashboard',
      description: 'Manage prescriptions and farm oversight',
      icon: Stethoscope,
      color: 'bg-blue-600',
      route: '/dashboard/veterinarian',
      features: ['Digital Prescriptions', 'Farm Oversight', 'Teleconsultation', 'Drug Knowledge Base']
    },
    lab: {
      title: 'Laboratory Dashboard',
      description: 'Manage samples and MRL testing',
      icon: TestTube,
      color: 'bg-purple-600',
      route: '/dashboard/lab',
      features: ['Sample Management', 'Result Submission', 'Data API Interface', 'Quality Control']
    },
    collector: {
      title: 'Collector Dashboard',
      description: 'Collection planning and compliance verification',
      icon: Truck,
      color: 'bg-orange-600',
      route: '/dashboard/collector',
      features: ['Compliance Check', 'Route Optimization', 'Digital Receipts', 'Risk Insights']
    },
    regulator: {
      title: 'Government/Regulator Dashboard',
      description: 'Oversight, analytics, and policy management',
      icon: Shield,
      color: 'bg-red-600',
      route: '/dashboard/regulator',
      features: ['Real-time Analytics', 'Automated Reporting', 'Inspection Tools', 'Policy Management']
    },
    admin: {
      title: 'System Administrator Dashboard',
      description: 'System management and monitoring',
      icon: Settings,
      color: 'bg-gray-600',
      route: '/dashboard/admin',
      features: ['User Management', 'Security Monitoring', 'Performance Analytics', 'Support Panel']
    }
  };

  // Get current user's dashboard
  const currentDashboard = userDashboards[user?.role] || userDashboards.producer;

  // Navigate to user's specific dashboard
  useEffect(() => {
    if (user?.role) {
      // Auto-redirect to role-specific dashboard after 3 seconds
      const timer = setTimeout(() => {
        navigate(currentDashboard.route);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [user, navigate, currentDashboard]);

  const navigateToDashboard = (dashboard) => {
    navigate(dashboard.route);
  };

  // System-wide alerts and notifications
  const systemAlerts = [
    {
      id: 1,
      type: 'compliance',
      severity: 'high',
      message: 'MRL violation detected in Bhopal district - immediate action required',
      timestamp: '2025-09-25T10:30:00Z'
    },
    {
      id: 2,
      type: 'system',
      severity: 'medium',
      message: 'Blockchain network experiencing high traffic - some delays expected',
      timestamp: '2025-09-25T09:15:00Z'
    },
    {
      id: 3,
      type: 'update',
      severity: 'low',
      message: 'New MRL limits published for Oxytetracycline - update your records',
      timestamp: '2025-09-25T08:00:00Z'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">VASUDHA Platform</h1>
            <p className="text-gray-600 mt-2">
              Antimicrobial Usage Monitoring & MRL Compliance System
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-800">Welcome, {user?.name}</p>
              <p className="text-sm text-gray-600 capitalize">{user?.role} • {user?.organization}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* System Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Farms</p>
              <p className="text-2xl font-bold text-blue-600">{systemMetrics.totalFarms.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Animals Monitored</p>
              <p className="text-2xl font-bold text-green-600">{systemMetrics.totalAnimals.toLocaleString()}</p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Collectors</p>
              <p className="text-2xl font-bold text-orange-600">{systemMetrics.activeCollectors}</p>
            </div>
            <Truck className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Connected Labs</p>
              <p className="text-2xl font-bold text-purple-600">{systemMetrics.labsConnected}</p>
            </div>
            <TestTube className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Compliance Rate</p>
              <p className="text-2xl font-bold text-green-600">{systemMetrics.complianceRate}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-red-600">{systemMetrics.alertsActive}</p>
            </div>
            <Bell className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* User's Dashboard Card - Prominent */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Dashboard</h2>
        <div 
          className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => navigateToDashboard(currentDashboard)}
        >
          <div className="flex items-center space-x-6">
            <div className={`${currentDashboard.color} rounded-full p-4`}>
              <currentDashboard.icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{currentDashboard.title}</h3>
              <p className="text-gray-600 mb-3">{currentDashboard.description}</p>
              <div className="flex flex-wrap gap-2">
                {currentDashboard.features.map((feature, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mb-2">
                Access Dashboard
              </button>
              <p className="text-xs text-gray-500">Auto-redirecting in 3s...</p>
            </div>
          </div>
        </div>
      </div>

      {/* All Available Dashboards */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Platform Dashboards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(userDashboards).map(([key, dashboard]) => (
            <div 
              key={key}
              className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow ${
                user?.role === key ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => navigateToDashboard(dashboard)}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`${dashboard.color} rounded-lg p-3`}>
                  <dashboard.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{dashboard.title.replace(' Dashboard', '')}</h3>
                  {user?.role === key && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Your Role
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">{dashboard.description}</p>
              <div className="space-y-1">
                {dashboard.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs text-gray-500">
                    <CheckCircle className="w-3 h-3" />
                    <span>{feature}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400">+{dashboard.features.length - 2} more features</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">System Notifications</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`border-l-4 p-4 rounded-r-lg ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className={`w-4 h-4 ${
                        alert.severity === 'high' ? 'text-red-600' : 
                        alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                      <span className="text-sm font-medium capitalize">{alert.type} Alert</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="ml-4 text-sm text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Madhya Pradesh, India</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>94.2% System Compliance</span>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Real-time Monitoring Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;