import React from 'react'
import { useParams } from 'react-router-dom'
import DoctorCard from '../../components/patient/DoctorCard'
import { clinics } from '../../data/mockData';
import Header from '../../components/common/Header';

export default function ClinicDetails() {
  const { doctorId } = useParams();
  const clinic = clinics.find((c) => c.id == Number(doctorId));
  if(!clinic) return <p>Clinic not found</p>

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <Header 
        path='/'
        title={clinic.name}
      />
      <div className="space-y-4  pt-1">
        {clinic.doctors.map((doctor) => (
          <DoctorCard 
            key={doctor.id} 
            doctor={doctor}
            clinicName={clinic.name}  
          />
        ))}
      </div>
    </div>
  )
}
