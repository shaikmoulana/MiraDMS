import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Activity, AlertTriangle, TrendingUp, Wind, Droplets, Zap, Server } from 'lucide-react';
import GaugeChart from './charts/GaugeChart';
import { useTimeRange } from '../contexts/TimeRangeContext';
import { getDataPointsForTimeRange, getTimeLabels } from '../utils/dataGenerator';
import { hospitalsBaseData } from './hospitals';

export default function HospitalView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { timeRange } = useTimeRange();

  const baseHospital = hospitalsBaseData.find(
    h => h.id === Number(id)
  );

  if (!baseHospital) return <p>Hospital not found</p>;
  
  const hospital = {
  ...baseHospital,
};

  const deviceStatusData = hospital.healthData;
  
  const deviceTypesData = hospital.deviceTypes.map(d => ({
  ...d,
  icon: Server, // or map icons if you want
}));


  const floorData = [
    { floor: 'ICU', healthy: 18, warning: 2, critical: 1 },
    { floor: 'ER', healthy: 12, warning: 1, critical: 0 },
    { floor: 'Lab', healthy: 15, warning: 0, critical: 1 },
    { floor: 'OR', healthy: 13, warning: 1, critical: 1 },
  ];

  const [alertsOverWeek, setAlertsOverWeek] = useState([
    { day: 'Mon', alerts: 12 },
    { day: 'Tue', alerts: 15 },
    { day: 'Wed', alerts: 8 },
    { day: 'Thu', alerts: 18 },
    { day: 'Fri', alerts: 14 },
    { day: 'Sat', alerts: 9 },
    { day: 'Sun', alerts: 11 },
  ]);

  // Update alerts data when time range changes
  useEffect(() => {
    const dataPoints = getDataPointsForTimeRange(timeRange.option);
    const timeLabels = getTimeLabels(timeRange.option, dataPoints);
    setAlertsOverWeek(timeLabels.map((time) => ({
      day: time,
      alerts: 5 + Math.floor(Math.random() * 15)
    })));
  }, [timeRange]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/hospitals')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-gray-900">{hospital.name}</h1>
          <p className="text-gray-600">{hospital.location}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-700">Operational</span>
        </div>
      </div>

      {/* Top Status Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Server className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Devices</p>
          <p className="text-gray-900">{hospital.totalDevices}</p>
          <p className="text-sm text-blue-600 mt-2">Across all floors</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Critical Devices</p>
<p className="text-gray-900">{hospital.healthData.find(d => d.name === 'Critical')?.value}</p>
          <p className="text-sm text-red-600 mt-2">Requires attention</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
            <Activity className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Warning Status</p>
<p className="text-gray-900">{hospital.healthData.find(d => d.name === 'Warning')?.value}</p>
          <p className="text-sm text-amber-600 mt-2">Monitor closely</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Uptime</p>
          <p className="text-gray-900">98.5%</p>
          <p className="text-sm text-green-600 mt-2">Last 30 days</p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Device Status Breakdown - Big Donut */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Device Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={deviceStatusData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
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
                <span className="text-gray-900">{item.value} devices</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Types Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Device Types</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={deviceTypesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts Over Week */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Alerts Trend ({timeRange.label})</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={alertsOverWeek}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="alerts" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Floor-wise Heatmap */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Floor-wise Device Status</h3>
        <div className="space-y-3">
          {floorData.map((floor) => {
            const total = floor.healthy + floor.warning + floor.critical;
            const healthyPercent = (floor.healthy / total) * 100;
            const warningPercent = (floor.warning / total) * 100;
            const criticalPercent = (floor.critical / total) * 100;

            return (
              <div key={floor.floor}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900">{floor.floor}</span>
                  <span className="text-sm text-gray-600">
                    {total} devices
                  </span>
                </div>
                <div className="flex h-8 rounded-lg overflow-hidden">
                  <div
                    className="bg-green-500 flex items-center justify-center text-sm text-white"
                    style={{ width: `${healthyPercent}%` }}
                  >
                    {floor.healthy > 0 && floor.healthy}
                  </div>
                  <div
                    className="bg-amber-500 flex items-center justify-center text-sm text-white"
                    style={{ width: `${warningPercent}%` }}
                  >
                    {floor.warning > 0 && floor.warning}
                  </div>
                  <div
                    className="bg-red-500 flex items-center justify-center text-sm text-white"
                    style={{ width: `${criticalPercent}%` }}
                  >
                    {floor.critical > 0 && floor.critical}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500 rounded"></div>
            <span className="text-sm text-gray-700">Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-700">Critical</span>
          </div>
        </div>
      </div>

      {/* Device Category Cards with Gauges */}
      <div className="grid grid-cols-5 gap-4">
        {deviceTypesData.map((deviceType, index) => {
          const Icon = deviceType.icon;
          const healthScore = 85 + Math.random() * 10;
          
          return (
            <div
              key={index}
              onClick={() => navigate(`/devices/${deviceType.name.toLowerCase().replace(/ /g, '-')}`)}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-500 hover:shadow-lg cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">{deviceType.name}</p>
                  <p className="text-xs text-gray-600">{deviceType.count} units</p>
                </div>
              </div>
              <GaugeChart value={healthScore} size={80} />
              <p className="text-center text-xs text-gray-600 mt-2">Health: {healthScore.toFixed(0)}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}