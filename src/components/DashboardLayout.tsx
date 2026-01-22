import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Building2, Server, Bell, User, Settings, LogOut } from 'lucide-react';
import TimeRangeSelector from './TimeRangeSelector';
import MiraDMSLogo from '../assets/MiraDMSlogo3.png';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

export default function DashboardLayout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path);

  // Check if we should show the time range selector (not on login page)
  const showTimeRangeSelector = !location.pathname.includes('/login');

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                {/* <Activity className="w-6 h-6 text-white" /> */}
                <img className="max-w-[80px] max-h-[80px] object-contain" src={MiraDMSLogo} alt="MiraDMS Logo" />
              </div>
              <div>
                <h1 className="text-gray-900">MiraDMS</h1>
                <p className="text-xs text-gray-500">Healthcare Equipment Monitoring System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {showTimeRangeSelector && <TimeRangeSelector />}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">System Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <div className="flex"> */}
      <div className="flex h-[calc(100vh-73px)] overflow-hidden">
        {/* Sidebar */}
        {/* <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]"> */}
        <aside className="w-64 bg-white border-r border-gray-200 top-[73px] left-0 h-[calc(100vh-73px)] overflow-y-auto">
          <nav className="p-4 space-y-1">
            <Link
              to="/hospitals"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/hospitals') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
            <LayoutDashboard className="w-5 h-5" />
              <span>All Hospitals</span>
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>Smart Health</span>
            </Link>

            <Link
              to="/devices/ventilators"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/devices') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Server className="w-5 h-5" />
              <span>Device Health</span>
            </Link>

                        <Link
              to="/performance"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/performance') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {/* <Server className="w-5 h-5" /> */}
              <TrendingUpOutlinedIcon sx={{fontSize:20}} />
              <span>Device Performance</span>
              
            </Link>

            <Link
            to="/monitoring"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/monitoring')
            ? 'bg-blue-50 text-blue-600': 'text-gray-700 hover:bg-gray-50'  }`
            }>
            <MonitorHeartOutlinedIcon sx={{ fontSize: 20 }} />
            <span>Real-Time Monitoring</span>
            </Link>

            <div className="pt-4 mt-4 border-t border-gray-200">
              {/* <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link> */}
              
              <Link
                to="/login"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        {/* <main className="flex-1 p-6">
          <Outlet />
        </main> */}
        <main className="flex-1 p-6 ml-64">
  <Outlet />
</main>

      </div>
    </div>
  );
}