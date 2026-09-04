import React, { useState, useEffect, useContext } from 'react'
import { getAllClinicsApi, getNearbyClinicsApi } from '../../api/clinicApi.js';
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Bell, Building2, ArrowRight } from 'lucide-react'
import ClinicCard from '../../components/patient/ClinicCard';
import BottomNav from '../../components/common/BottomNav';
import ClinicCardSkeletonLoader from '../../components/loaders/ClinicCardSkeletonLoader.jsx';
import { LocationContext } from '../../contexts/LocationContext.jsx';
import CategoryGrid from '../../components/patient/CategoryGrid.jsx';
import HeroCarousel from '../../components/patient/HeroCarousel.jsx';


export default function Home() {
  const navigate = useNavigate();

  const { location } = useContext(LocationContext);

  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        let res;
        if (location.status === "available") {
          try {
            res = await getNearbyClinicsApi(location.latitude, location.longitude);
          } catch {
            res = { success: true, clinics: [] };
          }
        } else {
          res = await getAllClinicsApi();
        }

        if (res.success) {
          setClinics(res.clinics || []);
        }
      } catch (error) {
        console.log("Failed to fetch clinics");
      } finally {
        setLoading(false);
      }
    };
    fetchClinics();
  }, [location.status, location.latitude, location.longitude]);

  const goToLocation = (lat, lon) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}`;

    window.open(url, "_blank");
  }

  // find clinic by search
  const filteredClinics = clinics.filter(clinic => {
    const searchLower = searchTerm.toLowerCase() || "";

    const clinicName = clinic?.name?.toLowerCase() || "";

    return clinicName.includes(searchLower) || (clinic.address || "").toLowerCase().includes(searchLower);
  })

  return (
    <div className='mx-auto min-h-dvh max-w-md bg-[#FCFCFC] px-5 py-4 pb-[calc(82px+env(safe-area-inset-bottom))]'>

      <div className="mb-3 flex items-start justify-between">
        <button role='button' onClick={() => location.status === "available" && goToLocation(location.latitude, location.longitude)} className='text-left'>
          <span className='block text-xs text-slate-500'>Location</span>
          <span className='mt-1 flex items-center gap-1 text-sm font-bold text-slate-700'><MapPin size={17} fill="currentColor" />{location.status === "available" ? (location.suburb || location.village || location.state) : "Location unavailable"}</span>
        </button>
        <button aria-label="Notifications" className="rounded-full bg-slate-100 p-2 text-slate-500"><Bell size={17} /></button>
      </div>

      {/* Search Bar */}
      <form onSubmit={(event) => { event.preventDefault(); navigate(`/doctors?search=${encodeURIComponent(searchTerm.trim())}`); }} className='mb-3 flex items-center rounded-lg bg-[#F0F2F4] px-3'>
        <Search className='ml-1 h-5 w-5 shrink-0 text-gray-400' />
        <input
          type="text"
          placeholder='Search doctor or clinic...'
          className='flex-1 rounded-lg bg-transparent p-2 text-sm text-[#374151] outline-none'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" aria-label="Search" className="hidden" />
      </form>

      <HeroCarousel />
      <div className="mt-4"><CategoryGrid /></div>


      {/* Medical Centers Section */}
      <div className="mt-5">
        <div className="mb-3 flex items-center justify-between"><h3 className="text-[15px] font-bold text-slate-800">Nearby Medical Centers</h3><button onClick={() => navigate('/clinics')} className="text-xs font-medium text-slate-500">See All</button></div>

        {loading && (
          <ClinicCardSkeletonLoader />
        )}

        {!loading && filteredClinics.length === 0 && (
          <div className="my-2 flex w-full flex-col items-center rounded-2xl border border-slate-100 bg-white px-6 py-8 text-center shadow-sm">
            <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700"><Building2 size={23} /></span>
            <h4 className="text-sm font-bold text-slate-700">No nearby centers yet</h4>
            <p className="mt-1 max-w-[230px] text-xs leading-5 text-slate-500">We couldn&apos;t find medical centers in your area right now. Explore all available centers instead.</p>
            <button onClick={() => navigate('/clinics')} className="mt-4 flex items-center gap-1 rounded-full bg-slate-800 px-4 py-2 text-xs font-semibold text-white">Browse medical centers <ArrowRight size={14} /></button>
          </div>
        )}

        <div className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none]">
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
