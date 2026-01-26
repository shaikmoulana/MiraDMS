import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TimeRangeProvider } from './contexts/TimeRangeContext';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import AdminDashboard from './components/AdminDashboard';
import MultiHospitalOverview from './components/MultiHospitalOverview';
import HospitalView from './components/HospitalView';
import DeviceTypeView from './components/DeviceTypeView';
import DeviceDetail from './components/DeviceDetail';
import DevicePerformance from './components/DevicePerformance';
import RealTimeMonitoring from './components/RealTimeMonitoring';

export default function App() {
  return (
    <TimeRangeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardLayout />}>
            {/* <Route index element={<Navigate to="/dashboard" replace />} />   */}
            <Route index element={<Navigate to="/login" replace />} />  
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="hospitals" element={<MultiHospitalOverview />} />
            <Route path="hospital/:id" element={<HospitalView />} />
            <Route path="devices/:type" element={<DeviceTypeView />} />
            {/* <Route path="device/:id" element={<DeviceDetail />} /> */}
            <Route path="performance" element={<DevicePerformance />} />
            <Route path="monitoring" element={<RealTimeMonitoring />} />
          </Route>
        </Routes>
      </Router>
    </TimeRangeProvider>
  );
}