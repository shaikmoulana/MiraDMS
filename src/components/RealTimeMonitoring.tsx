import Sparkline from './charts/Sparkline';
import { useNavigate } from 'react-router-dom';

export default function RealTimeMonitoring() {
    const navigate = useNavigate();
    const devices = [
    { 
      id: 'VNT-001', 
      room: 'ICU-1', 
      status: 'healthy', 
      model: 'VentMaster 3000',
      healthTrend: Array.from({ length: 20 }, () => 85 + Math.random() * 10),
      lastCheck: '2 min ago'
    },
    { 
      id: 'VNT-002', 
      room: 'ICU-1', 
      status: 'warning', 
      model: 'VentMaster 3000',
      healthTrend: Array.from({ length: 20 }, () => 65 + Math.random() * 15),
      lastCheck: '1 min ago'
    },
    { 
      id: 'VNT-003', 
      room: 'ICU-1', 
      status: 'critical', 
      model: 'VentPro 2500',
      healthTrend: Array.from({ length: 20 }, () => 45 + Math.random() * 15),
      lastCheck: '30 sec ago'
    },
    { 
      id: 'VNT-004', 
      room: 'ICU-2', 
      status: 'healthy', 
      model: 'VentMaster 3000',
      healthTrend: Array.from({ length: 20 }, () => 90 + Math.random() * 8),
      lastCheck: '3 min ago'
    },
    { 
      id: 'VNT-005', 
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
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Real-Time Monitoring</h2>

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