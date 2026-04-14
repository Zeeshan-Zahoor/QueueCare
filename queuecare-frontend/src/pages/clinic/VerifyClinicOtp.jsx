import React, { useState } from 'react'
import { Hospital, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OTPInput from '../../components/common/OTPInput';

function VerifyClinicOtp() {
    const navigate = useNavigate();

    const [loading, SetLoading] = useState(false);
    const [error, SetError] = useState(false);


    const [data, setData] = useState({
          email: "",
          otp: "",
        })

    const handleVerifyOtp = () => { 
        navigate("/clinic/reset-password")
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
            Verify OTP
          </h1>
          <p className="text-sm text-gray-400 mt-0.5 text-center">
            Enter the 5-digit OTP sent to your registered email.
          </p>
        </div>

        <div className="space-y-4 flex flex-col items-center">
          <OTPInput 
            length={5}
            onChange={(val) => setData(prev => ({
                ...prev, 
                otp: val,
            }))}
            onComplete={(val) => console.log("Completed OTP: ", val)}
          />

          {error && (
            <p className='text-red-500 text-smn text-center'>{error}</p>
          )}

          {/* Verify Code */}
          <button
            onClick={handleVerifyOtp}
            className="w-full text-white font-semibold py-2.5 rounded-lg text-sm transition-all duration-200 shadow-sm bg-slate-800 hover:bg-slate-700"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>

    </div>
  );
}

export default VerifyClinicOtp