import React, { useState } from 'react';
import { QrCode, Camera, Plus, AlertTriangle } from 'lucide-react';

const AMULogging = () => {
  const [formData, setFormData] = useState({
    animalId: '',
    drugName: '',
    dosage: '',
    administrationRoute: '',
    reason: '',
    veterinarianId: '',
    notes: ''
  });
  const [showQRScanner, setShowQRScanner] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementation for AMU logging
    console.log('AMU Log submitted:', formData);
  };

  const scanQR = (type) => {
    // QR scanner implementation
    console.log('Scanning QR for:', type);
    setShowQRScanner(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Antimicrobial Usage Logging</h2>
          <div className="text-sm text-gray-600">
            Offline Mode: <span className="text-green-600">Available</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Animal Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Animal ID
              </label>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 border rounded-l-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  value={formData.animalId}
                  onChange={(e) => setFormData({...formData, animalId: e.target.value})}
                  placeholder="Enter animal ID or scan QR"
                />
                <button
                  type="button"
                  onClick={() => scanQR('animal')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
                >
                  <QrCode className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Drug Name
              </label>
              <div className="flex">
                <select
                  className="flex-1 border rounded-l-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  value={formData.drugName}
                  onChange={(e) => setFormData({...formData, drugName: e.target.value})}
                >
                  <option value="">Select Drug</option>
                  <option value="amoxicillin">Amoxicillin</option>
                  <option value="oxytetracycline">Oxytetracycline</option>
                  <option value="penicillin">Penicillin</option>
                  <option value="streptomycin">Streptomycin</option>
                </select>
                <button
                  type="button"
                  onClick={() => scanQR('drug')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
                >
                  <QrCode className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dosage and Route */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dosage
              </label>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 border rounded-l-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  value={formData.dosage}
                  onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                  placeholder="e.g., 10ml"
                />
                <select className="border rounded-r-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                  <option>ml</option>
                  <option>mg</option>
                  <option>g</option>
                  <option>tablets</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Administration Route
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={formData.administrationRoute}
                onChange={(e) => setFormData({...formData, administrationRoute: e.target.value})}
              >
                <option value="">Select Route</option>
                <option value="intramuscular">Intramuscular</option>
                <option value="intravenous">Intravenous</option>
                <option value="subcutaneous">Subcutaneous</option>
                <option value="oral">Oral</option>
                <option value="topical">Topical</option>
              </select>
            </div>
          </div>

          {/* Reason and Veterinarian */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Treatment
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
              >
                <option value="">Select Reason</option>
                <option value="mastitis">Mastitis</option>
                <option value="respiratory_infection">Respiratory Infection</option>
                <option value="diarrhea">Diarrhea</option>
                <option value="wound_infection">Wound Infection</option>
                <option value="fever">Fever</option>
                <option value="preventive">Preventive</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Veterinarian ID (Optional)
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={formData.veterinarianId}
                onChange={(e) => setFormData({...formData, veterinarianId: e.target.value})}
                placeholder="Enter veterinarian ID if prescribed"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              rows="3"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Additional observations or notes..."
            />
          </div>

          {/* AI Insights */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-blue-800">AI Insights</h4>
                <p className="text-blue-700 text-sm mt-1">
                  Based on your selection, the withdrawal period for milk is 72 hours and for meat is 21 days.
                  This drug combination has shown 95% effectiveness for similar cases in your region.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Log Treatment
            </button>
          </div>
        </form>
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Scan QR Code</h3>
              <button
                onClick={() => setShowQRScanner(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="text-center">
              <Camera className="w-20 h-20 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Position QR code within the frame</p>
              <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                Camera view placeholder
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AMULogging;