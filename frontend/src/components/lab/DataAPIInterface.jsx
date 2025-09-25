import React, { useState } from 'react';
import { Database, Upload, Download, Settings, Zap, CheckCircle, AlertTriangle } from 'lucide-react';

const DataAPIInterface = () => {
  const [connections, setConnections] = useState([
    {
      id: 'INST001',
      name: 'LC-MS/MS System A',
      type: 'Liquid Chromatography',
      manufacturer: 'Waters',
      model: 'Xevo TQ-S micro',
      status: 'connected',
      lastSync: '2025-09-25T14:30:00Z',
      dataCount: 156,
      errorCount: 0
    },
    {
      id: 'INST002',
      name: 'GC-MS System B',
      type: 'Gas Chromatography',
      manufacturer: 'Agilent',
      model: '7890A/5975C',
      status: 'connected',
      lastSync: '2025-09-25T13:45:00Z',
      dataCount: 89,
      errorCount: 2
    },
    {
      id: 'INST003',
      name: 'HPLC System C',
      type: 'High Performance LC',
      manufacturer: 'Shimadzu',
      model: 'Nexera-i',
      status: 'disconnected',
      lastSync: '2025-09-24T16:20:00Z',
      dataCount: 0,
      errorCount: 5
    }
  ]);

  const [dataTransfers, setDataTransfers] = useState([
    {
      id: 'DT001',
      instrumentId: 'INST001',
      instrumentName: 'LC-MS/MS System A',
      sampleId: 'SMP001',
      testType: 'MRL Analysis',
      transferDate: '2025-09-25T14:30:00Z',
      status: 'completed',
      recordCount: 12,
      fileSize: '2.4 MB'
    },
    {
      id: 'DT002',
      instrumentId: 'INST002',
      instrumentName: 'GC-MS System B',
      sampleId: 'SMP002',
      testType: 'Pesticide Screening',
      transferDate: '2025-09-25T13:45:00Z',
      status: 'completed',
      recordCount: 8,
      fileSize: '1.8 MB'
    },
    {
      id: 'DT003',
      instrumentId: 'INST001',
      instrumentName: 'LC-MS/MS System A',
      sampleId: 'SMP003',
      testType: 'Antibiotic Analysis',
      transferDate: '2025-09-25T12:15:00Z',
      status: 'processing',
      recordCount: 15,
      fileSize: '3.2 MB'
    }
  ]);

  const [apiKeys, setApiKeys] = useState([
    {
      id: 'KEY001',
      name: 'Production API Key',
      status: 'active',
      created: '2025-09-01T00:00:00Z',
      lastUsed: '2025-09-25T14:30:00Z',
      permissions: ['read', 'write', 'upload']
    },
    {
      id: 'KEY002',
      name: 'Backup API Key',
      status: 'inactive',
      created: '2025-08-15T00:00:00Z',
      lastUsed: '2025-09-20T10:00:00Z',
      permissions: ['read', 'upload']
    }
  ]);

  const [selectedTab, setSelectedTab] = useState('instruments');
  const [showConfigModal, setShowConfigModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-green-700 bg-green-100 border-green-300';
      case 'disconnected': return 'text-red-700 bg-red-100 border-red-300';
      case 'processing': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'completed': return 'text-green-700 bg-green-100 border-green-300';
      case 'error': return 'text-red-700 bg-red-100 border-red-300';
      case 'active': return 'text-green-700 bg-green-100 border-green-300';
      case 'inactive': return 'text-gray-700 bg-gray-100 border-gray-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
      case 'completed':
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'disconnected':
      case 'error':
      case 'inactive':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Database className="w-5 h-5 text-gray-600" />;
    }
  };

  const testConnection = (instrumentId) => {
    // Test connection implementation
    console.log('Testing connection for:', instrumentId);
  };

  const syncData = (instrumentId) => {
    // Sync data implementation
    console.log('Syncing data for:', instrumentId);
  };

  const generateApiKey = () => {
    // Generate new API key
    const newKey = {
      id: `KEY${String(apiKeys.length + 1).padStart(3, '0')}`,
      name: `API Key ${apiKeys.length + 1}`,
      status: 'active',
      created: new Date().toISOString(),
      lastUsed: null,
      permissions: ['read', 'upload']
    };
    setApiKeys([...apiKeys, newKey]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Data API Interface</h1>
          <p className="text-gray-600 mt-2">Manage instrument connections and automated data uploads</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowConfigModal(true)}
            className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            <Settings className="w-4 h-4" />
            <span>Configure</span>
          </button>
          <button
            onClick={generateApiKey}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Zap className="w-4 h-4" />
            <span>Generate API Key</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Connected Instruments</p>
              <p className="text-2xl font-bold text-green-600">
                {connections.filter(c => c.status === 'connected').length}
              </p>
            </div>
            <Database className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Data Transfers Today</p>
              <p className="text-2xl font-bold text-blue-600">{dataTransfers.length}</p>
            </div>
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-purple-600">
                {dataTransfers.reduce((sum, dt) => sum + dt.recordCount, 0)}
              </p>
            </div>
            <Download className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active API Keys</p>
              <p className="text-2xl font-bold text-gray-800">
                {apiKeys.filter(k => k.status === 'active').length}
              </p>
            </div>
            <Zap className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b">
          <nav className="flex">
            {['instruments', 'transfers', 'api-keys'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-4 text-sm font-medium capitalize ${
                  selectedTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Instruments Tab */}
          {selectedTab === 'instruments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Connected Instruments</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Add New Instrument
                </button>
              </div>

              <div className="grid gap-6">
                {connections.map((connection) => (
                  <div key={connection.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{connection.name}</h3>
                          <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(connection.status)}`}>
                            {connection.status}
                          </span>
                          {getStatusIcon(connection.status)}
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Type: {connection.type}</p>
                            <p className="text-sm text-gray-600">Manufacturer: {connection.manufacturer}</p>
                            <p className="text-sm text-gray-600">Model: {connection.model}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Last Sync: {new Date(connection.lastSync).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">Records Transferred: {connection.dataCount}</p>
                            <p className="text-sm text-gray-600">Errors: {connection.errorCount}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              connection.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-sm text-gray-600">
                              {connection.status === 'connected' ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6 flex flex-col space-y-2">
                        <button
                          onClick={() => testConnection(connection.id)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                        >
                          Test Connection
                        </button>
                        <button
                          onClick={() => syncData(connection.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                          disabled={connection.status !== 'connected'}
                        >
                          Sync Data
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Transfers Tab */}
          {selectedTab === 'transfers' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Recent Data Transfers</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transfer ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Instrument
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sample
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Test Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Records
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataTransfers.map((transfer) => (
                      <tr key={transfer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transfer.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transfer.instrumentName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transfer.sampleId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transfer.testType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transfer.recordCount} records ({transfer.fileSize})
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(transfer.status)}`}>
                            {transfer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(transfer.transferDate).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {selectedTab === 'api-keys' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">API Keys</h2>
                <button
                  onClick={generateApiKey}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                  Generate New Key
                </button>
              </div>

              <div className="grid gap-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-800">{key.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(key.status)}`}>
                            {key.status}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Key ID: {key.id}</p>
                            <p className="text-gray-600">Created: {new Date(key.created).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">
                              Last Used: {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never'}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Permissions:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {key.permissions.map((permission, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {permission}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6 flex flex-col space-y-2">
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                          View Details
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                          Edit Permissions
                        </button>
                        <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-semibold mb-6">API Configuration</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Endpoint Configuration</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base URL</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2"
                      defaultValue="https://api.vasudha.gov.in/v1"
                      placeholder="Enter API base URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Endpoint</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2"
                      defaultValue="/lab/results/upload"
                      placeholder="Enter upload endpoint"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">Security Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <span className="text-sm">Enable SSL/TLS encryption</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <span className="text-sm">Require API key authentication</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">Enable rate limiting</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">Data Sync Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sync Interval (minutes)</label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-2"
                      defaultValue="15"
                      min="1"
                      max="1440"
                    />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <span className="text-sm">Auto-sync completed tests</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">Retry failed uploads automatically</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowConfigModal(false)}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataAPIInterface;