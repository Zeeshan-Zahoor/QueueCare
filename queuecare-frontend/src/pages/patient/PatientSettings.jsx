import Header from "../../components/common/Header";
import {
  Bell,
  MapPin,
  Globe,
  Sun,
  ChevronRight,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function PatientSettings() {
  const navigate = useNavigate();
  return (
    <div className="max-w-md min-h-dvh mx-auto px-4 py-5 bg-gray-50 flex flex-col">

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
      </div>

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
function SettingItem({ icon, title, subtitle }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition">

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
    </div>
  );
}

export default PatientSettings;