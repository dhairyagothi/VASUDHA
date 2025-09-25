import React, { useState } from 'react';
import { Plus, Search, FileText, Calendar, User, Pill, Clock } from 'lucide-react';

const DigitalPrescriptionManagement = () => {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 'RX001',
      farmerId: 'F001',
      farmerName: 'Rajesh Kumar',
      animalId: 'C001',
      animalName: 'Ganga',
      drug: 'Amoxicillin',
      dosage: '10ml',
      frequency: 'Twice daily',
      duration: '5 days',
      route: 'Intramuscular',
      diagnosis: 'Mastitis',
      withdrawalPeriod: '72 hours (milk), 21 days (meat)',
      dateIssued: '2025-09-25',
      status: 'active',
      notes: 'Monitor temperature daily. Return if symptoms persist after 3 days.'
    },
    {
      id: 'RX002',
      farmerId: 'F002',
      farmerName: 'Sunita Sharma',
      animalId: 'B003',
      animalName: 'Vrishabh',
      drug: 'Oxytetracycline',
      dosage: '20ml',
      frequency: 'Once daily',
      duration: '7 days',
      route: 'Intravenous',
      diagnosis: 'Respiratory infection',
      withdrawalPeriod: '28 days (meat)',
      dateIssued: '2025-09-24',
      status: 'completed',
      notes: 'Treatment completed successfully. No adverse reactions reported.'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    farmerId: '',
    farmerName: '',
    animalId: '',
    animalName: '',
    drug: '',
    dosage: '',
    frequency: '',
    duration: '',
    route: '',
    diagnosis: '',
    notes: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesSearch = rx.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rx.animalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || rx.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreatePrescription = () => {
    const withdrawalPeriod = getWithdrawalPeriod(newPrescription.drug);
    const prescription = {
      ...newPrescription,
      id: `RX${String(prescriptions.length + 1).padStart(3, '0')}`,
      withdrawalPeriod,
      dateIssued: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setPrescriptions([...prescriptions, prescription]);
    setNewPrescription({
      farmerId: '', farmerName: '', animalId: '', animalName: '',
      drug: '', dosage: '', frequency: '', duration: '', route: '', diagnosis: '', notes: ''
    });
    setShowCreateModal(false);
  };

  const getWithdrawalPeriod = (drug) => {
    const withdrawalPeriods = {
      'Amoxicillin': '72 hours (milk), 21 days (meat)',
      'Oxytetracycline': '96 hours (milk), 28 days (meat)',
      'Penicillin': '48 hours (milk), 14 days (meat)',
      'Streptomycin': '120 hours (milk), 35 days (meat)'
    };
    return withdrawalPeriods[drug] || '72 hours (milk), 21 days (meat)';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Digital Prescription Management</h1>
          <p className="text-gray-600 mt-2">Create and manage digital prescriptions for livestock</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>New Prescription</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by farmer name, animal ID, or prescription ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Prescriptions ({filteredPrescriptions.length})</h2>
        </div>
        
        <div className="divide-y">
          {filteredPrescriptions.map((prescription) => (
            <div key={prescription.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Prescription #{prescription.id}
                    </h3>
                    <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(prescription.status)}`}>
                      {prescription.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Farmer Details
                      </h4>
                      <p className="text-sm text-gray-600">Name: {prescription.farmerName}</p>
                      <p className="text-sm text-gray-600">ID: {prescription.farmerId}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Animal Details
                      </h4>
                      <p className="text-sm text-gray-600">Name: {prescription.animalName}</p>
                      <p className="text-sm text-gray-600">ID: {prescription.animalId}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Prescription Date
                      </h4>
                      <p className="text-sm text-gray-600">{new Date(prescription.dateIssued).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                          <Pill className="w-4 h-4 mr-2" />
                          Medication Details
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Drug:</span>
                            <span className="font-medium">{prescription.drug}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Dosage:</span>
                            <span>{prescription.dosage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Frequency:</span>
                            <span>{prescription.frequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span>{prescription.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Route:</span>
                            <span>{prescription.route}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Clinical Information</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Diagnosis:</span>
                            <span className="font-medium">{prescription.diagnosis}</span>
                          </div>
                          <div className="mt-3">
                            <span className="text-gray-600 block mb-1">Withdrawal Period:</span>
                            <span className="text-red-600 font-medium text-xs">{prescription.withdrawalPeriod}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {prescription.notes && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <h4 className="font-medium text-blue-800 mb-1">Veterinarian Notes</h4>
                      <p className="text-blue-700 text-sm">{prescription.notes}</p>
                    </div>
                  )}
                </div>

                <div className="ml-6 flex flex-col space-y-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    View Full
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                    Download PDF
                  </button>
                  {prescription.status === 'active' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Prescription Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-6">Create New Prescription</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Farmer & Animal Details */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Farmer & Animal Details</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farmer ID</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    value={newPrescription.farmerId}
                    onChange={(e) => setNewPrescription({...newPrescription, farmerId: e.target.value})}
                    placeholder="Enter farmer ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farmer Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    value={newPrescription.farmerName}
                    onChange={(e) => setNewPrescription({...newPrescription, farmerName: e.target.value})}
                    placeholder="Enter farmer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Animal ID</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    value={newPrescription.animalId}
                    onChange={(e) => setNewPrescription({...newPrescription, animalId: e.target.value})}
                    placeholder="Enter animal ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Animal Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    value={newPrescription.animalName}
                    onChange={(e) => setNewPrescription({...newPrescription, animalName: e.target.value})}
                    placeholder="Enter animal name"
                  />
                </div>
              </div>

              {/* Medication Details */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Medication Details</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Drug</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={newPrescription.drug}
                    onChange={(e) => setNewPrescription({...newPrescription, drug: e.target.value})}
                  >
                    <option value="">Select Drug</option>
                    <option value="Amoxicillin">Amoxicillin</option>
                    <option value="Oxytetracycline">Oxytetracycline</option>
                    <option value="Penicillin">Penicillin</option>
                    <option value="Streptomycin">Streptomycin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    value={newPrescription.dosage}
                    onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
                    placeholder="e.g., 10ml"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={newPrescription.frequency}
                    onChange={(e) => setNewPrescription({...newPrescription, frequency: e.target.value})}
                  >
                    <option value="">Select Frequency</option>
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Every 12 hours">Every 12 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    value={newPrescription.duration}
                    onChange={(e) => setNewPrescription({...newPrescription, duration: e.target.value})}
                    placeholder="e.g., 5 days"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Administration Route</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={newPrescription.route}
                    onChange={(e) => setNewPrescription({...newPrescription, route: e.target.value})}
                  >
                    <option value="">Select Route</option>
                    <option value="Intramuscular">Intramuscular</option>
                    <option value="Intravenous">Intravenous</option>
                    <option value="Subcutaneous">Subcutaneous</option>
                    <option value="Oral">Oral</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newPrescription.diagnosis}
                  onChange={(e) => setNewPrescription({...newPrescription, diagnosis: e.target.value})}
                  placeholder="Enter diagnosis"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  rows="3"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newPrescription.notes}
                  onChange={(e) => setNewPrescription({...newPrescription, notes: e.target.value})}
                  placeholder="Additional instructions or notes..."
                />
              </div>
            </div>

            {/* Withdrawal Period Preview */}
            {newPrescription.drug && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Withdrawal Period</h4>
                    <p className="text-yellow-700 text-sm">{getWithdrawalPeriod(newPrescription.drug)}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePrescription}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                disabled={!newPrescription.farmerId || !newPrescription.drug || !newPrescription.dosage}
              >
                Create Prescription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalPrescriptionManagement;