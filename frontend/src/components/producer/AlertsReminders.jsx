import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, Filter } from 'lucide-react';

const AlertsReminders = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'withdrawal',
      priority: 'high',
      title: 'Withdrawal Period Ending',
      message: 'Cow ID: C001 - Withdrawal period ends in 6 hours',
      animalId: 'C001',
      timestamp: '2025-09-25T14:30:00Z',
      status: 'active',
      actionRequired: true
    },
    {
      id: 2,
      type: 'treatment',
      priority: 'medium',
      title: 'Treatment Reminder',
      message: 'Schedule next treatment for Bull ID: B003',
      animalId: 'B003',
      timestamp: '2025-09-25T10:15:00Z',
      status: 'active',
      actionRequired: false
    },
    {
      id: 3,
      type: 'vaccination',
      priority: 'medium',
      title: 'Vaccination Due',
      message: 'FMD vaccination due for 5 animals',
      timestamp: '2025-09-25T08:00:00Z',
      status: 'active',
      actionRequired: true
    },
    {
      id: 4,
      type: 'compliance',
      priority: 'low',
      title: 'MRL Compliance Update',
      message: 'Your farm compliance score improved to 98%',
      timestamp: '2025-09-24T16:45:00Z',
      status: 'read',
      actionRequired: false
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'withdrawal': return <Clock className="w-5 h-5" />;
      case 'treatment': return <Bell className="w-5 h-5" />;
      case 'vaccination': return <CheckCircle className="w-5 h-5" />;
      case 'compliance': return <AlertTriangle className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return alert.status === 'active';
    if (filter === 'action') return alert.actionRequired;
    return alert.type === filter;
  });

  const markAsRead = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: 'read' } : alert
    ));
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Alerts & Reminders</h2>
            <p className="text-gray-600">Stay updated on critical farm activities</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
            </button>
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {alerts.filter(a => a.status === 'active').length}
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 p-6 border-b bg-gray-50">
          {['all', 'unread', 'action', 'withdrawal', 'treatment', 'vaccination', 'compliance'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded-full text-sm capitalize ${
                filter === filterType
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-blue-50'
              }`}
            >
              {filterType}
              {filterType === 'all' && ` (${alerts.length})`}
              {filterType === 'unread' && ` (${alerts.filter(a => a.status === 'active').length})`}
              {filterType === 'action' && ` (${alerts.filter(a => a.actionRequired).length})`}
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="divide-y">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No alerts matching your filter</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-6 hover:bg-gray-50 ${
                  alert.status === 'active' ? 'bg-blue-25' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${getPriorityColor(alert.priority)}`}>
                      {getTypeIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${getPriorityColor(alert.priority)}`}>
                          {alert.priority}
                        </span>
                        {alert.actionRequired && (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                            Action Required
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{alert.message}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        {alert.animalId && <span>Animal: {alert.animalId}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {alert.status === 'active' && (
                      <button
                        onClick={() => markAsRead(alert.id)}
                        className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                {alert.actionRequired && (
                  <div className="mt-4 flex space-x-2">
                    {alert.type === 'withdrawal' && (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                        Mark Ready for Market
                      </button>
                    )}
                    {alert.type === 'treatment' && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                        Log Treatment
                      </button>
                    )}
                    {alert.type === 'vaccination' && (
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
                        Schedule Vaccination
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="border-t p-6 bg-gray-50">
            <h3 className="font-semibold mb-4">Notification Settings</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" defaultChecked />
                  <span>Withdrawal period alerts</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" defaultChecked />
                  <span>Treatment reminders</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" defaultChecked />
                  <span>Vaccination schedules</span>
                </label>
              </div>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span>MRL compliance updates</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" defaultChecked />
                  <span>Veterinary consultations</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span>Market price alerts</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsReminders;