import React from 'react'
import DoctorCard from '../../components/patient/DoctorCard'
import { Search, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { clinics } from '../../data/mockData';


export default function Doctors() {
  const navigate = useNavigate();
  const doctors = clinics.flatMap((clinic) =>
    clinic.doctors.map((doc) => (
      {
        ...doc, 
        clinicName: clinic.name, 
        clinicLocation: clinic.location,
      }
    ))
  )

  return (
    <div className='max-w-md mx-auto px-4 py-3 space-y-2'>
      {/* Header */}
      <div className='w-full flex items-center px-3 mt-5 mb-5 relative'>
        <ArrowLeft 
        onClick={() => navigate("/")}
        />

        <h1 className='font-sans absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-[#374151]'>
          All Doctors
        </h1>
      </div>

      {/* Search Bar */}
      <div className=' bg-gray-200/65 flex items-center rounded-lg mb-6 m-auto px-3'>
        <Search className='w-6 h-6 ml-3 text-gray-500 shrink-0' />
        <input
          type="text"
          placeholder='Search doctor or clinic...'
          className='text-[#374151] rounded-lg p-3 outline-none flex-1'
        />
      </div>

      {/* Doctor List */}
      <div className='space-y-4'>
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  )
}