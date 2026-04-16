import React, { useState } from 'react';
import { Hospital, Lock, AlertCircle, Mail } from 'lucide-react';
import { replace, useNavigate } from 'react-router-dom';
import { loginClinicApi } from '../../api/clinicApi.js';


function ClinicLogin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const handleSignIn = async () => {
    if(!loginData.email || !loginData.password) {
      setError("Please enter all required fields");
      return;
    }

    if(!isValidEmail(loginData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const res = await loginClinicApi(loginData);

      if(!res.success) {
        setError(res.message || "Login failed");
        return;
      }

      setError("");

      const clinicId = res.clinicId;
      localStorage.setItem("jwt_token", res.jwt_token);
      navigate(`/clinic/${clinicId}/dashboard`, { replace: true });

    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-gray-200 flex items-center justify-center px-4"
    >
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
        {/* Icon + Title */}
        <div className="flex flex-col items-center mb-7">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-3 mb-3 shadow-sm">
            <Hospital width={40} height={40}
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
          {/* Email */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Mail width={15} />  
            </span>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
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

          {error && (
            <p className='text-red-500 text-center text-sm'>{error}</p>
          )}
 
          {/* Sign In */}
          <button
            onClick={handleSignIn}
            className="w-full text-white font-semibold py-2.5 rounded-lg text-sm transition-all duration-200 shadow-sm bg-slate-800 hover:bg-slate-700"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
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
              onClick={() => navigate("forgot-password")}
              className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              Forgot Password?
            </button>
            <span className="text-gray-300 text-xs">|</span>
            <a 
            href="mailto:queuecare4@gmail.com?subject=QueueCare Query"
            className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
          <button
              onClick={() => navigate("/login")}
              className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors hover:underline cursor-pointer"
            >
               Sign In as Patient
            </button>
        </div>
      </div>

    </div>
  );
}

export default ClinicLogin