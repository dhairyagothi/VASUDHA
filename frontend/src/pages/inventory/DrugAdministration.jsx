import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  QrCodeIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  CameraIcon
} from '@heroicons/react/24/outline'
import QRCode from 'react-qr-code'
import { useInventoryStore } from '../../store/inventoryStore'
import { useFarmStore } from '../../store/farmStore'
import toast from 'react-hot-toast'

const DrugAdministration = () => {
  const { addAdministration, drugs, inventory } = useInventoryStore()
  const { animals } = useFarmStore()
  
  const [administrationForm, setAdministrationForm] = useState({
    animalId: '',
    drugId: '',
    batchNumber: '',
    dose: '',
    route: 'oral',
    purpose: 'therapeutic',
    veterinarianId: '',
    notes: ''
  })

  const [showQRScanner, setShowQRScanner] = useState(false)
  const [scannedData, setScannedData] = useState(null)
  const [withdrawalCalculation, setWithdrawalCalculation] = useState(null)

  // Mock data
  const mockDrugs = drugs.length > 0 ? drugs : [
    {
      id: '1',
      name: 'Amoxicillin',
      activeIngredient: 'Amoxicillin',
      concentration: '250mg/ml',
      withdrawalPeriod: 7,
      mrlLimit: '50 μg/kg',
      manufacturer: 'VetPharma Ltd'
    },
    {
      id: '2',
      name: 'Oxytetracycline',
      activeIngredient: 'Oxytetracycline',
      concentration: '200mg/ml',
      withdrawalPeriod: 10,
      mrlLimit: '100 μg/kg',
      manufacturer: 'AnimalHealth Co'
    },
    {
      id: '3',
      name: 'Penicillin G',
      activeIngredient: 'Benzylpenicillin',
      concentration: '300mg/ml',
      withdrawalPeriod: 14,
      mrlLimit: '4 μg/kg',
      manufacturer: 'LivestockMeds Inc'
    }
  ]

  const mockAnimals = animals.length > 0 ? animals : [
    { id: '1', tagId: 'C001', species: 'Cattle', breed: 'Holstein', age: '3 years' },
    { id: '2', tagId: 'C002', species: 'Cattle', breed: 'Jersey', age: '2 years' },
    { id: '3', tagId: 'G001', species: 'Goat', breed: 'Boer', age: '1.5 years' }
  ]

  const recentAdministrations = [
    {
      id: 1,
      animalTag: 'C001',
      drugName: 'Amoxicillin',
      dose: '5 ml',
      administeredAt: '2024-09-10 14:30',
      withdrawalEnd: '2024-09-17',
      status: 'active',
      veterinarian: 'Dr. Priya Sharma'
    },
    {
      id: 2,
      animalTag: 'C002',
      drugName: 'Oxytetracycline',
      dose: '10 ml',
      administeredAt: '2024-09-08 09:15',
      withdrawalEnd: '2024-09-18',
      status: 'ending-soon',
      veterinarian: 'Dr. Priya Sharma'
    }
  ]

  const handleFormChange = (field, value) => {
    setAdministrationForm(prev => ({
      ...prev,
      [field]: value
    }))

    // Calculate withdrawal period when drug is selected
    if (field === 'drugId') {
      const selectedDrug = mockDrugs.find(d => d.id === value)
      if (selectedDrug) {
        const withdrawalEndDate = new Date()
        withdrawalEndDate.setDate(withdrawalEndDate.getDate() + selectedDrug.withdrawalPeriod)
        
        setWithdrawalCalculation({
          drug: selectedDrug.name,
          withdrawalPeriod: selectedDrug.withdrawalPeriod,
          withdrawalEndDate: withdrawalEndDate.toLocaleDateString(),
          mrlLimit: selectedDrug.mrlLimit
        })
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const selectedDrug = mockDrugs.find(d => d.id === administrationForm.drugId)
    const selectedAnimal = mockAnimals.find(a => a.id === administrationForm.animalId)
    
    if (!selectedDrug || !selectedAnimal) {
      toast.error('Please select valid drug and animal')
      return
    }

    const withdrawalEndDate = new Date()
    withdrawalEndDate.setDate(withdrawalEndDate.getDate() + selectedDrug.withdrawalPeriod)

    const administration = {
      ...administrationForm,
      drugName: selectedDrug.name,
      animalTag: selectedAnimal.tagId,
      withdrawalEndDate: withdrawalEndDate.toISOString(),
      timestamp: new Date().toISOString()
    }

    addAdministration(administration)
    
    // Generate QR code for this administration
    const qrData = {
      type: 'drug_administration',
      id: Date.now().toString(),
      drugName: selectedDrug.name,
      animalTag: selectedAnimal.tagId,
      withdrawalEnd: withdrawalEndDate.toISOString(),
      farmId: 'FARM_001'
    }
    
    setScannedData(JSON.stringify(qrData))
    toast.success('Drug administration recorded successfully!')
    
    // Reset form
    setAdministrationForm({
      animalId: '',
      drugId: '',
      batchNumber: '',
      dose: '',
      route: 'oral',
      purpose: 'therapeutic',
      veterinarianId: '',
      notes: ''
    })
    setWithdrawalCalculation(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'ending-soon': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const simulateQRScan = () => {
    const mockQRData = {
      type: 'drug_batch',
      drugId: '1',
      batchNumber: 'AMX-2024-001',
      drugName: 'Amoxicillin',
      expiryDate: '2025-12-31',
      manufacturer: 'VetPharma Ltd'
    }
    
    setScannedData(JSON.stringify(mockQRData, null, 2))
    setAdministrationForm(prev => ({
      ...prev,
      drugId: mockQRData.drugId,
      batchNumber: mockQRData.batchNumber
    }))
    setShowQRScanner(false)
    toast.success('QR Code scanned successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Drug Administration</h1>
          <p className="text-gray-600">Record and track drug administration with QR traceability</p>
        </div>
        
        <button
          onClick={() => setShowQRScanner(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <QrCodeIcon className="h-5 w-5" />
          <span>Scan QR Code</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Administration Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <ClipboardDocumentListIcon className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Record Administration</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Animal
                  </label>
                  <select
                    required
                    value={administrationForm.animalId}
                    onChange={(e) => handleFormChange('animalId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Choose an animal</option>
                    {mockAnimals.map(animal => (
                      <option key={animal.id} value={animal.id}>
                        {animal.tagId} - {animal.species} ({animal.breed})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Drug
                  </label>
                  <select
                    required
                    value={administrationForm.drugId}
                    onChange={(e) => handleFormChange('drugId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Choose a drug</option>
                    {mockDrugs.map(drug => (
                      <option key={drug.id} value={drug.id}>
                        {drug.name} ({drug.concentration})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Batch Number
                  </label>
                  <input
                    type="text"
                    required
                    value={administrationForm.batchNumber}
                    onChange={(e) => handleFormChange('batchNumber', e.target.value)}
                    placeholder="Scan QR or enter manually"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dose
                  </label>
                  <input
                    type="text"
                    required
                    value={administrationForm.dose}
                    onChange={(e) => handleFormChange('dose', e.target.value)}
                    placeholder="e.g., 5 ml, 2 tablets"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Route of Administration
                  </label>
                  <select
                    value={administrationForm.route}
                    onChange={(e) => handleFormChange('route', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="oral">Oral</option>
                    <option value="injection">Injection</option>
                    <option value="topical">Topical</option>
                    <option value="intravenous">Intravenous</option>
                    <option value="intramuscular">Intramuscular</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purpose
                  </label>
                  <select
                    value={administrationForm.purpose}
                    onChange={(e) => handleFormChange('purpose', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="therapeutic">Therapeutic</option>
                    <option value="prophylactic">Prophylactic</option>
                    <option value="metaphylactic">Metaphylactic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  rows={3}
                  value={administrationForm.notes}
                  onChange={(e) => handleFormChange('notes', e.target.value)}
                  placeholder="Additional notes about the administration..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Withdrawal Period Calculation */}
              {withdrawalCalculation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                    <h3 className="text-sm font-medium text-yellow-800">Withdrawal Period Warning</h3>
                  </div>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <p><strong>Drug:</strong> {withdrawalCalculation.drug}</p>
                    <p><strong>Withdrawal Period:</strong> {withdrawalCalculation.withdrawalPeriod} days</p>
                    <p><strong>Safe for consumption after:</strong> {withdrawalCalculation.withdrawalEndDate}</p>
                    <p><strong>MRL Limit:</strong> {withdrawalCalculation.mrlLimit}</p>
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Record Administration
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* QR Code Display */}
          {scannedData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated QR Code</h3>
              <div className="flex justify-center mb-4">
                <QRCode value={scannedData} size={150} />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Scan this QR code for traceability
              </p>
            </motion.div>
          )}

          {/* Recent Administrations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Administrations</h3>
            
            <div className="space-y-3">
              {recentAdministrations.map((admin) => (
                <div key={admin.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{admin.animalTag}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(admin.status)}`}>
                      {admin.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Drug:</strong> {admin.drugName}</p>
                    <p><strong>Dose:</strong> {admin.dose}</p>
                    <p><strong>Withdrawal ends:</strong> {admin.withdrawalEnd}</p>
                    <p><strong>Vet:</strong> {admin.veterinarian}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 py-2 border-t border-gray-200">
              View all administrations
            </button>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-2">
              <button 
                onClick={simulateQRScan}
                className="w-full flex items-center space-x-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CameraIcon className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Demo QR Scan</span>
              </button>
              
              <button className="w-full flex items-center space-x-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <CalendarDaysIcon className="h-5 w-5 text-green-600" />
                <span className="text-sm">Check Withdrawal Periods</span>
              </button>
              
              <button className="w-full flex items-center space-x-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <CheckCircleIcon className="h-5 w-5 text-purple-600" />
                <span className="text-sm">Compliance Check</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">QR Code Scanner</h2>
              <button
                onClick={() => setShowQRScanner(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="text-center py-8">
              <QrCodeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Position the QR code within the frame</p>
              
              <button
                onClick={simulateQRScan}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Simulate Scan (Demo)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default DrugAdministration
