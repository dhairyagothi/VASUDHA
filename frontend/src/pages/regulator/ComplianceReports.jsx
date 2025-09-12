import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

const ComplianceReports = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('last_30_days')
  const [reportType, setReportType] = useState('all')

  // Mock compliance data
  const complianceOverview = {
    totalFarms: 156,
    compliantFarms: 142,
    nonCompliantFarms: 14,
    complianceRate: 91.0,
    pendingInspections: 8,
    criticalViolations: 3,
    lastUpdated: '2024-09-05'
  }

  const recentViolations = [
    {
      id: 'VIO001',
      farmName: 'Green Pastures Farm',
      location: 'Punjab, India',
      violationType: 'Drug Residue Violation',
      severity: 'critical',
      detectedSubstance: 'Oxytetracycline',
      level: '45.2 μg/L',
      limit: '10.0 μg/L',
      detectionDate: '2024-09-03',
      animalId: 'C002',
      status: 'under_investigation',
      inspector: 'Regulatory Inspector Amit Kumar',
      actions: [
        'Products withdrawn from market',
        'Farm placed under surveillance',
        'Investigation initiated'
      ]
    },
    {
      id: 'VIO002',
      farmName: 'Sunshine Dairy',
      location: 'Haryana, India',
      violationType: 'Disease Notification Failure',
      severity: 'high',
      description: 'Failure to report Brucella positive case within mandatory timeframe',
      detectionDate: '2024-09-02',
      animalId: 'G001',
      status: 'penalty_issued',
      inspector: 'Regulatory Inspector Priya Singh',
      actions: [
        'Penalty of ₹50,000 imposed',
        'Mandatory training ordered',
        'Enhanced monitoring for 6 months'
      ]
    },
    {
      id: 'VIO003',
      farmName: 'Mountain View Ranch',
      location: 'Himachal Pradesh, India',
      violationType: 'Record Keeping Violation',
      severity: 'medium',
      description: 'Incomplete medication records for livestock',
      detectionDate: '2024-09-01',
      status: 'corrective_action',
      inspector: 'Regulatory Inspector Rajesh Mehta',
      actions: [
        'Warning issued',
        'Record keeping training provided',
        'Follow-up inspection scheduled'
      ]
    }
  ]

  const complianceMetrics = [
    {
      category: 'Drug Residue Testing',
      totalTests: 245,
      passedTests: 232,
      failedTests: 13,
      complianceRate: 94.7,
      trend: 'improving'
    },
    {
      category: 'Disease Surveillance',
      totalAnimals: 1420,
      healthyAnimals: 1398,
      diseaseReports: 22,
      complianceRate: 98.5,
      trend: 'stable'
    },
    {
      category: 'Record Keeping',
      totalFarms: 156,
      compliantFarms: 139,
      violations: 17,
      complianceRate: 89.1,
      trend: 'declining'
    },
    {
      category: 'Withdrawal Periods',
      totalCases: 89,
      compliantCases: 86,
      violations: 3,
      complianceRate: 96.6,
      trend: 'improving'
    }
  ]

  const inspectionSchedule = [
    {
      id: 'INS001',
      farmName: 'Valley Green Farm',
      location: 'Punjab, India',
      inspectionType: 'Routine Compliance',
      scheduledDate: '2024-09-10',
      inspector: 'Regulatory Inspector Suresh Patel',
      priority: 'medium',
      status: 'scheduled'
    },
    {
      id: 'INS002',
      farmName: 'Rural Dairy Co-op',
      location: 'Gujarat, India',
      inspectionType: 'Follow-up Inspection',
      scheduledDate: '2024-09-08',
      inspector: 'Regulatory Inspector Meera Jain',
      priority: 'high',
      status: 'scheduled'
    },
    {
      id: 'INS003',
      farmName: 'Sunrise Poultry',
      location: 'Rajasthan, India',
      inspectionType: 'Violation Investigation',
      scheduledDate: '2024-09-07',
      inspector: 'Regulatory Inspector Vikram Singh',
      priority: 'critical',
      status: 'in_progress'
    }
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'under_investigation': return 'bg-yellow-100 text-yellow-800'
      case 'penalty_issued': return 'bg-red-100 text-red-800'
      case 'corrective_action': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return <span className="text-green-600">↗</span>
      case 'declining': return <span className="text-red-600">↘</span>
      case 'stable': return <span className="text-gray-600">→</span>
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Reports</h1>
          <p className="text-gray-600">Monitor regulatory compliance and violations</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_90_days">Last 90 Days</option>
            <option value="last_year">Last Year</option>
          </select>
          
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <ArrowDownTrayIcon className="h-5 w-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{complianceOverview.totalFarms}</div>
              <div className="text-sm text-gray-600">Total Farms</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{complianceOverview.complianceRate}%</div>
              <div className="text-sm text-gray-600">Compliance Rate</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{complianceOverview.criticalViolations}</div>
              <div className="text-sm text-gray-600">Critical Violations</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{complianceOverview.pendingInspections}</div>
              <div className="text-sm text-gray-600">Pending Inspections</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview' },
            { id: 'violations', name: 'Violations' },
            { id: 'metrics', name: 'Metrics' },
            { id: 'inspections', name: 'Inspections' }
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
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Distribution</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Compliant Farms</span>
                  <span className="text-green-600 font-medium">{complianceOverview.compliantFarms}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(complianceOverview.compliantFarms / complianceOverview.totalFarms) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Non-Compliant Farms</span>
                  <span className="text-red-600 font-medium">{complianceOverview.nonCompliantFarms}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${(complianceOverview.nonCompliantFarms / complianceOverview.totalFarms) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <ExclamationTriangleIcon className="h-4 w-4 text-red-600 mr-2" />
                  <span className="text-gray-600">Critical violation reported at Green Pastures Farm</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Mountain View Ranch completed corrective actions</span>
                </div>
                <div className="flex items-center text-sm">
                  <ClockIcon className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-gray-600">3 inspections scheduled for this week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'violations' && (
        <div className="space-y-4">
          {recentViolations.map((violation, index) => (
            <motion.div
              key={violation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{violation.id}</h3>
                  <p className="text-sm text-gray-600">{violation.farmName} • {violation.location}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(violation.severity)}`}>
                    {violation.severity.toUpperCase()}
                  </span>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(violation.status)}`}>
                    {violation.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Violation Type</h4>
                  <p className="text-sm text-gray-600">{violation.violationType}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Detection Date</h4>
                  <p className="text-sm text-gray-600">{new Date(violation.detectionDate).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Inspector</h4>
                  <p className="text-sm text-gray-600">{violation.inspector}</p>
                </div>
              </div>

              {violation.detectedSubstance && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">Substance Detection</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-red-700">Substance:</span>
                      <span className="ml-2 font-medium text-red-900">{violation.detectedSubstance}</span>
                    </div>
                    <div>
                      <span className="text-red-700">Detected Level:</span>
                      <span className="ml-2 font-medium text-red-900">{violation.level}</span>
                    </div>
                    <div>
                      <span className="text-red-700">Legal Limit:</span>
                      <span className="ml-2 font-medium text-red-900">{violation.limit}</span>
                    </div>
                  </div>
                </div>
              )}

              {violation.description && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-1">Description</h4>
                  <p className="text-sm text-gray-700">{violation.description}</p>
                </div>
              )}

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Actions Taken</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {violation.actions.map((action, actionIndex) => (
                    <li key={actionIndex}>{action}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  {violation.animalId && `Animal ID: ${violation.animalId}`}
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View Details
                  </button>
                  <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                    Download Report
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceMetrics.map((metric, index) => (
              <motion.div
                key={metric.category}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{metric.category}</h3>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(metric.trend)}
                    <span className="text-sm text-gray-600 capitalize">{metric.trend}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Compliance Rate</span>
                    <span className="text-lg font-bold text-gray-900">{metric.complianceRate}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        metric.complianceRate >= 95 ? 'bg-green-600' :
                        metric.complianceRate >= 85 ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}
                      style={{ width: `${metric.complianceRate}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        {metric.totalTests || metric.totalAnimals || metric.totalFarms || metric.totalCases}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Violations:</span>
                      <span className="ml-2 font-medium text-red-600">
                        {metric.failedTests || metric.diseaseReports || metric.violations}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'inspections' && (
        <div className="space-y-4">
          {inspectionSchedule.map((inspection, index) => (
            <motion.div
              key={inspection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{inspection.id}</h3>
                  <p className="text-sm text-gray-600">{inspection.farmName} • {inspection.location}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(inspection.priority)}`}>
                    {inspection.priority.toUpperCase()}
                  </span>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(inspection.status)}`}>
                    {inspection.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Inspection Type</h4>
                  <p className="text-sm text-gray-600">{inspection.inspectionType}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Scheduled Date</h4>
                  <p className="text-sm text-gray-600">{new Date(inspection.scheduledDate).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Inspector</h4>
                  <p className="text-sm text-gray-600">{inspection.inspector}</p>
                </div>
              </div>

              <div className="flex items-center justify-end pt-4 border-t border-gray-200 mt-4">
                <div className="flex items-center space-x-3">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View Schedule
                  </button>
                  <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                    Update Status
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ComplianceReports
