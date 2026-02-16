import React from 'react'
import { MapPin, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function DoctorCard({ doctor }) {
    const isFull = doctor.status == "Full";
    const navigate = useNavigate();
  return (
    <div 
    onClick={() => navigate(`/doctor/${doctor.id}`)}

    className='bg-white m-auto rounded-2xl shadow-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-4 flex gap-3 items-center mb-2 w-13/14'>
        
        {/* Doctor Image */}
        <div className="w-30 h-30 rounded-xl overflow-hidden flex-shrink-0">
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
                <h2 className='text-lg font-semibold text-slate-800'>
                    {doctor.name}
                </h2>
            </div>

            {/* Token badge */}
            <div>
                {isFull ? (
                    <span className='inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full'>
                        <span className='w-2 h-2 bg-red-500 rounded-full'></span>
                        Full
                    </span>
                ) : (
                    <span className='inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full'>
                        <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                        {doctor.tokens} tokens
                    </span>
                )}
            </div>


            {/* Specialization */}
            <p className='mt-1 text-sm font-medium text-slate-700'>
                {doctor.specialization}
            </p>


            {/* Location */}
            <div className='h-5 flex items-start gap-2 mt-1 text-sm text-slate-700 overflow-hidden'>
                <MapPin className='w-4 h-4' />
                <span>{doctor.location}</span>
            </div>

            {/* Wait time */}
            <div className='flex items-center gap-2 mt-1 text-sm text-gray-500'>
                <Clock className='w-4 h-4'/>
                <span>~{doctor.waitTime} min</span>
            </div>

        </div>

    </div>
  )
}

