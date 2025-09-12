import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PlusIcon,
  BeakerIcon,
  TruckIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ClockIcon,
  ArrowPathIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  TagIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { useInventoryStore } from '../../store/inventoryStore'

const DrugInventory = () => {
  const { drugs, addDrug, updateDrug, deleteDrug } = useInventoryStore()
  const [showAddModal, setShowAddModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  const [newDrug, setNewDrug] = useState({
    name: '',
    activeIngredient: '',
    category: 'antibiotic',
    batchNumber: '',
    manufacturer: '',
    expiryDate: '',
    quantity: '',
    unit: 'ml',
    withdrawalPeriodMeat: '',
    withdrawalPeriodMilk: '',
    prescription: 'required',
    storageConditions: '',
    purpose: '',
    dosageInstructions: ''
  })

  // Mock data if no drugs exist
  const mockDrugs = drugs.length > 0 ? drugs : [
    {
      id: '1',
      name: 'Amoxicillin Injectable',
      activeIngredient: 'Amoxicillin Trihydrate',
      category: 'antibiotic',
      batchNumber: 'AMX2024-081',
      manufacturer: 'VetPharma Ltd',
      expiryDate: '2025-12-31',
      quantity: '250',
      unit: 'ml',
      withdrawalPeriodMeat: '14',
      withdrawalPeriodMilk: '4',
      prescription: 'required',
      storageConditions: 'Store at 2-8°C',
      purpose: 'Bacterial infections, mastitis',
      dosageInstructions: '1ml per 10kg body weight',
      status: 'in_stock',
      lowStockThreshold: '50',
      addedDate: '2024-06-15',
      lastUsed: '2024-08-20'
    },
    {
      id: '2',
      name: 'Ivermectin Pour-On',
      activeIngredient: 'Ivermectin',
      category: 'antiparasitic',
      batchNumber: 'IVM2024-092',
      manufacturer: 'AnimalHealth Corp',
      expiryDate: '2025-06-30',
      quantity: '15',
      unit: 'ml',
      withdrawalPeriodMeat: '35',
      withdrawalPeriodMilk: '28',
      prescription: 'required',
      storageConditions: 'Store below 25°C',
      purpose: 'External parasites, worms',
      dosageInstructions: '1ml per 10kg body weight',
      status: 'low_stock',
      lowStockThreshold: '50',
      addedDate: '2024-07-10',
      lastUsed: '2024-09-01'
    },
    {
      id: '3',
      name: 'Calcium Borogluconate',
      activeIngredient: 'Calcium Borogluconate',
      category: 'supplement',
      batchNumber: 'CAL2024-075',
      manufacturer: 'NutriVet Solutions',
      expiryDate: '2024-10-15',
      quantity: '120',
      unit: 'ml',
      withdrawalPeriodMeat: '0',
      withdrawalPeriodMilk: '0',
      prescription: 'otc',
      storageConditions: 'Store at room temperature',
      purpose: 'Calcium deficiency, milk fever',
      dosageInstructions: '100ml subcutaneous injection',
      status: 'expiring_soon',
      lowStockThreshold: '30',
      addedDate: '2024-05-20',
      lastUsed: '2024-08-25'
    },
    {
      id: '4',
      name: 'Vitamin B Complex',
      activeIngredient: 'B Vitamins Complex',
      category: 'vitamin',
      batchNumber: 'VIT2024-063',
      manufacturer: 'HealthyFarm Inc',
      expiryDate: '2025-03-20',
      quantity: '0',
      unit: 'ml',
      withdrawalPeriodMeat: '0',
      withdrawalPeriodMilk: '0',
      prescription: 'otc',
      storageConditions: 'Store in cool, dry place',
      purpose: 'Nutritional deficiency, stress',
      dosageInstructions: '5ml intramuscular',
      status: 'out_of_stock',
      lowStockThreshold: '25',
      addedDate: '2024-04-10',
      lastUsed: '2024-08-30'
    }
  ]

  const filteredDrugs = mockDrugs.filter(drug => {
    const matchesFilter = filter === 'all' || drug.status === filter
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drug.activeIngredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drug.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleAddDrug = (e) => {
    e.preventDefault()
    
    let status = 'in_stock'
    const quantity = parseInt(newDrug.quantity)
    const lowThreshold = 50
    const expiryDate = new Date(newDrug.expiryDate)
    const today = new Date()
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))
    
    if (quantity === 0) {
      status = 'out_of_stock'
    } else if (quantity <= lowThreshold) {
      status = 'low_stock'
    } else if (daysUntilExpiry <= 30) {
      status = 'expiring_soon'
    }
    
    addDrug({
      ...newDrug,
      status,
      lowStockThreshold: lowThreshold.toString(),
      addedDate: new Date().toISOString().split('T')[0]
    })
    
    setNewDrug({
      name: '',
      activeIngredient: '',
      category: 'antibiotic',
      batchNumber: '',
      manufacturer: '',
      expiryDate: '',
      quantity: '',
      unit: 'ml',
      withdrawalPeriodMeat: '',
      withdrawalPeriodMilk: '',
      prescription: 'required',
      storageConditions: '',
      purpose: '',
      dosageInstructions: ''
    })
    setShowAddModal(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800'
      case 'low_stock': return 'bg-yellow-100 text-yellow-800'
      case 'out_of_stock': return 'bg-red-100 text-red-800'
      case 'expiring_soon': return 'bg-orange-100 text-orange-800'
      case 'expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_stock': return <CheckCircleIcon className="h-5 w-5 text-green-600" />
      case 'low_stock': return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
      case 'out_of_stock': return <XCircleIcon className="h-5 w-5 text-red-600" />
      case 'expiring_soon': return <ClockIcon className="h-5 w-5 text-orange-600" />
      case 'expired': return <XCircleIcon className="h-5 w-5 text-red-600" />
      default: return <TagIcon className="h-5 w-5 text-gray-600" />
    }
  }

  const isExpiringSoon = (expiryDate) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0
  }

  const isExpired = (expiryDate) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    return expiry < today
  }

  const getDaysUntilExpiry = (expiryDate) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
  }

  const getStockStats = () => {
    const total = mockDrugs.length
    const inStock = mockDrugs.filter(d => d.status === 'in_stock').length
    const lowStock = mockDrugs.filter(d => d.status === 'low_stock').length
    const outOfStock = mockDrugs.filter(d => d.status === 'out_of_stock').length
    const expiring = mockDrugs.filter(d => isExpiringSoon(d.expiryDate)).length
    
    return { total, inStock, lowStock, outOfStock, expiring }
  }

  const stats = getStockStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Drug Inventory</h1>
          <p className="text-gray-600">Manage veterinary drugs and supplements</p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Drug</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <BeakerIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Drugs</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.inStock}</div>
              <div className="text-sm text-gray-600">In Stock</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.lowStock}</div>
              <div className="text-sm text-gray-600">Low Stock</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <XCircleIcon className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.outOfStock}</div>
              <div className="text-sm text-gray-600">Out of Stock</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.expiring}</div>
              <div className="text-sm text-gray-600">Expiring Soon</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {[
              { value: 'all', label: 'All' },
              { value: 'in_stock', label: 'In Stock' },
              { value: 'low_stock', label: 'Low Stock' },
              { value: 'out_of_stock', label: 'Out of Stock' },
              { value: 'expiring_soon', label: 'Expiring Soon' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  filter === option.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search drugs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Drug Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrugs.map((drug, index) => (
          <motion.div
            key={drug.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{drug.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{drug.activeIngredient}</p>
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {drug.category}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {getStatusIcon(drug.status)}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Batch:</span>
                <span className="text-gray-900 font-mono">{drug.batchNumber}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Quantity:</span>
                <span className={`font-medium ${
                  parseInt(drug.quantity) === 0 ? 'text-red-600' : 
                  parseInt(drug.quantity) <= parseInt(drug.lowStockThreshold) ? 'text-yellow-600' : 
                  'text-green-600'
                }`}>
                  {drug.quantity} {drug.unit}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Expiry:</span>
                <span className={`${
                  isExpired(drug.expiryDate) ? 'text-red-600 font-medium' :
                  isExpiringSoon(drug.expiryDate) ? 'text-orange-600 font-medium' :
                  'text-gray-900'
                }`}>
                  {new Date(drug.expiryDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Withdrawal:</span>
                <span className="text-gray-900">
                  M:{drug.withdrawalPeriodMeat}d / K:{drug.withdrawalPeriodMilk}d
                </span>
              </div>
            </div>

            {/* Alerts */}
            {isExpired(drug.expiryDate) && (
              <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <XCircleIcon className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-800 font-medium">EXPIRED</span>
                </div>
              </div>
            )}

            {isExpiringSoon(drug.expiryDate) && !isExpired(drug.expiryDate) && (
              <div className="mb-4 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-800">
                    Expires in {getDaysUntilExpiry(drug.expiryDate)} days
                  </span>
                </div>
              </div>
            )}

            {drug.status === 'low_stock' && (
              <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">Low stock - reorder soon</span>
                </div>
              </div>
            )}

            {drug.status === 'out_of_stock' && (
              <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <XCircleIcon className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-800 font-medium">OUT OF STOCK</span>
                </div>
              </div>
            )}

            <div className="space-y-2 mb-4">
              <div className="text-sm">
                <span className="text-gray-600">Purpose:</span>
                <p className="text-gray-900 mt-1">{drug.purpose}</p>
              </div>
              
              <div className="text-sm">
                <span className="text-gray-600">Storage:</span>
                <p className="text-gray-900 mt-1">{drug.storageConditions}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <div>Added: {new Date(drug.addedDate).toLocaleDateString()}</div>
                {drug.lastUsed && (
                  <div>Last used: {new Date(drug.lastUsed).toLocaleDateString()}</div>
                )}
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

      {/* Add Drug Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New Drug</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddDrug} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drug Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newDrug.name}
                    onChange={(e) => setNewDrug({...newDrug, name: e.target.value})}
                    placeholder="e.g., Amoxicillin Injectable"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Active Ingredient *
                  </label>
                  <input
                    type="text"
                    required
                    value={newDrug.activeIngredient}
                    onChange={(e) => setNewDrug({...newDrug, activeIngredient: e.target.value})}
                    placeholder="e.g., Amoxicillin Trihydrate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={newDrug.category}
                    onChange={(e) => setNewDrug({...newDrug, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="antibiotic">Antibiotic</option>
                    <option value="antiparasitic">Antiparasitic</option>
                    <option value="anti_inflammatory">Anti-inflammatory</option>
                    <option value="vaccine">Vaccine</option>
                    <option value="supplement">Supplement</option>
                    <option value="vitamin">Vitamin</option>
                    <option value="hormone">Hormone</option>
                    <option value="anesthetic">Anesthetic</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batch Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newDrug.batchNumber}
                    onChange={(e) => setNewDrug({...newDrug, batchNumber: e.target.value})}
                    placeholder="e.g., AMX2024-081"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manufacturer *
                  </label>
                  <input
                    type="text"
                    required
                    value={newDrug.manufacturer}
                    onChange={(e) => setNewDrug({...newDrug, manufacturer: e.target.value})}
                    placeholder="e.g., VetPharma Ltd"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newDrug.expiryDate}
                    onChange={(e) => setNewDrug({...newDrug, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={newDrug.quantity}
                    onChange={(e) => setNewDrug({...newDrug, quantity: e.target.value})}
                    placeholder="250"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit *
                  </label>
                  <select
                    value={newDrug.unit}
                    onChange={(e) => setNewDrug({...newDrug, unit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="ml">ml</option>
                    <option value="mg">mg</option>
                    <option value="g">g</option>
                    <option value="tablets">tablets</option>
                    <option value="doses">doses</option>
                    <option value="vials">vials</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prescription
                  </label>
                  <select
                    value={newDrug.prescription}
                    onChange={(e) => setNewDrug({...newDrug, prescription: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="required">Prescription Required</option>
                    <option value="otc">Over the Counter</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Withdrawal Period - Meat (days) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newDrug.withdrawalPeriodMeat}
                    onChange={(e) => setNewDrug({...newDrug, withdrawalPeriodMeat: e.target.value})}
                    placeholder="14"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Withdrawal Period - Milk (days) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newDrug.withdrawalPeriodMilk}
                    onChange={(e) => setNewDrug({...newDrug, withdrawalPeriodMilk: e.target.value})}
                    placeholder="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Storage Conditions *
                </label>
                <input
                  type="text"
                  required
                  value={newDrug.storageConditions}
                  onChange={(e) => setNewDrug({...newDrug, storageConditions: e.target.value})}
                  placeholder="e.g., Store at 2-8°C, protect from light"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose/Indications *
                </label>
                <textarea
                  required
                  value={newDrug.purpose}
                  onChange={(e) => setNewDrug({...newDrug, purpose: e.target.value})}
                  placeholder="e.g., Treatment of bacterial infections, mastitis in dairy cows"
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosage Instructions *
                </label>
                <textarea
                  required
                  value={newDrug.dosageInstructions}
                  onChange={(e) => setNewDrug({...newDrug, dosageInstructions: e.target.value})}
                  placeholder="e.g., 1ml per 10kg body weight, intramuscular injection"
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Drug
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default DrugInventory
