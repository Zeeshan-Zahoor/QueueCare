import React, { useState } from 'react'
import { Hospital, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { forgotClincPasswordApi } from '../../api/clinicApi';

function ForgotClinicPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const handleSendCode = async () => {  
    if(!email) {
      setError("Please enter a valid email")
      return;
    }
    try {
      setLoading(true);
      const res = await forgotClincPasswordApi(email);

      if(!res.success) {
        setError(res.message);
        return;
      }

      localStorage.setItem("clinicEmail", email);
      navigate("/clinic/verify-otp");

    } catch (error) {
      setError("Error generating OTP");
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
            Forgot Password?
          </h1>
          <p className="text-sm text-gray-400 mt-0.5 text-center">
            Enter your Email, we will send you a verification code.
          </p>
        </div>

        <div className="space-y-4">
          {/* Phone Number */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail width={15} />
            </span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          {error && (
            <p className='text-red-500 text-smn text-center'>{error}</p>
          )}

          {/* Send Code */}
          <button
            onClick={handleSendCode}
            className="w-full text-white font-semibold py-2.5 rounded-lg text-sm transition-all duration-200 shadow-sm bg-slate-800 hover:bg-slate-700"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Code"}
          </button>
        </div>
      </div>

    </div>
  );
}

export default ForgotClinicPassword