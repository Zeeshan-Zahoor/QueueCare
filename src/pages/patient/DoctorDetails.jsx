import React from 'react'
import { useState } from 'react';
import { MapPin, Clock, BanIcon} from 'lucide-react';
import Header from '../../components/common/Header';
import { clinics } from "../../data/mockData";
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { QueueContext } from '../../contexts/QueueContext';
import SuccessTick from "../../assets/shield_tick.svg?react";
import BottomNav from '../../components/common/BottomNav';

function DoctorDetails() {

  const { doctorId } = useParams();
  const id = Number(doctorId)
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })
  const [myToken, setMyToken] = useState(null);
  const [showDuplicatePatient, setShowDuplicatePatient] = useState(false);

  // find the doctor across all the clinics
  const clinic = clinics.find((c) => (
    c.doctors.some((d) => (
      d.id === id
    ))
  ))

  if (!clinic) return <p>Doctor not found!</p>;

  const doctor = clinic.doctors.find((d) => (d.id === id));

  const { joinQueue, doctorData } = useContext(QueueContext);

  const doctorInfo = doctorData[doctor.id] || doctor;

  const tokensLeft = doctorInfo.maxTokens - (doctorInfo.currentlyServing + doctorInfo.queue.length);

  const isFull = tokensLeft <= 0;

  const handleConfirmJoin = () => {
    if (!formData.name || !formData.phone) return;

    const token = joinQueue(doctor.id, doctorInfo, formData);

    if(token === -1) {
      setShowDuplicatePatient(true);
      setShowForm(false);
      return;
    }
    setMyToken(token);
    setShowSuccess(true);
  }

  const peopleAhead = doctorInfo.queue.length;

  const estimatedWait = peopleAhead * doctorInfo.consultationTime;

  return (
    <div className="max-w-md min-h-dvh mx-auto px-4 py-5 flex flex-col">

      {/* Content wrapper */}
      <div className="space-y-4">
        {/* Header */}
        <Header
          title="Doctor Details"
        />

        {/* Doctor info */}
        <div className="bg-white p-4 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.3)] flex space-x-3">
          <div className="w-28 h-28 rounded-xl overflow-hidden shrink-0">
            <img
              src={doctor.image}
              alt={doctor.name}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='flex-1'>
            <h2 className="text-lg text-[#1C2A3A] font-bold mb-2">{doctor.name}</h2>
            <hr className='text-[#D0D3D9]' />
            <p className="text-sm font-bold text-gray-600 mt-2">
              {doctor.specialization}
            </p>
            <div className='flex items-center gap-1 mt-1'>
              <MapPin className='w-4 h-4' />
              <span className="text-sm text-gray-500">
                {clinic.name}
              </span>
            </div>
          </div>
        </div>

        {/* Queue Status */}
        <div className="bg-white p-4 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
          <p className="text-lg font-bold text-slate-800">
            Today's Queue Status
          </p>

          <hr className='text-[#D0D3D9] mt-1' />

          {/* Token badge */}
          <div className='mt-2'>
            {isFull ? (
              <span className='inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-medium px-3 py-2 rounded-full'>
                <span className='w-3 h-3 bg-red-500 rounded-full'></span>
                Full
              </span>
            ) : (
              <span className='inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-medium px-3 py-2 rounded-full'>
                <span className='w-3 h-3 bg-green-700 rounded-full'></span>
                {tokensLeft} tokens
              </span>
            )}
          </div>

          <div className='flex items-center gap-1 mt-1'>
            <Clock className='w-4 h-4 text-gray-500' />
            <p className="text-sm text-gray-500">
              ~{estimatedWait} min wait
            </p>
          </div>

          <hr className='text-[#D0D3D9] mt-1 mb-2' />

          <span className="text-slate-800 font-medium">
            Currently seeing token
          </span>
          <span className="text-lg text-slate-800 font-bold ml-2">
            #{doctorInfo.currentlyServing}
          </span>
        </div>
      </div>

      {/* Push button to bottom */}
      <button
        onClick={() => setShowForm(true)}
        disabled={isFull}
        className="mt-auto w-full bg-[#1C2A3A] text-white py-3 rounded-4xl font-medium disabled:bg-[#455970]"
      >
        {isFull ? "No more tokens" : "Get Token"}
      </button>


      {/* Form Display Logic */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-7 px-10 rounded-4xl w-80 space-y-4 text-center">
            <h3 className="text-xl font-semibold">Enter Details</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmJoin();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />

              <button
                type="submit"
                className="w-full bg-slate-800 text-white py-2 rounded-4xl cursor-pointer"
              >
                Confirm
              </button>
            </form>

            <button
              onClick={() => setShowForm(false)}
              className="w-full font-medium py-2 rounded-4xl cursor-pointer bg-gray-200 text-slate-800 -mt-5 mb-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}


      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-7 px-10 rounded-4xl w-80 text-center space-y-4">
            <div className="w-28 h-28 mx-auto bg-[#A4CFC3] rounded-full flex items-center justify-center text-2xl">
              <img src={SuccessTick} alt="✔️" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 ">
              You're in the queue
            </h3>

            <p className="text-gray-500 text-sm">
              You have joined today's queue. Your token is <strong>#{myToken}</strong>
            </p>

            <button
              onClick={() =>
                navigate(`/queue-status/${doctor.id}?token=${myToken}`)
              }
              className="w-full mt-4 bg-slate-800 text-white py-2.5 rounded-4xl cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* duplicate patient popup */}
      {showDuplicatePatient && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-7 px-10 rounded-4xl w-80 text-center space-y-4 flex flex-col items-center">
            <BanIcon className='w-15 h-15 text-red-600'/>
            <h2 className='text-lg font-semibold'>You cannot book more then one token</h2>
            <button 
              onClick={() => setShowDuplicatePatient(false)}
              className="w-full mt-4 bg-slate-800 text-white py-2.5 rounded-4xl cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )

}

export default DoctorDetails