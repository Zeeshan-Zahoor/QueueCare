import React, { useState } from 'react'
import { Hospital, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { resetClinicPasswordApi } from '../../api/clinicApi';

function ResetClinicPassword() {
  const navigate = useNavigate();

  const email = localStorage.getItem("clinicEmail");

  if(!email) {
    navigate("/clinic/forgot-password");
    return;
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    email,
    password: "",
  })
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const handleResetPassword = async () => {
    if(data.password !== confirmedPassword) {
      setError("Both passwords should match");
      return;
    }
    if(data.password.length < 6) {
      setError("Password should contain atleast 6 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await resetClinicPasswordApi(data);

      if(!res.success) {
        setError(res.message);
        return;
      }

      localStorage.removeItem("clinicEmail");
      localStorage.setItem("jwt_token", res.jwt_token);
      navigate(`/clinic/${res.clinicId}/dashboard`);
    } catch (error) {
      setError("Failed to rest password");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className="min-h-screen bg-gray-200 flex items-center justify-center px-4"
    >
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-10">
        {/* Icon + Title */}
        <div className="flex flex-col items-center mb-7">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-3 mb-3 shadow-sm">
            <Hospital width={40} height={40}
              className='text-slate-800'
            />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Create New Password
          </h1>
          <p className="text-sm text-gray-400 mt-0.5 text-center">
            Enter your new password. Make sure to set a strong password
          </p>
        </div>

        <div className="space-y-4">
          {/* new Password*/}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock width={15} />
            </span>
            <input
              type="password"
              placeholder="New Password"
              value={data.password}
              onChange={(e) => setData({
                ...data,
                password: e.target.value
              })}
              className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="relative -mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock width={15} />
            </span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          {error && (
            <p className='text-red-500 text-smn text-center'>{error}</p>
          )}

          {/* Send Code */}
          <button
            onClick={handleResetPassword}
            className="w-full text-white font-semibold py-2.5 rounded-lg text-sm transition-all duration-200 shadow-sm bg-slate-800 hover:bg-slate-700 mt-3"
            disabled={loading}
          >
            {loading ? "Reseting..." : "Reset Password"}
          </button>
        </div>
      </div>

    </div>
  );
}

export default ResetClinicPassword