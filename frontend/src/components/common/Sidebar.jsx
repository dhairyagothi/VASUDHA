import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  HomeIcon,
  BuildingOfficeIcon,
  ClipboardDocumentIcon,
  BeakerIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CubeIcon,
  QrCodeIcon,
  MapIcon,
  BoltIcon
} from '@heroicons/react/24/outline'

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuthStore()
  const location = useLocation()

  // Navigation items based on user role
  const getNavigationItems = () => {
    const commonItems = [
      { name: 'Dashboard', href: `/dashboard/${user?.role}`, icon: HomeIcon },
    ]

    switch (user?.role) {
      case 'farmer':
        return [
          ...commonItems,
          { name: 'Farm Management', href: '/app/farms', icon: BuildingOfficeIcon },
          { name: 'Animals', href: '/app/animals', icon: UserGroupIcon },
          { name: 'Drug Inventory', href: '/app/inventory', icon: CubeIcon },
          { name: 'Administrations', href: '/app/administration', icon: ClipboardDocumentIcon },
          { name: 'Sample Collection', href: '/app/sampling', icon: BeakerIcon },
          { name: 'QR Scanner', href: '/app/qr-scanner', icon: QrCodeIcon },
          { name: 'Analytics', href: '/app/analytics', icon: ChartBarIcon },
        ]
      
      case 'veterinarian':
        return [
          ...commonItems,
          { name: 'Prescriptions', href: '/app/prescriptions', icon: ClipboardDocumentIcon },
          { name: 'Farm Visits', href: '/app/farms', icon: MapIcon },
          { name: 'Animals', href: '/app/animals', icon: UserGroupIcon },
          { name: 'Drug Database', href: '/app/inventory', icon: CubeIcon },
          { name: 'Treatment History', href: '/app/administration', icon: DocumentTextIcon },
          { name: 'Analytics', href: '/app/analytics', icon: ChartBarIcon },
        ]
      
      case 'lab':
        return [
          ...commonItems,
          { name: 'Sample Queue', href: '/app/sampling', icon: BeakerIcon },
          { name: 'Test Results', href: '/app/lab-results', icon: DocumentTextIcon },
          { name: 'Test Reports', href: '/app/test-reports', icon: ClipboardDocumentIcon },
          { name: 'MRL Database', href: '/app/mrl-database', icon: ShieldCheckIcon },
          { name: 'Analytics', href: '/app/analytics', icon: ChartBarIcon },
        ]
      
      case 'regulator':
        return [
          ...commonItems,
          { name: 'Compliance Monitor', href: '/app/compliance', icon: ShieldCheckIcon },
          { name: 'Farm Registry', href: '/app/farms', icon: BuildingOfficeIcon },
          { name: 'Lab Results', href: '/app/lab-results', icon: BeakerIcon },
          { name: 'Audit Trail', href: '/app/audit', icon: DocumentTextIcon },
          { name: 'Risk Analytics', href: '/app/analytics', icon: ChartBarIcon },
          { name: 'IoT Monitoring', href: '/app/iot-monitoring', icon: BoltIcon },
          { name: 'Geographic View', href: '/app/geo-view', icon: MapIcon },
        ]
      
      case 'admin':
        return [
          ...commonItems,
          { name: 'User Management', href: '/app/users', icon: UserGroupIcon },
          { name: 'Farm Registry', href: '/app/farms', icon: BuildingOfficeIcon },
          { name: 'System Analytics', href: '/app/analytics', icon: ChartBarIcon },
          { name: 'Audit Trail', href: '/app/audit', icon: DocumentTextIcon },
          { name: 'Settings', href: '/app/settings', icon: CogIcon },
        ]
      
      default:
        return commonItems
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo and close button */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="VASUDHA Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-bold text-gray-900">VASUDHA</span>
          </div>
          
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-green-100 text-green-700 border-r-2 border-green-500' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose()
                  }
                }}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            )
          })}
        </nav>

        {/* Quick actions */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="space-y-2">
            <button className="w-full flex items-center px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg">
              <QrCodeIcon className="h-4 w-4 mr-2" />
              Quick Scan
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
              <BoltIcon className="h-4 w-4 mr-2" />
              AI Assistant
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
