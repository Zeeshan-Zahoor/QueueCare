import React, { useState, useEffect } from 'react'
import { Building2, MapPin } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateClinicSettingsApi, getAllClinicsApi, getClinicApi } from '../../api/clinicApi.js';

export default function Settings() {
  const [loading, setLoading] = useState(null);
  const [locationSaving, setLocationSaving] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");

  const navigate = useNavigate();
  const { clinicId } = useParams();

  
  const [clinicSettings, setClinicSettings] = useState({
    name: "",
    address: "",
    phone: "",
    location: { type: "Point", coordinates: [0, 0] },
    nearbyEnabled: false,
    workingDays: {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false
    },
    openingTime: "",
    closingTime: "",
    allowWalkIns: false
  });

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await getClinicApi(clinicId);

        if(res.success) {
          setClinicSettings(prev => ({
            ...prev,
            ...res.clinic,
            location: res.clinic.location || { type: "Point", coordinates: [0, 0] },
            nearbyEnabled: res.clinic.nearbyEnabled ?? Boolean(res.clinic.location?.coordinates?.some((coordinate) => Number(coordinate) !== 0)),
            workingDays: res.clinic.workingDays || prev.workingDays
          }));
        }
      } catch (error) {
        console.log("Failed to fetch clinic");
      }
    };

    fetchClinic();
  }, [clinicId]);

  const handleChange = (field, value) => {
    setClinicSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const locationEnabled = Boolean(clinicSettings.nearbyEnabled);

  const persistLocationSetting = async (nearbyEnabled, location) => {
    setLocationSaving(true);
    try {
      const res = await updateClinicSettingsApi(clinicId, { nearbyEnabled, location });
      if (!res.success) throw new Error(res.message || "Failed to update nearby discovery");
      setClinicSettings(prev => ({
        ...prev,
        nearbyEnabled: Boolean(res.clinic?.nearbyEnabled ?? nearbyEnabled),
        location: res.clinic?.location || location,
      }));
      return true;
    } catch (error) {
      setLocationMessage("Could not update nearby discovery. Please try again.");
      return false;
    } finally {
      setLocationSaving(false);
    }
  };

  const handleLocationToggle = () => {
    if (locationEnabled) {
      const previousLocation = clinicSettings.location;
      handleChange("nearbyEnabled", false);
      handleChange("location", { type: "Point", coordinates: [0, 0] });
      setLocationMessage("Saving…");
      persistLocationSetting(false, { type: "Point", coordinates: [0, 0] }).then((saved) => {
        if (saved) setLocationMessage("Nearby discovery is disabled.");
        else {
          handleChange("nearbyEnabled", true);
          handleChange("location", previousLocation);
        }
      });
      return;
    }
    if (!navigator.geolocation) {
      setLocationMessage("Location is not supported by this browser.");
      return;
    }
    setLocationMessage("Requesting your location...");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const location = { type: "Point", coordinates: [coords.longitude, coords.latitude] };
        handleChange("location", location);
        handleChange("nearbyEnabled", true);
        persistLocationSetting(true, location).then((saved) => {
          if (saved) setLocationMessage("Location enabled. Patients can now find your clinic nearby.");
          else handleChange("nearbyEnabled", false);
        });
      },
      () => setLocationMessage("Location permission was not granted. You can try again anytime."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSave = async () => {
    try {
      if (!clinicSettings.name || !clinicSettings.phone) {
        alert("Please fill required fields");
        return;
      }
      setLoading(true);
      const res = await updateClinicSettingsApi(clinicId, clinicSettings);

      if(!res.success) {
        console.log("Failed to update clinic settings");
        return;
      }

      setLoading(false);
      console.log("Clinic updated");
      alert("Clinic settings updated successfully");
      
    } catch (error) {
      console.log("Error updating clinic settings");
    }
  }

  return (
    <div className="flex flex-col max-w-380 m-auto h-screen">

      {/* Top Bar */}
      <div className="bg-white border-b border-gray-400 px-8 py-4 flex items-center gap-3">
        <div className="flex items-center space-x-3 flex-1 bg-white">
          <Building2 />
          <span className="text-slate-800 font-semibold text-lg">Clinic Settings</span>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex flex-1 bg-gray-100">

        {/* Sidebar */}
        <div className="w-60 bg-white border-r border-gray-300">
          <div className="p-4 space-y-2">
            <button
              onClick={() => navigate(`/clinic/${clinicId}/dashboard`)}
              className="w-full flex text-gray-600 px-4 py-2 rounded hover:bg-gray-100">
              Dashboard
            </button>

            <button
              onClick={() => navigate(`/clinic/${clinicId}/settings`)}
              className="w-full flex items-center gap-3 bg-slate-800 text-white px-4 py-2 rounded">
              Settings
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="flex-1 p-8">

          <div className="bg-white rounded-lg shadow border border-gray-200">

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-300">
              <h2 className="text-2xl font-bold text-slate-800">
                Clinic Information
              </h2>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">

              {/* Clinic Name */}
              <div>
                <label className="block text-lg text-slate-600 font-bold mb-1">
                  Clinic / Hospital Name
                </label>

                <input
                  type="text"
                  value={clinicSettings.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full border rounded-md px-3 py-3 text-gray-500 font-semibold"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-lg text-slate-600 font-bold mb-1">
                  Phone Number
                </label>

                <input
                  type="text"
                  value={clinicSettings.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full border rounded-md px-3 py-3 text-gray-500 font-semibold"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-lg text-slate-600 font-bold mb-1">
                  Address
                </label>

                <input
                  type="text"
                  value={clinicSettings.address}
                  onChange={(e) =>  handleChange("address", e.target.value)}
                  className="w-full border rounded-md px-3 py-3 text-gray-500 font-semibold"
                />
              </div>

              {/* Nearby discovery */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-full bg-white p-2 text-slate-700 shadow-sm"><MapPin size={20} /></span>
                  <div><p className="font-bold text-slate-800">Enable nearby discovery</p><p className="mt-1 text-sm text-slate-500">Let patients find your clinic based on its location.</p></div>
                </div>
                <button type="button" role="switch" aria-checked={locationEnabled} aria-busy={locationSaving} disabled={locationSaving} onClick={handleLocationToggle} className={`relative h-7 w-12 shrink-0 rounded-full transition ${locationEnabled ? "bg-emerald-500" : "bg-slate-300"} ${locationSaving ? "cursor-wait opacity-60" : ""}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${locationEnabled ? "left-6" : "left-1"}`} /></button>
              </div>
              {locationMessage && <p className="text-sm text-slate-500">{locationMessage}</p>}

              {/* Working Days */}
              <div className='border-t border-b border-gray-300 py-5 mt-10'>
                <label className="block text-xl text-slate-800 font-bold mb-4">
                  Working Days
                </label>

                <div className="flex justify-between gap-4 flex-wrap">

                  {Object.keys(clinicSettings.workingDays || {}).map(day => (
                    <label
                      key={day}
                      className="flex items-center justify-between gap-2 font-medium text-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={clinicSettings.workingDays[day]}
                        onChange={() => {
                          setClinicSettings((prev) => ({
                            ...prev,
                            workingDays: {
                              ...prev.workingDays,
                              [day]: !prev.workingDays[day]
                            }
                          }))
                        }}
                       className="w-5 h-5 accent-green-500"
                      />
                      {day.toUpperCase()}
                    </label>
                  ))}

                </div>
              </div>

              {/* Opening / Closing Time */}
              <div className="grid grid-cols-2 gap-6">

                <div>
                  <label className="block text-lg font-bold text-slate-800  mb-1">
                    Opening Time
                  </label>

                  <input
                    type="time"
                    value={clinicSettings.openingTime}
                    onChange={(e) => handleChange("openingTime", e.target.value)}
                    className="w-full border rounded-md px-3 py-3 text-slate-600 text-lg font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-slate-800 mb-1">
                    Closing Time
                  </label>

                  <input
                    type="time"
                    value={clinicSettings.closingTime}
                    onChange={(e) => handleChange("closingTime", e.target.value)}
                    className="w-full border rounded-md px-3 py-3 text-slate-600 text-lg font-semibold"
                  />
                </div>

              </div>

              {/* Walk-ins Toggle */}
              <div className="flex items-center justify-between border-t border-gray-300 py-5">

                <span className="text-xl font-bold text-slate-800">
                  Allow Walk-ins Today
                </span>

                <input
                  type="checkbox"
                  checked={clinicSettings.allowWalkIns}
                  onChange={() => handleChange("allowWalkIns", !clinicSettings.allowWalkIns)}
                  className='w-5 h-5 accent-green-500'
                />

              </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-gray-300 px-6 py-5">

              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-600 text-white px-5 py-2 rounded-lg text-lg font-medium"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
