import React, { useState } from 'react';
import { Plus, QrCode, Search, Filter, Heart, Activity, Calendar, FileText } from 'lucide-react';

const AnimalProfiles = () => {
  const [animals, setAnimals] = useState([
    {
      id: 'C001',
      name: 'Ganga',
      species: 'Cow',
      breed: 'Holstein Friesian',
      age: '4 years',
      weight: '450 kg',
      birthDate: '2021-03-15',
      qrCode: 'QR001',
      healthStatus: 'Healthy',
      vaccinations: [
        { vaccine: 'FMD', date: '2025-06-15', nextDue: '2025-12-15' },
        { vaccine: 'Anthrax', date: '2025-05-20', nextDue: '2025-11-20' }
      ],
      treatments: [
        { date: '2025-09-20', drug: 'Amoxicillin', reason: 'Mastitis', vet: 'Dr. Sharma' },
        { date: '2025-08-15', drug: 'Ivermectin', reason: 'Deworming', vet: 'Dr. Patel' }
      ],
      production: {
        milkYield: '25L/day',
        lastCalving: '2025-02-10',
        breedingStatus: 'Not pregnant'
      }
    },
    {
      id: 'C002',
      name: 'Saraswati',
      species: 'Cow',
      breed: 'Jersey',
      age: '6 years',
      weight: '380 kg',
      birthDate: '2019-08-22',
      qrCode: 'QR002',
      healthStatus: 'Under Treatment',
      vaccinations: [
        { vaccine: 'FMD', date: '2025-06-10', nextDue: '2025-12-10' }
      ],
      treatments: [
        { date: '2025-09-24', drug: 'Oxytetracycline', reason: 'Respiratory infection', vet: 'Dr. Kumar' }
      ],
      production: {
        milkYield: '22L/day',
        lastCalving: '2025-01-20',
        breedingStatus: 'Pregnant'
      }
    }
  ]);

  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'healthy' && animal.healthStatus === 'Healthy') ||
                         (filterStatus === 'treatment' && animal.healthStatus === 'Under Treatment');
    return matchesSearch && matchesFilter;
  });

  const getHealthStatusColor = (status) => {
    switch (status) {
      case 'Healthy': return 'text-green-700 bg-green-100';
      case 'Under Treatment': return 'text-yellow-700 bg-yellow-100';
      case 'Critical': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Animal Profiles</h1>
          <p className="text-gray-600 mt-2">Manage comprehensive health records for your livestock</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Animal</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or ID..."
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
            <option value="all">All Animals</option>
            <option value="healthy">Healthy</option>
            <option value="treatment">Under Treatment</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Animals List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Your Livestock ({filteredAnimals.length})</h2>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredAnimals.map((animal) => (
                <div
                  key={animal.id}
                  className={`p-6 cursor-pointer hover:bg-gray-50 ${
                    selectedAnimal?.id === animal.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedAnimal(animal)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <Heart className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{animal.name}</h3>
                        <p className="text-gray-600">{animal.breed} • {animal.id}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${getHealthStatusColor(animal.healthStatus)}`}>
                            {animal.healthStatus}
                          </span>
                          <span className="text-xs text-gray-500">{animal.age}</span>
                        </div>
                      </div>
                    </div>
                    <QrCode className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animal Details */}
        <div className="lg:col-span-1">
          {selectedAnimal ? (
            <div className="bg-white rounded-lg shadow-lg">
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{selectedAnimal.name}</h2>
                  <QrCode className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-600">{selectedAnimal.breed}</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Species:</span>
                      <span>{selectedAnimal.species}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span>{selectedAnimal.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span>{selectedAnimal.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Birth Date:</span>
                      <span>{new Date(selectedAnimal.birthDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Health Status */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Health Status</h3>
                  <div className={`px-3 py-2 rounded-lg ${getHealthStatusColor(selectedAnimal.healthStatus)}`}>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4" />
                      <span className="font-medium">{selectedAnimal.healthStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Production Data */}
                {selectedAnimal.production && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Production</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Milk Yield:</span>
                        <span>{selectedAnimal.production.milkYield}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Calving:</span>
                        <span>{new Date(selectedAnimal.production.lastCalving).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span>{selectedAnimal.production.breedingStatus}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Treatments */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Recent Treatments</h3>
                  <div className="space-y-3">
                    {selectedAnimal.treatments.slice(0, 3).map((treatment, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-sm">{treatment.drug}</span>
                        </div>
                        <p className="text-xs text-gray-600">{treatment.reason}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(treatment.date).toLocaleDateString()} • {treatment.vet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vaccinations */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Vaccinations</h3>
                  <div className="space-y-3">
                    {selectedAnimal.vaccinations.map((vaccination, index) => (
                      <div key={index} className="border-l-4 border-green-200 pl-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-sm">{vaccination.vaccine}</span>
                        </div>
                        <p className="text-xs text-gray-600">
                          Last: {new Date(vaccination.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Next: {new Date(vaccination.nextDue).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    View Complete History
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                    Generate QR Code
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Select an Animal</h3>
              <p className="text-gray-500">Choose an animal from the list to view detailed information</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Animal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Add New Animal</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Animal Name"
                className="w-full border rounded-lg px-3 py-2"
              />
              <select className="w-full border rounded-lg px-3 py-2">
                <option>Select Species</option>
                <option>Cow</option>
                <option>Bull</option>
                <option>Buffalo</option>
                <option>Goat</option>
              </select>
              <input
                type="text"
                placeholder="Breed"
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="date"
                placeholder="Birth Date"
                className="w-full border rounded-lg px-3 py-2"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                  Add Animal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalProfiles;