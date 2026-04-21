import React from 'react'

const DoctorCardSkeleton = () => {
  return (
    <div className="bg-white m-auto rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.2)] p-3 flex gap-3 items-center mb-2 w-full animate-pulse">

      {/* Doctor Image Skeleton */}
      <div className="w-30 h-30 rounded-xl bg-gray-200 shrink-0"></div>

      {/* Right Content */}
      <div className="flex-1">

        {/* Top Row (Name) */}
        <div className="flex justify-between items-start">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* Token Badge */}
        <div className="mt-2">
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        </div>

        {/* Specialization */}
        <div className="mt-2 h-3 w-28 bg-gray-200 rounded"></div>

        {/* Clinic */}
        <div className="mt-2 flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-3 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* Wait Time */}
        <div className="mt-2 flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
        </div>

      </div>
    </div>
  );
}

// function DoctorCardSkeleton({ count = 10 }) {
//   return (
//     <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {Array.from({ length: count }).map((_, i) => (
//         <SingleCard key={i} />
//       ))}
//     </div>
//   );
// }

export default DoctorCardSkeleton