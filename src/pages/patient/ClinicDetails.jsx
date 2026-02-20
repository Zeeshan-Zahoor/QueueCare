import React from 'react'
import { useParams } from 'react-router-dom'
import DoctorCard from '../../components/patient/DoctorCard'
import { clinics } from '../../data/mockData';

export default function ClinicDetails() {
  const { doctorId } = useParams();
  const clinic = clinics.find((c) => c.id == Number(doctorId));
  if(!clinic) return <p>Clinic not found</p>

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-slate-800 mb-4">
        {clinic.name}
      </h1>

      <div className="space-y-4">
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
