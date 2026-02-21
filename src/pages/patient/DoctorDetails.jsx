import React from 'react'
import { useState } from 'react';
import { clinics } from "../../data/mockData";
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { QueueContext } from '../../contexts/QueueContext';


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

  const { joinQueue, doctorData } = useContext(QueueContext);

  const doctorInfo = doctorData[doctor.id] || doctor;

  const tokensLeft =  doctorInfo.maxTokens - doctorInfo.tokensBooked;

  const isFull = tokensLeft <= 0;

  const handleJoinQueue = () => {
    if(tokensLeft <= 0) return;

    const userToken = joinQueue(doctor.id, doctorInfo);

    navigate(`/queue-status/${doctor.id}?token=${userToken}`);
  }

  const peopleAhead = doctorInfo.tokensBooked - doctorInfo.currentlyServing;

  const estimatedWait = peopleAhead * doctorInfo.consultationTime;

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
          {tokensLeft} tokens
        </p>

        <p className='text-sm text-gray-500'>
          ~{estimatedWait} min wait
        </p>

        <p className= 'mt-3 text-slate-800'>
          Currently Seeing Token 
        </p>
        <p className="text-lg text-slate-800 font-semibold">
           #{doctorInfo.currentlyServing}
        </p>
      </div>

      {/* Join button */}
      <button
        onClick={handleJoinQueue}
        disabled={isFull}
        className='w-full bg-green-600 text-white py-3 rounded-xl font-medium disabled:bg-gray-400'
      >
        {isFull ? 
        ("Queue Full") : 
        ("Get Token")}
      </button>

    </div>
  )
}

export default DoctorDetails