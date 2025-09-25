import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, XCircle, TrendingUp, Calendar } from 'lucide-react';

const ComplianceDashboard = () => {
  const [animals] = useState([
    {
      id: 'C001',
      name: 'Ganga',
      type: 'Cow',
      status: 'compliant',
      lastTreatment: '2025-09-20',
      withdrawalEnd: '2025-09-23',
      mrlScore: 98,
      readyForMarket: true
    },
    {
      id: 'C002',
      name: 'Saraswati',
      type: 'Cow',
      status: 'withdrawal',
      lastTreatment: '2025-09-24',
      withdrawalEnd: '2025-09-27',
      mrlScore: 45,
      readyForMarket: false
    },
    {
      id: 'B003',
      name: 'Vrishabh',
      type: 'Bull',
      status: 'at-risk',
      lastTreatment: '2025-09-22',
      withdrawalEnd: '2025-10-15',
      mrlScore: 25,
      readyForMarket: false
    },
    {
      id: 'C004',
      name: 'Kamdhenu',
      type: 'Cow',
      status: 'compliant',
      lastTreatment: '2025-09-15',
      withdrawalEnd: '2025-09-18',
      mrlScore: 95,
      readyForMarket: true
    }
  ]);

  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-green-700 bg-green-100 border-green-300';
      case 'withdrawal': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'at-risk': return 'text-red-700 bg-red-100 border-red-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'withdrawal': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'at-risk': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Shield className="w-5 h-5 text-gray-600" />;
    }
  };

  const compliantCount = animals.filter(a => a.status === 'compliant').length;
  const withdrawalCount = animals.filter(a => a.status === 'withdrawal').length;
  const atRiskCount = animals.filter(a => a.status === 'at-risk').length;
  const overallScore = Math.round(animals.reduce((sum, a) => sum + a.mrlScore, 0) / animals.length);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">MRL Compliance Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor your livestock compliance status</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
            <div className="text-right">
              <div className="text-sm text-gray-500">Last Updated</div>
              <div className="text-sm font-medium">{new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall Score</p>
              <p className="text-3xl font-bold text-gray-800">{overallScore}%</p>
            </div>
            <div className={`p-3 rounded-full ${
              overallScore >= 90 ? 'bg-green-100' : overallScore >= 70 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <TrendingUp className={`w-6 h-6 ${
                overallScore >= 90 ? 'text-green-600' : overallScore >= 70 ? 'text-yellow-600' : 'text-red-600'
              }`} />
            </div>
          </div>
          <div className="mt-4">
            <div className={`w-full bg-gray-200 rounded-full h-2 ${
              overallScore >= 90 ? 'bg-green-200' : overallScore >= 70 ? 'bg-yellow-200' : 'bg-red-200'
            }`}>
              <div
                className={`h-2 rounded-full ${
                  overallScore >= 90 ? 'bg-green-600' : overallScore >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                }`}
                style={{ width: `${overallScore}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Compliant Animals</p>
              <p className="text-3xl font-bold text-green-600">{compliantCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Ready for market</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Withdrawal</p>
              <p className="text-3xl font-bold text-yellow-600">{withdrawalCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Pending clearance</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">At Risk</p>
              <p className="text-3xl font-bold text-red-600">{atRiskCount}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Requires attention</p>
        </div>
      </div>

      {/* Animals List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Animal Compliance Status</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Animal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MRL Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Treatment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Withdrawal End
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Ready
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {animals.map((animal) => (
                <tr key={animal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {animal.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {animal.type} • ID: {animal.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(animal.status)}
                      <span className={`ml-2 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(animal.status)}`}>
                        {animal.status.replace('-', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {animal.mrlScore}%
                      </div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            animal.mrlScore >= 90 ? 'bg-green-500' : 
                            animal.mrlScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${animal.mrlScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(animal.lastTreatment).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {animal.status === 'compliant' ? '-' : new Date(animal.withdrawalEnd).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {animal.readyForMarket ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View Details
                    </button>
                    {animal.readyForMarket && (
                      <button className="text-green-600 hover:text-green-900">
                        List for Sale
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Trends */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Compliance Trends</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Compliance trend chart will be displayed here</p>
            <p className="text-sm mt-2">Showing {selectedTimeframe} data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;