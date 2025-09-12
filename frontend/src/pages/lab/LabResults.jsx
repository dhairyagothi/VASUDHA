import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BeakerIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  PrinterIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

const LabResults = () => {
  const [activeTab, setActiveTab] = useState('recent')
  const [selectedResult, setSelectedResult] = useState(null)
  const [filter, setFilter] = useState('all')

  // Mock lab results data
  const mockResults = [
    {
      id: 'LAB001',
      sampleId: 'SMP001',
      animalId: 'C001',
      animalTag: 'C001',
      farmName: 'Green Valley Farm',
      testType: 'Antibiotic Residue Screening',
      sampleType: 'milk',
      testDate: '2024-09-03',
      resultDate: '2024-09-05',
      status: 'completed',
      result: 'negative',
      confidence: '99.8%',
      methodology: 'HPLC-MS/MS',
      labTechnician: 'Dr. Seema Patel',
      reviewedBy: 'Dr. Rajesh Gupta',
      accreditationStandard: 'ISO/IEC 17025',
      detectedSubstances: [],
      recommendations: 'No antibiotic residues detected. Animal products safe for consumption.',
      certificationRequired: true,
      regulatoryCompliance: 'FSSAI Compliant',
      priority: 'high',
      turnaroundTime: '2 days',
      cost: '₹850',
      qrCode: 'QR-LAB001-2024'
    },
    {
      id: 'LAB002',
      sampleId: 'SMP002',
      animalId: 'G001',
      animalTag: 'G001',
      farmName: 'Sunshine Dairy',
      testType: 'Disease Screening Panel',
      sampleType: 'blood',
      testDate: '2024-09-02',
      resultDate: '2024-09-04',
      status: 'completed',
      result: 'positive',
      confidence: '95.2%',
      methodology: 'ELISA, PCR',
      labTechnician: 'Dr. Priya Mehta',
      reviewedBy: 'Dr. Suresh Kumar',
      accreditationStandard: 'ISO/IEC 17025',
      detectedSubstances: [
        {
          name: 'Brucella antibodies',
          level: 'Positive (Titer: 1:160)',
          threshold: '1:80',
          significance: 'Indicates exposure to Brucella bacteria'
        }
      ],
      recommendations: 'Immediate isolation required. Contact veterinarian for treatment protocol. Mandatory reporting to authorities.',
      certificationRequired: false,
      regulatoryCompliance: 'Requires immediate action',
      priority: 'high',
      turnaroundTime: '2 days',
      cost: '₹1,250',
      qrCode: 'QR-LAB002-2024'
    },
    {
      id: 'LAB003',
      sampleId: 'SMP003',
      animalId: 'C002',
      animalTag: 'C002',
      farmName: 'Green Valley Farm',
      testType: 'Drug Metabolite Detection',
      sampleType: 'urine',
      testDate: '2024-08-31',
      resultDate: '2024-09-03',
      status: 'completed',
      result: 'positive',
      confidence: '97.5%',
      methodology: 'GC-MS',
      labTechnician: 'Dr. Amit Singh',
      reviewedBy: 'Dr. Meera Joshi',
      accreditationStandard: 'ISO/IEC 17025',
      detectedSubstances: [
        {
          name: 'Oxytetracycline metabolites',
          level: '45.2 μg/L',
          threshold: '10.0 μg/L',
          significance: 'Exceeded maximum residue limit'
        }
      ],
      recommendations: 'VIOLATION: Withdraw animal products from food chain immediately. Investigation required for compliance breach.',
      certificationRequired: false,
      regulatoryCompliance: 'NON-COMPLIANT - Regulatory action required',
      priority: 'critical',
      turnaroundTime: '3 days',
      cost: '₹1,650',
      qrCode: 'QR-LAB003-2024'
    },
    {
      id: 'LAB004',
      sampleId: 'SMP004',
      animalId: 'C003',
      animalTag: 'C003',
      farmName: 'Dairy Plus Farm',
      testType: 'Pathology Examination',
      sampleType: 'tissue',
      testDate: '2024-08-29',
      resultDate: '2024-09-02',
      status: 'completed',
      result: 'abnormal',
      confidence: '92.0%',
      methodology: 'Histopathology, Immunohistochemistry',
      labTechnician: 'Dr. Kavita Sharma',
      reviewedBy: 'Dr. Vikram Patel',
      accreditationStandard: 'ISO/IEC 17025',
      detectedSubstances: [],
      findings: [
        'Chronic interstitial nephritis in kidney samples',
        'Mild hepatic lipidosis in liver tissue',
        'No evidence of infectious disease',
        'Age-related degenerative changes consistent with old age'
      ],
      recommendations: 'Natural death due to age-related organ failure. No infectious disease concern for herd.',
      certificationRequired: false,
      regulatoryCompliance: 'No action required',
      priority: 'medium',
      turnaroundTime: '4 days',
      cost: '₹2,100',
      qrCode: 'QR-LAB004-2024'
    },
    {
      id: 'LAB005',
      sampleId: 'SMP005',
      animalId: 'P001',
      animalTag: 'P001',
      farmName: 'Poultry Express',
      testType: 'Antibiotic Residue Screening',
      sampleType: 'meat',
      testDate: '2024-09-01',
      resultDate: '2024-09-03',
      status: 'in_progress',
      progress: '75%',
      estimatedCompletion: '2024-09-06',
      methodology: 'HPLC-MS/MS',
      labTechnician: 'Dr. Neha Gupta',
      priority: 'high',
      qrCode: 'QR-LAB005-2024'
    }
  ]

  const getResultColor = (result) => {
    switch (result) {
      case 'negative': return 'bg-green-100 text-green-800'
      case 'positive': return 'bg-red-100 text-red-800'
      case 'abnormal': return 'bg-yellow-100 text-yellow-800'
      case 'normal': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getResultIcon = (result) => {
    switch (result) {
      case 'negative':
      case 'normal':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />
      case 'positive':
        return <XCircleIcon className="h-5 w-5 text-red-600" />
      case 'abnormal':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
      default:
        return <BeakerIcon className="h-5 w-5 text-gray-600" />
    }
  }

  const filteredResults = mockResults.filter(result => {
    const matchesFilter = filter === 'all' || result.status === filter || result.result === filter
    return matchesFilter
  })

  const getStats = () => {
    const total = mockResults.length
    const completed = mockResults.filter(r => r.status === 'completed').length
    const inProgress = mockResults.filter(r => r.status === 'in_progress').length
    const critical = mockResults.filter(r => r.priority === 'critical' || r.result === 'positive').length
    
    return { total, completed, inProgress, critical }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laboratory Results</h1>
          <p className="text-gray-600">View and manage laboratory test results</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <ChartBarIcon className="h-5 w-5" />
            <span>Analytics</span>
          </button>
          
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <ArrowDownTrayIcon className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Results</div>
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
            <ClockIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.critical}</div>
              <div className="text-sm text-gray-600">Critical/Positive</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {[
              { value: 'all', label: 'All Results' },
              { value: 'completed', label: 'Completed' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'positive', label: 'Positive' },
              { value: 'negative', label: 'Negative' }
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
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredResults.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {result.status === 'completed' ? getResultIcon(result.result) : <ClockIcon className="h-5 w-5 text-blue-600" />}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{result.id}</h3>
                    <p className="text-sm text-gray-600">
                      Sample: {result.sampleId} • {result.animalTag} • {result.farmName}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(result.priority)}`}>
                  {result.priority?.toUpperCase()}
                </span>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(result.status)}`}>
                  {result.status.replace('_', ' ').toUpperCase()}
                </span>
                {result.status === 'completed' && (
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getResultColor(result.result)}`}>
                    {result.result?.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Test Information</h4>
                <p className="text-sm text-gray-600">{result.testType}</p>
                <p className="text-xs text-gray-500 capitalize">{result.sampleType} sample</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Timeline</h4>
                <p className="text-sm text-gray-600">
                  Tested: {new Date(result.testDate).toLocaleDateString()}
                </p>
                {result.resultDate ? (
                  <p className="text-xs text-gray-500">
                    Completed: {new Date(result.resultDate).toLocaleDateString()}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Est. completion: {new Date(result.estimatedCompletion).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Laboratory</h4>
                <p className="text-sm text-gray-600">{result.labTechnician}</p>
                {result.reviewedBy && (
                  <p className="text-xs text-gray-500">Reviewed by: {result.reviewedBy}</p>
                )}
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Methodology</h4>
                <p className="text-sm text-gray-600">{result.methodology}</p>
                {result.confidence && (
                  <p className="text-xs text-gray-500">Confidence: {result.confidence}</p>
                )}
              </div>
            </div>

            {result.status === 'in_progress' && result.progress && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900 font-medium">{result.progress}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: result.progress }}
                  ></div>
                </div>
              </div>
            )}

            {result.status === 'completed' && result.detectedSubstances && result.detectedSubstances.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Detected Substances</h4>
                <div className="space-y-2">
                  {result.detectedSubstances.map((substance, substanceIndex) => (
                    <div key={substanceIndex} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-red-900">{substance.name}</h5>
                          <p className="text-sm text-red-700">Level: {substance.level}</p>
                          <p className="text-xs text-red-600">Threshold: {substance.threshold}</p>
                        </div>
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                      </div>
                      <p className="text-sm text-red-700 mt-2">{substance.significance}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.findings && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Pathological Findings</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {result.findings.map((finding, findingIndex) => (
                    <li key={findingIndex}>{finding}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.recommendations && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                <div className={`p-3 rounded-lg ${
                  result.recommendations.includes('VIOLATION') || result.recommendations.includes('Immediate')
                    ? 'bg-red-50 border border-red-200'
                    : result.recommendations.includes('safe')
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <p className={`text-sm ${
                    result.recommendations.includes('VIOLATION') || result.recommendations.includes('Immediate')
                      ? 'text-red-700'
                      : result.recommendations.includes('safe')
                      ? 'text-green-700'
                      : 'text-gray-700'
                  }`}>
                    {result.recommendations}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
              <div>
                <span className="text-gray-600">Compliance Status:</span>
                <span className={`ml-2 font-medium ${
                  result.regulatoryCompliance?.includes('NON-COMPLIANT') ? 'text-red-600' :
                  result.regulatoryCompliance?.includes('Compliant') ? 'text-green-600' :
                  'text-gray-900'
                }`}>
                  {result.regulatoryCompliance}
                </span>
              </div>
              
              <div>
                <span className="text-gray-600">Accreditation:</span>
                <span className="ml-2 text-gray-900">{result.accreditationStandard}</span>
              </div>
              
              <div>
                <span className="text-gray-600">Cost:</span>
                <span className="ml-2 text-gray-900">{result.cost}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                QR Code: {result.qrCode}
                {result.turnaroundTime && (
                  <span className="ml-4">Turnaround: {result.turnaroundTime}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedResult(result)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <PrinterIcon className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                  <ShareIcon className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                  <ArrowDownTrayIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Result Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Detailed Lab Result - {selectedResult.id}</h2>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Complete detailed view of the selected result would go here */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Complete Report</h3>
                <p className="text-gray-600">Detailed laboratory analysis report with all technical specifications, quality control measures, and certification details would be displayed here.</p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedResult(null)}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Download Report
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default LabResults
