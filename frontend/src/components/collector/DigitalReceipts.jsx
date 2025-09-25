import React, { useState } from 'react';
import { 
  Receipt, 
  QrCode, 
  Download, 
  Send, 
  Printer, 
  CheckCircle,
  FileText,
  Calendar,
  MapPin,
  Truck,
  Scale,
  Shield,
  Hash,
  Clock,
  User,
  Building,
  Search,
  Filter,
  Eye,
  Copy
} from 'lucide-react';

const DigitalReceipts = () => {
  const [selectedTab, setSelectedTab] = useState('generate');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Mock receipt data
  const receipts = [
    {
      id: 'RCP001',
      collectionId: 'COL001',
      farmName: 'Green Valley Dairy',
      farmerName: 'Rajesh Kumar',
      collectorName: 'Rohit Collector',
      date: '2025-09-25',
      time: '09:30 AM',
      quantity: 500,
      unit: 'Liters',
      status: 'completed',
      complianceScore: 98,
      blockchain: {
        txHash: '0x8f7c2e4d9b3a1f6e5d8c7a9b2e4f1d3c6e9b8a5f2d1c4e7b9a6f3e1d8c5b2a4',
        blockNumber: 456789,
        timestamp: '2025-09-25T09:45:00Z'
      },
      qrCode: 'QR_RCP001_GVD_250925',
      collection: {
        location: 'Village Khedi, Bhopal, MP',
        coordinates: { lat: 23.2599, lng: 77.4126 },
        vehicle: 'MP09-AB-1234',
        route: 'Route A - North Zone'
      },
      quality: {
        temperature: 4.2,
        ph: 6.7,
        fat: 4.1,
        snf: 8.9,
        grade: 'A'
      },
      mrlCompliance: {
        status: 'pass',
        lastTest: '2025-09-20',
        antibiotics: 'clear',
        hormones: 'clear'
      }
    },
    {
      id: 'RCP002',
      collectionId: 'COL002',
      farmName: 'Mountain View Farm',
      farmerName: 'Sunita Yadav',
      collectorName: 'Rohit Collector',
      date: '2025-09-25',
      time: '11:15 AM',
      quantity: 420,
      unit: 'Liters',
      status: 'completed',
      complianceScore: 94,
      blockchain: {
        txHash: '0x3a8f5e2d7c9b4f1a6e8d2c5b7e9a3f6d8c1b4e7a9f2e5d8c6b3a1f7e4d9c2b5',
        blockNumber: 456792,
        timestamp: '2025-09-25T11:30:00Z'
      },
      qrCode: 'QR_RCP002_MVF_250925',
      collection: {
        location: 'Village Barghat, Seoni, MP',
        coordinates: { lat: 22.0844, lng: 79.9705 },
        vehicle: 'MP09-AB-1234',
        route: 'Route A - North Zone'
      },
      quality: {
        temperature: 4.5,
        ph: 6.6,
        fat: 3.9,
        snf: 8.7,
        grade: 'A'
      },
      mrlCompliance: {
        status: 'pass',
        lastTest: '2025-09-19',
        antibiotics: 'clear',
        hormones: 'clear'
      }
    },
    {
      id: 'RCP003',
      collectionId: 'COL003',
      farmName: 'Sunrise Cattle Farm',
      farmerName: 'Priya Sharma',
      collectorName: 'Rohit Collector',
      date: '2025-09-24',
      time: '02:45 PM',
      quantity: 200,
      unit: 'Liters',
      status: 'conditional',
      complianceScore: 76,
      blockchain: {
        txHash: '0x5d2f8a3c6e1b9d4f7a2e8c5b1f9d6a3e7c4b8f2a5d9e1c6b4f7a3e8d2c5b9f1',
        blockNumber: 456785,
        timestamp: '2025-09-24T15:00:00Z'
      },
      qrCode: 'QR_RCP003_SCF_240925',
      collection: {
        location: 'Village Dhansu, Indore, MP',
        coordinates: { lat: 22.7196, lng: 75.8577 },
        vehicle: 'MP09-AB-1234',
        route: 'Route B - South Zone'
      },
      quality: {
        temperature: 4.8,
        ph: 6.5,
        fat: 3.7,
        snf: 8.4,
        grade: 'B'
      },
      mrlCompliance: {
        status: 'conditional',
        lastTest: '2025-09-18',
        antibiotics: 'traces_detected',
        hormones: 'clear'
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-green-100 border-green-300';
      case 'conditional': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'pending': return 'text-blue-700 bg-blue-100 border-blue-300';
      case 'failed': return 'text-red-700 bg-red-100 border-red-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-yellow-600 bg-yellow-100';
      case 'C': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || receipt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const generateNewReceipt = () => {
    console.log('Generating new receipt');
  };

  const downloadReceipt = (receiptId) => {
    console.log('Downloading receipt:', receiptId);
  };

  const printReceipt = (receiptId) => {
    console.log('Printing receipt:', receiptId);
  };

  const sendReceiptEmail = (receiptId) => {
    console.log('Sending receipt email:', receiptId);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  };

  const verifyBlockchain = (receipt) => {
    console.log('Verifying blockchain transaction:', receipt.blockchain.txHash);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Digital Receipts</h1>
          <p className="text-gray-600 mt-2">Blockchain-Verified Collection Receipts</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={generateNewReceipt}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Receipt className="w-4 h-4" />
            <span>Generate Receipt</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Receipts</p>
              <p className="text-2xl font-bold text-gray-800">{receipts.length}</p>
            </div>
            <Receipt className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-green-600">
                {receipts.filter(r => r.status === 'completed' && r.date === '2025-09-25').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Volume</p>
              <p className="text-2xl font-bold text-purple-600">
                {receipts.reduce((sum, r) => sum + r.quantity, 0)}L
              </p>
            </div>
            <Scale className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Blockchain Verified</p>
              <p className="text-2xl font-bold text-green-600">100%</p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b">
          <nav className="flex">
            {['generate', 'history', 'verification'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-4 text-sm font-medium capitalize ${
                  selectedTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Generate Tab */}
          {selectedTab === 'generate' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Generate New Receipt</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-4">Collection Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Farm Selection</label>
                        <select className="w-full border rounded-lg px-3 py-2">
                          <option>Select Farm...</option>
                          <option>Green Valley Dairy - Rajesh Kumar</option>
                          <option>Mountain View Farm - Sunita Yadav</option>
                          <option>Sunrise Cattle Farm - Priya Sharma</option>
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Collection Date</label>
                          <input
                            type="date"
                            className="w-full border rounded-lg px-3 py-2"
                            defaultValue="2025-09-25"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Collection Time</label>
                          <input
                            type="time"
                            className="w-full border rounded-lg px-3 py-2"
                            defaultValue="09:30"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                          <input
                            type="number"
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="Enter quantity"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                          <select className="w-full border rounded-lg px-3 py-2">
                            <option>Liters</option>
                            <option>Kilograms</option>
                            <option>Units</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
                        <input
                          type="text"
                          className="w-full border rounded-lg px-3 py-2"
                          placeholder="MP09-AB-1234"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800 mb-4">Quality Parameters</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
                          <input
                            type="number"
                            step="0.1"
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="4.2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">pH Level</label>
                          <input
                            type="number"
                            step="0.1"
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="6.7"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Fat Content (%)</label>
                          <input
                            type="number"
                            step="0.1"
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="4.1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">SNF (%)</label>
                          <input
                            type="number"
                            step="0.1"
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="8.9"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quality Grade</label>
                        <select className="w-full border rounded-lg px-3 py-2">
                          <option>Grade A</option>
                          <option>Grade B</option>
                          <option>Grade C</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-4">Compliance Status</h3>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">MRL Compliance</span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            Pass
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Last Test: September 20, 2025</p>
                          <p>Antibiotics: Clear</p>
                          <p>Hormones: Clear</p>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Withdrawal Periods</span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            Clear
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">No active withdrawal periods</p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Overall Compliance Score</span>
                          <span className="text-lg font-bold text-green-600">98%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800 mb-4">Blockchain Integration</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Record on blockchain</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Generate QR code</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Send SMS to farmer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Save Draft
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Generate Receipt
                </button>
              </div>
            </div>
          )}

          {/* History Tab */}
          {selectedTab === 'history' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Receipt History</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search receipts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="conditional">Conditional</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6">
                {filteredReceipts.map((receipt) => (
                  <div key={receipt.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{receipt.farmName}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(receipt.status)}`}>
                            {receipt.status}
                          </span>
                          <span className={`px-2 py-1 rounded text-sm ${getGradeColor(receipt.quality.grade)}`}>
                            Grade {receipt.quality.grade}
                          </span>
                        </div>
                        <p className="text-gray-600">Farmer: {receipt.farmerName}</p>
                        <p className="text-gray-600">Receipt ID: {receipt.id}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{receipt.quantity}{receipt.unit}</p>
                        <p className="text-sm text-gray-600">{receipt.date} {receipt.time}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <MapPin className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium">Location</span>
                        </div>
                        <p className="text-sm text-gray-700">{receipt.collection.location}</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Truck className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium">Vehicle</span>
                        </div>
                        <p className="text-sm text-gray-700">{receipt.collection.vehicle}</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Shield className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium">Compliance</span>
                        </div>
                        <p className="text-sm font-bold text-green-600">{receipt.complianceScore}%</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Hash className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium">Block #</span>
                        </div>
                        <p className="text-sm text-gray-700">{receipt.blockchain.blockNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => copyToClipboard(receipt.qrCode)}
                          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>QR: {receipt.qrCode}</span>
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => verifyBlockchain(receipt)}
                          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
                        >
                          <Shield className="w-4 h-4" />
                          <span>Verify on Blockchain</span>
                        </button>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedReceipt(receipt);
                            setShowReceiptModal(true);
                          }}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => downloadReceipt(receipt.id)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => printReceipt(receipt.id)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => sendReceiptEmail(receipt.id)}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Tab */}
          {selectedTab === 'verification' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Blockchain Verification</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-800">Receipt Verification</h3>
                </div>
                <p className="text-blue-700 mb-4">
                  Enter a receipt ID or QR code to verify its authenticity on the blockchain.
                </p>
                
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Enter Receipt ID or QR Code"
                    className="flex-1 border border-blue-300 rounded-lg px-4 py-2"
                  />
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    <QrCode className="w-4 h-4" />
                    <span>Scan QR</span>
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Verify
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Blockchain Statistics</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Total Receipts on Chain</span>
                        <span className="font-bold">{receipts.length}</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Latest Block Number</span>
                        <span className="font-bold">456792</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Network Status</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Recent Transactions</h3>
                  <div className="space-y-2">
                    {receipts.slice(0, 5).map((receipt) => (
                      <div key={receipt.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{receipt.id}</span>
                          <span className="text-xs text-gray-600">Block #{receipt.blockchain.blockNumber}</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate">
                          {receipt.blockchain.txHash}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">{receipt.farmName}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(receipt.blockchain.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Receipt Detail Modal */}
      {showReceiptModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">Digital Collection Receipt</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => downloadReceipt(selectedReceipt.id)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Receipt Content */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-800">VASUDHA Collection Receipt</h4>
                <p className="text-gray-600">Blockchain Verified • Receipt #{selectedReceipt.id}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="font-semibold mb-3">Collection Details</h5>
                  <div className="space-y-2 text-sm">
                    <p><strong>Farm:</strong> {selectedReceipt.farmName}</p>
                    <p><strong>Farmer:</strong> {selectedReceipt.farmerName}</p>
                    <p><strong>Collector:</strong> {selectedReceipt.collectorName}</p>
                    <p><strong>Date:</strong> {selectedReceipt.date}</p>
                    <p><strong>Time:</strong> {selectedReceipt.time}</p>
                    <p><strong>Location:</strong> {selectedReceipt.collection.location}</p>
                    <p><strong>Vehicle:</strong> {selectedReceipt.collection.vehicle}</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold mb-3">Product Details</h5>
                  <div className="space-y-2 text-sm">
                    <p><strong>Quantity:</strong> {selectedReceipt.quantity} {selectedReceipt.unit}</p>
                    <p><strong>Quality Grade:</strong> {selectedReceipt.quality.grade}</p>
                    <p><strong>Temperature:</strong> {selectedReceipt.quality.temperature}°C</p>
                    <p><strong>pH:</strong> {selectedReceipt.quality.ph}</p>
                    <p><strong>Fat Content:</strong> {selectedReceipt.quality.fat}%</p>
                    <p><strong>SNF:</strong> {selectedReceipt.quality.snf}%</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="font-semibold mb-3">MRL Compliance</h5>
                  <div className="space-y-2 text-sm">
                    <p><strong>Overall Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        selectedReceipt.mrlCompliance.status === 'pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {selectedReceipt.mrlCompliance.status.toUpperCase()}
                      </span>
                    </p>
                    <p><strong>Last MRL Test:</strong> {selectedReceipt.mrlCompliance.lastTest}</p>
                    <p><strong>Antibiotics:</strong> {selectedReceipt.mrlCompliance.antibiotics}</p>
                    <p><strong>Hormones:</strong> {selectedReceipt.mrlCompliance.hormones}</p>
                    <p><strong>Compliance Score:</strong> {selectedReceipt.complianceScore}%</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold mb-3">Blockchain Verification</h5>
                  <div className="space-y-2 text-sm">
                    <p><strong>Block Number:</strong> {selectedReceipt.blockchain.blockNumber}</p>
                    <p><strong>Transaction Hash:</strong></p>
                    <p className="font-mono text-xs break-all bg-white p-2 rounded border">
                      {selectedReceipt.blockchain.txHash}
                    </p>
                    <p><strong>Timestamp:</strong> {new Date(selectedReceipt.blockchain.timestamp).toLocaleString()}</p>
                    <p><strong>QR Code:</strong> {selectedReceipt.qrCode}</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6 border-t">
                <p className="text-sm text-gray-600 mb-2">
                  This receipt is digitally signed and recorded on blockchain for authenticity.
                </p>
                <p className="text-xs text-gray-500">
                  Verify at: https://blockchain.vasudha.gov.in/verify/{selectedReceipt.blockchain.txHash}
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowReceiptModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => printReceipt(selectedReceipt.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalReceipts;