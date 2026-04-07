import { Home, MapPin, Settings, User, IdCardLanyard } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { QueueContext } from "../../contexts/QueueContext";


const navItems = [
  { to: "/home", icon: Home },
  { to: "/doctors", icon: MapPin },
  { to: "/settings", icon: Settings },
  { to: "/profile", icon: User}
];

export default function BottomNav() {
  const { activeToken } = useContext(QueueContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [noTokenModal, setNoTokenModal] = useState(false);


  const handleMyTokenClick = () => {
    if (!activeToken) {
      setNoTokenModal(true);
      return;
    }

    navigate(
      `/queue-status/${activeToken.doctorId}?token=${activeToken.token}`
    );
  };

  const isUserActive = activeToken && location.pathname.startsWith(`/queue-status/${activeToken.doctorId}`);

  return (
    <>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
        <div className="flex items-center justify-between px-11 py-3 bg-white shadow-lg border border-gray-200">
          {navItems.map(({ to, icon: Icon }, index) => (
            <NavLink key={index} to={to}>
              {({ isActive }) => (
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all
                  ${isActive ? "bg-gray-200" : ""}`}
                >
                  <Icon
                    className={`w-5.5 h-5.5 transition-colors
                    ${isActive ? "text-gray-700" : "text-gray-400"}`}
                  />
                </div>
              )}
            </NavLink>
          ))}

          {/* My Token Button */}
          <button
            onClick={handleMyTokenClick}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${isUserActive ? "bg-gray-200" : ""}`}
            >
            <IdCardLanyard
              className={`w-5.5 h-5.5 transition-colors ${isUserActive ? "text-gray-700" : "text-gray-400"}`}
            />
          </button>
        </div>
      </div>

      {/* No Active Token Modal */}
      {noTokenModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-72 text-center space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">
              No active token found
            </h3>
            <button
              onClick={() => setNoTokenModal(false)}
              className="w-full bg-slate-800 text-white py-2 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}