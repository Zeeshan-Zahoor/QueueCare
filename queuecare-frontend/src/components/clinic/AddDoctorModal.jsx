import React, { useState } from 'react'
import { Plus, Stethoscope } from "lucide-react"
import { useParams } from "react-router-dom";
import { addDoctorApi } from '../../api/clinicApi';

function AddDoctorModal({
    onClose
}) {
    const { clinicId } = useParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        specialization: "",
        clinicId,
        queue: [],
    })


    const handleAddDoctor = async () => {
      try {
        setLoading(true);
        const res = await addDoctorApi(formData);
        if(!res.success) {
          setError(res.message);
          return;
        }
        onClose();
      } catch (error) {
        setError("Error adding doctor");
        console.log("ERROR: ", error)
      } finally {
        setLoading(false);
      }
    }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          {/* Modal */}
          <div className="w-140 rounded-lg bg-white shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-300 px-6 py-4 bg-[#E6E6E6] rounded-t-lg">
              <h2 className="text-xl font-bold text-slate-800">
                Add Doctor
              </h2>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">

              {/* Doctor Name */}
              <div>
                <label className="block text-lg font-semibold text-slate-800 mb-1">
                  Doctor Name
                </label>

                <input
                  type="text"
                  placeholder="Doctor Name"
                  value={formData.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    name: e.target.value
                  })}
                  className="w-full rounded-md border border-gray-300 px-3 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-lg font-semibold text-slate-800 mb-1">
                  Specialization
                </label>

                <div className="flex items-center border border-gray-300 rounded-md px-3 py-3">
                  <Stethoscope size={26} className="text-gray-400 mr-2 border-black" />

                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({
                      ...formData,
                      specialization: e.target.value
                    })}
                    className="w-full outline-none border-l border-gray-400 pl-2 text-lg"
                    placeholder="Specialization"
                  />
                </div>
              </div>

              {error && (
                <p className='text-sm text-red-500 text-center'>{error}</p>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-300 px-6 py-5 mt-4">

              <button
                onClick={onClose}
                className="rounded-md bg-gray-300 px-6 py-2 font-semibold text-gray-800 hover:bg-gray-200 cursor-pointer"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleAddDoctor}
                className="flex items-center gap-2 rounded-md bg-slate-800 px-6 py-3 text-white cursor-pointer hover:bg-slate-700"
              >
                <Plus size={20} />
                {loading ? "Adding..." : "Add Doctor"}
              </button>

            </div>

          </div>
        </div>
  )
}

export default AddDoctorModal