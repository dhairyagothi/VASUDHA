import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PlusIcon,
  BeakerIcon,
  TruckIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  TagIcon,
  UserIcon,
  DocumentTextIcon,
  CameraIcon
} from '@heroicons/react/24/outline'

const SampleCollection = () => {
  const [activeTab, setActiveTab] = useState('pending')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedSample, setSelectedSample] = useState(null)

  // Mock sample data
  const mockSamples = [
    {
      id: 'SMP001',
      animalId: 'C001',
      animalTag: 'C001',
      farmName: 'Green Valley Farm',
      farmLocation: 'Punjab, India',
      sampleType: 'milk',
      testType: 'Antibiotic Residue',
      collectionDate: '2024-09-02',
      collectionTime: '09:30',
      collectedBy: 'Lab Technician - Amit Kumar',
      status: 'pending_collection',
      priority: 'high',
      reason: 'Post-treatment monitoring',
      containerType: 'Sterile milk container',
      storageConditions: 'Refrigerated (2-8°C)',
      labAssigned: 'Central Veterinary Lab',
      expectedResults: '2024-09-05',
      instructions: 'Collect from all quarters separately. Label clearly.',
      notes: 'Animal completed antibiotic treatment 3 days ago.',
      requestedBy: 'Dr. Priya Sharma',
      qrCode: 'QR-SMP001-2024',
      chainOfCustody: [
        {
          person: 'Dr. Priya Sharma',
          action: 'Sample Requested',
          timestamp: '2024-09-01 14:30',
          location: 'Green Valley Farm'
        }
      ]
    },
    {
      id: 'SMP002',
      animalId: 'G001',
      animalTag: 'G001',
      farmName: 'Sunshine Dairy',
      farmLocation: 'Haryana, India',
      sampleType: 'blood',
      testType: 'Disease Screening',
      collectionDate: '2024-09-01',
      collectionTime: '11:15',
      collectedBy: 'Lab Technician - Priya Singh',
      status: 'collected',
      priority: 'medium',
      reason: 'Routine health checkup',
      containerType: 'EDTA blood tube',
      storageConditions: 'Refrigerated (2-8°C)',
      labAssigned: 'Regional Animal Health Lab',
      expectedResults: '2024-09-04',
      instructions: 'Collect 5ml blood from jugular vein. Invert tube gently.',
      notes: 'Fasting sample required.',
      requestedBy: 'Dr. Rajesh Kumar',
      qrCode: 'QR-SMP002-2024',
      chainOfCustody: [
        {
          person: 'Dr. Rajesh Kumar',
          action: 'Sample Requested',
          timestamp: '2024-08-30 16:00',
          location: 'Sunshine Dairy'
        },
        {
          person: 'Priya Singh',
          action: 'Sample Collected',
          timestamp: '2024-09-01 11:15',
          location: 'Sunshine Dairy'
        },
        {
          person: 'Transport Team',
          action: 'In Transit to Lab',
          timestamp: '2024-09-01 14:30',
          location: 'En route'
        }
      ]
    },
    {
      id: 'SMP003',
      animalId: 'C002',
      animalTag: 'C002',
      farmName: 'Green Valley Farm',
      farmLocation: 'Punjab, India',
      sampleType: 'urine',
      testType: 'Drug Metabolite Detection',
      collectionDate: '2024-08-30',
      collectionTime: '08:45',
      collectedBy: 'Lab Technician - Ravi Mehta',
      status: 'in_lab',
      priority: 'high',
      reason: 'Compliance verification',
      containerType: 'Sterile urine container',
      storageConditions: 'Frozen (-20°C)',
      labAssigned: 'Central Veterinary Lab',
      expectedResults: '2024-09-03',
      instructions: 'Collect mid-stream urine. Minimum 50ml required.',
      notes: 'Suspected drug residue violation.',
      requestedBy: 'Regulatory Inspector',
      qrCode: 'QR-SMP003-2024',
      chainOfCustody: [
        {
          person: 'Regulatory Inspector',
          action: 'Sample Requested',
          timestamp: '2024-08-29 10:00',
          location: 'Green Valley Farm'
        },
        {
          person: 'Ravi Mehta',
          action: 'Sample Collected',
          timestamp: '2024-08-30 08:45',
          location: 'Green Valley Farm'
        },
        {
          person: 'Transport Team',
          action: 'Delivered to Lab',
          timestamp: '2024-08-30 16:20',
          location: 'Central Veterinary Lab'
        },
        {
          person: 'Lab Technician',
          action: 'Sample Received',
          timestamp: '2024-08-30 16:30',
          location: 'Central Veterinary Lab'
        }
      ]
    },
    {
      id: 'SMP004',
      animalId: 'C003',
      animalTag: 'C003',
      farmName: 'Dairy Plus Farm',
      farmLocation: 'Rajasthan, India',
      sampleType: 'tissue',
      testType: 'Pathology Examination',
      collectionDate: '2024-08-28',
      collectionTime: '10:20',
      collectedBy: 'Veterinary Pathologist - Dr. Meera Jain',
      status: 'completed',
      priority: 'high',
      reason: 'Post-mortem examination',
      containerType: 'Formalin-fixed container',
      storageConditions: 'Room temperature',
      labAssigned: 'Pathology Division',
      expectedResults: '2024-09-02',
      results: 'Chronic inflammatory lesions detected. No evidence of infectious disease.',
      instructions: 'Collect liver, kidney, and lung samples. Fix in 10% formalin.',
      notes: 'Animal died suddenly. Cause investigation required.',
      requestedBy: 'Dr. Suresh Patel',
      qrCode: 'QR-SMP004-2024',
      chainOfCustody: [
        {
          person: 'Dr. Suresh Patel',
          action: 'Sample Requested',
          timestamp: '2024-08-28 08:00',
          location: 'Dairy Plus Farm'
        },
        {
          person: 'Dr. Meera Jain',
          action: 'Sample Collected',
          timestamp: '2024-08-28 10:20',
          location: 'Dairy Plus Farm'
        },
        {
          person: 'Pathology Lab',
          action: 'Results Completed',
          timestamp: '2024-09-02 15:45',
          location: 'Pathology Division'
        }
      ]
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_collection': return 'bg-yellow-100 text-yellow-800'
      case 'collected': return 'bg-blue-100 text-blue-800'
      case 'in_transit': return 'bg-purple-100 text-purple-800'
      case 'in_lab': return 'bg-orange-100 text-orange-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending_collection': return <ClockIcon className="h-5 w-5 text-yellow-600" />
      case 'collected': return <CheckCircleIcon className="h-5 w-5 text-blue-600" />
      case 'in_transit': return <TruckIcon className="h-5 w-5 text-purple-600" />
      case 'in_lab': return <BeakerIcon className="h-5 w-5 text-orange-600" />
      case 'completed': return <CheckCircleIcon className="h-5 w-5 text-green-600" />
      default: return <TagIcon className="h-5 w-5 text-gray-600" />
    }
  }

  const filteredSamples = mockSamples.filter(sample => {
    if (activeTab === 'pending') return ['pending_collection', 'collected', 'in_transit', 'in_lab'].includes(sample.status)
    if (activeTab === 'completed') return sample.status === 'completed'
    if (activeTab === 'high_priority') return sample.priority === 'high'
    return true
  })

  const getStats = () => {
    const total = mockSamples.length
    const pending = mockSamples.filter(s => ['pending_collection', 'collected', 'in_transit', 'in_lab'].includes(s.status)).length
    const completed = mockSamples.filter(s => s.status === 'completed').length
    const highPriority = mockSamples.filter(s => s.priority === 'high').length
    
    return { total, pending, completed, highPriority }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sample Collection</h1>
          <p className="text-gray-600">Manage sample collection requests and tracking</p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Sample Request</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <BeakerIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Samples</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
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
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.highPriority}</div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'pending', name: 'Pending Samples' },
            { id: 'completed', name: 'Completed' },
            { id: 'high_priority', name: 'High Priority' }
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

      {/* Sample List */}
      <div className="space-y-4">
        {filteredSamples.map((sample, index) => (
          <motion.div
            key={sample.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(sample.status)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{sample.id}</h3>
                    <p className="text-sm text-gray-600">
                      {sample.animalTag} • {sample.farmName}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(sample.priority)}`}>
                  {sample.priority.toUpperCase()}
                </span>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(sample.status)}`}>
                  {sample.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Sample Type</h4>
                <p className="text-sm text-gray-600 capitalize">{sample.sampleType}</p>
                <p className="text-xs text-gray-500">{sample.testType}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Collection</h4>
                <p className="text-sm text-gray-600">
                  {new Date(sample.collectionDate).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">{sample.collectionTime}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Lab Assignment</h4>
                <p className="text-sm text-gray-600">{sample.labAssigned}</p>
                <p className="text-xs text-gray-500">
                  Expected: {new Date(sample.expectedResults).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Collected By</h4>
                <p className="text-sm text-gray-600">{sample.collectedBy}</p>
                <p className="text-xs text-gray-500">QR: {sample.qrCode}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Purpose</h4>
                <p className="text-sm text-gray-600">{sample.reason}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Storage</h4>
                <p className="text-sm text-gray-600">{sample.storageConditions}</p>
              </div>
            </div>

            {sample.status === 'completed' && sample.results && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Test Results</h4>
                <p className="text-sm text-green-800">{sample.results}</p>
              </div>
            )}

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Chain of Custody</h4>
              <div className="space-y-2">
                {sample.chainOfCustody.map((custody, custodyIndex) => (
                  <div key={custodyIndex} className="flex items-center justify-between text-sm bg-gray-50 rounded p-2">
                    <div>
                      <span className="font-medium text-gray-900">{custody.person}</span>
                      <span className="text-gray-600 ml-2">- {custody.action}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {custody.timestamp} • {custody.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Requested by: {sample.requestedBy}
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedSample(sample)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details
                </button>
                <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                  Update Status
                </button>
                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                  Print Label
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Sample Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Create Sample Request</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    Sample Type *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Select Sample Type</option>
                    <option value="milk">Milk</option>
                    <option value="blood">Blood</option>
                    <option value="urine">Urine</option>
                    <option value="tissue">Tissue</option>
                    <option value="feed">Feed</option>
                    <option value="water">Water</option>
                    <option value="feces">Feces</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Type *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Select Test Type</option>
                    <option value="antibiotic_residue">Antibiotic Residue</option>
                    <option value="disease_screening">Disease Screening</option>
                    <option value="drug_metabolite">Drug Metabolite Detection</option>
                    <option value="pathology">Pathology Examination</option>
                    <option value="microbiology">Microbiology</option>
                    <option value="toxicology">Toxicology</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collection Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collection Time *
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Lab *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Select Lab</option>
                    <option value="central_vet_lab">Central Veterinary Lab</option>
                    <option value="regional_animal_health">Regional Animal Health Lab</option>
                    <option value="pathology_division">Pathology Division</option>
                    <option value="microbiology_lab">Microbiology Lab</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collector *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Select Collector</option>
                    <option value="amit_kumar">Amit Kumar - Lab Technician</option>
                    <option value="priya_singh">Priya Singh - Lab Technician</option>
                    <option value="ravi_mehta">Ravi Mehta - Lab Technician</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Testing *
                </label>
                <textarea
                  required
                  placeholder="e.g., Post-treatment monitoring, routine screening, compliance verification..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collection Instructions
                  </label>
                  <textarea
                    placeholder="Special instructions for sample collection..."
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    placeholder="Additional notes or observations..."
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
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
                Create Request
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default SampleCollection
