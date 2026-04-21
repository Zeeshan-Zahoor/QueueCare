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
  const [searchTerm, setSearchTerm] = useState("");
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


  //filter doctors based on search term
  const filteredDoctors = doctors.filter((doctor) => {
    const searchLower = searchTerm.toLowerCase();
    const doctorName = doctor.name?.toLowerCase() || '';
    const clinic = clinics[doctor.clinicId];
    const clinicName = clinic?.name?.toLowerCase() || "";

    return doctorName.includes(searchLower) || clinicName.includes(searchLower)
  });

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-2 pb-[calc(70px+env(safe-area-inset-bottom))]'>
      {/* Header */}
      <Header
        title="All Doctors"
      />

      {/* Search Bar */}
      <div className=' bg-gray-200/65 flex items-center rounded-lg mb-4 m-auto px-3'>
        <Search className='w-6 h-6 ml-3 text-gray-500 shrink-0'/>
        <input
          type="text"
          placeholder='Search doctor or clinic...'
          className='text-[#374151] rounded-lg p-2 outline-none flex-1 text-sm sm:text-base'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Doctor List */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {loading && (
          Array.from({ length: 10 }).map((_, i) => (
            <DoctorCardSkeleton key={i}/>
          ))
        )}
        {!loading && filteredDoctors.length === 0 && (
          <p className="text-center text-gray-500 py-8 col-span-full">No doctors found.</p>
        )}

        {filteredDoctors.map((doctor) => (
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