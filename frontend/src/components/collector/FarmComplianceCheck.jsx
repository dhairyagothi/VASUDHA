import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Calendar,
  Users,
  TestTube,
  Shield,
  Truck,
  Search,
  Filter,
  QrCode,
  FileText,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

const FarmComplianceCheck = () => {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock farm data with detailed compliance information
  const farms = [
    {
      id: 'FM001',
      name: 'Green Valley Dairy',
      farmerName: 'Rajesh Kumar',
      location: 'Village Khedi, Bhopal, MP',
      coordinates: { lat: 23.2599, lng: 77.4126 },
      complianceStatus: 'approved',
      overallScore: 98,
      lastVisit: '2025-09-22',
      nextScheduled: '2025-09-26',
      animals: {
        total: 45,
        atRisk: 0,
        inWithdrawal: 0,
        compliant: 45
      },
      mrlResults: {
        lastTest: '2025-09-20',
        status: 'pass',
        antibiotics: 'clear',
        hormones: 'clear',
        pesticides: 'clear'
      },
      withdrawalPeriods: [],
      estimatedQuantity: '500L',
      riskLevel: 'low'
    },
    {
      id: 'FM002',
      name: 'Sunrise Cattle Farm',
      farmerName: 'Priya Sharma',
      location: 'Village Dhansu, Indore, MP',
      coordinates: { lat: 22.7196, lng: 75.8577 },
      complianceStatus: 'conditional',
      overallScore: 76,
      lastVisit: '2025-09-20',
      nextScheduled: '2025-09-25',
      animals: {
        total: 30,
        atRisk: 8,
        inWithdrawal: 5,
        compliant: 22
      },
      mrlResults: {
        lastTest: '2025-09-18',
        status: 'partial',
        antibiotics: 'traces_detected',
        hormones: 'clear',
        pesticides: 'clear'
      },
      withdrawalPeriods: [
        { animalId: 'A023', drug: 'Penicillin', endsOn: '2025-09-28' },
        { animalId: 'A031', drug: 'Oxytetracycline', endsOn: '2025-09-26' },
        { animalId: 'A045', drug: 'Sulfamethoxazole', endsOn: '2025-09-30' }
      ],
      estimatedQuantity: '200L',
      riskLevel: 'medium'
    },
    {
      id: 'FM003',
      name: 'Heritage Livestock',
      farmerName: 'Amit Patel',
      location: 'Village Piparia, Jabalpur, MP',
      coordinates: { lat: 23.1815, lng: 79.9864 },
      complianceStatus: 'rejected',
      overallScore: 45,
      lastVisit: '2025-09-19',
      nextScheduled: '2025-09-29',
      animals: {
        total: 60,
        atRisk: 25,
        inWithdrawal: 15,
        compliant: 35
      },
      mrlResults: {
        lastTest: '2025-09-17',
        status: 'fail',
        antibiotics: 'exceeded_limits',
        hormones: 'traces_detected',
        pesticides: 'clear'
      },
      withdrawalPeriods: [
        { animalId: 'A067', drug: 'Tylosin', endsOn: '2025-10-05' },
        { animalId: 'A078', drug: 'Florfenicol', endsOn: '2025-10-02' },
        { animalId: 'A089', drug: 'Enrofloxacin', endsOn: '2025-10-08' }
      ],
      estimatedQuantity: '0L',
      riskLevel: 'high'
    },
    {
      id: 'FM004',
      name: 'Mountain View Farm',
      farmerName: 'Sunita Yadav',
      location: 'Village Barghat, Seoni, MP',
      coordinates: { lat: 22.0844, lng: 79.9705 },
      complianceStatus: 'approved',
      overallScore: 94,
      lastVisit: '2025-09-21',
      nextScheduled: '2025-09-25',
      animals: {
        total: 38,
        atRisk: 2,
        inWithdrawal: 1,
        compliant: 36
      },
      mrlResults: {
        lastTest: '2025-09-19',
        status: 'pass',
        antibiotics: 'clear',
        hormones: 'clear',
        pesticides: 'clear'
      },
      withdrawalPeriods: [
        { animalId: 'A101', drug: 'Amoxicillin', endsOn: '2025-09-26' }
      ],
      estimatedQuantity: '420L',
      riskLevel: 'low'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-700 bg-green-100 border-green-300';
      case 'conditional': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'rejected': return 'text-red-700 bg-red-100 border-red-300';
      case 'pending': return 'text-blue-700 bg-blue-100 border-blue-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'conditional': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-blue-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMRLStatusColor = (status) => {
    switch (status) {
      case 'clear': return 'text-green-600 bg-green-100';
      case 'traces_detected': return 'text-yellow-600 bg-yellow-100';
      case 'exceeded_limits': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredFarms = farms.filter(farm => {
    const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || farm.complianceStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getDecisionMessage = (farm) => {
    switch (farm.complianceStatus) {
      case 'approved':
        return {
          decision: 'GO',
          message: 'Collection approved - All compliance requirements met',
          color: 'text-green-600 bg-green-50 border-green-200'
        };
      case 'conditional':
        return {
          decision: 'CONDITIONAL',
          message: 'Collection allowed with restrictions - Monitor withdrawal periods',
          color: 'text-yellow-600 bg-yellow-50 border-yellow-200'
        };
      case 'rejected':
        return {
          decision: 'NO-GO',
          message: 'Collection prohibited - MRL violations detected',
          color: 'text-red-600 bg-red-50 border-red-200'
        };
      default:
        return {
          decision: 'PENDING',
          message: 'Awaiting compliance verification',
          color: 'text-blue-600 bg-blue-50 border-blue-200'
        };
    }
  };

  const refreshFarmData = (farmId) => {
    console.log('Refreshing data for farm:', farmId);
  };

  const scanQRCode = () => {
    console.log('Opening QR scanner');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Farm Compliance Check</h1>
          <p className="text-gray-600 mt-2">Go/No-Go Decision System for Collection</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={scanQRCode}
            className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan QR</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh All</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search farms or farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="conditional">Conditional</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Farm List */}
      <div className="grid gap-6">
        {filteredFarms.map((farm) => {
          const decision = getDecisionMessage(farm);
          return (
            <div key={farm.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Decision Banner */}
              <div className={`px-6 py-4 border-l-4 ${
                farm.complianceStatus === 'approved' ? 'border-green-500 bg-green-50' :
                farm.complianceStatus === 'conditional' ? 'border-yellow-500 bg-yellow-50' :
                'border-red-500 bg-red-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`px-4 py-2 rounded-lg font-bold text-lg ${decision.color} border`}>
                      {decision.decision}
                    </div>
                    <span className="text-gray-700">{decision.message}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(farm.riskLevel)}`}>
                      {farm.riskLevel.toUpperCase()} RISK
                    </span>
                    <span className="text-gray-600 text-sm">Score: {farm.overallScore}%</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{farm.name}</h3>
                    <p className="text-gray-600">Farmer: {farm.farmerName}</p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{farm.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">{farm.estimatedQuantity}</p>
                    <p className="text-sm text-gray-600">Expected quantity</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  {/* Animal Status */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">Animal Status</h4>
                      <Users className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span className="font-medium">{farm.animals.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliant:</span>
                        <span className="text-green-600 font-medium">{farm.animals.compliant}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>In Withdrawal:</span>
                        <span className="text-yellow-600 font-medium">{farm.animals.inWithdrawal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>At Risk:</span>
                        <span className="text-red-600 font-medium">{farm.animals.atRisk}</span>
                      </div>
                    </div>
                  </div>

                  {/* MRL Results */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">MRL Results</h4>
                      <TestTube className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Last Test:</span>
                        <span className="font-medium">{farm.mrlResults.lastTest}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Antibiotics:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getMRLStatusColor(farm.mrlResults.antibiotics)}`}>
                          {farm.mrlResults.antibiotics.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hormones:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getMRLStatusColor(farm.mrlResults.hormones)}`}>
                          {farm.mrlResults.hormones}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Withdrawal Periods */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">Active Withdrawals</h4>
                      <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="space-y-1 text-sm">
                      {farm.withdrawalPeriods.length === 0 ? (
                        <p className="text-green-600">No active withdrawals</p>
                      ) : (
                        farm.withdrawalPeriods.slice(0, 2).map((withdrawal, index) => (
                          <div key={index} className="border-l-2 border-yellow-500 pl-2">
                            <p className="font-medium">{withdrawal.drug}</p>
                            <p className="text-xs text-gray-600">Ends: {withdrawal.endsOn}</p>
                          </div>
                        ))
                      )}
                      {farm.withdrawalPeriods.length > 2 && (
                        <p className="text-xs text-gray-600">
                          +{farm.withdrawalPeriods.length - 2} more
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Collection Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">Collection Info</h4>
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Last Visit:</span>
                        <span className="font-medium">{farm.lastVisit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Scheduled:</span>
                        <span className="font-medium">{farm.nextScheduled}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(farm.complianceStatus)}`}>
                          {farm.complianceStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setSelectedFarm(farm);
                        setShowDetailsModal(true);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => refreshFarmData(farm.id)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Refresh Data</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      <MapPin className="w-4 h-4" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                  
                  {farm.complianceStatus === 'approved' && (
                    <button className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <Truck className="w-4 h-4" />
                      <span>Proceed with Collection</span>
                    </button>
                  )}
                  
                  {farm.complianceStatus === 'conditional' && (
                    <button className="flex items-center space-x-2 px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                      <Shield className="w-4 h-4" />
                      <span>Conditional Collection</span>
                    </button>
                  )}
                  
                  {farm.complianceStatus === 'rejected' && (
                    <button 
                      disabled
                      className="flex items-center space-x-2 px-6 py-2 bg-red-300 text-white rounded-lg cursor-not-allowed"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Collection Prohibited</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed View Modal */}
      {showDetailsModal && selectedFarm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">{selectedFarm.name} - Detailed Compliance Report</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            {/* Detailed content would go here */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Complete Withdrawal Schedule</h4>
                  <div className="space-y-2">
                    {selectedFarm.withdrawalPeriods.map((withdrawal, index) => (
                      <div key={index} className="p-3 border rounded">
                        <p><strong>Animal ID:</strong> {withdrawal.animalId}</p>
                        <p><strong>Drug:</strong> {withdrawal.drug}</p>
                        <p><strong>Withdrawal Ends:</strong> {withdrawal.endsOn}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">MRL Test History</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded">
                      <p><strong>Test Date:</strong> {selectedFarm.mrlResults.lastTest}</p>
                      <p><strong>Overall Status:</strong> {selectedFarm.mrlResults.status}</p>
                      <div className="mt-2 space-y-1">
                        <p>Antibiotics: <span className={`px-2 py-1 rounded text-sm ${getMRLStatusColor(selectedFarm.mrlResults.antibiotics)}`}>{selectedFarm.mrlResults.antibiotics}</span></p>
                        <p>Hormones: <span className={`px-2 py-1 rounded text-sm ${getMRLStatusColor(selectedFarm.mrlResults.hormones)}`}>{selectedFarm.mrlResults.hormones}</span></p>
                        <p>Pesticides: <span className={`px-2 py-1 rounded text-sm ${getMRLStatusColor(selectedFarm.mrlResults.pesticides)}`}>{selectedFarm.mrlResults.pesticides}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmComplianceCheck;