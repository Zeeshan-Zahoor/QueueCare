import React from 'react'
import { MapPin, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function DoctorCard({ doctor, clinicName }) {
    const tokensLeft = doctor.maxTokens - doctor.tokensBooked;
    const isFull = tokensLeft <= 0;

    const peopleAhead = doctor.tokensBooked - doctor.currentlyServing;
    const waitTime = peopleAhead * doctor.consultationTime;
    const navigate = useNavigate();
  return (
    <div 
    onClick={() => navigate(`/doctor/${doctor.id}`)}

    className='bg-white m-auto rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_5px_15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 p-3 flex gap-3 items-center mb-2'>
        
        {/* Doctor Image */}
        <div className="w-30 h-30 rounded-xl overflow-hidden shrink-0">
            <img 
                src= {doctor.image}
                alt= {doctor.name}
                className='w-full h-full object-cover'
            />
        </div>

        {/* right content */}
        <div className='flex-1'>

            {/* Top row */}
            <div className='flex justify-between items-start'>
                <h2 className='text font-bold text-slate-800'>
                    {doctor.name}
                </h2>
            </div>

            {/* Token badge */}
            <div>
                {isFull ? (
                    <span className='inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-medium px-3 py-1.5 rounded-full'>
                        <span className='w-3 h-3 bg-red-500 rounded-full'></span>
                        Full
                    </span>
                ) : (
                    <span className='inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full'>
                        <span className='w-3 h-3 bg-green-600 rounded-full'></span>
                        {tokensLeft} tokens
                    </span>
                )}
            </div>


            {/* Specialization */}
            <p className='mt-1 text-sm font-medium text-slate-700'>
                {doctor.specialization}
            </p>


            {/* Doctor's Clinic */}
            <div className='h-4 flex items-start gap-2 mt-1 text-[13px] text-slate-700 overflow-hidden'>
                <MapPin className='w-4 h-4' />
                <span>{clinicName}</span>
            </div>

            {/* Wait time */}
            <div className='flex items-center gap-2 mt-1 text-[13px] text-gray-500'>
                <Clock className='w-4 h-4'/>
                <span>~{waitTime} min</span>
            </div>

        </div>

    </div>
  )
}

