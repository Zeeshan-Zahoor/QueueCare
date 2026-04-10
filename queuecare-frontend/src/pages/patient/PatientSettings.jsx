import { useState, useContext } from "react";
import Header from "../../components/common/Header";
import {
  Bell,
  MapPin,
  Globe,
  Sun,
  ChevronRight,
  Building2,
  LogOutIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from '../../components/common/BottomNav';
import LocationModal from "../../components/patient/LocationModal";
import { LocationContext } from "../../contexts/LocationContext";

function PatientSettings() {
  const navigate = useNavigate();
  const { location } = useContext(LocationContext);

  const [confirmLogout, setConfirmLogout] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user_jwt_token");
    navigate("/login");
  }

  return (
    <div className="max-w-md min-h-dvh mx-auto px-4 py-5 bg-gray-50 flex flex-col pb-[calc(70px+env(safe-area-inset-bottom))]">

      <Header title="Settings" />

      {/* SETTINGS CARD */}
      <div className="mt-6 bg-slate-200 rounded-xl">
        <h2 className="text-lg font-semibold text-slate-800 p-2 pl-4">
          Settings
        </h2>

        <div className="bg-white shadow-sm divide-y text-gray-300 rounded-b-xl">

          {/* Notification */}
          <SettingItem
            icon={<Bell size={20} />}
            title="Notification Settings"
          />

          {/* Location */}
          <SettingItem
            icon={<MapPin size={20} />}
            title="Location"
            subtitle="Current Location"
            clickHandler={() => setLocationModalOpen(true)}
          />

          {/* Language */}
          <SettingItem
            icon={<Globe size={20} />}
            title="Language"
            subtitle="English"
          />

          {/* Appearance */}
          <SettingItem
            icon={<Sun size={20} />}
            title="Appearance"
            subtitle="Light"
          />
        </div>


        {/* location modal */}
        {locationModalOpen && (
          <LocationModal 
            location={location}
            isOpen={locationModalOpen}
            onClose={() => setLocationModalOpen(false)}
          />
        )}
      </div>

      {/* logout */}
      <div 
        onClick={() => setConfirmLogout(true)}
        className="w-full p-3 bg-red-100 mt-2 rounded-xl shadow-lg">
        <button
          className="flex items-center gap-4 pl-1 text-red-600 font-medium"
        >
          <div className="p-2 bg-red-200 rounded-lg">
            <LogOutIcon
              size={20}
              className="text-red-600"
            />
          </div>
          Logout
        </button>
      </div>

      {confirmLogout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-10 z-10 ">
          <div className="bg-white rounded-4xl w-full max-w-xs p-8 flex flex-col items-center shadow-xl">

            {/* Icon */}
              <div className="bg-[#9fc5be] rounded-full flex items-center justify-center p-6">
                <LogOutIcon className="text-white" size={40}/>
              </div>

            {/* Text */}
            <h2 className="text-xl font-bold text-slate-800 mb-2 mt-2">Logout?</h2>
            <p className="text-sm text-gray-400 text-center mb-7 leading-relaxed">
              Are you sure you want to log out of your account?
            </p>

            {/* Buttons */}
            <button
              onClick={handleLogout}
              className="w-full bg-[#1e2a3a] text-white py-3 rounded-full font-semibold text-sm mb-3 hover:bg-[#2d3e52] transition-colors"
            >
              Logout
            </button>
            <button
              onClick={() => setConfirmLogout(false)}
              className="w-full border border-gray-200 text-[#1e2a3a] py-3 rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* LOGIN AS CLINIC */}
      <div className="mt-8">
        <h2 className="font-semibold text-slate-500 mb-3 pl-3">
          Login as Clinic / Hospital
        </h2>

        <button
          onClick={() => navigate('/clinic')}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-2xl px-4 py-2 flex items-center justify-between transition">

          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <Building2 size={25} />
            </div>
            <span className="font-medium">
              Login as Clinic / Hospital
            </span>
          </div>

          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

/* Reusable Setting Row */
function SettingItem({ icon, title, subtitle, clickHandler }) {
  return (
    <div

     onClick={clickHandler}
     className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition">

      <div className="flex items-center gap-4">
        <div className="bg-slate-200 text-slate-700 p-2 rounded-lg">
          {icon}
        </div>

        <div>
          <p className="font-medium text-gray-800">{title}</p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>

      <ChevronRight className="text-gray-400" size={20} />

      <BottomNav />
    </div>

  );
}

export default PatientSettings;