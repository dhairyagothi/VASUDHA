import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Route, 
  Truck, 
  Calendar,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Settings,
  AlertTriangle,
  CheckCircle,
  Users,
  Timer,
  Fuel,
  Save
} from 'lucide-react';

const CollectionScheduling = () => {
  const [selectedView, setSelectedView] = useState('route');
  const [selectedDate, setSelectedDate] = useState('2025-09-25');
  const [showAddModal, setShowAddModal] = useState(false);
  const [optimizeLoading, setOptimizeLoading] = useState(false);

  // Mock route and scheduling data
  const routes = [
    {
      id: 'RT001',
      name: 'Route A - North Zone',
      date: '2025-09-25',
      status: 'active',
      farms: 8,
      estimatedTime: '6.5 hours',
      distance: '125 km',
      startTime: '08:00',
      endTime: '14:30',
      optimized: true,
      stops: [
        {
          id: 'ST001',
          farmName: 'Green Valley Dairy',
          farmerName: 'Rajesh Kumar',
          location: 'Village Khedi, Bhopal',
          coordinates: { lat: 23.2599, lng: 77.4126 },
          scheduledTime: '08:30',
          estimatedDuration: '30 mins',
          quantity: '500L',
          status: 'scheduled',
          priority: 'high',
          complianceStatus: 'approved'
        },
        {
          id: 'ST002',
          farmName: 'Sunrise Cattle Farm',
          farmerName: 'Priya Sharma',
          location: 'Village Dhansu, Indore',
          coordinates: { lat: 22.7196, lng: 75.8577 },
          scheduledTime: '10:15',
          estimatedDuration: '45 mins',
          quantity: '200L',
          status: 'conditional',
          priority: 'medium',
          complianceStatus: 'conditional'
        },
        {
          id: 'ST003',
          farmName: 'Heritage Livestock',
          farmerName: 'Amit Patel',
          location: 'Village Piparia, Jabalpur',
          coordinates: { lat: 23.1815, lng: 79.9864 },
          scheduledTime: '12:00',
          estimatedDuration: '25 mins',
          quantity: '0L',
          status: 'skipped',
          priority: 'low',
          complianceStatus: 'rejected'
        }
      ]
    },
    {
      id: 'RT002',
      name: 'Route B - South Zone',
      date: '2025-09-25',
      status: 'planned',
      farms: 6,
      estimatedTime: '5 hours',
      distance: '95 km',
      startTime: '09:00',
      endTime: '14:00',
      optimized: false,
      stops: [
        {
          id: 'ST004',
          farmName: 'Mountain View Farm',
          farmerName: 'Sunita Yadav',
          location: 'Village Barghat, Seoni',
          coordinates: { lat: 22.0844, lng: 79.9705 },
          scheduledTime: '09:30',
          estimatedDuration: '35 mins',
          quantity: '420L',
          status: 'scheduled',
          priority: 'high',
          complianceStatus: 'approved'
        }
      ]
    }
  ];

  const schedulingMetrics = {
    totalFarms: 247,
    scheduledToday: 18,
    routesActive: 3,
    averageEfficiency: 87,
    fuelSavings: 25,
    timeOptimization: 15
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-blue-700 bg-blue-100 border-blue-300';
      case 'conditional': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'completed': return 'text-green-700 bg-green-100 border-green-300';
      case 'skipped': return 'text-red-700 bg-red-100 border-red-300';
      case 'active': return 'text-green-700 bg-green-100 border-green-300';
      case 'planned': return 'text-gray-700 bg-gray-100 border-gray-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'conditional': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'skipped': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'active': return <Navigation className="w-4 h-4 text-green-600" />;
      case 'planned': return <Calendar className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const optimizeRoute = async (routeId) => {
    setOptimizeLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Route optimized:', routeId);
      setOptimizeLoading(false);
    }, 2000);
  };

  const addNewRoute = () => {
    setShowAddModal(true);
  };

  const duplicateRoute = (routeId) => {
    console.log('Duplicating route:', routeId);
  };

  const deleteRoute = (routeId) => {
    console.log('Deleting route:', routeId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Collection Scheduling</h1>
          <p className="text-gray-600 mt-2">Route Optimization & Farm Visit Planning</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={addNewRoute}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>New Route</span>
          </button>
          <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Farms</p>
              <p className="text-2xl font-bold text-gray-800">{schedulingMetrics.totalFarms}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled Today</p>
              <p className="text-2xl font-bold text-blue-600">{schedulingMetrics.scheduledToday}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Routes</p>
              <p className="text-2xl font-bold text-green-600">{schedulingMetrics.routesActive}</p>
            </div>
            <Route className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Efficiency</p>
              <p className="text-2xl font-bold text-purple-600">{schedulingMetrics.averageEfficiency}%</p>
            </div>
            <Timer className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Fuel Savings</p>
              <p className="text-2xl font-bold text-green-600">{schedulingMetrics.fuelSavings}%</p>
            </div>
            <Fuel className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Time Saved</p>
              <p className="text-2xl font-bold text-orange-600">{schedulingMetrics.timeOptimization}%</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Date Selection and View Toggle */}
      <div className="bg-white rounded-lg shadow-lg mb-8">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <label className="font-medium text-gray-800">Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedView('route')}
                className={`px-4 py-2 rounded-lg ${
                  selectedView === 'route'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Route View
              </button>
              <button
                onClick={() => setSelectedView('schedule')}
                className={`px-4 py-2 rounded-lg ${
                  selectedView === 'schedule'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Schedule View
              </button>
            </div>
          </div>
        </div>

        {/* Routes Display */}
        <div className="p-6">
          <div className="space-y-6">
            {routes.map((route) => (
              <div key={route.id} className="border rounded-lg overflow-hidden">
                {/* Route Header */}
                <div className="bg-gray-50 p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold text-gray-800">{route.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(route.status)}`}>
                        {route.status}
                      </span>
                      {route.optimized && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Optimized
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => optimizeRoute(route.id)}
                        disabled={optimizeLoading}
                        className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 ${optimizeLoading ? 'animate-spin' : ''}`} />
                        <span>Optimize</span>
                      </button>
                      <button
                        onClick={() => duplicateRoute(route.id)}
                        className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteRoute(route.id)}
                        className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4 mt-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span>{route.farms} farms</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span>{route.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Route className="w-4 h-4 text-gray-600" />
                      <span>{route.distance}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-gray-600" />
                      <span>{route.startTime} - {route.endTime}</span>
                    </div>
                  </div>
                </div>

                {/* Route Stops */}
                <div className="p-4">
                  <div className="space-y-3">
                    {route.stops.map((stop, index) => (
                      <div key={stop.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-gray-800">{stop.farmName}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(stop.status)}`}>
                              {stop.status}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(stop.priority)}`}>
                              {stop.priority}
                            </span>
                          </div>
                          
                          <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <p><strong>Farmer:</strong> {stop.farmerName}</p>
                              <p><strong>Location:</strong> {stop.location}</p>
                            </div>
                            <div>
                              <p><strong>Scheduled:</strong> {stop.scheduledTime}</p>
                              <p><strong>Duration:</strong> {stop.estimatedDuration}</p>
                            </div>
                            <div>
                              <p><strong>Quantity:</strong> {stop.quantity}</p>
                              <p><strong>Compliance:</strong> 
                                <span className={`ml-1 px-2 py-1 text-xs rounded ${getStatusColor(stop.complianceStatus)}`}>
                                  {stop.complianceStatus}
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(stop.status)}
                              <span>{stop.status}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            <MapPin className="w-4 h-4" />
                          </button>
                          <button className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Route Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-semibold mb-6">Create New Route</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Route Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter route name"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full border rounded-lg px-3 py-2"
                    defaultValue={selectedDate}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    className="w-full border rounded-lg px-3 py-2"
                    defaultValue="08:00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zone/Area</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>North Zone</option>
                  <option>South Zone</option>
                  <option>East Zone</option>
                  <option>West Zone</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="auto-optimize" defaultChecked />
                <label htmlFor="auto-optimize" className="text-sm text-gray-700">
                  Automatically optimize route
                </label>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Create Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionScheduling;