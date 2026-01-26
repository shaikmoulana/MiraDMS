import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, LineChart as LineChartIcon } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sparkline from './charts/Sparkline';
import { useTimeRange } from '../contexts/TimeRangeContext';
import { getDataPointsForTimeRange, getTimeLabels, generateMetricData } from '../utils/dataGenerator';

// export default function DeviceTypeView() {
  export default function DeviceTypeView({ deviceType, onClose }) {
    const { type } = useParams();
    const navigate = useNavigate();
  const { timeRange } = useTimeRange();
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [roomFilter, setRoomFilter] = useState('all');

  // const deviceTypeName = type?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Devices';
  const deviceTypeName = deviceType?.name || 'Devices';


  const [temperatureData, setTemperatureData] = useState(() => {
    const dataPoints = getDataPointsForTimeRange(timeRange.option);
    const timeLabels = getTimeLabels(timeRange.option, dataPoints);
    return timeLabels.map((time, index) => ({
      time,
      temp: 20 + Math.random() * 5
    }));
  });

  // Update data when time range changes
  useEffect(() => {
    const dataPoints = getDataPointsForTimeRange(timeRange.option);
    const timeLabels = getTimeLabels(timeRange.option, dataPoints);
    setTemperatureData(timeLabels.map((time) => ({
      time,
      temp: 20 + Math.random() * 5
    })));
  }, [timeRange]);

  const getCurrentData = () => {
    return temperatureData;
  };

  const errorsByDevice = [
    { device: `${deviceType.name}-001`, errors: 12 },
    { device: `${deviceType.name}-002`, errors: 5 },
    { device: `${deviceType.name}-003`, errors: 18 },
    { device: `${deviceType.name}-004`, errors: 3 },
    { device: `${deviceType.name}-005`, errors: 9 },
  ];

  const rooms = [
    { name: 'ICU-1', devices: [`${deviceType.name}-001`, `${deviceType.name}-002`, `${deviceType.name}-003`] },
    { name: 'ICU-2', devices: [`${deviceType.name}-004`, `${deviceType.name}-005`, `${deviceType.name}-006`] },
    { name: 'ICU-3', devices: [`${deviceType.name}-007`, `${deviceType.name}-008`, `${deviceType.name}-009`] },
    { name: 'ER-1', devices: [`${deviceType.name}-010`, `${deviceType.name}-011`, `${deviceType.name}-012`] },
  ];

  const devices = [
    { 
      id: `${deviceType.name}-001`, 
      room: 'ICU-1', 
      status: 'healthy', 
      model: 'VentMaster 3000',
      healthTrend: Array.from({ length: 20 }, () => 85 + Math.random() * 10),
      lastCheck: '2 min ago'
    },
    { 
      id: `${deviceType.name}-002`, 
      room: 'ICU-1', 
      status: 'warning', 
      model: 'VentMaster 3000',
      healthTrend: Array.from({ length: 20 }, () => 65 + Math.random() * 15),
      lastCheck: '1 min ago'
    },
    { 
      id: `${deviceType.name}-003`, 
      room: 'ICU-1', 
      status: 'critical', 
      model: 'VentPro 2500',
      healthTrend: Array.from({ length: 20 }, () => 45 + Math.random() * 15),
      lastCheck: '30 sec ago'
    },
    { 
      id: `${deviceType.name}-004`, 
      room: 'ICU-2', 
      status: 'healthy', 
      model: 'VentMaster 3000',
      healthTrend: Array.from({ length: 20 }, () => 90 + Math.random() * 8),
      lastCheck: '3 min ago'
    },
    { 
      id: `${deviceType.name}-005`, 
      room: 'ICU-2', 
      status: 'healthy', 
      model: 'VentPro 2500',
      healthTrend: Array.from({ length: 20 }, () => 88 + Math.random() * 10),
      lastCheck: '1 min ago'
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'healthy') return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
    if (status === 'warning') return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' };
    return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
  };

  const getStatusForRoom = (room: string) => {
    const roomDevices = devices.filter(d => d.room === room);
    if (roomDevices.some(d => d.status === 'critical')) return 'critical';
    if (roomDevices.some(d => d.status === 'warning')) return 'warning';
    return 'healthy';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
  onClick={onClose}
  className="p-2 hover:bg-gray-100 rounded-lg"
>

          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-gray-900">{deviceTypeName}</h1>
          <p className="text-gray-600">City General Hospital</p>
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
            <label className="text-sm text-gray-600">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All</option>
              <option value="healthy">Healthy</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Room:</label>
            <select
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Rooms</option>
              <option value="ICU-1">ICU-1</option>
              <option value="ICU-2">ICU-2</option>
              <option value="ER-1">ER-1</option>
            </select>
          </div>
        </div>
      </div>

      {/* Temperature Trend Line Graph */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Device Temperature Trend ({timeRange.label})</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getCurrentData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
            <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Errors per Device Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Errors per Device</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={errorsByDevice}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="device" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="errors" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Device Status by Room Heatmap */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Device Status by Room</h3>
          <div className="space-y-4">
            {rooms.map((room) => {
              const status = getStatusForRoom(room.name);
              const colors = getStatusColor(status);
              
              return (
                <div key={room.name} className={`p-4 rounded-lg border-2 ${colors.border} ${colors.bg}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`${colors.text}`}>{room.name}</span>
                    <span className={`text-sm ${colors.text}`}>{room.devices.length} devices</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {room.devices.map((device) => {
                      const deviceData = devices.find(d => d.id === device);
                      const deviceColors = deviceData ? getStatusColor(deviceData.status) : getStatusColor('healthy');
                      
                      return (
                        <div
                          key={device}
                          className={`p-2 rounded text-center text-xs ${deviceColors.bg} ${deviceColors.text}`}
                        >
                          {device}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Device Table with Sparklines */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Device List</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700">Device ID</th>
                <th className="text-left py-3 px-4 text-gray-700">Room</th>
                <th className="text-left py-3 px-4 text-gray-700">Model</th>
                <th className="text-left py-3 px-4 text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-gray-700">Health Trend</th>
                <th className="text-left py-3 px-4 text-gray-700">Last Check</th>
                <th className="text-left py-3 px-4 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => {
                const colors = getStatusColor(device.status);
                
                return (
                  <tr key={device.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{device.id}</td>
                    <td className="py-3 px-4 text-gray-600">{device.room}</td>
                    <td className="py-3 px-4 text-gray-600">{device.model}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${colors.bg} ${colors.text}`}>
                        {device.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-32">
                        <Sparkline 
                          data={device.healthTrend} 
                          color={device.status === 'healthy' ? '#10b981' : device.status === 'warning' ? '#f59e0b' : '#ef4444'} 
                          height={30} 
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{device.lastCheck}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => navigate(`/device/${device.id}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}