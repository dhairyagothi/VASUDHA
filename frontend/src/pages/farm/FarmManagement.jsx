import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PlusIcon, 
  MapPinIcon, 
  BuildingOfficeIcon,
  UserGroupIcon,
  ChartBarIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { useFarmStore } from '../../store/farmStore'

const FarmManagement = () => {
  const { farms, addFarm, updateFarm, deleteFarm, setSelectedFarm } = useFarmStore()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingFarm, setEditingFarm] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  const [newFarm, setNewFarm] = useState({
    name: '',
    location: '',
    farmType: 'dairy',
    size: '',
    owner: '',
    phone: '',
    email: '',
    coordinates: { lat: '', lng: '' },
    registrationNumber: '',
    animals: []
  })

  // Mock data if no farms exist
  const mockFarms = farms.length > 0 ? farms : [
    {
      id: '1',
      name: 'Green Valley Farm',
      location: 'Maharashtra, India',
      farmType: 'dairy',
      size: '50 acres',
      owner: 'Rajesh Kumar',
      phone: '+91-9876543210',
      email: 'rajesh@greenvalley.com',
      coordinates: { lat: '19.0760', lng: '72.8777' },
      registrationNumber: 'MH-001-2023',
      animals: 45,
      lastInspection: '2024-08-15',
      complianceScore: 92,
      status: 'active'
    },
    {
      id: '2',
      name: 'Sunshine Dairy',
      location: 'Gujarat, India',
      farmType: 'dairy',
      size: '35 acres',
      owner: 'Priya Patel',
      phone: '+91-9876543211',
      email: 'priya@sunshine.com',
      coordinates: { lat: '23.0225', lng: '72.5714' },
      registrationNumber: 'GJ-002-2023',
      animals: 32,
      lastInspection: '2024-08-20',
      complianceScore: 88,
      status: 'active'
    },
    {
      id: '3',
      name: 'Organic Valley',
      location: 'Karnataka, India',
      farmType: 'mixed',
      size: '75 acres',
      owner: 'Suresh Reddy',
      phone: '+91-9876543212',
      email: 'suresh@organic.com',
      coordinates: { lat: '12.9716', lng: '77.5946' },
      registrationNumber: 'KA-003-2023',
      animals: 68,
      lastInspection: '2024-08-10',
      complianceScore: 95,
      status: 'active'
    }
  ]

  const handleAddFarm = (e) => {
    e.preventDefault()
    addFarm({
      ...newFarm,
      status: 'active',
      complianceScore: Math.floor(Math.random() * 20) + 80,
      lastInspection: new Date().toISOString().split('T')[0],
      animals: Math.floor(Math.random() * 50) + 20
    })
    setNewFarm({
      name: '',
      location: '',
      farmType: 'dairy',
      size: '',
      owner: '',
      phone: '',
      email: '',
      coordinates: { lat: '', lng: '' },
      registrationNumber: '',
      animals: []
    })
    setShowAddModal(false)
  }

  const getStatusColor = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800'
    if (score >= 80) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getStatusText = (score) => {
    if (score >= 90) return 'Excellent'
    if (score >= 80) return 'Good'
    return 'Needs Attention'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farm Management</h1>
          <p className="text-gray-600">Manage and monitor registered farms</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              List
            </button>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Farm</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{mockFarms.length}</div>
              <div className="text-sm text-gray-600">Total Farms</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {mockFarms.reduce((sum, farm) => sum + (farm.animals || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Animals</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(mockFarms.reduce((sum, farm) => sum + farm.complianceScore, 0) / mockFarms.length)}%
              </div>
              <div className="text-sm text-gray-600">Avg Compliance</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <MapPinIcon className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">States Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Farm List/Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFarms.map((farm, index) => (
            <motion.div
              key={farm.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{farm.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {farm.location}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(farm.complianceScore)}`}>
                  {getStatusText(farm.complianceScore)}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Owner:</span>
                  <span className="text-gray-900">{farm.owner}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="text-gray-900 capitalize">{farm.farmType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Animals:</span>
                  <span className="text-gray-900">{farm.animals}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Size:</span>
                  <span className="text-gray-900">{farm.size}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Compliance: {farm.complianceScore}%
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Animals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compliance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockFarms.map((farm) => (
                <tr key={farm.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{farm.name}</div>
                      <div className="text-sm text-gray-500">{farm.registrationNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{farm.owner}</div>
                    <div className="text-sm text-gray-500">{farm.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {farm.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {farm.animals}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(farm.complianceScore)}`}>
                      {farm.complianceScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Farm Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Farm</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddFarm} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Farm Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newFarm.name}
                    onChange={(e) => setNewFarm({...newFarm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newFarm.owner}
                    onChange={(e) => setNewFarm({...newFarm, owner: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={newFarm.location}
                  onChange={(e) => setNewFarm({...newFarm, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Farm Type
                  </label>
                  <select
                    value={newFarm.farmType}
                    onChange={(e) => setNewFarm({...newFarm, farmType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="dairy">Dairy</option>
                    <option value="poultry">Poultry</option>
                    <option value="mixed">Mixed</option>
                    <option value="cattle">Cattle</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Farm Size
                  </label>
                  <input
                    type="text"
                    required
                    value={newFarm.size}
                    onChange={(e) => setNewFarm({...newFarm, size: e.target.value})}
                    placeholder="e.g., 50 acres"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={newFarm.phone}
                    onChange={(e) => setNewFarm({...newFarm, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newFarm.email}
                    onChange={(e) => setNewFarm({...newFarm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  required
                  value={newFarm.registrationNumber}
                  onChange={(e) => setNewFarm({...newFarm, registrationNumber: e.target.value})}
                  placeholder="e.g., MH-001-2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Farm
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default FarmManagement
