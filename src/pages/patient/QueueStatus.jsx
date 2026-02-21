import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { clinics } from '../../data/mockData';
import { useContext } from 'react';
import { QueueContext } from '../../contexts/QueueContext';

export default function QueueStatus() {
  
  const { doctorId  } = useParams();
  const id = Number(doctorId);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const token = Number(searchParams.get("token"));
  

  const clinic = clinics.find((c) => (
    c.doctors.some((d) => d.id === id)
  ));

  if(!clinic)  return <p>Doctor not found</p>

  const doctor = clinic.doctors.find((d) => d.id === id);

  const { doctorData } = useContext(QueueContext);

  const doctorInfo = doctorData[id] || doctor;

  const currentToken = doctorInfo.currentlyServing;

  const peopleAhead = token - doctorInfo.currentlyServing;

  const estimatedWait = peopleAhead * doctorInfo.consultationTime;

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      <div className='text-center'>
        <div className="w-32 h-32 mx-auto bg-green-200 rounded-full flex items-center justify-center text-3xl font-bold text-green-700">
          {token}
        </div>
        <p className='mt-3 text-slate-700'>Your Token</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow"> 
        <p className="text-sm text-gray-500">
          Currently seeing token # 
        </p>
        <p className="text-lg text-slate-800 font-semibold">
          {currentToken}
        </p>
      </div>

      <div>
        <h2 className="text-sm text-gray-800">Estimated Waiting Time</h2>
        <p className="text-sm text-gray-800">~{estimatedWait} minutes</p>
      </div>
    </div>
  )
}
