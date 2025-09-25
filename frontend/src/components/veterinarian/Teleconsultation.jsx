import React, { useState } from 'react';
import { Video, MessageCircle, Phone, User, Calendar, Clock, Search, Filter } from 'lucide-react';

const Teleconsultation = () => {
  const [consultations, setConsultations] = useState([
    {
      id: 'TC001',
      farmerId: 'F001',
      farmerName: 'Rajesh Kumar',
      animalId: 'C001',
      animalName: 'Ganga',
      issue: 'Sudden decrease in milk production',
      priority: 'medium',
      status: 'scheduled',
      scheduledTime: '2025-09-25T14:00:00Z',
      duration: '30 mins',
      type: 'video',
      notes: 'First consultation for this issue'
    },
    {
      id: 'TC002',
      farmerId: 'F002',
      farmerName: 'Sunita Sharma',
      animalId: 'B003',
      animalName: 'Vrishabh',
      issue: 'Post-treatment follow-up for respiratory infection',
      priority: 'low',
      status: 'completed',
      scheduledTime: '2025-09-24T10:00:00Z',
      completedTime: '2025-09-24T10:25:00Z',
      duration: '25 mins',
      type: 'video',
      notes: 'Treatment showing positive results'
    },
    {
      id: 'TC003',
      farmerId: 'F003',
      farmerName: 'Amit Patel',
      animalId: 'C005',
      animalName: 'Lakshmi',
      issue: 'Suspected mastitis symptoms',
      priority: 'high',
      status: 'active',
      scheduledTime: '2025-09-25T16:30:00Z',
      duration: '45 mins',
      type: 'video',
      notes: 'Emergency consultation requested'
    }
  ]);

  const [activeChat, setActiveChat] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.animalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.issue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || consultation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startVideoCall = (consultation) => {
    // Video call implementation
    console.log('Starting video call for:', consultation.id);
  };

  const startChat = (consultation) => {
    setActiveChat(consultation);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Teleconsultation</h1>
          <p className="text-gray-600 mt-2">Remote consultations with farmers</p>
        </div>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          <Calendar className="w-5 h-5" />
          <span>Schedule Consultation</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by farmer name, animal ID, or issue..."
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
            <option value="scheduled">Scheduled</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Consultations List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Consultations ({filteredConsultations.length})</h2>
            </div>
            
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredConsultations.map((consultation) => (
                <div key={consultation.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-800">
                          {consultation.farmerName}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(consultation.priority)}`}>
                          {consultation.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(consultation.status)}`}>
                          {consultation.status}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600">Animal: {consultation.animalName} ({consultation.animalId})</p>
                          <p className="text-sm text-gray-600">Farmer ID: {consultation.farmerId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Scheduled: {new Date(consultation.scheduledTime).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">Duration: {consultation.duration}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="font-medium text-gray-800 mb-1">Issue:</p>
                        <p className="text-gray-600 text-sm">{consultation.issue}</p>
                      </div>
                      
                      {consultation.notes && (
                        <div className="mb-4">
                          <p className="font-medium text-gray-800 mb-1">Notes:</p>
                          <p className="text-gray-600 text-sm">{consultation.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4 flex flex-col space-y-2">
                      {consultation.status === 'active' && (
                        <>
                          <button
                            onClick={() => startVideoCall(consultation)}
                            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                          >
                            <Video className="w-4 h-4" />
                            <span>Join Call</span>
                          </button>
                          <button
                            onClick={() => startChat(consultation)}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Chat</span>
                          </button>
                        </>
                      )}
                      {consultation.status === 'scheduled' && (
                        <>
                          <button
                            onClick={() => startVideoCall(consultation)}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                          >
                            <Video className="w-4 h-4" />
                            <span>Start Call</span>
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                            Reschedule
                          </button>
                        </>
                      )}
                      {consultation.status === 'completed' && (
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                          View Report
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Panel / Today's Schedule */}
        <div className="space-y-6">
          {activeChat ? (
            /* Chat Interface */
            <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{activeChat.farmerName}</h3>
                    <p className="text-sm text-gray-600">{activeChat.animalName}</p>
                  </div>
                  <button
                    onClick={() => setActiveChat(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-xs">
                      <p className="text-sm">Hello! I received your consultation request. Can you describe the symptoms in more detail?</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 max-w-xs">
                      <p className="text-sm">The cow has been showing reduced milk production for 3 days now. Also seems lethargic.</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-xs">
                      <p className="text-sm">Any changes in appetite or temperature? Have you checked for mastitis?</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Today's Schedule */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Today's Schedule
                </h3>
                <div className="space-y-3">
                  {consultations
                    .filter(c => new Date(c.scheduledTime).toDateString() === new Date().toDateString())
                    .map((consultation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{consultation.farmerName}</p>
                        <p className="text-gray-600 text-xs">{consultation.animalName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {new Date(consultation.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-xs text-gray-500">{consultation.duration}</p>
                      </div>
                    </div>
                  ))}
                  {consultations.filter(c => new Date(c.scheduledTime).toDateString() === new Date().toDateString()).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No consultations scheduled for today</p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700">
                    <Video className="w-5 h-5" />
                    <span>Start Emergency Call</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700">
                    <MessageCircle className="w-5 h-5" />
                    <span>Send Broadcast Message</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50">
                    <Clock className="w-5 h-5" />
                    <span>View Call History</span>
                  </button>
                </div>
              </div>

              {/* Connection Status */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Connection Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Video Quality</span>
                    <span className="text-green-600 font-medium">Good</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Network</span>
                    <span className="text-green-600 font-medium">Stable</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Audio</span>
                    <span className="text-green-600 font-medium">Clear</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Schedule New Consultation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farmer ID</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter farmer ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Animal ID</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter animal ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Description</label>
                <textarea
                  rows="3"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Describe the issue..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Time</label>
                <input
                  type="datetime-local"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teleconsultation;