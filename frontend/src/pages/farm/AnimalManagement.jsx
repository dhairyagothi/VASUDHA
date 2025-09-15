import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PlusIcon,
  UserIcon,
  TagIcon,
  CalendarDaysIcon,
  HeartIcon,
  ScaleIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { useFarmStore } from '../../store/farmStore'

const AnimalManagement = () => {
  const { animals, addAnimal, updateAnimal, deleteAnimal, farms } = useFarmStore()
  const [showAddModal, setShowAddModal] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  
  const [newAnimal, setNewAnimal] = useState({
    tagId: '',
    species: 'cattle',
    breed: '',
    dateOfBirth: '',
    gender: 'female',
    weight: '',
    farmId: '',
    vaccinations: [],
    healthStatus: 'healthy'
  })

  // Mock data if no animals exist
  const mockAnimals = animals.length > 0 ? animals : [
    {
      id: '1',
      tagId: 'C001',
      species: 'cattle',
      breed: 'Holstein',
      dateOfBirth: '2021-03-15',
      gender: 'female',
      weight: '450',
      farmId: '1',
      farmName: 'Green Valley Farm',
      vaccinations: ['FMD', 'Anthrax'],
      healthStatus: 'healthy',
      lastCheckup: '2024-08-15',
      treatments: 3,
      pregnancyStatus: 'pregnant'
    },
    {
      id: '2',
      tagId: 'C002',
      species: 'cattle',
      breed: 'Jersey',
      dateOfBirth: '2022-01-20',
      gender: 'female',
      weight: '380',
      farmId: '1',
      farmName: 'Green Valley Farm',
      vaccinations: ['FMD', 'BQ'],
      healthStatus: 'healthy',
      lastCheckup: '2024-08-20',
      treatments: 1,
      pregnancyStatus: 'not_pregnant'
    },
    {
      id: '3',
      tagId: 'G001',
      species: 'goat',
      breed: 'Boer',
      dateOfBirth: '2023-05-10',
      gender: 'male',
      weight: '75',
      farmId: '2',
      farmName: 'Sunshine Dairy',
      vaccinations: ['PPR'],
      healthStatus: 'under_treatment',
      lastCheckup: '2024-09-01',
      treatments: 2,
      pregnancyStatus: null
    }
  ]

  const handleAddAnimal = (e) => {
    e.preventDefault()
    const selectedFarm = farms.find(f => f.id === newAnimal.farmId)
    
    addAnimal({
      ...newAnimal,
      farmName: selectedFarm?.name || 'Unknown Farm',
      lastCheckup: new Date().toISOString().split('T')[0],
      treatments: 0
    })
    
    setNewAnimal({
      tagId: '',
      species: 'cattle',
      breed: '',
      dateOfBirth: '',
      gender: 'female',
      weight: '',
      farmId: '',
      vaccinations: [],
      healthStatus: 'healthy'
    })
    setShowAddModal(false)
  }

  const getHealthStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800'
      case 'under_treatment': return 'bg-yellow-100 text-yellow-800'
      case 'sick': return 'bg-red-100 text-red-800'
      case 'quarantine': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAge = (dateOfBirth) => {
    const today = new Date()
    const birth = new Date(dateOfBirth)
    const diffTime = Math.abs(today - birth)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)
    
    if (years > 0) {
      return `${years}y ${months}m`
    } else {
      return `${months}m`
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Animal Management</h1>
          <p className="text-gray-600">Track and manage livestock health and records</p>
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

          <div className="flex items-center space-x-4">
              <div className="h-6 border-l border-gray-300" />
              <div className="text-sm text-gray-600">View Mode</div>
              <div>
                <div>
                  <boxmodel>
                    <div>
                      
                    </div>
                  </boxmodel>
                  <div>
                    <h2>cow name</h2>
                    <p>details</p>
                  </div>
                </div>
              </div>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Animal</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <UserIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{mockAnimals.length}</div>
              <div className="text-sm text-gray-600">Total Animals</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <HeartIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {mockAnimals.filter(a => a.healthStatus === 'healthy').length}
              </div>
              <div className="text-sm text-gray-600">Healthy</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {mockAnimals.filter(a => a.healthStatus === 'under_treatment').length}
              </div>
              <div className="text-sm text-gray-600">Under Treatment</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <ScaleIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(mockAnimals.reduce((sum, a) => sum + parseInt(a.weight || 0), 0) / mockAnimals.length)}kg
              </div>
              <div className="text-sm text-gray-600">Avg Weight</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animal List/Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAnimals.map((animal, index) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <TagIcon className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">{animal.tagId}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{animal.farmName}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getHealthStatusColor(animal.healthStatus)}`}>
                  {animal.healthStatus.replace('_', ' ')}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Species:</span>
                  <span className="text-gray-900 capitalize">{animal.species}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Breed:</span>
                  <span className="text-gray-900">{animal.breed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Age:</span>
                  <span className="text-gray-900">{getAge(animal.dateOfBirth)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Weight:</span>
                  <span className="text-gray-900">{animal.weight}kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Treatments:</span>
                  <span className="text-gray-900">{animal.treatments}</span>
                </div>
              </div>
              
              {animal.pregnancyStatus && (
                <div className="mb-4 p-2 bg-pink-50 rounded-lg">
                  <div className="text-sm text-pink-800">
                    🤱 {animal.pregnancyStatus === 'pregnant' ? 'Pregnant' : 'Not Pregnant'}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Last checkup: {new Date(animal.lastCheckup).toLocaleDateString()}
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
                  Animal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age/Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Health Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Checkup
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockAnimals.map((animal) => (
                <tr key={animal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{animal.tagId}</div>
                      <div className="text-sm text-gray-500">{animal.species} - {animal.breed}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {animal.farmName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getAge(animal.dateOfBirth)} / {animal.weight}kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getHealthStatusColor(animal.healthStatus)}`}>
                      {animal.healthStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(animal.lastCheckup).toLocaleDateString()}
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

      {/* Add Animal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Animal</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddAnimal} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tag ID
                  </label>
                  <input
                    type="text"
                    required
                    value={newAnimal.tagId}
                    onChange={(e) => setNewAnimal({...newAnimal, tagId: e.target.value})}
                    placeholder="e.g., C001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Species
                  </label>
                  <select
                    value={newAnimal.species}
                    onChange={(e) => setNewAnimal({...newAnimal, species: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="cattle">Cattle</option>
                    <option value="goat">Goat</option>
                    <option value="sheep">Sheep</option>
                    <option value="buffalo">Buffalo</option>
                    <option value="pig">Pig</option>
                    <option value="poultry">Poultry</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Breed
                  </label>
                  <input
                    type="text"
                    required
                    value={newAnimal.breed}
                    onChange={(e) => setNewAnimal({...newAnimal, breed: e.target.value})}
                    placeholder="e.g., Holstein, Jersey"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={newAnimal.gender}
                    onChange={(e) => setNewAnimal({...newAnimal, gender: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    required
                    value={newAnimal.dateOfBirth}
                    onChange={(e) => setNewAnimal({...newAnimal, dateOfBirth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    required
                    value={newAnimal.weight}
                    onChange={(e) => setNewAnimal({...newAnimal, weight: e.target.value})}
                    placeholder="Current weight"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Farm
                  </label>
                  <select
                    required
                    value={newAnimal.farmId}
                    onChange={(e) => setNewAnimal({...newAnimal, farmId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select a farm</option>
                    {farms.map(farm => (
                      <option key={farm.id} value={farm.id}>
                        {farm.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Health Status
                  </label>
                  <select
                    value={newAnimal.healthStatus}
                    onChange={(e) => setNewAnimal({...newAnimal, healthStatus: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="healthy">Healthy</option>
                    <option value="under_treatment">Under Treatment</option>
                    <option value="sick">Sick</option>
                    <option value="quarantine">Quarantine</option>
                  </select>
                </div>
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
                  Add Animal
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AnimalManagement
