import React, { useState, useEffect, useContext } from 'react'
import { getAllClinicsApi } from '../../api/clinicApi.js';
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Link } from 'lucide-react'
import ClinicCard from '../../components/patient/ClinicCard';
import heroImage from "../../assets/heroImage.png"
import BottomNav from '../../components/common/BottomNav';
import ClinicCardSkeletonLoader from '../../components/loaders/ClinicCardSkeletonLoader.jsx';
import { LocationContext } from '../../contexts/LocationContext.jsx';


export default function Home() {
  const navigate = useNavigate();

  const { location } = useContext(LocationContext);

  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await getAllClinicsApi();
        
        if(res.success) {
          setClinics(res.clinics);
        }
      } catch (error) {
        console.log("Failed to fetch clinics");
      } finally {
        setLoading(false);
      }
    };
    fetchClinics();
  }, []);

  const goToLocation = (lat, lon) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}`;

    window.open(url, "_blank");
  }

  // find clinic by search
  const filteredClinics = clinics.filter(clinic => {
    const searchLower = searchTerm.toLowerCase() || "";

    const clinicName = clinic?.name?.toLowerCase() || "";

    return clinicName.includes(searchLower);
  })

  return (
    <div className='max-w-md mx-auto px-4 py-3 space-y-2 min-h-dvh pb-[calc(70px+env(safe-area-inset-bottom))]'>

      {/* Location */}
      <span className='text-sm text-slate-500'>Location</span>
      <div 
        role='button'
        onClick={() => location.status === "available" && goToLocation(location.latitude, location.longitude)}
        className='flex items-center gap-2 text-slate-700 '>
        <MapPin className='w-5 h-5 text-[#1C2A3A] cursor-pointer' />
        <span className='text-sm font-medium cursor-pointer hover:underline'>{location.status === "available" ? (location.suburb) : ("Unavailable")}, {location.state}</span>
      </div>

      {/* Search Bar */}
      <div className='bg-gray-200/65 flex items-center rounded-lg mb-4 m-auto px-3'>
        <Search className='w-5 h-5 ml-3 text-gray-500 shrink-0' />
        <input
          type="text"
          placeholder='Search clinic...'
          className='text-[#374151] rounded-lg p-2 outline-none flex-1'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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


      {/* Nearby Project Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2 mt-4">
          Medical Centers
        </h3>

        {loading && (
          <ClinicCardSkeletonLoader />
        )}

        {!loading && filteredClinics.length === 0 && (
          <p className="text-center text-gray-500 py-8">No clinics found.</p>
        )}

        <div className="space-y-3">
          {filteredClinics.map((clinic) => (
            <ClinicCard key={clinic._id} clinic={clinic} />
          ))}
        </div>
      </div>


      {/* Bottom Navigation bar */}
      <BottomNav />
    </div>
  )
}
