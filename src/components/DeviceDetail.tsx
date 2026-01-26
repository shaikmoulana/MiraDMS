import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, AlertTriangle, Clock, Download, ThermometerSun, Zap, Cpu } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GaugeChart from './charts/GaugeChart';
import { useTimeRange } from '../contexts/TimeRangeContext';
import { getDataPointsForTimeRange, getTimeLabels } from '../utils/dataGenerator';

export default function DeviceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { timeRange } = useTimeRange();

  const device = {
    id: id || 'VNT-001',
    name: 'Ventilator Unit 001',
    model: 'VentMaster 3000',
    location: 'City General Hospital - ICU-1',
    status: 'healthy',
    lastMaintenance: '2024-11-15',
    nextMaintenance: '2025-01-15',
  };

  const [realTimeData, setRealTimeData] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      time: i,
      temperature: 22 + Math.random() * 3,
      power: 85 + Math.random() * 10,
      cpu: 40 + Math.random() * 20,
    }))
  );

  const [selectedMetric, setSelectedMetric] = useState('temperature');

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => [
        ...prev.slice(1),
        {
          time: prev[prev.length - 1].time + 1,
          temperature: 22 + Math.random() * 3,
          power: 85 + Math.random() * 10,
          cpu: 40 + Math.random() * 20,
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const data24h = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    temperature: 22 + Math.random() * 3,
    power: 85 + Math.random() * 10,
    cpu: 40 + Math.random() * 20,
  }));

  const data7d = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    temperature: 22 + Math.random() * 3,
    power: 85 + Math.random() * 10,
    cpu: 40 + Math.random() * 20,
  }));

  const data30d = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    temperature: 22 + Math.random() * 3,
    power: 85 + Math.random() * 10,
    cpu: 40 + Math.random() * 20,
  }));

  const errorsByType = [
    { type: 'Temperature Alert', count: 5 },
    { type: 'Power Fluctuation', count: 3 },
    { type: 'Sensor Error', count: 2 },
    { type: 'Connection Loss', count: 1 },
  ];

  const events = [
    { time: '2024-12-01 14:32', type: 'alert', message: 'Temperature exceeded threshold', severity: 'warning' },
    { time: '2024-12-01 10:15', type: 'maintenance', message: 'Routine calibration completed', severity: 'info' },
    { time: '2024-11-30 18:45', type: 'error', message: 'Sensor connection lost', severity: 'critical' },
    { time: '2024-11-30 18:46', type: 'recovery', message: 'Sensor connection restored', severity: 'success' },
    { time: '2024-11-29 09:20', type: 'alert', message: 'Power supply switch to backup', severity: 'warning' },
  ];

  const logs = [
    { timestamp: '2024-12-01 14:32:15', level: 'WARN', message: 'Temperature reading: 25.3°C - Above optimal range' },
    { timestamp: '2024-12-01 14:31:45', level: 'INFO', message: 'System health check completed - All systems nominal' },
    { timestamp: '2024-12-01 14:30:22', level: 'INFO', message: 'Data sync completed successfully' },
    { timestamp: '2024-12-01 14:29:55', level: 'ERROR', message: 'Failed to connect to sensor port 3 - Retrying...' },
    { timestamp: '2024-12-01 14:29:56', level: 'INFO', message: 'Sensor port 3 connection restored' },
  ];

  const currentHealth = 92.5;

  const getMetricConfig = (metric: string) => {
    switch (metric) {
      case 'temperature':
        return { label: 'Temperature (°C)', color: '#ef4444', unit: '°C' };
      case 'power':
        return { label: 'Power (%)', color: '#10b981', unit: '%' };
      case 'cpu':
        return { label: 'CPU Usage (%)', color: '#3b82f6', unit: '%' };
      default:
        return { label: 'Value', color: '#6b7280', unit: '' };
    }
  };

  const config = getMetricConfig(selectedMetric);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        {/* <button
          onClick={() => navigate('/hospitals')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button> */}
        <div className="flex-1">
          <h1 className="text-gray-900">{device.id}</h1>
          <p className="text-gray-600">{device.location}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-700">Operational</span>
        </div>
      </div>

      {/* Device Info Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Model</p>
          <p className="text-gray-900">{device.model}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Device ID</p>
          <p className="text-gray-900">{device.id}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Last Maintenance</p>
          <p className="text-gray-900">{device.lastMaintenance}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Next Maintenance</p>
          <p className="text-gray-900">{device.nextMaintenance}</p>
        </div>
      </div>

      {/* Current Metrics with Gauge */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-700">Device Health</p>
          </div>
          <GaugeChart value={currentHealth} size={120} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <ThermometerSun className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-sm text-gray-700">Temperature</p>
          </div>
          <p className="text-gray-900 mt-4">{realTimeData[realTimeData.length - 1].temperature.toFixed(1)}°C</p>
          <p className="text-sm text-green-600 mt-2">Within normal range</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-700">Power</p>
          </div>
          <p className="text-gray-900 mt-4">{realTimeData[realTimeData.length - 1].power.toFixed(1)}%</p>
          <p className="text-sm text-green-600 mt-2">Optimal performance</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-700">CPU Usage</p>
          </div>
          <p className="text-gray-900 mt-4">{realTimeData[realTimeData.length - 1].cpu.toFixed(1)}%</p>
          <p className="text-sm text-blue-600 mt-2">Normal load</p>
        </div>
      </div>

      {/* Real-time 30-second Rolling Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Real-time Monitoring (Last 30 seconds)</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedMetric('temperature')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                selectedMetric === 'temperature' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <ThermometerSun className="w-4 h-4" />
              Temperature
            </button>
            <button
              onClick={() => setSelectedMetric('power')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                selectedMetric === 'power' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Zap className="w-4 h-4" />
              Power
            </button>
            <button
              onClick={() => setSelectedMetric('cpu')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                selectedMetric === 'cpu' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Cpu className="w-4 h-4" />
              CPU
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={realTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} label={{ value: 'Seconds ago', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: config.label, angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="monotone" dataKey={selectedMetric} stroke={config.color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Historical Data - 24h, 7d, 30d */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Last 24 Hours</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data24h}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey={selectedMetric} stroke={config.color} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data7d}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey={selectedMetric} stroke={config.color} strokeWidth={2} dot={{ fill: config.color }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Last 30 Days</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data30d}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey={selectedMetric} stroke={config.color} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Error Count by Type */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Error Count by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={errorsByType} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="type" width={140} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#ef4444" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Event Timeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Event Timeline</h3>
          <div className="space-y-3 max-h-[250px] overflow-y-auto">
            {events.map((event, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    event.severity === 'critical' ? 'bg-red-500' :
                    event.severity === 'warning' ? 'bg-amber-500' :
                    event.severity === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  {index < events.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1"></div>}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm text-gray-600">{event.time}</p>
                  <p className="text-gray-900">{event.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logs and Recommended Actions */}
      <div className="grid grid-cols-2 gap-6">
        {/* Logs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">System Logs</h3>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <div className="space-y-2 max-h-[250px] overflow-y-auto font-mono text-xs">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  log.level === 'ERROR' ? 'bg-red-50 text-red-800' :
                  log.level === 'WARN' ? 'bg-amber-50 text-amber-800' :
                  'bg-gray-50 text-gray-800'
                }`}
              >
                <span className="text-gray-500">[{log.timestamp}]</span>{' '}
                <span className={`${
                  log.level === 'ERROR' ? 'text-red-600' :
                  log.level === 'WARN' ? 'text-amber-600' : 'text-blue-600'
                }`}>{log.level}</span>{' '}
                {log.message}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Recommended Actions</h3>
          <div className="space-y-3">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-900 mb-1">Temperature Monitoring</p>
                  <p className="text-sm text-amber-700">Temperature has exceeded optimal range 3 times in the last 24 hours. Consider checking cooling system.</p>
                  <button className="mt-2 px-3 py-1 bg-amber-600 text-white rounded text-sm hover:bg-amber-700">
                    Schedule Inspection
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-900 mb-1">Upcoming Maintenance</p>
                  <p className="text-sm text-blue-700">Next scheduled maintenance is due in 45 days. Prepare maintenance checklist.</p>
                  <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                    View Schedule
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-900 mb-1">Performance Optimal</p>
                  <p className="text-sm text-green-700">Device is operating within normal parameters. Continue regular monitoring.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}