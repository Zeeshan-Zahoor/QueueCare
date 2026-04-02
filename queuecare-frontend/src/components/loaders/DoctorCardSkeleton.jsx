import React from 'react'

const SingleCard = () => {
    return (
    <div className="flex gap-4 bg-white rounded-2xl shadow-md p-4 animate-pulse">
      
      {/* Image */}
      <div className="w-24 h-24 rounded-xl bg-slate-200"></div>

      {/* Right Content */}
      <div className="flex flex-col justify-between flex-1">
        
        {/* Name + Status */}
        <div>
          <div className="h-5 bg-slate-200 rounded w-1/2 mb-2"></div>

          {/* Status badge */}
          <div className="h-6 w-24 bg-slate-200 rounded-full mb-2"></div>

          {/* Specialization */}
          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        </div>

        {/* Location + Time */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-1/5"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

function DoctorCardSkeleton({ count = 10 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SingleCard key={i} />
      ))}
    </div>
  );
}

export default DoctorCardSkeleton