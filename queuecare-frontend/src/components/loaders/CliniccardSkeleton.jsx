import React from 'react'

const SingleSkeleton = () => {
    return (
    <div className="bg-white rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.2)] p-4 cursor-wait animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-44 overflow-hidden rounded-xl mb-2 bg-slate-200"></div>

      {/* Title skeleton */}
      <div className="h-6 bg-slate-200 rounded-md w-3/4 mb-2"></div>

      {/* Address skeleton */}
      <div className="flex items-center gap-2 mt-1">
        <div className="w-4 h-4 bg-slate-200 rounded"></div>
        <div className="h-4 bg-slate-200 rounded-md w-2/3"></div>
      </div>

      {/* Divider skeleton */}
      <hr className='text-[#D0D3D9] mt-2' />

      {/* Bottom info skeleton */}
      <div className="flex justify-between items-center mt-1 text-sm">
        <div className="h-4 bg-slate-200 rounded-md w-20"></div>
        <div className="h-4 bg-slate-200 rounded-md w-16"></div>
      </div>
    </div>
  );
}

function CliniccardSkeleton({count = 6}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {Array(count).fill().map((_, index)=> (
            <SingleSkeleton key={index} />
        ))}
    </div>
  )
}

export default CliniccardSkeleton