import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Activity, Building2, Mail, Lock } from 'lucide-react';
import MiraDMSLogo from '../assets/MiraDMSLogo3.png';


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = email.endsWith('@miraclesoft.com');
  const isValidPassword = password.length >= 8;

  const handleCredentialLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail && isValidPassword) {
      navigate('/dashboard');
    }
  };

  const handleSSOLogin = (provider: string) => {
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4"> 
            {/* <Activity className="w-8 h-8 text-white" /> */}
            <img className="max-w-[80px] max-h-[80px] object-contain" src={MiraDMSLogo} alt="MiraDMS Logo" />
          </div>
          <h1 className="text-gray-900 mb-2"><b>MiraDMS</b></h1>
          <p className="text-gray-600">Healthcare Equipment Monitoring System</p>
        </div>

        {/* Credential Login */}
        <form onSubmit={handleCredentialLogin} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <div
              className={`flex items-center gap-3 h-12 px-3 border rounded-lg focus-within:ring-2
                ${
                  email && !isValidEmail
                    ? 'border-red-500 focus-within:ring-red-500'
                    : 'border-gray-300 focus-within:ring-blue-500'
                }
              `}
            >
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-full outline-none text-sm"
              />
            </div>
            <p className="text-xs text-red-500 min-h-[16px]">
              {email && !isValidEmail
                ? 'Email must end with @miraclesoft.com'
                : ''}
            </p>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div
              className={`flex items-center gap-3 h-12 px-3 border rounded-lg focus-within:ring-2
                ${
                  password && !isValidPassword
                    ? 'border-red-500 focus-within:ring-red-500'
                    : 'border-gray-300 focus-within:ring-blue-500'
                }
              `}
            >
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 h-full outline-none text-sm"
              />
            </div>
            <p className="text-xs text-red-500 min-h-[16px]">
              {password && !isValidPassword
                ? 'Password must be at least 8 characters'
                : ''}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValidEmail || !isValidPassword}
            className="w-full h-12 bg-blue-600 text-white rounded-lg font-medium
              hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-400">OR</span>
          </div>
        </div>

        {/* SSO Login */}
        <div className="space-y-3">
          <h2 className="text-gray-900 text-center mb-3">
            Sign in with your organization
          </h2>

          <button
            onClick={() => handleSSOLogin('azure')}
            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-300 rounded-lg px-6 py-2 hover:border-blue-600 hover:bg-blue-50 transition-all"
          >
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-900">Sign in with Azure AD</span>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Secure access for healthcare professionals
          </p>
        </div>
      </div>
    </div>
  );
}
