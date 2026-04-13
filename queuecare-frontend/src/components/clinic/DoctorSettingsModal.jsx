import { X, Clock, Ticket } from "lucide-react";
import { useState } from "react";

export default function DoctorSettingsModal({ onClose, doctor, onSave }) {
  const [consultationTime, setConsultationTime] = useState(
    doctor?.consultationTime || 10
  );
  const [maxTokens, setMaxTokens] = useState(
    doctor?.maxTokens || 50
  );

  const handleSave = () => {
    onSave({
      consultationTime,
      maxTokens,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      
      {/* Modal */}
      <div className="w-160 p-1 rounded-lg bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-slate-800">
            Doctor Settings
          </h2>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Body */}
        <div className="flex w-full justify-between px-12">

          <div className="py-6 space-y-6 flex-1 pr-10">
          {/* Consultation Time */}
          <div>
            <label className="flex items-center gap-2 text-lg font-medium text-gray-600 mb-2">
              <Clock className="w-5 h-5" />
              Consultation Time
            </label>

            <select
              value={consultationTime}
              onChange={(e) => setConsultationTime(Number(e.target.value))}
              className="w-full outline outline-gray-400 rounded-lg px-3 py-3 text-lg focus:outline-0 focus:ring-2 focus:ring-blue-500"
            >
              {[5, 10, 15, 20, 30].map((time) => (
                <option key={time} value={time}>
                  {time} min
                </option>
              ))}
            </select>
          </div>

          {/* Daily Token Limit */}
          <div>
            <label className="flex items-center gap-2 text-lg font-medium text-gray-600 mb-2">
              <Ticket className="w-5 h-5" />
              Daily Token Limit
            </label>

            <input
              type="number"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              className="w-full outline outline-gray-400 rounded-lg px-3 py-3 text-lg focus:outline-0 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter max tokens"
            />
          </div>

          </div>

          {/* image */}
          <div className="pt-5 text-center">
            <div className="w-48 h-48 p-2 bg-slate-700 rounded-full">
              <img 
                src={doctor?.image} 
                alt=""
                className="w-full h-full object-cover rounded-full"
                />
            </div>
            {/* Name */}
            <h1 className="text-slate-800 font-semibold text-xl">{doctor?.name}</h1>
          <h1 className="text-xs text-gray-400">Click on image to change</h1>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-300 mt-5">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg bg-gray-200 text-lg font-semibold text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-3 text-lg font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}