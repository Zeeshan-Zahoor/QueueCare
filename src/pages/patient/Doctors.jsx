import React from 'react'
import DoctorCard from '../../components/patient/DoctorCard'
import { Search, ArrowLeft } from 'lucide-react'


export default function Doctors() {

  const doctors = [
    {
      id: 1,
      name: "Dr. Jessica Turner",
      specialization: "Gynecologist",
      clinic: "Women's Clinic",
      location: "Women's Clinic, Seattle, Sopore",
      tokens: 5,
      waitTime: 25,
      status: "Open", // or "Full"
      image: "https://tse1.mm.bing.net/th/id/OIP.zkty80FhzzrzCJ0uBg1zIwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      id: 2,
      name: "Dr. Yousuf Rather",
      specialization: "General Practioner",
      clinic: "Shehjar Medicate",
      location: "Oppsite Degree College, Sopore",
      tokens: 19,
      waitTime: 20,
      status: "Open", // or "Full"
      image: "https://tse1.mm.bing.net/th/id/OIP.yE8zyTz-OJwswooF9QFC1AHaLH?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      id: 3,
      name: "Dr. Ajaz Bande",
      specialization: "Urologist",
      clinic: "Al - Shifa Medicate",
      location: "Lal Chowk, Srinagar",
      tokens: 0,
      waitTime: 10,
      status: "Full", // or "Full"
      image: "https://tse3.mm.bing.net/th/id/OIP.Qeo_KpjDjyx76snoi5xmKgHaGx?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className='w-full flex items-center px-3 mt-5 mb-5 relative'>
        <ArrowLeft />

        <h1 className='font-sans absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-[#374151] '>
          All Doctors
        </h1>
      </div>

      {/* Search Bar */}
      <div className='w-13/14 bg-gray-200/65 flex items-center rounded-lg mb-6 m-auto px-3'>
        <Search className='w-6 h-6 ml-3 text-gray-500 shrink-0' />
        <input
          type="text"
          placeholder='Search clinic or doctor...'
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