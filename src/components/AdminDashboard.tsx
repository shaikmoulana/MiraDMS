import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, AlertTriangle, CheckCircle, XCircle, TrendingUp, TrendingDown } from 'lucide-react';
import Sparkline from './charts/Sparkline';
import { useTimeRange } from '../contexts/TimeRangeContext';
import { getDataPointsForTimeRange, getTimeLabels, generateTemperatureData, generateUptimeData, generateAlertRateData } from '../utils/dataGenerator';
import Gauge from './Gauge.tsx';

const deviceStatusData = [
  { name: 'Healthy', value: 145, color: '#10b981' },
  { name: 'Warning', value: 28, color: '#f59e0b' },
  { name: 'Critical', value: 12, color: '#ef4444' },
];

const hospitalDeviceData = [
  { name: 'City General', devices: 65 },
  { name: 'Metro Central', devices: 48 },
  { name: 'Westside Medical', devices: 42 },
  { name: 'North Valley', devices: 30 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { timeRange } = useTimeRange();

  // Generate data based on selected time range
  const dataPoints = getDataPointsForTimeRange(timeRange.option);
  const timeLabels = getTimeLabels(timeRange.option, dataPoints);

  const [alertsOverTime, setAlertsOverTime] = useState(() => {
    return timeLabels.map((time, index) => ({
      time,
      count: 5 + Math.floor(Math.random() * 15)
    }));
  });

  const [temperatureData, setTemperatureData] = useState(() => generateTemperatureData(timeRange.option));
  const [uptimeData, setUptimeData] = useState(() => generateUptimeData(timeRange.option));
  const [alertRateData, setAlertRateData] = useState(() => generateAlertRateData(timeRange.option));

  // Update data when time range changes
  useEffect(() => {
    const newTimeLabels = getTimeLabels(timeRange.option, getDataPointsForTimeRange(timeRange.option));
    setAlertsOverTime(newTimeLabels.map((time) => ({
      time,
      count: 5 + Math.floor(Math.random() * 15)
    })));
    setTemperatureData(generateTemperatureData(timeRange.option));
    setUptimeData(generateUptimeData(timeRange.option));
    setAlertRateData(generateAlertRateData(timeRange.option));
  }, [timeRange]);

  // Real-time updates for short time ranges only
  useEffect(() => {
    if (['5m', '15m', '30m'].includes(timeRange.option)) {
      const interval = setInterval(() => {
        setTemperatureData(prev => [...prev.slice(1), 20 + Math.random() * 5]);
        setUptimeData(prev => [...prev.slice(1), 95 + Math.random() * 5]);
        setAlertRateData(prev => [...prev.slice(1), Math.random() * 3]);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [timeRange]);

  const [alerts] = useState([
    { id: 1, time: '14:32:15', hospital: 'City General', device: 'Ventilator-23', severity: 'critical', message: 'Temperature exceeded threshold' },
    { id: 2, time: '14:31:48', hospital: 'Metro Central', device: 'Refrigerator-08', severity: 'warning', message: 'Door open for 5 minutes' },
    { id: 3, time: '14:30:22', hospital: 'Westside Medical', device: 'UPS-15', severity: 'critical', message: 'Battery backup activated' },
    { id: 4, time: '14:29:55', hospital: 'City General', device: 'Incubator-12', severity: 'warning', message: 'Humidity below optimal' },
  ]);

  const hospitals = [
    { id: 1, name: 'City General Hospital', status: 'healthy', devices: 65, critical: 2 },
    { id: 2, name: 'Metro Central Medical', status: 'warning', devices: 48, critical: 5 },
    { id: 3, name: 'Westside Medical Center', status: 'healthy', devices: 42, critical: 1 },
    { id: 4, name: 'North Valley Hospital', status: 'critical', devices: 30, critical: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">System Dashboard</h1>
          <p className="text-gray-600">Real-time monitoring across all facilities</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-700">All Systems Operational</span>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
      
      {/* Healthy Devices */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        
        <p className="text-sm text-gray-600 mb-2">Healthy Devices</p>
        <Gauge value={82} color="#16a34a" />
        <p className="text-sm text-green-600 s">+5% from yesterday</p>
      </div>

      {/* Warning */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <p className="text-sm text-gray-600 mb-2">Warning</p>
        <Gauge value={35} color="#d97706" />
        <p className="text-sm text-amber-600 mt-3">-2% from yesterday</p>
      </div>

      {/* Critical */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <p className="text-sm text-gray-600 mb-2">Critical</p>
        <Gauge value={18} color="#dc2626" />
        <p className="text-sm text-red-600 mt-3">+3 new alerts</p>
      </div>

      {/* Service Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <p className="text-sm text-gray-600 mb-2">Service Status</p>
        <Gauge value={92} color="#2563eb" />
        <p className="text-sm text-blue-600 mt-3">Across 4 hospitals</p>
      </div>
    </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Device Status Donut Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Device Health Status</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={deviceStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {deviceStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {deviceStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Devices per Hospital Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Devices per Hospital</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={hospitalDeviceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="devices" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts Over Time Line Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Alerts ({timeRange.label})</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={alertsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sparklines and Hospital Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Sparkline Cards */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Temperature (°C)</p>
            <span className="text-sm text-green-600">Normal</span>
          </div>
          <p className="text-gray-900 mb-3">{temperatureData[temperatureData.length - 1].toFixed(1)}°C</p>
          <Sparkline data={temperatureData} color="#10b981" height={60} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Device Uptime (%)</p>
            <span className="text-sm text-green-600">Excellent</span>
          </div>
          <p className="text-gray-900 mb-3">{uptimeData[uptimeData.length - 1].toFixed(1)}%</p>
          <Sparkline data={uptimeData} color="#3b82f6" height={60} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Alerts per Minute</p>
            <span className="text-sm text-amber-600">Moderate</span>
          </div>
          <p className="text-gray-900 mb-3">{alertRateData[alertRateData.length - 1].toFixed(2)}</p>
          <Sparkline data={alertRateData} color="#f59e0b" height={60} />
        </div>
      </div>

      {/* Hospital Grid and Live Alerts */}
      <div className="grid grid-cols-3 gap-6">
        {/* Hospital Status Grid */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Hospital Status Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                onClick={() => navigate(`/hospital/${hospital.id}`)}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-gray-900">{hospital.name}</h4>
                  <div className={`w-3 h-3 rounded-full ${
                    hospital.status === 'healthy' ? 'bg-green-500' :
                    hospital.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                  }`}></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 rounded px-3 py-2">
                    <p className="text-gray-600">Total Devices</p>
                    <p className="text-gray-900">{hospital.devices}</p>
                  </div>
                  <div className="bg-red-50 rounded px-3 py-2">
                    <p className="text-gray-600">Critical</p>
                    <p className="text-red-600">{hospital.critical}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Alert Ticker */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Live Alerts</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.severity === 'critical'
                    ? 'bg-red-50 border-red-500'
                    : 'bg-amber-50 border-amber-500'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs text-gray-500">{alert.time}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    alert.severity === 'critical'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-900 mb-1">{alert.device}</p>
                <p className="text-xs text-gray-600">{alert.hospital}</p>
                <p className="text-xs text-gray-700 mt-2">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}