import React from 'react'
import { X, AlertTriangle } from 'lucide-react';

function DeleteDoctorModal({
    onClose,
    doctor,
    selectedDoctorId,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      
      {/* Modal */}
      <div className="p-6  max-w-100 rounded-lg bg-white shadow-xl">
        {/* Body */}
        <div className="flex flex-col w-full justify-center items-center gap-3 py-10 px-7">

            {/* image */}
            <div className="w-48 h-48 p-2 bg-gray-200 rounded-full">
              <img 
                src={doctor?.image} 
                alt=""
                className="w-full h-full object-cover rounded-full"
                />
            </div>

            {/* Name */}
            <h1 className="text-slate-800 font-semibold text-xl">{doctor?.name}</h1>

            <div className='flex items-center justify-center gap-3 bg-yellow-100 p-4 rounded-lg shadow-lg'>
                <AlertTriangle 
                size={50}
                className='text-yellow-800'/>
                <h2 className="text-sm text-yellow-800 mt-0.5">Are you sure you want to remove <strong>{doctor.name}</strong> from clinic!</h2>
            </div>
      

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-300 mt-5">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-lg bg-gray-200 text-lg font-semibold text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            className="flex-1 px-6 py-3 text-lg font-semibold rounded-lg bg-orange-600 text-white hover:bg-orange-700"
          >
            Remove
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteDoctorModal