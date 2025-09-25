import React, { useState } from 'react';
import { Send, CheckCircle, AlertTriangle, XCircle, Search, Filter, FileText, Download, Upload } from 'lucide-react';

const ResultSubmission = () => {
  const [testResults, setTestResults] = useState([
    {
      id: 'TST001',
      sampleId: 'SMP001',
      farmId: 'F001',
      farmName: 'Green Pastures Farm',
      farmerName: 'Rajesh Kumar',
      animalId: 'C001',
      animalName: 'Ganga',
      sampleType: 'Milk',
      testType: 'MRL Analysis',
      testDate: '2025-09-25T10:00:00Z',
      completionDate: '2025-09-26T14:30:00Z',
      status: 'completed',
      results: {
        amoxicillin: { detected: '0.002', limit: '0.004', unit: 'mg/kg', compliant: true },
        oxytetracycline: { detected: 'ND', limit: '0.1', unit: 'mg/kg', compliant: true },
        streptomycin: { detected: 'ND', limit: '0.2', unit: 'mg/kg', compliant: true }
      },
      overallCompliant: true,
      testedBy: 'Dr. Sarah Johnson',
      reviewedBy: 'Dr. Michael Chen',
      submissionStatus: 'pending'
    },
    {
      id: 'TST002',
      sampleId: 'SMP002',
      farmId: 'F002',
      farmName: 'Sunrise Dairy',
      farmerName: 'Sunita Sharma',
      animalId: 'C003',
      animalName: 'Kamdhenu',
      sampleType: 'Milk',
      testType: 'Antibiotic Screening',
      testDate: '2025-09-24T11:15:00Z',
      completionDate: '2025-09-25T16:45:00Z',
      status: 'completed',
      results: {
        penicillin: { detected: '0.08', limit: '0.05', unit: 'mg/kg', compliant: false },
        ampicillin: { detected: '0.02', limit: '0.05', unit: 'mg/kg', compliant: true },
        tetracycline: { detected: 'ND', limit: '0.1', unit: 'mg/kg', compliant: true }
      },
      overallCompliant: false,
      testedBy: 'Dr. Priya Sharma',
      reviewedBy: 'Dr. Michael Chen',
      submissionStatus: 'submitted',
      submissionDate: '2025-09-25T18:00:00Z'
    },
    {
      id: 'TST003',
      sampleId: 'SMP003',
      farmId: 'F003',
      farmName: 'Valley View Ranch',
      farmerName: 'Amit Patel',
      animalId: 'B005',
      animalName: 'Shiva',
      sampleType: 'Meat',
      testType: 'Multi-residue Analysis',
      testDate: '2025-09-23T12:30:00Z',
      completionDate: '2025-09-25T09:15:00Z',
      status: 'completed',
      results: {
        chloramphenicol: { detected: 'ND', limit: '0.0', unit: 'mg/kg', compliant: true },
        sulfamethazine: { detected: '0.05', limit: '0.1', unit: 'mg/kg', compliant: true },
        enrofloxacin: { detected: '0.15', limit: '0.1', unit: 'mg/kg', compliant: false }
      },
      overallCompliant: false,
      testedBy: 'Dr. Rajesh Kumar',
      reviewedBy: 'Dr. Michael Chen',
      submissionStatus: 'submitted',
      submissionDate: '2025-09-25T11:30:00Z'
    }
  ]);

  const [selectedResult, setSelectedResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [complianceFilter, setComplianceFilter] = useState('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const filteredResults = testResults.filter(result => {
    const matchesSearch = result.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.sampleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || result.submissionStatus === statusFilter;
    const matchesCompliance = complianceFilter === 'all' || 
                             (complianceFilter === 'compliant' && result.overallCompliant) ||
                             (complianceFilter === 'non-compliant' && !result.overallCompliant);
    return matchesSearch && matchesStatus && matchesCompliance;
  });

  const getSubmissionStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceIcon = (compliant) => {
    return compliant ? 
      <CheckCircle className="w-5 h-5 text-green-500" /> : 
      <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getResultColor = (detected, limit, compliant) => {
    if (detected === 'ND') return 'text-green-600';
    return compliant ? 'text-green-600' : 'text-red-600';
  };

  const submitResult = (resultId) => {
    setTestResults(results => results.map(result => 
      result.id === resultId 
        ? { ...result, submissionStatus: 'submitted', submissionDate: new Date().toISOString() }
        : result
    ));
    setShowSubmitModal(false);
  };

  const exportReport = (result) => {
    // Export functionality
    console.log('Exporting report for:', result.id);
  };

  const submissionCounts = {
    all: testResults.length,
    pending: testResults.filter(r => r.submissionStatus === 'pending').length,
    submitted: testResults.filter(r => r.submissionStatus === 'submitted').length,
    draft: testResults.filter(r => r.submissionStatus === 'draft').length
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Result Submission</h1>
          <p className="text-gray-600 mt-2">Submit MRL test results to the central portal</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            <span>Bulk Upload</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {Object.entries(submissionCounts).map(([status, count]) => (
          <div key={status} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 capitalize">{status === 'all' ? 'Total Results' : status}</p>
                <p className="text-2xl font-bold text-gray-800">{count}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
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
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={complianceFilter}
            onChange={(e) => setComplianceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Compliance</option>
            <option value="compliant">Compliant</option>
            <option value="non-compliant">Non-Compliant</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Results List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Test Results ({filteredResults.length})</h2>
            </div>
            
            <div className="divide-y max-h-[800px] overflow-y-auto">
              {filteredResults.map((result) => (
                <div
                  key={result.id}
                  className={`p-6 cursor-pointer hover:bg-gray-50 ${
                    selectedResult?.id === result.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedResult(result)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-800">{result.id}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getSubmissionStatusColor(result.submissionStatus)}`}>
                          {result.submissionStatus}
                        </span>
                        {getComplianceIcon(result.overallCompliant)}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600">Sample: {result.sampleId}</p>
                          <p className="text-sm text-gray-600">Farm: {result.farmName}</p>
                          <p className="text-sm text-gray-600">Animal: {result.animalName} ({result.animalId})</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Type: {result.sampleType}</p>
                          <p className="text-sm text-gray-600">Test: {result.testType}</p>
                          <p className="text-sm text-gray-600">
                            Completed: {new Date(result.completionDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="font-medium text-gray-800 mb-2">Results Summary:</h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(result.results).slice(0, 3).map(([drug, data]) => (
                            <span
                              key={drug}
                              className={`px-2 py-1 text-xs rounded ${
                                data.compliant ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {drug}: {data.detected === 'ND' ? 'ND' : `${data.detected} ${data.unit}`}
                            </span>
                          ))}
                          {Object.keys(result.results).length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{Object.keys(result.results).length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Tested by: {result.testedBy}</span>
                        <span>Reviewed by: {result.reviewedBy}</span>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex flex-col space-y-2">
                      {result.submissionStatus === 'pending' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedResult(result);
                            setShowSubmitModal(true);
                          }}
                          className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                        >
                          <Send className="w-3 h-3" />
                          <span>Submit</span>
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          exportReport(result);
                        }}
                        className="flex items-center space-x-1 border border-gray-300 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-50"
                      >
                        <Download className="w-3 h-3" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Result Details */}
        <div className="lg:col-span-1">
          {selectedResult ? (
            <div className="bg-white rounded-lg shadow-lg">
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{selectedResult.id}</h2>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getSubmissionStatusColor(selectedResult.submissionStatus)}`}>
                      {selectedResult.submissionStatus}
                    </span>
                    {getComplianceIcon(selectedResult.overallCompliant)}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6 max-h-[700px] overflow-y-auto">
                {/* Test Information */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Test Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sample ID:</span>
                      <span className="font-medium">{selectedResult.sampleId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Test Type:</span>
                      <span className="font-medium">{selectedResult.testType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sample Type:</span>
                      <span className="font-medium">{selectedResult.sampleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-medium">{new Date(selectedResult.completionDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overall Status:</span>
                      <span className={`font-medium ${selectedResult.overallCompliant ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedResult.overallCompliant ? 'Compliant' : 'Non-Compliant'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Detailed Results */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Detailed Results</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedResult.results).map(([drug, data]) => (
                      <div key={drug} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-800 capitalize">{drug}</h4>
                          {data.compliant ? 
                            <CheckCircle className="w-4 h-4 text-green-500" /> : 
                            <XCircle className="w-4 h-4 text-red-500" />
                          }
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Detected:</span>
                            <span className={`font-medium ${getResultColor(data.detected, data.limit, data.compliant)}`}>
                              {data.detected === 'ND' ? 'Not Detected' : `${data.detected} ${data.unit}`}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">MRL Limit:</span>
                            <span className="font-medium">{data.limit} {data.unit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`font-medium ${data.compliant ? 'text-green-600' : 'text-red-600'}`}>
                              {data.compliant ? 'Within Limit' : 'Exceeds Limit'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personnel */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Personnel</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tested By:</span>
                      <span className="font-medium">{selectedResult.testedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reviewed By:</span>
                      <span className="font-medium">{selectedResult.reviewedBy}</span>
                    </div>
                  </div>
                </div>

                {/* Submission Details */}
                {selectedResult.submissionDate && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Submission Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Submitted:</span>
                        <span className="font-medium">{new Date(selectedResult.submissionDate).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Portal Status:</span>
                        <span className="text-green-600 font-medium">Successfully Uploaded</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-2">
                  {selectedResult.submissionStatus === 'pending' && (
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit to Portal</span>
                    </button>
                  )}
                  <button
                    onClick={() => exportReport(selectedResult)}
                    className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Report</span>
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                    View Certificate
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Result</h3>
              <p className="text-gray-500">Choose a test result to view detailed information</p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Submit Test Result</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium">Result ID: {selectedResult.id}</p>
                <p className="text-sm text-gray-600">Sample: {selectedResult.sampleId}</p>
                <p className="text-sm text-gray-600">Farm: {selectedResult.farmName}</p>
                <p className={`text-sm font-medium ${selectedResult.overallCompliant ? 'text-green-600' : 'text-red-600'}`}>
                  Status: {selectedResult.overallCompliant ? 'Compliant' : 'Non-Compliant'}
                </p>
              </div>
              
              {!selectedResult.overallCompliant && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Non-Compliant Result</p>
                      <p className="text-red-700 text-sm">
                        This result shows MRL violations. Submitting will trigger automatic alerts to regulatory authorities.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-600">
                This result will be automatically matched to the corresponding farm and batch records in the central portal.
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => submitResult(selectedResult.id)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Submit Result
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultSubmission;