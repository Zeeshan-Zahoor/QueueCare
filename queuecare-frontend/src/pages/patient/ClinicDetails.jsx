import React , { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DoctorCard from '../../components/patient/DoctorCard';
import { clinics } from '../../data/mockData';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import { getDoctorsApi } from '../../api/clinicApi';

export default function ClinicDetails() {
  const { clinicId } = useParams();

  console.log("ClinicId: ", clinicId);
  
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctorsApi(clinicId);

        if(res.success) {
          setDoctors(res.doctors);
        }
      } catch (error) {
        console.log("Failed to fetch doctors");
      }
    };

    fetchDoctors();
  }, [clinicId]);
  

  return (
    <div className="max-w-md mx-auto px-4 py-6 max-h-dvh">
      <Header
        title={"Clinic"} // TEMP --> will fix later
      />
      <div className="space-y-4  pt-1">
        {doctors.map((doctor) => (
          <DoctorCard 
            key={doctor._id} 
            doctor={doctor}
            clinicName={"Clinic"} // temp  
          />
        ))}
      </div>

      {/* bottom nav */}
        <BottomNav />
    </div>
  )
}
