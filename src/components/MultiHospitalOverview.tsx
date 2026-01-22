import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Filter, AlertCircle, Building2, Activity, XCircle } from 'lucide-react';
import Sparkline from './charts/Sparkline';
import { useTimeRange } from '../contexts/TimeRangeContext';
import { generateMetricData } from '../utils/dataGenerator';

export default function MultiHospitalOverview() {
  const navigate = useNavigate();
  const { timeRange } = useTimeRange();
  const [severityFilter, setSeverityFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: 'City General Hospital',
      location: 'Downtown',
      totalDevices: 65,
      offline: 3,
      criticalAlerts: 2,
      status: 'healthy',
      healthData: [
        { name: 'Healthy', value: 58, color: '#10b981' },
        { name: 'Warning', value: 4, color: '#f59e0b' },
        { name: 'Critical', value: 3, color: '#ef4444' },
      ],
      deviceTypes: [
        { name: 'Ventilators', count: 18 },
        { name: 'Refrigerators', count: 15 },
        { name: 'Incubators', count: 12 },
        { name: 'UPS', count: 20 },
      ],
      temperatureTrend: generateMetricData(timeRange.option, 20, 25),
      lastUpdated: '2 min ago',
    },
    {
      id: 2,
      name: 'Metro Central Medical',
      location: 'Midtown',
      totalDevices: 48,
      offline: 5,
      criticalAlerts: 5,
      status: 'warning',
      healthData: [
        { name: 'Healthy', value: 38, color: '#10b981' },
        { name: 'Warning', value: 7, color: '#f59e0b' },
        { name: 'Critical', value: 3, color: '#ef4444' },
      ],
      deviceTypes: [
        { name: 'Ventilators', count: 12 },
        { name: 'Refrigerators', count: 10 },
        { name: 'Incubators', count: 8 },
        { name: 'UPS', count: 18 },
      ],
      temperatureTrend: generateMetricData(timeRange.option, 21, 27),
      lastUpdated: '1 min ago',
    },
    {
      id: 3,
      name: 'Westside Medical Center',
      location: 'West End',
      totalDevices: 42,
      offline: 1,
      criticalAlerts: 1,
      status: 'healthy',
      healthData: [
        { name: 'Healthy', value: 39, color: '#10b981' },
        { name: 'Warning', value: 2, color: '#f59e0b' },
        { name: 'Critical', value: 1, color: '#ef4444' },
      ],
      deviceTypes: [
        { name: 'Ventilators', count: 10 },
        { name: 'Refrigerators', count: 8 },
        { name: 'Incubators', count: 9 },
        { name: 'UPS', count: 15 },
      ],
      temperatureTrend: generateMetricData(timeRange.option, 19, 23),
      lastUpdated: '3 min ago',
    },
    {
      id: 4,
      name: 'North Valley Hospital',
      location: 'North District',
      totalDevices: 30,
      offline: 7,
      criticalAlerts: 4,
      status: 'critical',
      healthData: [
        { name: 'Healthy', value: 19, color: '#10b981' },
        { name: 'Warning', value: 7, color: '#f59e0b' },
        { name: 'Critical', value: 4, color: '#ef4444' },
      ],
      deviceTypes: [
        { name: 'Ventilators', count: 8 },
        { name: 'Refrigerators', count: 6 },
        { name: 'Incubators', count: 5 },
        { name: 'UPS', count: 11 },
      ],
      temperatureTrend: generateMetricData(timeRange.option, 22, 29),
      lastUpdated: '5 min ago',
    },
  ]);

  // Update hospital temperature trends when time range changes
  useEffect(() => {
    setHospitals(prevHospitals =>
      prevHospitals.map(hospital => ({
        ...hospital,
        temperatureTrend: generateMetricData(timeRange.option, 
          hospital.id === 1 ? 20 : hospital.id === 2 ? 21 : hospital.id === 3 ? 19 : 22,
          hospital.id === 1 ? 25 : hospital.id === 2 ? 27 : hospital.id === 3 ? 23 : 29
        )
      }))
    );
  }, [timeRange]);

  const filteredHospitals = hospitals.filter((hospital) => {
    if (severityFilter !== 'all' && hospital.status !== severityFilter) return false;
    if (locationFilter !== 'all' && hospital.location !== locationFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Multi-Hospital Overview</h1>
          <p className="text-gray-600">Monitor all healthcare facilities from a single view</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">Filters:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Severity:</label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All</option>
              <option value="healthy">Healthy</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Location:</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Locations</option>
              <option value="Downtown">Downtown</option>
              <option value="Midtown">Midtown</option>
              <option value="West End">West End</option>
              <option value="North District">North District</option>
            </select>
          </div>

          <div className="ml-auto text-sm text-gray-600">
            Showing {filteredHospitals.length} of {hospitals.length} hospitals
          </div>
        </div>
      </div>

      {/* Hospital Cards */}
      <div className="grid grid-cols-2 gap-6">
        {filteredHospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/hospital/${hospital.id}`)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  hospital.status === 'healthy' ? 'bg-green-100' :
                  hospital.status === 'warning' ? 'bg-amber-100' : 'bg-red-100'
                }`}>
                  <Building2 className={`w-6 h-6 ${
                    hospital.status === 'healthy' ? 'text-green-600' :
                    hospital.status === 'warning' ? 'text-amber-600' : 'text-red-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-gray-900">{hospital.name}</h3>
                  <p className="text-sm text-gray-600">{hospital.location}</p>
                  <p className="text-xs text-gray-500 mt-1">Updated {hospital.lastUpdated}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                hospital.status === 'healthy' ? 'bg-green-100 text-green-700' :
                hospital.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {hospital.status}
              </div>
            </div>

            {/* KPI Badges */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">Total Devices</p>
                <p className="text-blue-600">{hospital.totalDevices}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">Offline</p>
                <p className="text-gray-900">{hospital.offline}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">Critical Alerts</p>
                <p className="text-red-600">{hospital.criticalAlerts}</p>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Health Status Donut */}
              <div>
                <p className="text-sm text-gray-700 mb-3">Health Status</p>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={hospital.healthData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {hospital.healthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Device Types Bar Chart */}
              <div>
                <p className="text-sm text-gray-700 mb-3">Device Categories</p>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={hospital.deviceTypes}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Temperature Sparkline */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-700 mb-2">Temperature Trend ({timeRange.label})</p>
              <Sparkline data={hospital.temperatureTrend} color="#10b981" height={50} />
              <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                <span>Min: {Math.min(...hospital.temperatureTrend).toFixed(1)}°C</span>
                <span>Avg: {(hospital.temperatureTrend.reduce((a, b) => a + b, 0) / hospital.temperatureTrend.length).toFixed(1)}°C</span>
                <span>Max: {Math.max(...hospital.temperatureTrend).toFixed(1)}°C</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}