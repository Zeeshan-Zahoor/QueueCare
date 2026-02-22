import React from 'react'
import { useState } from 'react';
import { MapPin, ArrowLeft, Clock } from 'lucide-react';
import Header from '../../components/common/Header';
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

  if (!clinic) return <p>Doctor not found!</p>;

  const doctor = clinic.doctors.find((d) => (d.id === id));

  const { joinQueue, doctorData } = useContext(QueueContext);

  const doctorInfo = doctorData[doctor.id] || doctor;

  const tokensLeft = doctorInfo.maxTokens - doctorInfo.tokensBooked;

  const isFull = tokensLeft <= 0;

  const handleJoinQueue = () => {
    if (tokensLeft <= 0) return;

    const userToken = joinQueue(doctor.id, doctorInfo);

    navigate(`/queue-status/${doctor.id}?token=${userToken}`);
  }

  const peopleAhead = doctorInfo.tokensBooked - doctorInfo.currentlyServing;

  const estimatedWait = peopleAhead * doctorInfo.consultationTime;

  return (
    <div className="max-w-md h-screen mx-auto px-4 py-5 flex flex-col">
      {/* Header */}
      <Header
        title="Doctor Details"
      />

      {/* Content wrapper */}
      <div className="space-y-4">

        {/* Doctor info */}
        <div className="bg-white p-4 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.3)] flex space-x-3">
          <div className="w-28 h-28 rounded-xl overflow-hidden shrink-0">
            <img
              src={doctor.image}
              alt={doctor.name}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='flex-1'>
            <h2 className="text-lg text-[#1C2A3A] font-bold mb-2">{doctor.name}</h2>
            <hr className='text-[#D0D3D9]' />
            <p className="text-sm font-bold text-gray-600 mt-2">
              {doctor.specialization}
            </p>
            <div className='flex items-center gap-1 mt-1'>
              <MapPin className='w-4 h-4' />
              <span className="text-sm text-gray-500">
                {clinic.name}
              </span>
            </div>
          </div>
        </div>

        {/* Queue Status */}
        <div className="bg-white p-4 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
          <p className="text-lg font-bold text-slate-800">
            Today's Queue Status
          </p>

          <hr className='text-[#D0D3D9] mt-1' />

          {/* Token badge */}
            <div className='mt-2'>
                {isFull ? (
                    <span className='inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-medium px-3 py-2 rounded-full'>
                        <span className='w-3 h-3 bg-red-500 rounded-full'></span>
                        Full
                    </span>
                ) : (
                    <span className='inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-medium px-3 py-2 rounded-full'>
                        <span className='w-3 h-3 bg-green-700 rounded-full'></span>
                        {tokensLeft} tokens
                    </span>
                )}
            </div>

          <div className='flex items-center gap-1 mt-1'>
            <Clock className='w-4 h-4 text-gray-500'/>
            <p className="text-sm text-gray-500">
            ~{estimatedWait} min wait
          </p>
          </div>

          <hr className='text-[#D0D3D9] mt-1 mb-2' />

          <span className="text-slate-800 font-medium">
            Currently seeing token 
          </span>
          <span className="text-lg text-slate-800 font-bold ml-2">
            #{doctorInfo.currentlyServing}
          </span>
        </div>
      </div>

      {/* Push button to bottom */}
      <button
        onClick={handleJoinQueue}
        disabled={isFull}
        className="mt-auto w-full bg-[#1C2A3A] text-white py-3 rounded-4xl font-medium disabled:bg-[#455970]"
      >
        {isFull ? "No more tokens" : "Get Token"}
      </button>

    </div>
  )

}

export default DoctorDetails