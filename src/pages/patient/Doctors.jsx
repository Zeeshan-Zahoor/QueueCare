import React from 'react'
import DoctorCard from '../../components/patient/DoctorCard'
import { Search, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { clinics } from '../../data/mockData';
import Header from '../../components/common/Header';



export default function Doctors() {
  const navigate = useNavigate();
  const allDoctors = clinics.flatMap((clinic) =>
    clinic.doctors.map((doctor) => (
      {
        ...doctor, 
        clinicName: clinic.name,
      }
    ))
  )

  return (
    <div className='max-w-md mx-auto px-4 py-5 space-y-2'>
      {/* Header */}
      <Header
        title="All Doctors"
      />

      {/* Search Bar */}
      <div className=' bg-gray-200/65 flex items-center rounded-lg mb-6 m-auto px-3'>
        <Search className='w-6 h-6 ml-3 text-gray-500 shrink-0' />
        <input
          type="text"
          placeholder='Search doctor or clinic...'
          className='text-[#374151] rounded-lg p-2 outline-none flex-1'
        />
      </div>

      {/* Doctor List */}
      <div className='space-y-4'>
  
        {allDoctors.map((doctor) => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              clinicName={doctor.clinicName}/>
          ))}
      </div>
    </div>
  )
}