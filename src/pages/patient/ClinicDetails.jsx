import React from 'react'
import { useParams } from 'react-router-dom'
import DoctorCard from '../../components/patient/DoctorCard'
import { clinics } from '../../data/mockData';
import Header from '../../components/common/Header';
import { useContext } from 'react';
import { QueueContext } from '../../contexts/QueueContext';

export default function ClinicDetails() {
  const { doctorData } = useContext(QueueContext);
  const { doctorId } = useParams();
  const clinic = clinics.find((c) => c.id == Number(doctorId));
  if(!clinic) return <p>Clinic not found</p>

  const allDoctors = clinic.doctors.map((doctor) => {
    const doctorInfo = doctorData[doctor.id] || doctor;
    return {
      ...doctorInfo
    }
  })

  return (
    <div className="max-w-md mx-auto px-4 py-6 max-h-dvh">
      <Header
        title={clinic.name}
      />
      <div className="space-y-4  pt-1">
        {allDoctors.map((doctor) => (
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
