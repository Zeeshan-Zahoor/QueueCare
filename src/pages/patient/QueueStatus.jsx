import React from 'react';
import Header from '../../components/common/Header';
import doctorIcon from "../../assets/doctorIcon.png";
import consultingIcon from "../../assets/consultingIcon.png";
import { Clock } from 'lucide-react';
import { useParams, useLocation } from 'react-router-dom';
import { clinics } from '../../data/mockData';
import { useContext } from 'react';
import { QueueContext } from '../../contexts/QueueContext';

export default function QueueStatus() {

  const { doctorId } = useParams();
  const id = Number(doctorId);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const token = Number(searchParams.get("token"));


  const clinic = clinics.find((c) => (
    c.doctors.some((d) => d.id === id)
  ));

  if (!clinic) return <p>Doctor not found</p>

  const doctor = clinic.doctors.find((d) => d.id === id);

  const { doctorData } = useContext(QueueContext);

  const doctorInfo = doctorData[id] || doctor;

  const currentToken = doctorInfo.currentlyServing;

  const peopleAhead = token - doctorInfo.currentlyServing;

  const estimatedWait = peopleAhead * doctorInfo.consultationTime;

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <Header
        title="Queue Status"
      />

      <div className='text-center pt-3'>
        <div className="w-34 h-34 mx-auto bg-[#A4CFC3] rounded-full flex items-center justify-center">
          <div className="w-30 h-30 mx-auto bg-[#59B097] rounded-full flex items-center justify-center text-4xl font-semibold text-white">
            {token}
          </div>
        </div>
        <p className='mt-3 text-slate-800 font-medium'>Your Token</p>
      </div>

      <div className="bg-white p-3 rounded-xl border border-gray-300 shadow-[0_5px_10px_rgba(0,0,0,0.3)] flex gap-2">
        <div className='w-13 h-13 bg-[#B3DAE7] rounded-full'>
          <img
            src={doctorIcon}
            alt={doctor.name} />
        </div>
        <div className='flex-1'>
          <p className="text-sm text-gray-700 font-medium">
            Currently seeing patient :
          </p>
          <p className="text-lg text-slate-800 font-bold">
            #{currentToken}
          </p>
        </div>
      </div>

      <div className='ml-1 mb-5'>
        <h2 className="text-normal font-bold text-gray-800">Estimated Waiting Time</h2>
        <div className='flex items-center gap-1 mt-1'>
          <Clock className='w-5 h-5 text-[#3ea789]' />
          <p className="text-sm text-gray-800 font-bold">~{estimatedWait} minutes</p>
        </div>
      </div>

      {/* Queue progress bar section */}
      <div className='flex justify-between items-end-safe gap-2 py-5'>
        {/* consulting icon */}
        <div className='w-12 h-12'>
          <img 
            src={consultingIcon} 
            alt="Under Consultation" 
          />
        </div>

        {/* bar */}
        <div className="flex flex-col items-center gap-6 h-fit w-full">

        {/* Top Pills */}
        <div className="flex w-3/5 justify-between">
          <div className="px-3 py-2 rounded-xl bg-white shadow text-[#299D7C] font-semibold text-lg">
            {currentToken + 1 <= doctorInfo.tokensBooked ? (
              <>#{currentToken + 1}</>
            ) : ("")}
          </div>
          <div className="px-3 py-2 rounded-xl bg-white shadow text-[#82D0BA] font-semibold text-lg">
            {currentToken + 2 <= doctorInfo.tokensBooked ? (
              <>#{currentToken + 2}</>
            ) : ("NA")}
          </div>
          <div className="px-3 py-2 rounded-xl bg-white shadow text-[#C77934] font-semibold text-lg">
            {currentToken + 3 <= doctorInfo.tokensBooked ? (
              <>#{currentToken + 3}</>
            ) : ("NA")}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full bg-gray-700 rounded-full">

          {/* Green section */}
          <div className="absolute left-0 top-0 h-2 w-1/4 bg-[#299D7C] rounded-l-full" />

          {/* Teal section */}
          <div className="absolute left-1/4 top-0 h-2 w-1/4 bg-[#82D0BA]" />

          {/* Orange section */}
          <div className="absolute left-2/4 top-0 h-2 w-1/4 bg-[#C77934]" />
          
          {/* black section */}
          <div className="absolute left-3/4 top-0 h-2 w-1/4 bg-[#374151] rounded-r-full" />

          {/* Circles */}
          <div className="absolute -top-1.5 left-1/5 w-5 h-5 bg-[#299D7C] rounded-full border-3 border-gray-100" />
          <div className="absolute -top-1.5 left-1/2 w-5 h-5 bg-[#82D0BA] rounded-full border-3 border-gray-100 -translate-x-1/2" />
          <div className="absolute -top-1.5 right-1/5 w-5 h-5 bg-[#C77934] rounded-full border-3 border-gray-100" />
        </div>

      </div>
      </div>

      {/* bottom message */}
      <div className='rounded-xl border border-gray-300 shadow-[0_3px_10px_rgba(0,0,0,0.25)] py-2 px-3'>
        <p className='text-sm text-slate-500 font-medium'>
          Please reach the Hospital/Clinic atleast 15 minutes prior.
        </p>
      </div>

    </div>
  )
}
