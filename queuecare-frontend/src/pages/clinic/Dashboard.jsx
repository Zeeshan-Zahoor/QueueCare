import React, { useState, useEffect } from "react";
import { Building2, Phone, Plus, BanIcon, ArrowRight, AlertTriangle, Settings } from "lucide-react";
import cloudIcon from "../../assets/cloud_icon.jpg";
import DoctorCardClinic from "../../components/clinic/DoctorCardClinic";
import { useParams, useNavigate } from "react-router-dom";
import DoctorSettingsModal from "../../components/clinic/DoctorSettingsModal";
import { getDoctorsApi,
         getDoctorByIdApi, 
         advanceTokenApi, 
         joinQueueApi, 
         exitQueueApi, 
         toggleConsultationApi, 
         toggleDayApi, 
         updateDoctorSettingsApi,
        } 
from "../../api/clinicApi.js";
import Spinner from "../../components/loaders/Spinner.jsx";

export default function Dashboard() {
  const navigate = useNavigate();

  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [showDuplicatePatient, setShowDuplicatePatient] = useState(false);

  const [walkInPatientData, setWalkInPatientData] = useState({
    name: "",
    phone: "",
    source: "walk-in"
  })

  const [doctorSettingsModal, setDoctorSettingsModal] = useState(false);

  const [doctors, setDoctors] = useState([]);

  const { clinicId } = useParams();

  useEffect(() => {
    const fetchDoctors = async () => {
        try {
          const res = await getDoctorsApi(clinicId);
          if (res.success) {
            setDoctors(res.doctors);
          }
        } catch (error) {
          console.log("Error to fetch the doctors");
        }
    }
  
    fetchDoctors();

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") { // small optimization -> when page is active 
      console.log("Polling...");
      fetchDoctors();
    }
    }, 3000);

    return () => clearInterval(interval);
  }, [clinicId]);

  useEffect(() => { // select last selected doctor again automatically on refresh
    const lastSelectedDoctorId = localStorage.getItem("selectedDoctorId");

    if(!lastSelectedDoctorId) return;
    else setSelectedDoctorId(lastSelectedDoctorId);
  }, [])

  const selectedDoctor = doctors.find((doc) => doc._id === selectedDoctorId);

  if (!selectedDoctor && selectedDoctorId) {
    return <Spinner/> 
  }

  const handleDoctorClick = (doctor) => {
    setSelectedDoctorId(doctor._id);
    localStorage.setItem("selectedDoctorId", doctor._id);
  }

  const handleCallNextPatient = async () => {
    if (!selectedDoctorId) return;

    try {
      const res = await advanceTokenApi(selectedDoctorId);

      if (!res.success) {
        console.log("Failed to advance token");
        return;
      }

      // update the state of doctor
      const updated = await getDoctorByIdApi(selectedDoctorId);
      if (updated.success) {
        const updatedDoctor = updated.doctor;

        setDoctors((prev) =>
          prev.map((doc) =>
            doc._id === updatedDoctor._id ? updatedDoctor : doc
          )
        );
      }

    } catch (error) {
      console.log("Error advancing token: ", error.message);
    }
  };

  const handleRemovePatient = async (token) => {
    try {
      const res = await exitQueueApi(selectedDoctorId, token);

      if (!res.success) {
        console.log("Failed to remove patient: ");
        return;
      }

      //update doctor state
      const updated = await getDoctorByIdApi(selectedDoctorId);
      if (updated.success) {
        const updatedDoctor = updated.doctor;

        setDoctors((prev) =>
          prev.map((doc) =>
            doc._id === updatedDoctor._id ? updatedDoctor : doc
          )
        );
      }

    } catch (error) {
      console.log("Error removing the patient");
    }
  }

  const handleWalkInPatient = async () => {
    if (!walkInPatientData.name || !walkInPatientData.phone) return;

    try {
      const res = await joinQueueApi(selectedDoctorId, walkInPatientData);

      if (res.message === "Patient already in queue") {
        setShowWalkInModal(false);
        setShowDuplicatePatient(true);
        return;
      }

      if (res.success) {
        setShowWalkInModal(false);
        setWalkInPatientData({
          name: "",
          phone: "",
        });

        //update doctor state
        const updated = await getDoctorByIdApi(selectedDoctorId);
        if (updated.success) {
          const updatedDoctor = updated.doctor;

          setDoctorInfo(updatedDoctor);

          //update doctor list also in side bar
          setDoctors((prev) =>
            prev.map((doctor) =>
              doctor._id === updatedDoctor._id ? updatedDoctor : doctor
            )
          )

        }

      }
    } catch (error) {
      console.log("Error adding walk-in");
    }

  };

  const tokensLeft = selectedDoctor?.maxTokens - (selectedDoctor?.currentlyServing + selectedDoctor?.queue.length);
  const isFull = tokensLeft <= 0;

  const handleToggleConsultation = async () => {
    try {
      const res = await toggleConsultationApi(selectedDoctorId);

      if(!res.success) {
        console.log("Failed to toggle consultation");
        return;
      }

      const updated = await getDoctorByIdApi(selectedDoctorId);
      if(updated.success) {
        const updatedDoctor = updated.doctor;
        
        setDoctorInfo(updatedDoctor);

        setDoctors((prev) => 
          prev.map(doctor => 
            doctor._id === updatedDoctor._id ? updatedDoctor : doctor
          )
        ) 
      }

    } catch (error) {
      console.log("Error toggling Consultation");
    }
  }

  const handleToggleDay = async () => {
    try {
      const res = await toggleDayApi(selectedDoctorId);

      if(!res.success) {
        console.log("Failed to toggle day");
        return;
      }

      const updated = await getDoctorByIdApi(selectedDoctorId);
      if(updated.success) {
        const updatedDoctor = updated.doctor;
        
        setDoctorInfo(updatedDoctor);

        setDoctors((prev) => 
          prev.map(doctor => 
            doctor._id === updatedDoctor._id ? updatedDoctor : doctor
          )
        ) 
      }

    } catch (error) {
      console.log("Error toggling day");
    }
  }

  const handleSaveDoctorSettings = async (data) => {
    try {
      const res = await updateDoctorSettingsApi(selectedDoctorId, data);

      if(!res.success) {
        console.log("Failed to update doctor settings");
        return;
      }

      const updatedDoctor = res.doctor;

      setDoctorInfo(updatedDoctor);

      setDoctors(prev => 
        prev.map(doctor => 
          doctor._id === updatedDoctor._id ? updatedDoctor : doctor
        )
      )
    } catch (error) {
      console.log("Error updating doctor settings");
    }
  }


  const handleLogout= () => {
    localStorage.removeItem("jwt_token");
    navigate("/clinic");
  }

  return (
    <div className="flex flex-col max-w-screen-2xl m-auto h-screen">
      {/* Top Bar - unchanged */}
      <div className="bg-white border-b border-gray-400 px-8 py-4 flex items-center justify-end gap-8">
        <div className="flex items-center space-x-3 flex-1 bg-white">
          <Building2 />
          <span className="text-slate-800 font-semibold text-lg">Clinic Dashboard</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          {(new Date()).toDateString()}
        </div>

        {selectedDoctor && (
          <div className="flex items-center gap-2 text-gray-700">
            <span
              className={`w-3 h-3 rounded-full ${selectedDoctor.status === "open" ? "bg-green-500" : "bg-red-500"
                }`}
            />
            {selectedDoctor.status === "open" ? "Consultation Active" : "Consultation Closed"}
          </div>
        )}

        <button
          onClick={handleToggleDay}
          className={`${selectedDoctor?.status === "open" ? "bg-slate-800" : "bg-green-700"} text-white px-4 py-2 rounded disabled:bg-gray-400 ${selectedDoctorId ? "" : "hidden"} active:scale-95 transition-transform duration-150`}
          
          >
          {selectedDoctor?.status === "open" ? "End Consultation" : "Start Consultation"}
        </button>

        <button
          onClick={handleLogout}
          className="bg-orange-600 text-white px-6 py-2 rounded active:scale-95 transition-transform duration-150"
        >
          Logout
        </button>
      </div>

      {/* body */}
      <div className="flex w-full flex-1 min-h-0"> {/* Added min-h-0 here */}

        {/* Sidebar - unchanged */}
        <div className="w-60 bg-white border-r border-gray-300">
          <div className="p-4 space-y-2">
            <button className="w-full flex items-center gap-3 bg-slate-800 text-white px-4 py-2 rounded">
              Dashboard
            </button>

            <button
              onClick={() => navigate(`/clinic/${clinicId}/settings`)}
              className="w-full flex items-center gap-3 text-gray-600 px-4 py-2 rounded hover:bg-gray-100">
              Settings
            </button>
          </div>
        </div>

        {/* Doctor bar - unchanged */}
        <div className="w-80 bg-white border-r border-gray-300 h-full">
          <div className="p-3 space-y-2">
            <h2 className="text-lg text-slate-800 font-bold">Doctors</h2>

            {doctors.map((doctor) => (
              <DoctorCardClinic
                key={doctor._id}
                doctor={doctor}
                clickHandler={() => handleDoctorClick(doctor)}
                active={selectedDoctorId === doctor._id}
              />
            ))}

          </div>
        </div>

        {/* Main - FIXED SECTION */}
        {selectedDoctor ? (
          <div className="flex flex-col flex-1 min-h-0"> {/* Added min-h-0 */}

            {selectedDoctor?.consultationStatus === "paused" && (
              <div className="w-full bg-yellow-100 border-b border-yellow-300 px-6 py-3 flex items-center gap-3">

                {/* Warning Icon */}
                <AlertTriangle className="text-yellow-700 w-6 h-6" />

                {/* Text */}
                <div className="flex flex-col">
                  <span className="font-semibold text-yellow-800">
                    Consultation Paused
                  </span>
                  <span className="text-sm text-yellow-700">
                    Doctor temporarily unavailable. Queue is currently on hold.
                  </span>
                </div>

              </div>
            )}
            {/* Content */}
            <div className="p-5 flex flex-col h-full gap-6 min-h-0"> {/* Added min-h-0 */}

              {/* Cards - fixed height, won't grow */}
              <div className="grid grid-cols-3 gap-6 shrink-0"> {/* Added shrink-0 */}

                <div className="bg-white p-6 rounded shadow-lg">
                  <p className="text-slate-700 font-medium">Now Serving</p>

                  <div className="text-4xl text-slate-800 font-bold mt-2">
                    Token: #{selectedDoctor.currentlyServing || "-"}
                  </div>

                  <p className="text-gray-600 mt-2">
                    Patient under consultation
                  </p>
                </div>

                <div className="bg-white p-6 rounded shadow-lg">
                  <p className="text-slate-700 font-medium">Next in Queue</p>
                  <div className="text-4xl font-bold text-green-600 mt-2">Token: #{selectedDoctor?.queue?.[0]?.token || "-"}</div>
                </div>

                <div className="bg-white p-6 rounded shadow-lg">
                  <p className="text-slate-700 font-medium">Waiting Patients</p>
                  <div className="text-3xl font-bold text-orange-500 mt-2">{selectedDoctor?.queue?.length || 0} Patients</div>
                </div>
              </div>

              {/* Table Container - FIXED: This will scroll */}
              <div className="bg-gray-200 rounded shadow-sm flex flex-col flex-1 min-h-0"> {/* Added min-h-0 */}
                <div className="p-3 pl-6 font-bold text-xl text-slate-800 border-b border-gray-300 shrink-0 flex justify-between items-center"> {/* Added shrink-0 */}
                  <div>
                    Today's Queue
                  </div>
                  <button
                    onClick={() => setDoctorSettingsModal(true)}
                    className="bg-white border border-slate-300 text-lg px-5 py-2 rounded-md flex items-center gap-2 cursor-pointer hover:bg-slate-100 hover:border-slate-400">
                    <Settings className="w-5 h-5" />
                    Settings
                  </button>
                </div>

                {/* Scrollable table area */}
                <div className="flex-1 overflow-auto min-h-0">
                  <table className="w-full">
                    <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10">
                      <tr> {/* Remove any whitespace between thead and tr */}
                        <th className="p-4">Token</th>
                        <th className="p-4">Patient Name</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Source</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>
                      </tr>

                      {selectedDoctor?.queue.length === 0 && (
                        <tr>
                          <td colSpan="6" className="bg-slate-200 py-6 text-gray-500 text-center">
                            No patients in queue
                          </td>
                        </tr>
                      )}
                    </thead>

                    <tbody className="text-center">
                      {selectedDoctor?.queue?.map((p) => (
                        <tr
                          key={p.token}
                          className="border-t border-gray-300 bg-white"
                        >
                          <td className="p-4 font-medium">{p.token}</td>
                          <td className="p-4">{p.name}</td>
                          <td className="p-4">{p.phone}</td>
                          <td className="p-4">{p.source}</td>
                          <td className="p-4 text-gray-600">Waiting</td>

                          <td className="p-4">

                            <button
                              onClick={() => handleRemovePatient(p.token)}
                              className="bg-slate-800 text-white min-w-30 px-4 py-2 rounded cursor-pointer hover:bg-slate-700">
                              Remove
                            </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Doctor Settings Modal */}
              {doctorSettingsModal && (
                <DoctorSettingsModal
                  onClose={() => setDoctorSettingsModal(false)}
                  doctor={selectedDoctor}
                  onSave={handleSaveDoctorSettings}
                />
              )}

              {/* Bottom Buttons - fixed position, won't move */}
              <div className="flex gap-4 shrink-0"> {/* Added shrink-0 */}
                <button
                  onClick={() => setShowWalkInModal(true)}
                  disabled={isFull || selectedDoctor.consultationStatus === "paused"}
                  className="bg-slate-800 text-white px-5 py-3 rounded text-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-95 transition-transform duration-150">
                  <div className="flex items-center gap-1"><Plus className="font-medium" /> Add Walk-in</div>
                </button>

                <button
                  onClick={handleToggleConsultation}
                  className={`text-white px-5 py-3 rounded cursor-pointer text-lg font-medium ${selectedDoctor.consultationStatus === "active" ? "bg-orange-400" : "bg-green-500"} active:scale-95 transition-transform duration-150`}>
                  {selectedDoctor.consultationStatus === "paused" ? "Resume Consultation" : "Hold Consultation"}
                </button>

                <button
                  onClick={handleCallNextPatient}
                  disabled={selectedDoctor.queue.length === 0 || selectedDoctor.consultationStatus === "paused"}
                  className="bg-green-600 text-white px-5 py-3 rounded cursor-pointer text-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 active:scale-95 transition-transform duration-150">
                  Call Next Patient <ArrowRight className="font-medium" />
                </button>
              </div>
            </div>
          </div>
        ) :
          (
            <div className="p-4 flex justify-center items-center flex-1">
              <div className="text-center">
                <img
                  src={cloudIcon}
                  className="w-50"
                />
                <h2 className="text-slate-400 text-lg font-bold">No Doctor Selected</h2>
              </div>
            </div>
          )}

      </div>

      {/* duplicate patient popup */}
      {showDuplicatePatient && (
        <div className="fixed inset-0 z-40 bg-black/30 bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-7 px-20 rounded-xl w-100 text-center space-y-4 flex flex-col items-center">
            <BanIcon className='w-15 h-15 text-red-600' />
            <h2 className='text-lg font-semibold'>A patient can not me enrolled more then once. </h2>
            <button
              onClick={() => setShowDuplicatePatient(false)}
              className="w-full mt-4 bg-slate-800 text-white py-2.5 rounded-xl cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add walk-in Modal */}
      {showWalkInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          {/* Modal */}
          <div className="w-160 rounded-lg bg-white shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-300 px-6 py-4 bg-[#E6E6E6] rounded-t-lg">
              <h2 className="text-xl font-bold text-slate-800">
                Add Walk-in Patient
              </h2>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">

              {/* Patient Name */}
              <div>
                <label className="block text-lg font-semibold text-slate-800 mb-1">
                  Patient Name
                </label>

                <input
                  type="text"
                  placeholder="Patient Name"
                  value={walkInPatientData.name}
                  onChange={(e) => setWalkInPatientData({
                    ...walkInPatientData,
                    name: e.target.value
                  })}
                  className="w-full rounded-md border border-gray-300 px-3 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-lg font-semibold text-slate-800 mb-1">
                  Phone Number
                  <span className="text-gray-400 text-sm ml-1">(optional)</span>
                </label>

                <div className="flex items-center border border-gray-300 rounded-md px-3 py-3">
                  <Phone size={26} className="text-transparent mr-2 fill-gray-400 border-black" />

                  <input
                    type="text"
                    value={walkInPatientData.phone}
                    onChange={(e) => setWalkInPatientData({
                      ...walkInPatientData,
                      phone: e.target.value
                    })}
                    className="w-full outline-none border-l border-gray-400 pl-2 text-lg"
                    placeholder="Phone"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-300 px-6 py-5 mt-4">

              <button
                onClick={() => setShowWalkInModal(false)}
                className="rounded-md bg-gray-300 px-6 py-2 font-semibold text-gray-800 hover:bg-gray-200 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleWalkInPatient}
                className="flex items-center gap-2 rounded-md bg-slate-800 px-5 py-2 text-white cursor-pointer hover:bg-slate-700"
              >
                <Plus size={20} />
                Add to Queue
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
  
}