import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import QRCode from 'react-qr-code'
import {
  TagIcon,
  HeartIcon,
  TruckIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  CameraIcon,
  DocumentArrowDownIcon,
  ShareIcon,
  QrCodeIcon,
  PrinterIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useFarmStore } from '../../store/farmStore'

const AnimalProfile = () => {
  const { animals } = useFarmStore()
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [showQR, setShowQR] = useState(false)
  const printRef = useRef()

  // Mock detailed animal data
  const mockAnimalDetails = {
    id: '1',
    tagId: 'C001',
    species: 'cattle',
    breed: 'Holstein Friesian',
    dateOfBirth: '2021-03-15',
    gender: 'female',
    weight: '450',
    farmId: '1',
    farmName: 'Green Valley Farm',
    farmLocation: 'Punjab, India',
    owner: 'Rajesh Kumar',
    healthStatus: 'healthy',
    pregnancyStatus: 'pregnant',
    expectedCalving: '2024-12-15',
    lastCheckup: '2024-08-15',
    vaccinations: [
      { name: 'FMD', date: '2024-06-15', nextDue: '2024-12-15', status: 'current' },
      { name: 'Anthrax', date: '2024-05-20', nextDue: '2025-05-20', status: 'current' },
      { name: 'BQ', date: '2024-04-10', nextDue: '2024-10-10', status: 'due_soon' }
    ],
    treatments: [
      {
        id: '1',
        date: '2024-08-15',
        drug: 'Amoxicillin',
        dosage: '20ml',
        reason: 'Mastitis treatment',
        veterinarian: 'Dr. Priya Sharma',
        withdrawalPeriod: '7 days',
        status: 'completed'
      },
      {
        id: '2',
        date: '2024-07-20',
        drug: 'Ivermectin',
        dosage: '5ml',
        reason: 'Deworming',
        veterinarian: 'Dr. Priya Sharma',
        withdrawalPeriod: '14 days',
        status: 'completed'
      }
    ],
    milkProduction: [
      { date: '2024-09-01', amount: 18.5 },
      { date: '2024-09-02', amount: 19.2 },
      { date: '2024-09-03', amount: 17.8 },
      { date: '2024-09-04', amount: 18.9 },
      { date: '2024-09-05', amount: 19.5 }
    ],
    weightHistory: [
      { date: '2024-06-01', weight: 430 },
      { date: '2024-07-01', weight: 440 },
      { date: '2024-08-01', weight: 445 },
      { date: '2024-09-01', weight: 450 }
    ],
    offspring: [
      { id: 'C015', birthDate: '2023-05-20', status: 'healthy' },
      { id: 'C022', birthDate: '2022-07-10', status: 'sold' }
    ],
    certifications: [
      { name: 'Organic Certified', issueDate: '2024-01-15', expiryDate: '2025-01-15' },
      { name: 'Disease Free', issueDate: '2024-08-15', expiryDate: '2024-11-15' }
    ]
  }

  const animal = selectedAnimal || mockAnimalDetails

  const generateQRData = () => {
    return JSON.stringify({
      animalId: animal.tagId,
      farm: animal.farmName,
      species: animal.species,
      breed: animal.breed,
      owner: animal.owner,
      lastCheckup: animal.lastCheckup,
      healthStatus: animal.healthStatus,
      verificationUrl: `https://farm-portal.gov.in/verify/${animal.tagId}`
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100'
      case 'under_treatment': return 'text-yellow-600 bg-yellow-100'
      case 'sick': return 'text-red-600 bg-red-100'
      case 'quarantine': return 'text-purple-600 bg-purple-100'
      case 'current': return 'text-green-600 bg-green-100'
      case 'due_soon': return 'text-yellow-600 bg-yellow-100'
      case 'overdue': return 'text-red-600 bg-red-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
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
      return `${years} years ${months} months`
    } else {
      return `${months} months`
    }
  }

  const isWithdrawalPeriodActive = () => {
    const lastTreatment = animal.treatments[0]
    if (!lastTreatment) return false
    
    const treatmentDate = new Date(lastTreatment.date)
    const withdrawalDays = parseInt(lastTreatment.withdrawalPeriod)
    const withdrawalEnd = new Date(treatmentDate.getTime() + (withdrawalDays * 24 * 60 * 60 * 1000))
    
    return new Date() < withdrawalEnd
  }

  const getDaysUntilWithdrawalEnd = () => {
    const lastTreatment = animal.treatments[0]
    if (!lastTreatment) return 0
    
    const treatmentDate = new Date(lastTreatment.date)
    const withdrawalDays = parseInt(lastTreatment.withdrawalPeriod)
    const withdrawalEnd = new Date(treatmentDate.getTime() + (withdrawalDays * 24 * 60 * 60 * 1000))
    
    const diffTime = withdrawalEnd - new Date()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Animal Profile</h1>
          <p className="text-gray-600">Comprehensive animal health and history records</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowQR(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <QrCodeIcon className="h-5 w-5" />
            <span>QR Code</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <PrinterIcon className="h-5 w-5" />
            <span>Print</span>
          </button>
          
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <ShareIcon className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Animal Basic Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <TagIcon className="h-10 w-10 text-gray-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{animal.tagId}</h2>
              <p className="text-lg text-gray-600">{animal.breed}</p>
              <p className="text-sm text-gray-500">{animal.farmName}, {animal.farmLocation}</p>
            </div>
          </div>
          
          <div className="text-right">
            <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(animal.healthStatus)}`}>
              {animal.healthStatus.replace('_', ' ').toUpperCase()}
            </span>
            <p className="text-sm text-gray-500 mt-2">Owner: {animal.owner}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <CalendarDaysIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900">{getAge(animal.dateOfBirth)}</div>
            <div className="text-sm text-gray-600">Age</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <HeartIcon className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900">{animal.weight}kg</div>
            <div className="text-sm text-gray-600">Weight</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <TruckIcon className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900">{animal.treatments.length}</div>
            <div className="text-sm text-gray-600">Treatments</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <ShieldCheckIcon className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900">{animal.vaccinations.length}</div>
            <div className="text-sm text-gray-600">Vaccinations</div>
          </div>
        </div>

        {/* Withdrawal Period Alert */}
        {isWithdrawalPeriodActive() && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Active Withdrawal Period</h3>
                <p className="text-sm text-red-700">
                  {getDaysUntilWithdrawalEnd()} days remaining. Products from this animal cannot be used for human consumption.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pregnancy Status */}
        {animal.pregnancyStatus === 'pregnant' && (
          <div className="mt-4 p-4 bg-pink-50 border border-pink-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <HeartIcon className="h-5 w-5 text-pink-600" />
              <div>
                <h3 className="text-sm font-medium text-pink-800">Pregnancy Status</h3>
                <p className="text-sm text-pink-700">
                  Expected calving date: {new Date(animal.expectedCalving).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview' },
            { id: 'health', name: 'Health Records' },
            { id: 'treatments', name: 'Treatments' },
            { id: 'production', name: 'Production' },
            { id: 'lineage', name: 'Lineage' },
            { id: 'documents', name: 'Documents' }
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

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Species:</span>
                    <span className="text-gray-900 capitalize">{animal.species}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Breed:</span>
                    <span className="text-gray-900">{animal.breed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="text-gray-900 capitalize">{animal.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date of Birth:</span>
                    <span className="text-gray-900">{new Date(animal.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Weight:</span>
                    <span className="text-gray-900">{animal.weight}kg</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Farm Name:</span>
                    <span className="text-gray-900">{animal.farmName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="text-gray-900">{animal.farmLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Owner:</span>
                    <span className="text-gray-900">{animal.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Checkup:</span>
                    <span className="text-gray-900">{new Date(animal.lastCheckup).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Vaccination Records</h3>
            <div className="space-y-4">
              {animal.vaccinations.map((vaccination, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{vaccination.name}</h4>
                    <p className="text-sm text-gray-600">
                      Given: {new Date(vaccination.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vaccination.status)}`}>
                      {vaccination.status.replace('_', ' ')}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Next due: {new Date(vaccination.nextDue).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'treatments' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Treatment History</h3>
            <div className="space-y-4">
              {animal.treatments.map((treatment) => (
                <div key={treatment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{treatment.drug}</h4>
                      <p className="text-sm text-gray-600">{treatment.reason}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(treatment.status)}`}>
                      {treatment.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <span className="ml-2 text-gray-900">{new Date(treatment.date).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Dosage:</span>
                      <span className="ml-2 text-gray-900">{treatment.dosage}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Veterinarian:</span>
                      <span className="ml-2 text-gray-900">{treatment.veterinarian}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-yellow-50 rounded">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        Withdrawal Period: {treatment.withdrawalPeriod}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'production' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Milk Production (Last 5 Days)</h3>
            <div className="space-y-3">
              {animal.milkProduction.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{new Date(record.date).toLocaleDateString()}</span>
                  <span className="font-medium text-gray-900">{record.amount} liters</span>
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-8">Weight History</h3>
            <div className="space-y-3">
              {animal.weightHistory.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{new Date(record.date).toLocaleDateString()}</span>
                  <span className="font-medium text-gray-900">{record.weight} kg</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'lineage' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Offspring</h3>
            <div className="space-y-3">
              {animal.offspring.map((offspring, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{offspring.id}</h4>
                    <p className="text-sm text-gray-600">
                      Born: {new Date(offspring.birthDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(offspring.status)}`}>
                    {offspring.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
            <div className="space-y-4">
              {animal.certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{cert.name}</h4>
                    <p className="text-sm text-gray-600">
                      Issued: {new Date(cert.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                    </p>
                    <button className="mt-1 text-blue-600 hover:text-blue-800 text-sm">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Animal QR Code</h2>
              <div className="flex justify-center mb-4">
                <QRCode value={generateQRData()} size={200} />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Scan this QR code to access animal verification and traceability information
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowQR(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Print QR
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AnimalProfile
