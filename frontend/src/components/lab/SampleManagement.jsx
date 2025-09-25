import React, { useState } from 'react';
import { Plus, Search, Filter, Package, MapPin, Calendar, User, QrCode, AlertTriangle } from 'lucide-react';

const SampleManagement = () => {
  const [samples, setSamples] = useState([
    {
      id: 'SMP001',
      farmId: 'F001',
      farmName: 'Green Pastures Farm',
      farmerName: 'Rajesh Kumar',
      animalId: 'C001',
      animalName: 'Ganga',
      sampleType: 'Milk',
      collectionDate: '2025-09-25T08:30:00Z',
      receivedDate: '2025-09-25T14:20:00Z',
      testType: 'MRL Analysis',
      priority: 'standard',
      status: 'received',
      batchId: 'B-2025-09-001',
      collectedBy: 'Lab Technician A',
      location: 'Maharashtra',
      storageCondition: 'Refrigerated (4°C)',
      notes: 'Sample collected during routine inspection'
    },
    {
      id: 'SMP002',
      farmId: 'F002',
      farmName: 'Sunrise Dairy',
      farmerName: 'Sunita Sharma',
      animalId: 'C003',
      animalName: 'Kamdhenu',
      sampleType: 'Milk',
      collectionDate: '2025-09-24T09:15:00Z',
      receivedDate: '2025-09-24T15:45:00Z',
      testType: 'Antibiotic Screening',
      priority: 'high',
      status: 'testing',
      batchId: 'B-2025-09-002',
      collectedBy: 'Lab Technician B',
      location: 'Punjab',
      storageCondition: 'Frozen (-20°C)',
      notes: 'Follow-up sample after antibiotic treatment',
      estimatedCompletion: '2025-09-26T12:00:00Z'
    },
    {
      id: 'SMP003',
      farmId: 'F003',
      farmName: 'Valley View Ranch',
      farmerName: 'Amit Patel',
      animalId: 'B005',
      animalName: 'Shiva',
      sampleType: 'Meat',
      collectionDate: '2025-09-23T11:00:00Z',
      receivedDate: '2025-09-23T16:30:00Z',
      testType: 'Multi-residue Analysis',
      priority: 'urgent',
      status: 'completed',
      batchId: 'B-2025-09-003',
      collectedBy: 'Lab Technician C',
      location: 'Gujarat',
      storageCondition: 'Frozen (-80°C)',
      notes: 'Export compliance testing',
      completedDate: '2025-09-25T10:30:00Z'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [newSample, setNewSample] = useState({
    farmId: '',
    farmName: '',
    farmerName: '',
    animalId: '',
    animalName: '',
    sampleType: 'milk',
    testType: '',
    priority: 'standard',
    location: '',
    collectedBy: '',
    notes: ''
  });

  const filteredSamples = samples.filter(sample => {
    const matchesSearch = sample.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sample.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sample.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sample.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || sample.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-700 bg-red-100 border-red-300';
      case 'high': return 'text-orange-700 bg-orange-100 border-orange-300';
      case 'standard': return 'text-blue-700 bg-blue-100 border-blue-300';
      case 'low': return 'text-gray-700 bg-gray-100 border-gray-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const handleAddSample = () => {
    const sample = {
      ...newSample,
      id: `SMP${String(samples.length + 1).padStart(3, '0')}`,
      collectionDate: new Date().toISOString(),
      receivedDate: new Date().toISOString(),
      status: 'received',
      batchId: `B-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(samples.length + 1).padStart(3, '0')}`,
      storageCondition: newSample.sampleType === 'milk' ? 'Refrigerated (4°C)' : 'Frozen (-20°C)'
    };
    setSamples([...samples, sample]);
    setNewSample({
      farmId: '', farmName: '', farmerName: '', animalId: '', animalName: '',
      sampleType: 'milk', testType: '', priority: 'standard', location: '', collectedBy: '', notes: ''
    });
    setShowAddModal(false);
  };

  const statusCounts = {
    all: samples.length,
    received: samples.filter(s => s.status === 'received').length,
    testing: samples.filter(s => s.status === 'testing').length,
    completed: samples.filter(s => s.status === 'completed').length,
    'on-hold': samples.filter(s => s.status === 'on-hold').length
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sample Management</h1>
          <p className="text-gray-600 mt-2">Track and manage incoming samples for MRL testing</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Log New Sample</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 capitalize">{status === 'all' ? 'Total' : status.replace('-', ' ')}</p>
                <p className="text-2xl font-bold text-gray-800">{count}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by farm name, sample ID, or farmer name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="received">Received</option>
            <option value="testing">Testing</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="standard">Standard</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Samples List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Samples ({filteredSamples.length})</h2>
            </div>
            
            <div className="divide-y max-h-[800px] overflow-y-auto">
              {filteredSamples.map((sample) => (
                <div
                  key={sample.id}
                  className={`p-6 cursor-pointer hover:bg-gray-50 ${
                    selectedSample?.id === sample.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedSample(sample)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-800">{sample.id}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(sample.status)}`}>
                          {sample.status}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(sample.priority)}`}>
                          {sample.priority}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600">Farm: {sample.farmName}</p>
                          <p className="text-sm text-gray-600">Farmer: {sample.farmerName}</p>
                          <p className="text-sm text-gray-600">Animal: {sample.animalName} ({sample.animalId})</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Type: {sample.sampleType}</p>
                          <p className="text-sm text-gray-600">Test: {sample.testType}</p>
                          <p className="text-sm text-gray-600">Batch: {sample.batchId}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Collected: {new Date(sample.collectionDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{sample.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex items-center space-x-2">
                      <QrCode className="w-5 h-5 text-gray-400" />
                      {sample.priority === 'urgent' && (
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sample Details */}
        <div className="lg:col-span-1">
          {selectedSample ? (
            <div className="bg-white rounded-lg shadow-lg">
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{selectedSample.id}</h2>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedSample.status)}`}>
                    {selectedSample.status}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6 max-h-[700px] overflow-y-auto">
                {/* Sample Information */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Sample Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Batch ID:</span>
                      <span className="font-medium">{selectedSample.batchId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{selectedSample.sampleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Test Required:</span>
                      <span className="font-medium">{selectedSample.testType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(selectedSample.priority)}`}>
                        {selectedSample.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Storage:</span>
                      <span className="font-medium text-xs">{selectedSample.storageCondition}</span>
                    </div>
                  </div>
                </div>

                {/* Farm Details */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Farm Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Farm:</span>
                      <span className="font-medium">{selectedSample.farmName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Farm ID:</span>
                      <span className="font-medium">{selectedSample.farmId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Farmer:</span>
                      <span className="font-medium">{selectedSample.farmerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{selectedSample.location}</span>
                    </div>
                  </div>
                </div>

                {/* Animal Details */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Animal Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Animal Name:</span>
                      <span className="font-medium">{selectedSample.animalName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Animal ID:</span>
                      <span className="font-medium">{selectedSample.animalId}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-sm">Collected</p>
                        <p className="text-xs text-gray-600">
                          {new Date(selectedSample.collectionDate).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">By: {selectedSample.collectedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-sm">Received</p>
                        <p className="text-xs text-gray-600">
                          {new Date(selectedSample.receivedDate).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {selectedSample.estimatedCompletion && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-sm">Estimated Completion</p>
                          <p className="text-xs text-gray-600">
                            {new Date(selectedSample.estimatedCompletion).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedSample.completedDate && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-sm">Completed</p>
                          <p className="text-xs text-gray-600">
                            {new Date(selectedSample.completedDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {selectedSample.notes && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Notes</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedSample.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Start Testing
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                    Generate QR Code
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Sample</h3>
              <p className="text-gray-500">Choose a sample from the list to view detailed information</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Sample Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-6">Log New Sample</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm ID</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    value={newSample.farmId}
                    onChange={(e) => setNewSample({...newSample, farmId: e.target.value})}
                    placeholder="Enter farm ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    value={newSample.farmName}
                    onChange={(e) => setNewSample({...newSample, farmName: e.target.value})}
                    placeholder="Enter farm name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farmer Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    value={newSample.farmerName}
                    onChange={(e) => setNewSample({...newSample, farmerName: e.target.value})}
                    placeholder="Enter farmer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Animal ID</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    value={newSample.animalId}
                    onChange={(e) => setNewSample({...newSample, animalId: e.target.value})}
                    placeholder="Enter animal ID"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Animal Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    value={newSample.animalName}
                    onChange={(e) => setNewSample({...newSample, animalName: e.target.value})}
                    placeholder="Enter animal name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sample Type</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={newSample.sampleType}
                    onChange={(e) => setNewSample({...newSample, sampleType: e.target.value})}
                  >
                    <option value="milk">Milk</option>
                    <option value="meat">Meat</option>
                    <option value="blood">Blood</option>
                    <option value="urine">Urine</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={newSample.testType}
                    onChange={(e) => setNewSample({...newSample, testType: e.target.value})}
                  >
                    <option value="">Select Test Type</option>
                    <option value="MRL Analysis">MRL Analysis</option>
                    <option value="Antibiotic Screening">Antibiotic Screening</option>
                    <option value="Multi-residue Analysis">Multi-residue Analysis</option>
                    <option value="Pathogen Detection">Pathogen Detection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={newSample.priority}
                    onChange={(e) => setNewSample({...newSample, priority: e.target.value})}
                  >
                    <option value="standard">Standard</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newSample.location}
                  onChange={(e) => setNewSample({...newSample, location: e.target.value})}
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Collected By</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newSample.collectedBy}
                  onChange={(e) => setNewSample({...newSample, collectedBy: e.target.value})}
                  placeholder="Enter collector name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  rows="3"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newSample.notes}
                  onChange={(e) => setNewSample({...newSample, notes: e.target.value})}
                  placeholder="Additional notes or observations..."
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSample}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                disabled={!newSample.farmId || !newSample.sampleType || !newSample.testType}
              >
                Log Sample
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleManagement;