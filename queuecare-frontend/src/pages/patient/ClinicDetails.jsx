import React , { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DoctorCard from '../../components/patient/DoctorCard';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import { getDoctorsApi, getClinicApi } from '../../api/clinicApi';
import DoctorCardSkeleton from '../../components/loaders/DoctorCardSkeleton';

export default function ClinicDetails() {
  const { clinicId } = useParams();

  console.log("ClinicId: ", clinicId);
  
  const [doctors, setDoctors] = useState([]);
  const [clinic, setClinic] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctorsApi(clinicId);

        if(res.success) {
          setDoctors(res.doctors);
        }
      } catch (error) {
        console.log("Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };
    const fetchClinic = async () => {
      try {
        const res = await getClinicApi(clinicId);
        if(res.success) {
          setClinic(res.clinic);
        }
      } catch (error) {
        console.log("Error fetching clinic");
      }
    }
    fetchClinic();
    fetchDoctors();
  }, [clinicId]);
  
  console.log("This Clinic: ", clinic)

  return (
    <div className="max-w-md mx-auto px-4 py-6 max-h-dvh">
      <Header
        title={clinic?.name}
      />
      <div className="space-y-4  pt-1">
        {loading && (
          <DoctorCardSkeleton />
        )}

        {doctors.map((doctor) => (
          <DoctorCard 
            key={doctor._id} 
            doctor={doctor}
            clinic={clinic}   
          />
        ))}
      </div>

      {/* bottom nav */}
        <BottomNav />
    </div>
  )
}
