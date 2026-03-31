import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginClinicApi } from '../../api/clinicApi.js';


function ClinicLogin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  })
  const [error, setError] = useState("");

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
    <div className='w-dvw h-dvh bg-gray-200 px-4'>
      <div className='max-w-md p-6 py-15 pt-10 m-auto bg-white rounded-2xl flex flex-col space-y-2 gap-2 translate-y-1/3 shadow-2xl'>
        <div className='w-full flex flex-col items-center'>
          <Building2 className='w-15 h-15 text-slate-800' />
          <h1 className='text-xl font-bold text-slate-800'>Clinic Login</h1>
          <p className='text-sm text-slate-500 font-,medium'>Acces your clinic dashboard</p>
        </div>

        <input
          type="text"
          placeholder='Enter phone number'
          value={loginData.phone}
          onChange={(e) => setLoginData({
            ...loginData,
            phone: e.target.value
          })}
          className='w-full border rounded-lg p-2'

        />
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={(e) => setLoginData({
            ...loginData,
            password: e.target.value
          })}
          placeholder='Enter password'
          className='w-full border rounded-lg p-2'
        />
        <button
          onClick={handleSignIn}
          className='mt-5 bg-slate-800 text-white p-2 rounded-lg'
        >
          Sign In
        </button>
      </div>


      {/* Error Toast */}
      {error !== "" && (
        <div className="fixed top-5 left-1/4 z-50">
          <div className="flex items-center gap-3 rounded-lg bg-red-500 text-white px-4 py-3 shadow-lg animate-slide-in">
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
              />
            </svg>

            {/* Message */}
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClinicLogin