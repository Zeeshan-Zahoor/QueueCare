import React, { useState } from "react";
import { Building2, Phone, Plus, BanIcon } from "lucide-react";
import cloudIcon from "../../assets/cloud_icon.jpg";
import DoctorCardClinic from "../../components/clinic/DoctorCardClinic";
import { useParams } from "react-router-dom";
import { clinics } from "../../data/mockData";
import { useContext } from "react";
import { QueueContext } from "../../contexts/QueueContext";


export default function Dashboard() {

  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [showDuplicatePatient, setShowDuplicatePatient] = useState(false);

  const [walkInPatientData, setWalkInPatientData] = useState({
    name: "",
    phone: "",
  })

  const { clinicId } = useParams();

  const clinic = clinics.find((c) => (
    c.id === Number(clinicId)
  ))

  if (!clinic) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Clinic not found</p>
      </div>
    );
  }

  const { doctorData, advanceToken, joinQueue } = useContext(QueueContext);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctorId(doctor.id);
  }

  const selectedDoctor = clinic.doctors.find(d => d.id === selectedDoctorId);

  const doctorInfo = selectedDoctorId ? doctorData[selectedDoctorId] || selectedDoctor : null;

  const handleCallNextPatient = () => {
    advanceToken(selectedDoctorId, doctorInfo);
  };

  const handleWalkInPatient = () => {
    if (!walkInPatientData.name) return;

    const token = joinQueue(selectedDoctorId, doctorInfo, walkInPatientData, "Walk-in");

    if (token === -1) {
      setShowDuplicatePatient(true);
      return;
    }

    setShowWalkInModal(false);

    setWalkInPatientData({
      name: "",
      phone: ""
    });

  }

  return (
    <div className="flex flex-col max-w-screen-2xl m-auto h-screen">
      {/* Top Bar - unchanged */}
      <div className="bg-white border-b border-gray-400 px-8 py-4 flex items-center justify-end gap-8">
        <div className="flex items-center space-x-3 flex-1 bg-white">
          <Building2 />
          <span className="text-slate-800 font-semibold text-lg">{clinic.name}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          {(new Date()).toDateString()}
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          {clinic.status === "Open" ? "Active" : "Closed"}
        </div>

        <button className="bg-slate-800 text-white px-4 py-2 rounded">
          End Day
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

            <button className="w-full flex items-center gap-3 text-gray-600 px-4 py-2 rounded hover:bg-gray-100">
              Settings
            </button>
          </div>
        </div>

        {/* Doctor bar - unchanged */}
        <div className="w-80 bg-white border-r border-gray-300 h-full">
          <div className="p-3 space-y-2">
            <h2 className="text-lg text-slate-800 font-bold">Doctors</h2>

            {clinic.doctors.map((doctor) => {
              const doctorInfo = doctorData[doctor.id] || doctor;
              return (
                <DoctorCardClinic
                  key={doctorInfo.id}
                  doctor={doctorInfo}
                  clickHandler={() => handleDoctorClick(doctorInfo)}
                  active={selectedDoctorId === doctor.id}
                />
              )
            })}

          </div>
        </div>

        {/* Main - FIXED SECTION */}
        {doctorInfo ? (
          <div className="flex flex-col flex-1 min-h-0"> {/* Added min-h-0 */}

            {/* Content */}
            <div className="p-5 flex flex-col h-full gap-6 min-h-0"> {/* Added min-h-0 */}

              {/* Cards - fixed height, won't grow */}
              <div className="grid grid-cols-3 gap-6 shrink-0"> {/* Added shrink-0 */}
                <div className="bg-white p-6 rounded shadow-sm">
                  <p className="text-gray-500">Current Token</p>
                  <div className="text-4xl font-bold mt-2">#{doctorInfo.currentlyServing}</div>
                  <p className="text-gray-600 mt-1">Now Serving</p>
                </div>

                <div className="bg-white p-6 rounded shadow-sm">
                  <p className="text-gray-500">Next in Queue</p>
                  <div className="text-4xl font-bold text-green-600 mt-2">#{doctorInfo?.queue?.[0]?.token || "-"}</div>
                </div>

                <div className="bg-white p-6 rounded shadow-sm">
                  <p className="text-gray-500">Waiting Patients</p>
                  <div className="text-3xl font-bold text-orange-500 mt-2">{doctorInfo?.queue?.length || 0} Patients</div>
                </div>
              </div>

              {/* Table Container - FIXED: This will scroll */}
              <div className="bg-gray-200 rounded shadow-sm flex flex-col flex-1 min-h-0"> {/* Added min-h-0 */}
                <div className="p-6 font-semibold text-lg border-b shrink-0"> {/* Added shrink-0 */}
                  Today’s Queue
                </div>

                {/* Scrollable table area */}
                <div className="flex-1 overflow-auto min-h-0">
                  <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10">
                      <tr> {/* Remove any whitespace between thead and tr */}
                        <th className="p-4">Token</th>
                        <th className="p-4">Patient Name</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Source</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {doctorInfo?.queue?.map((p) => (
                        <tr
                          key={p.token}
                          className="border-t bg-white"
                        >
                          <td className="p-4 font-medium">{p.token}</td>
                          <td className="p-4">{p.name}</td>
                          <td className="p-4">{p.phone}</td>
                          <td className="p-4">{p.source}</td>
                          <td className="p-4 text-gray-600">Waiting</td>

                          <td className="p-4">

                            <button className="bg-slate-800 text-white min-w-30 px-4 py-2 rounded">
                              Call
                            </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Buttons - fixed position, won't move */}
              <div className="flex gap-4 shrink-0"> {/* Added shrink-0 */}
                <button
                  onClick={() => setShowWalkInModal(true)}
                  className="bg-slate-800 text-white px-5 py-3 rounded">
                  + Add Walk-in
                </button>

                <button className="bg-orange-500 text-white px-5 py-3 rounded">
                  Delay Queue
                </button>

                <button
                  onClick={handleCallNextPatient}
                  disabled={doctorInfo.queue.length === 0}
                  className="bg-green-600 text-white px-5 py-3 rounded cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">
                  Call Next Patient →
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