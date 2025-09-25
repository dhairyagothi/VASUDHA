import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  BarChart3, 
  PieChart, 
  Target,
  Calendar,
  Filter,
  Download,
  Eye,
  Users,
  MapPin,
  TestTube,
  Clock,
  Shield,
  Brain,
  Activity,
  Zap,
  Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const RiskInsights = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');

  // Mock data for risk analysis
  const riskMetrics = {
    totalFarms: 247,
    highRisk: 18,
    mediumRisk: 45,
    lowRisk: 184,
    riskScore: 23.5,
    trend: 'decreasing',
    violations: 5,
    complianceRate: 94.2
  };

  const mrlTrendData = [
    { month: 'Apr', violations: 12, tests: 156, rate: 92.3 },
    { month: 'May', violations: 8, tests: 164, rate: 95.1 },
    { month: 'Jun', violations: 6, tests: 178, rate: 96.6 },
    { month: 'Jul', violations: 9, tests: 189, rate: 95.2 },
    { month: 'Aug', violations: 7, tests: 201, rate: 96.5 },
    { month: 'Sep', violations: 5, tests: 198, rate: 97.5 }
  ];

  const riskFactorData = [
    { factor: 'Withdrawal Period', count: 23, percentage: 38.3, color: '#EF4444' },
    { factor: 'Overdue Testing', count: 18, percentage: 30.0, color: '#F97316' },
    { factor: 'Previous Violations', count: 12, percentage: 20.0, color: '#EAB308' },
    { factor: 'High AMU Usage', count: 7, percentage: 11.7, color: '#3B82F6' }
  ];

  const farmRiskProfiles = [
    {
      id: 'FM001',
      name: 'Green Valley Dairy',
      farmer: 'Rajesh Kumar',
      location: 'Village Khedi, Bhopal',
      riskLevel: 'low',
      riskScore: 15.2,
      factors: ['Regular Testing'],
      lastIncident: null,
      compliance: 98.5,
      predictions: {
        nextRisk: 'Low probability in next 30 days',
        recommendation: 'Continue current practices'
      }
    },
    {
      id: 'FM002',
      name: 'Sunrise Cattle Farm',
      farmer: 'Priya Sharma',
      location: 'Village Dhansu, Indore',
      riskLevel: 'high',
      riskScore: 78.3,
      factors: ['Active Withdrawal', 'Previous Violation', 'High AMU'],
      lastIncident: '2025-09-10',
      compliance: 76.2,
      predictions: {
        nextRisk: 'High probability within 15 days',
        recommendation: 'Immediate intervention required'
      }
    },
    {
      id: 'FM003',
      name: 'Heritage Livestock',
      farmer: 'Amit Patel',
      location: 'Village Piparia, Jabalpur',
      riskLevel: 'medium',
      riskScore: 45.7,
      factors: ['Overdue Testing', 'Irregular Patterns'],
      lastIncident: '2025-08-15',
      compliance: 85.1,
      predictions: {
        nextRisk: 'Moderate probability in next 20 days',
        recommendation: 'Enhanced monitoring needed'
      }
    }
  ];

  const predictiveAlerts = [
    {
      id: 'PA001',
      farmName: 'Mountain View Farm',
      type: 'withdrawal_ending',
      severity: 'medium',
      message: 'Withdrawal period for Penicillin treatment ends in 2 days',
      probability: 85,
      action: 'Schedule collection',
      dueDate: '2025-09-27'
    },
    {
      id: 'PA002',
      farmName: 'Valley Fresh Dairy',
      type: 'testing_overdue',
      severity: 'high',
      message: 'MRL testing overdue by 12 days - violation risk increasing',
      probability: 92,
      action: 'Immediate testing required',
      dueDate: '2025-09-25'
    },
    {
      id: 'PA003',
      farmName: 'Sunshine Farm',
      type: 'pattern_anomaly',
      severity: 'low',
      message: 'Unusual AMU usage pattern detected - monitoring recommended',
      probability: 45,
      action: 'Schedule inspection',
      dueDate: '2025-10-01'
    }
  ];

  const geographicalRisks = [
    { region: 'Bhopal District', farms: 65, highRisk: 3, mediumRisk: 12, lowRisk: 50, avgScore: 18.5 },
    { region: 'Indore District', farms: 58, highRisk: 8, mediumRisk: 15, lowRisk: 35, avgScore: 34.2 },
    { region: 'Jabalpur District', farms: 72, highRisk: 4, mediumRisk: 11, lowRisk: 57, avgScore: 21.8 },
    { region: 'Seoni District', farms: 52, highRisk: 3, mediumRisk: 7, lowRisk: 42, avgScore: 16.9 }
  ];

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100 border-green-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'high': return 'text-red-600 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'high': return 'text-red-600 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const downloadReport = () => {
    console.log('Downloading risk analysis report');
  };

  const viewFarmDetails = (farmId) => {
    console.log('Viewing farm details:', farmId);
  };

  const scheduleIntervention = (alertId) => {
    console.log('Scheduling intervention for alert:', alertId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Risk Insights & Analytics</h1>
          <p className="text-gray-600 mt-2">ML-Powered Risk Assessment & Predictive Analysis</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={downloadReport}
            className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Risk Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Farms</p>
              <p className="text-2xl font-bold text-gray-800">{riskMetrics.totalFarms}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-red-600">{riskMetrics.highRisk}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Medium Risk</p>
              <p className="text-2xl font-bold text-yellow-600">{riskMetrics.mediumRisk}</p>
            </div>
            <Activity className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Risk</p>
              <p className="text-2xl font-bold text-green-600">{riskMetrics.lowRisk}</p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Risk Score</p>
              <p className="text-2xl font-bold text-purple-600">{riskMetrics.riskScore}%</p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Violations</p>
              <p className="text-2xl font-bold text-red-600">{riskMetrics.violations}</p>
            </div>
            <TestTube className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Compliance</p>
              <p className="text-2xl font-bold text-green-600">{riskMetrics.complianceRate}%</p>
            </div>
            <Award className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Trend</p>
              <div className="flex items-center">
                {riskMetrics.trend === 'decreasing' ? (
                  <TrendingDown className="w-6 h-6 text-green-600" />
                ) : (
                  <TrendingUp className="w-6 h-6 text-red-600" />
                )}
              </div>
            </div>
            <Brain className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* MRL Violation Trends */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">MRL Violation Trends</h2>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mrlTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="violations" fill="#EF4444" name="Violations" />
                <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} name="Compliance Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Factors Breakdown */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Risk Factors</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {riskFactorData.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{factor.factor}</span>
                    <span className="text-sm text-gray-600">{factor.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${factor.percentage}%`,
                        backgroundColor: factor.color
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">{factor.percentage}% of total risk factors</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Predictive Alerts */}
      <div className="bg-white rounded-lg shadow-lg mb-8">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Predictive Alerts</h2>
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-600">AI-Powered Predictions</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {predictiveAlerts.map((alert) => (
              <div key={alert.id} className="border-l-4 border-indigo-500 bg-indigo-50 p-4 rounded-r-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-800">{alert.farmName}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Zap className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm text-indigo-600">{alert.probability}% probability</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span><strong>Action:</strong> {alert.action}</span>
                      <span><strong>Due:</strong> {alert.dueDate}</span>
                    </div>
                  </div>
                  <div className="ml-6 flex space-x-2">
                    <button
                      onClick={() => scheduleIntervention(alert.id)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                    >
                      Take Action
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Farm Risk Profiles and Geographical Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* High-Risk Farm Profiles */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Farm Risk Profiles</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {farmRiskProfiles.map((farm) => (
                <div key={farm.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="font-semibold text-gray-800">{farm.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getRiskLevelColor(farm.riskLevel)}`}>
                          {farm.riskLevel} risk
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{farm.farmer} • {farm.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">{farm.riskScore}%</p>
                      <p className="text-xs text-gray-600">Risk Score</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600"><strong>Risk Factors:</strong></p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {farm.factors.map((factor, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <strong>Compliance:</strong> {farm.compliance}%
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Last Incident:</strong> {farm.lastIncident || 'None'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-3 mb-3">
                    <p className="text-sm font-medium text-gray-800 mb-1">AI Prediction:</p>
                    <p className="text-sm text-gray-700 mb-1">{farm.predictions.nextRisk}</p>
                    <p className="text-sm text-indigo-600">
                      <strong>Recommendation:</strong> {farm.predictions.recommendation}
                    </p>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => viewFarmDetails(farm.id)}
                      className="flex items-center space-x-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographical Risk Distribution */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Regional Risk Distribution</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {geographicalRisks.map((region, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <h4 className="font-semibold text-gray-800">{region.region}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">{region.avgScore}%</p>
                      <p className="text-xs text-gray-600">Avg Risk Score</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-bold text-gray-800">{region.farms}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-red-600">High</p>
                      <p className="font-bold text-red-600">{region.highRisk}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-yellow-600">Medium</p>
                      <p className="font-bold text-yellow-600">{region.mediumRisk}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-green-600">Low</p>
                      <p className="font-bold text-green-600">{region.lowRisk}</p>
                    </div>
                  </div>

                  <div className="flex space-x-1">
                    <div
                      className="h-2 bg-red-500 rounded-l"
                      style={{ width: `${(region.highRisk / region.farms) * 100}%` }}
                    ></div>
                    <div
                      className="h-2 bg-yellow-500"
                      style={{ width: `${(region.mediumRisk / region.farms) * 100}%` }}
                    ></div>
                    <div
                      className="h-2 bg-green-500 rounded-r"
                      style={{ width: `${(region.lowRisk / region.farms) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskInsights;