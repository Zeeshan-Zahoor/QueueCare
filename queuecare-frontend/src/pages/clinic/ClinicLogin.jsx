import React, { useState } from 'react';
import { Building2, Phone, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginClinicApi } from '../../api/clinicApi.js';


function ClinicLogin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  })
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const handleSignIn = async () => {
    try {
      const res = await loginClinicApi(loginData);

      if(!res.success) {
        setError(res.message || "Login failed");
        return;
      }

      setError("");

      const clinicId = res.clinicId;
      localStorage.setItem("jwt_token", res.jwt_token);
      navigate(`/clinic/${clinicId}/dashboard`);

    } catch (error) {
      setError("Something went wrong");
    }
  }

  return (
    <div
      style={{ fontFamily: "'Segoe UI', sans-serif" }}
      className="min-h-screen bg-gray-200 flex items-center justify-center px-4"
    >
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
        {/* Icon + Title */}
        <div className="flex flex-col items-center mb-7">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-3 mb-3 shadow-sm">
            <Building2 width={40} height={40}
              className='text-slate-800'
            />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Clinic Login
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Access your clinic dashboard
          </p>
        </div>
 
        <div className="space-y-4">
          {/* Phone Number */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Phone width={15} />  
            </span>
            <input
              type="text"
              placeholder="Phone Number"
              value={loginData.phone}
              onChange={(e) =>
                setLoginData({ ...loginData, phone: e.target.value })
              }
              className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
 
          {/* Password */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
             <Lock width={15}/>
            </span>
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
            />
          </div>
 
          {/* Sign In — dark navy matching image */}
          <button
            onClick={handleSignIn}
            className="w-full text-white font-semibold py-2.5 rounded-lg text-sm transition-all duration-200 shadow-sm"
            style={{ backgroundColor: "#1e3a5f" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#162d4a"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1e3a5f"}
          >
            Sign In
          </button>
        </div>
 
        {/* Footer links */}
        <div className="mt-5 text-center space-y-2">
          <p className="text-xs text-gray-400">
            This is only for the clinic login. We will never ask for bank details
            or payments.
          </p>
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={() => setShowForgot(true)}
              className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              Forgot Password?
            </button>
            <span className="text-gray-300 text-xs">•</span>
            <button className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
 
      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-7">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Reset Password</h2>
            <p className="text-sm text-gray-400 mb-5">
              Enter your registered phone number. We'll send a reset code.
            </p>
            <div className="relative mb-4">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L8.5 10.5s1.063 2.938 5 5l1.113-1.724a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Registered phone number"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowForgot(false)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
              >
                Send Code
              </button>
            </div>
          </div>
        </div>
      )}
 
      {/* Error Toast */}
      {error !== "" && (
        <div className="fixed top-5 right-5 z-50">
          <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-lg px-4 py-3 min-w-72">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-sm font-medium text-red-800 flex-1">{error}</p>
            <button
              onClick={() => setError("")}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClinicLogin