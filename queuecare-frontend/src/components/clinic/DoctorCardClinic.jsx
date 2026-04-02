import React from 'react'

export default function DoctorCardClinic({
  doctor, 
  clickHandler, 
  active
}) {

  const tokensLeft = doctor.maxTokens - (doctor.currentlyServing + doctor.queue.length);
  const isFull = tokensLeft <= 0;
  return (
    <div 
    role="button"
    onClick={clickHandler}
    className={`${active ? "bg-slate-700" : "bg-white"} m-auto rounded-lg transition-all border border-gray-200 duration-300 p-2 flex gap-3 items-start mb-2 cursor-pointer`}>
      <div className="w-20 h-20 rounded-sm shadow-xl border border-gray-50 overflow-hidden shrink-0">
        <img
          src={doctor.image}
          alt={doctor.name}
          className='w-full h-full object-cover'
        />
      </div>

      <div className='flex-1'>
        <div className='flex justify-between items-start'>
          <h2 className={`text-sm mb-1 font-bold ${active ? "text-white font-semibold" : "text-slate-800"}`}>
            {doctor.name}
          </h2>
        </div>

        <div>
          {isFull ? (
            <span className='inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-medium px-3 py-1.5 rounded-full'>
              <span className='w-3 h-3 bg-red-500 rounded-full'></span>
              Full
            </span>
          ) : (
            <span className='inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full'>
              <span className="w-3 h-3 bg-green-600 rounded-full"></span>
              {tokensLeft} tokens
            </span>
          )}
        </div>

        <p className={`mt-1 text-sm font-medium ${active? "text-white": "text-slate-700"}`}>
          {doctor.specialization}
        </p>
      </div>
    </div>
  )
}