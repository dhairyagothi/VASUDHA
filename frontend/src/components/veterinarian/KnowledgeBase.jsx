import React, { useState } from 'react';
import { Search, Book, Pill, Clock, AlertTriangle, CheckCircle, Filter, Star } from 'lucide-react';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDrug, setSelectedDrug] = useState(null);

  const [drugs] = useState([
    {
      id: 1,
      name: 'Amoxicillin',
      category: 'antibiotics',
      type: 'Beta-lactam antibiotic',
      uses: ['Respiratory infections', 'Mastitis', 'Urinary tract infections'],
      dosage: {
        cattle: '15-20 mg/kg body weight',
        buffalo: '15-20 mg/kg body weight',
        goat: '10-15 mg/kg body weight'
      },
      withdrawalPeriod: {
        milk: '72 hours',
        meat: '21 days'
      },
      administration: ['Intramuscular', 'Intravenous', 'Subcutaneous'],
      contraindications: ['Hypersensitivity to penicillins', 'Severe kidney disease'],
      sideEffects: ['Allergic reactions', 'Diarrhea', 'Local swelling'],
      mrlLimits: {
        milk: '0.004 mg/kg',
        meat: '0.05 mg/kg'
      },
      rating: 4.5,
      approved: true
    },
    {
      id: 2,
      name: 'Oxytetracycline',
      category: 'antibiotics',
      type: 'Tetracycline antibiotic',
      uses: ['Respiratory infections', 'Foot rot', 'Pneumonia'],
      dosage: {
        cattle: '20 mg/kg body weight',
        buffalo: '20 mg/kg body weight',
        goat: '20 mg/kg body weight'
      },
      withdrawalPeriod: {
        milk: '96 hours',
        meat: '28 days'
      },
      administration: ['Intramuscular', 'Intravenous'],
      contraindications: ['Pregnancy (last trimester)', 'Young animals under 6 months'],
      sideEffects: ['Teeth discoloration', 'Bone growth inhibition', 'GI upset'],
      mrlLimits: {
        milk: '0.1 mg/kg',
        meat: '0.2 mg/kg'
      },
      rating: 4.2,
      approved: true
    },
    {
      id: 3,
      name: 'Ivermectin',
      category: 'antiparasitic',
      type: 'Avermectin',
      uses: ['Internal parasites', 'External parasites', 'Mange'],
      dosage: {
        cattle: '0.2 mg/kg body weight',
        buffalo: '0.2 mg/kg body weight',
        goat: '0.2 mg/kg body weight'
      },
      withdrawalPeriod: {
        milk: '72 hours',
        meat: '35 days'
      },
      administration: ['Subcutaneous', 'Pour-on', 'Oral'],
      contraindications: ['Lactating dairy animals', 'Collie breeds (if used in dogs)'],
      sideEffects: ['Temporary swelling', 'Lethargy', 'Loss of appetite'],
      mrlLimits: {
        milk: '0.01 mg/kg',
        meat: '0.1 mg/kg'
      },
      rating: 4.7,
      approved: true
    },
    {
      id: 4,
      name: 'Meloxicam',
      category: 'anti-inflammatory',
      type: 'NSAID',
      uses: ['Pain relief', 'Inflammation', 'Fever reduction'],
      dosage: {
        cattle: '0.5 mg/kg body weight',
        buffalo: '0.5 mg/kg body weight',
        goat: '0.5 mg/kg body weight'
      },
      withdrawalPeriod: {
        milk: '120 hours',
        meat: '15 days'
      },
      administration: ['Intramuscular', 'Intravenous', 'Subcutaneous'],
      contraindications: ['Severe kidney disease', 'GI ulceration', 'Pregnancy'],
      sideEffects: ['GI irritation', 'Kidney toxicity', 'Injection site reactions'],
      mrlLimits: {
        milk: '0.015 mg/kg',
        meat: '0.02 mg/kg'
      },
      rating: 4.3,
      approved: true
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Categories', count: drugs.length },
    { id: 'antibiotics', name: 'Antibiotics', count: drugs.filter(d => d.category === 'antibiotics').length },
    { id: 'antiparasitic', name: 'Antiparasitic', count: drugs.filter(d => d.category === 'antiparasitic').length },
    { id: 'anti-inflammatory', name: 'Anti-inflammatory', count: drugs.filter(d => d.category === 'anti-inflammatory').length },
    { id: 'vaccines', name: 'Vaccines', count: 0 },
    { id: 'vitamins', name: 'Vitamins', count: 0 }
  ];

  const filteredDrugs = drugs.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drug.uses.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || drug.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'antibiotics': 'bg-blue-100 text-blue-800',
      'antiparasitic': 'bg-green-100 text-green-800',
      'anti-inflammatory': 'bg-yellow-100 text-yellow-800',
      'vaccines': 'bg-purple-100 text-purple-800',
      'vitamins': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Knowledge Base</h1>
        <p className="text-gray-600 mt-2">Comprehensive database of approved drugs, dosages, and protocols</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search drugs, uses, or conditions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Drugs List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Drug Database ({filteredDrugs.length})</h2>
            </div>
            
            <div className="divide-y max-h-[800px] overflow-y-auto">
              {filteredDrugs.map((drug) => (
                <div
                  key={drug.id}
                  className={`p-6 cursor-pointer hover:bg-gray-50 ${
                    selectedDrug?.id === drug.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedDrug(drug)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{drug.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(drug.category)}`}>
                          {drug.category}
                        </span>
                        {drug.approved && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{drug.type}</p>
                      
                      <div className="mb-3">
                        <h4 className="font-medium text-gray-800 mb-1">Common Uses:</h4>
                        <div className="flex flex-wrap gap-1">
                          {drug.uses.slice(0, 3).map((use, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {use}
                            </span>
                          ))}
                          {drug.uses.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{drug.uses.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Withdrawal (Milk):</span>
                          <span className="ml-2 font-medium text-red-600">{drug.withdrawalPeriod.milk}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Withdrawal (Meat):</span>
                          <span className="ml-2 font-medium text-red-600">{drug.withdrawalPeriod.meat}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 text-right">
                      <div className="flex items-center space-x-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{drug.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Pill className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {drug.administration.length} routes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drug Details */}
        <div className="lg:col-span-1">
          {selectedDrug ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{selectedDrug.name}</h2>
                  {selectedDrug.approved && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>
                <p className="text-gray-600">{selectedDrug.type}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(selectedDrug.category)}`}>
                    {selectedDrug.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{selectedDrug.rating}</span>
                  </div>
                </div>
              </div>

              <div className="max-h-[700px] overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Uses */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Approved Uses</h3>
                    <div className="space-y-1">
                      {selectedDrug.uses.map((use, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">{use}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dosage */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Dosage Guidelines</h3>
                    <div className="space-y-2">
                      {Object.entries(selectedDrug.dosage).map(([animal, dose]) => (
                        <div key={animal} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium capitalize">{animal}:</span>
                          <span className="text-sm text-gray-700">{dose}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Withdrawal Periods */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Withdrawal Periods
                    </h3>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-red-700">Milk:</span>
                        <span className="text-sm font-medium text-red-800">{selectedDrug.withdrawalPeriod.milk}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-red-700">Meat:</span>
                        <span className="text-sm font-medium text-red-800">{selectedDrug.withdrawalPeriod.meat}</span>
                      </div>
                    </div>
                  </div>

                  {/* MRL Limits */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">MRL Limits</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Milk:</span>
                        <span className="text-sm font-medium">{selectedDrug.mrlLimits.milk}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Meat:</span>
                        <span className="text-sm font-medium">{selectedDrug.mrlLimits.meat}</span>
                      </div>
                    </div>
                  </div>

                  {/* Administration Routes */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Administration Routes</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedDrug.administration.map((route, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {route}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contraindications */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Contraindications
                    </h3>
                    <div className="space-y-1">
                      {selectedDrug.contraindications.map((contraindication, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-yellow-700">{contraindication}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Side Effects */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Potential Side Effects</h3>
                    <div className="space-y-1">
                      {selectedDrug.sideEffects.map((effect, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">{effect}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Drug</h3>
              <p className="text-gray-500">Choose a drug from the list to view detailed information</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Reference</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Emergency Protocols</h4>
            <p className="text-blue-700 text-sm">Quick access to emergency treatment protocols</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">Drug Interactions</h4>
            <p className="text-green-700 text-sm">Check for potential drug interactions</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Latest Updates</h4>
            <p className="text-yellow-700 text-sm">Recent changes to MRL limits and guidelines</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;