import React from 'react'
import { useAuthStore } from '../../store/authStore'
import { 
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore()

  const notifications = [
    { id: 1, message: 'MRL violation detected in Sample #123', type: 'alert', time: '2 min ago' },
    { id: 2, message: 'Withdrawal period ending for Cattle #456', type: 'warning', time: '1 hour ago' },
    { id: 3, message: 'New prescription submitted', type: 'info', time: '3 hours ago' },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Menu button and title */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <div className="ml-4">
            <h1 className="text-xl font-semibold text-gray-900">
              {user?.role === 'farmer' && 'Farm Dashboard'}
              {user?.role === 'veterinarian' && 'Veterinary Portal'}
              {user?.role === 'lab' && 'Laboratory Dashboard'}
              {user?.role === 'regulator' && 'Regulatory Dashboard'}
              {user?.role === 'admin' && 'Admin Panel'}
            </h1>
          </div>
        </div>

        {/* Right side - Notifications and profile */}
        <div className="flex items-center space-x-4">
          {/* AI Risk Score Badge */}
          <div className="hidden md:flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-700 font-medium">Risk Score: Low</span>
          </div>

          {/* Notifications */}
          <Menu as="div" className="relative">
            <Menu.Button className="relative p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <BellIcon className="h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              )}
            </Menu.Button>
            
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  </div>
                  {notifications.map((notification) => (
                    <Menu.Item key={notification.id}>
                      <div className="px-4 py-3 hover:bg-gray-50">
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </Menu.Item>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      View all notifications
                    </button>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
              <UserCircleIcon className="h-8 w-8 text-gray-400" />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </Menu.Button>
            
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/profile"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } flex items-center px-4 py-2 text-sm text-gray-700`}
                      >
                        <UserCircleIcon className="h-4 w-4 mr-3" />
                        Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/settings"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } flex items-center px-4 py-2 text-sm text-gray-700`}
                      >
                        <Cog6ToothIcon className="h-4 w-4 mr-3" />
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <div className="border-t border-gray-200"></div>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  )
}

export default Header
