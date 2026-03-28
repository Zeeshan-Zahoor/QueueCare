import { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import doctorIcon from "../../assets/doctorIcon.png";
import consultingIcon from "../../assets/consultingIcon.png";
import { Clock, CircleXIcon, BanIcon, AlertTriangle } from 'lucide-react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/common/BottomNav';
import { getDoctorByIdApi, exitQueueApi } from '../../api/clinicApi.js';

export default function QueueStatus() {
  const navigate = useNavigate();

  //backend state
  const [doctor, setDoctor] = useState(null);

  const [showCancel, setShowCancel] = useState(false);
  const [notAllowedModal, setNotAllowedModal] = useState(false);

  const { doctorId } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const token = Number(searchParams.get("token"));

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await getDoctorByIdApi(doctorId);

        if(res.success) {
          setDoctor(res.doctor);
        }
      } catch (error) {
        console.log("Failed to fetch doctor");
      }
    };

    fetchDoctor();

    const interval = setInterval(fetchDoctor, 5000); //polling

    return () => clearInterval(interval);

  }, [doctorId])
  
  if(!doctor) return <p>Loading...</p>;

  const currentToken = doctor.currentlyServing;

  const peopleAhead = Math.max(0, token - doctor.currentlyServing);

  const estimatedWait = peopleAhead * doctor.consultationTime;

  const canCancel = token > doctor.currentlyServing;

  if(token < doctor.currentlyServing) { // already served
    // delete from localStorage
    localStorage.removeItem("activeToken")
  }


  const handleCancelToken = async () => {
    try {
      const res = await exitQueueApi(doctorId, token);

      if(!res.success) {
        setNotAllowedModal(true);
        setShowCancel(false);
        return;
      }

      setShowCancel(false);

      //remove from localStorage
      localStorage.removeItem("activeToken");

      navigate(`/doctor/${doctorId}`);

    } catch (error) {
      console.log("Cancel failed");
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6 h-dvh">
      {/* Header */}
      <Header
        title="Queue Status"
      />

      <div className='text-center pt-3'>
        <div className="w-34 h-34 mx-auto bg-[#A4CFC3] rounded-full flex items-center justify-center">
          <div className="w-30 h-30 mx-auto bg-[#59B097] rounded-full flex items-center justify-center text-4xl font-semibold text-white">
            {token}
          </div>
        </div>
        <p className='mt-3 text-slate-800 font-medium'>Your Token</p>
      </div>

      <div className="bg-white p-3 rounded-xl border border-gray-300 shadow-[0_5px_10px_rgba(0,0,0,0.3)] flex gap-2">
        <div className='w-13 h-13 bg-[#B3DAE7] rounded-full'>
          <img
            src={doctorIcon}
            alt={doctor.name} />
        </div>
        <div className='flex-1'>
          <p className="text-sm text-gray-700 font-medium">
            Currently seeing patient :
          </p>
          <p className="text-lg text-slate-800 font-bold">
            #{currentToken}
          </p>
        </div>
      </div>

      <div className='ml-1 mb-5'>
        <h2 className="text-normal font-bold text-gray-800">Estimated Waiting Time</h2>
        <div className='flex items-center gap-1 mt-1'>
          <Clock className='w-5 h-5 text-[#3ea789]' />
          <p className="text-sm text-gray-800 font-bold">~{estimatedWait} minutes</p>
        </div>
      </div>

      {doctor.consultationStatus === "paused" && (
        <div className='bg-yellow-100 text-yellow-800 p-3 rounded flex items-center gap-3'>
          <AlertTriangle className="text-yellow-700 w-8 h-8" /> Consultation temporarily paused. Doctor will resume shortly.
        </div>
      )}

      {/* Queue progress bar section */}
      <div className='flex justify-between items-end-safe gap-2 py-2'>
        {/* consulting icon */}
        <div className='w-12 h-12'>
          <img 
            src={consultingIcon} 
            alt="Under Consultation" 
          />
        </div>

        {/* bar */}
        <div className="flex flex-col items-center gap-6 h-fit w-full">

        {/* Top Pills */}
        <div className="flex w-3/5 justify-between">
          <div className="px-3 py-2 rounded-xl bg-white shadow text-[#299D7C] font-semibold text-lg">
            {doctor.queue?.[0]?.token || "NA"}
          </div>
          <div className="px-3 py-2 rounded-xl bg-white shadow text-[#82D0BA] font-semibold text-lg">
            {doctor.queue?.[1]?.token || "NA"}
          </div>
          <div className="px-3 py-2 rounded-xl bg-white shadow text-[#C77934] font-semibold text-lg">
            {doctor.queue?.[2]?.token || "NA"}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full bg-gray-700 rounded-full">

          {/* Green section */}
          <div className="absolute left-0 top-0 h-2 w-1/4 bg-[#299D7C] rounded-l-full" />

          {/* Teal section */}
          <div className="absolute left-1/4 top-0 h-2 w-1/4 bg-[#82D0BA]" />

          {/* Orange section */}
          <div className="absolute left-2/4 top-0 h-2 w-1/4 bg-[#C77934]" />
          
          {/* black section */}
          <div className="absolute left-3/4 top-0 h-2 w-1/4 bg-[#374151] rounded-r-full" />

          {/* Circles */}
          <div className="absolute -top-1.5 left-1/5 w-5 h-5 bg-[#299D7C] rounded-full border-3 border-gray-100" />
          <div className="absolute -top-1.5 left-1/2 w-5 h-5 bg-[#82D0BA] rounded-full border-3 border-gray-100 -translate-x-1/2" />
          <div className="absolute -top-1.5 right-1/5 w-5 h-5 bg-[#C77934] rounded-full border-3 border-gray-100" />
        </div>

      </div>
      </div>

      {/* bottom message */}
      <div className='rounded-xl border border-gray-300 shadow-[0_3px_10px_rgba(0,0,0,0.25)] py-2 px-3'>
        <p className='text-sm text-slate-500 font-medium'>
          Please reach the Hospital/Clinic atleast 15 minutes prior.
        </p>
      </div>

      {/* token cancelation button */}
      <div className='w-full p-2 flex flex-col space-y-2 pb-25'>
        <h2 className='font-semibold text-slate-800'>Manage Appointment</h2>
        <div 
          role='button'
          disabled={!canCancel}
          onClick={() => setShowCancel(true)}
          className='w-full flex gap-2 rounded-lg border-2 border-red-800 p-2 hover:bg-red-200 transition'>
          <CircleXIcon className='text-red-900'/>
          <span className='text-red-800 font-semibold'>Cancel My Token</span>
        </div>
        <p className='text-sm text-gray-500 font-semibold'>Cancelling will remove you from today's queue. <br /> This action cannot be undone.</p>
      </div>


      {/* Bottom Navigation */}
      <BottomNav />

      {/* Cancel Token confirmation modal */}
      {showCancel && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-7 px-10 rounded-4xl w-80 text-center space-y-4 flex flex-col items-center">
            <h1 className='text-5xl'>⚠️</h1>
            <h2 className='text-lg font-semibold'>Are you sure you want to cancel your token?</h2>
            <button 
              onClick={handleCancelToken}
              className="w-full mt-4 bg-slate-800 text-white py-2.5 rounded-4xl cursor-pointer">
              Confirm
            </button>
            <button 
              onClick={() => setShowCancel(false)}
              className="w-full bg-gray-200 text-slate-800 py-2.5 rounded-4xl cursor-pointer font-semibold">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* cancel not allowed pop up model */}
      {notAllowedModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-7 px-10 rounded-4xl w-80 text-center space-y-4 flex flex-col items-center">
            <BanIcon className='w-10 h-10 text-gray-500'/>
            <h2 className='text-lg font-semibold'>Token cannot be cancelled now.</h2>
            <button 
              onClick={() => setNotAllowedModal(false)}
              className="w-full mt-4 bg-slate-800 text-white py-2.5 rounded-4xl cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
