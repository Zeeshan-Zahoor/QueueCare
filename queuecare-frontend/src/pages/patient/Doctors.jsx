import { useState, useEffect } from 'react';
import DoctorCard from '../../components/patient/DoctorCard'
import { Search } from 'lucide-react'
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import { getAllDoctorsApi } from '../../api/clinicApi.js';
import DoctorCardSkeleton from '../../components/loaders/DoctorCardSkeleton.jsx';
import { getAllClinicsApi } from '../../api/clinicApi.js';


export default function Doctors() {

  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getAllDoctorsApi();
        if (res.success) {
          setDoctors(res.doctors);
        }
      } catch (error) {
        console.log("Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };

    const fetchClinics = async () => {
      try {
        const res = await getAllClinicsApi();

        if (!res.success) {
          console.log("Failed to fetch clinics");
          return;
        }

        const clinicMap = {};
        res.clinics.forEach((clinic) => {
          clinicMap[clinic._id] = clinic;
        });
        setClinics(clinicMap);

      } catch (error) {
        console.log("Error fetching clinis");
      }
    }

    fetchDoctors();
    fetchClinics();
  }, []);


  return (
    <div className='max-w-md mx-auto px-4 py-5 space-y-2 h-dvh'>
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
        {loading && (
          <DoctorCardSkeleton />
        )}

        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
            clinic={clinics[doctor.clinicId] || null} />
        ))}
      </div>

      {/* bottom nav */}
      <BottomNav />
    </div>
  )
}