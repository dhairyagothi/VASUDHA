import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PlusIcon,
  UserIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BeakerIcon,
  TagIcon,
  PrinterIcon,
  ShareIcon
} from '@heroicons/react/24/outline'

const PrescriptionManagement = () => {
  const [activeTab, setActiveTab] = useState('prescriptions')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedPrescription, setSelectedPrescription] = useState(null)

  // Mock prescription data
  const mockPrescriptions = [
    {
      id: 'PRX001',
      animalId: 'C001',
      animalTag: 'C001',
      farmName: 'Green Valley Farm',
      veterinarian: 'Dr. Priya Sharma',
      vetLicense: 'VET-2024-001',
      issueDate: '2024-09-01',
      status: 'active',
      diagnosis: 'Mastitis - Left Hind Quarter',
      symptoms: 'Swelling, heat, abnormal milk secretion',
      drugs: [
        {
          drugName: 'Amoxicillin Injectable',
          activeIngredient: 'Amoxicillin Trihydrate',
          dosage: '20ml',
          frequency: 'Once daily',
          duration: '5 days',
          route: 'Intramuscular',
          withdrawalPeriodMeat: '14 days',
          withdrawalPeriodMilk: '4 days'
        }
      ],
      instructions: 'Administer via intramuscular injection. Monitor for allergic reactions. Complete full course.',
      followUpDate: '2024-09-06',
      notes: 'Re-examine after 5 days. If no improvement, culture milk sample.'
    },
    {
      id: 'PRX002',
      animalId: 'G001',
      animalTag: 'G001',
      farmName: 'Sunshine Dairy',
      veterinarian: 'Dr. Rajesh Kumar',
      vetLicense: 'VET-2024-002',
      issueDate: '2024-08-28',
      status: 'completed',
      diagnosis: 'Internal Parasites',
      symptoms: 'Weight loss, diarrhea, poor coat condition',
      drugs: [
        {
          drugName: 'Ivermectin Pour-On',
          activeIngredient: 'Ivermectin',
          dosage: '5ml',
          frequency: 'Single dose',
          duration: '1 day',
          route: 'Topical',
          withdrawalPeriodMeat: '35 days',
          withdrawalPeriodMilk: '28 days'
        }
      ],
      instructions: 'Apply along the backline from neck to tail. Ensure even distribution.',
      followUpDate: '2024-09-11',
      notes: 'Repeat treatment after 14 days if necessary. Monitor weight gain.'
    },
    {
      id: 'PRX003',
      animalId: 'C002',
      animalTag: 'C002',
      farmName: 'Green Valley Farm',
      veterinarian: 'Dr. Priya Sharma',
      vetLicense: 'VET-2024-001',
      issueDate: '2024-08-25',
      status: 'pending',
      diagnosis: 'Calcium Deficiency (Milk Fever)',
      symptoms: 'Weakness, muscle tremors, unable to stand',
      drugs: [
        {
          drugName: 'Calcium Borogluconate',
          activeIngredient: 'Calcium Borogluconate',
          dosage: '100ml',
          frequency: 'Single dose, repeat if necessary',
          duration: '1-2 days',
          route: 'Subcutaneous',
          withdrawalPeriodMeat: '0 days',
          withdrawalPeriodMilk: '0 days'
        }
      ],
      instructions: 'Administer slowly. Monitor heart rate during injection. Provide supportive care.',
      followUpDate: '2024-08-26',
      notes: 'Emergency treatment. Monitor closely for 24 hours.'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <ClockIcon className="h-5 w-5 text-blue-600" />
      case 'completed': return <CheckCircleIcon className="h-5 w-5 text-green-600" />
      case 'pending': return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
      default: return <DocumentTextIcon className="h-5 w-5 text-gray-600" />
    }
  }

  const getStats = () => {
    const total = mockPrescriptions.length
    const active = mockPrescriptions.filter(p => p.status === 'active').length
    const completed = mockPrescriptions.filter(p => p.status === 'completed').length
    const pending = mockPrescriptions.filter(p => p.status === 'pending').length
    
    return { total, active, completed, pending }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescription Management</h1>
          <p className="text-gray-600">Manage veterinary prescriptions and treatment records</p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Prescription</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Prescriptions</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'prescriptions', name: 'All Prescriptions' },
            { id: 'templates', name: 'Templates' },
            { id: 'reports', name: 'Reports' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Prescription List */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          {mockPrescriptions.map((prescription, index) => (
            <motion.div
              key={prescription.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(prescription.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{prescription.id}</h3>
                      <p className="text-sm text-gray-600">
                        Animal: {prescription.animalTag} • {prescription.farmName}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(prescription.status)}`}>
                    {prescription.status.toUpperCase()}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <PrinterIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                      <ShareIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Veterinarian</h4>
                  <p className="text-sm text-gray-600">{prescription.veterinarian}</p>
                  <p className="text-xs text-gray-500">License: {prescription.vetLicense}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Issue Date</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(prescription.issueDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Follow-up Date</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(prescription.followUpDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
                <p className="text-sm text-gray-700 mb-2">{prescription.diagnosis}</p>
                <p className="text-sm text-gray-600">Symptoms: {prescription.symptoms}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Prescribed Medications</h4>
                {prescription.drugs.map((drug, drugIndex) => (
                  <div key={drugIndex} className="bg-gray-50 rounded-lg p-4 mb-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-900">{drug.drugName}</h5>
                        <p className="text-sm text-gray-600">{drug.activeIngredient}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm"><span className="font-medium">Dosage:</span> {drug.dosage}</p>
                        <p className="text-sm"><span className="font-medium">Route:</span> {drug.route}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm"><span className="font-medium">Frequency:</span> {drug.frequency}</p>
                        <p className="text-sm"><span className="font-medium">Duration:</span> {drug.duration}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm"><span className="font-medium">Withdrawal:</span></p>
                        <p className="text-xs text-red-600">Meat: {drug.withdrawalPeriodMeat}</p>
                        <p className="text-xs text-red-600">Milk: {drug.withdrawalPeriodMilk}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
                  <p className="text-sm text-gray-700">{prescription.instructions}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-700">{prescription.notes}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Created: {new Date(prescription.issueDate).toLocaleDateString()}
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedPrescription(prescription)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
                  </button>
                  <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                    Edit
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                    Duplicate
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <BeakerIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Prescription Templates</h3>
          <p className="text-gray-600 mb-4">
            Create and manage prescription templates for common treatments to save time.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Create Template
          </button>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Prescription Reports</h3>
          <p className="text-gray-600 mb-4">
            Generate detailed reports on prescription patterns, drug usage, and compliance.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Generate Report
          </button>
        </div>
      )}

      {/* Create Prescription Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Create New Prescription</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Animal Tag ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., C001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Veterinarian *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Select Veterinarian</option>
                    <option value="dr-priya">Dr. Priya Sharma</option>
                    <option value="dr-rajesh">Dr. Rajesh Kumar</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diagnosis *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Mastitis - Left Hind Quarter"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms
                </label>
                <textarea
                  placeholder="Describe observed symptoms..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Prescribed Medications</h3>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Drug Name *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option value="">Select Drug</option>
                        <option value="amoxicillin">Amoxicillin Injectable</option>
                        <option value="ivermectin">Ivermectin Pour-On</option>
                        <option value="calcium">Calcium Borogluconate</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dosage *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 20ml"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Frequency *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Once daily"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 5 days"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Route *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option value="">Select Route</option>
                        <option value="intramuscular">Intramuscular</option>
                        <option value="subcutaneous">Subcutaneous</option>
                        <option value="oral">Oral</option>
                        <option value="topical">Topical</option>
                        <option value="intravenous">Intravenous</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 text-sm text-green-600 hover:text-green-800 font-medium">
                  + Add Another Medication
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructions
                  </label>
                  <textarea
                    placeholder="Administration instructions..."
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    placeholder="Additional notes..."
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Create Prescription
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default PrescriptionManagement
