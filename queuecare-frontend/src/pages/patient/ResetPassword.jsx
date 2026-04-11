import React, { useState } from 'react'
import { Hospital, Lock } from "lucide-react";
import Header from '../../components/common/Header';

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleResetPassword = () => {
        
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-lg w-full h-screen sm:max-w-sm sm:h-auto sm:max-h-[90%] px-8 py-10 flex flex-col items-center">
        <Header />

        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <Hospital size={50} className="text-slate-800"/>
          <span className="text-base font-semibold tracking-tight">
            <span className="text-gray-500">Queue</span>
            <span className="text-slate-800 font-bold">Care</span>
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-7">
          <h1 className="text-xl font-bold text-slate-800 mb-1">Create new password</h1>
          <p className="text-xs text-gray-400">Enter your new password. Make sure to set a strong password</p>
        </div>

        {/* Form */}
        <div className="w-full flex flex-col gap-3">
            
          {/* new password */}
          <div className="relative flex items-center">
            <span className="absolute left-3.5 pointer-events-none flex items-center">
              <Lock size={18} className="text-gray-400"/>
            </span>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-slate-800 bg-gray-50 outline-none focus:border-[#1a2744] transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* confirm password */}
          <div className="relative flex items-center">
            <span className="absolute left-3.5 pointer-events-none flex items-center">
              <Lock size={18} className="text-gray-400"/>
            </span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-slate-800 bg-gray-50 outline-none focus:border-[#1a2744] transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Send Code Button */}
          <button 
            disabled={loading}
            onClick={handleResetPassword}
            className="w-full py-3.5 mt-3 bg-slate-800 text-white rounded-4xl text-sm font-semibold hover:bg-slate-700 active:scale-[0.98] transition-all cursor-pointer">
            {loading ? "Reseting..." : "Reset Password"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

        </div>
      </div>
    </div>
  );
}
