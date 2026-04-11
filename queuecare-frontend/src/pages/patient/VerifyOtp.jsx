import React , { useState } from 'react'
import { Hospital } from 'lucide-react';
import Header from '../../components/common/Header';
import OTPInput from '../../components/common/OTPInput';

export default function VerifyOtp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [code, setCode] = useState("");


    const handleVerifyCode = () => {

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
          <h1 className="text-xl font-bold text-slate-800 mb-1">Verify Code</h1>
          <p className="text-xs text-gray-400 mt-2">Enter the code we just sent you on your registered Email</p>
        </div>

        {/* OTP input and verify */}
        <div className="w-full flex flex-col gap-3">
            
          {/* OTP input */}
          <div className='w-full flex justify-center'>
            <OTPInput 
            length={6}
            onChange={(val) => setCode(val)}
            onComplete={(val) => console.log("Completed Code: ", val)}
            />
          </div>

          {/* Verify Code Button */}
          <button 
            disabled={loading}
            onClick={handleVerifyCode}
            className="w-full py-3.5 mt-1 bg-slate-800 text-white rounded-4xl text-sm font-semibold hover:bg-slate-700 active:scale-[0.98] transition-all cursor-pointer">
            {loading ? "Verifying..." : "Verify"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

        </div>
      </div>
    </div>
  );
}

 