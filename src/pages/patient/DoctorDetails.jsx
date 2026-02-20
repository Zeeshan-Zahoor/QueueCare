import React from 'react'
import { clinics } from "../../data/mockData";
import { useParams, useNavigate } from 'react-router-dom';
import { Hand } from 'lucide-react';

function DoctorDetails() {

  const { doctorId } = useParams();
  const id = Number(doctorId)
  const navigate = useNavigate();

  // find the doctor across all the clinics
  const clinic = clinics.find((c) => (
    c.doctors.some((d) => (
      d.id === id
    ))
  ))

  if(!clinic) return <p>Doctor not found!</p>;

  const doctor = clinic.doctors.find((d) => (d.id === id));

  const estimatedWait = doctor.currentTokenCount * doctor.consultationTime;

  const handleJoinQueue = () => {
    //generate new token
    const newToken = doctor.currentTokenCount + 1;
    navigate(`/queue-status/${doctor.id}?token=${newToken}`);
  }

  return (
    <div className='max-w-md mx-auto px-4 py-6 space-y-4'>

      {/* Doctor info */}
      <div className='bg-white p-4 rounded-xl shadow'>
        <h2 className='text-lg font-semibold'>{doctor.name}</h2>
        <p className='text-sm  text-gray-500'>
          {doctor.specialization}
        </p>
        <p className='text-sm text-gray-500'>
          {clinic.name}
        </p>
      </div>

      {/* Queue Status */}
      <div className='bg-gray-100 p-4 rounded-xl'>
        <p className='text-sm font-medium text-slate-700'>
          Today's Queue Status
        </p>

        <p className='text-sm text-green-600 mt-2'>
          {doctor.currentTokenCount} tokens
        </p>

        <p className='text-sm text-gray-500'>
          ~{estimatedWait} min wait
        </p>
      </div>

      {/* Join button */}
      <button
        onClick={handleJoinQueue}
        disabled={doctor.status === "Full"}
        className='w-full bg-green-600 text-white py-3 rounded-xl font-medium disabled:bg-gray-400'
      >
        {doctor.status === "Full" ? 
        ("Queue Full") : 
        ("Get Token")}
      </button>

    </div>
  )
}

export default DoctorDetails