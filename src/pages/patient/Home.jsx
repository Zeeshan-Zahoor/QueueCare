import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin } from 'lucide-react'
import ClinicCard from '../../components/patient/ClinicCard';
import { clinics } from '../../data/mockData';
import heroImage from "../../assets/heroImage.png"

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='max-w-md mx-auto px-4 py-3 space-y-2'>

      {/* Location */}
      <span className='text-sm text-slate-500'>Location</span>
      <div className='flex items-center gap-2 text-slate-700'>
        <MapPin className='w-5 h-5 text-[#1C2A3A]' />
        <span className='text-sm font-medium'>Sopore, Kashmir</span>
      </div>

      {/* Search Bar */}
      <div className='bg-gray-200/65 flex items-center rounded-lg mb-4 m-auto px-3'>
        <Search className='w-5 h-5 ml-3 text-gray-500 shrink-0' />
        <input
          type="text"
          placeholder='Search doctor...'
          className='text-[#374151] rounded-lg p-2 outline-none flex-1'
        />
      </div>

      {/* Hero section */}
      <div className='bg-black/40 rounded-2xl p-5 bg-cover bg-center'
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <h2 className='text-lg font-bold text-white'>
          Get today's token
        </h2>
        <p className="w-1/2 text-sm text-white mt-1">
          Avoid standing in long queues. Join digitally.
        </p>
        <button
          onClick={() => navigate("/doctors")}
          className='mt-4 bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer'>
          Find Doctors
        </button>
      </div>


      {/* Quick Access Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2 mt-4">
          Nearby Medical Centers
        </h3>

        <div className="space-y-3">
          {clinics.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} />
          ))}
        </div>
      </div>

    </div>
  )
}
