import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, Users, Activity, MapPin, Calendar, BarChart3 } from 'lucide-react';

const FarmOversightDashboard = () => {
  const [farms] = useState([
    {
      id: 'F001',
      name: 'Green Pastures Farm',
      owner: 'Rajesh Kumar',
      location: 'Maharashtra',
      animals: 45,
      complianceScore: 92,
      recentIssues: 1,
      lastVisit: '2025-09-20',
      status: 'excellent',
      amuTrend: 'decreasing',
      totalAMU: 150,
      criticalAnimals: 2
    },
    {
      id: 'F002',
      name: 'Sunrise Dairy',
      owner: 'Sunita Sharma',
      location: 'Punjab',
      animals: 80,
      complianceScore: 85,
      recentIssues: 3,
      lastVisit: '2025-09-18',
      status: 'good',
      amuTrend: 'stable',
      totalAMU: 280,
      criticalAnimals: 5
    },
    {
      id: 'F003',
      name: 'Valley View Ranch',
      owner: 'Amit Patel',
      location: 'Gujarat',
      animals: 120,
      complianceScore: 78,
      recentIssues: 8,
      lastVisit: '2025-09-15',
      status: 'needs_attention',
      amuTrend: 'increasing',
      totalAMU: 450,
      criticalAnimals: 12
    }
  ]);

  const [selectedFarm, setSelectedFarm] = useState(null);
  const [viewType, setViewType] = useState('overview');
  const [timeframe, setTimeframe] = useState('month');

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-300';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'needs_attention': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'decreasing': return <TrendingUp className="w-4 h-4 text-green-600 rotate-180" />;
      case 'stable': return <Activity className="w-4 h-4 text-blue-600" />;
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalAnimals = farms.reduce((sum, farm) => sum + farm.animals, 0);
  const averageCompliance = Math.round(farms.reduce((sum, farm) => sum + farm.complianceScore, 0) / farms.length);
  const totalIssues = farms.reduce((sum, farm) => sum + farm.recentIssues, 0);
  const totalCriticalAnimals = farms.reduce((sum, farm) => sum + farm.criticalAnimals, 0);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Farm Oversight Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor health and AMU trends across all farms</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <div className="text-right text-sm text-gray-500">
              <div>Last Updated</div>
              <div>{new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Farms</p>
              <p className="text-3xl font-bold text-gray-800">{farms.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Animals</p>
              <p className="text-3xl font-bold text-gray-800">{totalAnimals}</p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Compliance</p>
              <p className="text-3xl font-bold text-gray-800">{averageCompliance}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Animals</p>
              <p className="text-3xl font-bold text-red-600">{totalCriticalAnimals}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Farms List */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Farm Overview</h2>
            <div className="flex space-x-2 mt-2">
              {['overview', 'compliance', 'amu_trends'].map((view) => (
                <button
                  key={view}
                  onClick={() => setViewType(view)}
                  className={`px-3 py-1 text-sm rounded-full capitalize ${
                    viewType === view
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  {view.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y max-h-[600px] overflow-y-auto">
            {farms.map((farm) => (
              <div
                key={farm.id}
                className={`p-6 cursor-pointer hover:bg-gray-50 ${
                  selectedFarm?.id === farm.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => setSelectedFarm(farm)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{farm.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(farm.status)}`}>
                        {farm.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{farm.owner} • {farm.location}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Animals:</span>
                        <span className="ml-2 font-medium">{farm.animals}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Compliance:</span>
                        <span className="ml-2 font-medium">{farm.complianceScore}%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500">AMU Trend:</span>
                        <span className="ml-2 flex items-center">
                          {getTrendIcon(farm.amuTrend)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Issues:</span>
                        <span className="ml-2 font-medium text-red-600">{farm.recentIssues}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right text-sm text-gray-500">
                    <div>Last Visit</div>
                    <div className="font-medium">{new Date(farm.lastVisit).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farm Details */}
        <div className="space-y-6">
          {selectedFarm ? (
            <>
              {/* Farm Header */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedFarm.name}</h2>
                    <div className="flex items-center space-x-2 text-gray-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedFarm.location}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(selectedFarm.status)}`}>
                    {selectedFarm.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Owner</p>
                    <p className="font-medium">{selectedFarm.owner}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Visit</p>
                    <p className="font-medium">{new Date(selectedFarm.lastVisit).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Animals Under Care</span>
                    <span className="font-semibold text-2xl">{selectedFarm.animals}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Compliance Score</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-2xl">{selectedFarm.complianceScore}%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            selectedFarm.complianceScore >= 90 ? 'bg-green-500' :
                            selectedFarm.complianceScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${selectedFarm.complianceScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total AMU (this month)</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-2xl">{selectedFarm.totalAMU}</span>
                      {getTrendIcon(selectedFarm.amuTrend)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Critical Animals</span>
                    <span className="font-semibold text-2xl text-red-600">{selectedFarm.criticalAnimals}</span>
                  </div>
                </div>
              </div>

              {/* Recent Issues */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Issues</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">High AMU in Dairy Cattle</p>
                      <p className="text-red-700 text-sm">3 animals showing elevated antibiotic usage</p>
                      <p className="text-red-600 text-xs mt-1">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Withdrawal Period Extension</p>
                      <p className="text-yellow-700 text-sm">Animal C002 requires extended withdrawal</p>
                      <p className="text-yellow-600 text-xs mt-1">5 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Schedule Visit
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    Create Prescription
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                    Generate Report
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                    View Full History
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Farm</h3>
              <p className="text-gray-500">Choose a farm from the list to view detailed information</p>
            </div>
          )}
        </div>
      </div>

      {/* Regional Overview */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Regional AMU Trends</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Regional AMU trend chart will be displayed here</p>
            <p className="text-sm mt-2">Showing {timeframe} data across all farms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmOversightDashboard;